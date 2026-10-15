# 附件上传组件

::: tip 组件说明
此组件用于附件上传和管理，支持文件自动上传、预览、下载和删除功能，并可根据文件类型展示对应图标。常用于报销单据等需要上传证明附件的场景。
:::

## 功能特性

- 支持文件自动上传（`el-upload`，`auto-upload` 为 true）
- 支持按文件扩展名显示专属图标（PDF、PNG、JPG、DOC、XLS、JAR、ZIP，其他类型显示通用文件图标）
- 支持文件下载（跳转后端下载地址）
- 支持文件删除（非只读模式下显示删除按钮）
- 支持只读模式（隐藏上传按钮，附件为空时显示「无附件」提示）
- 支持自定义区域标题（默认只读为「附件列表」，编辑为「上传附件」）
- 支持顶部提示文案（`tip` 属性，带警告图标）
- 支持底部显示/隐藏分割线（`divider` 属性）

## 使用示例

```html
<script type="text/javascript" charset="UTF-8">
    document.write('<script src="/saap/component/cpt-upload.js?v=' + Date.now() +'" type="text/javascript" charset="UTF-8"><\/script>');
</script>

<!-- 一般配合框架使用 -->
<cpt-upload
    v-if="item.panel_id === 'upload'"
    :ref="'cpt' + item.panel_id"
    @re-load="reload"
    tip="请上传相关证明材料"
>
</cpt-upload>

<!-- 查看模式（只读）下使用 -->
<section class="mb20">
    <cpt-upload readonly title="差旅票据" :apply_id="apply.apply_id"></cpt-upload>
</section>
```

## API

### 属性

| 属性名    | 说明                                           | 类型      | 默认值 |
| :-------- | :--------------------------------------------- | :-------- | :----- |
| apply_id  | 业务单号                                       | `String`  | ''     |
| title     | 区域标题，为空时根据 readonly 显示默认标题     | `String`  | ''     |
| readonly  | 是否为只读模式（隐藏上传/删除按钮）            | `Boolean` | false  |
| divider   | 是否显示底部分割线                            | `Boolean` | true   |
| tip       | 顶部提示文案，为空则不显示提示行               | `String`  | ''     |

### 方法

| 方法名         | 说明                                                     |
| :------------- | :------------------------------------------------------- |
| load           | 加载组件信息（函数名固定），重新拉取附件列表             |
| save           | 保存组件信息（函数名固定），当前仅打印日志               |
| callParentFunc | 触发 `re-load` 事件，通知父组件需要刷新                  |
| edocLoad       | 请求附件列表接口并更新 `fileList`                        |
| handleDownload | 下载指定附件，拼接 `docId`、`docOrd` 跳转下载地址        |
| handleRemove   | 删除指定附件，成功后刷新列表并提示「删除成功！」         |
| onSuccess      | 上传成功回调，重新拉取附件列表                           |
| beforeUpload   | 上传前回调，当前为空实现                                 |

### 事件

| 事件名  | 说明               | 回调参数   |
| :------ | :----------------- | :--------- |
| re-load | 需要刷新框架时触发 | ''（空字符串） |

## 接口说明

### 加载附件列表

- 请求地址：`POST /ExpenseApplyUInsV2`

**请求参数**

| 字段  | 类型      | 是否必传 | 示例  | 说明     |
| ----- | --------- | -------- | ----- | -------- |
| ajax  | `Boolean` | 是       | true  | 默认     |
| act   | `String`  | 是       | edoc_load | 接口方法 |

**响应示例**
```json
{
    "success": true,
    "objectMap": {
        "files": []    // 附件列表，含 doc_id、ord、ori_filename、ori_fileext 等字段
    }
}
```

### 上传附件

- 请求地址：`POST /ExpenseApplyUInsV2?ajax=true&act=edoc_upload`
- 说明：由 `el-upload` 的 `action` 直接上传，上传成功后触发 `onSuccess` 重新加载列表。

**请求参数**

| 字段   | 类型     | 是否必传 | 示例    | 说明         |
| ------ | -------- | -------- | ------- | ------------ |
| file   | `File`   | 是       | -       | 上传的文件流 |

### 下载附件

- 请求地址：`GET /ExpenseApplyUInsV2?ajax=true&act=edoc_download&docId={docId}&docOrd={docOrd}`
- 说明：通过 `window.location.href` 直接跳转下载。

**请求参数**

| 字段    | 类型     | 是否必传 | 示例    | 说明         |
| ------- | -------- | -------- | ------- | ------------ |
| ajax    | `Boolean`| 是       | true    | 默认         |
| act     | `String` | 是       | edoc_download | 接口方法 |
| docId   | `String` | 是       |         | 附件文档ID   |
| docOrd  | `String` | 是       |         | 附件序号     |

### 删除附件

- 请求地址：`POST /ExpenseApplyUInsV2`

**请求参数**

| 字段   | 类型      | 是否必传 | 示例        | 说明         |
| ------ | --------- | -------- | ----------- | ------------ |
| ajax   | `Boolean` | 是       | true        | 默认         |
| act    | `String`  | 是       | edoc_delete | 接口方法     |
| docId  | `String`  | 是       |             | 附件文档ID   |
| docOrd | `String`  | 是       |             | 附件序号     |

**响应示例**
```json
{
    "success": true
}
```

## 版本说明

1. **只读模式通过注入全局样式实现**

`readonly` 为 true 时，组件在 `created` 阶段向 `document.head` 注入样式隐藏上传入口（`.el-upload--picture-card { display: none !important; }`），删除按钮则通过 `v-show="!readonly"` 控制。
