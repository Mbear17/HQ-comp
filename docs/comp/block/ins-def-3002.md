# 城市间交通

::: tip 组件说明
此组件用于管理城市间交通行程信息，支持交通行程的添加、编辑、删除等操作。常用于差旅报销流程中。
:::

## 在线演示

<DemoInsDef3002 />

## 组件属性

| 属性名 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| `datacheck_msg` | String | `''` | 数据检测提示信息 |

## 功能特性

- 支持交通行程列表展示
- 支持行程添加（内联或弹窗）
- 支持行程编辑（出差人员、差标等级、行程日期、出发站、到达站、交通工具、舱位/等级、票面金额、实报金额）
- 支持行程删除（带确认提示）
- 支持同行人员行合并显示
- 支持合计金额自动计算
- 支持交通工具和舱位等级联动

## 使用示例

```vue
<template>
  <ins-def-3002 />
</template>
```

## 接口调用

```js
// 加载交通行程列表
axios({
    method: 'post',
    url: '/ExpenseApplyUTravelV2',
    data: { ajax: true, act: 'traffic_load' },
})

// 保存交通行程
axios({
    method: 'post',
    url: '/ExpenseApplyUTravelV2',
    data: { ajax: true, act: 'traffic_editsave', ord: row.ord, formDatas: JSON.stringify(row) },
})

// 删除交通行程
axios({
    method: 'post',
    url: '/ExpenseApplyUTravelV2',
    data: { ajax: true, act: 'traffic_delete', ord: row.ord },
})
```
