# 选择订单（携程）

::: tip 组件说明
此组件用于选择携程平台的订单信息，支持订单搜索、选择、差旅行程关联等功能。常用于差旅报销流程中关联携程订单。
:::

## 在线演示

<DemoInsDef3005 />

## 组件属性

| 属性名 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| `detail` | Boolean | `false` | 是否为查看模式 |
| `apply_id` | String | `''` | 申请单号 |

## 功能特性

- 支持按预定人员搜索订单
- 支持按差旅行程筛选订单（多选）
- 支持订单选择/取消选择
- 支持订单与差旅行程关联/取消关联
- 支持表格分页
- 显示订单编号、预定人、报销人、订单概要、订单日期、金额

## 使用示例

```vue
<template>
  <ins-def-3005 />
</template>
```

## 接口调用

```js
// 初始化订单列表
axios({
    method: 'post',
    url: '/ExpenseApplyUTravelV2',
    data: { ajax: true, act: 'orders_init' },
})

// 选择订单
axios({
    method: 'post',
    url: '/ExpenseApplyUTravelV2',
    data: { ajax: true, act: 'orders_add', plat_id: row.plat_id, order_no: row.order_no },
})

// 取消选择订单
axios({
    method: 'post',
    url: '/ExpenseApplyUTravelV2',
    data: { ajax: true, act: 'orders_cancel', plat_id: row.plat_id, order_no: row.order_no },
})
```
