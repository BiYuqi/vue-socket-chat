<template lang="html">
  <div class="chat">
    <div class="header">
      <button @click="leaveChat">离开</button>
      多人聊天室
    </div>
    <div class="content" ref="ct">
      <div class="chat-box" v-for="(user, index) in serverList" :key="index">
        <div class="add" v-if="user.type === 'add'">
          <span style="color: blue;">{{user.username}}</span> 加入群聊
        </div>
        <div class="add" v-if="user.type === 'leave'">
          <span style="color: blue;">{{user.username}}</span> 离开群聊
        </div>
        <div class="me" v-if="user.type === 'me'">
          <span class="mess-text">{{ user.msg }}</span>
          <span class="img-box">
            <img :src="user.img" alt="">
          </span>
        </div>
        <div class="other" v-if="user.type === 'other'">
          <span class="mess-text">{{ user.msg }}</span>
          <span class="img-box" @click="privateChat(user)">
            <img :src="user.img" alt="">
          </span>
        </div>
      </div>
    </div>
    <div class="footer">
      <input type="text" v-model="message" placeholder="请输入聊天内容...">
      <button @click="sendMessage">发送</button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      message: '',
      serverList: [],
      name: sessionStorage.username
    }
  },
  methods: {
    sendMessage () {
      if (!this.message) return
      this.socket.emit('sendMessage', {
        username: this.name,
        message: this.message,
        img: sessionStorage.imgPath
      })
    },
    leaveChat () {
      console.log(this.name + 'leave room')
      this.socket.emit('disConnect', {
        username: this.name,
        img: sessionStorage.imgPath
      })
    },
    privateChat (user) {
      const obj = {
        to: user.username,
        user: sessionStorage.username,
        toImg: user.img,
        userImg: sessionStorage.imgPath
      }
      this.$store.commit('setChatList', obj)
      this.$router.push({
        name: 'private',
        query: {
          id: obj.to
        }
      })
    }
  },
  created () {
    this.socket.removeAllListeners()
    /**
    * 新加入群聊
    */
    this.socket.on('add', (data) => {
      // 过滤用户为自己时消息提示
      if (sessionStorage.username !== data.username) {
        this.serverList.push({
          type: 'add',
          username: data.username,
          msg: '',
          img: data.img
        })
      }
    })
    /**
    * 用户离开群聊
    */
    this.socket.on('leave', (data) => {
      if (sessionStorage.username !== data.username) {
        this.serverList.push({
          type: 'leave',
          username: data.username,
          msg: '',
          img: data.img
        })
      }
      // leaveChat
      this.$router.push({
        name: 'list'
      })
    })
    /**
    * 接收群聊消息
    */
    this.socket.on('receiveMessage', (data) => {
      // showMessage(data)
      if (this.name === data.username) {
        this.serverList.push({
          type: 'me',
          username: data.username,
          msg: data.message,
          img: data.img
        })
      } else {
        this.serverList.push({
          type: 'other',
          username: data.username,
          msg: data.message,
          img: data.img
        })
      }
      setTimeout(() => {
        const chatItemList = Array.from(document.querySelectorAll('.chat-box'))
        chatItemList[chatItemList.length - 1].scrollIntoView({block: 'end', behavior: 'smooth'})
      })
      this.message = ''
    })
  }
}
</script>

<style lang="scss">
@import'../styles/chat.scss';
</style>
