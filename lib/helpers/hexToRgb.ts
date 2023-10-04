/*
 * @Descripttion:
 * @version:
 * @Author: June
 * @Date: 2023-03-18 00:33:46
 * @LastEditors: June
 * @LastEditTime: 2023-10-01 22:08:08
 */
import { rgbToHsv, setRgba } from './index'

const hexRegexp =
  /(^#{0,1}[0-9A-F]{6}$)|(^#{0,1}[0-9A-F]{3}$)|(^#{0,1}[0-9A-F]{8}$)/i

// const regexp = /([0-9A-F])([0-9A-F])([0-9A-F])/i;

export default function hexToRgb(value: string) {
  const valid = hexRegexp.test(value)
  if (valid) {
    if (value[0] === '#') value = value.slice(1, value.length)

    // 无法确定输入需要转换的是3位还是6位
    // if (value.length === 3) value = value.replace(regexp, '$1$1$2$2$3$3');
    if (value.length < 6) return false
    const red = parseInt(value.substring(0, 2), 16) || 0
    const green = parseInt(value.substring(2, 4), 16) || 0
    const blue = parseInt(value.substring(4, 6), 16) || 0
    const alpha = parseInt(value.substring(6, 8), 16) / 255 || 0

    const color = setRgba(red, green, blue, alpha)
    const hsv = color && rgbToHsv({ ...color })
    return {
      ...color,
      ...hsv,
    }
  }

  return false
}
