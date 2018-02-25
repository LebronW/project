<template>
  <section class="LIdentity">
    <div class="LIdentityHead">
      <img src="../images/fauhuibaise.png@2x.png" @click='history'/>
      <span>身份认证</span>
    </div>
    <div class="LIdentityContent">
      <div>
        <span>姓名</span>
        <input type="text" placeholder="请输入真实姓名" v-model='name' maxlength="10"/>
      </div>
      <div>
        <span>身份证号</span>
        <input type="text" placeholder="请输入身份证号码" v-model='id' maxlength="18"/>
      </div>
      <div>
        <span>手机号码</span>
        <input type="number" placeholder="请输入手机号码" v-model='phone'
               oninput="if(value.length>11)value=value.slice(0,11)"/>
      </div>
    </div>
    <button @click='next'>认证</button>
  </section>
</template>
<script>
  import {All} from './../api/api'
  import {Toast} from 'mint-ui'
  import {getStore, setStore} from '../config/mUtils'
  export default {
    data () {
      return {
        name: '',
        id: '',
        phone: '',
        queryUrl: ''
      }
    },
    methods: {
      history() { // 后退
//		this.$router.push({path: '/mine'})
        this.$router.go(-1)
      },
      next() {
        var nameReg = /^[\u4e00-\u9fa5]+(·[\u4e00-\u9fa5]+)*$/
        var idReg = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
        var phoneReg = /^1[3|4|5|6|7|8|9][0-9]{9}$/
        if (this.name) {
          if (nameReg.test(this.name)) {
            if (this.id) {
              if (idReg.test(this.id)) {
                if (this.phone) {
                  if (phoneReg.test(this.phone)) {
                    let params = {
                      funCode: 130007,
                      realName: this.name,
                      cardId: this.id
                    }
                    All(params).then(res => {
                      console.log(res)
                      if (res.retCode === '0000') {
                        var imAccid = getStore('imAccid');
                        let params = {
                          funCode: 110005,
                          name: this.name,
                          cardId: this.id,
                          authMobile: this.phone,
                          imAccid: imAccid
                        }
                        All(params).then(res => {
                          console.log(res)
                          if (res.retCode === '0000') {
                            setStore("personInfoState", "1");
                            if (this.queryUrl && this.queryUrl === "mineIdAuth") this.$router.push({path: '/mine'});
                            else this.$router.push({path: '/CpublishLend'});
                          } else if (res.retCode === '7777') {
                            Toast({
                              message: res.retMsg,
                              position: 'bottom',
                              duration: 2000
                            });
                            this.$router.push({path: '/login'})
                          } else {
                            Toast({
                              message: res.retMsg,
                              position: 'bottom',
                              duration: 2000
                            });
                          }
                        })
                      } else if (res.retCode === '250010') {
                        Toast({
                          message: res.retMsg,
                          position: 'bottom',
                          duration: 2000
                        });
                      } else if (res.retCode === '7777') {
                        Toast({
                          message: res.retMsg,
                          position: 'bottom',
                          duration: 2000
                        });
                        this.$router.push({path: '/login'})
                      }
                    })
                  } else {
                    Toast({
                      message: '请输入正确的手机号码',
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
              } else {
                Toast({
                  message: '请输入正确的身份证号码',
                  position: 'bottom',
                  duration: 2000
                });
              }
            } else {
              Toast({
                message: '请输入身份证号码',
                position: 'bottom',
                duration: 2000
              });
            }
          } else {
            Toast({
              message: '请输入正确的姓名',
              position: 'bottom',
              duration: 2000
            });
          }
        } else {
          Toast({
            message: '请输入姓名',
            position: 'bottom',
            duration: 2000
          });
        }
      }
    },
    mounted() {
      this.queryUrl = this.$route.query.from;
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  .LIdentity {
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
    }
    .LIdentityContent {
      width: 96%;
      margin-left: 2%;
      background: white;

      div {
        width: 94%;
        margin-top: (10rem/64.687);
        margin-left: 3%;
        height: (44rem/64.687);
        border-bottom: 0.01rem solid rgb(229, 229, 229);

        span {
          display: inline-block;
          width: 30%;
          height: (44rem/64.687);
          line-height: (44rem/64.687);
          font-size: (14rem/64.687);
        }

        input {
          width: 68%;
          height: (44rem/64.687);
          line-height: (44rem/64.687);
          text-align: right;
          outline: none;
          font-size: (14rem/64.687);
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

        span {
          letter-spacing: 0.45rem;
        }
      }
    }
    button {
      width: 100%;
      height: (50rem/64.687);
      background: #1b9dff;
      color: rgb(255, 255255, 255);
      outline: none;
      border: 0;
      position: absolute;
      bottom: 0;
      font-size: (16rem/64.687);
    }
  }

</style>
