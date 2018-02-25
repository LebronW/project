<template>
  <div id="CloanerInfo" class="main">
    <mt-header fixed class="index-header" title="个人信息">
      <router-link to="" slot="left" @click.native="history">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <div class="container">
      <div class="card1 part1">
        <div class="toux"><img :src="user.iconUrl | iconEmpty" alt=""></div>
        <div class="js">
          <!--<h2>{{user.name}}</h2>-->
          <!--<h3>{{user.mobile}}</h3>-->
          <!--<div>-->
          <!--<span v-for="i in user.authItem"-->
          <!--:style="{border: '1px solid '+ i.colour + '', color: ''+ i.colour +''}">{{i.name}}</span>-->
          <!--</div>-->
          <!--<div class="zmf">-->
          <!--<img src="../images/zhima@2x.png" alt="">-->
          <!--<span>{{user.zhimaScore}}111</span>-->
          <!--</div>-->
          <!--<div style="max-width: 73%;">-->
          <!--需要借款作为生意短期周转资金，大概需要14天，感谢各位小天使~-->
          <!--</div>-->
          <div class="one clearfix">
            <div class="pull-left name">{{user.name}}</div>
            <div class="pull-left sex">
              <img src="../images/icon_nan@2x.png" v-show="user.sex == '男'" alt="">
              <img src="../images/icon_nv@2x.png" v-show="user.sex == '女'" alt="">
              <span>{{user.age}}</span>
            </div>
            <div class="pull-right rz">
              <img src="../images/zhima@2x.png"/>
              <span>{{user.zhimaScore}}</span>
            </div>
          </div>
          <div class="one intr">
            {{user.borrowPurpose}}
          </div>
        </div>
        <!--<div class="chat">-->
          <!--<button @click="chat">聊天</button>-->
        <!--</div>-->
        <!--<div class="zmf">-->
        <!--<img src="../images/zhima@2x.png" alt="">-->
        <!--<span>{{user.zhimaScore}}</span>-->
        <!--</div>-->
      </div>
      <div class="part5">
        <span v-for="i in user.authItem"
              :style="{border: '1px solid '+ i.colour + '', color: ''+ i.colour +''}">{{i.name}}</span>
      </div>
      <!--<div>-->
        <!--<a class="mint-cell part2" @click="goReport">-->
          <!--<div class="mint-cell-left"></div>-->
          <!--<div class="mint-cell-wrapper">-->
            <!--<div class="mint-cell-title">-->
              <!--<span class="mint-cell-text">查看信用报告 ＞</span></div>-->
            <!--<div class="mint-cell-value"><span></span></div>-->
          <!--</div>-->
          <!--<div class="mint-cell-right"></div>-->
        <!--</a>-->
      <!--</div>-->
      <div class="part3">
        <!--<h2>借款计划</h2>-->
        <div class="clearfix c">
          <div class="pull-left">借款计划</div>
          <div class="pull-right">{{borrowPlan.addTime}}</div>
        </div>
        <div class="divier"></div>
        <div class="plan">
          <div class="item">
            <p class="zy" style="color: rgb(255, 68, 0)">
              {{borrowPlan.amountDetail.amountDesc}}<span class="s"> {{borrowPlan.amountDetail.amountUnit}}</span></p>
            <p class="s">借款金额</p>
          </div>
          <div class="item">
            <!--<p class="zy">{{borrowPlan.day}}<span class="s"> 日</span></p>-->
            <!--<p class="s">发布于{{borrowPlan.year}}年{{borrowPlan.month}}月</p>-->
            <p class="zy">{{borrowPlan.daysDetail.daysDesc}}<span class="s"> {{borrowPlan.daysDetail.daysUnit}}</span>
            </p>
            <p class="s">借款期限</p>
          </div>
          <div class="item">
            <p class="zy">{{borrowPlan.fee}}<span class="s"> %</span></p>
            <p class="s">还款利率</p>
          </div>
        </div>
      </div>
      <!--<div class="part3 t10">-->
      <!--<h2>借款用途</h2>-->
      <!--<div class="divier"></div>-->
      <!--<p class="sm">{{user.borrowPurpose}}</p>-->
      <!--</div>-->
    </div>
    <!--<mt-button class="submit" @click="chat">立即沟通</mt-button>-->
    <div class="footer-btns">
      <div class="btn">
        <button class="lt" @click="chat">聊&nbsp;&nbsp;&nbsp;天</button>
      </div>
      <div class="btn">
        <button class="jk" @click="goReport">查看信用报告</button>
      </div>
    </div>
  </div>
