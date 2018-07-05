<template>
  <div class="login">
    <div class="input-box">
      <h2>多人聊天系统登录</h2>
      <input type="text" v-model="name" placeholder="请输入昵称">
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
.login{
  position: relative;
  height: 100%;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
}
.input-box{
  text-align: center;
  position: absolute;
  top: 20%;
  left: 50%;
  transform: translate(-50%, -50%);
}
h2{
  margin-bottom: .3rem;
}
input{
  display: block;
  width: 4rem;
  margin: 0 auto;
  height: .6rem;
  line-height: .6rem;
  outline: none;
  padding-left: 4px;
  margin-bottom: .3rem;
  font-size: 14px;
  border: 1px solid #999;
}
button {
  width: 4rem;
  height: .5rem;
  line-height: .5rem;
  text-align: center;
  background-color: green;
  color: #fff;
  outline: none;
  border: none;
  cursor: pointer;
}
@media screen and (min-width: 500px) {
  input, button{
    width: 300px;
    height: 40px;
    line-height: 40px;
  }
  .login{
    border: 1px solid #d2d2d2;
  }
}
</style>
