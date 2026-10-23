/*
 * @Descripttion: 读取 lib/package.json 版本号,打附注标签并推送,自动生成说明并发布 GitHub Release
 * @Author: June
 * @Date: 2026-10-24
 * @LastEditors: June
 * @LastEditTime: 2026-10-24
 */
import { execa, execaSync } from 'execa'
import { readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

// --dry-run:仅预览将生成的 Release 说明,不打标签、不推送、不发布
const DRY_RUN = process.argv.includes('--dry-run')

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const LIB_PKG = resolve(ROOT, 'lib/package.json')

const run = (bin, args) => execa(bin, args, { stdio: 'inherit' })
const git = (args, opts = {}) => execaSync('git', args, opts).stdout.trim()

const fail = (msg) => {
  console.error(`\n❌ ${msg}\n`)
  process.exit(1)
}

// 提交类型 -> Release 分组;chore/build/ci/style/test 等不写入说明
const GROUPS = [
  [/^feat$/, '✨ 新功能'],
  [/^fix$/, '🐛 修复'],
  [/^perf$/, '⚡ 性能'],
  [/^refactor$/, '♻️ 重构'],
  [/^docs$/, '📖 文档'],
]

const pushTo = (map, key, val) => {
  if (!map.has(key)) map.set(key, [])
  map.get(key).push(val)
}

const parseRemote = (url) => {
  const m = (url || '').match(/github\.com[:/]([^/]+)\/([^/\s]+?)(?:\.git)?$/)
  if (!m) return {}
  const [, owner, repo] = m
  return { owner, repo, repoUrl: `https://github.com/${owner}/${repo}` }
}

// 从 prevTag..rangeEnd 的提交生成 Release 说明(conventional commit 分组)
const buildNotes = (prevTag, rangeEnd, repoUrl, tag) => {
  const range = prevTag ? `${prevTag}..${rangeEnd}` : rangeEnd
  const commits = git(['log', '--no-merges', '--format=%B%x1f', range])
    .split('\x1f')
    .map((c) => c.trim())
    .filter(Boolean)

  const sections = new Map()
  for (const msg of commits) {
    const [subject, ...bodyLines] = msg.split('\n')
    const m = subject.trim().match(/^(\w+)(?:\(([^)]+)\))?:\s+(.+)$/)
    if (!m) {
      pushTo(sections, '🔧 其他', `- ${subject.trim()}`)
      continue
    }
    const [, type, scope, text] = m
    const group = GROUPS.find(([re]) => re.test(type))
    if (!group) continue
    const item = scope ? `- (${scope}) ${text}` : `- ${text}`
    // 提交说明正文里的 "- xxx" 要点作为子条目;
    // 跳过 Co-authored-by,以及正文里重复的 conventional commit 标题(squash 合并常见)
    const details = bodyLines
      .map((l) => l.trim())
      .filter(
        (l) =>
          /^[-*]\s+\S/.test(l) &&
          !/co-authored-by/i.test(l) &&
          !/^\w+(\([^)]*\))?:\s/.test(l.replace(/^[-*]\s+/, '')),
      )
      .map((l) => `  - ${l.replace(/^[-*]\s+/, '')}`)
    pushTo(sections, group[1], [item, ...details].join('\n'))
  }

  const parts = [...sections].map(([title, lines]) => `## ${title}\n${lines.join('\n')}`)
  if (prevTag && repoUrl) {
    parts.push(`**Full Changelog**: ${repoUrl}/compare/${prevTag}...${tag}`)
  }
  return parts.join('\n\n')
}

