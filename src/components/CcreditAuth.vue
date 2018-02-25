<template>
  <div id="CcreditAuth" class="main">
    <mt-header fixed class="index-header" title="自助认证">
      <router-link to="" slot="left" @click.native="history">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <div class="container">
      <div class="list-group">
        <h3>认证资料</h3>
        <div class="nr">
          <div class="box">
            <div class="item" v-for="(i, index) in listData">
              <img :src="i.src">
              <span>{{i.name}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="list-group t15">
        <h3>认证原因</h3>
        <div class="nr">
          <div class="box" style="color: #888;line-height: 1.5">
            1、平台是个人对个人的借款模式，认证就是一张有效通行证。<br/>
            2、平台认证增加借款人信用度，提高借款效率。<br/>
            3、平台认证确保认证真实性，出借人更愿意给资料完善、真实性高的用户。<br/>
            4、平台不收取任何费用，费用全部交给认证机构。<br/>
          </div>
        </div>
      </div>
      <div class="list-group t15">
        <h3>认证套餐</h3>
        <div class="nr">
          <div class="box">
            <div class="tc_item" :class="{'active': selectMoney == index}" @click="chooseMoney(index)"
                 v-for="(item, index) in discountList">
              <span class="span first">{{item.name}}</span>
              <span class="span zy">{{item.xj}}</span>
              <span class="span small"><s>{{item.yj}}</s></span>
              <span class="span ys">{{item.ms}}</span>
              <img src="../images/img_qtj@2x.png" class="yx" v-show="index == 1" alt="">
              <img src="../images/img_youxuan@2x.png" class="tj" v-show="index == 2" alt="">
            </div>
          </div>
        </div>
        <div class="zhuj">
          <span class="ti">注:</span>选择<span style="color: #1b9dff">包月认证</span>有效期内没有借到款，认证费用<span
          style="color: rgb(255,68,0)">全额退款</span>；<br/>
          <span class="h2">选择<span style="color: #1b9dff">半年内认证</span>有效期内没有借到款认证费用<span
            style="color: rgb(255,68,0)">双倍退款</span>。</span>
        </div>
      </div>
    </div>
    <div class="fs">
      <input id="checkbox" type="checkbox" class="is-read" v-model="ca_checkbox"/><label for="checkbox"></label>同意 <a
      href="javascript:;" style="color: #e01625" @click='Agreement'>《征信查询授权书》</a>
    </div>
    <mt-button class="submit" @click="payMoney" :disabled="btnDis">申请借款</mt-button>
    <!--<div class="tp">-->
    <!--<img src="../images/img_xyrz@2x.png" alt="">-->
    <!--</div>-->
    <!--<div class="con">-->
    <!--<a class="mint-cell c-list" :class="{'c-list-last': index == (listData.length-1)}" v-for="(i, index) in listData">-->
    <!--<div class="mint-cell-wrapper">-->
    <!--<div class="mint-cell-title clearfix">-->
    <!--<div class="pull-left img"><img :src="i.src"></div>-->
    <!--<div class="pull-left intr">-->
    <!--<h4 class="mint-cell-text">{{i.name}}</h4>-->
    <!--<span class="mint-cell-label">{{i.intr}}</span>-->
    <!--</div>-->
    <!--</div>-->
    <!--</div>-->
    <!--</a>-->
    <!--<div class="t10 fs">-->
    <!--<input id="checkbox" type="checkbox" class="is-read" v-model="ca_checkbox"/><label for="checkbox"></label>同意 <a-->
    <!--href="javascript:;" style="color: #1b9dff" @click='Agreement'>《征信查询授权书》</a>-->
    <!--</div>-->
    <!--</div>-->
    <!--<mt-button class="submit" @click="payMoney" :disabled="btnDis">认证信用报告{{authPrice.xj}}元 ( <s>原价{{authPrice.yj}}元</s>-->
    <!--)-->
    <!--</mt-button>-->
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
        <mt-cell title="支付金额" :value="payMoney_p"></mt-cell>
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
  import {All, payPost, callbackURL} from './../api/api'
  import {getStore} from '../config/mUtils'
  export default {
    name: "CcreditAuth",
    data() {
      return {
        listData: [],
        ca_checkbox: true,
        pay_pop: false,
        chcFS: "yhk",
        urlQuery: '',
        inputAction: '',
        inputList: [],
        authPrice: {},
        isWechat: false,
        isOkPay: false,
        discountList: discountList,
        selectMoney: 1,
        validTime: "",
        LLpay: {
          url: "",
          value: ""
        }
      }
    },
    mounted() {
      let _this = this;
      this.urlQuery = this.$route.query.from;
      let authPay = getStore("authPay");
      if (!authPay) return this.$router.push({path: '/index'});
      let arr = authPay.split("_");
      this.authPrice = {xj: arr[0], yj: arr[1]};
      All({funCode: 110029, status: 1}).then(res => {
        if (res.retCode != "0000" || !res.retData || res.retData.length == 0) return;
        let data = res.retData;
        let resD = [];
        for (let i = 0; i < data.length; i++) {
          let arr = data[i].split("_");
          let obj = {
            id: i,
            src: arr[0],
            intr: arr[2],
            name: arr[1]
          };
          resD.push(obj);
        }
        _this.listData = resD;
      });

      let u = navigator.userAgent;
      let useragent = u.toLowerCase(); // 获取判断用的对象
      let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
      let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      if (useragent.match(/MicroMessenger/i) == 'micromessenger' || (useragent.indexOf("qq") > -1 && isiOS) || (useragent.indexOf("mobile mqqbrowser") > -1 && isAndroid)) _this.isWechat = true;
    },
    methods: {
      history() {
        let this_ = this;
        if (this.urlQuery && this.urlQuery === 'mine') return this.$router.push({path: '/mine'});
        if (this.urlQuery && this.urlQuery.indexOf('ClenderInfo') >= 0) return this_.$router.push({path: this_.urlQuery});
        else this.$router.push({path: '/index'});
      },
//      Authentication(i) { // 认证
//        var params
//        if (i.id === 0) {
//          params = {
//            funCode: 130001
//          }
//        } else if (i.id === 1) {
//          params = {
//            funCode: 130002,
//            authResult: '',
//            authItemKey: 'operatorReport'
//          }
//        } else if (i.id === 2) {
//          params = {
//            funCode: 130002,
//            authResult: '',
//            authItemKey: 'jingDong'
//          }
//        }
//        All(params).then(res => {
//          console.log(res)
//        })
//      },
      next() {
        let this_ = this;
        this_.$store.dispatch('showLoading');
        switch (this_.chcFS) {
          case "yhk":
            this_.pay_pop = false;
            this_.$store.dispatch('hideLoading');
            if (!this_.LLpay.url) return "支付异常，请刷新重试";
            sessionStorage.setItem("payFrom", 'CauthReport');
            document.getElementById("zfForm").submit();
            break;
          case "zfb":
            let p = {
              funCode: 130004,
              payWay: "1",     // 支付方式 1支付宝 2微信 0其他（连连）
//              payMoney: "0.01",    // 测试支付金额（单位：元）
              payMoney: toDecimal2(this_.authPrice.xj),    // 支付金额（单位：元）
              payType: "1",     // 支付类型（1.消费金额认证 2.充值点券）
              validTime: this_.validTime
            };
            payPost(p).then(res => {
              this_.pay_pop = false;
              this_.$store.dispatch('hideLoading');
              if (res.retCode == "7777") {
                window.localStorage.clear();
                window.location.href = callbackURL("login");
                return;
              }
              if (res.retCode == "0000" && res.retData && res.retData.codeUrl) {
                window.localStorage.setItem("zhifubaoOrder", res.retData.outTradeNo);
                window.localStorage.setItem("payFrom", "/CauthReport");
                this_.isOkPay = true;
                window.location.href = res.retData.codeUrl;
              }
              else {
                Toast({message: res.retMsg, position: 'bottom', duration: 1500});
              }
            });
            break;
        }
      },
      payMoney() {
        let this_ = this;
        this_.pay_pop = true;
        this_.$store.dispatch('showLoading');
        if (this_.chcFS == "yhk") {
          // =====================连连支付
          let req = {
            funCode: 130004,
            payWay: "3",     // 支付方式 1支付宝 2微信 3连连支付 0商盟银行卡
//            payMoney: "0.01",    // 测试支付金额（单位：元）
            payMoney: toDecimal2(this_.authPrice.xj),    // 支付金额（单位：元）
            payType: "1",     // 支付类型（1.消费金额认证 2.充值点券）
            returnUrl: "",
            softType: 'h5_qyq3_v1.0',
            validTime: this_.validTime
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
////            payMoney: "0.01",    // 支付金额（单位：元）
//            payMoney: toDecimal2(this_.authPrice.xj),    // 支付金额（单位：元）
//            payType: "1",     // 支付类型（1.消费金额认证 2.充值点券）
//            returnUrlType: "1"    // 1、认证报告 2、我的 3、信用报告 4、通讯录
//          };
//          payPost(p1).then(res => {
//            this_.$store.dispatch('hideLoading');
//            if (res.retCode == "7777") {
//              window.localStorage.clear();
//              window.location.href = callbackURL("login");
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
//            ==================================END
        } else this_.$store.dispatch('hideLoading');
//
//        let p = {
//          funCode: 130004,
//          payWay: "0",     // 支付方式 1支付宝 2微信 0其他（连连）
////          payMoney: "0.01",    // 支付金额（单位：元）
//          payMoney: toDecimal2(vm.authPrice.xj),    // 支付金额（单位：元）
//          payType: "1",     // 支付类型（1.消费金额认证 2.充值点券）
//          returnUrlType: "1"    // 1、认证报告 2、我的 3、信用报告 4、通讯录
////          returnUrl: encodeURIComponent("http://localhost:4009/#/CauthReport")
////          stampsNum: "",
//        };
//        payPost(p).then(res => {
//          console.log(res);
//          if (res.retCode != "0000") return vm.pay_pop = false;
//          let result = res.retData;
//          for (let key in result) {
//            if (key != "url") {
//              let obj = {
//                name1: key,
//                name2: result[key]
//              };
//              vm.inputList.push(obj);
//            } else {
//              vm.inputAction = result[key];
//            }
//          }
//          vm.pay_pop = true;
//        });
      },
      Agreement() {
        let params = {
          funCode: 110001, // 功能码
          type: 2 // 协议标识
        };
        All(params).then(res => {
          if (res.retCode !== '0000') return;
          window.location.href = res.retData.userProtocol
        })
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
      },
      chooseMoney(index) {
        this.selectMoney = index;
        this.authPrice.xj = (this.discountList[index].xj).replace("¥ ", "");
        this.validTime = this.discountList[index].validTime;
      }
    },
    components: {},
    computed: {
      btnDis: function () {
        return !this.ca_checkbox;
      },
      payMoney_p: function () {
        return this.authPrice.xj + "元";
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

  var discountList = [
    {
      name: "一次有效",
      yj: "¥ 30.00",
      xj: "¥ 15.00",
      ms: "立省15元",
      validTime: "1"
    }, {
      name: "包月有效",
      yj: "¥ 60.00",
      xj: "¥ 30.00",
      ms: "立省30元",
      validTime: "30"
    }, {
      name: "半年有效",
      yj: "¥ 120.00",
      xj: "¥ 60.00",
      ms: "立省60元",
      validTime: "180"
    }, {
      name: "全年有效",
      yj: "¥ 200.00",
      xj: "¥ 100.00",
      ms: "立省100元",
      validTime: "365"
    }
  ]
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss">
  @import "../common/sass/Cyucb";

  #CcreditAuth {
    .list-group {
      background: #ffffff;
      border-radius: rem(4rem);
      /*min-height: rem(50rem);*/
      h3 {
        padding: rem(16rem);
        font-size: rem(16rem);
      }
      .nr {
        background-image: -webkit-linear-gradient(top, #d9d9d9, #d9d9d9 50%, transparent 50%);
        background-image: linear-gradient(180deg, #d9d9d9, #d9d9d9 50%, transparent 50%);
        background-size: 120% 1px;
        background-repeat: no-repeat;
        background-position: top left;
        background-origin: content-box;
        margin-left: rem(16rem);
        min-height: rem(100rem);

        .box {
          display: -webkit-flex; /* Safari */
          display: flex;
          justify-content: flex-start;
          align-items: center;
          padding: rem(16rem) rem(16rem) rem(16rem) 0;

          .item {
            text-align: center;
            padding: rem(14rem) rem(20rem) rem(14rem) rem(16rem);
            img {
              width: rem(50rem);
              height: rem(50rem);
              border-radius: rem(4rem);
            }
            span {
              display: block;
              margin-top: rem(8rem);
            }
          }

          .tc_item {
            width: rem(80rem);
            height: rem(100rem);
            background: transparent;
            border: 0.01rem solid #d9d9d9;
            border-radius: rem(4rem);
            text-align: center;
            margin-right: rem(10rem);
            position: relative;

            .span {
              display: block;
              color: #888;
              margin: rem(5rem) auto;
              font-size: rem(14rem);
            }
            .zy {
              color: #ffaa00;
              font-weight: 600;
            }
            .span.small {
              font-size: rem(12rem);
            }
            .first {
              margin-top: rem(13rem);
              color: #333;
            }
            .ys {
              background: #ffaa00;
              color: #ffffff;
              margin: 0 rem(9rem);
              padding: rem(3rem) 0 rem(2rem) 0;
              border: none;
              border-radius: rem(4rem);
              font-size: rem(12rem);
            }

            .yx {
              position: absolute;
              top: -0.02rem;
              left: -0.02rem;
              height: rem(24rem);
              border-top-left-radius: rem(4rem);
            }
            .tj {
              position: absolute;
              top: -0.02rem;
              left: -0.01rem;
              height: rem(24rem);
              border-top-left-radius: rem(4rem);
            }
          }

          .tc_item.active {
            background: url("../images/yueka_kuang@2x.png") no-repeat;
            background-size: 100% 100%;
            border: none;
            border-radius: 0;

            .yx, .tj {
              top: 0;
              left: 0;
              border-top-left-radius: rem(4rem);
            }
          }

          /*.item{*/
          /*!*width:1%;*!*/
          /*-webkit-box-flex:1 ;*/
          /*-moz-box-flex: 1;*/
          /*box-flex: 1;*/
          /*flex-grow: 1;*/
          /*width:0;*/

          /*img{*/
          /*width: 100%;*/
          /*}*/
          /*}*/
        }
      }
      .zhuj {
        font-size: rem(14rem);
        color: #888;
        line-height: 1.3;
        padding: 0 rem(16rem) rem(20rem) rem(16rem);
        span {
          font-size: rem(14rem);
        }
        .ti {
          color: #1b9dff;
          width: rem(25rem);
          display: inline-block;
        }
        .h2 {
          margin-left: rem(25rem);
        }
      }
    }
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

      .c-list {
        min-height: rem(99rem);
        height: rem(99rem);

        .img {
          margin: 0 rem(5rem);
          img {
            width: rem(64rem);
            height: rem(64rem);
          }
        }
        .intr {
          width: 75%;
          margin: rem(9rem) 0 0 rem(5rem);
          .mint-cell-text {
            font-size: rem(14rem);
            color: #000;
          }
          .mint-cell-label {
            font-size: rem(12rem);
            word-break: normal;
            width: 100%;
            white-space: pre-wrap;
            word-wrap: break-word;
            -webkit-line-clamp: 2;
            line-clasmp: 2;
            ext-overflow: -o-ellipsis-lastline;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            overflow: hidden;
            line-height: rem(15rem);
          }
        }
      }
      .c-list:first-child {
        border-top-left-radius: rem(6rem);
        border-top-right-radius: rem(6rem);
        .mint-cell-wrapper {
          background-size: 120% 0;
        }
      }
      .c-list-last {
        background-size: 120% 0;
        border-bottom-left-radius: rem(6rem);
        border-bottom-right-radius: rem(6rem);
      }
    }
    .fs {
      font-size: rem(14rem);
      color: #888;
      margin-left: rem(10rem);
      margin-bottom: 1rem;
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
            background: #e01625;
            border: rem(1rem) solid #e01625;
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
        background: #e01625;
        height: rem(44rem);
        color: #ffffff;
        font-size: rem(14 ewm);
        -webkit-transform: translate3d(0, 0, 0);
        transform: translate3d(0, 0, 0);
      }

    }
  }

</style>
