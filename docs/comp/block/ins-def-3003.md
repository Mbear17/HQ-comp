# 住宿及补助

::: tip 组件说明
此组件用于维护差旅报销单中的住宿行程与补助信息，支持住宿行程添加、编辑、删除、同住人设置、统一安排、学生补助及超标确认等功能。常用于差旅报销流程中的住宿费用与补贴登记。
:::

## 功能特性

- 展示住宿行程树形列表（出差人员、同住人、差标等级、省市、入住日期、住宿天数、行程天数、旺季期间、住宿/伙食/交通的标准与实报金额）
- 支持编辑/保存切换，保存后自动触发数据校验
- 支持弹窗添加住宿行程（多选人员、省市、入住日期、住宿天数、行程天数）
- 支持住宿行程删除（带确认提示，非编辑态删除后自动保存）
- 支持同住人多选（同住人标签展示"+N人同住"）
- 省市/差标等级变更后自动回填住宿费、伙食补贴、交通补贴标准
- 支持"统一安排"勾选与"学生补助"（全额/减半/按差旅办法）设置
- 支持超标确认（"我确认相关差旅标准"）
- 表尾自动合计各标准与实报金额（递归累计子节点）
- 支持查看模式（detail），只读展示

## 使用示例

```html
<script type="text/javascript" charset="UTF-8">
    document.write('<script src="/saap/component/ins-def-3003.js?v=' + Date.now() +'" type="text/javascript" charset="UTF-8"><\/script>');
</script>

<!-- 一般配合框架使用 -->
<ins-def-3003
    v-if="item.panel_id === '3003'"
    :ref="'cpt' + item.panel_id"
    :datacheck_msg="datacheck.msg3003"
    @re-load="reload"
>
</ins-def-3003>

<!-- 查看模式下使用 -->
<section class="mb20" v-if="expend_ins.some(item => item.panel_id === '3003')">
    <ins-def-3003 detail :apply_id="apply.apply_id" :datacheck_msg="datacheck.msg3003"></ins-def-3003>
</section>
```

## API

### 属性

| 属性名         | 说明                       | 类型      | 默认值 |
| :------------- | :------------------------- | :-------- | :----- |
| detail         | 是否为查看模式             | `Boolean` | false  |
| apply_id       | 业务单号（查看模式必传）   | `String`  | ''     |
| datacheck_msg  | 数据校验提示信息（展示用） | `String`  | ''     |

### 方法或事件

| 事件名  | 说明               | 类型         |
| :------ | :----------------- | :----------- |
| re-load | 需要刷新框架时触发 | `() => void` |

组件内置固定方法：`load()` 重新加载人员/城市/住宿数据，`save()` 提交编辑中的住宿列表。

## 接口说明

### 加载人员与差标等级过滤数据

- 请求地址：`POST /ExpenseApplyUTravelV2`

**请求参数**

| 字段 | 类型      | 是否必传 | 示例 | 说明     |
| ---- | --------- | -------- | ---- | -------- |
| ajax | `Boolean` | 是       | true | 默认     |
| act  | `String`  | 是       | hotel_loadFilter | 接口方法 |

**响应示例**
```json
{
    "success": true,
    "objectMap": {
        "teamdtls": [],       // 出差团队人员列表
        "stdlevels": [],      // 差标等级列表
        "showOverFlag": "T",  // 是否显示超标确认
        "overFlag": "F"       // 超标确认状态
    }
}
```

### 加载省市与住宿标准数据

- 请求地址：`POST /ExpenseApplyUTravel`

**请求参数**

| 字段 | 类型      | 是否必传 | 示例 | 说明     |
| ---- | --------- | -------- | ---- | -------- |
| ajax | `Boolean` | 是       | true | 默认     |
| act  | `String`  | 是       | tra_init | 接口方法 |

**响应示例**
```json
{
    "success": true,
    "objectMap": {
        "provMap": {
            "北京市": [
                { "std_ord": "110100", "city": "北京市" }
            ]
        },
        "travelStds": [
            {
                "std_ord": "110100",
                "hotel_std1": 500,
                "hotel_std2": 350,
                "hotel_hotdays": "旺季",
                "meals_std": 100,
                "transport_std": 80
            }
        ]
    }
}
```

### 加载住宿行程列表

- 请求地址：`POST /ExpenseApplyUTravelV2`

**请求参数**

| 字段 | 类型      | 是否必传 | 示例 | 说明     |
| ---- | --------- | -------- | ---- | -------- |
| ajax | `Boolean` | 是       | true | 默认     |
| act  | `String`  | 是       | hotel_load | 接口方法 |

**响应示例**
```json
{
    "success": true,
    "objectMap": {
        "hoteldtls": [
            {
                "ord": "100",
                "traveller_uid": "zhangsan",
                "traveller_name": "张三",
                "traveller_cnt": "0",
                "partner_uid": "[]",
                "room_stdlevel": "1",
                "std_ord": "110100",
                "stay_date": "2025-01-02",
                "stay_days": "3",
                "travel_days": "5",
                "hot_period": "",
                "std_hotel": 500,
                "std_hotelsum": 1500,
                "cost_hotel": 1500,
                "std_meals": 100,
                "cost_meals": 300,
                "std_traffic": 80,
                "cost_traffic": 240,
                "arrang_flag": "0",
                "stustd_flag": "0"
            }
        ]
    }
}
```

