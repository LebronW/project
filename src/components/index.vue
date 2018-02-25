<template>
  <section class="index">
    <div class="index-head">出资人列表</div>
    <section class="indexContent">
      <!--<div><img @click='fb' src="../images/btn_fbjk@2x.png"/></div>-->
      <!--<div class="fbbtn">-->
      <!--<h3>发布出借信息</h3>-->
      <!--<h4>发布后借款人会主动找您借款</h4>-->
      <!--<div class="btn">-->
      <!--<button @click="fb">点击发布</button>-->
      <!--</div>-->
      <!--</div>-->
      <div class="fb-btn" @click='fb'>
        <img src="../images/btn_fb_jiekuan@2x.png" alt="">
      </div>
      <div class="is-tofixed" :class="{'sx-fixed': sxIsFixed}">
        <div class="indexContentRight">
          <span><span>TA</span>们在出借</span>
          <div @click='lScreen'>
            <span v-show='lScreenType == false'>筛选</span>
            <span v-show='lScreenType == true'>筛选</span>
            <img v-show='lScreenType == false' src="../images/btn_xia@2x.png"/>
            <img v-show='lScreenType == true' src="../images/btn_xia.png"/>
          </div>
        </div>
        <!--筛选层-->
        <section class="lScreen" v-show='lScreenType'>
          <div class="lScreenBox">
            <div class="left">
              <div class="top">
                <span></span>
                <span>出借金额</span>
              </div>
              <div class="bottom">
                <span class="money" v-for='(item, index) in moneyList' @click='money(index)'>{{item}}</span>
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
        <ul style="background: #f3f5f8;" :style="{'min-height': listHeight}">
          <!-- 旧版 -->
          <!--<li class="indexList" @click='listClick(item)' v-for='item in msg'>-->
          <!--<div class="ListImg">-->
          <!--<img :src="item.faceUrl | iconEmpty"/>-->
          <!--</div>-->
          <!--<div class="listDetailed">-->
          <!--<span>{{item.userName}}</span>-->
          <!--<span>{{item.desc}}</span>-->
          <!--</div>-->
          <!--<div class="listZhima">-->
          <!--<img :class="{'is-hide': !item.isAuth || item.isAuth == '0'}" src="../images/renzheng@2x.png"/>-->
          <!--<span :class="{'is-hide': !item.isAuth || item.isAuth == '0'}">已认证</span>-->
          <!--<span>{{item.timeLimit}}</span>-->
          <!--</div>-->
          <!--</li>-->
          <!-- END -->
          <!-- 新版 -->
          <li class="list-group" @click='listClick(item)' v-for='item in msg'>
            <div class="h">
              <div class="one">
                <div class="toux"><img :src="item.faceUrl | iconEmpty" alt=""></div>
                <div class="name">{{item.userName}} | <span style="color: #888;">出资人</span></div>
                <div class="dizhi">
                  <!--<img src="" alt="">-->
                  <!--<span>杭州市</span>-->
                </div>
              </div>
              <div class="two">
                <img :class="{'is-hide': !item.isAuth || item.isAuth == '0'}" src="../images/renzheng@2x.png"/>
                <span :class="{'is-hide': !item.isAuth || item.isAuth == '0'}">已认证</span>
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
                <button>向他借钱</button>
              </div>
            </div>
          </li>
          <!-- END -->
        </ul>
      </mt-loadmore>
    </section>

    <!--弹出框-->
    <mt-popup class='appPopup' v-model="popupVisible" :closeOnClickModal='closeOnClickModal'>
      <h2>重要安全提示</h2>
      <span v-for="(item, index) in appPopList"
            :class="{'appSpan': index != appPopList.length - 1, 'appPhone': index == appPopList.length - 1}">{{item}}</span>
      <!--<span class="appSpan"></span>-->
      <!--<span class="appSpan"></span>-->
      <!--<span class="appSpan"></span>-->
      <!--<span class="appPhone"></span>-->
      <button class="popupClose" @click='popupClose'>我知道了</button>
    </mt-popup>
    <!--智能推荐-->
    <mt-popup class='appPopup' v-model="pop_ir">
      <h2 style="width: 100%;">智能推荐</h2>
      <h4 style="color: #888;">以下出资人愿意借款给您</h4>
      <div class="zntj">
        <ul style="background: #ffffff;">
          <li class="indexList" @click='listClick(item)' v-for='item in irList'>
            <div class="ListImg">
              <img :src="item.faceUrl | iconEmpty"/>
            </div>
            <div class="listDetailed">
              <span>{{item.userName}}</span>
              <span>{{item.desc}}</span>
              <span>{{item.timeLimit}}</span>
            </div>
            <div class="listZhima">
              <img :class="{'is-hide': !item.isAuth || item.isAuth == '0'}" src="../images/renzheng@2x.png"/>
              <span :class="{'is-hide': !item.isAuth || item.isAuth == '0'}">已认证</span>
              <span class="btn-span">向他借钱</span>
            </div>
          </li>
        </ul>
      </div>
      <button class="popupClose" @click='popIrClose'>跳过</button>
    </mt-popup>
    <!--遮罩成-->
    <div class="yuc-modal" v-show="isZZ"></div>
  </section>
