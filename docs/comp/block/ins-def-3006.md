# 选择订单（高德）

::: tip 组件说明
此组件用于选择高德（AMAP）平台的订单信息，支持按预定人员模糊搜索、订单选择/取消选择等功能。常用于差旅报销流程中关联高德订单。
:::

## 功能特性

- 显示订单编号、预定人、报销人、订单概要、订单日期、金额
- 支持按预定人员模糊搜索订单
- 支持订单选择/取消选择，已申请订单显示"已申请"且不可再选
- 已选订单置顶显示并高亮行样式
- 支持表格分页
- 支持查看模式（`detail`，只读展示订单信息，隐藏搜索与选择列）
- 支持数据校验消息提示（`datacheck_msg`）
- 订单加载接口固定以 `plat_id = AMAP`（高德）标识平台

## 使用示例

```html
<script type="text/javascript" charset="UTF-8">
    document.write('<script src="/saap/component/ins-def-3006.js?v=' + Date.now() +'" type="text/javascript" charset="UTF-8"><\/script>');
</script>

<!-- 一般配合框架使用 -->
<ins-def-3006
    v-if="item.panel_id === '3006'"
    :ref="'cpt' + item.panel_id"
    @re-load="reload"
    :datacheck_msg="datacheckMsgMap[item.panel_id] || ''"
>
</ins-def-3006>

<!-- 查看模式下使用 -->
<ins-def-3006 detail :apply_id="apply.apply_id"></ins-def-3006>
```

## API

### 属性

| 属性名         | 说明               | 类型      | 默认值 |
| :------------- | :----------------- | :-------- | :----- |
| detail         | 是否为查看模式     | `Boolean` | false  |
| apply_id       | 业务单号           | `String`  | ''     |
| datacheck_msg  | 数据校验提示消息   | `String`  | ''     |

### 方法

| 事件名  | 说明               | 类型         |
| :------ | :----------------- | :----------- |
| re-load | 需要刷新框架时触发 | `() => void` |

组件同时提供固定命名方法：`load()`（重新加载数据）、`save()`（保存入口）。

## 接口说明

### 获取筛选条件（差旅行程）

- 请求地址：`POST /ExpenseApplyUTravelV2`

**请求参数**

| 字段 | 类型      | 是否必传 | 示例 | 说明     |
| ---- | --------- | -------- | ---- | -------- |
| ajax | `Boolean` | 是       | true | 默认     |
| act  | `String`  | 是       | orders_loadFilter | 接口方法 |

**响应示例**
```json
{
    "success": true,
    "isOvertime": false,
    "objectMap": {
        "applys": []    // 差旅行程列表
    }
}
```

### 初始化订单列表

- 请求地址：`POST /ExpenseApplyUTravelV2`
- 说明：加载已选中的订单，随后触发订单查询与分页。

**请求参数**

| 字段 | 类型      | 是否必传 | 示例 | 说明     |
| ---- | --------- | -------- | ---- | -------- |
| ajax | `Boolean` | 是       | true | 默认     |
| act  | `String`  | 是       | orders_init | 接口方法 |

**响应示例**
```json
{
    "success": true,
    "isOvertime": false,
    "objectMap": {
        "orders": []    // 已选中的订单列表
    }
}
```

### 加载订单列表（高德）

- 请求地址：`POST /ExpenseApplyUTravelV2`

**请求参数**

| 字段     | 类型      | 是否必传 | 示例     | 说明                         |
| -------- | --------- | -------- | -------- | ---------------------------- |
| ajax     | `Boolean` | 是       | true     | 默认                         |
| act      | `String`  | 是       | settle_load | 接口方法（方法名 orders_load） |
| plat_id  | `String`  | 是       | AMAP     | 固定为 AMAP，代表高德        |
| trip_id  | `Array`   | 否       | []       | 差旅行程 ID 列表             |
| vague    | `String`  | 否       | 张三     | 预定人员模糊关键字           |

**响应示例**
```json
{
    "success": true,
    "isOvertime": false
}
```

### 订单列表分页

- 请求地址：`POST /ExpenseApplyUTravelV2`

**请求参数**

| 字段 | 类型      | 是否必传 | 示例 | 说明                                  |
| ---- | --------- | -------- | ---- | ------------------------------------- |
| ajax | `Boolean` | 是       | true | 默认                                  |
| act  | `String`  | 是       | settle_pagging | 接口方法（方法名 orders_pagging） |
| page | `Number`  | 是       | 1    | 当前页                                |

**响应示例**
```json
{
    "success": true,
    "isOvertime": false,
    "pagging": [10, 1, 2],
    "list": []    // 订单列表
}
```

### 选择订单

- 请求地址：`POST /ExpenseApplyUTravelV2`

**请求参数**

| 字段      | 类型      | 是否必传 | 示例             | 说明                             |
| --------- | --------- | -------- | ---------------- | -------------------------------- |
| ajax      | `Boolean` | 是       | true             | 默认                             |
| act       | `String`  | 是       | orders_add       | 接口方法                         |
| plat_id   | `String`  | 是       | AMAP             | 平台标识（点击行选择时取行数据） |
| order_no  | `String`  | 否       | 1132546488133534 | 订单ID（选择订单时使用）         |
| pre_appid | `String`  | 否       | 1132546488133534 | 订单ID（关联差旅行程选择时使用） |

**响应示例**
```json
{
    "success": false,
    "isOvertime": false
}
```

### 取消选择订单

- 请求地址：`POST /ExpenseApplyUTravelV2`

**请求参数**

| 字段      | 类型      | 是否必传 | 示例             | 说明                             |
| --------- | --------- | -------- | ---------------- | -------------------------------- |
| ajax      | `Boolean` | 是       | true             | 默认                             |
| act       | `String`  | 是       | orders_cancel    | 接口方法                         |
| plat_id   | `String`  | 是       | AMAP             | 平台标识（点击行取消时取行数据） |
| order_no  | `String`  | 否       | 1132546488133534 | 订单ID（取消订单时使用）         |
| pre_appid | `String`  | 否       | 1132546488133534 | 订单ID（取消差旅行程关联时使用） |

**响应示例**
```json
{
    "success": false,
    "isOvertime": false
}
```

### 加载订单（detail模式）

- 请求地址：`POST /ExpenseApplyUQuery`

**请求参数**

| 字段     | 类型      | 是否必传 | 示例                      | 说明     |
| -------- | --------- | -------- | ------------------------- | -------- |
| ajax     | `Boolean` | 是       | true                      | 默认     |
| act      | `String`  | 是       | query_load_TravelV2Orders | 接口方法 |
| applyId  | `String`  | 是       |                           | 业务单ID |

**响应示例**
```json
{
    "success": true,
    "isOvertime": false,
    "objectMap": {
        "orders": []    // 订单列表
    }
}
```

## 版本说明

1. **北科大高德定制**

源码注释标明本组件为北科大高德选择订单定制组件，订单加载固定 `plat_id` 为 `AMAP`：
```js
// 北科大高德选择订单
const InsDef3006 = {
```
