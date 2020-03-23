const { parse } = require('@babel/parser')
const { default: traverse } = require('@babel/traverse')
const t = require('@babel/types')
const { default: generate } = require('@babel/generator')
const codes = 'log("Hello, world")'
const ast = parse(codes, {
  sourceType: 'module'
})

const createMemberExpression = () => {
  return t.memberExpression(t.identifier('console'), t.identifier('log.log'))
}

const vistor = {
  Identifier(path) {
    const { node } = path
    if (node && node.name === 'log') {
      path.replaceWith(createMemberExpression())
      path.stop()
    }
  }
}

traverse(ast, vistor)

const { code } = generate(ast, codes)

console.log(code)
