<template>
  <section class="login">
    <div class="loginHead">
      <img src="../images/fauhuibaise.png@2x.png" @click='history'/>
      <span>登录注册</span>
    </div>
    <div class="loginLogo">
      <img src="../images/font_qyqjt@2x.png" alt="">
    </div>
    <div class="loginForm">
      <div>
        <span>手机号</span>
        <input type="number" placeholder="请输入手机号" v-model='phone' oninput="if(value.length>11)value=value.slice(0,11)"/>
      </div>
      <div>
        <span>验证码</span>
        <input type="text" placeholder="请输入验证码" v-model='code' maxlength="6"/>
        <span @click='send'>
	    			<timer-btn class="btn btn-default" ref="btn" :second="60"></timer-btn>
	    		</span>
        <div v-show='boxType' class="forgetBox" :state='boxState' @click='box'></div>
      </div>
    </div>
    <div class="LClause">
      <div @click='LClause'>
        <img v-show='LClauseType == false' src="../images/frame1@2x.png"/>
        <img v-show='LClauseType == true' src="../images/frame2@2x.png"/>
      </div>
      <div>
        <span>阅读并同意</span>
        <a @click='registerAgreement'>《用户注册协议》</a>
      </div>
    </div>
    <div class="next">
      <button @click='login'>登录</button>
    </div>

    <div id="MsgBox" class="com-tips" v-show="agreementShow">
      <div class="msgbox-content" v-cloak="">
        <iframe :src="agreementSrc" class="iframe"></iframe>
      </div>
      <div class="msgbox-btn">
        <button class="btn" @click="agreementShow = false">确认</button>
      </div>
      <div class="v-modal" style="z-index: 2000;" @click="agreementShow = false"></div>
    </div>
  </section>
