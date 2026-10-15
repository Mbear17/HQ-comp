# 合同与待核销发票

::: tip 组件说明
此组件用于选择待核销发票并录入合同信息，支持发票抬头搜索、发票选择/取消选择、"对方单位无需开票"标记等功能。常用于收款核销/报销流程中关联发票与合同。
:::

## 功能特性

- 显示此次核销金额
- 待核销发票列表展示：项目代码及名称、开票日期、应收单位名称、发票备注、发票号码、开票金额、此前已回款、此前未回款
- 支持按发票抬头搜索
- 支持发票选择/取消选择，已选发票置顶显示并高亮行样式
- 支持"对方单位无需开票"勾选（勾选后隐藏发票搜索与列表）
- 支持合同编号、合同名称录入（失焦自动保存）
- 提示"如已签订合同，必须填写合同信息"
- 提示"如需开具发票或收据，请先进行票据申请"（USTB 除外）
- 支持查看模式（`detail`，只读展示合同信息与发票信息，含"本次回款"列）
- 支持数据校验消息提示（`datacheck_msg`）

## 使用示例

```html
<script type="text/javascript" charset="UTF-8">
    document.write('<script src="/saap/component/ins-def-4002.js?v=' + Date.now() +'" type="text/javascript" charset="UTF-8"><\/script>');
</script>

<!-- 一般配合框架使用 -->
<ins-def-4002
    v-if="item.panel_id === '4002'"
    :ref="'cpt' + item.panel_id"
    @re-load="reload"
    :datacheck_msg="datacheckMsgMap[item.panel_id] || ''"
>
</ins-def-4002>

<!-- 查看模式下使用 -->
<ins-def-4002 detail :apply_id="apply.apply_id"></ins-def-4002>
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

### 初始化发票列表

- 请求地址：`POST /ExpenseApplyUBankArrV2`
- 说明：加载此次核销金额、合同信息、"无需开票"标记与已选中的发票，随后触发发票查询。

**请求参数**

| 字段 | 类型      | 是否必传 | 示例 | 说明     |
| ---- | --------- | -------- | ---- | -------- |
| ajax | `Boolean` | 是       | true | 默认     |
| act  | `String`  | 是       | due_init | 接口方法 |

**响应示例**
```json
{
    "success": true,
    "isOvertime": false,
    "objectMap": {
        "total_amt": 0,          // 此次核销金额
        "contract_no": "",       // 合同编号
        "contract_name": "",     // 合同名称
        "due_flag": "F",         // 对方单位无需开票标记：T-是 F-否
        "from_name": "",         // 发票抬头
        "duearrivals": []        // 已选中的发票列表
    }
}
```

### 按发票抬头查询发票

- 请求地址：`POST /ExpenseApplyUBankArrV2`

**请求参数**

| 字段      | 类型      | 是否必传 | 示例     | 说明     |
| --------- | --------- | -------- | -------- | -------- |
| ajax      | `Boolean` | 是       | true     | 默认     |
| act       | `String`  | 是       | due_load | 接口方法 |
| from_name | `String`  | 否       | 某某大学 | 发票抬头 |

**响应示例**
```json
{
    "success": true,
    "isOvertime": false,
    "objectMap": {
        "duearrivals": []    // 待核销发票列表
    }
}
```

### 选择发票

- 请求地址：`POST /ExpenseApplyUBankArrV2`

**请求参数**

| 字段       | 类型      | 是否必传 | 示例          | 说明     |
| ---------- | --------- | -------- | ------------- | -------- |
| ajax       | `Boolean` | 是       | true          | 默认     |
| act        | `String`  | 是       | due_save      | 接口方法 |
| duerec_id  | `String`  | 是       | 2024010100001 | 待核销发票记录ID |

**响应示例**
```json
{
    "success": true,
    "isOvertime": false
}
```

### 取消选择发票

- 请求地址：`POST /ExpenseApplyUBankArrV2`

**请求参数**

| 字段       | 类型      | 是否必传 | 示例          | 说明     |
| ---------- | --------- | -------- | ------------- | -------- |
| ajax       | `Boolean` | 是       | true          | 默认     |
| act        | `String`  | 是       | due_del       | 接口方法 |
| duerec_id  | `String`  | 是       | 2024010100001 | 待核销发票记录ID |

**响应示例**
```json
{
    "success": true,
    "isOvertime": false
}
```

### 发票数据校验

- 请求地址：`POST /ExpenseApplyUBankArrV2`
- 说明：选择/取消发票或保存合同信息后触发校验，校验通过后通知父组件刷新。

**请求参数**

| 字段 | 类型      | 是否必传 | 示例 | 说明     |
| ---- | --------- | -------- | ---- | -------- |
| ajax | `Boolean` | 是       | true | 默认     |
| act  | `String`  | 是       | due_datacheck | 接口方法 |

**响应示例**
```json
{
    "success": true,
    "isOvertime": false
}
```

### 保存合同信息

- 请求地址：`POST /ExpenseApplyUBankArrV2`
- 说明：合同编号/名称失焦或切换"对方单位无需开票"时触发。

**请求参数**

| 字段          | 类型      | 是否必传 | 示例       | 说明                             |
| ------------- | --------- | -------- | ---------- | -------------------------------- |
| ajax          | `Boolean` | 是       | true       | 默认                             |
| act           | `String`  | 是       | contract_save | 接口方法                      |
| contract_no   | `String`  | 否       | HT-2024-001 | 合同编号                        |
| contract_name | `String`  | 否       | 某某采购合同 | 合同名称                        |
| due_flag      | `String`  | 是       | F          | 对方单位无需开票标记：T-是 F-否 |

**响应示例**
```json
{
    "success": true,
    "isOvertime": false
}
```

### 加载发票（detail模式）

- 请求地址：`POST /ExpenseApplyUQuery`

**请求参数**

| 字段    | 类型      | 是否必传 | 示例                    | 说明     |
| ------- | --------- | -------- | ----------------------- | -------- |
| ajax    | `Boolean` | 是       | true                    | 默认     |
| act     | `String`  | 是       | query_load_BankArrV2Due | 接口方法 |
| applyId | `String`  | 是       |                         | 业务单ID |

**响应示例**
```json
{
    "success": true,
    "isOvertime": false,
    "objectMap": {
        "total_amt": 0,          // 此次核销金额
        "duearrivals": [],       // 发票列表
        "contract_no": "",       // 合同编号
        "contract_name": ""      // 合同名称
    }
}
```

## 版本说明

1. **USTB 不显示"无需开票"与申请提示**

`unitCode` 为 USTB 时隐藏"对方单位无需开票"勾选与"如需开具发票或收据，请先进行票据申请"提示条，其他学校正常显示：
```html{1}
<el-checkbox v-if="!detail && unitCode !== 'USTB'" class="ml20" v-model="form.due_flag" true-label="T" false-label="F" @change="formChange">对方单位无需开票</el-checkbox>
<div class="title_line" v-if="!detail && unitCode !== 'USTB'">
    <span class="tips">
        <i class="el-icon-warning-outline"></i>
        如需开具发票或收据，请先进行票据申请
    </span>
</div>
```
