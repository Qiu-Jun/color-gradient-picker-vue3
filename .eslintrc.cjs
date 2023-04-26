/*
 * @Author: June
 * @Description:
 * @Date: 2023-02-21 23:42:31
 * @LastEditors: June
 * @LastEditTime: 2023-04-26 09:36:58
 */
module.exports = {
    root: true,
    parser: 'vue-eslint-parser',

    parserOptions: {
        parser: '@typescript-eslint/parser',
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
            tsx: true,
        },
    },

    extends: [
        'plugin:vue/vue3-recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier',
        'plugin:prettier/recommended',
    ],

    rules: {
        // override/add rules settings here, such as:
        'vue/multi-word-component-names': 'off',
        'vue/prefer-import-from-vue': 'off',
        'vue/require-default-prop': 'off',
        '@typescript-eslint/no-empty-function': 'off',
    },
};
