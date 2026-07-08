# 选择订单（高德）

::: tip 组件说明
此组件用于选择高德平台的订单信息，支持订单搜索、选择等功能。常用于差旅报销流程中关联高德订单。
:::

## 在线演示

<DemoInsDef3006 />

## 组件属性

| 属性名 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| `detail` | Boolean | `false` | 是否为查看模式 |
| `apply_id` | String | `''` | 申请单号 |

## 功能特性

- 支持按预定人员模糊搜索订单
- 支持订单选择/取消选择
- 支持表格分页
- 显示订单编号、预定人、报销人、订单概要、订单时间、金额

## 使用示例

```vue
<template>
  <ins-def-3006 />
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
