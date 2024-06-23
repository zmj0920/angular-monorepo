---
type: 数据录入
title: 表单
order: 1
---

在 formly 基础上以可配置形式渲染表单。

## API

### formly-form

参数 | 说明 | 类型 | 默认值
----|------|-----|------
`[fields]` | 用于构建表单元素配置。 | `NgFormlyFieldConfig[]` | -
`[form]` | 表单检测模型值和验证状态。 | `FormGroup or FormArray` | `new FormGroup({})`
`[model]` | 表单数据 | `any` | -
`[options]` | 表单选项 | `FormlyFormOptions` | -

### fields

参数 | 说明 | 类型 | 默认值
----|------|-----|------
`key` | 与model相关联(用于对话框时，key默认为type + '-' + index)。 | `string` | -
`id` | 指定元素的id。注意，如果没有设置，则自动生成id。 | `string` | -
`name` | 可以为元素指定一个名称。 | `string` | -
`type` |包含 alert、checkbox、image、input、ip、multicheckbox、multiple-input、password、radio、select、slider、text、textarea、unfold、upload、upload-file、upload-picture、verify, table, custom | `string` | -
`component` | 可以替换在type中定义的component | `any` | -
`className` | 指定位于formly-field的class名称 | `string` | -
`templateOptions` | 为模板保留的, 配置模板选项。 | `object` | -
`template` | 使用自定义html内容。 | `string` | -
`defaultValue` | 如果提供了这个参数，并且编译时model的值未定义，那么model的值将变成defaultValue。 | `any` | -
`hide` | 是否隐藏元素。如果您希望使用条件判断，请使用hideExpression。 | `boolean` | false
`hideExpression` | 根据来自其他field的值判断是否隐藏。 | `boolean or string or function` | -
`expressionProperties` | 通过表达式在主元素设置属性。 | `boolean or string or function` | -
`focus` | 设置元素焦点。如果您希望使用条件判断, 请使用expressionProperties。 | `boolean` | false
`wrappers` | 指定包装器的名称。formly元素模板将被第一个包装器包装，然后是第二个，第三个，等等。 | `string[]` | -
`parsers` | 当模型更新时(通常通过用户输入)，将执行函数数组。 | `function[]` | -
`fieldGroup` | 将元素分组，使得高级布局简单化。它还可以用于对与同一个模型相关联的元素进行分组。 | `NgFormlyFieldConfig[]` | -
`fieldArray` | 将元素分组，使得高级布局简单化。 | `NgFormlyFieldConfig` | -
`fieldGroupClassName` | 设定formly-group组件的class。 | `string` | -
`validation` | 用于展示校验信息。包含属性 messages, show | `object` | -
`validators` | 用于为特定元素设置验证规则。应该是键值对的对象。该值可以是要计算的表达式，也可以是要运行的函数。每个都应该返回一个布尔值，当元素有效时返回true。 | `any` | -
`asyncValidators` | 对于需要异步验证的内容，可以使用此方法。与validators api几乎相同，只是它必须是一个返回promise函数。 | `any` | -
`formControl` | 这是field的表单控件。它提供了更多的控件，比如运行验证器、计算状态和重置状态。 | `AbstractControl` | -
`modelOptions` | 指定绑定数据的规则: debounce, updateOn | `object` | -
`hooks` | 用于处理生命周期内的数据 | `object` | -

### alert templateOptions

参数 | 说明 | 类型 | 默认值
----|------|-----|------
`nzType` | 指定警告提示的样式:info、warning、error、success | `string` | 'info'
`nzMessage` | 警告提示内容 | `string` | -

### checkbox templateOptions

参数 | 说明 | 类型 | 默认值
----|------|-----|------
`arrangement` | arrangement为transverse时，label与表单元素横向排列 | `string` | -
`disabled` | 是否禁用 | `boolean` | -
`formlyItemStyle` | 设定表单控件外层样式 | `object` | -
`formlyLabelStyle` | 设定label样式 | `object` | -
`label` | label标签 | `string` | -
`required` | 是否必填 | `boolean` | -
`validationStyle` | 设定校验异常提示样式 | `object` | -
`popoverTitle` | 提示信息title | `string` | -
`popoverTitleRender` | 提示信息title(自定义渲染ID,指向ng-template中的ngFormRef) | `string` | -
`popoverContent` | 提示信息内容 | `string` | -
`popoverContentRender` | 提示信息内容(自定义渲染ID,指向ng-template中的ngFormRef) | `string` | -
`hideRequiredMarker` | 是否隐藏必填标志* | `boolean` | -
`prompt` | 设定建议提示 | `string` | -

