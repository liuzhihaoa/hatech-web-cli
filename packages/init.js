const { program } = require('commander')
const { log } = require('./lib/utils')

program.version(require('../package.json').version)

program
  .command('create [name]')
  .description('根据类型创建项目')
  .option('-t, --type', '模板类型')
  .action(require('./commands/create'))
  .on('-h, --help', () => {
    log('使用 hatech create NAME -t=TYPE 进行初始化操作')
    log('NAME 名称 规则：hatech-web-类型-名称，例如：hatech-web-core 核心库，hatech-web-component-report report组件')
    log('TYPE 类型 规则：')
    log('   vueproject : vue项目')
    log('   component : 组件')
    log('   layout : 布局')
  })

program
  .command('template')
  .description('模板相关操作')
  .option('-ls', '列出所有模板', 'ls')
  .option('-add', '新增模板git', 'add')
  .helpOption('-h, --help', '显示帮助内容')
  .action(require('./commands/template'))
  .on('-h, --help', () => {
    log('使用hatech template -ls列出所有模板')
    log('使用hatech template -add新增模板git地址')
  })

program
.command('micro')
.description('微应用启动')
.option('-run', '启动微应用', 'run')
.option('-config', '创建配置文件', 'config')
.helpOption('-h, --help', '显示帮助内容')
.action(require('./commands/micro'))
.on('-h, --help', () => {
  log('使用hatech micro -run 运行micros.json文件')
})

program.parse(process.args)