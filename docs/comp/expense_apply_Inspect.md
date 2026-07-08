# 一事一表
::: tip 页面说明
此功能页面为**“完全积木化”**，页面在开发版中的地址：`WebRoot/saap/expense_apply_Inspect.html`
:::

## 已应用的学校/功能
| 学校                | 功能              | 上线日期 |
| ------------------- | ----------------- | :------: |
| 中国石油大学（CUP） | 一事一表/业务要件 |    -     |

## 框架接口
组件定义接口：
```js
axios({
    method: 'post', url: '/ExpenseApplyUInsV2',
    data: {
        ajax: true, act: 'ins_load',
        display_stage: '20'
    },
})
```
下一步调用接口：
```js
axios({
    method: 'post', url: '/ExpenseApplyUInsV2',
    data: {
        ajax: true, act: 'ins_next',
    },
})
```

## 模块列表
| 标题         |   组件名   | 开发版地址(点击跳转到组件说明)                                        |
| ------------ | :--------: | --------------------------------------------------------------- |
| 采购结算单   | InsDef2001 | [WebRoot/saap/component/ins-def-2001.js](block/ins-def-2001.md) |
| 选择资产明细 | InsDef2002 | [WebRoot/saap/component/ins-def-2002.js](block/ins-def-2002.md) |
| 票据信息     | InsDef1001 | [WebRoot/saap/component/ins_def_1001.js](block/ins-def-1001.md) |