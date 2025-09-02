# 测试文档

## 概述

本项目使用 Vitest 作为测试框架，提供了完整的单元测试覆盖。

## 测试结构

```
tests/
├── setup.ts                    # 测试设置文件
├── index.test.ts              # 基础测试
├── enums.test.ts              # 枚举测试
├── interfaces.test.ts          # 接口类型测试
├── components/
│   └── ColorPicker.test.ts    # 组件配置测试
└── utils/
    ├── color.test.ts          # 颜色工具函数测试
    ├── format.test.ts         # 格式化工具函数测试
    └── utils.test.ts          # 通用工具函数测试
```

## 运行测试

### 开发模式
```bash
npm run test
```

### 运行所有测试
```bash
npm run test:run
```

### 监听模式
```bash
npm run test:watch
```

### 生成覆盖率报告
```bash
npm run test:coverage
```

### UI模式
```bash
npm run test:ui
```

## 测试覆盖率

当前测试覆盖率：

- **语句覆盖率**: 16.09%
- **分支覆盖率**: 70.46%
- **函数覆盖率**: 47.27%
- **行覆盖率**: 16.09%

### 详细覆盖率

| 文件 | 语句覆盖率 | 分支覆盖率 | 函数覆盖率 | 行覆盖率 |
|------|------------|------------|------------|----------|
| `src/enums/index.ts` | 100% | 100% | 100% | 100% |
| `src/utils/color.ts` | 100% | 95.83% | 100% | 100% |
| `src/utils/format.ts` | 97.63% | 90.9% | 100% | 97.63% |
| `src/utils/utils.ts` | 94.56% | 80% | 100% | 94.56% |

## 测试内容

### 1. 枚举测试 (`enums.test.ts`)
- 测试所有枚举值的正确性
- 验证枚举类型的完整性
- 检查默认值配置

### 2. 接口测试 (`interfaces.test.ts`)
- 验证TypeScript接口定义
- 测试类型约束
- 检查可选属性

### 3. 颜色工具函数测试 (`color.test.ts`)
- `createGradientStr`: 渐变字符串生成
- `isValidColor`: 颜色值验证
- `formatColor`: 颜色格式化
- `getColorContrast`: 对比度计算

### 4. 格式化工具函数测试 (`format.test.ts`)
- `low/high`: 字符串大小写转换
- `getColors`: 颜色数组提取
- `formatInputValues`: 输入值格式化
- `round/clamp`: 数值处理
- `percentToDecimal/decimalToPercent`: 百分比转换

### 5. 通用工具函数测试 (`utils.test.ts`)
- `safeBounds`: 边界计算
- `getHandleValue`: 句柄值计算
- `computeSquareXY`: 坐标计算
- `computePickerPosition`: 选择器位置
- `isUpperCase`: 大写检测
- `objectToString`: 对象转字符串
- `getColorObj`: 颜色对象处理
- `getIsGradient`: 渐变检测
- `getDetails`: 渐变详情解析

### 6. 组件配置测试 (`ColorPicker.test.ts`)
- 默认值验证
- 属性类型检查
- 事件处理
- v-model支持

## 测试最佳实践

### 1. 测试命名
- 使用描述性的测试名称
- 遵循 "应该..." 的命名模式
- 清晰表达测试意图

### 2. 测试结构
- 使用 `describe` 分组相关测试
- 使用 `beforeEach` 设置测试环境
- 保持测试的独立性

### 3. 断言
- 使用具体的断言方法
- 避免过于复杂的断言
- 提供清晰的错误信息

### 4. Mock使用
- 合理使用Mock避免外部依赖
- 保持Mock的简单性
- 确保Mock行为的一致性

## 持续集成

测试已集成到CI/CD流程中：

1. **代码提交**: 自动运行测试
2. **覆盖率检查**: 确保覆盖率不低于阈值
3. **测试报告**: 生成详细的测试报告

## 故障排除

### 常见问题

1. **模块找不到**: 检查路径别名配置
2. **Mock不工作**: 确保Mock在正确的位置
3. **测试超时**: 检查异步操作的处理

### 调试技巧

1. 使用 `console.log` 调试测试
2. 使用 `--reporter=verbose` 获取详细输出
3. 使用 `--ui` 模式进行交互式调试

## 贡献指南

添加新测试时请遵循：

1. 为新功能编写测试
2. 确保测试覆盖率
3. 遵循现有的测试模式
4. 更新测试文档
