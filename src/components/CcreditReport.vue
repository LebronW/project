<template>
  <div id="CcreditReport" class="main">
    <mt-header fixed class="index-header" title="信用报告">
      <router-link to="" slot="left" @click.native="history">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>

    <div class="container">
      <div class="card2 part1">
        <div class="toux"><img :src="report.iconUrl | iconEmpty" alt=""></div>
        <div class="js">
          <h2>{{report.name}}</h2>
          <h3>{{report.mobile}}</h3>
        </div>
        <div class="zmf" v-show="report.zhimaScore">
          <img src="../images/zhima@2x.png" alt="">
          <span>{{report.zhimaScore}}</span>
        </div>
      </div>
      <div class="card2 t10">
        <div class="clearfix">
          <div class="pull-left tle1">
            认证项目
          </div>
          <div class="pull-right tle2 rzsj">
            认证时间：{{report.authTime}}
          </div>
        </div>
        <div class="divier"></div>
        <div class="rzx">
          <span v-for="i in report.authItem"
                :style="{border: '1px solid '+ i.colour + '', color: ''+ i.colour +''}">{{i.name}}</span>
        </div>
      </div>
      <section class="com-card t10">
        <div class="tle1">基本信息</div>
        <div class="divier"></div>
        <div>
          <mt-cell title="姓名" :value="report.name"></mt-cell>
          <mt-cell title="手机号" :value="report.mobile"></mt-cell>
          <mt-cell title="身份证号" :value="report.cardId"></mt-cell>
          <mt-cell title="微信号" :value="report.wxNo"></mt-cell>
          <mt-cell title="QQ号" :value="report.qq"></mt-cell>
          <mt-cell title="现居地" :value="report.address1"></mt-cell>
          <mt-cell class="last" title="" :value="report.address2"></mt-cell>
        </div>
      </section>
      <section class="com-card t10 jjlxr" :class="{pb: !lxr}" @click="lxr = !lxr">
        <div class="clearfix">
          <div class="pull-left tle1">
            紧急联系人
          </div>
          <div class="pull-right tle2 right-icon" :class="{rotate90: lxr}">
            <i class="mintui mintui-back xl"></i>
          </div>
        </div>
        <div v-show="lxr">
          <div class="divier"></div>
          <div class="box">
            <div class="item">
              <ul>
                <li>姓名</li>
                <li>关系</li>
                <li class="last">联系方式</li>
              </ul>
            </div>
            <div class="item">
              <ul>
                <li class="text-center ys">{{report.firstName}}</li>
                <li class="text-center ys">{{report.firstRelation}}</li>
                <li class="last text-center ys">{{report.firstMobile}}</li>
              </ul>
            </div>
            <div class="item">
              <ul>
                <li class="text-center ys">{{report.secondName}}</li>
                <li class="text-center ys">{{report.secondRelation}}</li>
                <li class="last text-center ys">{{report.secondMobile}}</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <section class="com-card t10 yysrz" :class="{pb: !yys}" @click="yys = !yys">
        <div class="clearfix">
          <div class="pull-left tle1">
            运营商认证
          </div>
          <div class="pull-right tle2 right-icon" :class="{rotate90: yys}">
            <i class="mintui mintui-back xl"></i>
          </div>
        </div>
        <div v-show="yys">
          <div class="divier"></div>
          <div>
            <mt-cell title="机主姓名" :value="operatorInfo.ownerName"></mt-cell>
            <mt-cell title="身份证号" :value="operatorInfo.userCardId"></mt-cell>
            <mt-cell title="实名手机号" :value="operatorInfo.userMobile"></mt-cell>
            <mt-cell title="手机号注册时间" :value="operatorInfo.regTime"></mt-cell>
            <mt-cell title="用户信息与手机实名是否匹配" :value="operatorInfo.nameMatch"></mt-cell>
            <mt-cell title="紧急联系人1半年通话次数" :value="operatorInfo.contact1Cnt"></mt-cell>
            <mt-cell class="last" title="紧急联系人2半年通话次数" :value="operatorInfo.contact2Cnt"></mt-cell>
          </div>
        </div>
      </section>
      <section class="com-card t10 pb">
        <div class="clearfix">
          <div class="pull-left tle1">
            芝麻分数
          </div>
          <div class="pull-right tle2 rzsj">
            {{report.zhimaScore}}
          </div>
        </div>
      </section>
      <section class="com-card t10 jdrz" :class="{pb: !jd}" @click="jd = !jd">
        <div class="clearfix">
          <div class="pull-left tle1">
            京东认证
          </div>
          <div class="pull-right tle2 right-icon" :class="{rotate90: jd}">
            <i class="mintui mintui-back xl"></i>
          </div>
        </div>
        <div v-show="jd">
          <div class="divier"></div>
          <div>
            <mt-cell title="真实姓名" :value="jdAuthInfo.realName"></mt-cell>
            <!--<mt-cell title="手机号" value="176****8893"></mt-cell>-->
            <!--<mt-cell title="身份证号" value="2201******8417"></mt-cell>-->
            <mt-cell title="收货信息" :value="jdAuthInfo.address1"></mt-cell>
            <mt-cell title="" :value="jdAuthInfo.address2"></mt-cell>
            <!--<mt-cell title="安全等级" value="较高"></mt-cell>-->
            <!--<mt-cell title="京东白条" value="是"></mt-cell>-->
            <mt-cell title="白条总额度" :value="jdAuthInfo.baitiaoAmount"></mt-cell>
            <mt-cell title="可用额度" :value="jdAuthInfo.usableBaitiaoAmount"></mt-cell>
            <a class="mint-cell">
              <div class="mint-cell-left"></div>
              <div class="mint-cell-wrapper">
                <div class="mint-cell-title spec">
                  <span></span>
                  <span class="mint-cell-text">近半年情况</span>
                </div>
              </div>
            </a>
            <mt-cell title="累计消费" :value="jdAuthInfo.costAmount"></mt-cell>
            <mt-cell title="订单数" :value="jdAuthInfo.orderNum"></mt-cell>
            <mt-cell title="商品总数" :value="jdAuthInfo.totalGoods"></mt-cell>
            <mt-cell title="单笔最高消费" :value="jdAuthInfo.topCost"></mt-cell>
            <mt-cell title="每笔平均消费" :value="jdAuthInfo.averageCost"></mt-cell>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