### image templateOptions

参数 | 说明 | 类型 | 默认值
----|------|-----|------
`arrangement` | arrangement为transverse时，label与表单元素横向排列 | `string` | -
`formlyItemStyle` | 设定表单控件外层样式 | `object` | -
`formlyLabelStyle` | 设定label样式 | `object` | -
`label` | label标签 | `string` | -
`required` | 是否必填 | `boolean` | -
`validationStyle` | 设定校验异常提示样式 | `object` | -
`popoverTitle` | 提示信息title | `string` | -
`popoverTitleRender` | 提示信息title(自定义渲染ID,指向ng-template中的ngFormRef) | `string` | -
`popoverContent` | 提示信息内容 | `string` | -
`popoverContentRender` | 提示信息内容(自定义渲染ID,指向ng-template中的ngFormRef) | `string` | -
`maxWidth` | 图片最大宽度 | `string` | -
`maxHeight` | 图片最大高度 | `string` | -

### input templateOptions

参数 | 说明 | 类型 | 默认值
----|------|-----|------
`arrangement` | arrangement为transverse时，label与表单元素横向排列 | `string` | -
`disabled` | 是否禁用 | `boolean` | -
`formlyItemStyle` | 设定表单控件外层样式 | `object` | -
`formlyLabelStyle` | 设定label样式 | `object` | -
`label` | label标签 | `string` | -
`required` | 是否必填 | `boolean` | -
`validationStyle` | 设定校验异常提示样式 | `object` | -
`popoverTitle` | 提示信息title | `string` | -
`popoverTitleRender` | 提示信息title(自定义渲染ID,指向ng-template中的ngFormRef) | `string` | -
`popoverContent` | 提示信息内容 | `string` | -
`popoverContentRender` | 提示信息内容(自定义渲染ID,指向ng-template中的ngFormRef) | `string` | -
`placeholder` | 提示信息 | `string` | -
`type` | 输入框类型:text number | `string` | 'text'
`step` | 数字输入框每次改变步数，可以为小数 | `number | string` | 1
`nzMin` | 数字输入框可输入最小值 | `number` | -9007199254740991
`nzMax` | 数字输入框可输入最大值 | `number` | 9007199254740991
`precision` | 数字输入框数值精度 | `number` | -
`autocomplete` | 启用自动完成功能 | `'on' | 'off'` | 'on'
`autoCompleteExpression` | 输入框自动完成/联想功能(type: text) | `function` | -
`autoCompleteTriggerCharacter` | 触发输入框自动完成/联想功能关键字 | `string` | $
`prompt` | 设定建议提示 | `string` | -

### ip templateOptions

参数 | 说明 | 类型 | 默认值
----|------|-----|------
`arrangement` | arrangement为transverse时，label与表单元素横向排列 | `string` | -
`formlyItemStyle` | 设定表单控件外层样式 | `object` | -
`formlyLabelStyle` | 设定label样式 | `object` | -
`label` | label标签 | `string` | -
`required` | 是否必填 | `boolean` | -
`validationStyle` | 设定校验异常提示样式 | `object` | -
`popoverTitle` | 提示信息title | `string` | -
`popoverTitleRender` | 提示信息title(自定义渲染ID,指向ng-template中的ngFormRef) | `string` | -
`popoverContent` | 提示信息内容 | `string` | -
`popoverContentRender` | 提示信息内容(自定义渲染ID,指向ng-template中的ngFormRef) | `string` | -
`IPType` | IPType为wrap时含有外边框 | `string` | -
`ipsDisabled` | 是否禁用输入框 | `boolean[]` | -
`ipsPattern` | 输入框正则表达式 | `RegExp[]` | -
`prompt` | 设定建议提示 | `string` | -

### cidr templateOptions

