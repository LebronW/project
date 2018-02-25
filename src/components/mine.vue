<template>
  <section class="mine">
    <div class="mineMy">
      <span>我的</span>
    </div>
    <div v-show='mineType == 1' class="mine-head" @click="login">
      <div class="head-left">
        <span>登录/注册</span>
        <span>------</span>
        <img src="../images/arrowright.png"/>
      </div>
      <div class="head-right">
        <img src="../images/touxiang@2x.png"/>
      </div>
    </div>
    <div v-show='mineType == 2' class="mine-head">
      <div class="head-left">
        <span>{{name}}</span>
        <span v-show="loanType == 1">可用点券 {{balance}}</span>
        <span @click="already" v-show="loanType == 1">充值</span>
        <span v-show="loanType == 2">{{phone}}</span>
      </div>
      <div class="head-right">
        <img :src="iconUrl | iconEmpty"/>
      </div>
    </div>
    <!--列表-->
    <div class="mineContent">
      <div @click='IdAuthentication' v-show='mineType == 2 && loanType == 1'>
        <mt-cell is-link title="身份认证" class="borrow">
          <label style="color: rgb(186,186,186)">{{status_sfrz}}</label>
          <img slot="icon" src="../images/wd_sfrz@2x.png">
        </mt-cell>
      </div>
      <div @click='goCreditReport' v-show='mineType == 2 && loanType == 2'>
        <mt-cell is-link title="信用报告" class="borrow">
          <label style="color: rgb(186,186,186)">{{status_xybg}}</label>
          <img slot="icon" src="../images/wd_sfrz@2x.png">
        </mt-cell>
      </div>
      <div @click="fbLend" v-show='mineType == 2 && loanType == 1'>
        <mt-cell is-link title="出借发布" class="borrow">
          <!--<span style="color: rgb(186,186,186)">未发布</span>-->
          <img slot="icon" src="../images/wd_fbjt@2x.png">
        </mt-cell>
      </div>
      <div @click='fbLoan' v-show='mineType == 2 && loanType == 2'>
        <mt-cell is-link title="借款发布" class="borrow">
          <!--<span style="color: rgb(186,186,186)">未发布</span>-->
          <img slot="icon" src="../images/wd_fbjt@2x.png">
        </mt-cell>
      </div>
      <div @click='Liou' v-show='mineType == 2 && loanType == 1'>
        <mt-cell is-link title="打借条" class="borrow" style='margin-top: 0.2rem;'>
          <img slot="icon" src="../images/wd_fbjt@2x.png">
          <span class="message" v-show="messageCount > 0">{{ messageCount }}</span>
        </mt-cell>
      </div>
      <div @click='Liou' v-show='mineType == 2 && loanType == 2'>
        <mt-cell is-link title="我的借条" class="borrow" style='margin-top: 0.2rem;'>
          <img slot="icon" src="../images/wd_djt@2x.png">
        </mt-cell>
      </div>
      <div @click='problem' style="margin-top: 0.2rem;">
        <mt-cell is-link title="关于我们" class="borrow">
          <img slot="icon" src="../images/wd_gywm@2x.png">
        </mt-cell>
      </div>
      <div @click='callPhone'>
        <mt-cell is-link title="客服热线" class="borrow">
          <img slot="icon" src="../images/wd_kf@2x.png">
        </mt-cell>
      </div>
      <div @click='setup'>
        <mt-cell is-link title="个人设置" class="borrow">
          <img slot="icon" src="../images/wd_sz@2x.png">
        </mt-cell>
      </div>
    </div>
    <!--<button @click='Recharge'>充值页面</button>-->
    <router-view></router-view>
  </section>

