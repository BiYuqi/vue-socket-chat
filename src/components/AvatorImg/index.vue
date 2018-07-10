<template lang="html">
  <div class="img-photo">
    <span
      v-for="(img, index) in imgs"
      :key="img.src"
      :class="{active: index === curentIndex}"
      @click="checkImg(img.src, index)">
      <img :src="img.src" alt="">
    </span>
  </div>
</template>

<script>
export default {
  data () {
    return {
      imgs: [],
      curentIndex: 0
    }
  },
  methods: {
    checkImg (img, index) {
      sessionStorage.imgPath = img
      this.curentIndex = index
    }
  },
  created () {
    for (let i = 4; i < 27; i++) {
      this.imgs.push({
        src: require(`../../assets/img/${i}.jpg`)
      })
    }
  }
}
</script>

<style>
.img-photo{
  text-align: left;
}
.img-photo span{
  display: inline-block;
  width: 40px;
  height: 40px;
  cursor: pointer;
  margin-right: 4px;
}
.img-photo span.active{
  border: 2px solid #c33;
}
.img-photo img{
  width: 100%;
  height: 100%;
}
</style>
