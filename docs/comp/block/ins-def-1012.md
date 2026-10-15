# 多文件上传组件

::: tip 组件说明
此组件用于按类别分组上传多类附件，支持必传/选传标签、运行时单选控制上传条件、文件预览下载删除、范例文件下载等功能。常用于报销单需要上传多种类型业务附件的场景。
:::

## 功能特性

- 支持多类别文件分组上传（按 `doc_items` 配置渲染上传区）
- 支持必传/选传标签显示（根据 `up_require` 与运行时选项动态判断）
- 支持运行时选项（单选按钮控制是否需要上传，选项值持久化到后端）
- 支持文件上传（默认允许 png、jpg、jpeg、pdf、doc、docx、xls、xlsx，可通过 `attachtypes` 自定义）
- 支持文件预览/下载、删除（带确认提示）
- 支持范例文件下载
- 支持文件类型图标显示（Word、Excel、PPT、PDF、TXT、图片等）
- 支持数据校验提示消息（`datacheck_msg`）
- 上传/删除后自动刷新当前类别文件列表

## 使用示例

```html
<script type="text/javascript" charset="UTF-8">
    document.write('<script src="/saap/component/ins-def-1012.js?v=' + Date.now() +'" type="text/javascript" charset="UTF-8"><\/script>');
</script>

<!-- 一般配合框架使用 -->
<ins-def-1012
    v-if="item.panel_id === '1012'"
    :ref="'cpt' + item.panel_id"
    :title="item.title"
    :apply_id="apply_id"
    :matter_code="matter_code"
    :component_id="item.component_id"
    :doc_items="item.doc_items"
    :datacheck_msg="item.datacheck_msg"
    :attachtypes="item.attachtypes"
    @re-load="reload"
>
</ins-def-1012>
```

## API

### 属性

| 属性名          | 说明                                           | 类型             | 默认值 |
| :-------------- | :--------------------------------------------- | :--------------- | :----- |
| title           | 区域标题                                       | `String`         | ''     |
| apply_id        | 业务单号                                       | `String`         | ''     |
| matter_code     | 事项编码                                       | `String`         | ''     |
| component_id    | 组件ID                                         | `String`         | ''     |
| doc_items       | 附件类别配置列表（含 doc_ord、doc_desc、up_require、opt1_content 等） | `Array` | []  |
| datacheck_msg   | 数据校验提示消息                               | `String`         | ''     |
| attachtypes     | 允许上传的文件扩展名（逗号分隔），为空时使用默认列表 | `String`     | ''     |

### 方法

| 方法名 | 说明                 | 类型         |
| :----- | :------------------- | :----------- |
| load   | 重新加载文件列表     | `() => void` |

### 事件

| 事件名  | 说明               | 类型         |
| :------ | :----------------- | :----------- |
| re-load | 需要刷新框架时触发 | `() => void` |

## 接口说明

以下接口均请求 `POST /ExpenseApplyUInsV2`。

### 加载附件文件列表

**请求参数**

| 字段     | 类型      | 是否必传 | 示例         | 说明         |
| -------- | --------- | -------- | ------------ | ------------ |
| ajax     | `Boolean` | 是       | true         | 默认         |
| act      | `String`  | 是       | ins_edocinit | 接口方法     |
| doc_ord  | `Number`  | 是       | 1            | 附件类别序号 |

**响应示例**

```json
{
    "success": true,
    "files": [],
    "list": [],
    "objectMap": {
        "docList": [],
        "files": []
    }
}
```

> 文件列表可能直接返回数组，也可能嵌套在 `docFiles` 子级中，组件会自动展平处理。

### 上传附件

- 请求地址：`POST /ExpenseApplyUInsV2?resp=true&act=ins_edocupload&docTitle={docTitle}&doc_ord={doc_ord}&filename={filename}`

由 `el-upload` 直接上传文件（multipart/form-data），上传成功后自动刷新当前类别文件列表。

**请求参数**

| 字段      | 类型     | 是否必传 | 示例          | 说明             |
| --------- | -------- | -------- | ------------- | ---------------- |
| resp      | `Boolean`| 是       | true          | 默认             |
| act       | `String` | 是       | ins_edocupload| 接口方法         |
| docTitle  | `String` | 是       | 合同扫描件    | 附件类别名称     |
| doc_ord   | `Number` | 是       | 1             | 附件类别序号     |
| filename  | `String` | 是       | a.pdf         | 上传文件名       |

### 删除附件

**请求参数**

| 字段        | 类型      | 是否必传 | 示例 | 说明               |
| ----------- | --------- | -------- | ---- | ------------------ |
| ajax        | `Boolean` | 是       | true | 默认               |
| act         | `String`  | 是       | ins_edocdelete | 接口方法   |
| docId       | `String`  | 是       |      | 附件文档ID         |
| docOrd      | `String`  | 是       |      | 附件序号           |
| ins_doc_ord | `Number`  | 是       | 1    | 附件类别序号       |

**响应示例**

```json
{
    "success": true
}
```

### 预览/下载附件

- 请求地址：`POST /ExpenseApplyUInsV2?resp=true&act=ins_edocDown&doc_id={doc_id}&doc_ord={doc_ord}`

点击文件名预览、下载范例文件时，通过 `window.open` 打开。

**请求参数**

| 字段     | 类型     | 是否必传 | 示例         | 说明         |
| -------- | -------- | -------- | ------------ | ------------ |
| resp     | `Boolean`| 是       | true         | 默认         |
| act      | `String` | 是       | ins_edocDown | 接口方法     |
| doc_id   | `String` | 是       |              | 附件文档ID   |
| doc_ord  | `String` | 是       |              | 附件序号     |

### 保存运行时选项

单选按钮切换时，将当前选项值保存到后端。

**请求参数**

| 字段           | 类型      | 是否必传 | 示例              | 说明               |
| -------------- | --------- | -------- | ----------------- | ------------------ |
| ajax           | `Boolean` | 是       | true              | 默认               |
| act            | `String`  | 是       | ins_datasave      | 接口方法           |
| component_id   | `String`  | 是       |                   | 组件ID             |
| doc_ord        | `Number`  | 是       | 1                 | 附件类别序号       |
| runtime_data01 | `String`  | 是       | 1                 | 当前选中的选项值   |

**响应示例**

```json
{
    "success": true
}
```
