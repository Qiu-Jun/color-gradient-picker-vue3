/*
 * @Descripttion:
 * @version:
 * @Author: June
 * @Date: 2023-03-18 00:33:46
 * @LastEditors: June
 * @LastEditTime: 2023-04-02 16:14:23
 */
export function generateSolidStyle(
    red: number,
    green: number,
    blue: number,
    alpha: number,
) {
    return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
}

export function generateGradientStyle(
    points: [
        {
            left: number;
            red: number;
            green: number;
            blue: number;
            alpha: number;
        },
    ],
    type: string,
    degree: number,
) {
    let style = '';
    const sortedPoints = points.slice();

    sortedPoints.sort((a, b) => a.left - b.left);

    if (type === 'linear') {
        style = `linear-gradient(${degree}deg,`;
    } else {
        style = 'radial-gradient(';
    }

    sortedPoints.forEach((point, index) => {
        style += `rgba(${point.red}, ${point.green}, ${point.blue}, ${point.alpha}) ${point.left}%`;

        if (index !== sortedPoints.length - 1) {
            style += ',';
        }
    });

    style += ')';

    return style;
}
