# react-player-music-PC
基于React全家桶开发的PC端音乐播放器
>API来源:一个开源的node.js项目：[网易云音乐 NodeJS 版 API](https://binaryify.github.io/NeteaseCloudMusicApi)

> [在线演示地址](http://119.23.17.221:4000/)

## 适合者
```
该项目是PC端的,只适用于PC端，不适用于移动端，本项目适用于于刚将全家桶了解得差不多,想动手实战的react提高技术的人,因为本项目中采用很多不同的方法去编写不同的组件,
采用不同的方法编写相类似的组件,同时能让你更快的上手react全家桶及其相关的技术
```
## 已经更新
```
1.恢复了邮箱登录的功能,添加了短信验证的部分功能
2.更新了接口文档,拓展了一些功能
3.对项目进行性能优化,详细请看性能优化项更新.md文件
4.登录账号密码为你真正的网易云账号密码(包括手机号码,邮箱)
```
##
## 近期更新
```
1.继续完善功能
2.数据展示,数据可视化
```
##
```
特别提示:如果遇到报错：Error in Cannot find module node-sass错误,是node-sass没有安装成功
要单独安装node-sass ： npm install node-sass@latest
如果上述命令还安装失败,那么就只能切换淘宝镜像:
如果还没安装淘宝镜像可以参考以下命令:npm install -g cnpm --registry=https://registry.npm.taobao.org(安装就可以跳过)
执行 cnpm install node-sass@latest 就能安装node-sass成功,项目就能正常跑起来
如还有什么问题,请联系我
```

## 如何安装与使用

```
(在git bash中运行一下命令,用以下载整个项目):
git clone https://github.com/jiudehuiyi/react-player-music-PC.git //下载react-player-music-PC

开启另外一个命令行(根据不同的系统,开启不一样,例:window系统:在当前项目文件夹打开cmd)
cd react-player-music-PC //进入react-music播放器目录

npm install //安装依赖

npm run start //运行在浏览器上,这里采用4000端口

npm run build  //项目打包
```

```
运行的第二个命令行窗口:后台服务器(数据接口)
cd react-player-music-PC //进入后台服务器目录
cd server
npm install //安装依赖
node app.js //服务端运行,访问http://localhost:3000/


```
#### 如果运行失败请检查上述步骤
#### common/config.js 的 url 地址要和后台服务器地址一致

## 技术栈
-  React ^16.3.1 (核心框架)
-  React-Router-dom ^4.2.2(页面路由)
-  Redux ^4.0.0(状态管理)
-  React-redux ^5.0.7(react，redux联系库)
-  Redux-Thunk ^2.3.0(异步中间件)
-  antd ^3.15.0(阿里的React UI库)
-  ES6/ES7(Javascript语言的下一代标准)
-  Sass(css 预处理器)
-  Axios ^0.18.0(数据请求)
-  classnames ^2.2.5(动态处理classname)
-  emoji-mart ^2.11.0(emoji处理库)
-  react-sound ^1.2.0(音乐处理库)
-  webpack 3.8.1(打包工具)

## 功能说明
-  因为这是参考网易云音乐的界面和API接口的,所以功能基本上与网易云的一样,除了一些文档中没有接口的,如果你想使用最新的API接口(文档作者在维护,接口在更     新,所以这个项目不能保证是最新版的接口,在编写此项目的时候,文档接口是最新版的),请从上面的链接进入,更新你的server目录
## 基本功能
-  实现各个页面中的跳转,数据的请求,及其相应页面的数据渲染
-  搜索
-  登录(接口只提供的手机登录和邮箱登录,是短信登录的部分功能)
-  播放音乐(实现的数据持久化,利用reducer,Cookie,storage进行数据的持久化)
-  详细的功能请进入 [在线演示地址](http://119.23.17.221:4000/)进行查看
### 项目说明
```
由于此项目写得有点急,有点快,大概写了一个月左右,所以有一些细微细节或者小bug在所难免(可以提issue或者在下方提供的联系方式联系我)
```
### 项目总结
```
整体项目实现了一个功能没网易云的全面的音乐播放器,个别功能,微小细节还没够完善(比如数据没有加载完毕,有一些页面是没有占位符的),性能还没有进行优化,
在接下来的时间,将会对项目的微小细节,功能,性能进行全面的调整,如果觉得还不错,请给一个Star,你的Star就是我写项目的动力
```
##### Tip
```
在npm install or yarn install 的时候，请确保网络良好，如个别依赖安装不了，请设置淘宝镜像为安装源；
如果有什么问题可以提issue,也可以加qq
qq:136859304
```

## License

[MIT](https://github.com/maomao1996/react-music/blob/master/LICENSE)
