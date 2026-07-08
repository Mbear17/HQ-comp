# 数据检测提示组件

::: tip 组件说明
此组件用于显示数据检测提示信息，常用于表单验证或数据校验场景。
:::

## 在线演示

<DemoDatacheckAlert />

## 组件属性

| 属性名 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| `msg` | String | `''` | 提示信息内容（支持HTML） |

## 功能特性

- 支持显示数据检测提示信息
- 支持HTML内容渲染
- 支持插槽（slot）扩展内容
- 黄色警告样式

## 使用示例

```vue
<template>
  <datacheck-alert :msg="datacheck_msg">
    <el-checkbox v-model="overFlag" true-label="T" false-label="F">
      我确认相关差旅标准
    </el-checkbox>
  </datacheck-alert>
</template>

<script setup>
import { ref } from 'vue'
const datacheck_msg = ref('住宿标准超出规定，请确认是否继续。')
const overFlag = ref('F')
</script>
```
