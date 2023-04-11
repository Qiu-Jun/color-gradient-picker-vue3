/*
 * @Descripttion:
 * @version:
 * @Author: June
 * @Date: 2023-04-11 15:05:52
 * @LastEditors: June
 * @LastEditTime: 2023-04-11 15:33:42
 */
import { execa } from 'execa';
import inquirer from 'inquirer';
import { resolve } from 'path';

const CWD = process.cwd();
const PKG_DEV = resolve(CWD, './lib');
const PKG_VUE3JS = resolve(CWD, './packages/vue3js');
const PKG_VUE3TS = resolve(CWD, './packages/vue3ts');

const run = (bin, args, opts = {}) => {
    execa(bin, args, { stdio: 'inherit', ...opts });
};

async function create() {
    const { result } = await inquirer.prompt([
        {
            type: 'list',
            message: '请选择您要启动的子项目:',
            name: 'result',
            choices: [
                {
                    key: '0',
                    name: '开发',
                    value: 'dev',
                },
                {
                    key: '1',
                    name: 'vue3js 例子',
                    value: 'vue3js',
                },
                {
                    key: '2',
                    name: 'vue3ts 例子',
                    value: 'vue3ts',
                },
            ],
        },
    ]);

    switch (result) {
        case 'dev':
            run('pnpm', ['dev'], { cwd: PKG_DEV });
            break;
        case 'vue3js':
            run('pnpm', ['dev'], { cwd: PKG_VUE3JS });
            break;
        case 'vue3ts':
            run('pnpm', ['dev'], { cwd: PKG_VUE3TS });
            break;
        default:
            break;
    }
}

create();