参数 | 说明 | 类型 | 默认值
----|------|-----|------
`arrangement` | arrangement为transverse时，label与表单元素横向排列 | `string` | -
`formlyItemStyle` | 设定表单控件外层样式 | `object` | -
`formlyLabelStyle` | 设定label样式 | `object` | -
`label` | label标签 | `string` | -
`required` | 是否必填 | `boolean` | -
`validationStyle` | 设定校验异常提示样式 | `object` | -
`popoverTitle` | 提示信息title | `string` | -
`popoverTitleRender` | 提示信息title(自定义渲染ID,指向ng-template中的ngFormRef) | `string` | -
`popoverContent` | 提示信息内容 | `string` | -
`popoverContentRender` | 提示信息内容(自定义渲染ID,指向ng-template中的ngFormRef) | `string` | -
`ipsDisabled` | 是否禁用输入框 | `boolean[]` | -
`ipsPattern` | 输入框正则表达式 | `RegExp[]` | -
`prompt` | 设定建议提示 | `string` | -

### multicheckbox templateOptions

参数 | 说明 | 类型 | 默认值
----|------|-----|------
`arrangement` | arrangement为transverse时，label与表单元素横向排列 | `string` | -
`disabled` | 是否禁用 | `boolean` | -
`formlyItemStyle` | 设定表单控件外层样式 | `object` | -
`formlyLabelStyle` | 设定label样式 | `object` | -
`label` | label标签 | `string` | -
`required` | 是否必填 | `boolean` | -
`validationStyle` | 设定校验异常提示样式 | `object` | -
`popoverTitle` | 提示信息title | `string` | -
`popoverTitleRender` | 提示信息title(自定义渲染ID,指向ng-template中的ngFormRef) | `string` | -
`popoverContent` | 提示信息内容 | `string` | -
`popoverContentRender` | 提示信息内容(自定义渲染ID,指向ng-template中的ngFormRef) | `string` | -
`hideRequiredMarker` | 是否隐藏必填标志* | `boolean` | -
`options` | 多选框选项,含有disabled、key和label字段 | `object[]` | -
`prompt` | 设定建议提示 | `string` | -

### multiple-input templateOptions

参数 | 说明 | 类型 | 默认值
----|------|-----|------
`arrangement` | arrangement为transverse时，label与表单元素横向排列 | `string` | -
`formlyItemStyle` | 设定表单控件外层样式 | `object` | -
`formlyLabelStyle` | 设定label样式 | `object` | -
`label` | label标签 | `string` | -
`required` | 是否必填 | `boolean` | -
`validationStyle` | 设定校验异常提示样式 | `object` | -
`popoverTitle` | 提示信息title | `string` | -
`popoverTitleRender` | 提示信息title(自定义渲染ID,指向ng-template中的ngFormRef) | `string` | -
`popoverContent` | 提示信息内容 | `string` | -
`popoverContentRender` | 提示信息内容(自定义渲染ID,指向ng-template中的ngFormRef) | `string` | -
`limit` | 最大添加数量 | `number` | -


### password templateOptions

参数 | 说明 | 类型 | 默认值
----|------|-----|------
`arrangement` | arrangement为transverse时，label与表单元素横向排列 | `string` | -
`disabled` | 是否禁用 | `boolean` | -
`formlyItemStyle` | 设定表单控件外层样式 | `object` | -
`formlyLabelStyle` | 设定label样式 | `object` | -
`label` | label标签 | `string` | -
`required` | 是否必填 | `boolean` | -
`validationStyle` | 设定校验异常提示样式 | `object` | -
`popoverTitle` | 提示信息title | `string` | -
`popoverTitleRender` | 提示信息title(自定义渲染ID,指向ng-template中的ngFormRef) | `string` | -
`popoverContent` | 提示信息内容 | `string` | -
`popoverContentRender` | 提示信息内容(自定义渲染ID,指向ng-template中的ngFormRef) | `string` | -
`placeholder` | 提示信息 | `string` | -
`prompt` | 设定建议提示 | `string` | -

### radio templateOptions

