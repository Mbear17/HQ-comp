# 选择结算单

::: tip 组件说明
此组件用于选择和管理采购结算单信息，支持按负责人搜索、包含已申请筛选、结算单选择等功能。
:::

## 在线演示

<DemoInsDef2001 />

## 组件属性

无显式 props，使用内部 data 管理状态。

## 功能特性

- 支持按负责人搜索结算单
- 支持"包含已申请"筛选
- 支持结算单选择/取消选择
- 支持表格分页
- 显示结算单号、合同名称、结算类型、经费项目、本次结算金额

## 使用示例

```vue
<template>
  <ins-def-2001 />
</template>
```

## 接口调用

```js
// 初始化加载
axios({
    method: 'post',
    url: '/ExpenseApplyUInsV2',
    data: { ajax: true, act: 'confirm_init' },
})

// 加载结算单列表
axios({
    method: 'post',
    url: '/ExpenseApplyUInsV2',
    data: { ajax: true, act: 'confirm_load', charge_uid: name, isApply: selected },
})

// 选择/取消选择结算单
axios({
    method: 'post',
    url: '/ExpenseApplyUInsV2',
    data: { ajax: true, act: 'confirm_save', request_id: request_ids },
})
```
