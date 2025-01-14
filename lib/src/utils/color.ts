import { GradientProps, ColorPickerProps } from '@/interfaces'
import { GradientType } from '@/enums'

// 生成渐变色string
export function createGradientStr(newColors: GradientProps[], gradientType: GradientType, colorState: ColorPickerProps) {
    const sorted = newColors.sort(
        (a: GradientProps, b: GradientProps) => a.left! - b.left!,
    )
    const colorString = sorted?.map((cc: any) => `${cc?.value} ${cc.left}%`)
    const newGrade = `${gradientType}-gradient(${`${colorState.degreesStr}`}, ${colorString.join(', ')})`
    return newGrade
}