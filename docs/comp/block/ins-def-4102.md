# 填写开票信息

::: tip 组件说明
此组件用于在报账流程中填写发票开具信息，包括开票类型、购买方/销售方信息、商品服务明细及收件信息。常用于开票业务申请中的开票明细填报。
:::

## 功能特性

- 支持开票类型选择（专票/普票，由后端根据已选开票内容映射）
- 支持「对方单位无需开票」勾选
- 购买方信息（名称、统一社会信用代码）与销售方信息并排展示，销售方只读
- 商品服务明细单行录入：种类、规格型号、单位、数量、单价、金额
- 含税/不含税开关切换，单价与金额列标签随开关联动
- 税率/征收率与税额只读，由后端回算回填
- 价税合计支持大写与小写金额自动换算
- 附加信息：收件人邮箱、收件人电话、发票备注
- 各字段变更后 300ms 防抖自动保存，必填未齐时不调接口
- 查看模式（`detail`）以描述列表只读展示开票信息

## 使用示例

```html
<script type="text/javascript" charset="UTF-8">
    document.write('<script src="/saap/component/ins-def-4102.js?v=' + Date.now() +'" type="text/javascript" charset="UTF-8"><\/script>');
</script>

<!-- 一般配合框架使用 -->
<ins-def-4102
    v-if="item.panel_id === '4102'"
    :ref="'cpt' + item.panel_id"
    :datacheck_msg="item.datacheck_msg"
    @re-load="reload"
></ins-def-4102>

<!-- 查看模式下使用 -->
<ins-def-4102 detail :apply_id="apply.apply_id" :datacheck_msg="item.datacheck_msg"></ins-def-4102>
```

## API

### 属性

| 属性名         | 说明           | 类型      | 默认值 |
| :------------- | :------------- | :-------- | :----- |
| detail         | 是否为查看模式 | `Boolean` | false  |
| apply_id       | 业务单号       | `String`  | ''     |
| datacheck_msg  | 数据检测提示   | `String`  | ''     |

### 方法

| 方法名 | 说明                           | 类型                        |
| :----- | :----------------------------- | :-------------------------- |
| load   | 初始化加载（类型/列表/明细）   | `() => void`                |
| save   | 保存开票信息（detail 下跳过）  | `() => void`                |

### 事件

| 事件名  | 说明               | 类型         |
| :------ | :----------------- | :----------- |
| re-load | 需要刷新框架时触发 | `() => void` |

## 接口说明

### 初始化开票类型与商品（编辑模式）

- 请求地址：`POST /ExpenseApplyUBankArrV2`

**请求参数**

| 字段 | 类型      | 是否必传 | 示例     | 说明     |
| ---- | --------- | -------- | -------- | -------- |
| ajax | `Boolean` | 是       | true     | 默认     |
| act  | `String`  | 是       | inv_init | 接口方法 |

**响应示例**
```json
{
    "success": true,
    "isOvertime": false,
    "objectMap": {
        "inv_type": "增值税普通发票",
        "inv_type_no": "02",
        "goods_taxno": "1010101",
        "invGood": {
            "goods_taxno": "1010101",
            "goods_name": "咨询服务费",
            "taxrate": 6
        }
    }
}
```

### 加载开票类型与商品（查看模式）

- 请求地址：`POST /ExpenseApplyUQuery`

**请求参数**

| 字段    | 类型      | 是否必传 | 示例                  | 说明     |
| ------- | --------- | -------- | --------------------- | -------- |
| ajax    | `Boolean` | 是       | true                  | 默认     |
| act     | `String`  | 是       | query_load_UBankArrV2Inv | 接口方法 |
| applyId | `String`  | 是       |                        | 业务单ID |

**响应示例**
```json
{
    "success": true,
    "isOvertime": false,
    "objectMap": {
        "inv_type": "增值税普通发票",
        "inv_type_no": "02",
        "goods_taxno": "1010101",
        "invGood": {
            "goods_taxno": "1010101",
            "goods_name": "咨询服务费",
            "taxrate": 6
        }
    }
}
```

### 加载开票申请列表

- 请求地址：`POST /ExpenseApplyUBankArrV2`

