# 报账-选经费卡

::: tip 组件说明
此组件用于报账申请单中选择经费项目（经费卡），支持搜索过滤、已选/备选表格、项目预算查看、业务类型 60 下新增经费项目，以及与开票内容按 `prj_codedef` 联动。常作为开票内容组件或报账框架中的经费选择区域。
:::

## 功能特性

- 按经费代码/名称模糊搜索，支持「包含余额为零」「包含已封存项目」过滤（CUP 另有「包含已结题项目」）
- 已选经费置顶高亮，备选经费分页展示
- 支持经费项目选择/取消，并实时 `fund_save` 持久化
- 选择后触发 `fund_next` 经费规则校验，失败时提示并通知框架
- 支持查看项目预算明细弹窗（预算数/执行数/预扣数/余额），并可导出预算分项
- 业务类型 `apply_type === '60'` 时支持「添加经费项目」弹窗（项目名称、负责人、部门、结题日期）
- 提供 `prj_codedef` 属性，配合 `fundReload` / `fundClearChecked` 与开票内容联动
- `manualLoad` 为 true 时 created 不自动加载，由父组件驱动，避免并发请求遮罩冲突
- 结题日期列按学校差异化展示（USTB 隐藏）；经费余额无权限时显示 `-`
- 经费数据变化时通过事件总线 `refreshFund` 通知兄弟组件

## 使用示例

```html
<script type="text/javascript" charset="UTF-8">
    document.write('<script src="/saap/component/expense-apply-fund.js?v=' + Date.now() +'" type="text/javascript" charset="UTF-8"><\/script>');
</script>

<!-- 一般配合框架使用 -->
<expense-apply-fund ref="fundList"></expense-apply-fund>

<!-- 配合开票内容组件使用（manualLoad + prj_codedef 联动） -->
<expense-apply-fund
    ref="fundList"
    :prj_codedef="curPrjCodedef"
    :manual-load="true"
></expense-apply-fund>
```

## API

### 属性

| 属性名        | 说明                                                         | 类型      | 默认值 |
| :------------ | :----------------------------------------------------------- | :-------- | :----- |
| prj_codedef   | 开票内容关联的预算代码定义，仅 `fund_load` 时携带过滤         | `String`  | ''     |
| manualLoad    | true 时 created 不自动 `fundInit`/`fundLoad`，由父组件通过 `fundReload` 驱动 | `Boolean` | false  |

### 方法

| 方法名          | 说明                                         | 类型                                  |
| :-------------- | :------------------------------------------- | :------------------------------------ |
| fundReload      | 重查已选并刷新经费列表（开票内容联动时调用） | `(callback?: Function) => void`       |
| fundClearChecked| 清空已选经费（`fund_save` 传 `prjCodes=''`） | `(callback?: Function) => void`       |
| fundInit        | 初始化已选经费项目                           | `(callback?: Function) => void`       |
| fundLoad        | 加载经费项目列表（可带 `prj_codedef`）       | `(flag?: 'T'|'F') => void`            |
| fundSave        | 保存当前已选经费编码                         | `(callback?: Function) => void`       |

### 事件（事件总线 `$bus`）

| 事件名        | 说明                                     | 触发/监听方式                     |
| :------------ | :--------------------------------------- | :-------------------------------- |
| fundNext      | 框架触发下一步时进行经费校验             | 监听                              |
| newFundAdd    | 新增经费项目成功后刷新已选与列表         | 监听                              |
| refreshFund   | 已选经费变化时通知兄弟组件               | 发送（payload：`prjsChecked`）    |
| carReload     | `fund_init` 成功后通知行程组件重载       | 发送                              |
| submitError   | `fund_next` 失败时通知框架               | 发送                              |
| addFundAction | 打开新增项目弹窗时传递已选与 `vApplyId`  | 发送                              |
| fund60AddButton | 控制是否加载新增项目部门列表           | 监听                              |

## 接口说明

### 已选经费初始化

- 请求地址：`POST /ExpenseApply`

**请求参数**

| 字段 | 类型      | 是否必传 | 示例     | 说明     |
| ---- | --------- | -------- | -------- | -------- |
| ajax | `Boolean` | 是       | true     | 默认     |
| act  | `String`  | 是       | fund_init | 接口方法 |

**响应示例**
```json
{
    "success": true,
    "isOvertime": false,
    "objectMap": {
        "vApplyId": "20260101001",
        "prjDtls": [
            {
                "prj_code": "PRJ001",
                "prj_name": "某某项目",
                "prj_charge": "张三",
                "prjGrant0": {
                    "statusCN": "正常",
                    "subitem_mode": "N",
                    "balance_val": "10000.00",
                    "_prop": { "close_date": "2026-12-31", "grantAuth": true }
                }
            }
        ]
    }
}
```

