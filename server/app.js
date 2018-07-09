const express = require('express')
const socket = require('socket.io')
const app = express()
const server = require('http').createServer(app)
const io = socket(server)
const users = []

/* 保存个人用户信息 */
let userSocket = {}
let userInfo = {}
/*
 * CORS support.
 */
app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild')
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS')

  if (req.method === 'OPTIONS') {
    res.send(200)
  } else {
    next()
  }
})

io.on('connection', (socket) => {
  console.log('有人连接')
  /* 是否是新用户标识 */
  let isNewPerson = true
  /* 当前群聊登录用户 */
  let username
  /**
  * 初始化登录
  */
  socket.on('login', (data) => {
    for (var i = 0; i < users.length; i++) {
      if (users[i].username === data.username) {
        isNewPerson = false
        break
      } else {
        isNewPerson = true
      }
    }
    if (isNewPerson) {
      username = data.username
      users.push({
        username: data.username
      })
      /* 登录成功 */
      socket.emit('loginSuccess', data)
      /* **保留每个用户socket，实现私聊 */
      userSocket[data.username] = socket
      userInfo[data.username] = data.username
      /**************************************/
    } else {
      /* 登录失败 */
      socket.emit('loginFail', '')
    }
  })
  /**
  * 群聊
  */
  socket.on('joinGroup', function (data) {
    /* 登录成功 */
    socket.emit('joinSuccess', data)
    /* 向所有连接的客户端广播add事件 */
    io.sockets.emit('add', data)
  })
  /**
  * 断开连接
  */
  socket.on('disConnect', function (data) {
    /* 向所有连接的客户端广播leave事件 */
    console.log(data.username + 'leave room')
    io.sockets.emit('leave', data)
    users.map(function (val, index) {
      if (val.username === data.username) {
        users.splice(index, 1)
      }
    })
  })
  /**
  * 发送消息
  */
  socket.on('sendMessage', function (data) {
    if (!data.to) { // 群发
      sendAllMsg(data, io)
    } else { // 点对点
      data.msgType = 'private'
      sendUserMsg(data, userSocket)
    }
  })
})
/* ************************ */
function sendUserMsg (data, socket) { // 点对点聊天
  if (data.to in socket) {
    console.log('================')
    socket[data.to].emit('to' + data.to, data)
    socket[data.user].emit('to' + data.user, data)
    console.log('to' + data.to)
    console.log('to' + data.user)
  }
}
function sendAllMsg (data, io) { // 群发消息
  io.sockets.emit('receiveMessage', data)
}
server.listen(9786, () => {
  console.log('server is runing at 9786')
})
