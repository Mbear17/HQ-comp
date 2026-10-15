# 其他差旅杂费

::: tip 组件说明
此组件用于管理差旅报销中的其他杂费信息，支持杂费项目展示、金额编辑自动保存、添加与删除。常用于差旅报销单中收集费用项目字典外的其他杂费金额。
:::

## 功能特性

- 以卡片形式动态循环展示其他杂费项（费用项目名称、金额），无数据时提示"无其他费用"
- 费用项目字典由后端 `othercost_loadFilter` 接口加载
- 金额输入支持聚焦还原格式、输入数字过滤、失焦千分位格式化并自动保存（`othercost_save`）
- 支持通过弹窗添加杂费项目（选择费用项目、输入金额，未选项目时校验提示）
- 支持删除杂费项目（带确认弹窗，删除成功后联动保存业务金额）
- 支持数据校验消息提示（`datacheck_msg`）
- 支持查看模式（`detail`，只读展示）
- 组件暴露固定方法 `load` / `save`，配合框架刷新与保存

## 使用示例

```html
<script type="text/javascript" charset="UTF-8">
    document.write('<script src="/saap/component/ins-def-3004.js?v=' + Date.now() +'" type="text/javascript" charset="UTF-8"><\/script>');
</script>

<!-- 一般配合框架使用 -->
<ins-def-3004
    v-if="item.panel_id === '3004'"
    :ref="'cpt' + item.panel_id"
    @re-load="reload"
    :datacheck_msg="datacheckMsgMap[item.panel_id] || ''"
>
</ins-def-3004>

<!-- 查看模式下使用 -->
<ins-def-3004 detail :apply_id="apply.apply_id"></ins-def-3004>
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

### 加载费用项目字典

- 请求地址：`POST /ExpenseApplyUTravelV2`

**请求参数**

| 字段 | 类型      | 是否必传 | 示例 | 说明          |
| ---- | --------- | -------- | ---- | ------------- |
| ajax | `Boolean` | 是       | true | 默认          |
| act  | `String`  | 是       | othercost_loadFilter | 接口方法 |

**响应示例**
```json
{
    "success": true,
    "isOvertime": false,
    "objectMap": {
        "expdefs": []    // 费用项目字典列表（含 expend_code、expend_name、_prop 等）
    }
}
```

### 加载杂费列表

- 请求地址：`POST /ExpenseApplyUTravelV2`

**请求参数**

| 字段 | 类型      | 是否必传 | 示例 | 说明          |
| ---- | --------- | -------- | ---- | ------------- |
| ajax | `Boolean` | 是       | true | 默认          |
| act  | `String`  | 是       | othercost_load | 接口方法 |

**响应示例**
```json
{
    "success": true,
    "isOvertime": false,
    "objectMap": {
        "othercosts": []    // 杂费列表（含 ord、expend_code、cost_other 等）
    }
}
```

### 添加杂费项目

- 请求地址：`POST /ExpenseApplyUTravelV2`

**请求参数**

| 字段        | 类型      | 是否必传 | 示例   | 说明         |
| ----------- | --------- | -------- | ------ | ------------ |
| ajax        | `Boolean` | 是       | true   | 默认         |
| act         | `String`  | 是       | othercost_add | 接口方法 |
| expend_code | `String`  | 是       | JC01   | 费用项目编码 |
| cost_other  | `String`  | 否       | 100.00 | 金额（元）   |

**响应示例**
```json
{
    "success": true,
    "isOvertime": false
}
```

### 保存杂费金额

- 请求地址：`POST /ExpenseApplyUTravelV2`

**请求参数**

| 字段        | 类型      | 是否必传 | 示例   | 说明         |
| ----------- | --------- | -------- | ------ | ------------ |
| ajax        | `Boolean` | 是       | true   | 默认         |
| act         | `String`  | 是       | othercost_save | 接口方法 |
| ord         | `String`  | 是       | 1      | 记录序号     |
| expend_code | `String`  | 是       | JC01   | 费用项目编码 |
| cost_other  | `String`  | 否       | 100.00 | 金额（元）   |

**响应示例**
```json
{
    "success": true,
    "isOvertime": false
}
```

### 删除杂费项目

- 请求地址：`POST /ExpenseApplyUTravelV2`

**请求参数**

| 字段 | 类型      | 是否必传 | 示例 | 说明     |
| ---- | --------- | -------- | ---- | -------- |
| ajax | `Boolean` | 是       | true | 默认     |
| act  | `String`  | 是       | othercost_del | 接口方法 |
| ord  | `String`  | 是       | 1    | 记录序号 |

**响应示例**
```json
{
    "success": true,
    "isOvertime": false
}
```

### 加载费用定义（备用）

- 请求地址：`POST /ExpenseApplyUTravelV2`
- 说明：源码中保留 `expend_load` 方法，但当前版本 `created` / `load` 中的调用已被注释。

**请求参数**

| 字段          | 类型      | 是否必传 | 示例 | 说明          |
| ------------- | --------- | -------- | ---- | ------------- |
| ajax          | `Boolean` | 是       | true | 默认          |
| act           | `String`  | 是       | expend_load | 接口方法 |
| amt_dealtypes | `String`  | 是       | 0    | 金额处理类型  |

**响应示例**
```json
{
    "success": true,
    "isOvertime": false,
    "objectMap": {
        "expendDefs": []    // 费用定义列表
    }
}
```

### 业务金额联动保存

- 请求地址：`POST /ExpenseApplyUInsV2`
- 说明：删除杂费成功后调用，将各费用项目杂费合计金额写入业务表。

**请求参数**

| 字段       | 类型      | 是否必传 | 示例                                                    | 说明                           |
| ---------- | --------- | -------- | ------------------------------------------------------- | ------------------------------ |
| ajax       | `Boolean` | 是       | true                                                    | 默认                           |
| act        | `String`  | 是       | busi_save                                               | 接口方法                       |
| formDatas  | `String`  | 是       | {"amtJC01":"100.00","openJC01":"T","busiCodes":"JC01"}  | JSON 字符串，含 amt{code}、open{code}、busiCodes |

**响应示例**
```json
{
    "success": true,
    "isOvertime": false
}
```

### 交通费表联动保存

- 请求地址：`POST /ExpenseApply`
- 说明：`busi_save` 成功后继续调用，传入相同的 `formDatas`。

**请求参数**

| 字段      | 类型      | 是否必传 | 示例                                                    | 说明                           |
| --------- | --------- | -------- | ------------------------------------------------------- | ------------------------------ |
| ajax      | `Boolean` | 是       | true                                                    | 默认                           |
| act       | `String`  | 是       | car_save                                                | 接口方法                       |
| formDatas | `String`  | 是       | {"amtJC01":"100.00","openJC01":"T","busiCodes":"JC01"}  | JSON 字符串，同 busi_save      |

**响应示例**
```json
{
    "success": true,
    "isOvertime": false
}
```
