import { defineComponent, h, ref } from 'vue'

export default defineComponent({
  name: 'VNode',
  props: {
    msg: {
      type: String,
      // default: 'hello world'
      required: true
      }
    },
    setup(props) {
      return () => {
        return (
          <div>
            <h1>{props.msg}</h1>
          </div>
        )
      }
    }
  }
)