</template>
<script>
  /* eslint-disable */
  import {MessageBox, Toast} from 'mint-ui'
  import {mapMutations} from 'vuex'
  import {All} from './../api/api'
  import {getStore} from '../config/mUtils'
  export default {
    data () {
      return {
        mineType: 1,
        name: null,
        phone: null,
        nickName: null,
        loanType: 1, // 1出借人, 2借款人
        status_xybg: '未认证',
        status_sfrz: '未认证',
        balance: '0',
        iconUrl: '',
        messageCount: ''
      }
    },
    methods: {
      ...mapMutations([
        'RECORD_USERINFO'
      ]),
//      Recharge() { // 充值页面
//        let status_xybg = this.status_xybg;
//        if (status_xybg == "未认证")  this.$router.push({path: '/LIdentity', query: {'from': 'mineIdAuth'}})
//        else this.$router.push({path: '/LRecharge'})
//      },
      login() {
        this.$router.push({path: '/login'})
      },
      init() {
        let params = {
          funCode: 120006,
          userType: getStore("userType")
        }
        All(params).then(res => {
          if (res.retCode === '0000') {
            this.messageCount = res.retData
          }
        })
      },
      Liou() { // 打借条
        let personInfoState = getStore("personInfoState");  // 个人信息
        let userType = getStore("userType");  // 用户状态
        if (userType && userType == "1") {
          if (personInfoState && personInfoState == "1") this.$router.push({path: '/Liou'});
          else this.$router.push({path: '/Cverified', query: {'from': 'Liou'}});
        }
        if (userType && userType == "2") {
          let authState = getStore("authState");  // 信用认证
          let isAuthPay = getStore("isAuthPay");  // 信用付费
          if (personInfoState && personInfoState == "1") {
            if (authState && authState == "1") this.$router.push({path: '/Liou'}); //
            else if (isAuthPay && isAuthPay == "1") this.$router.push({path: '/CauthReport', query: {'from': 'mine'}});   // 信用认证
            else this.$router.push({path: '/CcreditAuth', query: {'from': 'mine'}});   // 信用认证
          } else this.$router.push({path: '/CeditPersonInfo', query: {'from': 'mine'}});   // 个人信息
        }
//        this.$router.push({path: '/Liou'})
      },
      problem() { // 关于我们
        let params = {
          funCode: 110007
        }
        All(params).then(res => {
//        console.log(res)
          if (res.retCode === '0000') {
            window.location.href = `${res.retData}?from=h5`
          } else {
            Toast({
              message: res.retMsg,
              position: 'bottom',
              duration: 2000
            });
          }
        })
//  	this.$router.push({path: '/problem'})
      },
      already() { // 充值
        let status_sfrz = this.status_sfrz;
        let personInfoState = getStore("personInfoState");
        if (status_sfrz == "未认证" && (!personInfoState || personInfoState != "1")) this.$router.push({path: '/Cverified', query: {'from': 'mineIdAuth'}});
        else this.$router.push({path: '/Cpaycoup', from: 'mine'})
      },
      IdAuthentication() { // 出借人身份认证
        this.$router.push({path: '/Cverified', query: {'from': 'mineIdAuth'}});
      },
      goCreditReport() { // 借款人信用报告
        let personInfoState = getStore("personInfoState");  // 个人信息
        if (this.status_xybg === "已认证" && personInfoState && personInfoState == "1") return Toast({message: "您已完成认证", position: 'bottom', duration: 1500});
        let isAuthPay = getStore("isAuthPay");  // 信用付费
        if (personInfoState && personInfoState == "1") {
          if (isAuthPay && isAuthPay == "1") this.$router.push({path: '/CauthReport', query: {'from': 'mine'}});   // 信用认证
          else this.$router.push({path: '/CcreditAuth', query: {'from': 'mine'}}); // 信用认证未付费
        } else this.$router.push({path: '/CeditPersonInfo', query: {'from': 'mine'}});   // 个人信息
      },
      fbLoan() { // 发布借款
        let personInfoState = getStore("personInfoState");  // 个人信息
        let authState = getStore("authState");  // 信用认证
        let isAuthPay = getStore("isAuthPay");  // 信用付费
        if (personInfoState && personInfoState == "1") {
          if (authState && authState == "1") this.$router.push({path: '/CpublishLoan'}); // 发布借款
          else if (isAuthPay && isAuthPay == "1") this.$router.push({path: '/CauthReport', query: {'from': 'mine'}});   // 信用认证
          else this.$router.push({path: '/CcreditAuth', query: {'from': 'mine'}});   // 信用认证
        } else this.$router.push({path: '/CeditPersonInfo', query: {'from': 'mine'}});   // 个人信息
      },
      fbLend() {  // 发布出借
        let personInfoState = getStore("personInfoState");
        if (personInfoState && personInfoState == "1") this.$router.push({path: '/CpublishLend'});
        else this.$router.push({path: '/Cverified', query: {'from': 'minePublish'}});
      },
      setup() { // 设置
        this.$router.push({path: '/Lsetup'})
      },
      callPhone() { // 贷款咨询弹出框
        let userId = getStore("userId");
        let token = getStore("token");
        if (!userId || !token) return Toast({message: '尚未登录', position: 'bottom', duration: 1500});
        let params = {
          funCode: 110011
        }
        All(params).then(res => {
//        console.log(res)
          if (res.retCode === '0000') {
            MessageBox.confirm('', {
              title: '呼叫客服',
              message: '确认拨打电话：' + res.retData + '吗？',
              confirmButtonText: '呼叫'
            }).then(action => {
              window.location.href = "tel:" + res.retData
            })
          } else {
            Toast({
              message: res.retMsg,
              position: 'bottom',
              duration: 2000
            });
          }
        })
      },
      pageState() {
        let userType = getStore('userType');
        let mobile = getStore('mobile');
        let name = getStore('name');
        this.mineType = userType ? 2 : 1;
        if (!mobile || !userType) return;
        this.name = name;
        this.phone = mobile.substr(0, 3) + '****' + mobile.substr(mobile.length - 4);
        this.loanType = userType;
      }
    },
    computed: {},
    mounted() {
      let this_ = this;
      this.init()
      // 刷新主页获取余额
      All({funCode: 110026}).then(res => {
        if (res.retCode !== "0000") return;
        this_.RECORD_USERINFO(res.retData);
        this_.balance = getStore("balance");

        // 判断信用报告是否已认证
        let authState = getStore("authState");
        if (authState && authState === "1") this_.status_xybg = "已认证";
        // 判断身份认证是否已认证
        let personInfoState = getStore("personInfoState");
        if (personInfoState && personInfoState === "1") this_.status_sfrz = "已认证";
        // 登录后头像
        if (getStore("iconUrl")) this_.iconUrl = getStore("iconUrl");
        else this_.iconUrl = require("../images/touxiang@2x.png");
        let userId = getStore("userId");
        let token = getStore("token");
        if (!userId || !token)return this.$router.push({'path': '/login'});
        this.pageState();
      });
    },
    updated () {
    },
    filters: {
      iconEmpty(val) {
        if (!val) return require("../images/touxiang@2x.png");
        else return val;
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  .mine {
    flex: 1;
    background: #f3f5f8;

    .mineMy {
      width: 100%;
      height: 0.8rem;
      background: #e01625;

      span {
        display: inline-block;
        width: 100%;
        height: 0.8rem;
        line-height: 0.8rem;
        font-size: 0.278rem;
        text-align: center;
        color: white;
      }
    }
    .mine-head {
      width: 96%;
      margin-left: 2%;
      height: 1.453rem;
      margin-top: 0.309rem;
      background: white;

      .head-left {
        display: inline-block;
        position: relative;
        width: 70%;
        height: 1.453rem;
        margin-left: 0.2rem;

        span {
          display: inline-block;
          width: 100%;
          font-size: 0.2rem;
          color: #999999;
          margin-top: 0.15rem;
        }
        span:nth-child(1) {
          font-size: 0.247rem;
          color: #000;
          margin-top: 0.4rem;
        }
        span:nth-child(3) {
          font-size: 0.2rem;
          display: inline;
          color: #e01625;
          margin-top: -0.4rem;
          width: 10%;
          position: absolute;
          right: 0;
        }
        img:nth-child(3) {
          width: 0.12rem;
          float: right;
          margin-top: -0.3rem;
          margin-right: -0.1rem;
        }
      }
      .head-right {
        float: left;
        width: 18%;
        height: 1.453rem;
        line-height: 1.453rem;
        margin-left: 0.2rem;

        img:nth-child(1) {
          width: 0.989rem;
          height: 0.989rem;
          vertical-align: middle;
        }
      }
    }
    .mineContent {
      width: 96%;
      margin-left: 2%;
      margin-top: 0.309rem;

      .mint-cell-wrapper {

      }
      .mint-cell:last-child {
        background-image: none;
      }
      .invite {
        margin-top: 0.2rem;
      }
      .mint-cell {
        border-radius: 0.05rem;
        height: 0.773rem;
        min-height: 0.773rem;
        margin-bottom: 0.01rem;
        /*margin-top: 0.155rem;*/
        .mint-cell-wrapper {
          background-image: none;
          font-size: 0.231rem;

          .mint-cell-title {
            span {
              margin-left: (40rem/64.687);
            }
            img {
              width: 0.4rem;
              position: absolute;
              top: 0.2rem;
              left: (10rem/64.687);
            }
          }
          .mint-cell-value {
            margin-right: (20rem/64.687);
            .message {
              color: #fff;
              background: #e01625;
              border-radius: 50%;
              display: inline-block;
              width: 0.25rem;
              height: 0.25rem;
              text-align: center;
              line-height: 0.25rem;
              font-size: 0.12rem;
            }
          }

        }
        .mint-cell-allow-right::after {
          width: 0.12rem;
          height: 0.12rem;
          border: 0.02rem solid rgb(186, 186, 186);
          border-bottom-width: 0;
          border-left-width: 0;
          right: 0.247rem;
        }

      }
      span {
        float: left;
      }
    }

    .mineCore {
      width: 100%;
      height: 0.6rem;
      line-height: 0.6rem;
      background: white;
      margin-top: 0.2rem;

      img:nth-child(1) {
        width: 0.4rem;
        vertical-align: middle;
        margin-left: 0.2rem;
      }
      span:nth-child(2) {
        font-size: 0.22rem;
        display: inline-block;
        width: 81.5%;
        color: black;
        vertical-align: middle;
        margin-left: 0.1rem;
      }
      img:nth-child(3) {
        width: 0.15rem;
        vertical-align: middle;
      }
    }
    .mint-msgbox {

      .mint-msgbox-title {
        font-weight: 500;
        color: black;
      }
      .mint-msgbox-content {
        height: 1rem;
        min-height: 1rem;
        .mint-msgbox-message {
          height: 1rem;
          line-height: 1rem;
          font-size: 0.25rem;
          color: black;
        }
      }
      .mint-msgbox-btns {
        height: 0.6rem;
        line-height: 0.6rem;

        .mint-msgbox-btn {
          font-size: 0.25rem;

        }
        .mint-msgbox-confirm {
          color: blue;
        }
      }
    }

  }

</style>
