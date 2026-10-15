# 数据检测提示组件

::: tip 组件说明
此组件用于以黄色警告条形式展示数据检测提示信息，常用于报销单据等表单提交后的数据校验结果展示场景。
:::

## 功能特性

- 通过 `msg` 属性展示数据检测内容，支持 `v-html` 渲染 HTML 标签
- 黄色边框 + 半透明黄色背景的警告样式，带「数据检测」加粗标题与图标
- `msg` 为空字符串时整块提示自动隐藏（`v-if` 控制）
- 支持默认插槽（slot）扩展附加内容

## 使用示例

```html
<script type="text/javascript" charset="UTF-8">
    document.write('<script src="/saap/component/datacheck-alert.js?v=' + Date.now() +'" type="text/javascript" charset="UTF-8"><\/script>');
</script>

<!-- 一般配合框架使用 -->
<datacheck-alert :msg="datacheck_msg"></datacheck-alert>

<!-- 结合插槽扩展内容 -->
<datacheck-alert :msg="datacheck_msg">
    <div>附加说明内容</div>
</datacheck-alert>
```

## API

### 属性

| 属性名 | 说明                             | 类型     | 默认值 |
| :----- | :------------------------------- | :------- | :----- |
| msg    | 数据检测提示内容（支持 HTML 文本） | `String` | ''     |

### 插槽

| 插槽名  | 说明                                 |
| :------ | :----------------------------------- |
| default | 提示内容下方的扩展区域（可选插槽）   |
