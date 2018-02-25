<template>
  <div id="ClenderInfo" class="main">
    <mt-header fixed class="index-header" title="出资人信息">
      <router-link to="" slot="left" @click.native="history">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <div class="container">
      <div class="card part1">
        <div class="toux"><img :src="user.iconUrl | iconEmpty" alt=""></div>
        <div class="js">
          <!--<h2>{{user.name}}</h2>-->
          <!--<h3>{{user.mobile | jmMoblie}}</h3>-->
          <div class="one clearfix">
            <div class="pull-left name">{{user.name}}</div>
            <div class="pull-left sex">
              <img src="../images/icon_nan@2x.png" v-show="user.sex && user.sex == '男'" alt="">
              <img src="../images/icon_nv@2x.png" v-show="user.sex && user.sex == '女'" alt="">
              <span>{{user.age}}</span>
            </div>
            <div class="pull-right rz">
              <img src="../images/renzheng@2x.png"/>
              <span>已认证</span>
            </div>
          </div>
          <div class="one intr">
            {{user.lendAD}}
          </div>
        </div>
      </div>
      <!--<mt-cell class="part2" title="发布时间" :value="user.publishTime"></mt-cell>-->
      <div class="part3">
        <div class="clearfix tle">
          <div class="pull-left">出借计划</div>
          <div class="pull-right cl-hui">{{user.publishTime}}</div>
        </div>
        <div class="divier"></div>
        <div class="plan">
          <div class="item">
            <p class="zy" style="color: rgb(255, 68, 0)">{{plan.amountDetail.amountDesc}}<span
              class="s"> {{plan.amountDetail.amountUnit}}</span>
            </p>
            <p class="s">借款发布</p>
          </div>
          <div class="item">
            <p class="zy">{{plan.daysDetail.daysDesc}}<span class="s"> {{plan.daysDetail.daysUnit}}</span></p>
            <p class="s">出借期限</p>
          </div>
          <div class="item">
            <p class="zy">{{plan.fee}}<span class="s"> %</span></p>
            <p class="s">出借利率</p>
          </div>
        </div>
      </div>
    </div>

    <div class="footer-btns">
      <div class="btn">
        <button class="lt" @click="chat">聊&nbsp;&nbsp;&nbsp;天</button>
      </div>
      <div class="btn">
        <button class="jk" @click="chatWidthS">申请借款</button>
      </div>
    </div>
    <!--<mt-button class="submit" @click="chat">立即沟通</mt-button>-->
  </div>
