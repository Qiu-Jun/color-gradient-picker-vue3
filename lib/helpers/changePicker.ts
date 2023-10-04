/*
 * @Descripttion:
 * @version:
 * @Author: June
 * @Date: 2023-03-18 00:33:46
 * @LastEditors: June
 * @LastEditTime: 2023-10-03 22:36:37
 */
import hsvToRgb from './hsvToRgb'

export default function changePicker(
  x: number,
  y: number,
  height: number,
  width: number,
  hue: number,
  alpha: number,
) {
  if (x > width) x = width
  if (y > height) y = height
  if (x < 0) x = 0
  if (y < 0) y = 0
  const value = (100 - (y * 100) / height) | 0
  const saturation = ((x * 100) / width) | 0
  return {
    ...hsvToRgb(hue, saturation, value, alpha),
    saturation,
    value,
  }
}
