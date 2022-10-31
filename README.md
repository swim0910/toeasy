# toeasy   至简后台管理系统

### 架构
```
|—— toeasy
    |—— vue.config.js               vue脚手架配置文件
    |—— package.json                系统依赖管理文件(package-lock.json统一系统依赖版本文件)
    |—— public                      启动页面静态文件管理
        |—— index.html              系统入口页面
    |—— src                         源代码库（管理包）
        |—— main.js                 项目入口文件--在运行或发布时会被webpack编译并自动注入index.html
        |—— pages/views             页面业务模块--.vue
        |—— router                  路由管理模块--.js
        |—— store                   状态管理模块--.js
        |—— style                   全局样式管理模块--.less/.sass/.scss/.sss
        |—— apis                    应用接口管理--请求后端的接口管理--.js
        |—— components              自定义组件管理--.vue
        |—— utils/handler           公共方法管理模块--.js
        |—— config                  系统常量管理--.conf.js
```