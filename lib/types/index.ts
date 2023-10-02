/*
 * @Descripttion:
 * @version:
 * @Author: June
 * @Date: 2023-06-27 13:16:45
 * @LastEditors: June
 * @LastEditTime: 2023-09-30 23:00:18
 */

export interface IPoitItem {
  red: number;
  green: number;
  blue: number;
  alpha: number;
  left: number;
}

export interface Iattrs {
  degree: number;
  points: IPoitItem[];
  style: string;
  type: string;
}

export interface IColor {
  red: number;
  green: number;
  blue: number;
  alpha: number;
  hue?: number;
  saturation?: number;
  value?: number;
}

export interface IGradient {
  type: string;
  degree: number;
  points: IPoitItem[];
}

export interface IColorState extends IColor {
  isGradient: boolean;
  style?: string;
  color?: IColor;
  gradient?: IGradient;
}

// export interface IProvideData {
//   onChange: (attrs: Iattrs) => void;
//   onStartChange: (attrs: Iattrs) => void;
//   onEndChange: (attrs: Iattrs) => void;
// }
