<template>
  <section class="Liou">
    <div class="loginHead">
      <img src="../images/fauhuibaise.png@2x.png" @click='history'/>
      <span>打借条</span>
      <span v-show='userType == 1' @click="CpublishLiou">发起借条</span>
    </div>
    <div class="LiouContent" v-show='loanList.length != 0'>
      <div class="LiouList" @click='LIouDetails(item)' v-for='item in loanList'>
        <div class="ListImg">
          <span v-show="userType == 1 && item.lendUnread == 0" class="circle">·</span>
          <span v-show="userType == 2 && item.borrowUnread == 0" class="circle">·</span>
          <img v-show='userType == 1' :src="item.borrowFaceUrl | iconEmpty"/>
          <img v-show='userType == 2' :src="item.lendFaceUrl | iconEmpty"/>
        </div>
        <div class="listDetailed">
          <span class="user" v-show='userType == 1'>{{item.inputBorrowUser}}</span>
          <span class="user" v-show='userType == 2'>{{item.inputLendUser}}</span>
          <span v-show='userType == 1' class="money">借款{{item.inputLoanAmount}}元</span>
          <span v-show='userType == 2' class="money">还款{{item.inputLoanAmount}}元</span>
        </div>
        <div class="right">
        	<span :class="{'confirmLoan': item.statusExplain == '待确认' || item.statusExplain == '待生效', 'waitLoan': item.statusExplain == '待还款', 'alreadyLoan': item.statusExplain == '已还款' || item.statusExplain == '已拒绝', 'overdueLoan': item.statusExplain == '已逾期'}">{{item.statusExplain}}</span>
          <span v-show='userType == 1' class="loanTime">出借日期：{{item.inputLoanTime}}</span>
          <span v-show='userType == 2' class="loanTime">还款日期：{{item.inputRepayTime}}</span>
        </div>
      </div>
    </div>
    <div class="LiouZanwu" v-show='loanList.length == 0'>
      <img src="../images/image_zanwu@2x.png"/>
      <span>暂无借条，快去发起~</span>
    </div>
    <router-view></router-view>
  </section>

</template>
<script>
//	import { MessageBox, Toast } from 'mint-ui'
	import { All } from './../api/api'
	import { getStore } from '../config/mUtils'
  export default {
    data () {
      return {
      	userType: null,
        loanList: [], // 借条列表
        borrwList: [],
        read: '' // 消息已读未读
      }
    },
    methods: {
      history() { // 后退
        this.$router.push({path: '/mine'})
      },
      LIouDetails(item) { // 借条详情
        this.$router.push({path: '/LIouDetails', query: {receiptStatus: item.receiptStatus, receiptId: item.receiptId}})
      },
      CpublishLiou() {  // 发起借条
        this.$router.push({path: '/CpublishLiou'})
      },
      init() {
      	this.userType = getStore('userType')
        let params = {
          userType: this.userType,
          funCode: 120002
        }
        All(params).then(res => {
          if (res.retCode === '0000') {
            this.loanList = res.retData
          }
        })
      }
    },
    mounted() {
    	this.init()
    },
    computed: {},
    components: {},
    updated () {
	  	this.userType = getStore('userType');
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
  .Liou {
    flex: 1;
    z-index: 11;
    top: 0;
    position: fixed;
    width: 100%;
    height: 100%;
    background: #eeeff6;

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
      span:nth-child(3) {
        vertical-align: middle;
        position: absolute;
        width: 1.2rem;
        right: 0;
        color: white;
        font-size: 0.25rem;
      }
    }
    .LiouContent {
    	overflow-y:scroll;
      width: 98%;
      height: 90%;
      margin-left: 2%;

      .LiouList {
        margin-top: (10rem/64.687);
        width: 100%;
        height: (74rem/64.687);
        background: white;
        position: relative;

        div {
          display: inline-block;
          height: 1.2rem;
          float: left;
        }
        .ListImg {
          width: 20%;
          .circle {
            color: #e01625;
            position: absolute;
            top: 50%;
            left: 0.05rem;
            font-size: 0.5rem;
            transform: translateY(-50%);
          }
          img {
            margin-top: 0.231rem;
            margin-left: (15rem/64.687);
            width: 0.68rem;
            border-radius: 0.1rem;
          }
        }
        .listDetailed {
          width: 35%;
          span {
            width: 100%;
            display: inline-block;
            text-align: left;
          }
          .user {
            font-size: 0.232rem;
            font-weight: 600;
            margin-top: 0.25rem;
          }
          .money {
            font-size: 0.2rem;
            color: rgb(136, 136, 136);
            margin-top: 0.2rem;
          }
        }
        .right {
          float: right;
          margin-right: (15rem/64.687);
          width: 40%;

          /*待确认还款*/
          .confirmLoan {
            display: inline-block;
            font-size: (12rem/64.687);
            vertical-align: middle;
            margin-top: 0.3rem;
            color: rgb(90, 190, 113);
            width: 100%;
            text-align: right;
          }
          /*代还款*/
          .waitLoan {
            display: inline-block;
            font-size: (12rem/64.687);
            vertical-align: middle;
            margin-top: 0.3rem;
            color: rgb(27, 157, 255);
            width: 100%;
            text-align: right;
          }
          /*已还款/已拒绝*/
          .alreadyLoan {
            display: inline-block;
            font-size: (12rem/64.687);
            vertical-align: middle;
            margin-top: 0.3rem;
            color: rgb(136, 136, 136);
            width: 100%;
            text-align: right;
          }
          /*已逾期*/
          .overdueLoan {
            display: inline-block;
            font-size: (12rem/64.687);
            vertical-align: middle;
            margin-top: 0.3rem;
            color: rgb(255, 39, 22);
            width: 100%;
            text-align: right;
          }

          .loanTime {
            display: inline-block;
            width: 100%;
            text-align: left;
            font-size: 0.2rem;
            margin-top: 0.2rem;
            color: rgb(136, 136, 136);
            text-align: right;
          }
        }
      }
    }
    .LiouZanwu {
      width: 96%;
      margin-top: 0.2rem;
      margin-left: 2%;
      text-align: center;
      background: white;

      img {
        width: 2rem;
        margin-top: 0.4rem;
      }
      span {
        display: inline-block;
        width: 100%;
        color: rgb(136, 136, 136);
        font-size: (16rem/64.687);
        margin-top: (10rem/64.687);
        margin-bottom: (62rem/64.687);
      }
    }
  }

</style>
