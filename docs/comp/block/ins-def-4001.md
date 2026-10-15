# 选择到款信息

::: tip 组件说明
此组件用于选择和认领银行到款信息，支持多条件搜索、到款选择/取消选择、到款金额拆分等功能。常用于收款认领/报销流程中关联到款记录。
:::

## 功能特性

- 显示到款总金额
- 支持按当前可认领金额范围搜索（USTB 学校除外）
- 支持按到款金额范围搜索
- 支持按交易日期范围搜索
- 支持按附言备注关键字搜索
- 支持按付款单位（账户或名称）搜索
- 表格展示付款单位名称、交易日期、银行票据号、付款附言/备注、到款金额、已认领（含本次）、未认领、当前认领
- 支持到款选择/取消选择，已选记录置顶显示并高亮行样式
- 支持到款金额拆分弹窗（将一笔到款拆分为两笔，可编辑拆分金额与来款附言/备注）
- 支持表格分页
- 支持 `tip` 提示条展示业务提示语
- 支持查看模式（`detail`，只读展示已认领到款）
- 支持数据校验消息提示（`datacheck_msg`）

## 使用示例

```html
<script type="text/javascript" charset="UTF-8">
    document.write('<script src="/saap/component/ins-def-4001.js?v=' + Date.now() +'" type="text/javascript" charset="UTF-8"><\/script>');
</script>

<!-- 一般配合框架使用 -->
<ins-def-4001
    v-if="item.panel_id === '4001'"
    :ref="'cpt' + item.panel_id"
    @re-load="reload"
    tip="到款拆分时只拆分本人需认领金额，无需拆分其他认领人认领金额"
    :datacheck_msg="datacheckMsgMap[item.panel_id] || ''"
>
</ins-def-4001>

<!-- 查看模式下使用 -->
<ins-def-4001 detail :apply_id="apply.apply_id"></ins-def-4001>
```

## API

### 属性

| 属性名         | 说明                             | 类型      | 默认值 |
| :------------- | :------------------------------- | :-------- | :----- |
| detail         | 是否为查看模式                   | `Boolean` | false  |
| apply_id       | 业务单号                         | `String`  | ''     |
| tip            | 顶部提示语                       | `String`  | ''     |
| datacheck_msg  | 数据校验提示消息                 | `String`  | ''     |

### 方法

| 事件名  | 说明               | 类型         |
| :------ | :----------------- | :----------- |
| re-load | 需要刷新框架时触发 | `() => void` |

组件同时提供固定命名方法：`load()`（重新加载数据）、`save()`（保存入口）。

## 接口说明

### 初始化到款列表

- 请求地址：`POST /ExpenseApplyUBankArrV2`
- 说明：加载到款总金额与已选中的到款记录，随后触发查询与分页。

**请求参数**

| 字段 | 类型      | 是否必传 | 示例 | 说明     |
| ---- | --------- | -------- | ---- | -------- |
| ajax | `Boolean` | 是       | true | 默认     |
| act  | `String`  | 是       | bankarr_init | 接口方法 |

**响应示例**
```json
{
    "success": true,
    "isOvertime": false,
    "objectMap": {
        "totalAmt": 0,       // 到款总金额
        "charge_uid": "",    // 责任人
        "banks": []          // 已选中的到款列表
    }
}
```

### 按条件查询到款

- 请求地址：`POST /ExpenseApplyUBankArrV2`

**请求参数**

| 字段       | 类型      | 是否必传 | 示例       | 说明                   |
| ---------- | --------- | -------- | ---------- | ---------------------- |
| ajax       | `Boolean` | 是       | true       | 默认                   |
| act        | `String`  | 是       | bankarr_load | 接口方法             |
| amtFrom    | `String`  | 否       | 100        | 当前可认领金额-最小值  |
| amtTo      | `String`  | 否       | 1000       | 当前可认领金额-最大值  |
| in_amtFrom | `String`  | 否       | 100        | 到款金额-最小值        |
| in_amtTo   | `String`  | 否       | 1000       | 到款金额-最大值        |
| dateFrom   | `String`  | 否       | 2024-01-01 | 交易日期-起始          |
| dateTo     | `String`  | 否       | 2024-12-31 | 交易日期-终止          |
| remark     | `String`  | 否       | 软件       | 附言备注关键字         |
| vague      | `String`  | 否       | 某某公司   | 付款单位账户或名称     |

**响应示例**
```json
{
    "success": true,
    "isOvertime": false
}
```