**请求参数**

| 字段 | 类型      | 是否必传 | 示例     | 说明     |
| ---- | --------- | -------- | -------- | -------- |
| ajax | `Boolean` | 是       | true     | 默认     |
| act  | `String`  | 是       | inv_load | 接口方法 |

**响应示例**
```json
{
    "success": true,
    "isOvertime": false,
    "objectMap": {
        "invApply": {},
        "invIssues": [
            { "apply_id": "20260101001", "inv_ord": "1" }
        ],
        "ubpApply": {}
    }
}
```

### 初始化开票编辑明细

- 请求地址：`POST /ExpenseApplyUBankArrV2`

**请求参数**

| 字段         | 类型      | 是否必传 | 示例           | 说明             |
| ------------ | --------- | -------- | -------------- | ---------------- |
| ajax         | `Boolean` | 是       | true           | 默认             |
| act          | `String`  | 是       | inv_editInit   | 接口方法         |
| inv_applyId  | `String`  | 是       | 20260101001    | 开票申请业务单ID |
| inv_applyOrd | `String`  | 是       | 1              | 开票序号         |

**响应示例**
```json
{
    "success": true,
    "isOvertime": false,
    "objectMap": {
        "inv_editapply": {
            "inv_type": "增值税普通发票",
            "unit_name": "某某公司",
            "unit_code": "91110000XXXXXXXX"
        },
        "inv_editissue": {
            "inv_type": "增值税普通发票",
            "unit_name": "某某公司",
            "unit_code": "91110000XXXXXXXX",
            "result_email": "test@example.com",
            "tax_tel": "13800138000",
            "remark": ""
        },
        "inv_editissuedtl": {
            "goods_taxno": "1010101",
            "list_standard": "",
            "list_unit": "次",
            "list_number": "1",
            "list_price": "1000.00",
            "list_amount": "1000.00",
            "list_taxamount": "60.00",
            "_prop": { "taxrate": 6 }
        }
    }
}
```

### 保存开票信息

- 请求地址：`POST /ExpenseApplyUBankArrV2`

**请求参数**

| 字段          | 类型      | 是否必传 | 示例          | 说明                                         |
| ------------- | --------- | -------- | ------------- | -------------------------------------------- |
| ajax          | `Boolean` | 是       | true          | 默认                                         |
| act           | `String`  | 是       | inv_save      | 接口方法                                     |
| inv_applyOrd  | `String`  | 否       | 1             | 有值则更新该序号；空则新建（maxOrd+1）       |
| formDatas     | `String`  | 是       | 见下方 JSON   | 开票信息 JSON 字符串                         |

**formDatas 示例**
```json
{
    "unit_name": "某某公司",
    "unit_code": "91110000XXXXXXXX",
    "list_standard": "",
    "list_unit": "次",
    "list_number": "1",
    "list_price": "1000.00",
    "invoice_amt": "1000.00",
    "tax_amt": "60.00",
    "deliver_email": "test@example.com",
    "tax_mphone": "13800138000",
    "invoice_note": "",
    "tax_flag": "T"
}
```

**响应示例**
```json
{
    "success": true,
    "isOvertime": false,
    "objectMap": {
        "inv_issue": { "inv_ord": "1" },
        "inv_issuedtl": {
            "list_taxamount": "60.00",
            "list_amount": "1000.00",
            "list_price": "1000.00"
        }
    }
}
```

### 开票信息数据检测

- 请求地址：`POST /ExpenseApplyUBankArrV2`

**请求参数**

| 字段 | 类型      | 是否必传 | 示例           | 说明     |
| ---- | --------- | -------- | -------------- | -------- |
| ajax | `Boolean` | 是       | true           | 默认     |
| act  | `String`  | 是       | inv_datacheck  | 接口方法 |

**响应示例**
```json
{
    "success": true,
    "isOvertime": false
}
```

## 版本说明

1. **销售方信息当前写死**

销售方名称与统一社会信用代码在前端暂写死（便于测试），后续有接口再替换：

```javascript
unit_name2: '北京科技大学',
unit_code2: '121000004000022245',
```