</template>
<script>
  import {Toast} from 'mint-ui'
  import {All} from './../api/api'
  import {mapMutations} from 'vuex'
  import cookie from '../NetEaseSDK/utils/cookie'
  export default {
    data () {
      return {
        LClauseType: true, // 是否同意条款状态
        loginType: null,
        phone: '', // 手机号
        code: '', // 验证码
        boxType: true, // 短信验证码状态
        userInfo: '', // 用户信息,
        queryFrom: '',
        agreementShow: false,
        agreementSrc: ""
      }
    },
    methods: {
      ...mapMutations([
        'RECORD_USERINFO'
      ]),
      send() { // 获取验证码
        let params = {
          funCode: 110002, // 功能码
          mobile: this.phone // 手机号码
        }
        All(params).then(res => {
          if (res.retCode === '0000') {
            Toast({
              message: '获取成功',
              position: 'bottom',
              duration: 2000
            });
          } else if (res.retCode !== '0000') {
            Toast({
              message: res.retMsg,
              position: 'bottom',
              duration: 2000
            });
          }
        })
      },
      LClause() { // 是否同意注册条款
        this.LClauseType = !this.LClauseType
      },
      history() { // 后退
        this.$router.push({path: '/index'})
      },
      box() { // 验证码状态
        var phoneReg = /^1[3|4|5|6|7|8|9][0-9]{9}$/
        if (this.phone) {
          if (phoneReg.test(this.phone)) {

          } else {
            Toast({
              message: '请输入正确手机号码',
              position: 'bottom',
              duration: 2000
            });
          }
        } else {
          Toast({
            message: '请输入手机号码',
            position: 'bottom',
            duration: 2000
          });
        }

      },
      login() { // 登录
        let this_ = this;
        var phoneReg = /^1[3|4|5|6|7|8|9][0-9]{9}$/;
        if (this.phone) {
          if (phoneReg.test(this.phone)) {
            if (this.code) {
              if (this.LClauseType === true) {
                let params = {
                  funCode: 110003, // 功能码
                  mobile: this.phone, // 手机号码
                  authCode: this.code, // 验证码
                  userDeviceId: 'h5', // 设备ID
                  channelId: 'h5' // 渠道
                }
                All(params).then(res => {
                  if (res.retCode === '0000') {
                    if (!res.retData.userId) {
                      alert('登录失败')
                    } else {
                      this_.RECORD_USERINFO(res.retData);
                      Toast({
                        message: '登录成功',
                        duration: 2000
                      });
                      // 本demo做一次假登录
                      // 真实场景应在此向服务器发起ajax请求
                      let account = res.retData.imAccid;
                      let sdktoken = res.retData.imToken;
                      // 服务端帐号均为小写
                      cookie.setCookie('uid', account.toLowerCase());
                      cookie.setCookie('sdktoken', sdktoken);
                      if (res.retData.userType === '2') {
                        sessionStorage.setItem("type", 1);
                        localStorage.setItem("userType", "2");
                        this.$router.push({path: '/index'})
//										window.location.reload();
//										location.reload(true);
                      } else if (res.retData.userType === '1') {
                        sessionStorage.setItem("type", 4);
                        localStorage.setItem("userType", "1");
//										window.location.reload();
                        this.$router.push({path: '/card'})
//										location.reload(true);
                      } else {
                        this.$router.push({path: '/LchoiceId'})
                      }

                    }
                  } else if (res.retCode !== '0000') {
                    Toast({
                      message: res.retMsg,
                      position: 'bottom',
                      duration: 2000
                    });
                  }

                })
              } else {
                Toast({
                  message: '请阅读并同意服务条款',
                  position: 'bottom',
                  duration: 2000
                });
              }
            } else {
              Toast({
                message: '请输入验证码',
                position: 'bottom',
                duration: 2000
              });
            }
          } else {
            Toast({
              message: '请输入正确手机号码',
              position: 'bottom',
              duration: 2000
            });
          }
        } else {
          Toast({
            message: '请输入手机号码',
            position: 'bottom',
            duration: 2000
          });
        }

      },
      registerAgreement() { // 注册协议
        let params = {
          funCode: 110001, // 功能码
          type: 1 // 协议标识
        };
        All(params).then(res => {
          if (res.retCode === '0000') {
            this.agreementSrc = res.retData.userProtocol;
            this.agreementShow = true;
          } else if (res.retCode !== '0000') {
            Toast({
              message: res.retMsg,
              position: 'bottom',
              duration: 2000
            });
          }
        })
      }
    },
    computed: {
      boxState() {
        var phoneReg = /^1[3|4|5|6|7|8|9][0-9]{9}$/
        if (phoneReg.test(this.phone)) {
          this.boxType = false
        } else {
          this.boxType = true
        }
      }
    },
    components: {
      'timer-btn': require('../components/PlugInUnit/timerbtn.vue')
    },
    mounted() {
      this.$store.dispatch('hideLoading');
//    // 本demo做一次假登录
//    // 真实场景应在此向服务器发起ajax请求
//    let account = "yuchenbin";
//    let sdktoken = 123456;
//    // 服务端帐号均为小写
//    cookie.setCookie('uid', account.toLowerCase());
//    cookie.setCookie('sdktoken', sdktoken)
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  .login {
    flex: 1;
    z-index: 11;
    position: fixed;
    width: 100%;
    height: 100%;
    background-size: 100% 100%;

    .loginHead {
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
    .loginLogo {
      width: 100%;
      text-align: center;
      img {
        width: (174rem / 64.687);
        margin: (45rem / 64.687) auto (35rem / 64.687) auto;
      }
    }
    .loginForm {
      width: 96%;
      margin-left: 2%;
      background: white;
      height: 1.515rem;
      position: relative;
      border-radius: (6rem / 64.687);

      div {
        width: 95%;
        margin-left: 5%;
        height: 0.757rem;

        span:nth-child(1) {
          display: inline-block;
          color: rgb(0, 0, 0);
          font-size: 0.25rem;
          width: 22%;
          height: 0.757rem;
          line-height: 0.757rem;
          font-weight: 600;
        }
        input {
          width: 40%;
          height: 0.7rem;
          outline: none;
          font-size: 0.25rem;
        }
        span:nth-child(3) {
          position: absolute;
          right: 0rem;
          top: 0.9rem;

          .btn {
            height: 0.5rem;
            width: 1.8rem;
            background: #FFFFFF;
            font-size: 0.25rem;
            color: #e01625;
            outline: none;
            -webkit-appearance: none;
            border: 0;
            float: right;
            position: absolute;
            right: 0.2rem;
            text-align: center;
          }
        }

        ::-webkit-input-placeholder { /* WebKit browsers */
          color: rgb(186, 186, 186);
        }
        :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
          color: rgb(186, 186, 186);
        }
        ::-moz-placeholder { /* Mozilla Firefox 19+ */
          color: rgb(186, 186, 186);
        }
        :-ms-input-placeholder { /* Internet Explorer 10+ */
          color: rgb(186, 186, 186);
        }
      }
      div:nth-child(1) {
        border-bottom: 0.01rem solid rgb(229, 229, 229);
      }
      .forgetBox {
        position: absolute;
        width: 2rem;
        height: (44rem/64.687);
        background: rgba(0, 0, 0, 0);
        right: 0rem;
        top: 0.8rem;
      }

    }
    .next {
      button {
        outline: none;
        border: 0;
        width: 96%;
        height: 0.742rem;
        margin-left: 2%;
        margin-top: 0.309rem;
        border-radius: (6rem / 64.687);
        color: white;
        font-size: 0.263rem;
        background: #e01625;
      }
    }
    .LClause {
      width: 96%;
      margin-left: 2%;
      margin-top: 0.464rem;

      div {
        display: inline-block;
      }
      div:nth-child(1) {
        vertical-align: middle;
        img {
          width: 0.3rem;
          height: 0.3rem;

        }

      }
      div:nth-child(2) {
        vertical-align: middle;

        span:nth-child(1) {
          color: #cdcdcd;
        }
        a {
          color: #e01625;
        }
      }
    }

  }

  .com-tips {
    .msgbox-content {
      position: absolute;
      border-top-left-radius: 4px;
      border-top-right-radius: 4px;
      width: 94%;
      left: 3%;
      top: 5%;
      background: #ffffff;
      height: 80%;
      z-index: 2001;
      -webkit-overflow-scrolling: touch;
      overflow-y: scroll;
      .iframe {
        height: 100%;
        width: 100%;
      }
    }
    .msgbox-btn {
      position: absolute;
      width: 94%;
      left: 3%;
      height: 6%;
      text-align: center;
      top: 85%;
      background: #ffffff;
      z-index: 2001;
      border-top: 1px solid #e5e5e5;
      border-bottom-left-radius: 4px;
      border-bottom-right-radius: 4px;
      .btn {
        height: 100%;
        line-height: 100%;
        width: 100%;
        border: none;
        background: #FFFFFF;
        border-bottom-left-radius: 4px;
        border-bottom-right-radius: 4px;
      }
    }
  }
</style>
