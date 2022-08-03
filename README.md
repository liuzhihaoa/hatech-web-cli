# @hatech/cli

同创CLI工具,提供项目模板快速创建,模板管理,微应用运行等功能


### 安装方法
```shell
    npm install @hatech/cli -g
```
### 使用方法

```shell
    // 创建项目
    hatech create
    // 模板管理
    hatech template
    // 微应用
    hatech micro
```

### 项目

#### hatech create, 创建项目

根据提示选择要创建项目即可 
### 模板

#### hatech template, 模板管理

* -ls 列出所有模板

```
    hatech template -ls
```

* -add 增加模板

```
    hatech template -add
```

### 微应用

#### hatech micro, 微应用操作

* -run 根据micro.json启动微应用

```
    hatech micro -run
```

* -config 创建micro.json配置文件

```
    hatech micro -config
```