<template lang="html">
  <div class="chat-list">
    <div class="header">
      <button @click="leaveChat">退出登录</button>
      聊天列表
    </div>
    <div class="conntet-list">
      <div class="list-item" @click="joinChat">
        <div class="left">
          <img src="../assets/img/21.jpg" alt="">
        </div>
        <div class="right">
          <div class="r-t">群聊</div>
          <div class="r-b">......</div>
        </div>
      </div>
      <div class="list-item" v-for="(item, index) in currentPrivateList" :key="index" @click="joinPrivate(item)">
        <div class="left">
          <img :src="item.toImg" alt="">
        </div>
        <div class="right">
          <div class="r-t">{{item.to}}</div>
          <div class="r-b"></div>
        </div>
      </div>
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
    leaveChat () {
      sessionStorage.removeItem('username')
      this.$router.push({
        name: 'login'
      })
    },
    joinChat () {
      const data = {
        type: 'add',
        username: this.name,
        msg: '',
        img: sessionStorage.imgPath
      }
      this.socket.emit('joinGroup', data)
      this.socket.on('joinSuccess', (data) => {
        this.$router.push({
          name: 'chat'
        })
      })
    },
    joinPrivate (item) {
      this.$router.push({
        name: 'private',
        query: {
          id: item.to
        }
      })
    }
  },
  computed: {
    currentPrivateList () {
      return this.$store.state.chatlist
    }
  }
}
</script>

<style lang="scss">
@import'../styles/list.scss';
</style>
