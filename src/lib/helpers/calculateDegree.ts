export default function calculateDegree(
    x: number,
    y: number,
    centerX: number,
    centerY: number,
) {
    const radians = Math.atan2(x - centerX, y - centerY);
    return radians * (180 / Math.PI) * -1 + 180;
}