### 加载经费项目列表

- 请求地址：`POST /ExpenseApply`

**请求参数**

| 字段         | 类型      | 是否必传 | 示例       | 说明                             |
| ------------ | --------- | -------- | ---------- | -------------------------------- |
| ajax         | `Boolean` | 是       | true       | 默认                             |
| act          | `String`  | 是       | fund_load  | 接口方法                         |
| repeat       | `String`  | 是       | T          | 默认                             |
| vague        | `String`  | 否       | PRJ        | 经费代码/名称模糊查询            |
| bal          | `String`  | 是       | F          | 是否包含余额为零（T/F）          |
| susp         | `String`  | 是       | F          | 是否包含已封存项目（T/F）        |
| close        | `String`  | 否       | F          | 是否包含已结题项目（CUP）        |
| prj_codedef  | `String`  | 否       | BGT01      | 与开票内容联动的预算代码定义     |

**响应示例**
```json
{
    "success": true,
    "isOvertime": false,
    "pagging": [10, 1, 100],
    "list": [
        {
            "prj_code": "PRJ002",
            "prj_name": "备选项目",
            "statusCN": "正常",
            "subitem_mode": "N",
            "balance_val": "5000.00",
            "_prop": { "fzr": "李四", "close_date": "2026-06-30", "grantAuth": true }
        }
    ]
}
```

### 经费项目分页

- 请求地址：`POST /ExpenseApply`

**请求参数**

| 字段 | 类型      | 是否必传 | 示例         | 说明     |
| ---- | --------- | -------- | ------------ | -------- |
| ajax | `Boolean` | 是       | true         | 默认     |
| act  | `String`  | 是       | fund_pagging | 接口方法 |
| page | `Number`  | 是       | 1            | 当前页   |

**响应示例**
```json
{
    "success": true,
    "isOvertime": false,
    "pagging": [10, 1, 100],
    "list": []
}
```

### 保存已选经费项目

- 请求地址：`POST /ExpenseApply`

**请求参数**

| 字段      | 类型      | 是否必传 | 示例                 | 说明                                       |
| --------- | --------- | -------- | -------------------- | ------------------------------------------ |
| ajax      | `Boolean` | 是       | true                 | 默认                                       |
| act       | `String`  | 是       | fund_save            | 接口方法                                   |
| prjCodes  | `String`  | 是       | PRJ001,PRJ002        | 已选经费代码，逗号分隔；清空时传空字符串   |
| vApplyId  | `String`  | 是       | 20260101001          | 业务单内存标识码                           |

新增项目（`apply_type === '60'`）时，`prjCodes` 中会追加 `[NEW1]` 等编码，并携带：

| 字段                  | 类型     | 示例      | 说明         |
| --------------------- | -------- | --------- | ------------ |
| [NEW1]name            | `String` | 新项目    | 项目名称     |
| [NEW1]chargeUid       | `String` | U001      | 负责人工号   |
| [NEW1]chargeName      | `String` | 张三      | 负责人姓名   |
| [NEW1]dptCode         | `String` | D001      | 部门编码     |
| [NEW1]dptName         | `String` | 科研处    | 部门名称     |
| [NEW1]rpYearTo        | `String` | 2026-12-31| 结题日期     |

**响应示例**
```json
{
    "success": true,
    "isOvertime": false
}
```

### 经费规则校验（下一步）

- 请求地址：`POST /ExpenseApply`

**请求参数**

| 字段   | 类型      | 是否必传 | 示例      | 说明                       |
| ------ | --------- | -------- | --------- | -------------------------- |
| ajax   | `Boolean` | 是       | true      | 默认                       |
| act    | `String`  | 是       | fund_next | 接口方法                   |
| skip   | `Boolean` | 否       | true      | 是否跳过二次验证           |
| ignore | `String`  | 否       |           | 忽略的校验模型编号         |

**响应示例**
```json
{
    "success": true,
    "isOvertime": false,
    "objectMap": {
        "czfiList": []
    }
}
```

### 查看项目预算

- 请求地址：`POST /ExpenseApply`

**请求参数**

| 字段     | 类型      | 是否必传 | 示例       | 说明         |
| -------- | --------- | -------- | ---------- | ------------ |
| ajax     | `Boolean` | 是       | true       | 默认         |
| act      | `String`  | 是       | fund_budget | 接口方法     |
| prj_code | `String`  | 是       | PRJ001     | 经费项目代码 |

