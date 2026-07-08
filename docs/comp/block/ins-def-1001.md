# 票据信息

::: tip 组件说明
此组件用于发票管理，支持移动端扫码提取、图片上传提取、票号输入提取三种方式添加发票，并支持非税票据认证。
:::

## 在线演示

<DemoInsDef1001 />

## 组件属性

| 属性名 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| `title` | String | `''` | 区域标题 |
| `apply_id` | String | `''` | 申请单号 |

## 功能特性

- 支持三种发票提取方式：
  - 移动端扫描提取（微信扫码）
  - 上传图片从发票池提取（支持 png、jpg、jpeg、pdf）
  - 按票号从发票池提取（支持批量输入）
- 支持非税票据认证（发票代码、发票号码、开票日期、价税合计、校验码）
- 支持发票列表展示（卡片样式，显示发票类型、金额、日期等）
- 支持发票图像预览
- 支持发票删除（带确认提示）
- 支持分页浏览

## 使用示例

```vue
<template>
  <ins-def-1001 title="票据信息" apply_id="AP202506001" />
</template>
```

## 接口调用

```js
// 加载已选发票列表
axios({
    method: 'post',
    url: '/ExpenseApplyUInsV2',
    data: { ajax: true, act: 'inv_appLoad' },
})

// 搜索发票（按票号）
axios({
    method: 'post',
    url: '/ExpenseApplyUInsV2',
    data: { ajax: true, act: 'inv_search', invoice_no: invoice_no },
})

// 保存已选发票
axios({
    method: 'post',
    url: '/ExpenseApplyUInsV2',
    data: { ajax: true, act: 'inv_save', invoice_no: invoice_nos },
})

// 删除发票
axios({
    method: 'post',
    url: '/ExpenseApplyUInsV2',
    data: { ajax: true, act: 'inv_delete', invoice_no: invoice_no },
})
```
