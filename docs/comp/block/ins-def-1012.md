# 多文件上传组件

::: tip 组件说明
此组件用于多文件上传，支持按类别分组上传、文件预览、下载和删除功能。常用于需要上传多种类型附件的场景。
:::

## 在线演示

<DemoInsDef1012 />

## 组件属性

| 属性名 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| `title` | String | `''` | 区域标题 |
| `apply_id` | String | `''` | 申请单号 |
| `matter_code` | String | `''` | 事项代码 |
| `component_id` | String | `''` | 组件ID |
| `doc_items` | Array | `[]` | 文档项列表（包含doc_ord、doc_desc、up_require等字段） |

## 功能特性

- 支持多类别文件分组上传
- 支持必传/选传标签显示
- 支持运行时选项（单选按钮控制上传条件）
- 支持文件预览、下载和删除
- 支持范例文件下载
- 支持文件类型图标显示（Word、Excel、PPT、PDF、TXT等）

## 使用示例

```vue
<template>
  <ins-def-1012
    title="附件资料"
    apply_id="AP202506001"
    :doc_items="docItems"
  />
</template>

<script setup>
const docItems = [
  { doc_ord: '1', doc_desc: '合同扫描件', up_require: 'T', opt1_visible: '1',
    opt1_content: '[{"1":"盖章版"},{"2":"电子版"}]', runtime_opt1val: '1' },
  { doc_ord: '2', doc_desc: '验收报告', up_require: 'F', opt1_visible: '0' },
]
</script>
```

## 接口调用

```js
// 加载文件列表
axios({
    method: 'post',
    url: '/ExpenseApplyUInsV2',
    data: { ajax: true, act: 'ins_edocinit', doc_ord: doc.doc_ord },
})

// 上传文件
// POST /ExpenseApplyUInsV2?resp=true&act=ins_edocupload&docTitle=xxx&doc_ord=xxx

// 删除文件
axios({
    method: 'post',
    url: '/ExpenseApplyUInsV2',
    data: { ajax: true, act: 'ins_edocdelete', docId: file.doc_id, docOrd: file.ord, ins_doc_ord: doc.doc_ord },
})
```