参数 | 说明 | 类型 | 默认值
----|------|-----|------
`arrangement` | arrangement为transverse时，label与表单元素横向排列 | `string` | -
`disabled` | 是否禁用 | `boolean` | -
`formlyItemStyle` | 设定表单控件外层样式 | `object` | -
`formlyLabelStyle` | 设定label样式 | `object` | -
`label` | label标签 | `string` | -
`required` | 是否必填 | `boolean` | -
`validationStyle` | 设定校验异常提示样式 | `object` | -
`popoverTitle` | 提示信息title | `string` | -
`popoverTitleRender` | 提示信息title(自定义渲染ID,指向ng-template中的ngFormRef) | `string` | -
`popoverContent` | 提示信息内容 | `string` | -
`popoverContentRender` | 提示信息内容(自定义渲染ID,指向ng-template中的ngFormRef) | `string` | -
`options` | 多选框选项,含有optionPopoverTitle、optionPopoverTitleRender、optionPopoverContent、optionPopoverContentRender、disabled、title、value和label字段 | `object[]` | -
`align` | 排列方式: horizontal vertical | `string` | 'horizontal'
`prompt` | 设定建议提示 | `string` | -

### select templateOptions

参数 | 说明 | 类型 | 默认值
----|------|-----|------
`arrangement` | arrangement为transverse时，label与表单元素横向排列 | `string` | -
`disabled` | 是否禁用 | `boolean` | -
`formlyItemStyle` | 设定表单控件外层样式 | `object` | -
`formlyLabelStyle` | 设定label样式 | `object` | -
`label` | label标签 | `string` | -
`required` | 是否必填 | `boolean` | -
`validationStyle` | 设定校验异常提示样式 | `object` | -
`popoverTitle` | 提示信息title | `string` | -
`popoverTitleRender` | 提示信息title(自定义渲染ID,指向ng-template中的ngFormRef) | `string` | -
`popoverContent` | 提示信息内容 | `string` | -
`popoverContentRender` | 提示信息内容(自定义渲染ID,指向ng-template中的ngFormRef) | `string` | -
`placeholder` | 提示信息 | `string` | -
`multiple` | 是否多选 | `boolean` | -
`options` | 下拉框框选项,含有tooltipTitle、disabled、translate(默认true)、value和label字段 | `boolean` | -
`loading` | 是否显示loading | `boolean` | false
`groupProp` | 自定义group | `string` | -
`valueProp` | 自定义value | `string` | -
`labelProp` | 自定义label | `string` | -
`allowClear` | 支持清除 | `boolean` | false
`allowCheckAll` | 多选模式支持全选 | `boolean` | false
`showSearch` | 使单选模式可搜索 | `boolean` | true,
`optionOverflowSize` | 下拉菜单中最多展示的 Option 个数，超出部分滚动 | `number` | 8,
`prompt` | 设定建议提示 | `string` | -

### slider templateOptions

参数 | 说明 | 类型 | 默认值
----|------|-----|------
`arrangement` | arrangement为transverse时，label与表单元素横向排列 | `string` | -
`disabled` | 是否禁用 | `boolean` | -
`formlyItemStyle` | 设定表单控件外层样式 | `object` | -
`formlyLabelStyle` | 设定label样式 | `object` | -
`label` | label标签 | `string` | -
`required` | 是否必填 | `boolean` | -
`validationStyle` | 设定校验异常提示样式 | `object` | -
`popoverTitle` | 提示信息title | `string` | -
`popoverTitleRender` | 提示信息title(自定义渲染ID,指向ng-template中的ngFormRef) | `string` | -
`popoverContent` | 提示信息内容 | `string` | -
`popoverContentRender` | 提示信息内容(自定义渲染ID,指向ng-template中的ngFormRef) | `string` | -
`min` | 可输入最小值 | `number` | -
`max` | 可输入最大值 | `number` | -
`unit` | 显示单位 | `string` | -
`step` | 设置步长 | `number` | 1

### text templateOptions

参数 | 说明 | 类型 | 默认值
----|------|-----|------
`arrangement` | arrangement为transverse时，label与表单元素横向排列 | `string` | -
`formlyItemStyle` | 设定表单控件外层样式 | `object` | -
`formlyLabelStyle` | 设定label样式 | `object` | -
`label` | label标签 | `string` | -
`required` | 是否必填 | `boolean` | -
`validationStyle` | 设定校验异常提示样式 | `object` | -
`popoverTitle` | 提示信息title | `string` | -
`popoverTitleRender` | 提示信息title(自定义渲染ID,指向ng-template中的ngFormRef) | `string` | -
`popoverContent` | 提示信息内容 | `string` | -
`popoverContentRender` | 提示信息内容(自定义渲染ID,指向ng-template中的ngFormRef) | `string` | -

