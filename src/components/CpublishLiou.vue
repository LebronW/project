<template>
  <div id="CpublishLiou" class="main">
    <mt-header fixed class="index-header" title="发起借条">
      <router-link to="" slot="left" @click.native="history">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <div class="container">
      <form class="form">
        <section>
          <mt-field class="les3" label="出借人" placeholder="请填写出借人姓名" v-model="lenderName" :disabled='disabled'></mt-field>
          <mt-field class="les3" label="借款人" placeholder="请填写借款人姓名" v-model="loanerName"></mt-field>
          <mt-field class="les3" label="手机号" placeholder="请填写借款人手机号" type="number" v-model="loanerPhone"></mt-field>
        </section>
        <section class="t10 t11">
          <mt-field label="出借金额" placeholder="请填写出借金额" type="number" v-model="money"></mt-field>
          <mt-field label="年化利率" placeholder="请填写年化利率" type="number" v-model="loanRate" :state='fRateState'>
            <!--<span>%</span>-->
          </mt-field>
          <mt-cell class="form-cell" title="出借日期" :value="loanDate" is-link @click.native="open('dp_loan')"></mt-cell>
        </section>
        <section class="t10">
          <mt-cell class="form-cell" title="还款日期" :value="repayDate" is-link @click.native="open('dp_repay')"></mt-cell>
          <mt-cell class="form-cell" title="借款用途" :value='forwhat' is-link @click.native="fw_pop = true"></mt-cell>
        </section>
        <div class="t10 fs">
          <input id="checkbox" type="checkbox" class="is-read"/><label for="checkbox"></label>已阅读并同意
          <a @click='registerAgreement' style="color: #e01625">《借款协议》</a>
        </div>
      </form>
    </div>
    <mt-button class="submit" v-show="isShow" @click="submit">发起借条</mt-button>

    <mt-datetime-picker ref="dp_loan" type="date" @confirm="DPLChange" v-model='startDate'></mt-datetime-picker>
    <mt-datetime-picker ref="dp_repay" type="date" @confirm="DPRChange" v-model='startDate'></mt-datetime-picker>
    <mt-popup class="c-pop" v-model="fw_pop" position="bottom" popup-transition="popup-fade">
      <div class="head">
        <div>
          <button @click="fw_pop = false">取消</button>
        </div>
        <div>
          <h2>借款用途</h2>
        </div>
        <div>
          <button @click="fw_pop = false">确定</button>
        </div>
      </div>
      <mt-picker :slots="fwSlots" @change="FWChange"></mt-picker>
    </mt-popup>
    <transition name="fade">
      <div class="mint-toast is-pbottom mint-toast-pop-leave-to mc-toast" v-show="isPublish">
        <img src="../images/icon_gou@2x.png" alt="">
        <span class="mint-toast-text">发布成功</span>
      </div>
    </transition>
  </div>
