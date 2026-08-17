# 选择订单（携程）

::: tip 组件说明
此组件用于选择携程平台的订单信息，支持订单搜索、选择、差旅行程关联等功能。常用于差旅报销流程中关联携程订单。
:::

## 图示

![image](/images/cpt-img/ins-def-3005.png)

## 功能特性

- 显示订单编号、预定人、报销人、订单概要、订单日期、金额
- 支持按预定人员搜索订单
- 支持按差旅行程筛选订单（多选）
- 支持订单选择/取消选择
- 支持订单与差旅行程关联/取消关联
- 支持表格分页

## 使用示例

```html
<script type="text/javascript" charset="UTF-8">
    document.write('<script src="/saap/component/ins-def-3005.js?v=' + Date.now() +'" type="text/javascript" charset="UTF-8"><\/script>');
</script>

<!-- 一般配合框架使用 -->
<ins-def-3005
    v-if="item.panel_id === '3005'"
    :ref="'cpt' + item.panel_id"
    @re-load="reload"
>
</ins-def-3005>

<!-- 查看模式下使用 -->
<section class="mb20" v-if="expend_ins.some(item => item.panel_id === '3005')">
    <ins-def-3005 detail :apply_id="apply.apply_id"></ins-def-3005>
</section>
```

## API

### 属性

| 属性名   | 说明           | 类型      | 默认值 |
| :------- | :------------- | :-------- | :----- |
| detail   | 是否为查看模式 | `Boolean` | false  |
| apply_id | 业务单号       | `String`  | ''     |

### 方法

| 事件名  | 说明               | 类型         |
| :------ | :----------------- | :----------- |
| re-load | 需要刷新框架时触发 | `() => void` |

## 接口说明

### 获取差旅行程

- 请求地址：`POST /ExpenseApplyUTravelV2`

**请求参数**

| 字段 | 类型      | 是否必传 | 示例              | 说明     |
| ---- | --------- | -------- | ----------------- | -------- |
| ajax | `Boolean` | 是       | true              | 默认     |
| act  | `String`  | 是       | orders_loadFilter | 接口方法 |

**响应示例**
```json
{
    "success":true,
    "isOvertime":false,
    "objectMap":{
        "applys":[]    // 差旅行程列表
    }
}
```

### 初始化订单列表

- 请求地址：`POST /ExpenseApplyUTravelV2`

**请求参数**

| 字段 | 类型      | 是否必传 | 示例        | 说明     |
| ---- | --------- | -------- | ----------- | -------- |
| ajax | `Boolean` | 是       | true        | 默认     |
| act  | `String`  | 是       | orders_init | 接口方法 |

**响应示例**
```json
{
    "success":true,
    "isOvertime":false,
    "objectMap":{
        "orders":[]    // 已选中的订单
    }
}
```

### 加载订单列表

- 请求地址：`POST /ExpenseApplyUTravelV2`

**请求参数**

| 字段    | 类型      | 是否必传 | 示例        | 说明                                |
| ------- | --------- | -------- | ----------- | ----------------------------------- |
| ajax    | `Boolean` | 是       | true        | 默认                                |
| act     | `String`  | 是       | orders_load | 接口方法                            |
| status  | `String`  | 是       | 3           | 状态： 0-全部、3-未报销、4-无需报销 |
| plat_id | `String`  | 是       | ctrip       | ctrip代表携程                       |

**响应示例**
```json
{
    "success": true,
    "isOvertime": false,
    "pagging": [10, 1, 2],
    "list": [],           // 订单列表
    "objectMap": {
        "staffs": []      // 人员列表
    }
}
```

### 订单列表分页

- 请求地址：`POST /ExpenseApplyUTravelV2`

**请求参数**

| 字段      | 类型      | 是否必传 | 示例           | 说明     |
| --------- | --------- | -------- | -------------- | -------- |
| ajax      | `Boolean` | 是       | true           | 默认     |
| act       | `String`  | 是       | orders_pagging | 接口方法 |
| page      | `Number`  | 是       | 1              | 当前页   |
| page_size | `Number`  | 是       | 10             | 每页条数 |

**响应示例**
```json
{
    "success": true,
    "isOvertime": false,
    "pagging": [10, 1, 2],
    "list": [],           // 订单列表
    "objectMap": {
        "staffs": []      // 人员列表
    }
}
```

### 选择订单

- 请求地址：`POST /ExpenseApplyUTravelV2`

**请求参数**

| 字段      | 类型      | 是否必传 | 示例             | 说明                             |
| --------- | --------- | -------- | ---------------- | -------------------------------- |
| ajax      | `Boolean` | 是       | true             | 默认                             |
| act       | `String`  | 是       | orders_add       | 接口方法                         |
| plat_id   | `String`  | 是       | ctrip            | ctrip代表携程                    |
| order_no  | `String`  | 否       | 1132546488133534 | 订单ID（选择订单时使用）         |
| pre_appid | `String`  | 否       | 1132546488133534 | 订单ID（关联差旅行程选择时使用） |

**响应示例**
```json
{
    "success":false,
    "isOvertime":false,
}
```

### 取消选择订单

- 请求地址：`POST /ExpenseApplyUTravelV2`

**请求参数**

| 字段      | 类型      | 是否必传 | 示例             | 说明                             |
| --------- | --------- | -------- | ---------------- | -------------------------------- |
| ajax      | `Boolean` | 是       | true             | 默认                             |
| act       | `String`  | 是       | orders_cancel    | 接口方法                         |
| plat_id   | `String`  | 是       | ctrip            | ctrip代表携程                    |
| order_no  | `String`  | 否       | 1132546488133534 | 订单ID（选择订单时使用）         |
| pre_appid | `String`  | 否       | 1132546488133534 | 订单ID（关联差旅行程选择时使用） |

**响应示例**
```json
{
    "success":false,
    "isOvertime":false,
}
```

### 加载订单（detail模式）

- 请求地址：`POST /ExpenseApplyUQuery`

**请求参数**

| 字段    | 类型      | 是否必传 | 示例                      | 说明     |
| ------- | --------- | -------- | ------------------------- | -------- |
| ajax    | `Boolean` | 是       | true                      | 默认     |
| act     | `String`  | 是       | query_load_TravelV2Orders | 接口方法 |
| applyId | `String`  | 是       |                           | 业务单ID |

**响应示例**
```json
{
    "success": true,
    "isOvertime": false,
    "objectMap": {
        "orders": []      // 订单列表
    }
}
```

## 版本说明

1. **差旅行程各学校不一致**

目前仅有CUP有差旅行程，代码差异如下：
```html{1}
<el-form-item v-if="unitCode === 'CUP'" label="差旅行程:">
    <el-select clearable filterable multiple collapse-tags v-model="selectedApplys" placeholder="请选择差旅行程" style="width: 350px;" @change="handleApplysChange">
        <el-option v-for="item in applysList" :key="item.apply_id" :label="item.apply_id + '-' + item.apply_abst" :value="item.apply_id"></el-option>
    </el-select>
</el-form-item>
```