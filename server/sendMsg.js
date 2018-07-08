module.exports = {
  sendUserMsg: function (data, socket) { // 点对点聊天
    if (data.to in socket) {
      console.log('================')
      console.log('to' + data.to, data)
      socket[data.to].emit('to' + data.to, data)
      socket[data.user].emit('to' + data.user, data)
      console.log('================')
    }
  },
  sendAllMsg: function (data, io) { // 群发消息
    io.sockets.emit('receiveMessage', data)
  }
}
