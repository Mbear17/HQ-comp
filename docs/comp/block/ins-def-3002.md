# 城市间交通

::: tip 组件说明
此组件用于维护差旅报销单中的城市间交通行程，支持行程内联添加、编辑、删除、同行人员合并显示及合计金额自动计算等功能。常用于差旅报销流程中的交通费用登记。
:::

## 功能特性

- 展示交通行程列表（出差人员、差标等级、行程日期、出发站、到达站、交通工具、舱位/等级、票面金额、实报金额）
- 支持编辑/保存切换，保存前逐行必填校验
- 支持内联添加行程行
- 支持行程删除（带确认提示，前端新增未保存行直接移除）
- 非编辑态下同行人员（相同出差人员）的"出差人员""差标等级"两列自动行合并
- 交通工具与舱位等级联动（切换交通工具后清空并重选舱位）
- 表尾合计实报金额自动计算
- 支持查看模式（detail），只读展示

## 使用示例

```html
<script type="text/javascript" charset="UTF-8">
    document.write('<script src="/saap/component/ins-def-3002.js?v=' + Date.now() +'" type="text/javascript" charset="UTF-8"><\/script>');
</script>

<!-- 一般配合框架使用 -->
<ins-def-3002
    v-if="item.panel_id === '3002'"
    :ref="'cpt' + item.panel_id"
    :datacheck_msg="datacheck.msg3002"
    @re-load="reload"
>
</ins-def-3002>

<!-- 查看模式下使用 -->
<section class="mb20" v-if="expend_ins.some(item => item.panel_id === '3002')">
    <ins-def-3002 detail :datacheck_msg="datacheck.msg3002"></ins-def-3002>
</section>
```

## API

### 属性

| 属性名         | 说明                       | 类型      | 默认值 |
| :------------- | :------------------------- | :-------- | :----- |
| detail         | 是否为查看模式             | `Boolean` | false  |
| datacheck_msg  | 数据校验提示信息（展示用） | `String`  | ''     |

### 方法或事件

| 事件名  | 说明               | 类型         |
| :------ | :----------------- | :----------- |
| re-load | 需要刷新框架时触发 | `() => void` |

组件内置固定方法：`load(flag)` 加载行程与人员数据（flag 为 'T' 时先刷新编辑初始化数据再加载并触发 re-load）。

## 接口说明

### 加载交通行程列表

- 请求地址：`POST /ExpenseApplyUTravelV2`

**请求参数**

| 字段 | 类型      | 是否必传 | 示例 | 说明     |
| ---- | --------- | -------- | ---- | -------- |
| ajax | `Boolean` | 是       | true | 默认     |
| act  | `String`  | 是       | traffic_load | 接口方法 |

**响应示例**
```json
{
    "success": true,
    "objectMap": {
        "travels": [
            {
                "ord": 100,
                "traveller_uid": "zhangsan",
                "traveller_name": "张三",
                "traveller_std": "1",
                "riding_date": "2025-01-02",
                "station_from": "北京南",
                "station_to": "济南西",
                "traffic_type": "火车",
                "seat_grade": "二等座",
                "transport_ticket": 184.5,
                "transport_amt": 184.5
            }
        ]
    }
}
```

### 加载编辑初始化数据（人员/舱位/差标等级）

- 请求地址：`POST /ExpenseApplyUTravelV2`

**请求参数**

| 字段 | 类型      | 是否必传 | 示例 | 说明     |
| ---- | --------- | -------- | ---- | -------- |
| ajax | `Boolean` | 是       | true | 默认     |
| act  | `String`  | 是       | traffic_editinit | 接口方法 |

**响应示例**
```json
{
    "success": true,
    "objectMap": {
        "teams": [],      // 出差团队人员列表
        "seats": [],      // 交通工具/舱位等级对照
        "stdlevels": []   // 差标等级列表
    }
}
```

### 加载人员级别选项

- 请求地址：`POST /ExpenseSolution`

**请求参数**

| 字段 | 类型      | 是否必传 | 示例 | 说明     |
| ---- | --------- | -------- | ---- | -------- |
| ajax | `Boolean` | 是       | true | 默认     |
| act  | `String`  | 是       | TravelRank | 接口方法 |

**响应示例**
```json
{
    "success": true,
    "objectMap": {
        "rank": []    // 人员级别列表
    }
}
```

### 保存交通行程

- 请求地址：`POST /ExpenseApplyUTravelV2`

**请求参数**

| 字段       | 类型      | 是否必传 | 示例 | 说明                     |
| ---------- | --------- | -------- | ---- | ------------------------ |
| ajax       | `Boolean` | 是       | true | 默认                     |
| act        | `String`  | 是       | traffic_editsave | 接口方法         |
| ord        | `Number`  | 否       | 100  | 行号（单行保存时传递）   |
| formDatas  | `String`  | 是       | []   | 行程数据 JSON（保存全部时为数组） |

**响应示例**
```json
{
    "success": true
}
```

### 删除交通行程

- 请求地址：`POST /ExpenseApplyUTravelV2`

**请求参数**

| 字段 | 类型      | 是否必传 | 示例 | 说明     |
| ---- | --------- | -------- | ---- | -------- |
| ajax | `Boolean` | 是       | true | 默认     |
| act  | `String`  | 是       | traffic_delete | 接口方法 |
| ord  | `Number`  | 是       | 100  | 行号     |

**响应示例**
```json
{
    "success": true
}
```

### 交通数据校验

- 请求地址：`POST /ExpenseApplyUTravelV2`

**请求参数**

| 字段 | 类型      | 是否必传 | 示例 | 说明     |
| ---- | --------- | -------- | ---- | -------- |
| ajax | `Boolean` | 是       | true | 默认     |
| act  | `String`  | 是       | traffic_datacheck | 接口方法 |

**响应示例**
```json
{
    "success": true
}
```

### 加载费用科目定义（保留）

- 请求地址：`POST /ExpenseApplyUTravelV2`

**请求参数**

| 字段           | 类型      | 是否必传 | 示例            | 说明     |
| -------------- | --------- | -------- | --------------- | -------- |
| ajax           | `Boolean` | 是       | true            | 默认     |
| act            | `String`  | 是       | expend_load     | 接口方法 |
| amt_dealtypes  | `String`  | 是       | 2011            | 费用处理类型 |

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

## 版本说明

源码中"添加其他行程"按钮已通过 `v-if="false"` 隐藏，但对应弹窗与 `traffic_editsave` 后端逻辑仍保留；`expend_load`、`busi_save`、`car_save` 相关业务费用联动逻辑同样保留在源码中，当前调用已被注释。