</template>
<script>
  /* eslint-disable */
  import {All, callbackURL} from './../api/api'
  import {MessageBox, Toast} from 'mint-ui';
  import {getStore} from '../config/mUtils'
  export default {
    name: "CloanerInfo",
    data() {
      return {
        user: {},
        borrowPlan: {
          amountDetail: {},
          daysDetail: {}
        },
        borrowerId: '',
        isFF: false
      }
    },
    methods: {
      history() {
        this.$router.push({path: '/card'});
      },
      goReport() {
        let _this = this;
        let isFF = false;
        let myInfo = _this.$store.state.myInfo;
        let loanAccid = _this.user.imAccid;
        if (!myInfo || !loanAccid) return;
        if (myInfo && myInfo.custom && myInfo.custom.crm_borrower_report_record && myInfo.custom.crm_borrower_report_record.length !== 0) {
          let crm = myInfo.custom.crm_borrower_report_record;
          for (let i = 0; i < crm.length; i++) {
            if (crm[i] == loanAccid) {
              isFF = true;
              break;
            }
          }
        }
        let borrowerId = _this.borrowerId;
        if (!borrowerId) return;
        if (isFF) {
          _this.$router.push({
            path: 'CcreditReport',
            query: {borrowerId: borrowerId, from: 'CloanerInfo', imAccid: loanAccid}
          });
        } else {
          // 未付费
          let stampsPay = (getStore("stampsPay")).split("_");
          let balance = getStore("balance");
          let lenderAccid = getStore("imAccid");
          if (!stampsPay[0] || !balance || !lenderAccid || !loanAccid) return;
          MessageBox({
            title: '查看资料',
            message: `是否支付${stampsPay[0]}点券(原价${stampsPay[1]}点券)才能查看对方信用报告、获取沟通权限?`,
            showCancelButton: true,
            confirmButtonText: '是',
            cancelButtonText: '否'
          }).then((action) => {
            if (action == 'confirm') {
              if (parseFloat(balance) - parseFloat(stampsPay[0]) >= 0) {
                All({
                  funCode: 130005,
                  consumeType: "0",
                  consumeUserId: _this.borrowerId,
                  borrowerAccid: loanAccid,
                  lenderAccid: lenderAccid,
                  stampsNum: stampsPay[0]
                }).then(res => {
                  if (res.retCode == "300003") {
                    // 点券不足去充值
                    MessageBox({
                      title: '充值点券',
                      message: '点券不足，无法查看，是否充值点券?',
                      showCancelButton: true,
                      confirmButtonText: '是',
                      cancelButtonText: '否'
                    }).then((action) => {
                      if (action === 'confirm') {
                        let path = _this.$route.path;
                        path = path.substr(1, path.length - 1);
                        _this.$router.push({path: '/Cpaycoup', from: path});
                      }
                    });
                  }
                  if (res.retCode != "0000") return Toast({message: res.retMsg, position: 'bottom', duration: 1500});
                  _this.isFF = true;
                  _this.$router.push({
                    path: 'CcreditReport',
                    query: {borrowerId: borrowerId, from: 'CloanerInfo', imAccid: loanAccid}
                  });
                });
              } else {
                // 点券不足去充值
                MessageBox({
                  title: '充值点券',
                  message: '点券不足，无法查看，是否充值点券?',
                  showCancelButton: true,
                  confirmButtonText: '是',
                  cancelButtonText: '否'
                }).then((action) => {
                  if (action === 'confirm') {
                    let path = _this.$route.path;
                    path = path.substr(1, path.length - 1);
                    _this.$router.push({path: '/Cpaycoup', from: path});
                  }
                });
              }

            }
          });
        }

      },
      chat() {
        let _this = this;
        let isFF = false;
        let myInfo = _this.$store.state.myInfo;
        let loanAccid = _this.user.imAccid;
        if (!myInfo || !loanAccid) return;
        if (myInfo && myInfo.custom && myInfo.custom.crm_borrower_report_record && myInfo.custom.crm_borrower_report_record.length !== 0) {
          let crm = myInfo.custom.crm_borrower_report_record;
          for (let i = 0; i < crm.length; i++) {
            if (crm[i] == loanAccid) {
              isFF = true;
              break;
            }
          }
        }
        if (isFF) {
          if (loanAccid) {
            _this.$store.dispatch('showLoading');
            sessionStorage.setItem("chatRequest", `${getStore("name")}查看了您的借款信息，愿意出借给您，请及时联系！`);
            let path = `Cchat/p2p-${loanAccid}?borrowerId=${_this.borrowerId}&request=ok`;
            window.location.href = callbackURL(path);
          }
        } else {
          // 未付费
          let borrowerId = _this.borrowerId;
          let stampsPay = (getStore("stampsPay")).split("_");
          let balance = getStore("balance");
          let lenderAccid = getStore("imAccid");
          if (!stampsPay[0] || !balance || !lenderAccid || !loanAccid || !borrowerId) return;
          MessageBox({
            title: '查看资料',
            message: `是否支付${stampsPay[0]}点券(原价${stampsPay[1]}点券)才能查看对方信用报告、获取沟通权限?`,
            showCancelButton: true,
            confirmButtonText: '是',
            cancelButtonText: '否'
          }).then((action) => {
            if (action == 'confirm') {
              if (parseFloat(balance) - parseFloat(stampsPay[0]) >= 0) {
                All({
                  funCode: 130005,
                  consumeType: "0",
                  consumeUserId: borrowerId,
                  borrowerAccid: loanAccid,
                  lenderAccid: lenderAccid,
                  stampsNum: stampsPay[0]
                }).then(res => {
                  if (res.retCode == "300003") {
                    // 点券不足去充值
                    MessageBox({
                      title: '充值点券',
                      message: '点券不足，无法查看，是否充值点券?',
                      showCancelButton: true,
                      confirmButtonText: '是',
                      cancelButtonText: '否'
                    }).then((action) => {
                      if (action === 'confirm') {
                        let path = _this.$route.path;
                        path = path.substr(1, path.length - 1);
                        _this.$router.push({path: '/Cpaycoup', from: path});
                      }
                    });
                  }
                  if (res.retCode != "0000") return Toast({message: res.retMsg, position: 'bottom', duration: 1500});
                  _this.isFF = true;
                  _this.$store.dispatch('showLoading');
                  let path = `Cchat/p2p-${loanAccid}?borrowerId=${_this.borrowerId}`;
                  window.location.href = callbackURL(path);
                });
              } else {
                // 点券不足去充值
                MessageBox({
                  title: '充值点券',
                  message: '点券不足，无法查看，是否充值点券?',
                  showCancelButton: true,
                  confirmButtonText: '是',
                  cancelButtonText: '否'
                }).then((action) => {
                  if (action === 'confirm') {
                    let path = _this.$route.path;
                    path = path.substr(1, path.length - 1);
                    _this.$router.push({path: '/Cpaycoup', from: path});
                  }
                });
              }
            }
          });
        }
      },
      init() {
        let vm = this;
        vm.$store.dispatch('showLoading');
        vm.borrowerId = vm.$route.query.borrowerId;
        let params = {funCode: 110015, borrowerId: vm.borrowerId};
        All(params).then(res => {
          vm.$store.dispatch('hideLoading');
          if (res.retCode !== "0000") return vm.$router.push({path: '/card'});
          vm.user = res.retData;
          if (res.retData.borrowPlan && res.retData.borrowPlan.length > 0) {
            let d = res.retData.borrowPlan[0];
            // 时间处理
            let arr = d.addTime.split("-");
            if (!arr || arr.length !== 3) return;
            let obj = {year: arr[0], month: arr[1], day: arr[2]};
            vm.borrowPlan = Object.assign(obj, d);
          }
        })
      }
    },
    mounted() {
      this.init()
    },
    components: {},
    computed: {},       // 计算属性是基于它们的依赖进行缓存的。计算属性只有在它的相关依赖发生改变时才会重新求值
    watch: {},
    filters: {
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

  #CloanerInfo {
    .card1 {
      border-radius: rem(4rem);
      background: #ffffff;
      padding: rem(15rem);
      display: -webkit-flex; /* Safari */
      display: flex;
      /*align-items: center;*/
    }

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

    .part1 {
      /*min-height: rem(94rem);*/
      position: relative;
      -moz-box-sizing: border-box;  /*Firefox3.5+*/
      -webkit-box-sizing: border-box; /*Safari3.2+*/
      -o-box-sizing: border-box; /*Opera9.6*/
      -ms-box-sizing: border-box; /*IE8*/
      box-sizing: border-box;
      /*width: 100%;*/
      .toux {
        margin-right: rem(12rem);
        img {
          width: rem(74rem);
          height: rem(74rem);
          border-radius: rem(12rem);
        }
      }

      .js {
        width: 100%;
        padding-top: rem(4rem);
        h2 {
          font-size: rem(15rem);
          color: #000000;
          margin-bottom: rem(7rem);
        }
        h3 {
          font-size: rem(12rem);
          margin-bottom: rem(7rem);
          color: rgb(136, 136, 136);
        }
        div span {
          font-size: rem(14rem);
          margin: 0 rem(4rem) rem(4rem) 0;
          padding: rem(1.5rem) rem(5rem);
          border-radius: rem(4rem);
          display: inline-block;
        }

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
            color: #63be71;
          }
        }
        .intr {
          margin-top: rem(6rem);
          line-height: 1.4;
          color: #888;
        }

      }

      .zmf {
        /*position: absolute;*/
        /*right: rem(15rem);*/
        /*top: rem(40rem);*/
        margin-bottom: rem(3rem);
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
      .chat {
        position: absolute;
        right: rem(15rem);
        top: rem(50rem);
        button {
          outline: none;
          background: #1b9dff;
          padding: rem(2rem) rem(8rem);
          border: none;
          border-radius: rem(4rem);
          color: #ffffff;
        }
      }
    }

    .part2 {
      /*margin: rem(10rem) 0;*/
      border-bottom-left-radius: rem(4rem);
      border-bottom-right-radius: rem(4rem);
      background-size: 120% 0;
      -moz-box-sizing: border-box;  /*Firefox3.5+*/
      -webkit-box-sizing: border-box; /*Safari3.2+*/
      -o-box-sizing: border-box; /*Opera9.6*/
      -ms-box-sizing: border-box; /*IE8*/
      box-sizing: border-box;

      .mint-cell-wrapper {
        background-size: 120% 0;
      }
      .mint-cell-title {
        text-align: center;
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
      -moz-box-sizing: border-box;  /*Firefox3.5+*/
      -webkit-box-sizing: border-box; /*Safari3.2+*/
      -o-box-sizing: border-box; /*Opera9.6*/
      -ms-box-sizing: border-box; /*IE8*/
      box-sizing: border-box;
      div.c {
        font-size: rem(14rem);
        margin-bottom: rem(13rem);
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
        line-height: 0.3rem;
      }
    }

    .part5 {
      /*border-top-left-radius: rem(4rem);*/
      /*border-top-right-radius: rem(4rem);*/
      border-radius: rem(4rem);
      background: #ffffff;
      padding: rem(15rem);
      margin: rem(10rem) 0 0 0;
      -moz-box-sizing: border-box;  /*Firefox3.5+*/
      -webkit-box-sizing: border-box; /*Safari3.2+*/
      -o-box-sizing: border-box; /*Opera9.6*/
      -ms-box-sizing: border-box; /*IE8*/
      box-sizing: border-box;
      /*text-align: center;*/
      span {
        margin-right: rem(10rem);
        font-size: rem(12rem);
        padding: 0 rem(5rem);
        border-radius: rem(4rem);
      }
    }
  }
</style>
