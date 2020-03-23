const compiler = require('vue-template-compiler')
const fs = require('fs')
const babylon = require('babylon')
const { initProps } = require('./collect-state')
const formatContent = function(source, isSFC) {
  if (isSFC) {
    const res = compiler.parseComponent(source, { pad: 'line' })
    return {
      template: res.template.content,
      js: res.script.content.replace(/\/\//g, '')
    }
  } else {
    return {
      template: null,
      js: source
    }
  }
}
const source = fs.readFileSync('./components/ThemeSelect/index.vue', 'utf-8')
const component = formatContent(source.toString(), true)
const vast = babylon.parse(component.js, {
  sourceType: 'module'
})

const state = {
  props: {},
  thirdparts: {}
}

initProps(vast, state)

console.log(state)
