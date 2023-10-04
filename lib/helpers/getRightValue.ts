/*
 * @Descripttion:
 * @version:
 * @Author: June
 * @Date: 2023-03-18 00:33:46
 * @LastEditors: June
 * @LastEditTime: 2023-05-10 16:40:06
 */
export default function getRightValue(newValue?: number, oldValue?: number) {
  return !newValue && newValue !== 0 ? oldValue : newValue
}