**响应示例**
```json
{
    "success": true,
    "isOvertime": false,
    "objectMap": {
        "bgtamts": [
            { "dm": "01", "dmm": "材料费", "a1": "1000", "a2": "0", "a3": "0", "bm0a": "200", "zzzc0a": "0", "balance_val": "800" }
        ],
        "bgtTotal": { "dm": "合计", "dmm": "", "a1": "1000", "a2": "0", "a3": "0", "bm0a": "200", "zzzc0a": "0", "balance_val": "800" },
        "flder": { "flds": [ { "field_name": "项目类别", "value": "纵向" } ] }
    }
}
```

### 导出项目预算分项

- 请求地址：`POST /ExpenseApply`

**请求参数**

| 字段     | 类型      | 是否必传 | 示例                | 说明             |
| -------- | --------- | -------- | ------------------- | ---------------- |
| ajax     | `Boolean` | 是       | true                | 默认             |
| act      | `String`  | 是       | fund_budget_export  | 接口方法         |
| prj_code | `String`  | 是       | PRJ001              | 经费项目代码     |

**响应示例**
```json
{
    "success": true,
    "isOvertime": false,
    "objectMap": {
        "OutfileName": "budget_PRJ001.xlsx"
    }
}
```

导出成功后前端跳转：`/ExpenseApply?down={Base64(OutfileName)}&b6cset=utf-8`

### 新增项目弹窗 - 部门列表

- 请求地址：`POST /ExpenseSolution`

**请求参数**

| 字段 | 类型      | 是否必传 | 示例     | 说明     |
| ---- | --------- | -------- | -------- | -------- |
| ajax | `Boolean` | 是       | true     | 默认     |
| act  | `String`  | 是       | vs_depart | 接口方法 |

**响应示例**
```json
{
    "success": true,
    "isOvertime": false,
    "objectMap": {
        "vs_dpt": [
            { "dpt_code": "D001", "dpt_name": "科研处" }
        ]
    }
}
```

### 新增项目弹窗 - 负责人模糊搜索

- 请求地址：`POST /ExpenseSolution`

**请求参数**

| 字段   | 类型      | 是否必传 | 示例            | 说明               |
| ------ | --------- | -------- | --------------- | ------------------ |
| ajax   | `Boolean` | 是       | true            | 默认               |
| act    | `String`  | 是       | staffSearch     | 接口方法           |
| stypes | `String`  | 是       | 1,2,3,4,5,6,7   | 人员类型过滤       |
| vague  | `String`  | 是       | 张              | 工号/姓名关键字    |

**响应示例**
```json
{
    "success": true,
    "isOvertime": false,
    "objectMap": {
        "staffs": [
            { "uni_no": "U001", "name": "张三", "dpt_name": "科研处" }
        ]
    }
}
```

### 下一步控制模型跳转

- 请求地址：`POST /ExpenseApply`

**请求参数**

| 字段 | 类型      | 是否必传 | 示例              | 说明     |
| ---- | --------- | -------- | ----------------- | -------- |
| ajax | `Boolean` | 是       | true              | 默认     |
| act  | `String`  | 是       | send_controllerUvue | 接口方法 |
| func | `String`  | 是       | 1                 | 功能标识 |

**响应示例**
```json
{
    "success": true,
    "isOvertime": false,
    "objectMap": {
        "srUrl": "/next/page"
    }
}
```

## 版本说明

1. **结题项目过滤（CUP）**

仅 CUP 显示「包含已结题项目」勾选框：

```html
<el-checkbox class="size_medium" v-model="formInline.close" true-label="T" false-label="F" @change="fundLoad('T')" v-if="unitCode ==='CUP'">包含已结题项目</el-checkbox>
```

2. **结题日期列（USTB）**

USTB 隐藏结题日期列：

```html
<el-table-column
        v-if="unitCode!=='USTB'"
        label="结题日期"
        ...>
```

3. **选择项目前确认提示（CUP）**

CUP 下若项目带有 `grant06` 提示文案，选择前会弹出确认：

```javascript
if (obj.grant06 && obj.grant06 !== '*' && this.unitCode === 'CUP') {
    Valert({ msg: obj.grant06, title: '温馨提示：', callback: () => { this.checkedPrj(obj) } });
}
```

4. **经费余额空值展示差异**

CUP 无金额时显示 `0.00`，其他学校（如北科大）显示 `-`：

```javascript
if (unitCode === 'CUP') {
    // 无金额显示 0.00
    return valueSymbol + "0.00";
} else {
    // 石油无金额显示为0.00, 北科大显示为 -
    return valueSymbol + "-";
}
```
