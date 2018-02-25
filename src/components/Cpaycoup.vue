<template>
  <div id="Cpaycoup" class="main">
    <mt-header fixed class="index-header" title="充值点券">
      <router-link to="" slot="left" @click.native="history">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <div class="container">
      <div class="filed">
        <mt-field label="充值点券数" :placeholder="`${stampsNum}起充`" v-model="money"></mt-field>
      </div>
      <div class="clearfix t15">
        <div class="fs pull-left">
          <!--<input id="checkbox" type="checkbox" class="is-read" v-model="ca_checkbox"/><label-->
          <!--for="checkbox"></label>同意 <a-->
          <!--href="" style="color: #1b9dff">《购买服务协议》</a>-->
        </div>
        <div class="fs pull-right">
          点券售价{{stampsUnit}}元/点
        </div>
      </div>
    </div>
    <mt-button class="submit" @click="cz" v-show="isShow" :disabled="btnDis">充值</mt-button>
    <mt-button class="submit" @click="clickOkPay" v-show="isOkPay">已完成付款</mt-button>
    <mt-popup class="c-pop" v-model="pay_pop" popup-transition="popup-fade" position="bottom">
      <div class="head">
        <div></div>
        <div><h2>支付详情</h2></div>
        <div @click="pay_pop = false">
          <img src="../images/backoff.png" alt="">
        </div>
      </div>
      <div>
        <mt-cell title="支付金额" :value="parseFloat(money) * parseFloat(stampsUnit)"></mt-cell>
          <a class="mint-cell">
            <div class="mint-cell-left"></div>
            <div class="mint-cell-wrapper">
              <div class="mint-cell-title">
                <span class="mint-cell-text">支付方式</span>
              </div>
              <div class="mint-cell-value">
                <span class="zffs" :class="{active: chcFS == 'yhk'}" @click="chcFS = 'yhk'">银行卡</span>
                <!--<span class="zffs" :class="{active: chcFS == 'wx'}" @click="chcFS = 'wx'">微信</span>-->
                <span class="zffs" :class="{active: chcFS == 'zfb'}" @click="chcFS = 'zfb'" v-show="!isWechat">支付宝</span>
              </div>
            </div>
            <div class="mint-cell-right"></div>
          </a>
        <mt-button class="payok" @click="next">确认支付</mt-button>
      </div>
    </mt-popup>
    <!--<form :action="inputAction" method="post" id="zfForm">-->
    <!--<input v-model="item.name2" :name='item.name1' v-for="item in inputList" type="hidden"/>-->
    <!--<input type="submit" value="提交" style="display: none"/>-->
    <!--</form>-->
    <form :action="LLpay.url" id="zfForm">
      <input name="req_data" v-model="LLpay.value" type="hidden"/>
      <input type="submit" value="提交" style="display: none"/>
    </form>
  </div>
