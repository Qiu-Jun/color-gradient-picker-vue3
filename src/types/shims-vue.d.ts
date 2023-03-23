/*
 * @Author: June
 * @Description:
 * @Date: 2023-02-21 23:42:31
 * @LastEditors: June
 * @LastEditTime: 2023-02-21 23:48:56
 */
declare module '*.vue' {
    import { DefineComponent } from 'vue';
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
    const component: DefineComponent<{}, {}, any>;
    export default component;
}
