## vue-chat-socket
> 基于vue2.x node socket.io 搭建的多人聊天室

## how to use
```js
git clone https://github.com/BiYuqi/vue-socket-chat.git

cd vue-socket-chat

npm install

npm run dev
```

## server
1.本地开发必须启动node服务
```js
// 进入server目录
// 已经加了防跨域机制，同网段，用ip可以访问，聊天
cd server
node app
```
2.建议全局安装supervisor,node代码可自动热更
```js
npm install supervisor -g

cd serder
supervisor app
```
## Plan
#### server
- [x] 服务端单一群聊开发完毕
- [x] 服务端点对点群聊开发完毕(未测试，因为前台页面未完毕)
#### 前端
- [x] 群聊功能已实现
- [x] 聊天列表开发完毕
- [x] 私聊开发完毕
- [ ] 优化组件，提取公用模块

## 注意
* 如果需要同网段，不同电脑聊天需要更改 main.js 文件
* 目前只能从群聊入口进行私聊
* 没有缓存，没有聊天记录，阅后即焚哦😯
* 聊天过程尽量不要刷新页面，以免影响私聊功能

```js
Vue.prototype.socket = io('ws://localhost:9786')

// write your ip 改为你的ip
Vue.prototype.socket = io('ws://xxx.xxx.xxx.xxx:9786')
```

## 预览
#### 登录
![](http://oq4hkch8e.bkt.clouddn.com/chat1.png)
#### 聊天列表
![](http://oq4hkch8e.bkt.clouddn.com/list.png)
#### 群聊
![](http://oq4hkch8e.bkt.clouddn.com/qunliao.png)
#### 私聊
![](http://oq4hkch8e.bkt.clouddn.com/private.png)
![](http://oq4hkch8e.bkt.clouddn.com/private2.png)
