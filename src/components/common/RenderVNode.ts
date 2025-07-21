import { defineComponent } from 'vue'

export const RenderVNode = defineComponent({
  props: {
    VNode: {
      type: [String, Object],
      required: true
      }
    },
    setup(props) {
      return props.VNode
    }
})
