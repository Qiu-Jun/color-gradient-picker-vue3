import { DEFAULT_VALUES } from '@/enums'
import type { ILocales } from '@/interfaces/index'

// 国际化工具
import { ref } from 'vue'

// 语言包
const messages = {
  en: {
    solid: 'Solid',
    gradient: 'Gradient',
  },
  zh: {
    solid: '纯色',
    gradient: '渐变',
  },
}

// 当前语言（使用 ref 使其成为响应式）
const currentLang = ref<ILocales>(DEFAULT_VALUES.LOCALE)

/**
 * 设置语言
 * @param lang 语言代码 ('en' 或 'zh')
 */
export function setLang(lang: ILocales) {
  currentLang.value = lang
}

/**
 * 获取当前语言
 * @returns 当前语言代码
 */
export function getLang(): ILocales {
  return currentLang.value
}

/**
 * 翻译函数
 * @param key 翻译键
 * @returns 翻译后的文本
 */
export function t(key: string): string {
  return (
    messages[currentLang.value][key as keyof (typeof messages)['en']] || key
  )
}