</template>
<script>
  /* eslint-disable */
  import {All, callbackURL} from './../api/api'
  import {getStore, setStore} from '../config/mUtils'
  import {MessageBox} from 'mint-ui';
  export default {
    name: "ClenderInfo",
    data() {
      return {
        user: {},
        plan: {
          amountDetail: {},
          daysDetail: {}
        },
        lenderId: ""
      }
    },
    mounted() {
      let vm = this;
      vm.lenderId = vm.$route.query.id;
      All({funCode: 110037, lenderId: vm.lenderId}).then(res => {
        if (res.retCode !== "0000") return;
        if (res.retData) vm.user = res.retData;
        if (res.retData.lendPlanList) vm.plan = res.retData.lendPlanList[0];
      })
    },
    methods: {
      history() {
        let pageLI = sessionStorage.getItem("pageLI");
        if (pageLI) sessionStorage.removeItem("pageLI");
        this.$router.push({path: '/index'});
      },
      chat() {
        let this_ = this;
        let imAccid = this_.user.imAccid;
        this_.isPassAuth(function () {
          if (imAccid) {
           // xxx查看了您的出借信息，愿意向您借钱，请及时联系！
            this_.$store.dispatch('showLoading');
            sessionStorage.setItem("chatRequest", `${getStore("name")}查看了您的出借信息，愿意向您借钱，请及时联系！`);
            window.location.href = callbackURL(`Cchat/p2p-${imAccid}?request=ok`);
          }
        });
      },
      chatWidthS() {
        let this_ = this;
        let imAccid = this_.user.imAccid;
        this_.isPassAuth(function () {
          if (imAccid) {
            this_.$store.dispatch('showLoading');
            All({funCode: 110040, lenderId: this_.lenderId, borrowerId: getStore("userId")}).then(res => {
              console.log("110040");
            });
            //
            let params = {
              money: this_.plan.amountDetail.amountDesc + this_.plan.amountDetail.amountUnit,
              day: this_.plan.daysDetail.daysDesc + this_.plan.daysDetail.daysUnit
            };
            sessionStorage.setItem("chatRequest", `您好，${getStore("name")}向您借款，借款金额${params.money}，${params.day}，若感兴趣请及时回复。`);
            window.location.href = callbackURL(`Cchat/p2p-${imAccid}?request=ok`);
          }
        });
      },
      isPassAuth(fn) {
        let this_ = this;
        let personInfoState = getStore("personInfoState");  // 个人信息
        let authState = getStore("authState");  // 信用认证
        let isAuthPay = getStore("isAuthPay");  // 信用认证是否付费
        if (!personInfoState || personInfoState != "1") {
          MessageBox({
            title: '认证提示',
            message: '您尚未认证，完成身份认证后方可申请借款，前去认证？',
            showCancelButton: true,
            confirmButtonText: '去认证',
            cancelButtonText: '暂不认证'
          }).then((action) => {
            if (action === 'confirm') {
              sessionStorage.setItem("pageLI", `/ClenderInfo?id=${this_.lenderId}`);
              this_.$router.push({
                path: '/CeditPersonInfo',
                query: {'from': `/ClenderInfo?id=${this_.lenderId}`}
              });
            }
          });
          return;
        }
        if (!isAuthPay || isAuthPay != "1") {
          MessageBox({
            title: '认证提示',
            message: '您尚未认证，完成身份认证后方可申请借款，前去认证？',
            showCancelButton: true,
            confirmButtonText: '去认证',
            cancelButtonText: '暂不认证'
          }).then((action) => {
            if (action === 'confirm') {
              sessionStorage.setItem("pageLI", `/ClenderInfo?id=${this_.lenderId}`);
              this_.$router.push({
                path: '/CcreditAuth',
                query: {'from': `/ClenderInfo?id=${this_.lenderId}`}
              });
            }
          });
          return;
        }
        if (!authState || authState != "1") {
          MessageBox({
            title: '认证提示',
            message: '您尚未认证，完成身份认证后方可申请借款，前去认证？',
            showCancelButton: true,
            confirmButtonText: '去认证',
            cancelButtonText: '暂不认证'
          }).then((action) => {
            if (action === 'confirm') {
              sessionStorage.setItem("pageLI", `/ClenderInfo?id=${this_.lenderId}`);
              this_.$router.push({
                path: '/CauthReport',
                query: {'from': `/ClenderInfo?id=${this_.lenderId}`}
              });
            }
          });
          return;
        }
        fn();
      }
    },
    components: {},
    computed: {},       // 计算属性是基于它们的依赖进行缓存的。计算属性只有在它的相关依赖发生改变时才会重新求值
    watch: {},
    filters: {
      jmMoblie(val) {
        if (!val) return;
        return val.substr(0, 3) + '****' + val.substr(val.length - 4);
      },
      iconEmpty(val) {
        if (!val) return require("../images/touxiang@2x.png");
        else return val;
      }
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss">
  @import "../common/sass/Cyucb";

  #ClenderInfo {

    .footer-btns {
      .lt {
        background: #ffffff;
        color: #5a5a5a;
      }
      .jk {
        background: #e01625;
        color: #ffffff;
      }
    }
    .card {
      border-radius: rem(4rem);
      background: #ffffff;
      padding: rem(15rem);
      display: -webkit-flex; /* Safari */
      display: flex;
      align-items: center;
    }

    .part1 {
      height: rem(94rem);
      position: relative;
      -moz-box-sizing: border-box; /*Firefox3.5+*/
      -webkit-box-sizing: border-box; /*Safari3.2+*/
      -o-box-sizing: border-box; /*Opera9.6*/
      -ms-box-sizing: border-box; /*IE8*/
      box-sizing: border-box;

      .toux {
        margin-right: rem(20rem);
        img {
          width: rem(74rem);
          height: rem(74rem);
          border-radius: rem(12rem);
        }
      }

      .js {
        width: 100%;
        .name {
          font-size: rem(15rem);
          color: #000000;
          padding-top: rem(1rem);
        }
        .sex {
          margin-left: rem(12rem);
          img {
            height: rem(16rem);
          }
          span {
            vertical-align: text-top;
            color: #888;
          }
        }
        .rz {
          img {
            height: rem(16rem);
          }
          span {
            vertical-align: text-top;
            color: #ffaa00;
          }
        }
        .intr {
          margin-top: rem(6rem);
          line-height: 1.4;
          color: #888;
        }
        /*h2 {*/
        /*font-size: rem(15rem);*/
        /*color: #000000;*/
        /*margin-bottom: rem(13rem);*/
        /*}*/
        /*h3 {*/
        /*font-size: rem(12rem);*/
        /*margin-bottom: rem(7rem);*/
        /*color: rgb(136, 136, 136);*/
        /*}*/
      }

      .zmf {
        position: absolute;
        right: rem(15rem);
        top: rem(40rem);
        img {
          width: rem(17rem);
          height: rem(19rem);
        }
        span {
          margin-left: rem(4rem);
          font-size: rem(16rem);
          color: rgb(99, 190, 113);
          vertical-align: text-top;
        }
      }
    }

    .part2 {
      margin: rem(10rem) 0;
      border-radius: rem(4rem);
      background-size: 120% 0;
      -moz-box-sizing: border-box; /*Firefox3.5+*/
      -webkit-box-sizing: border-box; /*Safari3.2+*/
      -o-box-sizing: border-box; /*Opera9.6*/
      -ms-box-sizing: border-box; /*IE8*/
      box-sizing: border-box;

      .mint-cell-wrapper {
        background-size: 120% 0;
      }

      .mint-cell-title .mint-cell-text {
        padding-left: rem(6rem);
      }
    }

    .part3 {
      margin-top: rem(10rem);
      border-radius: rem(4rem);
      background: #ffffff;
      padding: rem(15rem);
      -moz-box-sizing: border-box; /*Firefox3.5+*/
      -webkit-box-sizing: border-box; /*Safari3.2+*/
      -o-box-sizing: border-box; /*Opera9.6*/
      -ms-box-sizing: border-box; /*IE8*/
      box-sizing: border-box;
      .tle {
        font-size: rem(14rem);
        margin-bottom: rem(13rem);
      }
      .cl-hui {
        color: #888;
      }
      .plan {
        height: rem(99rem);
        display: -webkit-flex; /* Safari */
        display: flex;
        align-items: center;

        .item {
          flex-grow: 1;
          align-items: center;
          justify-content: center;
          margin-top: rem(20rem);

          p {
            text-align: center;
          }
          .zy {
            font-size: rem(24rem);
            margin-bottom: rem(5rem);
          }
          .s {
            font-size: rem(13rem);
            color: rgb(136, 136, 136);
          }
        }
      }

      .sm {
        margin-top: rem(15rem);
        font-size: rem(13rem);
        color: #888888;
      }
    }
  }
</style>
