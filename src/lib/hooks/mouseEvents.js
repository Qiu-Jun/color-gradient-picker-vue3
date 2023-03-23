/*
 * @Descripttion:
 * @version:
 * @Author: June
 * @Date: 2023-03-19 19:02:56
 * @LastEditors: June
 * @LastEditTime: 2023-03-19 19:03:13
 */
export default function useMouseEvents(
    mouseDownHandler,
    mouseMoveHandler,
    mouseUpHandler,
) {
    return function mouseEventsHandler(event) {
        let positions = mouseDownHandler(event);

        function onMouseMove(event) {
            positions = mouseMoveHandler(event, positions) || positions;
        }

        window.addEventListener('mousemove', onMouseMove);

        window.addEventListener(
            'mouseup',
            (event) => {
                window.removeEventListener('mousemove', onMouseMove);

                mouseUpHandler && mouseUpHandler(event, positions);
            },
            { once: true },
        );
    };
}
