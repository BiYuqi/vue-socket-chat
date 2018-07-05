const express = require('express')
const socket = require('socket.io')
const app = express()

const server = require('http').createServer(app)
const io = socket(server)
const users = []

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
  /* 当前登录用户 */
  let username
  /* 监听登录 */
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
      /* 向所有连接的客户端广播add事件 */
      io.sockets.emit('add', data)
    } else {
      /* 登录失败 */
      socket.emit('loginFail', '')
    }
  })

  socket.on('disconnect', function () {
    /* 向所有连接的客户端广播leave事件 */
    io.sockets.emit('leave', username)
    users.map(function (val, index) {
      if (val.username === username) {
        users.splice(index, 1)
      }
    })
  })

  socket.on('sendMessage', function (data) {
    io.sockets.emit('receiveMessage', data)
  })
})

server.listen(9786, () => {
  console.log('server is runing at 9786')
})
