# 合同与待核销发票

::: tip 组件说明
此组件用于管理合同与待核销发票信息，支持发票选择、合同信息录入等功能。常用于报销流程中关联发票和合同。
:::

## 在线演示

<DemoInsDef4002 />

## 组件属性

| 属性名 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| `detail` | Boolean | `false` | 是否为查看模式 |
| `apply_id` | String | `''` | 申请单号 |

## 功能特性

- 支持待核销发票列表展示
- 支持按发票抬头搜索
- 支持发票选择/取消选择
- 支持"对方单位无需开票"勾选
- 支持合同编号和合同名称录入
- 支持查看模式（只读）
- 显示此次核销金额
- 显示项目代码及名称、交易日期、应收单位名称、摘要、发票号码、应收款金额

## 使用示例

```vue
<template>
  <ins-def-4002 />
</template>
```

## 接口调用

```js
// 初始化加载
axios({
    method: 'post',
    url: '/ExpenseApplyUBankArrV2',
    data: { ajax: true, act: 'due_init' },
})

// 选择发票
axios({
    method: 'post',
    url: '/ExpenseApplyUBankArrV2',
    data: { ajax: true, act: 'due_save', duerec_id: row.duerec_id },
})

// 保存合同信息
axios({
    method: 'post',
    url: '/ExpenseApplyUBankArrV2',
    data: { ajax: true, act: 'contract_save', contract_no: no, contract_name: name, due_flag: flag },
})
```
