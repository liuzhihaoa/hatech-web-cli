const fs = require('fs')
const path = require('path')
const { error, log, success, warning } = require('../lib/utils')
const { existGit } = require('../lib/env')
const { typeQuestion, nameQuestion } = require('../lib/questions')
const { copyTemplate } = require('../lib/copy')

module.exports = async (name, args) => {
  try {
    let type = args.type

    if (!type) {
      const typeAnswer = await typeQuestion()
      type = typeAnswer.type
    }

    while (!name) {
      const nameAnswer = await nameQuestion()
      if (nameAnswer.name) {
        name = nameAnswer.name
      } else {
        warning('名称不能空')
      }
    }

    // 检查环境
    if (!existGit()) {
      error('git未安装')
      process.exit(1)
    }
    // 复制模板
    const target = path.join(process.cwd(), name)
    copyTemplate(target, type, name)
    if (fs.existsSync(target)) {
      success('创建' + name + '成功，请开始你的表演')
    } else {
      error('创建失败，请查看帮助或联系管理人员')
    }
  } catch (err) {
    error(err)
    error('创建失败，请查看帮助或联系管理人员')
  }
} 