# Tooltip 组件

## 基础用法
`placement` 属性支持不同位置的显示，默认值是 `bottom`。
<preview path="../demo/Tooltip/Basic.vue" title="Tooltip 组件基础用法" description="Tooltip 组件基础用法"></preview>

## 触发方式
`trigger` 属性定义触发方式，默认值是 `hover`，支持 `click` 触发和手动触发。
<preview path="../demo/Tooltip/Trigger.vue" title="Tooltip 组件支持的触发方式" description="Tooltip 组件支持的触发方式"></preview>

## 手动触发
`manual` 属性定义手动触发。
<preview path="../demo/Tooltip/Manual.vue" title="Tooltip 组件手动触发" description="Tooltip 组件手动触发"></preview>

## 自定义内容
`content` 属性自定义内容，`<slot name="content">` 标签内的内容将会被渲染为 Tooltip 组件的内容。
<preview path="../demo/Tooltip/Definition.vue" title="Tooltip 组件自定义内容" description="Tooltip 组件自定义内容"></preview>
