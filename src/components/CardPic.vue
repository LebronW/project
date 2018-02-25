<template>
  <div id="CardPic" class="main">
    <mt-header fixed class="index-header" title="照片验证">
      <router-link to="" slot="left" @click.native="history">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <div class="container">
      <form class="pic-form">
        <div class="group">
          <div class="item">
            <img src="../images/paishe_zm@2x.png" alt="">
            <input class="hide-input" type="file" accept="image/*;" capture="camera" @change='imgChange'/>
          </div>
          <div class="item">
            <img src="../images/img_paishe_zm@2x.png" alt="">
          </div>
        </div>
        <div class="group t20">
          <div class="item">
            <img src="../images/paishe_fm@2x.png" alt="">
          </div>
          <div class="item">
            <img src="../images/img_paishe_fm@2x.png" alt="">
          </div>
        </div>
        <div class="group t20">
          <div class="item">
            <img src="../images/paishe_sc@2x.png" alt="">
          </div>
          <div class="item">
            <img src="../images/img_paishe_sc@2x.png" alt="">
          </div>
        </div>
      </form>
    </div>
    <mt-button class="submit" @click="submit">提交</mt-button>
  </div>
</template>
<script>
  /* eslint-disable */
  import {Toast} from 'mint-ui'
  import {All} from './../api/api'
  import {getStore, setStore} from '../config/mUtils'
  export default {
    name: "CardPic",
    data() {
      return {}
    },
    mounted() {

    },
    methods: {
      history() {
        this.$router.go(-1);
      },
      submit() {
        let _this = this;
        setStore("idCardPIC", "1");
        _this.$router.go(-1);
      },
      imgChange(event) { // 上传图片

      }
    },
    components: {},
    computed: {},       // 计算属性是基于它们的依赖进行缓存的。计算属性只有在它的相关依赖发生改变时才会重新求值
    watch: {},
    filters: {}
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss">
  @import "../common/sass/Cyucb";

  #CardPic {
    .t20 {
      margin-top: rem(20rem);
    }
    .pic-form {
      padding: rem(30rem) rem(15rem);
      background: #ffffff;
      border-radius: rem(4rem);
      .group {
        display: -webkit-flex; /* Safari */
        display: flex;
        align-items: center;
        justify-content: center;

        .item {
          flex-grow: 1;
          text-align: center;
          position: relative;
          img {
            width: rem(158rem);
            height: rem(90rem);
          }
          .hide-input {
            opacity: 0;
            position: absolute;
            width: rem(158rem);
            height: rem(90rem);
            top: 0;
            left: 50%;
            margin-left: rem(-79rem);
          }
        }
      }
    }

  }
</style>
