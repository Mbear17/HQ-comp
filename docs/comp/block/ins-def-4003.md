# 城市间交通（预留）

::: tip 组件说明
此组件为城市间交通费用录入的预留骨架组件，当前仅渲染区域标题、数据检测提示与分割线，暂无实际业务表单内容。常用于差旅报销流程中占位，待后续版本补充完整功能。
:::

## 功能特性

- 显示「城市间交通」区域标题（`app-area-title`）
- 支持通过 `datacheck_msg` 属性传入数据检测提示，内部复用 `datacheck-alert` 组件展示
- 提供组件框架约定的固定方法：`load`（加载）、`save`（保存）、`callParentFunc`（通知父组件刷新）
- 源码为骨架/占位版本，业务字段与交互尚未实现

## 使用示例

```html
<script type="text/javascript" charset="UTF-8">
    document.write('<script src="/saap/component/ins-def-4003.js?v=' + Date.now() +'" type="text/javascript" charset="UTF-8"><\/script>');
</script>

<ins-def-4003 :datacheck_msg="datacheckMsg"></ins-def-4003>
```

## API

### 属性

| 属性名        | 说明                       | 类型     | 默认值 |
| :------------ | :------------------------- | :------- | :----- |
| datacheck_msg | 数据检测提示内容（HTML 文本） | `String` | ''     |

### 方法

| 方法名           | 说明                                       |
| :--------------- | :----------------------------------------- |
| load             | 加载组件信息（函数名固定），内部调用 `confirm_init` |
| save             | 保存组件信息（函数名固定），当前仅打印日志 |
| callParentFunc   | 触发 `re-load` 事件，通知父组件需要刷新     |

### 事件

| 事件名  | 说明               | 回调参数   |
| :------ | :----------------- | :--------- |
| re-load | 需要刷新框架时触发 | ''（空字符串） |

## 版本说明

1. **当前为骨架版本**

源码模板仅包含区域标题、`datacheck-alert` 提示与分割线，`created` 钩子及 `data` 均为空；`load` 方法内调用的 `confirm_init` 未在本组件内定义，依赖外部全局方法或后续版本实现。
