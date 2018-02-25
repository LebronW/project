<template>
  <div id="CpayAuthStatus" class="main">
    <mt-header fixed class="index-header" :title="status.payStatus">
      <router-link to="" slot="left" @click.native="history">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <div class="tp">
      <img src="../images/img_xyrz@2x.png" alt="">
    </div>
    <div class="con">
      <section class="c c_success">
        <img :src="status.src" alt="">
        <h2 :class="{'hong': status.payStatus == '支付失败'}">{{status.info}}</h2>
      </section>
    </div>
    <mt-button class="submit back-btn" @click="back" v-show="status.payStatus == '支付失败'">返回</mt-button>
    <mt-button class="submit ca-btn" @click="submitBtn(status.btnTitle)">{{status.btnTitle}}</mt-button>
  </div>
</template>
<script>
  export default {
    name: "CpayAuthStatus",
    data() {
      return {
        status: statusL[0]
      }
    },
    mounted() {
    },
    methods: {
      history() {
        this.$router.go(-1);
      },
      submitBtn(str) {
        let that = this;
        switch (str) {
          case "进入认证":
            that.$router.push({path: '/CauthReport'});
            break;
          case "重新支付":

            break;
        }
      },
      back() {
        this.$router.push({path: '/CcreditAuth'})
      }
    },
    components: {},
    computed: {},       // 计算属性是基于它们的依赖进行缓存的。计算属性只有在它的相关依赖发生改变时才会重新求值
    watch: {},
    filters: {}
  }
  var statusL = [
    {
      payStatus: '支付成功',
      btnTitle: '进入认证',
      src: require('../images/img_bluecha@2x.png'),
      info: '已成功支付15元'
    },
    {
      payStatus: '支付失败',
      btnTitle: '重新支付',
      src: require('../images/icon_hcha@2x.png'),
      info: '支付失败'
    }
  ]
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss">
  @import "../common/sass/Cyucb";

  #CpayAuthStatus {
    .tp {
      margin-top: 0.8rem;
      img {
        width: 100%;
        height: rem(128rem);
      }
    }
    .con {
      padding: 0 rem(6rem);
      margin-top: rem(-4rem);
      .c {
        width: 100%;
        height: rem(235rem);
        background: #ffffff;
        text-align: center;
      }
      .c_success {
        color: #1b9dff;
        img {
          width: rem(70rem);
          height: rem(70rem);
          margin: rem(65rem) auto rem(15rem) auto;
        }
        h2 {
          font-size: rem(18rem);
        }
      }
      .hong {
        color: #ff4400 !important;
      }
    }
    .ca-btn {
      bottom: rem(20rem);
      width: 97.4% !important;
      left: 1.3%;
      box-shadow: none;
      border-radius: rem(4rem);
    }
    .back-btn{
      bottom: rem(85rem);
      width: 97.4% !important;
      left: 1.3%;
      background: #ffffff;
      color: #888;
      border: rem(1rem) solid transparent;
      box-shadow: none;
      border-radius: rem(4rem);
    }
  }
</style>