### textarea templateOptions

参数 | 说明 | 类型 | 默认值
----|------|-----|------
`arrangement` | arrangement为transverse时，label与表单元素横向排列 | `string` | -
`disabled` | 是否禁用 | `boolean` | -
`formlyItemStyle` | 设定表单控件外层样式 | `object` | -
`formlyLabelStyle` | 设定label样式 | `object` | -
`label` | label标签 | `string` | -
`required` | 是否必填 | `boolean` | -
`validationStyle` | 设定校验异常提示样式 | `object` | -
`popoverTitle` | 提示信息title | `string` | -
`popoverTitleRender` | 提示信息title(自定义渲染ID,指向ng-template中的ngFormRef) | `string` | -
`popoverContent` | 提示信息内容 | `string` | -
`popoverContentRender` | 提示信息内容(自定义渲染ID,指向ng-template中的ngFormRef) | `string` | -
`placeholder` | 提示信息 | `string` | -
`rows` | 设置高度 | `number` | 4

### unfold templateOptions

参数 | 说明 | 类型 | 默认值
----|------|-----|------
`arrangement` | arrangement为transverse时，label与表单元素横向排列 | `string` | -
`formlyItemStyle` | 设定表单控件外层样式 | `object` | -
`formlyLabelStyle` | 设定label样式 | `object` | -
`validationStyle` | 设定校验异常提示样式 | `object` | -
`content` | 显示内容 | `string` | -
`triggerUnfold` | 点击触发调用 | `function` | -

### upload-picture templateOptions

参数 | 说明 | 类型 | 默认值
----|------|-----|------
`arrangement` | arrangement为transverse时，label与表单元素横向排列 | `string` | -
`nzDisabled` | 是否禁用 | `boolean` | -
`formlyItemStyle` | 设定表单控件外层样式 | `object` | -
`formlyLabelStyle` | 设定label样式 | `object` | -
`label` | label标签 | `string` | -
`required` | 是否必填 | `boolean` | -
`validationStyle` | 设定校验异常提示样式 | `object` | -
`popoverTitle` | 提示信息title | `string` | -
`popoverTitleRender` | 提示信息title(自定义渲染ID,指向ng-template中的ngFormRef) | `string` | -
`popoverContent` | 提示信息内容 | `string` | -
`popoverContentRender` | 提示信息内容(自定义渲染ID,指向ng-template中的ngFormRef) | `string` | -
`invalidIndex` | 设定校验异常的角标,边框变红 | `number[]` | -
`prompt` | 设定建议提示 | `string` | -
`nzLimit` | 最大上传数量(nzLimit为1时，显示重新上传) | `number` | 1
`nzMultiple` | 是否允许一次选择多个文件 | `number` | 1
`loading` | 是否加载loading | `boolean` | false
`uploadType` | 指定组件样式: picture和icon | `string` | picture

### upload templateOptions

参数 | 说明 | 类型 | 默认值
----|------|-----|------
`arrangement` | arrangement为transverse时，label与表单元素横向排列 | `string` | -
`nzDisabled` | 是否禁用 | `boolean` | -
`formlyItemStyle` | 设定表单控件外层样式 | `object` | -
`formlyLabelStyle` | 设定label样式 | `object` | -
`label` | label标签 | `string` | -
`required` | 是否必填 | `boolean` | -
`validationStyle` | 设定校验异常提示样式 | `object` | -
`popoverTitle` | 提示信息title | `string` | -
`popoverTitleRender` | 提示信息title(自定义渲染ID,指向ng-template中的ngFormRef) | `string` | -
`popoverContent` | 提示信息内容 | `string` | -
`popoverContentRender` | 提示信息内容(自定义渲染ID,指向ng-template中的ngFormRef) | `string` | -
`nzLimit` | 最大上传数量 | `number` | 1
`nzMultiple` | 是否允许一次选择多个文件 | `number` | 1
`startUpload` | 为true时显示进度 | `boolean` | -
`progressPercentage` | 设置上传进度 | `number` | -
`nzStatus` | 设置上传进度状态: success和exception | `string` | -
`drag_files_msg` | 组件提示内容 | `number` | '将文件拖动到此可上传/Drag and drop your files here'
`or_msg` | 组件提示内容 | `number` | '或/or'
`upload_file_msg` | 组件提示内容 | `number` | '选择文件/Upload File'
`showRemoveIcon` | 是否显示删除图标 | `boolean` | -

