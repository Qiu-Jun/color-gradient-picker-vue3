/*
 * @Descripttion:
 * @version:
 * @Author: June
 * @Date: 2023-03-18 00:33:46
 * @LastEditors: June
 * @LastEditTime: 2023-04-02 17:13:49
 */
import { hsvToRgb } from './index';

export default function getHue(
    offsetX: number,
    width: number,
    saturation: number,
    value: number,
) {
    let hue = ((360 * offsetX) / width) | 0;

    hue = hue < 0 ? 0 : hue > 360 ? 360 : hue;

    return {
        ...hsvToRgb(hue, saturation, value),
        hue,
    };
}
