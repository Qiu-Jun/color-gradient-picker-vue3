/*
 * @Author: June
 * @Description:
 * @Date: 2023-04-08 22:26:19
 * @LastEditors: June
 * @LastEditTime: 2023-05-10 16:38:47
 */
export default function calculateDegree(
  x: number,
  y: number,
  centerX: number,
  centerY: number,
): number {
  const radians = Math.atan2(x - centerX, y - centerY)
  return radians * (180 / Math.PI) * -1 + 180
}