// 用 git 凭据管理器里保存的 token 调 GitHub API 发布 Release
const publishRelease = async (owner, repo, tag, body) => {
  const cred = git(['credential', 'fill'], {
    input: 'protocol=https\nhost=github.com\n\n',
  })
  const token = /^password=(.+)$/m.exec(cred)?.[1]?.trim()
  if (!token) throw new Error('未从 git 凭据中取到 token')

  const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/releases`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github+json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ tag_name: tag, name: tag, body }),
  })
  if (!res.ok) throw new Error(`GitHub API ${res.status} ${res.statusText}`)
  return (await res.json()).html_url
}

const main = async () => {
  const { version } = JSON.parse(readFileSync(LIB_PKG, 'utf8'))
  const tag = `v${version}`
  const branch = git(['rev-parse', '--abbrev-ref', 'HEAD'])
  const { owner, repo, repoUrl } = parseRemote(git(['remote', 'get-url', 'origin']))

  console.log(`\n📦 lib/package.json 版本:${version},目标标签 ${tag}(当前分支:${branch})`)

  // 上一个标签:按创建时间取最近的另一个 v* 标签
  const prevTag = () =>
    git(['tag', '--list', 'v*', '--sort=-creatordate'])
      .split('\n')
      .map((t) => t.trim())
      .filter((t) => t && t !== tag)[0]

  if (DRY_RUN) {
    const end = git(['tag', '-l', tag]) ? tag : 'HEAD'
    const prev = prevTag()
    console.log(`📝 预览 Release 说明(${prev ? `${prev}..${end}` : `截至 ${end}`})\n`)
    console.log('---')
    console.log(buildNotes(prev, end, repoUrl, tag))
    console.log('---')
    return
  }

  // 1. 工作区必须干净,避免把标签打在未提交的状态上
  if (git(['status', '--porcelain'])) {
    fail('工作区有未提交的改动,请先提交或暂存后再打标签')
  }

  // 2. 同步远端标签;离线时跳过,推送阶段自然会失败
  try {
    git(['fetch', 'origin', '--tags'])
  } catch {
    console.warn('⚠️  无法连接远端,跳过远端标签检查\n')
  }

  // 3. 本地分支需与远端同步,避免标签指向远端还没有的提交
  try {
    const [ahead, behind] = git([
      'rev-list',
      '--left-right',
      '--count',
      `${branch}...origin/${branch}`,
    ])
      .split(/\s+/)
      .map(Number)
    if (ahead > 0) fail(`本地领先远端 ${ahead} 个提交,请先 git push 后再打标签`)
    if (behind > 0) fail(`本地落后远端 ${behind} 个提交,请先 git pull 后再打标签`)
  } catch {
    console.warn(`⚠️  未找到远端分支 origin/${branch},跳过同步检查\n`)
  }

  // 4. 标签不能重复
  if (git(['tag', '-l', tag])) {
    fail(
      `标签 ${tag} 已存在,如需重打请先删除:\n` +
        `    git tag -d ${tag} && git push origin :refs/tags/${tag}`,
    )
  }

  // 5. 生成 Release 说明(上一个标签到 HEAD 的提交)
  const prev = prevTag()
  const notes = buildNotes(prev, 'HEAD', repoUrl, tag)

  // 6. 打附注标签并推送(沿用 release {version} 的 message 格式)
  try {
    await run('git', ['tag', '-a', tag, '-m', `release ${version}`])
    await run('git', ['push', 'origin', tag])
  } catch {
    fail(`标签创建/推送失败。若标签已在本地生成,可稍后手动推送:\n    git push origin ${tag}`)
  }

  // 7. 发布 GitHub Release;失败不影响已推送的标签,可手动补发
  if (owner && repo) {
    try {
      const url = await publishRelease(owner, repo, tag, notes)
      console.log(`\n✅ 标签 ${tag} 已推送,GitHub Release 已发布:`)
      console.log(`🔗 ${url}`)
      return
    } catch (e) {
      console.warn(`\n⚠️  Release 自动发布失败(${e.message})`)
    }
  } else {
    console.warn('\n⚠️  远端不是 GitHub 仓库,跳过 Release 发布')
  }
  console.log(`🔗 可手动发布:${repoUrl || 'https://github.com'}/releases/new?tag=${tag}`)
}

main()
