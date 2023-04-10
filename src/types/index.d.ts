/*
 * @Descripttion:
 * @version:
 * @Author: June
 * @Date: 2023-04-02 18:14:12
 * @LastEditors: June
 * @LastEditTime: 2023-04-08 22:59:44
 */

interface Icolor {
    red: number | undefined;
    green: number | undefined;
    blue: number | undefined;
    alpha: number | undefined;
    hue: number | undefined;
    saturation: number | undefined;
    value: number | undefined;
}

declare module 'color-gradient-picker-vue3' {
    const content: any;
    export default content;
}
