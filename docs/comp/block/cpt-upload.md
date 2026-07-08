# 附件上传组件

::: tip 组件说明
此组件用于附件上传和管理，支持文件上传、预览、下载和删除功能。常用于需要上传附件的场景。
:::

## 在线演示

<DemoCptUpload />

## 组件属性

| 属性名 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| `apply_id` | String | `''` | 申请单号 |
| `title` | String | `''` | 区域标题（默认为"上传附件"或"附件列表"） |
| `readonly` | Boolean | `false` | 是否为只读模式 |
| `divider` | Boolean | `true` | 是否显示分割线 |
| `tip` | String | `''` | 提示信息 |

## 功能特性

- 支持文件上传（自动上传）
- 支持文件预览（图片、PDF等）
- 支持文件下载
- 支持文件删除
- 支持只读模式（隐藏上传按钮）
- 支持多种文件类型图标显示（PDF、PNG、JPG、DOC、XLS、JAR、ZIP等）
- 支持附件列表为空时显示"无附件"提示

## 使用示例

```vue
<template>
  <cpt-upload
    apply_id="AP202506001"
    title="上传附件"
    :readonly="false"
    tip="请上传相关证明材料"
  />
</template>
```

## 接口调用

```js
// 加载附件列表
axios({
    method: 'post',
    url: '/ExpenseApplyUInsV2',
    data: { ajax: true, act: 'edoc_load' },
})

// 上传附件
// POST /ExpenseApplyUInsV2?ajax=true&act=edoc_upload

// 删除附件
axios({
    method: 'post',
    url: '/ExpenseApplyUInsV2',
    data: { ajax: true, act: 'edoc_delete', docId: file.doc_id, docOrd: file.ord },
})
```
