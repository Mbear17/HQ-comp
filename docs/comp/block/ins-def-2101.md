# 选择合同

::: tip 组件说明
此组件用于选择报销单关联的合同信息，支持按负责人搜索、包含已申请筛选、合同选择/取消以及合同金额拆分等功能。常用于报销流程中需要关联合同的场景。
:::

## 功能特性

- 显示合同编号、合同名称、经费项目号、项目属性、合同总金额、可支付金额
- 支持按负责人搜索合同
- 支持"包含已申请"筛选
- 支持合同选择/取消选择（已申请合同仅显示"已申请"，不可再选）
- 已选合同固定置顶显示并高亮行
- 支持合同金额拆分（将一笔合同金额拆分为两笔，第二笔自动计算）
- 金额支持千分位格式化显示
- 支持表格分页

## 使用示例

```html
<script type="text/javascript" charset="UTF-8">
    document.write('<script src="/saap/component/ins-def-2101.js?v=' + Date.now() +'" type="text/javascript" charset="UTF-8"><\/script>');
</script>

<!-- 一般配合框架使用 -->
<ins-def-2101
    v-if="item.panel_id === '2101'"
    :ref="'cpt' + item.panel_id"
    @re-load="reload"
>
</ins-def-2101>
```

## API

### 属性

此组件无 props。

### 方法

| 事件名  | 说明               | 类型         |
| :------ | :----------------- | :----------- |
| re-load | 需要刷新框架时触发 | `() => void` |

组件内置固定方法：`load()` 重新加载合同列表，`save()` 为空实现。

## 接口说明

### 初始化（获取已选合同与负责人）

- 请求地址：`POST /ExpenseApplyUInsV2`

**请求参数**

| 字段 | 类型      | 是否必传 | 示例 | 说明     |
| ---- | --------- | -------- | ---- | -------- |
| ajax | `Boolean` | 是       | true | 默认     |
| act  | `String`  | 是       | confirm_init | 接口方法 |

**响应示例**
```json
{
    "success": true,
    "objectMap": {
        "charge_uid": "zhangsan",   // 默认负责人
        "insappList": []            // 已选合同列表
    }
}
```

### 加载合同列表（筛选条件保存）

- 请求地址：`POST /ExpenseApplyUInsV2`

**请求参数**

| 字段       | 类型      | 是否必传 | 示例      | 说明                           |
| ---------- | --------- | -------- | --------- | ------------------------------ |
| ajax       | `Boolean` | 是       | true      | 默认                           |
| act        | `String`  | 是       | confirm_load | 接口方法                    |
| charge_uid | `String`  | 是       | zhangsan  | 负责人                         |
| isApply    | `String`  | 是       | F         | 是否包含已申请：T-包含、F-不包含 |

**响应示例**
```json
{
    "success": true
}
```

### 合同列表分页

- 请求地址：`POST /ExpenseApplyUInsV2`

**请求参数**

| 字段 | 类型      | 是否必传 | 示例 | 说明     |
| ---- | --------- | -------- | ---- | -------- |
| ajax | `Boolean` | 是       | true | 默认     |
| act  | `String`  | 是       | confirm_pagging | 接口方法 |
| page | `Number`  | 是       | 1    | 当前页   |

**响应示例**
```json
{
    "success": true,
    "pagging": [10, 1, 50],   // [每页条数, 当前页, 总条数]
    "list": []                 // 合同列表
}
```

### 选择/取消选择合同

- 请求地址：`POST /ExpenseApplyUInsV2`

**请求参数**

| 字段        | 类型      | 是否必传 | 示例                | 说明                                 |
| ----------- | --------- | -------- | ------------------- | ------------------------------------ |
| ajax        | `Boolean` | 是       | true                | 默认                                 |
| act         | `String`  | 是       | confirm_save        | 接口方法                             |
| request_id  | `String`  | 是       | 1001,1002           | 已选合同 request_id，逗号拼接（选择时追加，取消时移除） |

**响应示例**
```json
{
    "success": true
}
```

### 合同金额拆分

- 请求地址：`POST /ContractSplit`

**请求参数**

| 字段       | 类型      | 是否必传 | 示例      | 说明               |
| ---------- | --------- | -------- | --------- | ------------------ |
| ajax       | `Boolean` | 是       | true      | 默认               |
| act        | `String`  | 是       | div_save  | 接口方法           |
| pay1       | `String`  | 是       | 1000.00   | 第一笔拆分金额     |
| pay2       | `String`  | 是       | 2000.00   | 第二笔拆分金额     |
| request_id | `String`  | 是       | 1001      | 合同申请 ID        |

**响应示例**
```json
{
    "success": true
}
```
