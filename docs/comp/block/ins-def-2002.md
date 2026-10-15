# 选择资产明细

::: tip 组件说明
此组件用于报销流程中关联资产信息，支持资产列表树形展示、弹窗搜索添加、删除、清空，以及资产总金额自动汇总等功能。常用于资产类报销单选择资产业务批次。
:::

## 功能特性

- 支持资产列表树形结构展示（一级为资产业务批次，展开查看资产明细）
- 支持资产总金额自动汇总
- 支持资产添加（弹窗选择，支持资产业务号、资产编号、资产名称搜索）
- 支持资产删除（逐行删除）与清空（全部移除）
- 已被报销的资产批次禁用选择，并悬浮提示已关联业务单信息
- 支持资产变动（request_type=2）金额取 change_amt，其余取 item_amt
- 支持分页浏览（可选每页 10/20/50 条）
- 显示资产业务号、业务类型、资产明细、总金额

## 使用示例

```html
<script type="text/javascript" charset="UTF-8">
    document.write('<script src="/saap/component/ins-def-2002.js?v=' + Date.now() +'" type="text/javascript" charset="UTF-8"><\/script>');
</script>

<!-- 一般配合框架使用（editable 控制添加/删除/清空按钮） -->
<ins-def-2002
    v-if="item.panel_id === '2002'"
    :ref="'cpt' + item.panel_id"
    editable="T"
    @re-load="reload"
>
</ins-def-2002>

<!-- 查看模式：editable 传 F，隐藏操作按钮 -->
<ins-def-2002 editable="F"></ins-def-2002>
```

## API

### 属性

| 属性名   | 说明                                       | 类型     | 默认值 |
| :------- | :----------------------------------------- | :------- | :----- |
| editable | 是否可编辑（T-显示添加/删除/清空按钮，F-只读） | `String` | ''     |

### 内部弹窗（选择资产）属性

| 属性名        | 说明               | 类型      | 默认值 |
| :------------ | :----------------- | :-------- | :----- |
| isShowWindow  | 弹窗显示状态（.sync） | `Boolean` | false  |
| assetSingle   | 是否单选（当前已停用单选逻辑） | `Boolean` | false |

### 方法

| 方法名 | 说明                     | 类型         |
| :----- | :----------------------- | :----------- |
| load   | 重新加载已选资产列表     | `() => void` |
| save   | 保存业务表单（预留逻辑） | `() => void` |

### 事件

| 事件名  | 说明               | 类型         |
| :------ | :----------------- | :----------- |
| re-load | 需要刷新框架时触发 | `() => void` |

### 事件总线

| 事件名             | 说明                                       | 类型                          |
| :----------------- | :----------------------------------------- | :---------------------------- |
| transRealReqsaData | 弹窗确定后回传已选资产批次，主组件监听并保存 | `(selection: Array) => void`  |

## 接口说明

### 加载已选资产列表

- 请求地址：`POST /ExpenseApplyUInsV2`

**请求参数**

| 字段 | 类型      | 是否必传 | 示例           | 说明         |
| ---- | --------- | -------- | -------------- | ------------ |
| ajax | `Boolean` | 是       | true           | 默认         |
| act  | `String`  | 是       | aset_appload   | 接口方法     |

**响应示例**

```json
{
    "success": true,
    "objectMap": {
        "asetReqs": [],
        "vApplyId": ""
    }
}
```

### 保存已选资产

添加、删除、清空后调用，`reqIds` 为全量已选资产业务号（逗号分隔）；清空时传空字符串。

- 请求地址：`POST /ExpenseApplyUInsV2`

**请求参数**

| 字段      | 类型      | 是否必传 | 示例           | 说明                     |
| --------- | --------- | -------- | -------------- | ------------------------ |
| ajax      | `Boolean` | 是       | true           | 默认                     |
| act       | `String`  | 是       | aset_save      | 接口方法                 |
| reqIds    | `String`  | 是       | ZC001,ZC002    | 资产业务号（逗号分隔）   |
| vApplyId  | `String`  | 是       |                | 业务单内存标识码         |

**响应示例**

```json
{
    "success": true
}
```

### 搜索资产批次

选择资产弹窗中，按条件搜索未报销的资产业务批次；无参调用时为初始化加载。

- 请求地址：`POST /ExpenseApplyUInsV2`

**请求参数**

| 字段     | 类型      | 是否必传 | 示例       | 说明                     |
| -------- | --------- | -------- | ---------- | ------------------------ |
| ajax     | `Boolean` | 是       | true       | 默认                     |
| act      | `String`  | 是       | aset_search | 接口方法                |
| itemname | `String`  | 否       | 电脑       | 资产名称（模糊）         |
| reqid    | `String`  | 否       | ZC001      | 资产业务号               |
| itemcode | `String`  | 否       |            | 资产编号                 |

**响应示例**

```json
{
    "success": true,
    "list": [],
    "pagging": [10, 1, 0]
}
```

> 列表项包含 `_prop.dtls` 明细数组；已报销批次 `apply_id` 非空，复选框禁用并显示悬浮提示。

### 资产批次分页

- 请求地址：`POST /ExpenseApplyUInsV2`

**请求参数**

| 字段      | 类型      | 是否必传 | 示例           | 说明         |
| --------- | --------- | -------- | -------------- | ------------ |
| ajax      | `Boolean` | 是       | true           | 默认         |
| act       | `String`  | 是       | aset_pagging   | 接口方法     |
| page_size | `Number`  | 是       | 10             | 每页条数     |
| page_now  | `Number`  | 是       | 1              | 当前页       |

**响应示例**

```json
{
    "success": true,
    "list": [],
    "pagging": [10, 1, 0]
}
```

### 保存业务表单

资产保存后联动保存业务表单数据（源码中 save 方法调用，依赖外部注入的表单数据结构）。

- 请求地址：`POST /ExpenseApply`

**请求参数**

| 字段       | 类型      | 是否必传 | 示例            | 说明                 |
| ---------- | --------- | -------- | --------------- | -------------------- |
| ajax       | `Boolean` | 是       | true            | 默认                 |
| act        | `String`  | 是       | busi_save       | 接口方法             |
| formDatas  | `String`  | 是       | "{}"            | 业务表单 JSON 字符串 |
| vApplyId   | `String`  | 是       |                 | 业务单内存标识码     |

**响应示例**

```json
{
    "success": true
}
```

### 保存车辆等扩展业务数据

- 请求地址：`POST /ExpenseApply`

**请求参数**

| 字段       | 类型      | 是否必传 | 示例            | 说明                     |
| ---------- | --------- | -------- | --------------- | ------------------------ |
| ajax       | `Boolean` | 是       | true            | 默认                     |
| act        | `String`  | 是       | car_save        | 接口方法                 |
| formDatas  | `String`  | 是       | "{}"            | 业务表单+扩展字段 JSON   |
| vApplyId   | `String`  | 是       |                 | 业务单内存标识码         |

**响应示例**

```json
{
    "success": true
}
```
