<template>
  <div class="login">
    <div class="input-box">
      <input type="text" v-model="name" placeholder="请输入昵称"><br />
      <button @click="sendMessage">登录</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      name: ''
    }
  },
  methods: {
    sendMessage () {
      if (this.name) {
        this.socket.removeAllListeners()
        this.socket.emit('login', {username: this.name})
        /* 登录成功 */
        this.socket.on('loginSuccess', (data) => {
          this.$router.push({
            name: 'chat'
          })
          const num = Math.floor(Math.random() * 3 + 1)
          const img = require(`../assets/img/${num}.jpg`)
          localStorage.username = this.name
          localStorage.imgPath = img
        })
        /* 登录失败 */
        this.socket.on('loginFail', () => {
          alert('昵称重复')
        })
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.input-box{
  text-align: center;
  margin-top: 100px;
}
input{
  display: block;
  width: 200px;
  margin: 0 auto;
  border: 1px solid #999;
  height: 40px;
  line-height: 40px;
  outline: none;
  padding-left: 4px;
}
button {
  width: 200px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  background-color: green;
  color: #fff;
  outline: none;
  border: none;
};
</style>