</template>
<script>
  /* eslint-disable */
  import {All} from './../api/api'
  import {mapMutations} from 'vuex'
  import {Toast} from 'mint-ui'
  import {getStore, setStore} from '../config/mUtils'
  import cookie from '../NetEaseSDK/utils/cookie'
  export default {
    data () {
      return {
        appPopList: [],
        popupVisible: false, // 重要提示
        closeOnClickModal: false,
        pop_ir: false,
        irList: [],
        lScreenType: false,
        imgList: [],
        msg: [],
        ptag: null,
        type: 2,
        moneyList: [],
        keyArr: [],
        bottomPullText: '',
        current: 1,
        allLoaded: false,
        amountIndex: null,
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
      popIrClose() { // 关闭智能推荐
        this.pop_ir = false
      },
      lScreen() { // 筛选
        this.lScreenType = !this.lScreenType;
        if (this.sxIsFixed) this.isZZ = !this.isZZ;
      },
      fb() { // 发布借款
        let userId = getStore("userId");
        let token = getStore("token");
        if (!userId || !token) return this.$router.push({path: '/login'});
        let personInfoState = getStore("personInfoState");  // 个人信息
        let isAuthPay = getStore("isAuthPay");  // 信用付费
        let authState = getStore("authState");  // 信用认证
        if (personInfoState && personInfoState == "1") {
          if (authState && authState == "1") this.$router.push({path: '/CpublishLoan'}); // 发布借款
          else if (isAuthPay && isAuthPay == "1") this.$router.push({path: '/CauthReport', query: {'from': 'index'}});   // 信用认证
          else this.$router.push({path: '/CcreditAuth', query: {'from': 'index'}});   // 信用认证
        } else this.$router.push({path: '/CeditPersonInfo', query: {'from': 'index'}});   // 个人信息
      },
      money(index) { // 选择金额
        var sp = document.getElementsByClassName('money');
        for (var i = 0; i < sp.length; i++) {
          sp[i].style.cssText = 'color:rgb(136,136,136);border: 0.01rem solid #e5e5e5;'
        }
        sp[index].style.cssText = 'color:white;border: 0.01rem solid rgb(229,229,229);background: #e01625;'
        this.amountIndex = this.keyArr[index]
      },
      loadTop() {
        // 刷新
        
//         this.msg = [];
//         All({funCode: 110017, amountIndex: this.amountIndex, current: 1}).then(res => {
// //			console.log(res)
//           if (res.retCode === '0000') {
//             this.msg = res.retData.list;
//             this.current = res.retData.current;
//             this.allLoaded = res.retData.list.length < 10;
//             this.$refs.loadmore.onTopLoaded();
//           }
//         })
        this.more();
        this.$refs.loadmore.onTopLoaded();
      },
      loadBottom() {
        this.current = parseInt(this.current) + 1
        let params = {
          funCode: 110017,
          amountIndex: this.amountIndex,
          current: this.current
        };
        All(params).then(res => {
//        console.log(res);
          if (res.retCode === '0000') {
            for (let i = 0; i < res.retData.list.length; i++) {
              this.msg.push(res.retData.list[i]);
            }
            if (res.retData.list.length < 10) {
              this.allLoaded = true
            } else {
              this.allLoaded = false
            }
            this.$refs.loadmore.onBottomLoaded();
          }
        })
      },
      init() {
        
        sessionStorage.setItem("type", 1);
        let params = {
          funCode: 110020,
          userType: 1
        };
        All(params).then(res => {
          if (res.retCode === '0000') {
            var keyArr = []
            var valueArr = []
            for (var i = 0; i < res.retData.length; i++) {
              keyArr.push(res.retData[i].key)
              valueArr.push(res.retData[i].value)
            }
            this.moneyList = valueArr
            this.keyArr = keyArr
          }
        });

        // 刷新主页
        if (getStore("token")) {
          All({funCode: 110026}).then(res => {
//          console.log(res);
            if (res.retCode !== "0000") return;
            this.RECORD_USERINFO(res.retData);

            let userType = getStore("userType");
            if (!userType || (userType != "1" && userType != "2")) this.$router.push({'path': '/LchoiceId'});
          });
        }
      },
      more() {
        let params = {
          funCode: 110017,
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
      screenReset() { // 重置筛选
        let money = document.getElementsByClassName('money');
        for (let i = 0; i < money.length; i++) {
          money[i].style.cssText = 'color:rgb(136,136,136);border: 0.01rem solid #e5e5e5;'
        }
        this.current = 1;
        this.amountIndex = null;
      },
      screenConfirm() { // 确认筛选
        
        this.msg = [];
        All({funCode: 110017, amountIndex: this.amountIndex, current: 1}).then(res => {
//			console.log(res)
          if (res.retCode === '0000') {
            this.msg = res.retData.list;
            this.current = res.retData.current;
            this.allLoaded = res.retData.list.length < 10;
            this.lScreenType = false;
            this.isZZ = false;
          }
        })
      },
      listClick(item) {
        let userId = getStore("userId");
        let token = getStore("token");
        if (!userId || !token) return this.$router.push({path: '/login'});
        this.$router.push({path: '/ClenderInfo', query: {id: item.userId}});
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
    computed: {
      listHeight() {
        if (this.msg && this.msg.length > 0) {
          let otherH = 1.08 + 0.68 + 0.155 + 0.9;
          let bodyH = document.body.clientHeight;
          return ((bodyH / 64.687) - otherH) + 'rem';
        }
      }
    },
    mounted() {
      this.init();
      this.more();
      window.addEventListener('scroll', this.handleScroll);
      if (getStore("token")) {
        let opnIndex = cookie.readCookie("openIndex"); // 本地是否有打开此页面次数记录
        if (!opnIndex) {
          All({funCode: 110029, status: 3}).then(res => {
            if (res.retCode != "0000") return;
            this.appPopList = res.retData;
            this.popupVisible = true;
          });

          // 智能推荐
          All({funCode: 110027}).then(res => {
//        console.log(res.retData);
            if (res.retCode != "0000" || !res.retData || res.retData.length == 0) return;
            this.irList = res.retData;
            this.pop_ir = true;
          })
        }
        cookie.setCookie("openIndex", 1);

        let zntj = this.$route.query.zntj;
        if (zntj && zntj == "1") {
          // 智能推荐
          All({funCode: 110027}).then(res => {
//        console.log(res.retData);
            if (res.retCode != "0000" || !res.retData || res.retData.length == 0) return;
            this.irList = res.retData;
            this.pop_ir = true;
          })
        }
      }

    },
    beforeCreate() {
      if (getStore("userType") == 1) this.$router.push({path: '/card'});
    },
    updated() {
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
  @import './../common/sass/mixin.scss';

  .index {
    position: absolute;
    background: #f3f5f8;
    width: 100%;
    height: 100%;
    text-align: center;
    z-index: 10;

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
            color: #ffaa00;
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

    .fb-btn {
      height: (125rem/64.687);
      min-height: (125rem/64.687);
      width: 100%;
      position: relative;
      img{
        width: 100%;
        height: 100%;
      }
    }
    .fbbtn {
      height: (125rem/64.687);
      min-height: (125rem/64.687);
      width: 100%;
      position: relative;

      h3 {
        line-height: 1.2;
        font-size: (22rem/64.687);
        font-weight: bold;
        text-align: left;
        padding: (20rem/64.687) 0 0 (20rem/64.687);
        color: #ffaa00;
      }
      h4 {
        line-height: 1.2;
        font-size: (16rem/64.687);
        text-align: left;
        padding: (5rem/64.687) 0 (5rem/64.687) (20rem/64.687);
        color: #888888;
      }
      .btn {
        text-align: left;
        line-height: 1.2;
        padding: (5rem/64.687) (20rem/64.687);
        button {
          background: #ffaa00;
          border-radius: (4rem/64.687);
          color: #ffffff;
          border: none;
          font-weight: bold;
          font-size: (16rem/64.687);
          padding: (4rem/64.687) (16rem/64.687);
        }
      }
    }

    .index-head {
      position: fixed;
      z-index: 10;
      width: 100%;
      height: 0.8rem;
      background: #e01625;
      color: white;
      line-height: 0.8rem;
      font-size: 0.25rem;
      font-weight: 600;
    }
    .indexContent {
      margin-top: 0.8rem;

      /*div:nth-child(1) {*/
      /*background: white;*/
      /*width: 100%;*/
      /*height: 1.08rem;*/
      /*line-height: 1.08rem;*/

      /*img {*/
      /*width: 2.783rem;*/
      /*height: 0.541rem;*/
      /*margin-top: 0.3rem;*/
      /*}*/
      /*}*/
      .indexContentRight {
        width: 96%;
        margin-left: 2%;
        margin-top: 0.155rem;
        height: 0.68rem;
        line-height: 0.68rem;
        background: white;
        border-radius: (4rem/64.687);

        div {
          display: inline-block;
        }
        span {
          display: inline-block;
          width: 45%;
          color: rgb(136, 136, 136);
          font-size: 0.25rem;
          vertical-align: middle;
        }
        span:nth-child(1) {
          text-align: left;
          span {
            display: inline-block;
            width: 0.38rem;
            color: #ffaa00;
            font-size: 0.28rem;
            margin-top: -0.05rem;
          }

        }
        div:nth-child(2) {
          text-align: right;
          width: 45%;
          span {
            width: 0.6rem;
            text-align: right;
            vertical-align: middle;
          }
          span:nth-child(2) {
            width: 0.6rem;
            text-align: right;
            vertical-align: middle;
            color: #ffaa00;
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
        height: 1.2rem;

        div {
          display: inline-block;
          height: 1.2rem;
          float: left;
        }
        .ListImg {
          width: 20%;
          img {
            border-radius: 0.05rem;
            margin-top: 0.231rem;
            width: 0.72rem;
            height: 0.68rem;
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
            /*margin-top: 0.2rem;*/
          }
          span.s3 {
            font-size: 0.2rem;
            color: #888888;
            /*margin-top: 0.2rem;*/
          }
        }
        .listZhima {
          float: right;
          margin-right: 0.1rem;
          width: 25%;

          img {
            width: 0.23rem;
            height: 0.2rem;
            margin-top: 0.25rem;
            margin-left: 0.14rem;
            vertical-align: middle;
          }
          span:nth-child(2) {
            display: inline-block;
            font-size: 0.216rem;
            vertical-align: middle;
            margin-top: 0.2rem;
            margin-left: 0.05rem;
            color: #ffaa00;
          }
          span:nth-child(3) {
            display: inline-block;
            /*width: 100%;*/
            text-align: right;
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
        /*top: 3.72238rem;*/

        .lScreenBox {
          width: 100%;
          height: (192rem/64.687);
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
                background: rgb(27, 157, 255);
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

    .zntj {
      min-width: (350rem/64.687);
      .indexList {
        width: 96%;
        padding: 0 2%;
        background: white;
        margin-top: (10rem/64.687);
        height: 1.2rem;
        border-top: 0.01rem solid #e5e5e5;

        div {
          display: inline-block;
          height: 1.2rem;
          float: left;
        }
        .ListImg {
          width: 20%;
          img {
            border-radius: 0.05rem;
            margin-top: 0.231rem;
            width: 0.68rem;
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
            margin-top: 0.3rem;
          }
          span:nth-child(2) {
            font-size: 0.2rem;
            color: rgb(136, 136, 136);
            margin-top: 0.05rem;
          }
          span:nth-child(3) {
            font-size: 0.2rem;
            color: rgb(136, 136, 136);
            margin-top: 0.05rem;
          }
        }
        .listZhima {
          float: right;
          margin-right: 0.1rem;
          width: 25%;

          img {
            width: 0.23rem;
            height: 0.2rem;
            margin-top: 0.3rem;
            margin-left: 0.14rem;
            vertical-align: middle;
          }
          span:nth-child(2) {
            display: inline-block;
            font-size: 0.216rem;
            vertical-align: middle;
            margin-top: 0.28rem;
            margin-left: 0.05rem;
            color: #ffaa00;
          }
          span:nth-child(3) {
            display: inline-block;
            /*width: 100%;*/
            text-align: right;
            font-size: 0.2rem;
            margin-top: 0.2rem;
            color: rgb(136, 136, 136);
          }

          .btn-span {
            background: #1b9dff;
            color: #fff !important;
            padding: (5rem/64.687) (7rem/64.687);
            border-radius: (4rem/64.687);
            font-size: (14rem/64.687);
          }
        }

      }
      .indexList:nth-last-child(1) {
        margin-bottom: (50rem/64.687);
      }
      .lScreen {
        width: 100%;
        height: 115%;
        background: rgba(0, 0, 0, 0.3);
        position: absolute;
        z-index: 20;
        top: 0;

        .lScreenBox {
          width: 100%;
          height: (192rem/64.687);
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
                background: rgb(27, 157, 255);
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
                background: rgb(27, 157, 255);
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

    .is-hide {
      visibility: hidden !important;
    }
  }
</style>
