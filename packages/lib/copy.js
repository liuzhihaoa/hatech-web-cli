const shell = require('shelljs')
const Path = require('path')
const fs = require('fs')
const { log, error } = require('./utils')
shell.config.fatal = true

const copyTemplate = (target, type, name) => {
  const { templateGits } = require('../config/db.json')
  const option = templateGits.find(git => git.type === type)
  if (!option) {
    error(`未找到${type}相关记录`)
    process.exit(1)
  }
  const command = `git clone ${option.url} ${target}`

  shell.exec(command)

  const projectPackageUrl = Path.join(target, 'package.json')
  const projectPackage = require(projectPackageUrl)
  if (projectPackage) {
    projectPackage.version = '0.0.1'
    projectPackage.name = name
    projectPackage.description = ''
    // 删除模板git
    shell.rm('-rf', Path.join(target, '.git'))
    fs.writeFileSync(projectPackageUrl, JSON.stringify(projectPackage, null, 2))
  }

  return { target }
}

module.exports = { copyTemplate }