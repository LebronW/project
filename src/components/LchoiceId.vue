<template>
  <section class="LchoiceId">
    <div class="registerHead">
      <img src="../images/fauhuibaise.png@2x.png" @click='history'/>
      <span>选择身份</span>
    </div>
    <div class="loginForm">
      <div class="top">
        <span>请选择您的身份</span>
      </div>
      <div class="con">
        <div class="item" @click='loanOne'>
          <div class="img">
            <img v-show='loanOneType == false' src="../images/img_jkr@2x.png"/>
            <img v-show='loanOneType == true' src="../images/img_jkr_sel@2x.png"/>
          </div>
          <div class="wz">
            <h3 v-show='loanOneSpanType == false' class="OneSpan t">我是借款人</h3>
            <h3 v-show='loanOneSpanType == true' class="TOneSpan t">我是借款人</h3>
            <p>认证个人信息，可信度更高，借款速度更快<br/>通过聊天可以主动向出资人借款</p>
          </div>
        </div>
        <div class="l"></div>
        <div class="item" @click='loanTwo'>
          <div class="img">
            <img v-show='loanTwoType == false' src="../images/img_cjr@2x.png"/>
            <img v-show='loanTwoType == true' src="../images/img_cjr_sel@2x.png"/>
          </div>
          <div class="wz">
            <h3 v-show='loanTwoSpanType == false' class="OneSpan t">我是出借人</h3>
            <h3 v-show='loanTwoSpanType == true' class="TOneSpan t">我是出借人</h3>
            <p>发布出借信息，借款人主动找您借<br/>查看借款人信用报告，借款安全更有保障</p>
          </div>
        </div>
      </div>
      <!--<div class="bottom clearfix">-->
      <!--<div class="pull-left" @click='loanOne'>-->
      <!--<img v-show='loanOneType == false' src="../images/img_jkr@2x.png"/>-->
      <!--<img v-show='loanOneType == true' src="../images/img_jkr_sel@2x.png"/>-->
      <!--<span v-show='loanOneSpanType == false' class="OneSpan">我是借款人</span>-->
      <!--<span v-show='loanOneSpanType == true' class="TOneSpan">我是借款人</span>-->
      <!--</div>-->
      <!--<div class="right">-->
      <!--认证个人信息，可信度更高，借款速度更快<br/>-->
      <!--通过聊天可以主动向出资人借款-->
      <!--</div>-->
      <!--</div>-->
      <!--<div class="bottom clearfix" style="margin-top: 0.8rem;">-->
      <!--<div class="pull-left" @click='loanTwo'>-->
      <!--<img v-show='loanTwoType == false' src="../images/img_cjr@2x.png"/>-->
      <!--<img v-show='loanTwoType == true' src="../images/img_cjr_sel@2x.png"/>-->
      <!--<span v-show='loanTwoSpanType == false' class="OneSpan">我是出借人</span>-->
      <!--<span v-show='loanTwoSpanType == true' class="TOneSpan">我是出借人</span>-->
      <!--</div>-->
      <!--<div class="right">-->
      <!--发布出借信息，借款人主动找您借<br/>-->
      <!--查看借款人信用报告，借款安全更有保障-->
      <!--</div>-->
      <!--</div>-->
    </div>
    <div class="prompt">
      <span>提示：一旦选择并提交身份，不可进行更改。</span>
    </div>
    <!--<div class="next">-->
    <!--<button @click='confirmId'>确定</button>-->
    <!--</div>-->

    <mt-button class="submit" @click="confirmId">确      定</mt-button>
  </section>
