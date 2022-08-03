const Fs = require('fs')
const Concurrently = require('concurrently')
const { error } = require('../lib/utils')

module.exports = async params => {
    const { Run, Config } = params
    if (Run) {
        if (!Fs.existsSync('./micro.json')) {
            error('当前运行路径未发现micro.json')
            return
        }
        let config = Fs.readFileSync('./micro.json')
        try {
           config = JSON.parse(config)
        } catch(e) {
            error('配置文件有误')
            return
        }
        if (toString.apply(config) !== '[object Object]' ||
         !config.apps || 
         toString.apply(config.apps) !== '[object Array]') {
             return error('配置文件有误')
         }
         const runParams = config.apps.map(app => ({
            command: `cd ${app.path}&${app.command}`,
            name: app.name,
            prefixColor: app.color
        }))
        Concurrently(runParams)
    } else if (Config) {
        if (Fs.existsSync('./micro.json')) {
            error('当前运行路径已有micro.json配置文件')
            return
        }
        const content = {
            apps: [
                {
                    name: '工程名称',
                    path: '工程所在路径',
                    command: '启动工程脚本命令',
                    color: '标识颜色'
                }
            ]
        }
        Fs.writeFileSync('./micro.json', JSON.stringify(content, null, 2))
    }
}