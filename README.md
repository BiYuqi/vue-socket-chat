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
```js
// 进入server目录
// 已经加了防跨域机制，同网段，用ip可以访问，聊天
cd server
node app
```

## 注意
如果需要同网段，不同电脑聊天需要更改 main.js 文件
```js
Vue.prototype.socket = io('ws://localhost:9786')

// to your ip
Vue.prototype.socket = io('ws://192.168.31.223:9786')
```