</template>
<script>
  import {Toast} from 'mint-ui'
  import {All} from './../api/api'
  import {mapMutations} from 'vuex'
  import {setStore} from '../config/mUtils'
  export default {
    data () {
      return {
        loanOneType: false,
        loanOneSpanType: false,
        loanTwoType: false,
        loanTwoSpanType: false,
        userType: '' // 身份类型
      }
    },
    methods: {
      ...mapMutations([
        'TYPE_DHH'
      ]),
      history() { // 后退
        this.$router.push({path: '/login'})
      },
      loanOne() { // 选择我是借款人
        this.loanOneType = true
        this.loanOneSpanType = true
        this.userType = '2'
        this.loanTwoType = false
        this.loanTwoSpanType = false
      },
      loanTwo() { // 选择我是出借人
        this.loanTwoType = true
        this.loanTwoSpanType = true
        this.userType = '1'
        this.loanOneType = false
        this.loanOneSpanType = false
      },
      confirmId() { // 下一步
        let this_ = this;
        if (this.loanOneType === true | this.loanTwoType === true) {
          let params = {
            funCode: 110004, // 功能码
            userType: this.userType // 身份类型
          }
          All(params).then(res => {
            if (res.retCode === '0000') {
              setStore('userType', res.retData);
              if (res.retData === '1') {
//                sessionStorage.setItem("type", 4);
// //    					window.location.reload();
//                this_.$router.push({path: '/card'})
                this_.$router.push({path: '/Cverified', query: {from: 'LchoiceId'}})
              } else if (res.retData === '2') {
                sessionStorage.setItem("type", 1);
//    					window.location.reload();
                this_.$router.push({path: '/index'})
              }
            } else {
              Toast({
                message: res.retMsg,
                position: 'bottom',
                duration: 2000
              });
            }
          })
        } else {
          Toast({
            message: '请选择身份',
            position: 'bottom',
            duration: 2000
          });
        }
      }
    },
    computed: {}
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped="">
  .submit {
    width: 100%;
    border-radius: 0;
    border: none;
    background: #e01625;
    height: 0.9rem;
    color: #ffffff;
    font-size: rem(18rem);
    position: fixed;
    bottom: 0;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
    z-index: 20;
    .mint-button-text{
      font-weight: 600;
    }

  }

  .clearfix {
    &:before,
    &:after {
      content: " ";
      display: table;
    }
    &:after {
      clear: both;
    }
  }

  .LchoiceId {
    flex: 1;
    z-index: 11;
    position: fixed;
    width: 100%;
    height: 100%;
    background: #eeeff6;

    .con{
      padding: (16rem/64.687) 0;
      .item {
        display: -webkit-flex; /* Safari */
        display: flex;
        justify-content: flex-start;
        align-items: center;
        padding: (25rem/64.687) (16rem/64.687);

        .img {
          width: (80rem/64.687);
          height: (80rem/64.687);
          img {
            width: 100%;
            height: 100%;
          }
        }
        .wz {
          margin-left: (15rem/64.687);
          .OneSpan {
            color: #333;
          }
          .TOneSpan {
            color: rgb(27, 157, 255);
          }
          .t {
            font-size: (18rem/64.687);
          }
          p {
            margin-top: (5rem/64.687);
            line-height: 1.2;
            color: #888888;
          }
        }
      }
      .l{
        border-top: 0.01rem solid #e5e5e5;
        margin-left: (16rem/64.687);
        overflow: hidden;
      }
    }

    .registerHead {
      position: relative;
      height: 0.8rem;
      line-height: 0.8rem;
      background: #e01625;
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
    }

    .loginForm {
      width: 96%;
      margin-left: 2%;
      background: white;
      position: relative;
      margin-top: 0.309rem;
     // height: (440rem/64.687);

      .top {
        width: 100%;
        height: (44rem/64.687);
        line-height: (44rem/64.687);
        border-bottom: 0.01rem solid rgb(229, 229, 229);

        span {
          margin-left: 0.3rem;
          display: inline-block;
          font-size: (16rem/64.687);
          color: rgb(0, 0, 0);
          font-weight: 600;
        }
      }
      .bottom {
        width: 100%;
        padding: 0 8%;
        margin-top: (50rem/64.687);

        div.pull-left {
          display: inline-block;
          position: relative;
          float: left;
          width: 26%;

          img {
            width: 100%;
          }
          .OneSpan {
            width: 100%;
            text-align: center;
            display: inline-block;
            position: absolute;
            height: (38rem/64.687);
            line-height: (38rem/64.687);
            font-size: (14rem/64.687);
            color: rgb(136, 136, 136);
          }
          .TOneSpan {
            width: 100%;
            text-align: center;
            display: inline-block;
            position: absolute;
            height: (38rem/64.687);
            line-height: (38rem/64.687);
            font-size: (14rem/64.687);
            color: rgb(27, 157, 255);
          }
        }
        div.right {
          width: 55%;
          float: left;
          margin-left: 4%;
          color: #888888;
          margin-top: 0.3rem;
        }
      }

    }
    .prompt {
      width: 96%;
      margin-left: 2%;

      span {
        display: inline-block;
        height: (34rem/64.687);
        line-height: (34rem/64.687);
        color: rgb(136, 136, 136);
        font-size: (14rem/64.687);
      }
    }
    .next {
      button {
        outline: none;
        border: 0;
        width: 96%;
        height: (44rem/64.687);
        line-height: (44rem/64.687);
        margin-left: 2%;
        margin-top: 0.2rem;
        border-radius: 0.05rem;
        color: white;
        font-size: (15rem/64.687);
        background: #1b9dff;
      }
    }
  }

</style>
