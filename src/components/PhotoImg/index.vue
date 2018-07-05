<template lang="html">
  <div class="img-photo">
    <span v-for="img in imgs" :key="img.src">
      <img :src="img.src" alt="">
    </span>
  </div>
</template>

<script>
export default {
  data () {
    return {
      imgs: []
    }
  },
  created () {
    for (let i = 4; i < 27; i++) {
      this.imgs.push({
        src: require(`../../assets/img/${i}.jpg`)
      })
    }
    console.log(this.imgs)
  }
}
</script>

<style lang="scss">
.img-photo span{
  display: inline-block;
  width: 40px;
  height: 40px;
}
.img-photo img{
  width: 100%;
  height: 100%;
}
</style>
