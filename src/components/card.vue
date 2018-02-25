<template>
  <section class="card">
    <div class="cardHead">借款列表</div>
    <section class="indexContent">
      <!--<div class="fbbtn">-->
      <!--<div class="wz">-->
      <!--<span style="color: #63be71;font-size: 0.3rem;">发布出借信息</span><br/>-->
      <!--发布后借款人主动找您借款-->
      <!--</div>-->
      <!--<button class="fb" @click="fb">发布</button>-->
      <!--</div>-->
      <div class="fb-btn" @click='fb'>
        <img src="../images/btn_fb_new@2x.png" alt="">
      </div>
      <div class="is-tofixed" :class="{'sx-fixed': sxIsFixed}">
        <div class="indexContentRight">
          <span><span>TA</span>们在借款</span>
          <div @click='lScreen'>
            <span v-show='lScreenType == false'>筛选</span>
            <span v-show='lScreenType == true'>筛选</span>
            <img v-show='lScreenType == false' src="../images/btn_xia@2x.png"/>
            <img v-show='lScreenType == true' src="../images/btn_up@2x.png"/>
          </div>
        </div>
        <!--筛选层-->
        <section class="lScreen" v-show='lScreenType'>
          <div class="lScreenBox">
            <div class="left">
              <div class="top">
                <span></span>
                <span>芝麻分</span>
              </div>
              <div class="bottom">
              <span class="zhima" :class="{'active': zhimaSelect == index}" v-for='(item, index) in zhimaList'
                    @click='zhima(index)'>{{item.value}}</span>
              </div>
            </div>
            <div class="right">
              <div class="top">
                <span></span>
                <span>借款金额</span>
              </div>
              <div class="bottom">
                <span class="money" v-for='(item, index) in moneyList' @click='money(index)'>{{item.value}}</span>
              </div>
            </div>
            <div class="Lchoice">
              <span @click='screenReset'>重置</span>
              <span @click='screenConfirm'>确定</span>
            </div>
          </div>
        </section>
      </div>
    </section>
    <!--列表-->
    <section class="Llist">
      <!--每个列表-->
      <mt-loadmore :bottomPullText='bottomPullText' :top-method="loadTop" :bottom-method="loadBottom"
                   :bottom-all-loaded="allLoaded" ref="loadmore">
        <ul style="background: #f3f5f8">
          <!--<li class="indexList" v-for='(item, index) in msg' @click='fn(item)'>-->
          <!--<div class="ListImg">-->
          <!--<img :src="item.iconUrl | iconEmpty"/>-->
          <!--</div>-->
          <!--<div class="listDetailed">-->
          <!--<span>{{item.name}}</span>-->
          <!--<span>借款{{item.amountMin}}-{{item.amountMax}}元</span>-->
          <!--</div>-->
          <!--<div class="listZhima">-->
          <!--<img src="../images/zhima@2x.png"/>-->
          <!--<span>{{item.zhimaScore}}</span>-->
          <!--<span>期限{{item.daysMin}}-{{item.daysMax}}天</span>-->
          <!--</div>-->
          <!--</li>-->
          <li class="list-group" @click='fn(item)' v-for='(item, index) in msg'>
            <div class="h">
              <div class="one">
                <div class="toux"><img :src="item.iconUrl | iconEmpty" alt=""></div>
                <div class="name">{{item.name}} | <span style="color: #888;">借款人</span></div>
                <div class="dizhi">
                  <!--<img src="" alt="">-->
                  <!--<span>杭州市</span>-->
                </div>
              </div>
              <div class="two">
                <img :class="{'is-hide': !item.isAuth || item.isAuth == '0'}" src="../images/zhima@2x.png"/>
                <span :class="{'is-hide': !item.isAuth || item.isAuth == '0'}">{{item.zhimaScore}}</span>
              </div>
            </div>
            <div class="box">
              <div class="item">
                <span class="big red">{{item.amountDetail.amountDesc}} <span
                  class="small">{{item.amountDetail.amountUnit}}</span></span>
                <span class="block">借款金额</span>
              </div>
              <div class="item">
                <span class="big">{{item.daysDetail.daysDesc}} <span
                  class="small">{{item.daysDetail.daysUnit}}</span></span>
                <span class="block">期限</span>
              </div>
              <div class="item">
                <span class="big">{{item.fee}} <span class="small">%</span></span>
                <span class="block">还款利率</span>
              </div>
            </div>
            <div class="f">
              <div class="one">发布时间: {{item.publishTime}}</div>
              <div class=""></div>
              <div class="two">
                <button>借钱给他</button>
              </div>
            </div>
          </li>
        </ul>
      </mt-loadmore>

    </section>

    <!--弹出框-->
    <mt-popup class='appPopup' v-model="popupVisible" :closeOnClickModal='closeOnClickModal'>
      <h2>重要安全提示</h2>
      <span v-for="(item, index) in appPopList"
            :class="{'appSpan': index != appPopList.length - 1, 'appPhone': index == appPopList.length - 1}">{{item}}</span>
      <span class="appSpan"></span>
      <span class="appSpan"></span>
      <span class="appSpan"></span>
      <span class="appPhone"></span>
      <button class="popupClose" @click='popupClose'>我知道了</button>
    </mt-popup>

    <!--遮罩成-->
    <div class="yuc-modal" v-show="isZZ"></div>
  </section>