### 加载住宿行程列表（detail 模式）

- 请求地址：`POST /ExpenseApplyUQuery`

**请求参数**

| 字段     | 类型      | 是否必传 | 示例             | 说明     |
| -------- | --------- | -------- | ---------------- | -------- |
| ajax     | `Boolean` | 是       | true             | 默认     |
| act      | `String`  | 是       | query_load_TravelV2Hotel | 接口方法 |
| applyId  | `String`  | 是       | BT20250101001    | 业务单ID |

**响应示例**
```json
{
    "success": true,
    "objectMap": {
        "hoteldtls": []    // 住宿行程列表
    }
}
```

### 添加住宿行程

- 请求地址：`POST /ExpenseApplyUTravelV2`

**请求参数**

| 字段           | 类型      | 是否必传 | 示例                              | 说明             |
| -------------- | --------- | -------- | --------------------------------- | ---------------- |
| ajax           | `Boolean` | 是       | true                              | 默认             |
| act            | `String`  | 是       | hotel_add                         | 接口方法         |
| traveller_uids | `String`  | 是       | zhangsan,lisi                     | 出差人员，逗号拼接 |
| std_ord        | `String`  | 是       | 110100                            | 省市编码         |
| stay_date      | `String`  | 是       | 2025-01-02                        | 入住日期         |
| stay_days      | `String`  | 是       | 3                                 | 住宿天数         |
| travel_days    | `String`  | 是       | 5                                 | 行程天数         |

**响应示例**
```json
{
    "success": true
}
```

### 保存住宿行程

- 请求地址：`POST /ExpenseApplyUTravelV2`

**请求参数**

| 字段      | 类型      | 是否必传 | 示例 | 说明                  |
| --------- | --------- | -------- | ---- | --------------------- |
| ajax      | `Boolean` | 是       | true | 默认                  |
| act       | `String`  | 是       | hotel_save | 接口方法          |
| formDatas | `String`  | 是       | []   | 住宿行程数据 JSON 数组 |

**响应示例**
```json
{
    "success": true
}
```

### 统一安排设置

- 请求地址：`POST /ExpenseApplyUTravelV2`

**请求参数**

| 字段        | 类型      | 是否必传 | 示例 | 说明                           |
| ----------- | --------- | -------- | ---- | ------------------------------ |
| ajax        | `Boolean` | 是       | true | 默认                           |
| act         | `String`  | 是       | hotel_arrang | 接口方法                 |
| arrang_flag | `String`  | 是       | 1    | 统一安排：1-是、0-否           |

**响应示例**
```json
{
    "success": true
}
```

### 超标确认

- 请求地址：`POST /ExpenseApplyUTravelV2`

**请求参数**

| 字段     | 类型      | 是否必传 | 示例 | 说明                           |
| -------- | --------- | -------- | ---- | ------------------------------ |
| ajax     | `Boolean` | 是       | true | 默认                           |
| act      | `String`  | 是       | hotel_overstd | 接口方法               |
| overFlag | `String`  | 是       | T    | 超标确认：T-已确认、F-未确认   |

**响应示例**
```json
{
    "success": true
}
```

### 住宿数据校验

- 请求地址：`POST /ExpenseApplyUTravelV2`

**请求参数**

| 字段 | 类型      | 是否必传 | 示例 | 说明     |
| ---- | --------- | -------- | ---- | -------- |
| ajax | `Boolean` | 是       | true | 默认     |
| act  | `String`  | 是       | hotel_datacheck | 接口方法 |

**响应示例**
```json
{
    "success": true
}
```

### 加载费用科目定义（保留）

- 请求地址：`POST /ExpenseApplyUTravelV2`

**请求参数**

| 字段           | 类型      | 是否必传 | 示例                     | 说明     |
| -------------- | --------- | -------- | ------------------------ | -------- |
| ajax           | `Boolean` | 是       | true                     | 默认     |
| act            | `String`  | 是       | expend_load              | 接口方法 |
| amt_dealtypes  | `String`  | 是       | 2021,2022,2023           | 费用处理类型 |

**响应示例**
```json
{
    "success": true,
    "objectMap": {
        "expendDefs": []    // 费用科目定义列表
    }
}
```

### 业务费用保存（保留）

- 请求地址：`POST /ExpenseApplyUInsV2`

**请求参数**

| 字段      | 类型      | 是否必传 | 示例 | 说明                     |
| --------- | --------- | -------- | ---- | ------------------------ |
| ajax      | `Boolean` | 是       | true | 默认                     |
| act       | `String`  | 是       | busi_save | 接口方法             |
| formDatas | `String`  | 是       | {}   | 各科目金额数据 JSON      |

**响应示例**
```json
{
    "success": true
}
```

### 车辆费用保存（保留）

- 请求地址：`POST /ExpenseApply`

**请求参数**

| 字段      | 类型      | 是否必传 | 示例 | 说明                     |
| --------- | --------- | -------- | ---- | ------------------------ |
| ajax      | `Boolean` | 是       | true | 默认                     |
| act       | `String`  | 是       | car_save | 接口方法              |
| formDatas | `String`  | 是       | {}   | 各科目金额数据 JSON      |

**响应示例**
```json
{
    "success": true
}
```
