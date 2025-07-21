import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import Input from './Input.vue'

describe('Input', () => {
  it('基本展示', () => {
    const wrapper = mount(Input, {
      props: {
        type: 'text',
        size: 'small',
        modelValue: 'hello'
      },
      slots: {
        prepend: 'prepend',
        prefix: 'prefix',
      }
    })
    console.log(wrapper.html())
    // classes
    expect(wrapper.classes()).toContain('vk-input--small')
    expect(wrapper.classes()).toContain('is-prepend')
    // should render input
    expect(wrapper.find('input').exists()).toBeTruthy()
    // expect(wrapper.get('input').attributes('type')).toBe('text')
    // slots
    expect(wrapper.find('.vk-input__prepend').exists()).toBeTruthy()
    // expect(wrapper.get('.vk-input__prefix').text()).toBe('prepend')
    expect(wrapper.find('.vk-input__prefix').exists()).toBeTruthy()
    // expect(wrapper.get('.vk-input__prefix').text()).toBe('prefix')

    const wrapper2 = mount(Input, {
      props: {
        type: 'textarea',
        modelValue: 'hello'
      }
    })
    expect(wrapper2.find('textarea').exists()).toBeTruthy()
  })

  it('支持v-model', async () => {
    const wrapper = mount(Input, {
      props: {
        modelValue: 'test',
        type: 'text',
        'onUpdate:modelValue': (e: string) => wrapper.setProps({ modelValue: e })
      }
    })
    // 初始值
    const input = wrapper.get('input')
    expect(input.element.value).toBe('test')
    // 更新值
    await input.setValue('update')
    expect(wrapper.props('modelValue')).toBe('update')
    expect(input.element.value).toBe('update')
    // v-model 异步更新
    await wrapper.setProps({ modelValue: 'prop update' })
    expect(input.element.value).toBe('prop update')
  })

  it('支持点击清空字符串', async () => {
    const wrapper = mount(Input, {
      props: {
        modelValue: 'test',
        clearable: true,
        type: 'text'
      },
      global: {
        stubs: ['Icon']
      }
    })
    // 不出现对应的 Icon 区域
    expect(wrapper.find('.vk-input__clear').exists()).toBeFalsy()
    const input = wrapper.get('input')
    await input.trigger('focus')
    expect(wrapper.emitted()).toHaveProperty('focus')
    //  出现 Icon 区域
    expect(wrapper.find('.vk-input__clear').exists()).toBeTruthy()
    // 点击值变为空并且消失
    await wrapper.get('.vk-input__clear').trigger('click')
    expect(input.element.value).toBe('')
  })
  it('支持密码切换', async () => {
    const wrapper = mount(Input, {
      props: {
        modelValue: 'test',
        showPassword: true,
        type: 'text'
      },
      global: {
        stubs: ['Icon']
      }
    })
    // 不出现对应的 Icon 区域, 因为当前值为空
    expect(wrapper.find('.vk-input__password').exists()).toBeFalsy()
    const input = wrapper.get('input')
    expect(input.element.type).toBe('password')
    //  出现 Icon 区域，并且 Icon 为特点的图标
    await input.setValue('123')
    const eyeIcon = wrapper.find('.vk-input__password')
    expect(eyeIcon.exists()).toBeTruthy()
    expect(eyeIcon.attributes('icon')).toBe('eye-slash')
    // 点击值变会切换input 类型，并且图标的 Icon 会切换
    await eyeIcon.trigger('click')
    expect(input.element.type).toBe('text')
    expect(wrapper.find('.vk-input__password').attributes('icon')).toBe('eye')
  })
})
