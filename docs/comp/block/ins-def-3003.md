# 住宿及补助

::: tip 组件说明
此组件用于管理住宿及补助信息，支持住宿行程的添加、编辑、删除，以及住宿标准查看等功能。常用于差旅报销流程中。
:::

## 在线演示

<DemoInsDef3003 />

## 组件属性

| 属性名 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| `detail` | Boolean | `false` | 是否为查看模式 |
| `apply_id` | String | `''` | 申请单号 |
| `datacheck_msg` | String | `''` | 数据检测提示信息 |

## 功能特性

- 支持住宿行程列表展示（树形结构，支持同住人）
- 支持住宿行程添加（弹窗选择人员、城市、日期等）
- 支持住宿行程编辑（出差人员、差标等级、省市、入住日期、住宿天数、行程天数、住宿费、伙食补贴、交通补贴）
- 支持住宿行程删除（带确认提示）
- 支持统一安排勾选
- 支持学生补助设置（全额、减半、按差旅办法）
- 支持住宿及补贴标准查看
- 支持超标确认
- 支持合计金额自动计算

## 使用示例

```vue
<template>
  <ins-def-3003 />
</template>
```

## 接口调用

```js
// 加载住宿列表
axios({
    method: 'post',
    url: '/ExpenseApplyUTravelV2',
    data: { ajax: true, act: 'hotel_load' },
})

// 保存住宿行程
axios({
    method: 'post',
    url: '/ExpenseApplyUTravelV2',
    data: { ajax: true, act: 'hotel_save', formDatas: JSON.stringify(formData) },
})

// 添加住宿行程
axios({
    method: 'post',
    url: '/ExpenseApplyUTravelV2',
    data: { ajax: true, act: 'hotel_add', traveller_uids: uids, std_ord: city, stay_date: date, stay_days: days },
})
```
