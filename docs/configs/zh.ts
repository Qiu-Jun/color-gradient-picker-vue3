import type { DefaultTheme, LocaleSpecificConfig } from 'vitepress'

//引入以上配置 是英文界面需要修改zh为en
import getNavs from '../navs/zh'
import { sidebar } from '../sidebars/zh'

export const zhConfig: LocaleSpecificConfig<DefaultTheme.Config> = {
  themeConfig: {
    lastUpdatedText: '上次更新',
    returnToTopLabel: '返回顶部',

    // 文档页脚文本配置

    docFooter: {
      prev: '上一页',
      next: '下一页',
    },

    //   editLink: {

    //     pattern: '路径地址',

    //     text: '对本页提出修改建议',

    //   },

    // logo: '/img/alemon.jpg',

    nav: getNavs(),

    sidebar,
    outline: {
      level: 'deep', // 右侧大纲标题层级
      label: '目录', // 右侧大纲标题文本配置
    },

    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/Qiu-Jun/color-gradient-picker-vue3',
      },
    ],
  },
}
