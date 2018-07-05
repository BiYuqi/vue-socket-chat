<template lang="html">
  <div class="chat">
    <div class="header">多人聊天室</div>
    <div class="content" ref="ct">
      <div class="box" v-for="(user, index) in serverList" :key="index">
        <div class="add" v-if="user.type === 'add'">
          <span style="color: blue;">{{user.name}}</span> 加入群聊
        </div>
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
      name: localStorage.username
    }
  },
  methods: {
    sendMessage () {
      if (!this.message) return
      this.socket.emit('sendMessage', {
        username: this.name,
        message: this.message,
        img: localStorage.imgPath
      })
    }
  },
  created () {
    this.socket.removeAllListeners()
    this.socket.on('add', (data) => {
      this.serverList.push({
        type: 'add',
        name: data.username,
        msg: '',
        img: data.img
      })
    })
    this.socket.on('receiveMessage', (data) => {
      // showMessage(data)
      if (this.name === data.username) {
        this.serverList.push({
          type: 'me',
          name: data.username,
          msg: data.message,
          img: data.img
        })
      } else {
        this.serverList.push({
          type: 'other',
          name: data.username,
          msg: data.message,
          img: data.img
        })
      }
      this.$refs.ct.scrollTop = this.$refs.ct.scrollHeight + 20
      this.message = ''
    })
  }
}
</script>

<style lang="css">
.chat{
  position: relative;
  height: 100%;
  max-width: 500px;
  margin: 0 auto;
}
.header{
  width: 100%;
  height: 1rem;
  line-height: 1rem;
  text-align: center;
  background-color: rgb(97, 96, 96);
  color: #fff;
  font-size: 16px;
}
.content{
  position: absolute;
  top: 1rem;
  left: 0;
  width: 100%;
  bottom: 50px;
  overflow-x: hidden;
  overflow-y: auto;
  background-color: #eee;
  padding: 0 4px;
}
.content::-webkit-scrollbar{
  width: 0;
}
.footer{
  position: absolute;
  bottom: 0;
  left: 0;
  height: 1rem;
  width: 100%;
  display: flex;
}
input{
  display: inline-block;
  margin: 0 auto;
  border: none;
  height: 1rem;
  outline: none;
  width: 80%;
  padding-left: 4px;
  flex-shrink: 0;
}
button {
  height: 1rem;
  width: 19%;
  text-align: center;
  background-color: green;
  color: #fff;
  outline: none;
  border: none;
  flex-shrink: 0;
  cursor: pointer;
}
.add{
  font-size: 12px;
  text-align: center;
  margin: 6px 0;
}
.me{
  position: relative;
  text-align: right;
  padding-right: 40px;
  margin: 15px 0;
}
.img-box{
  width: 35px;
  height: 35px;
  text-align: center;
  line-height: 35px;
  border-radius: 50%;
  display: block;
  position: absolute;
  top: -4px;
  right: 0;
  padding-right: 3px;
}
.img-box img{
  width: 100%;
  height: 100%;
}
.mess-text{
  display: inline-block;
  max-width: 70%;
  padding: 6px;
  color: #fff;
  border-radius: 4px;
  font-size: 13px;
  text-align: left;
}
.me .mess-text{
  background-color: rgb(76, 183, 86);
}
.other {
  position: relative;
  padding-left: 40px;
  margin: 15px 0;
}
.other .img-box{
  position: absolute;
  left: 0;
  top: -4px;
}
.other .mess-text{
  background-color: #fff;
  color: #666;
  border-radius: 4px;
}
@media screen and (min-width: 500px) {
  .header{
    height: 50px;
    line-height: 50px;
  }
  .content{
    top: 50px;
  }
  .footer{
    height: 50px;
  }
  .footer input, .footer button{
    height: 50px;
    font-size: 16px;
  }
}
</style>
