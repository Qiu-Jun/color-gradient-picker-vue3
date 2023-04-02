/*
 * @Descripttion:
 * @version:
 * @Author: June
 * @Date: 2023-03-18 00:33:46
 * @LastEditors: June
 * @LastEditTime: 2023-04-02 17:11:23
 */
function isValidRGBValue(value: number) {
    return (
        typeof value === 'number' &&
        Number.isNaN(value) === false &&
        value >= 0 &&
        value <= 255
    );
}

export default function setRGBA(
    red: number,
    green: number,
    blue: number,
    alpha: number,
) {
    if (
        isValidRGBValue(red) &&
        isValidRGBValue(green) &&
        isValidRGBValue(blue)
    ) {
        const color: {
            red: number;
            green: number;
            blue: number;
            alpha: number;
        } = {
            red: red | 0,
            green: green | 0,
            blue: blue | 0,
            alpha: alpha | 0,
        };

        if (isValidRGBValue(alpha) === true) {
            color.alpha = alpha | 0;
        }

        // RGBToHSL(color.r, color.g, color.b);

        return color;
    }
}
