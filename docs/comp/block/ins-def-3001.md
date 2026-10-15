# 出差人员列表

::: tip 组件说明
此组件用于维护差旅报销单中的出差人员名单，支持人员添加、删除、行程起止日期与目的地城市编辑、拖拽排序等操作。常用于差旅报销流程的出差人员信息登记。
:::

## 功能特性

- 展示出差人员列表（工号-姓名、审批单号、职级/类别、职称）
- 支持行程起始日、行程结束日、目的地城市（省-市级联）编辑，变更后同步到所有人员行
- 支持弹窗添加出差人员（多选）
- 支持人员删除（带确认提示）
- 支持行拖拽排序，拖拽后自动保存
- 支持编辑/保存切换，保存后触发数据校验
- 外单位人员职称支持下拉选择（二级教授及以上/三、四级教授/其他）
- 支持查看模式（detail），只读展示

## 使用示例

```html
<script type="text/javascript" charset="UTF-8">
    document.write('<script src="/saap/component/ins-def-3001.js?v=' + Date.now() +'" type="text/javascript" charset="UTF-8"><\/script>');
</script>

<!-- 一般配合框架使用 -->
<ins-def-3001
    v-if="item.panel_id === '3001'"
    :ref="'cpt' + item.panel_id"
    :datacheck_msg="datacheck.msg3001"
    @re-load="reload"
>
</ins-def-3001>

<!-- 查看模式下使用 -->
<section class="mb20" v-if="expend_ins.some(item => item.panel_id === '3001')">
    <ins-def-3001 detail :apply_id="apply.apply_id" :datacheck_msg="datacheck.msg3001"></ins-def-3001>
</section>
```

## API

### 属性

| 属性名         | 说明                           | 类型      | 默认值 |
| :------------- | :----------------------------- | :-------- | :----- |
| detail         | 是否为查看模式                 | `Boolean` | false  |
| apply_id       | 业务单号（查看模式必传）       | `String`  | ''     |
| datacheck_msg  | 数据校验提示信息（展示用）     | `String`  | ''     |

### 方法或事件

| 事件名  | 说明               | 类型         |
| :------ | :----------------- | :----------- |
| re-load | 需要刷新框架时触发 | `() => void` |

组件内置固定方法：`load()` 重新加载人员与城市数据，`save()` 提交编辑中的人员列表。

## 接口说明

### 加载差标等级（定制版）

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
        "stdlevels": []    // 差标等级列表
    }
}
```

### 加载省市数据

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
        }
    }
}
```

### 加载出差人员列表

- 请求地址：`POST /ExpenseApplyUTravelV2`

**请求参数**

| 字段 | 类型      | 是否必传 | 示例 | 说明     |
| ---- | --------- | -------- | ---- | -------- |
| ajax | `Boolean` | 是       | true | 默认     |
| act  | `String`  | 是       | staff_load | 接口方法 |

**响应示例**
```json
{
    "success": true,
    "objectMap": {
        "teamdtls": [
            {
                "apply_id": "BT20250101001",
                "ord": 100,
                "traveller_uid": "zhangsan",
                "traveller_name": "张三",
                "traveller_type": "一般在职人员",
                "traveller_title": "其他",
                "date_departure": "2025-01-01",
                "date_return": "2025-01-05",
                "std_ord": "110100"
            }
        ]
    }
}
```

### 加载出差人员列表（detail 模式）

- 请求地址：`POST /ExpenseApplyUQuery`

**请求参数**

| 字段     | 类型      | 是否必传 | 示例             | 说明     |
| -------- | --------- | -------- | ---------------- | -------- |
| ajax     | `Boolean` | 是       | true             | 默认     |
| act      | `String`  | 是       | query_load_TravelV2Staff | 接口方法 |
| applyId  | `String`  | 是       | BT20250101001    | 业务单ID |

**响应示例**
```json
{
    "success": true,
    "objectMap": {
        "teamdtls": []    // 出差人员列表
    }
}
```

### 添加出差人员

- 请求地址：`POST /ExpenseApplyUTravelV2`

**请求参数**

| 字段       | 类型      | 是否必传 | 示例                                                     | 说明         |
| ---------- | --------- | -------- | -------------------------------------------------------- | ------------ |
| ajax       | `Boolean` | 是       | true                                                     | 默认         |
| act        | `String`  | 是       | staff_add                                                | 接口方法     |
| isEdit     | `Boolean` | 是       | false                                                    | 固定 false   |
| formDatas  | `String`  | 是       | [{"name":"张三","ord":100,"uni_no":"zhangsan","dtl":[]}]  | 人员数据JSON |

**响应示例**
```json
{
    "success": true
}
```

### 删除出差人员

- 请求地址：`POST /ExpenseApplyUTravelV2`

**请求参数**

| 字段      | 类型      | 是否必传 | 示例             | 说明     |
| --------- | --------- | -------- | ---------------- | -------- |
| ajax      | `Boolean` | 是       | true             | 默认     |
| act       | `String`  | 是       | staff_del        | 接口方法 |
| apply_id  | `String`  | 是       | BT20250101001    | 业务单号 |
| ord       | `Number`  | 是       | 100              | 行号     |

**响应示例**
```json
{
    "success": true
}
```

### 保存出差人员列表

- 请求地址：`POST /ExpenseApplyUTravelV2`

**请求参数**

| 字段      | 类型      | 是否必传 | 示例 | 说明                     |
| --------- | --------- | -------- | ---- | ------------------------ |
| ajax      | `Boolean` | 是       | true | 默认                     |
| act       | `String`  | 是       | staff_save | 接口方法             |
| formDatas | `String`  | 是       | []   | 完整人员列表数据 JSON    |

**响应示例**
```json
{
    "success": true
}
```

### 出差人员数据校验

- 请求地址：`POST /ExpenseApplyUTravelV2`

**请求参数**

| 字段 | 类型      | 是否必传 | 示例 | 说明     |
| ---- | --------- | -------- | ---- | -------- |
| ajax | `Boolean` | 是       | true | 默认     |
| act  | `String`  | 是       | staff_datacheck | 接口方法 |

**响应示例**
```json
{
    "success": true
}
```

## 版本说明

源码中包含 `InsDef3001`（默认）与 `InsDef3001_ustb`（USTB 定制版）两套实现，差异如下：

1. **定制版新增 props**

| 属性名    | 说明                               | 类型      | 默认值 |
| :-------- | :--------------------------------- | :-------- | :----- |
| abroad    | 是否境外行程：T-境外（文本输入城市）、F-境内（级联选择） | `String` | 'F' |
| data_check | 保存后是否调用数据校验接口        | `Boolean` | true  |

2. **定制版差异**

- 境外行程（`abroad === 'T'`）目的地城市改为文本输入，境内为省-市级联选择
- 增加"差标等级"列（数据来自 `hotel_loadFilter` 接口），编辑态可选
- "职级/类别"与"职称"列在编辑态均为文本输入（默认版职称仅外单位人员可下拉选择）
- "审批单号"列仅默认版展示
- `data_check` 为 false 时保存后直接触发 `re-load`，跳过 `staff_datacheck` 调用
