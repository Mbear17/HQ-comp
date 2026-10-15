# 票据信息

::: tip 组件说明
此组件用于报销流程中的发票管理，支持移动端扫码提取、上传图片从发票池提取、按票号从发票池提取三种方式添加发票，并支持非税票据认证。常用于费用报销单关联发票信息。
:::

## 功能特性

- 支持三种发票提取方式：
  - 移动端扫描提取（微信"扫一扫"，增值税与非税票据均可提取）
  - 上传图片从发票池提取（支持 png、jpg、jpeg、pdf）
  - 按票号从发票池提取（支持单条输入与批量输入）
- 支持非税票据认证（发票代码、发票号码、开票日期、价税合计、校验码）
- 支持发票卡片列表展示（发票类型、销方名称、发票号码、开票日期、价税合计）
- 支持区分增值税发票与财政非税票据展示
- 支持票据图像预览（点击卡片查看大图）
- 支持发票删除（带确认提示）
- 支持表格分页浏览
- 支持票号批量添加（多行输入，逗号/空格分隔自动去重）

## 使用示例

```html
<script type="text/javascript" charset="UTF-8">
    document.write('<script src="/saap/component/ins-def-1001.js?v=' + Date.now() +'" type="text/javascript" charset="UTF-8"><\/script>');
</script>

<!-- 一般配合框架使用 -->
<ins-def-1001
    v-if="item.panel_id === '1001'"
    :ref="'cpt' + item.panel_id"
    title="票据信息"
    :apply_id="apply_id"
    @re-load="reload"
>
</ins-def-1001>
```

## API

### 属性

| 属性名    | 说明             | 类型     | 默认值 |
| :-------- | :--------------- | :------- | :----- |
| title     | 区域标题         | `String` | ''     |
| apply_id  | 业务单号         | `String` | ''     |

### 方法

| 方法名 | 说明               | 类型                       |
| :----- | :----------------- | :------------------------- |
| load   | 重新加载票据列表   | `() => void`               |

### 事件

| 事件名  | 说明               | 类型         |
| :------ | :----------------- | :----------- |
| re-load | 需要刷新框架时触发 | `() => void` |

## 接口说明

以下接口均请求 `POST /ExpenseApplyUInsV2`。

### 加载已选票据列表

**请求参数**

| 字段 | 类型      | 是否必传 | 示例 | 说明         |
| ---- | --------- | -------- | ---- | ------------ |
| ajax | `Boolean` | 是       | true | 默认         |
| act  | `String`  | 是       | inv_appLoad | 接口方法 |

**响应示例**

```json
{
    "success": true,
    "list": [],
    "pagging": [12, 1, 0]
}
```

### 票据列表分页

**请求参数**

| 字段          | 类型      | 是否必传 | 示例 | 说明           |
| ------------- | --------- | -------- | ---- | -------------- |
| ajax          | `Boolean` | 是       | true | 默认           |
| act           | `String`  | 是       | inv_appPagging | 接口方法       |
| page_now_inv  | `Number`  | 是       | 1    | 当前页         |
| page_size_inv | `Number`  | 是       | 12   | 每页条数       |

**响应示例**

```json
{
    "success": true,
    "list": [],
    "pagging": [12, 1, 0]
}
```

### 查验/搜索发票

按票号从发票池查验发票；非税认证时 `invoice_no` 为「发票代码|发票号码|校验码|开票日期|价税合计」拼接串。

**请求参数**

| 字段        | 类型      | 是否必传 | 示例                    | 说明                     |
| ----------- | --------- | -------- | ----------------------- | ------------------------ |
| ajax        | `Boolean` | 是       | true                    | 默认                     |
| act         | `String`  | 是       | inv_search              | 接口方法                 |
| invoice_no  | `String`  | 是       | 12345678901234567890    | 发票号码（逗号分隔可多条） |

**响应示例**

```json
{
    "success": true,
    "objectMap": {
        "inv_docs": [],
        "not_founds": "111111",
        "sel_inv_nos": "222222"
    }
}
```

### 保存已选票据

**请求参数**

| 字段        | 类型      | 是否必传 | 示例                 | 说明               |
| ----------- | --------- | -------- | -------------------- | ------------------ |
| ajax        | `Boolean` | 是       | true                 | 默认               |
| act         | `String`  | 是       | inv_save             | 接口方法           |
| invoice_no  | `String`  | 是       | 1234,5678            | 选中发票号（逗号分隔） |

**响应示例**

```json
{
    "success": true,
    "objectMap": {
        "errorMsgs": []
    }
}
```

### 删除票据

**请求参数**

| 字段        | 类型      | 是否必传 | 示例           | 说明     |
| ----------- | --------- | -------- | -------------- | -------- |
| ajax        | `Boolean` | 是       | true           | 默认     |
| act         | `String`  | 是       | inv_delete     | 接口方法 |
| invoice_no  | `String`  | 是       | 12345678901234 | 发票号码 |

**响应示例**

```json
{
    "success": true
}
```

### 上传票据影像

- 请求地址：`POST /ExpenseApplyUInsV2?resp=true&act=inv_upload&vApplyId={apply_id}`

由 `el-upload` 直接上传文件（multipart/form-data），上传成功后自动查验并保存。

**请求参数**

| 字段     | 类型     | 是否必传 | 示例    | 说明     |
| -------- | -------- | -------- | ------- | -------- |
| resp     | `Boolean`| 是       | true    | 默认     |
| act      | `String` | 是       | inv_upload | 接口方法 |
| vApplyId | `String` | 是       |         | 业务单号 |

### 生成扫码二维码

- 请求地址：`GET /ExpenseApplyUInsV2?ajax=true&act=inv_createQR`

返回二维码图片，供移动端微信"扫一扫"提取发票。

**请求参数**

| 字段 | 类型      | 是否必传 | 示例 | 说明         |
| ---- | --------- | -------- | ---- | ------------ |
| ajax | `Boolean` | 是       | true | 默认         |
| act  | `String`  | 是       | inv_createQR | 接口方法 |

### 加载票据图像

- 请求地址：`GET /ExpenseApplyUInsV2?act=inv_imgLoad&ajax=true&ord=1&doc_id={doc_id}`

返回票据影像图片，用于卡片预览与弹窗大图查看。

**请求参数**

| 字段   | 类型      | 是否必传 | 示例 | 说明         |
| ------ | --------- | -------- | ---- | ------------ |
| ajax   | `Boolean` | 是       | true | 默认         |
| act    | `String`  | 是       | inv_imgLoad | 接口方法 |
| ord    | `Number`  | 是       | 1    | 图像序号     |
| doc_id | `String`  | 是       |      | 票据文档ID   |
