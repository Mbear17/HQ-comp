# 国际差旅报销

::: tip 组件说明
此组件用于国际差旅报销场景，支持差旅行程与人员信息维护、多币种外币金额录入、汇率折算及折合人民币合计。常用于报账申请单中的国际差旅费用填报。
:::

## 功能特性

- 支持差旅行程信息录入与出差人员职级维护（存在行程费用类型时显示）
- 按费用类型分组录入多币种外币金额，可增删多行明细
- 费用类型支持金额类型 2511 / 2512：分别对应自动汇总与手工填写总金额
- 集成中国银行外汇牌价参考链接，便于录入现汇卖出价
- 汇率信息表格汇总各币种外币金额，按现汇卖出价自动折算人民币
- 折合人民币总计实时联动，并可随保存流程回写业务单
- 附件张数填写，仅允许输入数字
- 同一费用类型下相同币种校验，避免重复填报
- 汇率整数部分限制 5 位，超出时提示
- 支持查看模式（`detail`）及数据检测提示（`datacheck_msg`）

## 使用示例

```html
<script type="text/javascript" charset="UTF-8">
    document.write('<script src="/saap/component/ins-def-3007.js?v=' + Date.now() +'" type="text/javascript" charset="UTF-8"><\/script>');
</script>

<!-- 一般配合框架使用 -->
<ins-def-3007
    v-if="item.panel_id === '3007'"
    :ref="'cpt' + item.panel_id"
    @re-load="reload"
></ins-def-3007>

<!-- 查看模式下使用 -->
<ins-def-3007 detail :apply_id="apply.apply_id"></ins-def-3007>
```

## API

### 属性

| 属性名         | 说明           | 类型      | 默认值 |
| :------------- | :------------- | :-------- | :----- |
| detail         | 是否为查看模式 | `Boolean` | false  |
| apply_id       | 业务单号       | `String`  | ''     |
| datacheck_msg  | 数据检测提示   | `String`  | ''     |

### 方法

| 方法名 | 说明             | 类型                                            |
| :----- | :--------------- | :---------------------------------------------- |
| load   | 加载组件数据     | `(callback?: Function) => void`                 |
| save   | 保存组件数据     | `(vApplyId?: string, callback?: Function) => void` |

### 事件

| 事件名  | 说明               | 类型         |
| :------ | :----------------- | :----------- |
| re-load | 需要刷新框架时触发 | `() => void` |

## 接口说明

### 加载业务费用定义

- 请求地址：`POST /ExpenseApply`

**请求参数**

| 字段 | 类型      | 是否必传 | 示例 | 说明     |
| ---- | --------- | -------- | ---- | -------- |
| ajax | `Boolean` | 是       | true | 默认     |
| act  | `String`  | 是       | busi_load | 接口方法 |

**响应示例**
```json
{
    "success": true,
    "isOvertime": false,
    "objectMap": {
        "busiDefs": [
            {
                "expend_code": "25-0099",
                "expend_name": "国际差旅费",
                "amt_dealtype": "2512",
                "e_desc": "费用说明"
            }
        ]
    }
}
```

### 初始化业务单（获取附件数、人员等）

- 请求地址：`POST /ExpenseApply`

**请求参数**

| 字段 | 类型      | 是否必传 | 示例 | 说明     |
| ---- | --------- | -------- | ---- | -------- |
| ajax | `Boolean` | 是       | true | 默认     |
| act  | `String`  | 是       | car_init | 接口方法 |

**响应示例**
```json
{
    "success": true,
    "isOvertime": false,
    "objectMap": {
        "apply": {
            "invoice_cnt": "2",
            "app_params01": "[[\"U001\",\"张三\",\"教授\"]]"
        },
        "vApplyId": "20260101001"
    }
}
```

### 加载外币及费用金额

- 请求地址：`POST /ExpenseApplyUTravelOld`

**请求参数**

| 字段 | 类型      | 是否必传 | 示例 | 说明     |
| ---- | --------- | -------- | ---- | -------- |
| ajax | `Boolean` | 是       | true | 默认     |
| act  | `String`  | 是       | load | 接口方法 |

**响应示例**
```json
{
    "success": true,
    "isOvertime": false,
    "objectMap": {
        "fctype": [
            { "fc_code": "USD", "fc_name": "美元", "fc_rate": "" }
        ],
        "expendfc": [
            { "expend_code": "25-0099", "fc_code": "USD", "fc_amt": "100", "fc_rate": "720.00" }
        ]
    }
}
```

### 保存差旅行程

- 请求地址：`POST /ExpenseApplyUTravelOld`

**请求参数**

| 字段      | 类型      | 是否必传 | 示例               | 说明                 |
| --------- | --------- | -------- | ------------------ | -------------------- |
| ajax      | `Boolean` | 是       | true               | 默认                 |
| act       | `String`  | 是       | saveTravel         | 接口方法             |
| formDatas | `String`  | 是       | {"2026-01": ["北京"]} | 差旅行程 JSON 字符串 |

**响应示例**
```json
{
    "success": true,
    "isOvertime": false
}
```

### 保存外币金额与汇率

- 请求地址：`POST /ExpenseApplyUTravelOld`

**请求参数**

| 字段      | 类型      | 是否必传 | 示例                                                        | 说明                                           |
| --------- | --------- | -------- | ----------------------------------------------------------- | ---------------------------------------------- |
| ajax      | `Boolean` | 是       | true                                                        | 默认                                           |
| act       | `String`  | 是       | saveCurrencys                                               | 接口方法                                       |
| formDatas | `String`  | 是       | {"amt25-0099":["100"],"fc25-0099":["USD"],"rates":"USD<3>720<2>"} | 金额/币种/汇率 JSON 字符串         |

**响应示例**
```json
{
    "success": true,
    "isOvertime": false
}
```

### 保存总金额与附件信息

- 请求地址：`POST /ExpenseApply`

**请求参数**

| 字段      | 类型      | 是否必传 | 示例                                                       | 说明                                                     |
| --------- | --------- | -------- | ---------------------------------------------------------- | -------------------------------------------------------- |
| ajax      | `Boolean` | 是       | true                                                       | 默认                                                     |
| act       | `String`  | 是       | car_save                                                   | 接口方法                                                 |
| formDatas | `String`  | 是       | {"busiCodes":"25-0099","amt25-0099":"720.00","apply_invcnt":"2","traveller":"U001/张三#教授"} | 业务编码/总金额/附件/人员 JSON |
| vApplyId  | `String`  | 是       | 20260101001                                                | 业务单内存标识码                                         |

**响应示例**
```json
{
    "success": true,
    "isOvertime": false
}
```

### 保存业务费用金额

- 请求地址：`POST /ExpenseApply`

**请求参数**

| 字段      | 类型      | 是否必传 | 示例                                            | 说明                   |
| --------- | --------- | -------- | ----------------------------------------------- | ---------------------- |
| ajax      | `Boolean` | 是       | true                                            | 默认                   |
| act       | `String`  | 是       | busi_save                                       | 接口方法               |
| formDatas | `String`  | 是       | {"open25-0099":"T","amt25-0099":"720.00"} | 费用开关与金额 JSON |
| vApplyId  | `String`  | 是       | 20260101001                                     | 业务单内存标识码       |

**响应示例**
```json
{
    "success": true,
    "isOvertime": false
}
```
