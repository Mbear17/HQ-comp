# 通用组件
可以在任意页面直接引用的组件

## cpt-upload 附件上传
通用的附件上传组件

### 已应用的功能
| 学校                             | 功能                | 地址                                    |
| -------------------------------- | ------------------- | --------------------------------------- |
| 中国石油大学克拉玛依校区（CUPK） | 到款认领/填写业务单 | WebRoot/saap/expense_apply_receipt.html |
|                                | 到款认领/业务单提交 | WebRoot/saap/expense_apply_comfirm.html |
|                                | 到款认领/提交成功 | WebRoot/saap/expense_apply_success.html |
|                                | 到款认领/查看页 | WebRoot/saap/expense_apply_query.html |

### 基本用法
提供完整的“查看”、“下载”、“上传”、“删除”功能。
![alt text](/public/upload1.png)

::: details 查看示例代码
```Vue
<script type="text/javascript" charset="UTF-8">
    document.write('<script src="/saap/component/cpt-upload.js?v=' + Date.now() +'" type="text/javascript" charset="UTF-8"><\/script>');
</script>
...
<cpt-upload></cpt-upload>
...
components: {
    'cpt-upload': CptUpload, // 上传附件
},
```
:::

### 查看模式
仅提供“查看”、“下载”功能，使用`readonly`属性实现。
![alt text](/public/upload2.png)
```Vue
<cpt-upload readonly></cpt-upload>
```

### Attribute
| 参数     | 说明                                             | 类型    | 可选值     | 默认值   |
| -------- | ------------------------------------------------ | ------- | ---------- | -------- |
| apply_id | 业务单id，用于接口调用（readonly模式下必填）     | String  | -          | -        |
| title    | 自定义组件标题（readonly模式下默认为“附件列表”） | String  | -          | 上传附件 |
| readonly | 为true时开启查看模式                             | Boolean | true/false | false    |
| divider  | 为true时显示组件底部分隔线                       | Boolean | true/false | true     |
| tip      | 组件标题右边的提示                               | String  | -          | -        |

### 组件接口
1. 附件列表加载：
```js
axios({
    method: 'post',
    url: '/ExpenseApplyUInsV2',
    data: {
        ajax: true,
        act: 'edoc_load',
    }
})
```

2. 上传附件：
```html{4}
<el-upload
    class="ml10"
    ref="upload"
    action="/ExpenseApplyUInsV2?ajax=true&act=edoc_upload"
    list-type="picture-card"
    :file-list="fileList"
    :before-upload="beforeUpload"
    :on-success="onSuccess"
    :auto-upload="true">
</el-upload>
```

3. 下载附件：
```js
window.location.href = `/ExpenseApplyUInsV2?ajax=true&act=edoc_download&docId=${file.doc_id}&docOrd=${file.ord}`
```

4. 删除附件：
```js
axios({
    method: 'post',
    url: '/ExpenseApplyUInsV2',
    data: {
        ajax: true,
        act: 'edoc_delete',
        docId: file.doc_id,
        docOrd: file.ord
    }
})
```
