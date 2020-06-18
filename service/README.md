# service



## QuickStart

<!-- add docs here for user -->

see [egg docs][egg] for more detail.

### Development

```bash
$ npm i
$ npm run dev
$ open http://localhost:7001/
```

### Deploy

```bash
$ npm start
$ npm stop
```

### npm scripts

- Use `npm run lint` to check code style.
- Use `npm test` to run unit test.
- Use `npm run autod` to auto detect dependencies upgrade, see [autod](https://www.npmjs.com/package/autod) for more detail.


[egg]: https://eggjs.org

##  目錄結構
.   app/router.js 用于配置 URL 路由规则
.   app/controller/** 用于解析用户的输入，处理后返回相应的结果
.   app/service/** 用于编写业务逻辑层，可选，建议使用
.   app/middleware/** 用于编写中间件，可选
.   app/public/** 用于放置静态资源，可选
.   app/extend/** 用于框架的扩展，可选
.   config/config.{env}.js 用于编写配置文件
.   config/plugin.js 用于配置需要加载的插件
.   app.js 和 agent.js 用于自定义启动时的初始化工作，可选

##  RESTFUL 接口
.   get-从服务端获取资源
.   post-在服务端新建一个资源
.   put-在服务端更新资源
.   delete-在服务端删除资源