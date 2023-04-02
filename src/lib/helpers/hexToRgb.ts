/*
 * @Descripttion:
 * @version:
 * @Author: June
 * @Date: 2023-03-18 00:33:46
 * @LastEditors: June
 * @LastEditTime: 2023-04-02 17:55:38
 */
import { rgbToHsv, setRgba } from './index';

const hexRegexp =
    /(^#{0,1}[0-9A-F]{6}$)|(^#{0,1}[0-9A-F]{3}$)|(^#{0,1}[0-9A-F]{8}$)/i;

const regexp = /([0-9A-F])([0-9A-F])([0-9A-F])/i;

export default function hexToRgb(value: string) {
    const valid = hexRegexp.test(value);
    if (valid) {
        if (value[0] === '#') value = value.slice(1, value.length);

        // 无法确定输入需要转换的是3位还是6位
        // if (value.length === 3) value = value.replace(regexp, '$1$1$2$2$3$3');
        if (value.length < 6) return;
        const red = parseInt(value.substr(0, 2), 16);
        const green = parseInt(value.substr(2, 2), 16);
        const blue = parseInt(value.substr(4, 2), 16);
        const alpha = parseInt(value.substr(6, 2), 16) / 255;

        const color = setRgba(red, green, blue, alpha);
        const hsv = color && rgbToHsv({ ...color });
        return {
            ...color,
            ...hsv,
        };
    }

    return false;
}
