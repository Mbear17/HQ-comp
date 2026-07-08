# 出差人员列表

::: tip 组件说明
此组件用于管理出差人员信息，支持人员添加、删除、编辑、排序等操作。常用于差旅报销流程中。
:::

## 在线演示

<DemoInsDef3001 />

## 组件属性

| 属性名 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| `detail` | Boolean | `false` | 是否为查看模式 |
| `apply_id` | String | `''` | 申请单号 |
| `datacheck_msg` | String | `''` | 数据检测提示信息 |

## 功能特性

- 支持出差人员列表展示
- 支持人员添加（弹窗选择）
- 支持人员删除（带确认提示）
- 支持行程起始日、结束日、目的地城市编辑
- 支持拖拽排序
- 支持外单位人员职称选择
- 支持查看模式（只读）

## 使用示例

```vue
<template>
  <ins-def-3001 />
</template>
```

## 接口调用

```js
// 加载人员列表
axios({
    method: 'post',
    url: '/ExpenseApplyUTravelV2',
    data: { ajax: true, act: 'staff_load' },
})

// 添加人员
axios({
    method: 'post',
    url: '/ExpenseApplyUTravelV2',
    data: { ajax: true, act: 'staff_add', formDatas: JSON.stringify(staffData) },
})

// 删除人员
axios({
    method: 'post',
    url: '/ExpenseApplyUTravelV2',
    data: { ajax: true, act: 'staff_del', apply_id: row.apply_id, ord: row.ord },
})

// 保存人员列表
axios({
    method: 'post',
    url: '/ExpenseApplyUTravelV2',
    data: { ajax: true, act: 'staff_save', formDatas: JSON.stringify(tableData) },
})
```
