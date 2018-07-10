<template>
  <div class="login">
    <div class="input-box">
      <h2>多人聊天系统登录</h2>
      <input type="text" v-model="name" placeholder="请输入昵称">
      <button @click="loginBtn">登录</button>
      <img-list></img-list>
    </div>
  </div>
</template>

<script>
import ImgList from '@/components/AvatorImg/index.vue'
export default {
  name: 'login',
  data () {
    return {
      name: ''
    }
  },
  methods: {
    loginBtn () {
      if (this.name) {
        sessionStorage.username = this.name
        this.socket.removeAllListeners()
        this.socket.emit('login', {username: this.name})
        /* 登录成功 */
        this.socket.on('loginSuccess', (data) => {
          // 如果未选择头像 则随机头像
          const num = Math.floor(Math.random() * 25 + 1)
          const img = require(`../assets/img/${num}.jpg`)
          if (!sessionStorage.imgPath) {
            sessionStorage.imgPath = img
          }
          this.$router.push({
            name: 'list'
          })
        })
        /* 登录失败 */
        this.socket.on('loginFail', () => {
          alert('用户名已被占用,请重新选择昵称')
        })
      }
    }
  },
  components: {
    ImgList
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import'../styles/login.scss';
</style>
