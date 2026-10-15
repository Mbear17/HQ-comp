# 选择开票内容

::: tip 组件说明
此组件用于在报账流程中选择开票内容（商品服务种类），按开票部门分组展示卡片，并与经费项目组件联动过滤。常用于开票相关业务申请中的开票内容与经费项目选择。
:::

## 功能特性

- 按开票部门分组展示开票内容卡片，支持「所有部门」及各部门项数统计
- 支持按关键字搜索开票内容
- 卡片点击选择/取消，已选卡片高亮并展示「已选」提示
- 文本溢出时悬停显示完整名称与税率
- 选择/取消后自动重新加载开票内容及已选状态
- 内嵌经费项目组件（`expense-apply-fund`），按当前开票内容的 `prj_codedef` 联动过滤
- 取消开票内容时先清空已选经费项目，再刷新开票内容与经费列表
- 查看模式（`detail`）只读展示已选开票内容，不可切换

## 使用示例

```html
<script type="text/javascript" charset="UTF-8">
    document.write('<script src="/saap/component/ins-def-4101.js?v=' + Date.now() +'" type="text/javascript" charset="UTF-8"><\/script>');
</script>

<!-- 一般配合框架使用 -->
<ins-def-4101
    v-if="item.panel_id === '4101'"
    :ref="'cpt' + item.panel_id"
    @re-load="reload"
></ins-def-4101>

<!-- 查看模式下使用 -->
<ins-def-4101 detail :apply_id="apply.apply_id"></ins-def-4101>
```

## API

### 属性

| 属性名         | 说明           | 类型      | 默认值 |
| :------------- | :------------- | :-------- | :----- |
| detail         | 是否为查看模式 | `Boolean` | false  |
| apply_id       | 业务单号       | `String`  | ''     |
| datacheck_msg  | 数据检测提示   | `String`  | ''     |

### 方法

| 方法名 | 说明         | 类型                        |
| :----- | :----------- | :-------------------------- |
| load   | 加载组件数据 | `(callback?: Function) => void` |
| save   | 保存组件     | `() => void`                |

### 事件

| 事件名  | 说明               | 类型         |
| :------ | :----------------- | :----------- |
| re-load | 需要刷新框架时触发 | `() => void` |

## 接口说明

### 初始化开票内容

- 请求地址：`POST /ExpenseApplyUBankArrV2`

**请求参数**

| 字段 | 类型      | 是否必传 | 示例         | 说明     |
| ---- | --------- | -------- | ------------ | -------- |
| ajax | `Boolean` | 是       | true         | 默认     |
| act  | `String`  | 是       | invDpt_init  | 接口方法 |

**响应示例**
```json
{
    "success": true,
    "isOvertime": false,
    "objectMap": {
        "invDptsMap": {
            "001": {
                "goods_taxno": "1010101",
                "inv_type_no": "01",
                "dpt_code": "D001",
                "catalog_no": "C01",
                "_prop": { "goods_name": "咨询服务费", "taxrate": 6, "dpt_name": "科研处" }
            }
        },
        "invDpt": {
            "inv_type_no": "01",
            "goods_taxno": "1010101",
            "dpt_code": "D001",
            "catalog_no": "C01",
            "prj_codedef": "BGT01"
        },
        "project": []
    }
}
```

### 选择开票内容

- 请求地址：`POST /ExpenseApplyUBankArrV2`

**请求参数**

| 字段         | 类型      | 是否必传 | 示例      | 说明         |
| ------------ | --------- | -------- | --------- | ------------ |
| ajax         | `Boolean` | 是       | true      | 默认         |
| act          | `String`  | 是       | invDpt_save | 接口方法   |
| dpt_code     | `String`  | 否       | D001      | 开票部门编码 |
| catalog_no   | `String`  | 否       | C01       | 业务大类     |
| inv_type_no  | `String`  | 否       | 01        | 开票类型编号 |
| goods_taxno  | `String`  | 否       | 1010101   | 商品税号     |

**响应示例**
```json
{
    "success": true,
    "isOvertime": false
}
```

### 取消开票内容

- 请求地址：`POST /ExpenseApplyUBankArrV2`

**请求参数**

| 字段        | 类型      | 是否必传 | 示例    | 说明         |
| ----------- | --------- | -------- | ------- | ------------ |
| ajax        | `Boolean` | 是       | true    | 默认         |
| act         | `String`  | 是       | invDpt_del | 接口方法   |
| inv_type_no | `String`  | 是       | 01      | 开票类型编号 |
| goods_taxno | `String`  | 是       | 1010101 | 商品税号     |

**响应示例**
```json
{
    "success": true,
    "isOvertime": false
}
```

### 加载开票内容（detail 模式）

- 请求地址：`POST /ExpenseApplyUQuery`

**请求参数**

| 字段     | 类型      | 是否必传 | 示例                  | 说明         |
| -------- | --------- | -------- | --------------------- | ------------ |
| ajax     | `Boolean` | 是       | true                  | 默认         |
| act      | `String`  | 是       | query_load_UBankArrV2InvDpt | 接口方法 |
| applyId  | `String`  | 是       |                        | 业务单ID     |

**响应示例**
```json
{
    "success": true,
    "isOvertime": false,
    "objectMap": {
        "invDptsMap": {},
        "invDpt": {
            "inv_type_no": "01",
            "goods_taxno": "1010101",
            "dpt_code": "D001",
            "catalog_no": "C01",
            "prj_codedef": "BGT01"
        },
        "project": []
    }
}
```

::: tip 经费项目联动说明
开票内容相关的 `fund_load`、`fund_save`、`fund_pagging` 等请求由内嵌的 `expense-apply-fund` 组件发起，本组件通过 `prj_codedef` 与 `fundReload` / `fundClearChecked` 方法与该子组件联动，接口详见 [报账-选经费卡](./expense-apply-fund.md)。
:::
