# 选择到款信息

::: tip 组件说明
此组件用于选择和管理到款信息，支持到款搜索、选择、金额拆分等功能。常用于报销流程中关联到款记录。
:::

## 在线演示

<DemoInsDef4001 />

## 组件属性

| 属性名 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| `detail` | Boolean | `false` | 是否为查看模式 |
| `apply_id` | String | `''` | 申请单号 |

## 功能特性

- 支持按收入金额范围搜索
- 支持按交易日期范围搜索
- 支持按附言备注搜索
- 支持按付款单位搜索
- 支持到款选择/取消选择
- 支持到款金额拆分（将一笔到款拆分为两笔）
- 支持表格分页
- 显示到款总金额
- 显示付款单位名称、交易日期、银行票据号、来款附言/备注、收入金额

## 使用示例

```vue
<template>
  <ins-def-4001 />
</template>
```

## 接口调用

```js
// 初始化加载
axios({
    method: 'post',
    url: '/ExpenseApplyUBankArrV2',
    data: { ajax: true, act: 'bankarr_init' },
})

// 选择到款
axios({
    method: 'post',
    url: '/ExpenseApplyUBankArrV2',
    data: { ajax: true, act: 'bankarr_save', bank_arrivno: row.bank_arrivno, dtlno: row.dtlno },
})

// 取消选择到款
axios({
    method: 'post',
    url: '/ExpenseApplyUBankArrV2',
    data: { ajax: true, act: 'bankarr_del', bank_arrivno: row.bank_arrivno, dtlno: row.dtlno },
})

// 保存到款拆分
axios({
    method: 'post',
    url: '/ExpenseApplyUBankArrV2',
    data: { ajax: true, act: 'bankarr_div', splitArr: ..., splitArr1: ..., splitArr2: ... },
})
```
