const { log, success, error } = require('../lib/utils')
const { addTemplateQuestion } = require('../lib/questions')
const Path = require('path')
const fs = require('fs')
const shell = require('shelljs')

module.exports = async (params) => {
  const { Ls, Add } = params
  const dbUrl = __dirname + '/../config/db.json'
  const db = require(dbUrl)
  if (Ls) {
    // 展示所有的模板
    db.templateGits.forEach(git => {
      log(`${git.name} : ${git.url}`)
    })
  } else if (Add) {
    const result = await addTemplateQuestion()

    const { name, type, url } = result
    if (!name || !type || !url) {
      error(`三个参数不能为空`)
      return
    }
    if (db.templateGits.some(item => item.name === name)) {
      error(`模板名称 ${name} 已存在`)
      return
    }
    if (db.templateGits.some(item => item.type === type)) {
      error(`模板类型 ${type} 已存在`)
      return
    }
    db.templateGits.push({ name, type, url })
    success('添加成功')
    fs.writeFileSync(dbUrl, JSON.stringify(db, null, 2))
  }
}