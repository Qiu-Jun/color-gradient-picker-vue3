/*
 * @Author: June
 * @Description: Description
 * @Date: 2024-12-21 12:52:42
 * @LastEditTime: 2024-12-21 15:20:51
 * @LastEditors: June
 */
import { defineConfig } from 'vitepress'
import { docsConfig } from '../docs'
import { themeConfig } from '../theme'
import { head } from '../head'
//配置的英文文档设置
import { enConfig } from '../configs/en'
//配置的中文文档设置
import { zhConfig } from '../configs/zh'
// https://vitepress.dev/reference/site-config
export default defineConfig({
  /* 文档配置 */
  ...docsConfig,
  /* 标头配置 */
  head,
  /* 主题配置 */
  themeConfig,
  /* 语言配置 */
  locales: {
    root: {
      label: '简体中文',
      lang: 'zh-C',
      link: '/index',
      ...zhConfig,
    },
    en: { label: 'English', lang: 'en-US', link: '/en/', ...enConfig },
  },
})
