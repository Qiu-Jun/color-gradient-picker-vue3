/*
 * @Descripttion:
 * @version:
 * @Author: June
 * @Date: 2023-06-27 13:16:45
 * @LastEditors: June
 * @LastEditTime: 2023-06-27 22:28:01
 */
export interface IPoitItem {
    alpha?: number | string;
    blue?: number | string;
    green?: number | string;
    left?: number | string;
    red?: number | string;
}

export interface Iattrs {
    degree: number;
    points: [IPoitItem];
    style: string;
    type: string;
}

export interface IProvideData {
    onChange: (attrs: Iattrs) => void;
    onStartChange: (attrs: Iattrs) => void;
    onEndChange: (attrs: Iattrs) => void;
}
