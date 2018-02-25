<template>
  <section class="LIouDetails">
    <div class="detailsPageHead">
      <img src="../images/fauhuibaise.png@2x.png" @click='history'/>
      <span>借条详情</span>
    </div>
    <div class="LIouDetailsBox">
      <div class="LIouDetailsContent">
        <div class="top">
          <span
            :class="{'loanNumber': receiptStatus == 200|| receiptStatus == 300 || receiptStatus == 350 || receiptStatus == 500|| receiptStatus == 550  || receiptStatus == 100 || receiptStatus == 150, 'loanNumber1':receiptStatus == 400 || receiptStatus == 450}">借款编号{{receiptNo}}</span>
          <span
            :class="{'reimBursement': receiptStatus == 200 || receiptStatus == 400 || receiptStatus == 450, 'repayMents':receiptStatus == 300 || receiptStatus == 350, 'waitConfirmLoan':receiptStatus == 100 || receiptStatus == 150, 'loanOverdue':receiptStatus==500 || receiptStatus == 550}">{{statusExplain}}</span>
        </div>
        <div class="bottom">
          <div>
            <span
              :class="{'money1':receiptStatus == 200 || receiptStatus == 400 || receiptStatus == 450, 'money2': receiptStatus == 300 || receiptStatus == 350 || receiptStatus == 500 || receiptStatus == 550 || receiptStatus == 100 || receiptStatus == 150}">{{inputLoanAmount}} <b>元</b></span>
            <span class="loanTime">借款金额</span>
          </div>
          <div>
            <span
              :class="{'money1':receiptStatus == 200 || receiptStatus == 400 || receiptStatus == 450, 'money':receiptStatus == 300 || receiptStatus == 350 || receiptStatus == 500 || receiptStatus == 550 || receiptStatus == 100 || receiptStatus == 150}">{{inputLoanTimeDay}} <b>日</b></span>
            <span class="loanTime">出借日{{inputLoanTimeYear}}年{{inputLoanTimeMonth}}月</span>
          </div>
          <div>
            <span
              :class="{'money1':receiptStatus == 200 || receiptStatus == 400 || receiptStatus == 450, 'money':receiptStatus == 300 || receiptStatus == 350 || receiptStatus == 100 || receiptStatus == 150, 'money2': receiptStatus==500|| receiptStatus == 550}">{{inputRepayTimeDay}} <b>日</b></span>
            <span class="loanTime">还款日{{inputRepayTimeYear}}年{{inputRepayTimeMonth}}月</span>
          </div>
        </div>
      </div>
      <div class="LIouInfo">
        <div>
          <span
            :class="{'loanPeople': receiptStatus == 200 || receiptStatus == 300 || receiptStatus == 500 || receiptStatus == 550 || receiptStatus == 100 || receiptStatus == 150, 'loanPeople1':receiptStatus == 400 || receiptStatus == 450}">借款人</span>
          <span class="loanPeopleName">{{inputBorrowUser}}</span>
        </div>
        <div>
          <span
            :class="{'loanPurpose':receiptStatus == 200 || receiptStatus == 300 || receiptStatus == 500 || receiptStatus == 550 || receiptStatus == 100 || receiptStatus == 150, 'loanPurpose1':receiptStatus == 400 || receiptStatus == 450}">借款用途</span>
          <span class="loanPeopleName">{{inputPurpose}}</span>
        </div>

      </div>
      <div class="LPrompt">
        <div v-show='receiptStatus == 200'>
          <span class="loanPrompt">拒绝原因</span>
        </div>
        <div v-show='receiptStatus == 200'>
          <span>{{rejectReason}}</span>
        </div>
      </div>
      <div class="LPrompt">
        <div>
          <span
            :class="{'loanPrompt':receiptStatus == 200 || receiptStatus == 300 || receiptStatus == 500 || receiptStatus == 550 || receiptStatus == 100 || receiptStatus == 150, 'loanPrompt1':receiptStatus == 400 || receiptStatus == 450}">重要提示</span>
        </div>
        <div>
          <span v-for='item in tipsText'>{{item}}</span>
        </div>

        <div>
          <span v-show='userType == 2 && (receiptStatus == 500 || receiptStatus == 550 || receiptStatus == 300)'>提示：若已完成还款，请点击发送确认消息，出借人确认收款后，借条结清</span>
        </div>
      </div>
      <div class="check" v-show='userType == 2 && receiptStatus == 100'>
        <input id="checkbox" type="checkbox" class="is-read" v-model="ca_checkbox"/>
        <label for="checkbox"></label>已阅读并同意
        <a href="javascript:;" style="color: #1b9dff" @click='registerAgreement'>《借款协议》</a>
      </div>
      <mt-button @click='refuseLoan' class='refuseLoan' v-show='userType == 2 && receiptStatus == 100' type="primary">
        拒绝
      </mt-button>
      <mt-button @click='refuseLoan1' class='btn0' v-show='userType == 2 && receiptStatus == 100' type="primary">确认
      </mt-button>
      <mt-button @click='gainAdd' class='btn1'
                 v-show='(receiptStatus==500 || receiptStatus == 550) && address == false && userType == 1'
                 type="primary">获取通讯录
      </mt-button>
      <mt-button @click='seeAdd' class='btn1'
                 v-show='(receiptStatus == 500|| receiptStatus == 550) && address == true && userType == 1'
                 type="primary">查看通讯录
      </mt-button>
      <mt-button @click='sureLoan' class='btn'
                 v-show='userType == 1 && (receiptStatus == 300 || receiptStatus == 500 || receiptStatus == 350 || receiptStatus == 550)'
                 type="primary">确认收款
      </mt-button>
      <mt-button @click='again' class='btn2' v-show='userType == 1 && receiptStatus == 200' type="primary">重新发起
      </mt-button>
      <mt-button @click='sureLoan1' class='btn' v-show='userType == 2 && (receiptStatus == 500 || receiptStatus == 300)'
                 type="primary">发送确认信息
      </mt-button>
      <mt-button disabled class='btn3' v-show='userType == 2 && (receiptStatus == 550 || receiptStatus == 350)'
                 type="primary">已发送确认信息
      </mt-button>
    </div>
    <mt-popup class='appPopup' v-model="popupVisible" popup-transition="popup-fade">
      <h2>拒绝原因</h2>
      <textarea v-model='text' class="refuseInut" type="text" placeholder="请输入拒绝原因"/>
      <span class="refuseSpan">提示：确认拒绝，则借条不生效</span>
      <div class="refuseChoice">
        <span @click='close'>取消</span>
        <span @click='sure'>确认</span>
      </div>
    </mt-popup>

    <transition name="fade">
      <div class="mint-toast is-pbottom mint-toast-pop-leave-to mc-toast" v-show="isPublish">
        <img src="../images/icon_gou@2x.png" alt="">
        <span class="mint-toast-text">获取成功</span>
      </div>
    </transition>
  </section>

