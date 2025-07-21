import { describe, test, expect, vi, beforeAll } from 'vitest'
// import { h } from 'vue'
import { mount } from '@vue/test-utils'
import type { VueWrapper, DOMWrapper } from '@vue/test-utils'
import Collapse from './Collapse.vue'
import CollapseItem from './CollapseItem.vue'

const onChange = vi.fn()
let wrapper: VueWrapper
let headers: DOMWrapper<Element>[], contents: DOMWrapper<Element>[]
let firstContent: DOMWrapper<Element>, secondContent: DOMWrapper<Element>, disabledContent: DOMWrapper<Element>,
  firstHeader: DOMWrapper<Element>, secondHeader: DOMWrapper<Element>, disabledHeader: DOMWrapper<Element>
describe('Collapse.vue', () => {
  // test('basic collapse', () => {
  //   const wrapper = mount(Collapse, {
  //     props: {
  //       modelValue: ['a'],
  //     },
  //     slots: {
  //       default: () => h(CollapseItem, { name: 'a', title: 'title a' }, 'content a'),
  //     },
  //     global: {
  //       stubs: ['Icon']
  //     }
  //   })
  //   console.log(wrapper.html())
  // })
  beforeAll(() => {
    wrapper = mount(() => {
      return (
        <Collapse modelValue={['a']} onChange={onChange}>
          <CollapseItem name="a" title="title a">content a</CollapseItem>
          <CollapseItem name="b" title="title b">content b</CollapseItem>
          <CollapseItem name="c" title="title c" disabled>content c</CollapseItem>
        </Collapse>
      )
    }, {
      global: {
        stubs: ['Icon']
      },
      // isVisible() 没有立即反应的问题
      attachTo: document.body
    })
    headers = wrapper.findAll('.vk-collapse-item__header')
    contents = wrapper.findAll('.vk-collapse-item__wrapper')
    firstHeader = headers[0]
    secondHeader = headers[1]
    disabledHeader = headers[2]
    firstContent = contents[0]
    secondContent = contents[1]
    disabledContent = contents[2]
  })
  test('测试基础结构以及对应文本', () => {
    // 长度
    expect(headers.length).toBe(3)
    expect(contents.length).toBe(3)
    // 文本
    expect(firstHeader.text()).toBe('title a')
    // 内容
    expect(firstContent.isVisible()).toBeTruthy()
    expect(secondContent.isVisible()).toBeFalsy()
    expect(firstContent.text()).toBe('content a')
  })
  test('点击标题展开/关闭内容', async () => {
    // 行为
    await firstHeader.trigger('click')
    expect(firstContent.isVisible()).toBeFalsy()
    await secondHeader.trigger('click')
    expect(secondContent.isVisible()).toBeTruthy()
  })
  test('发送正确的事件', () => {
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    expect(wrapper.emitted('change')).toBeUndefined()
  })
  test('disabled 的内容应该没有反应', async () => {
    await disabledHeader.trigger('click')
    expect(disabledContent.isVisible()).toBeFalsy()
  })
})
