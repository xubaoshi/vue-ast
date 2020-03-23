const t = require('babel-types')
const chalk = require('chalk')

exports.log = function log(msg, type = 'error') {
  if (type === 'error') {
    return console.log(chalk.red(`${msg}`))
  }
  console.log(chalk.green(msg))
}
