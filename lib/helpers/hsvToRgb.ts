/*
 * @Descripttion:
 * @version:
 * @Author: June
 * @Date: 2023-03-18 00:33:46
 * @LastEditors: June
 * @LastEditTime: 2023-06-27 03:29:33
 */
import setRGBA from './setRgba';

export default function hsvToRgb(
    hue: number,
    saturation: number,
    value: number,
) {
    value /= 100;
    const sat = saturation / 100;
    let C = sat * value;
    const H = hue / 60;
    let X = C * (1 - Math.abs((H % 2) - 1));
    let m = value - C;
    const precision = 255;
    const defaultAlpha = 1;
    C = ((C + m) * precision) | 0;
    X = ((X + m) * precision) | 0;
    m = (m * precision) | 0;

    if (H >= 1 && H < 2) {
        return setRGBA(X, C, m, defaultAlpha);
    }
    if (H >= 2 && H < 3) {
        return setRGBA(m, C, X, defaultAlpha);
    }
    if (H >= 3 && H < 4) {
        return setRGBA(m, X, C, defaultAlpha);
    }
    if (H >= 4 && H < 5) {
        return setRGBA(X, m, C, defaultAlpha);
    }
    if (H >= 5 && H <= 6) {
        return setRGBA(C, m, X, defaultAlpha);
    }

    return setRGBA(C, X, m, defaultAlpha);
}