### upload-file templateOptions

参数 | 说明 | 类型 | 默认值
----|------|-----|------
`arrangement` | arrangement为transverse时，label与表单元素横向排列 | `string` | -
`disabled` | 是否禁用 | `boolean` | -
`formlyItemStyle` | 设定表单控件外层样式 | `object` | -
`formlyLabelStyle` | 设定label样式 | `object` | -
`label` | label标签 | `string` | -
`required` | 是否必填 | `boolean` | -
`validationStyle` | 设定校验异常提示样式 | `object` | -
`popoverTitle` | 提示信息title | `string` | -
`popoverTitleRender` | 提示信息title(自定义渲染ID,指向ng-template中的ngFormRef) | `string` | -
`popoverContent` | 提示信息内容 | `string` | -
`popoverContentRender` | 提示信息内容(自定义渲染ID,指向ng-template中的ngFormRef) | `string` | -
`placeholder` | 提示信息 | `string` | -
`btnName` | 按钮名称 | `string` | -
`prompt` | 设定建议提示 | `string` | -

### verify templateOptions

参数 | 说明 | 类型 | 默认值
----|------|-----|------
`arrangement` | arrangement为transverse时，label与表单元素横向排列 | `string` | -
`formlyItemStyle` | 设定表单控件外层样式 | `object` | -
`formlyLabelStyle` | 设定label样式 | `object` | -
`validationStyle` | 设定校验异常提示样式 | `object` | -
`btnName` | 按钮名称 | `string` | -
`btnDisabled` | 是否禁用按钮 | `boolean` | -
`loading` | 是否加载loading | `boolean` | -
`verifyResult` | 定义验证结果 | `string` | -
`verifyStatus` | 定义验证状态: success error | `string` | -
`param` | 为翻译的结果传参 | `object` | -
`verifyData` | 点击触发调用 | `function` | -

### table templateOptions

参数 | 说明 | 类型 | 默认值
----|------|-----|------
`descriptions` | 表格描述 | `TemplateRef<void> \| Descriptions[<string \| TemplateRef<void>>]` | -
`globalActions` | 表格全局操作(详细配置见表格组件) | `GlobalActions[] \| TemplateRef<void>` | -
`selectFilters` | 搜索配置(详细配置见表格组件) | `SelectFilters[] \| TemplateRef<void>` | -
`filterFacets` | 搜索配置(详细配置见表格组件) | `FilterFacet[] \| TemplateRef<void>` | -
`defaultSort` | 按照某列进行排序 | `string` | -
`defaultSortRevers` | 排序方式(`ascend`, `descend`) | `string` | `ascend`
`column` | 列配置(详细配置见表格组件,注意：列自定义渲染使用ngFormRef) | `Column[]` | -
`loading` | 表格loading状态 | `boolean` | -
`dataSet` | 数据源 | `Data[]` | -
`showSetupColumn` | 控制列是否显示 | `boolean` | `false`
`showTotal` | 是否显示总条数和刷新时间 | `boolean` | `false`
`disablePagination` | 禁用分页 | `boolean` | `false`
`hideOnSinglePage` | 单页时是否显示分页 | `boolean` | `false`
`pageSize` | 每页展示多少数据，可双向绑定 | `number` | `10`
`pageSizeOptions` | 页数选择器可选值 | `number[]` | `[ 10, 15, 20 ]`

### custom templateOptions

参数 | 说明 | 类型 | 默认值
----|------|-----|------
`render` | 自定义渲染ID,指向ng-template中的ngFormRef，并且暴露出参数to(to对应field的templateOptions)、formControl和field，根据这些参数实现自定义组件 | `string` | -
