# 其他差旅杂费

::: tip 组件说明
此组件用于管理其他差旅杂费信息，支持杂费项目的添加、删除和金额编辑。常用于差旅报销流程中。
:::

## 在线演示

<DemoInsDef3004 />

## 组件属性

| 属性名 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| `detail` | Boolean | `false` | 是否为查看模式 |
| `apply_id` | String | `''` | 申请单号 |
| `datacheck_msg` | String | `''` | 数据检测提示信息 |

## 功能特性

- 支持其他差旅杂费列表展示
- 支持杂费项目添加（弹窗选择费用项目和金额）
- 支持杂费项目删除（带确认提示）
- 支持金额输入格式化（千分位、小数点）
- 支持金额自动保存

## 使用示例

```vue
<template>
  <ins-def-3004 />
</template>
```

## 接口调用

```js
// 加载杂费列表
axios({
    method: 'post',
    url: '/ExpenseApplyUTravelV2',
    data: { ajax: true, act: 'othercost_load' },
})

// 添加杂费
axios({
    method: 'post',
    url: '/ExpenseApplyUTravelV2',
    data: { ajax: true, act: 'othercost_add', expend_code: code, cost_other: amount },
})

// 保存杂费
axios({
    method: 'post',
    url: '/ExpenseApplyUTravelV2',
    data: { ajax: true, act: 'othercost_save', ord: item.ord, expend_code: item.expend_code, cost_other: item.cost_other },
})

// 删除杂费
axios({
    method: 'post',
    url: '/ExpenseApplyUTravelV2',
    data: { ajax: true, act: 'othercost_del', ord: item.ord },
})
```
