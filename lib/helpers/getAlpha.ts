/*
 * @Descripttion:
 * @version:
 * @Author: June
 * @Date: 2023-03-18 00:33:46
 * @LastEditors: June
 * @LastEditTime: 2023-10-02 12:33:30
 */
export default function getAlpha(value: number, width: number) {
  value = Number((value / width).toFixed(2))
  return value > 1 ? 1 : value < 0 ? 0 : value
  // return {
  //   red: 0,
  //   green: 0,
  //   blue: 0,
  //   alpha: value > 1 ? 1 : value < 0 ? 0 : value,
  //   hue: 0,
  //   saturation: 0,
  //   value: 0,
  // };
}