</template>
<script>
  import {Toast} from 'mint-ui'
  import {All} from './../api/api'
  import {getStore} from '../config/mUtils'
  export default {
    name: "CpublishLiou",
    data() {
      return {
        startDate: null,
        isPublish: false,
        lenderName: '',
        loanerName: '',
        loanerPhone: '',
        money: '',
        loanRate: '',
        loanDate: '请选择出借日期',
        repayDate: '请选择还款日期',
        forwhat: '请选择借款用途',
        isShow: true,
        fw_pop: false,
        fwSlots: [{
          flex: 1,
          values: ['个体经营', '消费', '租房', '旅游'],
          textAlign: 'center'
        }],
        receiptId: null, // 重新发起借条id
        disabled: false
      }
    },
    mounted() {
      this.dataTime();
      this.lenderName = getStore('name');
      this.loanerName = this.$route.query.userName;
      this.loanerPhone = this.$route.query.userPhone;

      let vm = this;
      /**
       *  有弹出输入框的时候，隐藏提交按钮
       */
      let winHeight = document.documentElement.clientHeight;
      window.onresize = function () {
        let thisHeight = document.documentElement.clientHeight;
        vm.isShow = winHeight - thisHeight <= 50;
      };
      this.receiptId = this.$route.query.receiptId
      if (this.receiptId) this.againInit()
    },
    methods: {
      history() {
        this.$router.push({path: '/Liou'});
      },
      dataTime() {
        var data = new Date()
        var nian = data.getFullYear()
        var yue = data.getMonth() + 1
        var ri = data.getDate()
        this.startDate = nian + '-' + yue + '-' + ri
      },
      DPLChange(value) {
        this.loanDate = getNowFormatDate(value);
      },
      DPRChange(value) {
        this.repayDate = getNowFormatDate(value);
      },
      FWChange(picker, values) {
        if (this.fw_pop === true) {
          this.forwhat = values[0];
        }
      },
      open(picker) {
        this.$refs[picker].open();
      },
      registerAgreement() { // 借款协议
        let this_ = this;
        var userId = getStore('userId');
        if (this_.lenderName) {
          if (this_.loanerName) {
            if (this_.loanerPhone) {
              this_.$store.dispatch('showLoading');
              let params = {
                funCode: 110035, // 功能码
                inputLendUser: this_.lenderName,
                inputBorrowUser: this_.loanerName,
                inputBorrowMobile: this_.loanerPhone,
                lendUserId: userId
              };
              All(params).then(res => {
                this_.$store.dispatch('hideLoading');
        					console.log(res)
                if (res.retCode === '0000') {
										window.location.href = res.retData
                } else if (res.retCode !== '0000') {
                  Toast({
                    message: res.retMsg,
                    position: 'bottom',
                    duration: 2000
                  });
                }
              })
            } else {
              Toast({message: '请填写借款人电话', position: 'bottom', duration: 2000})
            }
          } else {
            Toast({message: '请填写借款人姓名', position: 'bottom', duration: 2000})
          }
        } else {
          Toast({message: '请填写出借人姓名', position: 'bottom', duration: 2000})
        }
      },
      submit() {
        let _this = this;
        var nameReg = /^[\u4e00-\u9fa5]+(·[\u4e00-\u9fa5]+)*$/
        var phoneReg = /^1[3|4|5|6|7|8|9][0-9]{9}$/
        if (_this.lenderName) {
          if (nameReg.test(_this.lenderName)) {
            if (_this.loanerName) {
              if (nameReg.test(_this.loanerName)) {
                if (_this.loanerPhone) {
                  if (phoneReg.test(_this.loanerPhone)) {
                    if (_this.money) {
                      if (_this.loanRate) {
                        if (_this.loanDate !== '请选择出借日期') {
                          if (_this.repayDate !== '请选择还款日期') {
                            if (_this.forwhat !== '请选择借款用途') {
                              _this.$store.dispatch('showLoading');
                              var userId = getStore('userId');
                              let params = {
                                funCode: 120001,
                                inputLendUser: _this.lenderName,
                                inputBorrowUser: _this.loanerName,
                                inputBorrowMobile: _this.loanerPhone,
                                inputLoanAmount: _this.money,
                                inputLoanTime: _this.loanDate,
                                inputRepayTime: _this.repayDate,
                                inputPurpose: _this.forwhat,
                                feeRate: _this.loanRate / 100,
                                lendUserId: userId
                              }
//                              console.log(params)
                              All(params).then(res => {
//                                console.log(res)
                                _this.$store.dispatch('hideLoading');
                                if (res.retCode === '0000') {
                                  _this.isPublish = true;
                                  window.setTimeout(function () {
                                    _this.isPublish = false;
                                    _this.$router.push({path: '/Liou'})  // 借条列表
                                  }, 1500);
                                } else if (res.retCode === '7777') {
                                  Toast({
                                    message: res.retMsg,
                                    position: 'bottom',
                                    duration: 2000
                                  });
                                  _this.$router.push({path: '/login'})
                                } else {
                                  Toast({
                                    message: res.retMsg,
                                    position: 'bottom',
                                    duration: 2000
                                  });
                                }
                              })
                            } else {
                              Toast({message: '请选择借款用途', position: 'bottom', duration: 2000})
                            }
                          } else {
                            Toast({message: '请选择还款日期', position: 'bottom', duration: 2000})
                          }
                        } else {
                          Toast({message: '请选择出借日期', position: 'bottom', duration: 2000})
                        }
                      } else {
                        Toast({message: '请填写年华利率', position: 'bottom', duration: 2000})
                      }
                    } else {
                      Toast({message: '请填写出借金额', position: 'bottom', duration: 2000})
                    }
                  } else {
                    Toast({message: '请填写正确的电话', position: 'bottom', duration: 2000})
                  }
                } else {
                  Toast({message: '请填写借款人电话', position: 'bottom', duration: 2000})
                }
              } else {
                Toast({message: '请填写正确的借款人姓名', position: 'bottom', duration: 2000})
              }
            } else {
              Toast({message: '请填写借款人姓名', position: 'bottom', duration: 2000})
            }
          } else {
            Toast({message: '请填写正确的出借人姓名', position: 'bottom', duration: 2000})
          }
        } else {
          Toast({message: '请填写出借人姓名', position: 'bottom', duration: 2000})
        }
      },
      againInit() {
        let params = {
          funCode: 120005,
          receiptId: this.receiptId
        }
        console.log(params)
        All(params).then(res => {
          console.log(res)
          if (res.retCode === '0000') {
            this.forwhat = res.retData.inputPurpose
            this.loanRate = res.retData.feeRate * 100
            this.lenderName = res.retData.inputLendUser
            this.loanerName = res.retData.inputBorrowUser
            this.loanerPhone = res.retData.inputBorrowMobile
            this.money = res.retData.inputLoanAmount
            this.loanDate = res.retData.inputLoanTime
            this.repayDate = res.retData.inputRepayTime
          } else {
            Toast({
              message: res.retMsg,
              position: 'bottom',
              duration: 2000
            })
          }
        })
      }
    },
    components: {
    },
    computed: {
      fRateState() {
        if (this.loanRate > 36) {
          this.loanRate = 36;
          Toast({
            message: '年化利率为1%~36%',
            position: 'bottom',
            duration: 2000
          });
        }
        if (this.loanRate.length > 0 && this.loanRate < 1) {
          this.loanRate = 1;
          Toast({
            message: '年化利率为1%~36%',
            position: 'bottom',
            duration: 2000
          });
        }
      }
    },       // 计算属性是基于它们的依赖进行缓存的。计算属性只有在它的相关依赖发生改变时才会重新求值
    watch: {},
    filters: {}
  }

  function getNowFormatDate(date) {
    let seperator1 = "-";
    let month = date.getMonth() + 1;
    let strDate = date.getDate();
    if (month >= 1 && month <= 9) {
      month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
      strDate = "0" + strDate;
    }
    let currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate;
    return currentdate;
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss">
  @import "../common/sass/Cyucb";

  #CpublishLiou {
    .form {
			/*position: absolute;*/
	    background: #eeeff6;
	    /*width: 100%;*/
	    /*height: 100%;*/

			a {
				width: 100%;

				.mint-cell-wrapper {
					width: 100%;
				}
			}
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
			a .mint-cell-title {
				width: 25%;
			}
      a .mint-cell-value {
        margin-top: rem(4rem);
        input {
          text-align: right;
          margin-left: 0.82rem;
          padding-right: rem(10rem);
          color: #888888;
          background: white;
        }
      }

      /*a .mint-cell-allow-right::after{*/
      /*border-color: #888888;*/
      /*}*/
    }
    .form-cell .mint-cell-value.is-link {
      margin-right: rem(10rem);
      color: #888888;
    }

    .mint-datetime .picker-toolbar {
      display: -webkit-flex; /* Safari */
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: rem(70rem);
      border-bottom: 1px solid #eee;
      padding: 0 rem(10rem);

      .mint-datetime-action {
        font-size: rem(18rem);
        color: #000;
      }
      .mint-datetime-cancel {
        text-align: left;
      }
      .mint-datetime-confirm {
        text-align: right;
      }
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
        button {
          font-size: rem(18rem);
          border: none;
          background: transparent;
          outline: none;
        }
      }
    }

    .fs {
      font-size: rem(14rem);
      color: #888;
    }
    .is-read {
      display: none;
    }
    .is-read + label {
      width: rem(15rem);
      height: rem(15rem);
      background: url("../images/frame2@2x.png") no-repeat;
      background-size: rem(15rem) rem(15rem);
      display: inline-block;
      position: relative;
      margin-right: rem(8rem);
      vertical-align: bottom;
    }
    .is-read:checked + label {
      background: url("../images/frame1@2x.png") no-repeat;
      background-size: rem(15rem) rem(15rem);
      margin-right: rem(8rem);
      vertical-align: bottom;
    }

    .mc-toast {
      padding: rem(16.5rem) rem(45rem);
      img {
        width: rem(28rem);
        height: rem(28rem);
        margin-bottom: rem(10rem);
      }
      .mint-toast-text {
        font-size: rem(14rem);
        color: #FFFFFF;
      }
    }

    .mc-toast.is-pbottom {
      left: 50%;
      bottom: 12%;
      -webkit-transform: translate(-50%, -50%);
      transform: translate(-50%, -50%);
    }

    .fade-enter-active, .fade-leave-active {
      transition: all 0.5s ease
    }
    .fade-enter, .fade-leave-active {
      opacity: 0
    }

  }

</style>
