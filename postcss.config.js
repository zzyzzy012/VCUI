import postcssNested from 'postcss-nested'
import postcssEach from 'postcss-each'
import postcssFor from 'postcss-for'
import postcssColorMix from 'postcss-color-mix'
import postcssEachVariables from 'postcss-each-variables'

export default {
  plugins: [
    postcssEachVariables(),
    postcssEach({
      plugins: {
        beforeEach: [postcssFor(), postcssColorMix()],
      },
    }),
    postcssNested(),
  ],
}