</template>
<script>
  /* eslint-disable */
  import {All} from './../api/api'
  import {mapMutations} from 'vuex'
  import {getStore} from '../config/mUtils'
  export default {
    data () {
      return {
        appPopList: [],
        popupVisible: false, // 重要提示
        closeOnClickModal: false,
        lScreenType: false, // 筛选层显示隐藏
        msg: [],
        bottomPullText: '上拉加载',
//        moneyArr: [],
//        zhimaArr: [],
//        moneyKey: [],
//        zhimaKey: [],
        zhimaList: [],
        moneyList: [],
        current: 1,
        allLoaded: false,
        zhimaIndex: null, // 芝麻分序号
        amountIndex: null, // 借款金额序号
        zhimaSelect: -1,
        sxIsFixed: false,
        isZZ: false
      }
    },
    methods: {
      ...mapMutations([
        'RECORD_USERINFO'
      ]),
      popupClose() { // 关闭重要提示
        this.popupVisible = false
      },
      lScreen() {
        this.lScreenType = !this.lScreenType;
        if (this.sxIsFixed) this.isZZ = !this.isZZ;
      },
      fb() { // 发布出借人信息
        let userId = getStore("userId");
        let token = getStore("token");
        let personInfoState = getStore("personInfoState");
        if (!userId || !token) return this.$router.push({path: '/login'});
        if (personInfoState && personInfoState === "1") this.$router.push({path: '/CpublishLend'});
        else this.$router.push({path: '/Cverified'});
      },
      fn(item) { // 查看详细信息
        let userId = getStore("userId");
        let token = getStore("token");
        let personInfoState = getStore("personInfoState");
        if (!userId || !token) return this.$router.push({path: '/login'});
        if (personInfoState && personInfoState === "1") {
          this.$router.push({
            path: '/CloanerInfo',
            query: {borrowerId: item.userId}
          });
        } else this.$router.push({path: '/Cverified'});

      },
      zhima(index) { // 选择芝麻分
//        var sp = document.getElementsByClassName('zhima');
//        for (var i = 0; i < sp.length; i++) {
//          sp[i].style.cssText = 'color:rgb(136,136,136);border: 0.01rem solid #e5e5e5;'
//        }
//        sp[index].style.cssText = 'color:white;border: 0.01rem solid rgb(229,229,229);background: #1b9dff;'
        this.zhimaSelect = index;
        this.zhimaIndex = this.zhimaList[index].key;
      },
      money(index) { // 选择金额
        var sp = document.getElementsByClassName('money')
        for (var i = 0; i < sp.length; i++) {
          sp[i].style.cssText = ''
        }
        sp[index].style.cssText = 'color:white;border: 0.01rem solid rgb(229,229,229);background: #e01625;'
        this.amountIndex = this.moneyList[index].key;
      },
      screenReset() { // 重置筛选
        var money = document.getElementsByClassName('money')
        var zhima = document.getElementsByClassName('zhima')
        for (var i = 0; i < money.length; i++) {
          money[i].style.cssText = 'color:rgb(136,136,136);border: 0.01rem solid #e5e5e5;'
        }
        for (var j = 0; j < zhima.length; j++) {
          zhima[j].style.cssText = 'color:rgb(136,136,136);border: 0.01rem solid #e5e5e5;'
        }
        this.current = 1;
        this.amountIndex = null;
        this.zhimaIndex = null;
        this.zhimaSelect = -1;
      },
      screenConfirm() { // 确认筛选
        this.current = 1;
        this.msg = [];
        let params = {
          funCode: 110009,
          zhimaIndex: this.zhimaIndex,
          amountIndex: this.amountIndex,
          current: 1
        };
        All(params).then(res => {
          if (res.retCode === '0000') {
            this.msg = res.retData.list;
            this.current = res.retData.current;
            this.allLoaded = res.retData.list.length < 10;
            this.lScreenType = false;
            this.isZZ = false;
          }
        })
      },
      loadTop() {
        // this.msg = [];
        // let params = {
        //   funCode: 110009,
        //   zhimaIndex: this.zhimaIndex,
        //   amountIndex: this.amountIndex,
        //   current: 1
        // };
        // All(params).then(res => {
        //   if (res.retCode === '0000') {
        //     this.msg = res.retData.list;
        //     this.current = res.retData.current;
        //     this.allLoaded = res.retData.list.length < 10;
        //     this.$refs.loadmore.onTopLoaded();
        //   }
        // })
        this.more();
        this.$refs.loadmore.onTopLoaded();
      },
      loadBottom() {
        this.current = parseInt(this.current) + 1
        let params = {
          funCode: 110009,
          zhimaIndex: this.zhimaIndex,
          amountIndex: this.amountIndex,
          current: this.current
        };
//      console.log(params)
        All(params).then(res => {
          if (res.retCode === '0000') {
//          console.log(res)
            for (let i = 0; i < res.retData.list.length; i++) {
              this.msg.push(res.retData.list[i]);
            }
            if (res.retData.list.length < 10) {
              this.allLoaded = true
            } else {
              this.allLoaded = false
            }
            // this.current = res.retData.current;
            // this.allLoaded = res.retData.list.length < 10;
            this.$refs.loadmore.onBottomLoaded();
          }
        })
      },
//      more() {
//        let params = {
//          funCode: 110009,
//          zhimaIndex: null,
//          amountIndex: null,
//          current: this.current
//        }
// //      console.log(params)
//        All(params).then(res => {
//          if (res.retCode === '0000') {
// //          console.log(res)
//            for (var i = 0; i < res.retData.list.length; i++) {
//              this.msg.push(res.retData.list[i])
//            }
//            this.current = res.retData.current
//            if (res.retData.list.length < 10) {
//              this.allLoaded = true
//            } else {
//              this.allLoaded = false
//            }
//            this.$refs.loadmore.onBottomLoaded();
//          }
//        })
//      },
//      oneMore() {
//        let params = {
//          funCode: 110009,
//          zhimaIndex: this.zhimaIndex,
//          amountIndex: this.amountIndex,
//          current: 0
//        }
//        All(params).then(res => {
//          if (res.retCode === '0000') {
//            this.msg = res.retData.list
//            if (res.retData.list.length < 10) {
//              this.allLoaded = true
//            } else {
//              this.allLoaded = false
//            }
//            this.$refs.loadmore.onTopLoaded();
//          }
//
//        })
//      },
      init() {
        sessionStorage.setItem("type", 4);
        let params = {
          funCode: 110019,
          userType: 2
        };
        All(params).then(res => {
          if (res.retCode === '0000') {
            this.moneyList = res.retData.amount;
            this.zhimaList = res.retData.zhima;
//            var moneyArr = []
//            var zhimaArr = []
//            var moneyKey = []
//            var zhimaKey = []
//            for (var i = 0; i < res.retData.amount.length; i++) {
//              moneyKey.push(res.retData.amount[i].key)
//              moneyArr.push(res.retData.amount[i].value)
//            }
//            for (var j = 0; j < res.retData.zhima.length; j++) {
//              zhimaKey.push(res.retData.zhima[j].key)
//              zhimaArr.push(res.retData.zhima[j].value)
//            }
//            this.moneyArr = moneyArr
//            this.zhimaArr = zhimaArr
//            this.moneyKey = moneyKey
//            this.zhimaKey = zhimaKey
          }
        })
        // 刷新主页
        if (getStore("token")) {
          All({funCode: 110026}).then(res => {
            // console.log(res)
            if (res.retCode !== "0000") return;
            this.RECORD_USERINFO(res.retData);

            let userType = getStore("userType");
            if (!userType || (userType != "1" && userType != "2")) this.$router.push({'path': '/LchoiceId'});
          });
        }
      },
      more() {
        let params = {
          funCode: 110009,
          zhimaIndex: this.zhimaIndex,
          amountIndex: this.amountIndex,
          current: 0
        }
        All(params).then(res => {
          if (res.retCode === '0000') {
            this.msg = res.retData.list
          }
        })
      },
      handleScroll() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
        let h = parseFloat(scrollTop) / 64.687;
        this.sxIsFixed = h >= 1.725;
        if (this.lScreenType) {
          this.isZZ = h >= 1.725;
        }
      }
    },
    mounted() {
      this.init();
      this.more();
      window.addEventListener('scroll', this.handleScroll);
    },
    computed: {
      listHeight() {
        if (this.msg && this.msg.length > 0) {
          let otherH = 1.08 + 0.68 + 0.155 + 0.9;
          let bodyH = document.body.clientHeight;
          return ((bodyH / 64.687) - otherH) + 'rem';
        }
      }
    },
    updated() {
//      let this_ = this;
//      let openCard = sessionStorage.getItem("openCard");  // 本地是否有打开此页面次数记录
//      if (getStore("token")) {
//        if (!openCard) {
//          All({funCode: 110029, status: 2}).then(res => {
//            if (res.retCode !== "0000") return;
//            this_.appPopList = res.retData;
//            this_.popupVisible = true;
//          });
//        }
//        sessionStorage.setItem("openCard", 1);
//      }
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
  @import "../common/sass/Cyucb";

  .card {
    position: absolute;
    background: #f3f5f8;
    width: 100%;
    height: 100%;
    text-align: center;
    z-index: 10;

    .cardHead {
      position: fixed;
      z-index: 10;
      width: 100%;
      height: 0.8rem;
      background: #e01625;
      color: white;
      line-height: 0.8rem;
      font-size: 0.25rem;
      font-weight: 600;
      text-align: center;
    }

    .indexContent {
      text-align: center;
      margin-top: 0.8rem;

      .fb-btn {
        height: (125rem/64.687);
        min-height: (125rem/64.687);
        width: 100%;
        position: relative;
        img {
          width: 100%;
          height: 100%;
        }
      }

      /*div.fbbtn {
        background: white;
        width: 100%;
        height: 1.08rem;
        line-height: 1.08rem;
        position: relative;

        .wz {
          line-height: 1.4;
          text-align: left;
          padding: (10rem / 64.687) (20rem / 64.687);
          color: #888888;
        }

        .fb {
          position: absolute;
          top: (18rem / 64.687);
          right: (20rem / 64.687);
          padding: (6rem / 64.687) (28rem / 64.687);
          border: 1px solid #63be71;
          color: #63be71;
          background: #ffffff;
          border-radius: (4rem / 64.687);
          outline: none;;
        }

      }*/
      .indexContentRight {

        width: 96%;
        margin-left: 2%;
        margin-top: 0.155rem;
        height: 0.68rem;
        line-height: 0.68rem;
        background: white;

        div {
          display: inline-block;
        }
        span {
          display: inline-block;
          width: 42%;
          color: rgb(136, 136, 136);
          font-size: 0.25rem;
          vertical-align: middle;
        }
        span:nth-child(1) {
          text-align: left;
          span {
            display: inline-block;
            width: 0.38rem;
            color: rgb(99, 190, 113);
            font-size: 0.28rem;
            margin-top: -0.05rem;
          }

        }
        div:nth-child(2) {
          text-align: right;
          width: 42%;
          span {
            width: 0.6rem;
            text-align: right;
            vertical-align: middle;
          }
          span:nth-child(2) {
            width: 0.6rem;
            text-align: right;
            vertical-align: middle;
            color: #e01625;
          }
          img {
            vertical-align: middle;
            width: 0.2rem;
          }
        }

      }
    }

    .mint-loadmore-bottom {
      margin-bottom: 0.16rem;
      background: #f3f5f8;
    }
    /*总列表*/
    .Llist {
      width: 100%;
      /*height: 70%;*/
      position: relative;
      .indexList {
        width: 96%;
        margin-left: 2%;
        background: white;
        margin-top: (10rem/64.687);
        height: 2rem;

        /*div {*/
        /*display: inline-block;*/
        /*height: 1.2rem;*/
        /*float: left;*/
        /*}*/
        .ListImg {
          text-align: center;
          width: 20%;
          img {

            border-radius: 0.05rem;
            margin-top: 0.231rem;
            width: 0.72rem;
            height: 0.72rem;
          }
        }
        .listDetailed {

          width: 50%;

          span {
            width: 100%;
            display: inline-block;
            text-align: left;
          }
          span:nth-child(1) {
            font-size: 0.232rem;
            font-weight: 600;
            margin-top: 0.25rem;
          }
          span:nth-child(2) {
            font-size: 0.2rem;
            color: rgb(136, 136, 136);
            margin-top: 0.2rem;
          }
        }
        .listZhima {
          text-align: center;
          float: right;
          margin-right: 0.1rem;
          width: 25%;

          img {
            width: 0.23rem;
            height: 0.28rem;
            margin-top: 0.2rem;
            margin-left: 0.3rem;
            vertical-align: middle;
          }
          span:nth-child(2) {
            display: inline-block;
            font-size: 0.216rem;
            vertical-align: middle;
            margin-top: 0.2rem;
            margin-left: 0.05rem;
            color: rgb(90, 190, 113);
          }
          span:nth-child(3) {
            display: inline-block;
            /*width: 100%;*/
            text-align: left;
            font-size: 0.2rem;
            margin-top: 0.2rem;
            color: rgb(136, 136, 136);
          }
        }
      }

    }

    .is-tofixed {
      .lScreen {
        width: 100%;
        height: 115%;
        background: rgba(0, 0, 0, 0.3);
        position: absolute;
        z-index: 20;
        margin-top: 0.155rem;

        .lScreenBox {
          width: 100%;
          height: 5rem;
          text-align: center;
          background: white;

          .left {
            width: 100%;
            height: 2rem;

            .top {
              width: 100%;
              height: 0.526rem;
              line-height: 0.526rem;

              span {
                display: inline-block;
                text-align: left;
              }
              span:nth-child(1) {
                width: 10%;
                width: 0.05rem;
                background: #e01625;
                height: 0.22rem;
                float: left;
                margin-top: 0.15rem;
              }
              span:nth-child(2) {
                width: 90%;
                font-size: 0.22rem;
                color: #000000;
                font-weight: 600;
              }
            }
            .bottom {
              width: 96%;
              margin-left: 2%;
              height: 1.5rem;

              span {
                padding: 0rem 0.2rem 0rem 0.2rem;
                display: inline-block;
                border: 0.01rem solid #e5e5e5;
                height: 0.448rem;
                border-radius: 0.05rem;
                margin-left: 0.12rem;
                line-height: 0.448rem;
                text-align: center;
                font-size: 0.22rem;
                color: rgb(136, 136, 136);
                margin-top: 0.2rem;
                float: left;
              }
              span.zhima {
                color: rgb(136, 136, 136);
                border: 0.01rem solid #e5e5e5;
              }

              span.zhima.active {
                color: white;
                border: 0.01rem solid rgb(229, 229, 229);
                background: #e01625;
              }
            }

          }
          .right {
            width: 100%;
            height: 2rem;

            .top {
              width: 100%;
              height: 0.526rem;
              line-height: 0.526rem;

              span {
                display: inline-block;
                text-align: left;
              }
              span:nth-child(1) {
                width: 10%;
                width: 0.05rem;
                background: #e01625;
                height: 0.22rem;
                float: left;
                margin-top: 0.15rem;
              }
              span:nth-child(2) {
                width: 90%;
                font-size: 0.22rem;
                color: #000000;
                font-weight: 600;
              }
            }
            .bottom {
              width: 96%;
              margin-left: 2%;
              height: 1.5rem;

              span {
                padding: 0rem 0.2rem 0rem 0.2rem;
                display: inline-block;
                border: 0.01rem solid #e5e5e5;
                height: 0.448rem;
                border-radius: 0.05rem;
                /*margin-right: 0.1rem;*/
                margin-left: 0.12rem;
                line-height: 0.448rem;
                text-align: center;
                font-size: 0.22rem;
                color: rgb(136, 136, 136);
                margin-top: 0.2rem;
                float: left;
              }
            }
          }
          .Lchoice {
            width: 100%;
            text-align: center;
            height: 0.7rem;
            margin-top: 0.25rem;
            border-top: 1px solid rgb(238, 239, 246);

            span {
              display: inline-block;
              width: 48%;
              height: 0.7rem;
              line-height: 0.7rem;
              font-size: 0.25rem;
            }
            span:nth-child(1) {
              border-right: 1px solid rgb(238, 239, 246);
            }
          }

        }
      }
    }
    .is-tofixed.sx-fixed {
      position: fixed;
      z-index: 15;
      top: 0.8rem;
      width: 100%;
      background: #f3f5f8;
      padding-bottom: 0.15459rem;
    }
    .yuc-modal {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      overflow: hidden;
      outline: 0;
      -webkit-overflow-scrolling: touch;
      background-color: rgb(0, 0, 0);
      filter: alpha(opacity=60);
      background-color: rgba(0, 0, 0, 0.4);
      z-index: 9;
    }

    .list-group {
      width: 96%;
      margin-left: 2%;
      background: white;
      margin-top: (10rem/64.687);
      height: 2.62948rem;
      border-radius: (4rem/64.687);

      .h {
        height: (43rem/64.687);
        display: -webkit-flex; /* Safari */
        display: flex;
        justify-content: flex-start;
        align-items: center;

        .one {
          flex-grow: 1;
          display: -webkit-flex; /* Safari */
          display: flex;
          justify-content: flex-start;
          align-items: center;
          .toux {
            width: (30rem/64.687);
            height: (30rem/64.687);
            margin-left: (10rem/64.687);
            img {
              width: 100%;
              height: 100%;
              border-radius: (4rem/64.687);
            }
          }
          .name {
            margin-left: (10rem/64.687);
          }
          .zhima {
            height: (20rem/64.687);
            margin-left: (10rem/64.687);
            img {
              height: 100%;
            }
          }
        }
        .two {
          flex-grow: 1;
          display: -webkit-flex; /* Safari */
          display: flex;
          justify-content: flex-end;
          align-items: center;
          padding-right: (10rem/64.687);

          img {
            height: (18rem/64.687);
          }
          span {
            color: #63be71;
            margin-left: (5rem/64.687);
          }
        }
      }
      .box {
        background-image: -webkit-linear-gradient(top, #d9d9d9, #d9d9d9 50%, transparent 50%);
        background-image: linear-gradient(180deg, #d9d9d9, #d9d9d9 50%, transparent 50%);
        background-size: 120% 1px;
        background-repeat: no-repeat;
        background-position: top left;
        background-origin: content-box;
        display: -webkit-flex; /* Safari */
        display: flex;
        justify-content: center;
        align-items: center;
        height: 1.3rem;
        .item {
          flex-grow: 1;
          .big {
            font-size: (24rem/64.687);
            color: #333;
          }
          .small {
            font-size: (14rem/64.687);
            color: #888;
          }
          .red {
            color: red;
          }
          .block {
            display: block;
            margin-top: (5rem/64.687);
            color: #888;
          }
        }
      }
      .f {
        background-image: -webkit-linear-gradient(top, #d9d9d9, #d9d9d9 50%, transparent 50%);
        background-image: linear-gradient(180deg, #d9d9d9, #d9d9d9 50%, transparent 50%);
        background-size: 120% 1px;
        background-repeat: no-repeat;
        background-position: top left;
        background-origin: content-box;
        height: (43rem/64.687);
        display: -webkit-flex; /* Safari */
        display: flex;
        justify-content: space-between;
        align-items: center;

        .one {
          margin-left: 0.15459rem;
          color: #888;
        }
        .two {
          padding-right: 0.15459rem;
          button {
            background: #e01625;
            border: none;
            color: #ffffff;
            padding: (5rem/64.687) (12rem/64.687);
            border-radius: (4rem/64.687);
            font-size: (14rem/64.687);
          }
        }
      }
    }
  }

</style>