</template>
<script>
  /* eslint-disable */
  import {Toast} from 'mint-ui'
  import {payPost, All, callbackURL} from './../api/api'
  import {getStore} from '../config/mUtils'
  export default {
    name: "Cpaycoup",
    data() {
      return {
        money: '',
//        ca_checkbox: false,
        isShow: true,
        stampsNum: getStore("stampsNum"),
        stampsUnit: getStore("stampsUnit"),
        inputAction: '',
        inputList: [],
        pay_pop: false,
        chcFS: "yhk",
        isWechat: false,
        isOkPay: false,
        LLpay: {
          url: "",
          value: ""
        }
      }
    },
    mounted() {
      let self = this;
      /**
       *  有弹出输入框的时候，隐藏提交按钮
       */
      let winHeight = document.documentElement.clientHeight;
      window.onresize = function () {
        let thisHeight = document.documentElement.clientHeight;
        self.isShow = winHeight - thisHeight <= 50;
      };
//
      let u = navigator.userAgent;
      let useragent = u.toLowerCase(); // 获取判断用的对象
      let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
      let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      if (useragent.match(/MicroMessenger/i) == 'micromessenger' || (useragent.indexOf("qq") > -1 && isiOS) || (useragent.indexOf("mobile mqqbrowser") > -1 && isAndroid)) self.isWechat = true;
    },
    methods: {
      history() {
        this.$router.go(-1);
      },
      cz() {
        let this_ = this;
        this_.$store.dispatch('showLoading');
        let db = parseFloat(this_.money) - parseFloat(this_.stampsNum);
        if (db < 0) return Toast({message: `请输入大于${this_.stampsUnit}的值`, position: 'bottom', duration: 1500});
        this_.pay_pop = true;
        if (this_.chcFS == "yhk") {
          // =====================连连支付
          let req = {
            funCode: 130004,
            payWay: "3",     // 支付方式 1支付宝 2微信 3连连支付 0商盟银行卡
            payMoney: "0.01",    // 测试支付金额（单位：元）
//            payMoney: toDecimal2(parseFloat(this_.money) * parseFloat(this_.stampsUnit)),    // 支付金额（单位：元）
            payType: "2",     // 支付类型（1.消费金额认证 2.充值点券）
            returnUrl: "",
            stampsNum: this_.money,
            softType: 'h5_qyq3_v1.0'
          };
          payPost(req).then(res => {
            this_.$store.dispatch('hideLoading');
            if (res.retCode == "7777") {
              window.localStorage.clear();
              window.location.href = callbackURL('login');
              return;
            }
            if (res.retCode != "0000") {
              Toast({message: res.retMsg, position: 'bottom', duration: 1500});
              return;
            }
            let result = res.retData;
            for (let key in result) {
              if (key == "req_url") {
                this_.LLpay.url = result["req_url"];
                delete result.req_url;
              }
            }
            this_.LLpay.value = JSON.stringify(result);
//            this_.LLpay.url = "https://wap.lianlianpay.com/payment.htm";
          })
          // =====================END

//            ==================================商盟充值
//          let p1 = {
//            funCode: 130004,
//            payWay: "0",     // 支付方式 1支付宝 2微信 0其他（连连）
////          payMoney: "0.01",    // 测试支付金额（单位：元）
//            payMoney: toDecimal2(parseFloat(this_.money) * parseFloat(this_.stampsUnit)),    // 支付金额（单位：元）
//            payType: "2",     // 支付类型（1.消费金额认证 2.充值点券）
//            returnUrlType: "2",    // 1、认证报告 2、我的 3、信用报告 4、通讯录
//            stampsNum: this_.money
//          };
//          payPost(p1).then(res => {
//            this_.$store.dispatch('hideLoading');
//            if (res.retCode == "7777") {
//              window.localStorage.clear();
//              window.location.href = callbackURL('login');
//              return;
//            }
//            if (res.retCode != "0000") return Toast({message: res.retMsg, position: 'bottom', duration: 1500});
//            let result = res.retData;
//            for (let key in result) {
//              if (key != "url") {
//                let obj = {
//                  name1: key,
//                  name2: result[key]
//                };
//                this_.inputList.push(obj);
//              } else {
//                this_.inputAction = result[key];
//              }
//            }
//          });
//        ==================================END
        } else this_.$store.dispatch('hideLoading');
      },
      next() {
        let this_ = this;
        this_.$store.dispatch('showLoading');
        switch (this_.chcFS) {
          case "yhk":
            this_.pay_pop = false;
            this_.$store.dispatch('hideLoading');
            if (!this_.LLpay.url) return "支付异常，请刷新重试";
            sessionStorage.setItem("payFrom", 'mine');
            document.getElementById("zfForm").submit();
            break;
          case "zfb":
            let p = {
              funCode: 130004,
              payWay: "1",     // 支付方式 1支付宝 2微信 0其他（连连）
//              payMoney: "0.01",    // 测试支付金额（单位：元）
              payMoney: toDecimal2(parseFloat(this_.money) * parseFloat(this_.stampsUnit)),    // 支付金额（单位：元）
              payType: "2",     // 支付类型（1.消费金额认证 2.充值点券）
//                returnUrlType: "2",    // 1、认证报告 2、我的 3、信用报告 4、通讯录
              stampsNum: this_.money
            };
            payPost(p).then(res => {
              this_.pay_pop = false;
              this_.$store.dispatch('hideLoading');
              if (res.retCode == "7777") {
                window.localStorage.clear();
                window.location.href = callbackURL('login');
                return;
              }
              if (res.retCode == "0000" && res.retData && res.retData.codeUrl) {
                window.localStorage.setItem("zhifubaoOrder", res.retData.outTradeNo);
                window.localStorage.setItem("payFrom", "/mine");
                this_.isOkPay = true;
                window.location.href = res.retData.codeUrl;
              }
              else Toast({message: res.retMsg, position: 'bottom', duration: 1500});
            });
            break;
        }
      },
      clickOkPay() {
        let this_ = this;
        let zfb = window.localStorage.getItem("zhifubaoOrder");
        if (zfb) {
          this_.$store.dispatch('showLoading');
          All({outTradeNo: zfb, funCode: 130006}).then(res => {
            this_.$store.dispatch('hideLoading');
            window.localStorage.removeItem("zhifubaoOrder");
            if (res.retCode == "0000" && res.retData) {
              let payStatus = res.retData.payStatus;
              if (payStatus == "1" || payStatus == "2" || payStatus == "3") {
                this_.$router.push({
                  path: '/LPayment',
                  query: {payStatus: payStatus}
                });
              }
            }
          })
        } else {
          this_.$router.push({path: '/mine'})
        }
      }
    },
    components: {},
    computed: {
      btnDis: function () {
        return !this.money;
      }
    },       // 计算属性是基于它们的依赖进行缓存的。计算属性只有在它的相关依赖发生改变时才会重新求值
    watch: {},
    filters: {}
  }

  //制保留2位小数，如：2，会在2后面补上00.即2.00
  function toDecimal2(x) {
    var f = parseFloat(x);
    if (isNaN(f)) {
      return false;
    }
    var f = Math.round(x * 100) / 100;
    var s = f.toString();
    var rs = s.indexOf('.');
    if (rs < 0) {
      rs = s.length;
      s += '.';
    }
    while (s.length <= rs + 2) {
      s += '0';
    }
    return s;
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss">
  @import "../common/sass/Cyucb";

  #Cpaycoup {
    position: fixed;
    width: 100%;
    height: 100%;

    a:first-child {
      border-top-left-radius: rem(4rem);
      border-top-right-radius: rem(4rem);
      .mint-cell-wrapper {
        background-size: 120px 0;
      }
    }
    a:last-child {
      background-size: 120px 0;
      border-bottom-left-radius: rem(4rem);
      border-bottom-right-radius: rem(4rem);
    }
    a .mint-cell-title .mint-cell-text {
      padding-left: rem(10rem);
    }

    a .mint-cell-value {
      margin-top: rem(4rem);
      input {
        text-align: right;
        padding-right: rem(10rem);
        color: #888888;
      }
      .mint-field-other {
        span {
          color: #888888;
        }
      }
    }
    .fs {
      font-size: rem(14rem);
      color: #888;
      margin-left: rem(5rem);
    }
    .is-read {
      display: none;
    }
    .is-read + label {
      width: rem(15rem);
      height: rem(15rem);
      background: url("../images/frame1@2x.png") no-repeat;
      background-size: rem(15rem) rem(15rem);
      display: inline-block;
      position: relative;
      margin-right: rem(8rem);
      vertical-align: bottom;
    }
    .is-read:checked + label {
      background: url("../images/frame2@2x.png") no-repeat;
      background-size: rem(15rem) rem(15rem);
      margin-right: rem(8rem);
      vertical-align: bottom;
    }
    .c-pop {
      width: 100%;
      .head {
        display: -webkit-flex; /* Safari */
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: rem(70rem);
        border-bottom: 1px solid #eee;
        padding: 0 rem(10rem);

        h2 {
          font-size: rem(20rem);
        }
        img {
          width: rem(16rem);
          height: rem(16rem);
        }
      }
      a {
        min-height: (44rem/64.687);

        .mint-cell-wrapper {
          padding: 0 rem(10rem);
        }

        .mint-cell-wrapper, .mint-cell-title .mint-cell-text, .mint-cell-value span {
          font-size: (14rem/64.687);
        }
        .mint-cell-title, .mint-cell-value {
          margin-top: rem(3rem);
          color: #333;
          padding-right: rem(10rem);
          .zffs {
            border: rem(1rem) solid #e5e5e5;
            border-radius: rem(4rem);
            color: #888;
            padding: rem(7rem) rem(15rem);
            margin-right: rem(10rem);
            background: transparent;
          }
          .zffs.active {
            background: #1b9dff;
            border: rem(1rem) solid #1b9dff;
            color: #FFFFFF;
          }
          .zffs:last-child {
            margin-right: 0;
          }
        }
        .mint-cell-value.is-link {
          margin-right: rem(15rem);
        }
        .mint-cell-title .mint-cell-text {
          padding-left: rem(15rem);
        }
        .mint-cell-allow-right::after {
          border: solid 1px #c8c8cd;
          border-bottom-width: 0;
          border-left-width: 0;
          right: rem(10rem);
          width: rem(8rem);
          height: rem(8rem);
          margin-top: rem(2rem);
        }
      }
      .payok {
        margin: rem(24rem) 6%;
        width: 88%;
        border-radius: rem(4rem);
        border: none;
        background: #1b9dff;
        height: rem(44rem);
        color: #ffffff;
        font-size: rem(14 ewm);
        -webkit-transform: translate3d(0, 0, 0);
        transform: translate3d(0, 0, 0);
      }

    }
  }
</style>