### 到款列表分页

- 请求地址：`POST /ExpenseApplyUBankArrV2`

**请求参数**

| 字段 | 类型      | 是否必传 | 示例 | 说明     |
| ---- | --------- | -------- | ---- | -------- |
| ajax | `Boolean` | 是       | true | 默认     |
| act  | `String`  | 是       | bankarr_pagging | 接口方法 |
| page | `Number`  | 是       | 1    | 当前页   |

**响应示例**
```json
{
    "success": true,
    "isOvertime": false,
    "pagging": [10, 1, 2],
    "list": []    // 到款列表
}
```

### 认领到款（选择）

- 请求地址：`POST /ExpenseApplyUBankArrV2`

**请求参数**

| 字段         | 类型      | 是否必传 | 示例         | 说明         |
| ------------ | --------- | -------- | ------------ | ------------ |
| ajax         | `Boolean` | 是       | true         | 默认         |
| act          | `String`  | 是       | bankarr_save | 接口方法     |
| bank_arrivno | `String`  | 是       | 20240101001  | 银行票据号   |
| dtlno        | `String`  | 是       | 1            | 明细序号     |

**响应示例**
```json
{
    "success": true,
    "isOvertime": false
}
```

### 取消认领到款

- 请求地址：`POST /ExpenseApplyUBankArrV2`

**请求参数**

| 字段         | 类型      | 是否必传 | 示例         | 说明     |
| ------------ | --------- | -------- | ------------ | -------- |
| ajax         | `Boolean` | 是       | true         | 默认     |
| act          | `String`  | 是       | bankarr_del  | 接口方法 |
| bank_arrivno | `String`  | 是       | 20240101001  | 银行票据号 |
| dtlno        | `String`  | 是       | 1            | 明细序号 |

**响应示例**
```json
{
    "success": true,
    "isOvertime": false
}
```

### 到款数据校验

- 请求地址：`POST /ExpenseApplyUBankArrV2`
- 说明：选择/取消认领后触发校验，校验通过后通知父组件刷新。

**请求参数**

| 字段 | 类型      | 是否必传 | 示例 | 说明     |
| ---- | --------- | -------- | ---- | -------- |
| ajax | `Boolean` | 是       | true | 默认     |
| act  | `String`  | 是       | bankarr_datacheck | 接口方法 |

**响应示例**
```json
{
    "success": true,
    "isOvertime": false
}
```

### 到款拆分

- 请求地址：`POST /ExpenseApplyUBankArrV2`
- 说明：将一笔到款拆分为两笔，三个参数均为 JSON 字符串。

**请求参数**

| 字段      | 类型      | 是否必传 | 示例 | 说明                       |
| --------- | --------- | -------- | ---- | -------------------------- |
| ajax      | `Boolean` | 是       | true | 默认                       |
| act       | `String`  | 是       | bankarr_div | 接口方法              |
| splitArr  | `String`  | 是       | {}   | 原到款记录 JSON 字符串     |
| splitArr1 | `String`  | 是       | {}   | 拆分第一笔 JSON 字符串（本次认领） |
| splitArr2 | `String`  | 是       | {}   | 拆分第二笔 JSON 字符串（余未认领） |

**响应示例**
```json
{
    "success": true,
    "isOvertime": false
}
```

### 加载到款（detail模式）

- 请求地址：`POST /ExpenseApplyUQuery`

**请求参数**

| 字段    | 类型      | 是否必传 | 示例                     | 说明     |
| ------- | --------- | -------- | ------------------------ | -------- |
| ajax    | `Boolean` | 是       | true                     | 默认     |
| act     | `String`  | 是       | query_load_BankArrV2Bank | 接口方法 |
| applyId | `String`  | 是       |                          | 业务单ID |

**响应示例**
```json
{
    "success": true,
    "isOvertime": false,
    "objectMap": {
        "banks": []    // 已认领到款列表
    }
}
```

## 版本说明

1. **USTB 不显示"当前可认领金额"搜索项**

`unitCode` 为 USTB 时隐藏"当前可认领金额"金额范围搜索，其他学校正常显示：
```html{2}
<el-form-item label="当前可认领金额:" v-if="unitCode !== 'USTB'">
    <el-col :span="11">
        <el-input placeholder="最小金额" clearable v-model="searchForm.amtFrom" style="width: 100%;"></el-input>
    </el-col>
    ...
</el-form-item>
```
