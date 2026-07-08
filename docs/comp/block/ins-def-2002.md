# 选择资产明细

::: tip 组件说明
此组件用于选择和管理资产明细信息，支持资产添加、删除、清空，以及资产总金额计算等功能。
:::

## 在线演示

<DemoInsDef2002 />

## 组件属性

| 属性名 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| `editable` | String | `''` | 是否可编辑（`'T'` 为可编辑） |

## 功能特性

- 支持资产列表展示（树形结构，可展开查看明细）
- 支持资产添加（弹窗选择，支持资产业务号、资产编号、资产名称搜索）
- 支持资产删除（带确认）
- 支持资产清空
- 支持资产总金额自动计算
- 支持分页浏览
- 显示资产业务号、业务类型、资产明细、总金额

## 使用示例

```vue
<template>
  <ins-def-2002 editable="T" />
</template>
```

## 接口调用

```js
// 加载已选资产列表
axios({
    method: 'post',
    url: '/ExpenseApplyUInsV2',
    data: { ajax: true, act: 'aset_appload' },
})

// 搜索资产（弹窗中）
axios({
    method: 'post',
    url: '/ExpenseApplyUInsV2',
    data: { ajax: true, act: 'aset_search', itemname: '', reqid: '', itemcode: '' },
})

// 保存资产选择
axios({
    method: 'post',
    url: '/ExpenseApplyUInsV2',
    data: { ajax: true, act: 'aset_save', reqIds: reqIds, vApplyId: vApplyId },
})
```
