# 选择合同

::: tip 组件说明
此组件用于选择和管理合同信息，支持合同搜索、选择、金额拆分等功能。常用于报销流程中需要关联合同的场景。
:::

## 在线演示

<DemoInsDef2101 />

## 组件属性

| 属性名 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| `detail` | Boolean | `false` | 是否为查看模式 |
| `apply_id` | String | `''` | 申请单号 |

## 功能特性

- 支持按负责人搜索合同
- 支持"包含已申请"筛选
- 支持合同选择/取消选择
- 支持合同金额拆分（将一笔合同拆分为两笔）
- 支持表格分页
- 显示合同编号、名称、经费项目号、合同总金额、可支付金额

## 使用示例

```vue
<template>
  <ins-def-2101 />
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

// 选择/取消选择合同
axios({
    method: 'post',
    url: '/ExpenseApplyUInsV2',
    data: { ajax: true, act: 'confirm_save', request_id: request_ids },
})

// 保存合同拆分
axios({
    method: 'post',
    url: '/ContractSplit',
    data: { ajax: true, act: 'div_save', pay1: pay1, pay2: pay2, request_id: request_id },
})
```
