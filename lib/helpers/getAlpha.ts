/*
 * @Descripttion:
 * @version:
 * @Author: June
 * @Date: 2023-03-18 00:33:46
 * @LastEditors: June
 * @LastEditTime: 2023-05-12 22:55:32
 */
export default function getAlpha(value: number, width: number): number {
    value = Number((value / width).toFixed(2));
    return value > 1 ? 1 : value < 0 ? 0 : value;
}
