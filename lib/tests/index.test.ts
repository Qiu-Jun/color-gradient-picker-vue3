import { describe, it, expect } from 'vitest'

// 这是一个测试入口文件，用于确保所有测试都能正常运行
describe('测试套件', () => {
  it('应该能够运行基本测试', () => {
    expect(true).toBe(true)
  })

  it('应该能够进行数学运算', () => {
    expect(1 + 1).toBe(2)
    expect(2 * 3).toBe(6)
    expect(10 / 2).toBe(5)
  })

  it('应该能够处理字符串', () => {
    expect('hello').toBe('hello')
    expect('hello'.toUpperCase()).toBe('HELLO')
    expect('hello world'.split(' ')).toEqual(['hello', 'world'])
  })

  it('应该能够处理数组', () => {
    const arr = [1, 2, 3, 4, 5]
    expect(arr.length).toBe(5)
    expect(arr.map(x => x * 2)).toEqual([2, 4, 6, 8, 10])
    expect(arr.filter(x => x > 3)).toEqual([4, 5])
  })

  it('应该能够处理对象', () => {
    const obj = { name: 'test', value: 123 }
    expect(obj.name).toBe('test')
    expect(obj.value).toBe(123)
    expect(Object.keys(obj)).toEqual(['name', 'value'])
  })
})
