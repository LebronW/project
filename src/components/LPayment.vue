<template>
  <section class="LPayment">
    <div class="LIdentityHead">
      <img src="../images/fauhuibaise.png@2x.png" @click='history'/>
      <span v-show='LPayment == 1'>支付成功</span>
      <span v-show='LPayment == 2'>支付失败</span>
    </div>
    <div v-show='LPayment == 1' class="paymentSuccess">
      <div class="top">
        <img src="../images/img_bluecha@2x.png"/>
        <span>支付成功</span>
      </div>
      <div class="bottom">
        <span style="display: none"></span>
        <span @click="clickOK">完成</span>
      </div>
    </div>
    <div v-show='LPayment == 2' class="paymentFail">
      <div class="top">
        <img src="../images/icon_hcha@2x.png"/>
        <span>支付失败</span>
      </div>
      <div class="bottom">
        <span style="display: none"></span>
        <span @click="clickFail">重新支付</span>
      </div>
    </div>
  </section>
</template>
<script>
  /* eslint-disable */
  import {getStore} from '../config/mUtils'
  export default {
    data () {
      return {
        LPayment: 1 // 支付成功/失败
      }
    },
    methods: {
      history() { // 后退
        this.$router.push({path: '/mine'})
      },
      clickOK() {
        let payFrom = sessionStorage.getItem("payFrom");
        if (!payFrom) payFrom = '/mine';
        this.$router.push({path: payFrom});
        sessionStorage.removeItem("payFrom");
      },
      clickFail() {
        let payFrom = sessionStorage.getItem("payFrom");
        if (payFrom == "/mine") {
          this.$router.push({path: "/Cpaycoup"})
        } else if (payFrom == "/CauthReport") {
          this.$router.push({path: '/CcreditAuth'})
        } else {
          this.$router.push({path: '/mine'})
        }
        sessionStorage.removeItem("payFrom");
      }
    },
    mounted() {
      let payStatus = this.$route.query.status;
      this.LPayment = payStatus == "1" ? 1 : 2;
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  .LPayment {
    flex: 1;
    z-index: 11;
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: #f3f5f8;

    .LIdentityHead {
      position: relative;
      height: 0.8rem;
      line-height: 0.8rem;
      background: #1b9dff;
      width: 100%;

      img:nth-child(1) {
        width: 0.15rem;
        margin-left: 0.2rem;
        vertical-align: middle;
      }
      span:nth-child(2) {
        vertical-align: middle;
        font-size: 0.279rem;
        color: white;
        display: inline-block;
        width: 90%;
        text-align: center;
      }
      span:nth-child(3) {
        vertical-align: middle;
        font-size: 0.279rem;
        color: white;
        display: inline-block;
        width: 90%;
        text-align: center;
      }
    }
    /*支付成功*/
    .paymentSuccess {
      width: 96%;
      margin-left: 2%;
      .top {
        width: 100%;
        height: (210rem/64.687);
        margin-top: (10rem/64.687);
        text-align: center;
        border-radius: 0.05rem;
        background: white;

        img {
          width: (70rem/64.687);
          margin-top: (30rem/64.687);
        }
        span {
          display: inline-block;
          width: 100%;
          text-align: center;
          margin-top: (20rem/64.687);
          color: #1b9dff;
          font-size: (18rem/64.687);
        }
      }
      .bottom {
        width: 96%;
        text-align: center;
        position: absolute;
        bottom: 0;

        span {
          display: inline-block;
          width: 100%;

        }
        span {
          width: 100%;
          height: (44rem/64.687);
          border-radius: 0.05rem;
          line-height: (44rem/64.687);
          margin-bottom: (20rem/64.687);
          font-size: (16rem/64.687);
        }
        span:nth-child(1) {
          background: white;
          color: rgb(136, 136, 136);
        }
        span:nth-child(2) {
          background: #1b9dff;
          color: white;
        }
      }
    }
    .paymentFail {
      width: 96%;
      margin-left: 2%;
      .top {
        width: 100%;
        height: (210rem/64.687);
        margin-top: (10rem/64.687);
        text-align: center;
        border-radius: 0.05rem;
        background: white;

        img {
          width: (70rem/64.687);
          margin-top: (30rem/64.687);
        }
        span {
          display: inline-block;
          width: 100%;
          text-align: center;
          margin-top: (20rem/64.687);
          color: #ff4400;
          font-size: (18rem/64.687);
        }
      }
      .bottom {
        width: 96%;
        text-align: center;
        position: absolute;
        bottom: 0;

        span {
          display: inline-block;
          width: 100%;

        }
        span {
          width: 100%;
          height: (44rem/64.687);
          border-radius: 0.05rem;
          line-height: (44rem/64.687);
          margin-bottom: (20rem/64.687);
          font-size: (16rem/64.687);
        }
        span:nth-child(1) {
          background: white;
          color: rgb(136, 136, 136);
        }
        span:nth-child(2) {
          background: #1b9dff;
          color: white;
        }
      }
    }
  }

</style>
