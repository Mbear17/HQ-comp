# 智能差旅平台
[[toc]]

## 开启新行程

## 差旅行程报销
1. **业务总说明** *expense_apply_matternotice.html*
2. **业务要件** *expense_apply_Inspect.html*
   - 选择订单 [ins-def-3005.js](block/ins-def-3005.md) `组件`
   - 票据信息 [ins-def-1001.js](block/ins-def-1001.md) `组件`
3. **确定经费项目** *expense_apply_fund.html*
4. **填写业务单** *expense_apply_travel.html*
   - 出差人员列表 [ins-def-3001.js](block/ins-def-3001.md) `组件`
   - 城市间交通 [ins-def-3002.js](block/ins-def-3002.md) `组件`
   - 住宿及补助 [ins-def-3003.js](block/ins-def-3003.md) `组件`
   - 其他差旅杂费 [ins-def-3004.js](block/ins-def-3004.md) `组件`
   - 票据信息 [ins-def-1001.js](block/ins-def-1001.md) `组件`
   - 上传附件 [cpt-upload.js](block/cpt-upload.md) `组件`
   - 填写基本信息 *multi_expense_apply_car.js* `非新组件`
5. **选择结算方式**
6. **业务单提交** （包含以上组件的detail模式）

### CUP版
CUP版为首次开发版，即原版

### USTB版
USTB版有以下不同:

- 选择订单 [ins-def-3005.js](block/ins-def-3005.md) `代码修改`
- 出差人员列表 [ins-def-3001.js](block/ins-def-3001.md) `版本切换`

组件的版本切换方式：
```js
components: {
    'app-header-bar': AppHeaderBar,
    'app-area-main': AppMainArea,
    'app-func-name': AppAreaTitleH2,
    'app-area-title': AppAreaTitle,
    'app-area-content': AppAreaContent,
    'app-footer-bar': AppFooterBar,
    'ins-def-3001': InsDef3001, // [!code --]
    'ins-def-3001': InsDef3001_ustb, // ustb版出差人员列表 // [!code ++]
    'ins-def-3002': InsDef3002,
    'ins-def-3003': InsDef3003,
    'ins-def-3004': InsDef3004,
    'ins-def-1001': InsDef1001, //智能报账电子发票列表组件
    'datacheck-alert': DatacheckAlert,
    'cpt-upload': CptUpload,
    "expense-apply-carform": ExpenseApplyCarform,    // 基本信息
},
```