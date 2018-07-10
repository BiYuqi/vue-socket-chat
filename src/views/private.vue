<template lang="html">
  <div class="chat">
    <div class="header">
      <button @click="leaveChat">返回</button>
      正在与{{ $route.query.id}}聊天
    </div>
    <div class="content" ref="ct">
      <div class="chat-box" v-for="(user, index) in serverList" :key="index">
        <div class="me" v-if="user.type === 'me'">
          <span class="mess-text">{{ user.msg }}</span>
          <span class="img-box">
            <img :src="user.img" alt="">
          </span>
        </div>
        <div class="other" v-if="user.type === 'other'">
          <span class="mess-text">{{ user.msg }}</span>
          <span class="img-box">
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
        img: sessionStorage.imgPath,
        to: this.$route.query.id,
        user: sessionStorage.username
      })
    },
    leaveChat () {
      this.$router.push({
        name: 'list'
      })
    }
  },
  created () {
    this.socket.removeAllListeners()
    /**
    * 接收私聊消息
    */
    const to = 'to' + sessionStorage.username
    this.socket.on(to, (data) => {
      console.log('消息也来了', data)
      // showMessage(data)
      if (data.msgType && data.msgType === 'private') {
        if (data.user === sessionStorage.username) {
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
      }
      /**
      * 自动上浮文字
      */
      setTimeout(() => {
        const chatItemList = Array.from(document.querySelectorAll('.chat-box'))
        chatItemList[chatItemList.length - 1].scrollIntoView({block: 'end', behavior: 'smooth'})
      }, 50)
      this.message = ''
    })
  }
}
</script>

<style lang="scss">
@import'../styles/private.scss';
</style>
