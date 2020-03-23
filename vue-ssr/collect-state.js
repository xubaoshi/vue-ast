const babelTraverse = require('babel-traverse').default
const t = require('babel-types')

const { log } = require('./utils')
const collectVueProps = require('./vue-props')

/**
 * Collect vue component state(data prop, props prop & computed prop)
 * Don't support watch prop of vue component
 */
exports.initProps = function initProps(ast, state) {
  babelTraverse(ast, {
    Program(path) {
      const nodeLists = path.node.body
      let count = 0

      for (let i = 0; i < nodeLists.length; i++) {
        const node = nodeLists[i]
        // const childPath = path.get(`body.${i}`);
        if (t.isExportDefaultDeclaration(node)) {
          count++
        }
      }

      if (count > 1 || !count) {
        const msg = !count ? 'Must hava one' : 'Only one'
        log(`${msg} export default declaration in youe vue component file`)
        process.exit()
      }
    },

    ObjectProperty(path) {
      const parent = path.parentPath.parent
      const name = path.node.key.name
      if (parent && t.isExportDefaultDeclaration(parent)) {
        if (name === 'name') {
          if (t.isStringLiteral(path.node.value)) {
            state.name = path.node.value.value
          } else {
            log(`The value of name prop should be a string literal.`)
          }
        } else if (name === 'props') {
          collectVueProps(path, state)
          path.stop()
        }
      }
    }
  })
}
