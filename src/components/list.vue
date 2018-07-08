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
    </div>
    <h4 style="text-align:center;margin-top: 50px;">私聊正在开发中...</h4>
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
    leaveChat () {
      localStorage.removeItem('username')
      this.$router.push({
        name: 'login'
      })
    },
    joinChat () {
      const data = {
        type: 'add',
        username: this.name,
        msg: '',
        img: localStorage.imgPath
      }
      this.socket.emit('joinGroup', data)
      this.socket.on('joinSuccess', (data) => {
        this.$router.push({
          name: 'chat'
        })
      })
    }
  }
}
</script>

<style lang="scss">
.chat-list{
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
  position: relative;
  button{
    position: absolute;
    right: .2rem;
    top: 50%;
    margin-top: -10px;
    padding: 4px 10px;
    background-color: rgb(217, 217, 217);
    border-radius: 2px;
  }
}
.conntet-list{
  // height: 100%;
  border-bottom: 1px solid rgb(232, 232, 232);
  .list-item{
    display: flex;
    justify-content: flex-start;
    height: 1.1rem;
    padding: 2px;
  }
  .left{
    width: 1rem;
    padding: 5px;
    img{
      width: 100%;
      height: 100%;
    }
  }
  .right{
    font-size: 12px;
    padding: 5px 0;
    color: #666;
    .r-t{
      margin-bottom: 2px;
    }
    .r-b{
      color: #9e9e9e;
    }
  }
}
@media screen and (min-width: 500px) {
  .header{
    height: 50px;
    line-height: 50px;
  }
  .chat-list{
    border: 1px solid #eee;
  }
  .conntet-list {
    .list-item{
      height: 50px;
    }
    .left{
      width: 50px;
    }
  }
}
</style>