<script>
  /* eslint-disable */
  import {All} from './../api/api'
  import {getStore} from '../config/mUtils'
  export default {
    name: "CcreditReport",
    data() {
      return {
        lxr: false,
        yys: false,
        jd: false,
        report: {},
        operatorInfo: {},
        jdAuthInfo: {},
        borrowerId: '',
        fromPage: ''
      }
    },
    mounted() {
      let vm = this;
//      let imAccid = vm.$route.query.imAccid;
//      let myInfo = vm.$store.state.myInfo;
////      let userInfos = vm.$store.state.userInfos;
      vm.borrowerId = vm.$route.query.borrowerId;
      vm.fromPage = vm.$route.query.from;
//      let isFF = false;   // 信用报告是否付费
//      if (myInfo && myInfo.custom && myInfo.custom.crm_borrower_report_record && myInfo.custom.crm_borrower_report_record.length !== 0) {
//        let crm = myInfo.custom.crm_borrower_report_record;
//        for (let i = 0; i < crm.length; i++) {
//          if (crm[i] == imAccid) {
//            isFF = true;
//            break;
//          }
//        }
//      }
//      if (isFF) {   // 已付费
      All({funCode: 110013, borrowerId: vm.borrowerId}).then(res => {
        if (res.retCode !== "0000" || !res.retData) return;
        vm.report = res.retData;
        vm.operatorInfo = !res.retData.operatorInfo ? {} : res.retData.operatorInfo;
        vm.jdAuthInfo = !res.retData.jdAuthInfo ? {} : res.retData.jdAuthInfo;
        // 处理地址

        if (res.retData.jdAuthInfo && res.retData.jdAuthInfo.receiveAddress) {
          let address = res.retData.jdAuthInfo.receiveAddress;
          let arr = address.split("|");
          if (arr && arr.length > 0) {
            let len = arr.length;
            vm.jdAuthInfo.address1 = address.replace(`|${arr[len - 1]}`, '');
            vm.jdAuthInfo.address2 = arr[len - 1];
          }
        }
      })
//      } else {  // 信用报告未付费
//        All({funCode: 110014, borrowerId: vm.borrowerId}).then(res => {
//          if (res.retCode !== "0000" || !res.retData) return;
//          vm.report = res.retData;
//          vm.operatorInfo = !res.retData.operatorInfo ? {} : res.retData.operatorInfo;
//          vm.jdAuthInfo = !res.retData.jdAuthInfo ? {} : res.retData.jdAuthInfo;
//          // 处理地址
//          if (res.retData.jdAuthInfo && res.retData.jdAuthInfo.receiveAddress) {
//            let address = res.retData.jdAuthInfo.receiveAddress;
//            let arr = address.split("|");
//            if (arr && arr.length > 0) {
//              let len = arr.length;
//              vm.jdAuthInfo.address1 = address.replace(`|${arr[len - 1]}`, '');
//              vm.jdAuthInfo.address2 = arr[len - 1];
//            }
//          }
//        })
//      }
    },
    methods: {
      history() {
        let dizhi = this.fromPage;
        let borrowerId = this.borrowerId;
        if (dizhi.indexOf("Cchat") >= 0) dizhi = `Cchat/${dizhi.replace(/^Cchat_/, '')}`;
        this.$router.push({path: `/${dizhi}`, query: {borrowerId: borrowerId}});
      }
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

  body {
    background: rgb(238, 239, 246);
  }

  #CcreditReport {
    .card2 {
      border-radius: rem(4rem);
      background: #ffffff;
      padding: rem(15rem);
    }
    .part1 {
      position: relative;
      display: -webkit-flex; /* Safari */
      display: flex;
      align-items: center;
      .toux {
        margin-right: rem(12rem);
        img {
          width: rem(46rem);
          height: rem(46rem);
          border-radius: rem(12rem);
        }
      }

      .js {
        h2 {
          font-size: rem(15rem);
          color: #000000;
          margin-bottom: rem(9rem);
        }
        h3 {
          font-size: rem(12rem);
          color: rgb(136, 136, 136);
        }
      }

      .zmf {
        position: absolute;
        right: rem(15rem);
        top: rem(30rem);
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
    }
    .tle1 {
      font-size: rem(14rem);
      color: #000;
      margin-top: rem(3rem);
    }
    .rzsj {
      margin-top: rem(4rem);
    }
    .tle2 {
      font-size: rem(12rem);
      color: #888;
    }
    .divier {
      margin-top: rem(15rem);
      margin-bottom: rem(15rem);
    }
    .rzx span {
      font-size: rem(8rem);
      margin-right: rem(6rem);
      padding: rem(2rem) rem(5rem);
      border-radius: rem(4rem);
    }

    .com-card {
      border-radius: rem(4rem);
      background: #ffffff;
      padding: rem(15rem) rem(15rem) 0 rem(15rem);

      .divier {
        margin-left: rem(-15rem);
        margin-bottom: 0 !important;
      }

      a {
        background-size: 120% 0;
        border-bottom: 1px dashed rgb(229, 229, 229);
        padding-right: rem(15rem);
        margin-right: rem(-15rem);
      }
      a .mint-cell-wrapper {
        padding: 0;
        background-size: 120% 0;
      }
      a .mint-cell-title .mint-cell-text {
        padding-left: rem(8rem);
      }

      a .mint-cell-title .mint-cell-text {
        font-size: rem(12rem);
        color: rgb(50, 50, 50);
      }
      a .mint-cell-value span {
        font-size: rem(12rem);
        color: rgb(136, 136, 136);
      }
      .last {
        border-bottom: none !important;
      }
      .right-icon {
        margin-top: rem(3rem);
        transform: rotate(-90deg);
        -ms-transform: rotate(-90deg); /* IE 9 */
        -moz-transform: rotate(-90deg); /* Firefox */
        -webkit-transform: rotate(-90deg); /* Safari 和 Chrome */
        -o-transform: rotate(-90deg); /* Opera */
        transition: all .3s;
        -moz-transition: all .3s;
        -webkit-transition: all .3s;
        -o-transition: all .3s;
      }
      .xl {
        font-size: rem(14rem);
        color: rgb(136, 136, 136);
      }
      .rotate90 {
        transform: rotate(90deg);
        -ms-transform: rotate(90deg); /* IE 9 */
        -moz-transform: rotate(90deg); /* Firefox */
        -webkit-transform: rotate(90deg); /* Safari 和 Chrome */
        -o-transform: rotate(90deg); /* Opera */
        transition: all .3s;
        -moz-transition: all .3s;
        -webkit-transition: all .3s;
        -o-transition: all .3s;
      }
    }

    .pb {
      padding-bottom: rem(15rem);
    }

    .jjlxr .box {
      display: -webkit-flex; /* Safari */
      display: flex;
      align-items: center;
      .item {
        flex-grow: 1;
        align-items: center;
        justify-content: center;

        li {
          font-size: rem(12rem);
          color: rgb(50, 50, 50);
          padding: rem(15rem) 0 rem(15rem) rem(8rem);
          border-bottom: 1px dashed rgb(229, 229, 229);
        }
        li.ys {
          color: rgb(136, 136, 136);
        }

      }
    }

    .spec span:first-child {
      display: inline-block;
      width: rem(4rem);
      height: rem(10rem);
      background: rgb(27, 157, 255);
      vertical-align: middle;
    }
    .spec span:last-child {
      padding-left: rem(1rem) !important;
    }
  }
</style>