</template>
<script>
  import {MessageBox, Toast} from 'mint-ui'
  import {All, callbackURL} from './../api/api'
  import {getStore} from '../config/mUtils'
  export default {
    data () {
      return {
        userType: null,
        popupVisible: false, // 拒绝借款界面
        text: '', // 拒绝内容
        address: false, // 是否获取通讯录 false：未获取成功 true： 获取成功
        isPublish: false, // 获取通讯录成功
        receiptId: null, // 借条id
        receiptNo: null,
        borrowerUserId: null, // 借款人id
        inputBorrowUser: null,
        inputLoanAmount: null,
        inputPurpose: null,
        statusExplain: null,
        inputLoanTimeYear: null, // 年
        inputLoanTimeMonth: null, // 月
        inputLoanTimeDay: null, // 日
        inputRepayTimeYear: null,
        inputRepayTimeMonth: null,
        inputRepayTimeDay: null,
        receiptStatus: null,
        rejectReason: null, // 拒绝原因
        tipsText: [], // 重要提示
        contastsPayOne: null, // 购买通讯录点券优惠
        contastsPayTwo: null, // 购买通玄录点券不优惠
        imAccid: "",
        ca_checkbox: true
      }
    },
    methods: {
      history() { // 后退
        this.$router.push({path: '/Liou'})
      },
      gainAdd() { // 获取通讯录
        let _this = this;
        var userId = getStore('userId');
        let params = {
          funCode: 110032,
          lenderUserId: userId,
          borrowerUserId: _this.borrowerUserId
        }
        All(params).then(res => {
//			console.log(res)
          if (res.retData === true) {
            // 点券充足获取通讯录
            _this.address = true
            _this.isPublish = true;
            window.setTimeout(function () {
              _this.isPublish = false;
            }, 1000);
          } else {
            MessageBox.confirm('', {
              title: '获取通讯录',
              cancelButtonText: '否',
              confirmButtonText: '是',
              message: '需要花费' + this.contastsPayOne + '点券(原价' + this.contastsPayTwo + '点券)才能查看对方通讯录，是否查看'
            }).then(action => {
              let borrowAccid = _this.imAccid;
              let lenderAccid = getStore("imAccid");
              if (!lenderAccid || !borrowAccid) return;
              // 购买通讯录
              let params = {
                funCode: 130005,
                consumeType: 1,
                consumeUserId: userId, // 借款人id
                borrowerAccid: borrowAccid,
                lenderAccid: lenderAccid,
                stampsNum: this.contastsPayOne
              };
              _this.$store.dispatch('showLoading');
              All(params).then(res => {
                _this.$store.dispatch('hideLoading');
//                console.log(res)
                if (res.retCode === '0000') {
                  _this.address = true
                  _this.isPublish = true;
                  window.setTimeout(function () {
                    _this.isPublish = false;
                  }, 1000);
                } else if (res.retCode === '300003') {
                  // 点券不足充值点券
                  MessageBox.confirm('', {
                    title: '充值点券',
                    cancelButtonText: '否',
                    confirmButtonText: '是',
                    message: '点券不足，无法获取对方通讯录' + "</br>" + '是否充值点券'
                  }).then(action => {
                    _this.$router.push({path: '/Cpaycoup'})
                  })
                } else {
                  Toast({
                    message: res.retMsg,
                    position: 'bottom',
                    duration: 2000
                  })
                }
              })
            });

          }
        })
      },
      seeAdd() { // 查看通讯录
        var userId = getStore('userId');
        this.$router.push({
          path: '/CmailList',
          query: {
            lenderUserId: userId,
            borrowerUserId: this.borrowerUserId,
            receiptStatus: this.receiptStatus,
            receiptId: this.receiptId
          }
        })
      },
      refuseLoan() { // 借款人拒绝借款
        this.popupVisible = true

      },
      refuseLoan1() { // 借款人确认
        let _this = this;
        _this.$store.dispatch('showLoading');
        let params = {
          funCode: 120004,
          receiptId: this.receiptId,
          oldStatus: this.receiptStatus,
          nextStatus: 300
        };
        All(params).then(res => {
          _this.$store.dispatch('hideLoading');
//			console.log(res)
          if (res.retCode === '0000') {
            Toast({
              message: res.retData,
              position: 'bottom',
              duration: 2000
            })
            this.$router.push({path: '/Liou'})
          }
        })
      },
      sureLoan() { // 出借人确认收款
        let this_ = this;
        this_.$store.dispatch('showLoading');
        var params = {};
        if (this.receiptStatus === 300 || this.receiptStatus === 350) {
          params = {
            funCode: 120004,
            receiptId: this.receiptId,
            oldStatus: this.receiptStatus,
            nextStatus: 400
          }
        } else if (this.receiptStatus === 500 || this.receiptStatus === 550) {
          params = {
            funCode: 120004,
            receiptId: this.receiptId,
            oldStatus: this.receiptStatus,
            nextStatus: 450
          }
        }
        All(params).then(res => {
          this_.$store.dispatch('hideLoading');
          if (res.retCode === '0000') {
            Toast({
              message: res.retData,
              position: 'bottom',
              duration: 2000
            })
            this.$router.push({path: '/Liou'})
          }
        })
      },
      again() { // 重新发起借条
        this.$router.push({path: '/CpublishLiou', query: {receiptId: this.receiptId}})
      },
      sureLoan1() { // 借款人发送确认信息
        let this_ = this;
        this_.$store.dispatch('showLoading');
        let params = {};
        if (this.receiptStatus === 300) {
          params = {
            funCode: 120004,
            receiptId: this.receiptId,
            oldStatus: this.receiptStatus,
            nextStatus: 350
          }
        } else if (this.receiptStatus === 500) {
          params = {
            funCode: 120004,
            receiptId: this.receiptId,
            oldStatus: this.receiptStatus,
            nextStatus: 550
          }
        }
        All(params).then(res => {
          this_.$store.dispatch('hideLoading');
          if (res.retCode === '0000') {
//				console.log(res)
            Toast({
              message: res.retData,
              position: 'bottom',
              duration: 2000
            });
            if (this.imAccid) window.location.href = callbackURL(`Cchat/p2p-${this.imAccid}?Liou=ok`);
//				this.$router.push({path: '/Liou'})
          }
        })
      },
      close() { // 拒绝取消
        this.popupVisible = false
      },
      sure() { // 拒绝确认
        if (this.text) {
          let params = {
            funCode: 120004,
            receiptId: this.receiptId,
            oldStatus: this.receiptStatus,
            nextStatus: 200,
            rejectReason: this.text
          }
          All(params).then(res => {
            if (res.retCode === '0000') {
              this.popupVisible = false
              Toast({
                message: res.retData,
                position: 'bottom',
                duration: 2000
              })
              this.$router.push({path: '/Liou'})
            }
          })
        } else {
          Toast({
            message: '请填写拒绝原因',
            position: 'bottom',
            duration: 2000
          })
        }

      },
      init() {
        let this_ = this;
        this_.$store.dispatch('showLoading');
        let params = {
          funCode: 110026
        }
        All(params).then(res => {
          this_.$store.dispatch('hideLoading');
//			console.log(res)
          if (res.retCode === '0000') {
            this.contastsPayOne = res.retData.contastsPay.split('_')[0]
            this.contastsPayTwo = res.retData.contastsPay.split('_')[1]

            let params = {
              funCode: 120003,
              userType: getStore('userType'),
              receiptId: this.$route.query.receiptId,
              status: this.$route.query.receiptStatus
            }
            All(params).then(res => {
//					console.log(res)
              if (res.retCode === '0000') {
                this.receiptId = res.retData.receipt.receiptId // 借条ID
                this.inputLoanAmount = res.retData.receipt.inputLoanAmount
                this.receiptNo = res.retData.receipt.receiptNo
                this.inputPurpose = res.retData.receipt.inputPurpose
                this.statusExplain = res.retData.receipt.statusExplain
                this.inputBorrowUser = res.retData.receipt.inputBorrowUser
                this.inputLoanTimeYear = res.retData.receipt.inputLoanTime.split('-')[0] // 年
                this.inputLoanTimeMonth = res.retData.receipt.inputLoanTime.split('-')[1] // 月
                this.inputLoanTimeDay = res.retData.receipt.inputLoanTime.split('-')[2] // 日
                this.inputRepayTimeYear = res.retData.receipt.inputRepayTime.split('-')[0]
                this.inputRepayTimeMonth = res.retData.receipt.inputRepayTime.split('-')[1]
                this.inputRepayTimeDay = res.retData.receipt.inputRepayTime.split('-')[2]
                this.receiptStatus = res.retData.receipt.receiptStatus
                this.rejectReason = res.retData.receipt.rejectReason
                this.tipsText = res.retData.tipsText
                this.borrowerUserId = res.retData.receipt.borrowUserId
                this.imAccid = res.retData.imAccid
              } else if (res.retCode === '7777') {
                this.$router.push({path: '/login'})
              }
            })
          } else if (res.retCode === '7777') {
            this.$router.push({path: '/login'})
          }
        })
      },
      registerAgreement() {
        let this_ = this;
        this_.$store.dispatch('showLoading');
        if (!this_.receiptId) return;
        All({funCode: 110035, receiptId: this_.receiptId}).then(res => {
          this_.$store.dispatch('hideLoading');
          if (res.retCode !== "0000") Toast({message: '获取失败，请重试', position: 'bottom', duration: 1500});
          window.location.href = res.retData
        })
      }
    },
    computed: {},
    mounted() {
      this.init()
    },
    updated () {
      this.userType = getStore('userType');
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../common/sass/Cyucb";

  .LIouDetails {
    flex: 1;
    z-index: 11;
    /*position: fixed;*/
    width: 100%;
    /*height: 15rem;*/
    background: #eeeff6;

    .detailsPageHead {
      position: fixed;
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
    .LIouDetailsBox {
      margin-top: 1rem;
    }

    .LIouDetailsContent {
      width: 96%;
      margin-left: 2%;
      border-radius: 0.05rem;
      margin-top: 0.2rem;
      background: white;

      .top {
        width: 94%;
        margin-left: 3%;
        border-bottom: 0.01rem solid rgb(229, 229, 229);
        height: (44rem/64.687);

        span {
          display: inline-block;
          width: 60.2%;
          height: (44rem/64.687);
          line-height: (44rem/64.687);
          font-size: (15rem/64.687);
        }
        /*待确认/代还款编号*/
        .loanNumber {
          margin-left: (10rem/64.687);
        }
        .loanNumber1 {
          margin-left: (10rem/64.687);
          color: rgb(136, 136, 136);
          /*color: red;*/
        }
        /*待确认*/
        .waitConfirmLoan {
          width: 34%;
          text-align: right;
          color: rgb(99, 190, 113);
        }
        /*代还款*/
        .repayMents {
          width: 34%;
          text-align: right;
          color: #1b9dff;
        }
        /*已还款*/
        .reimBursement {
          width: 34%;
          text-align: right;
          color: rgb(136, 136, 136);
        }
        /*已逾期*/
        .loanOverdue {
          width: 34%;
          text-align: right;
          color: #ff4400;
        }
      }
      .bottom {
        width: 94%;
        margin-left: 3%;
        height: (109rem/64.687);
        background: white;

        div {
          display: inline-block;
          text-align: center;
          height: (109rem/64.687);
          width: 30%;

          span {
            display: inline-block;
            width: 100%;
          }
          .money {
            margin-top: (27rem/64.687);
            font-size: (24rem/64.687);

            b {
              font-size: (12rem/64.687);
              color: rgb(136, 136, 136);
            }
          }
          .money1 {
            margin-top: (27rem/64.687);
            font-size: (24rem/64.687);
            color: rgb(136, 136, 136);

            b {
              font-size: (12rem/64.687);
              color: rgb(136, 136, 136);
            }
          }
          .money2 {
            margin-top: (27rem/64.687);
            font-size: (24rem/64.687);
            color: #ff4400;

            b {
              font-size: (12rem/64.687);
              color: rgb(136, 136, 136);
            }
          }
          .loanTime {
            font-size: (12rem/64.687);
            color: rgb(136, 136, 136);
            margin-top: (10rem/64.687);
          }
        }
        div:nth-child(1) {
          span {
            text-align: left;
            margin-left: (10rem/64.687);
          }
        }
        div:nth-child(3) {
          span {
            text-align: right;
          }
        }
      }
    }
    .LIouInfo {
      width: 96%;
      margin-left: 2%;
      border-radius: 0.05rem;
      margin-top: 0.2rem;
      background: white;

      div {
        width: 94%;
        margin-left: 3%;
        height: (44rem/64.687);
        line-height: (44rem/64.687);

        span {
          display: inline-block;
          width: 47.2%;
          font-size: (15rem/64.687);
        }
        .loanPeople {
          margin-left: (10rem/64.687);
          letter-spacing: 0.13rem;
        }
        .loanPeople1 {
          color: rgb(136, 136, 136);
          margin-left: (10rem/64.687);
          letter-spacing: 0.13rem;
        }
        .loanPeopleName {
          text-align: right;
          color: rgb(136, 136, 136);
        }
        .loanPurpose {
          margin-left: (10rem/64.687);
        }
        .loanPurpose1 {
          color: rgb(136, 136, 136);
          margin-left: (10rem/64.687);
        }
      }
      div:nth-child(1) {
        border-bottom: 0.01rem solid rgb(229, 229, 229);
      }
    }
    .LPrompt {
      width: 96%;
      margin-left: 2%;
      border-radius: 0.05rem;
      margin-top: 0.2rem;
      background: white;

      div:nth-child(1) {
        width: 94%;
        margin-left: 3%;
        height: (44rem/64.687);
        line-height: (44rem/64.687);
        border-bottom: 0.01rem solid rgb(229, 229, 229);
        .loanPrompt {
          margin-left: (10rem/64.687);
          font-size: (15rem/64.687);
        }
        .loanPrompt1 {
          margin-left: (10rem/64.687);
          color: rgb(136, 136, 136);
        }
      }
      div:nth-child(2) {
        width: 94%;
        margin-top: 0.3rem;
        margin-left: 3%;

        span {
          display: inline-block;
          margin-left: (10rem/64.687);
          font-size: (13rem/64.687);
          color: rgb(136, 136, 136);
          line-height: 0.35rem;
          word-break: break-all;
        }
        span:nth-last-child(1) {
          margin-bottom: 0.2rem;
        }
      }
      div:nth-child(3) {
        width: 94%;
        margin-top: 0.3rem;
        margin-left: 3%;

        span {
          display: inline-block;
          color: rgb(27, 157, 255);
          font-size: (12rem/64.687);
          line-height: 0.3rem;
          margin-bottom: 0.5rem;

        }
      }
    }
    /*拒绝借款*/
    .refuseLoan {
      width: 96%;
      margin-left: 2%;
      height: (44rem/64.687);
      line-height: (44rem/64.687);
      margin-bottom: (10rem/64.687);
      background: white;
      font-size: (16rem/64.687);
      color: rgb(136, 136, 136);
    }
    .btn0 {
      width: 96%;
      margin-left: 2%;
      height: (44rem/64.687);
      line-height: (44rem/64.687);
      margin-bottom: (10rem/64.687);
      background: #1b9dff;
      font-size: (16rem/64.687);
      color: #FFFFFF;
    }
    .btn {
      width: 96%;
      margin-left: 2%;
      height: (44rem/64.687);
      line-height: (44rem/64.687);
      /*position: absolute;*/
      margin-top: (10rem/64.687);
      margin-bottom: (20rem/64.687);
      background: #1b9dff;
      font-size: (16rem/64.687);
      color: #FFFFFF;
    }
    .btn1 {
      width: 96%;
      margin-left: 2%;
      height: (44rem/64.687);
      line-height: (44rem/64.687);
      /*position: absolute;*/
      margin-top: (42rem/64.687);
      background: #FFFFFF;
      font-size: (16rem/64.687);
      color: rgb(136, 136, 136);
    }
    .btn2 {
      width: 96%;
      margin-left: 2%;
      height: (44rem/64.687);
      line-height: (44rem/64.687);
      margin-top: (20rem/64.687);
      margin-bottom: (20rem/64.687);
      background: #e01625;
      font-size: (16rem/64.687);
      color: #FFFFFF;
    }
    .btn3 {
      width: 96%;
      margin-left: 2%;
      height: (44rem/64.687);
      line-height: (44rem/64.687);
      margin-top: (20rem/64.687);
      margin-bottom: (20rem/64.687);
      background: rgb(186, 186, 186);
      font-size: (16rem/64.687);
      color: #FFFFFF;
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
      bottom: 15%;
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

  .mint-msgbox {
    .mint-msgbox-header {
      padding: 0.2rem 0 0 0;

      .mint-msgbox-title {
        width: 100%;
        height: 0.5rem;
        line-height: 0.5rem;
        font-size: (18rem/64.687);
      }
    }
    .mint-msgbox-content {
      padding: 0.2rem 0 0.3rem 0;

      .mint-msgbox-message {
        width: 68%;
        margin-left: 16%;
        line-height: 0.3rem;
        font-size: (12rem/64.687);
      }
    }
    .mint-msgbox-btns {
      width: 100%;
      height: (49rem/64.687);
      line-height: (49rem/64.687);

      .mint-msgbox-btn {
        color: black;
        font-size: (16rem/64.687);
      }
    }

  }

  /*拒绝借款弹出框*/
  .appPopup {

    .refuseInut {
      width: (237rem/64.687);
      height: (104rem/64.687);
      outline: none;
      background: #f5f5f5;
      resize: none;
      border: 0;
      border-radius: 0.05rem;
      font-size: (12rem/64.687);
      line-height: 0.3rem;
    }
    .refuseSpan {
      display: inline-block;
      text-align: left;
      width: (237rem/64.687);
      margin-top: (10rem/64.687);
      color: rgb(136, 136, 136);
    }
    .refuseChoice {
      width: 100%;
      height: (49rem/64.687);
      line-height: (49rem/64.687);
      margin-top: 0.5rem;
      border-top: 0.01rem solid rgb(229, 229, 229);
      border-radius: 0 0 0.05rem 0.05rem;
      display: -webkit-flex; /* Safari */
      display: flex;
      justify-content: center;

      span {
        display: inline-block;
        flex-grow: 1;
      }
      span:nth-child(1) {
        border-right: 0.01rem solid rgb(229, 229, 229);
      }
    }
  }

  .check {
    width: 96%;
    margin: 0 2% 0.3rem 2%;
    border-radius: 0.05rem;
    /*margin-top: 0.2rem;*/
    /*background: white;*/

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
  }

</style>
