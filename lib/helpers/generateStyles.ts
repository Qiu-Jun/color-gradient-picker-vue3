/*
 * @Descripttion:
 * @version:
 * @Author: June
 * @Date: 2023-03-18 00:33:46
 * @LastEditors: June
 * @LastEditTime: 2023-10-03 15:11:00
 */
import type { IPoitItem } from '@l/types'
export function generateSolidStyle(red, green, blue, alpha): string {
  return `rgba(${red}, ${green}, ${blue}, ${alpha})`
}

export function generateGradientStyle(
  points: IPoitItem[],
  type: string,
  degree: number,
): string {
  let style = ''
  const sortedPoints = points.slice()

  sortedPoints.sort((a, b) => a.left - b.left)
  if (type === 'linear') {
    style = `linear-gradient(${degree}deg,`
  } else {
    style = 'radial-gradient('
  }

  sortedPoints.forEach((point, index) => {
    style += `rgba(${point.red}, ${point.green}, ${point.blue}, ${point.alpha}) ${point.left}%`

    if (index !== sortedPoints.length - 1) {
      style += ','
    }
  })

  style += ')'

  return style
}
