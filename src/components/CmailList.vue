<template>
  <div id="CmailList" class="main">
    <mt-header fixed class="index-header" title="通讯录">
      <router-link to="" slot="left" @click.native="history">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <nav class="mail-list">
      <div class="item" :class="{active: isNav == 1}" @click="openThis(1)">手机通讯录</div>
      <div class="item" :class="{active: isNav == 2}" @click="openThis(2)">运营商通讯录</div>
      <div class="item" :class="{active: isNav == 3}" @click="openThis(3)">紧急联系人</div>
    </nav>
    <div class="tabs">
      <section v-show="sjh">
        <ul>
          <li class="com-card t10" v-show='item.g_value.length > 0' v-for="item in mailList">
            <div class="tle">{{item.g_key}}</div>
            <div class="divier"></div>
            <div v-for='i2 in item.g_value'>
              <mt-cell :title="i2.name" :value="i2.phone"></mt-cell>
            </div>
          </li>
          <!--<li class="com-card t10" v-show='list.listA.length'>-->
          <!--<div class="tle">A</div>-->
          <!--<div class="divier"></div>-->
          <!--<div v-for='item in list.listA'>-->
          <!--<mt-cell :title="item.name" :value="item.phone"></mt-cell>-->
          <!--</div>-->
          <!--</li>-->
          <!--<li class="com-card t10" v-show='list.listB.length'>-->
          <!--<div class="tle">B</div>-->
          <!--<div class="divier"></div>-->
          <!--<div v-for='item in list.listB'>-->
          <!--<mt-cell :title="item.name" :value="item.phone"></mt-cell>-->
          <!--</div>-->
          <!--</li>-->
          <!--<li class="com-card t10" v-show='list.listC.length'>-->
          <!--<div class="tle">C</div>-->
          <!--<div class="divier"></div>-->
          <!--<div v-for='item in list.listC'>-->
          <!--<mt-cell :title="item.name" :value="item.phone"></mt-cell>-->
          <!--</div>-->
          <!--</li>-->
          <!--<li class="com-card t10" v-show='list.listD.length'>-->
          <!--<div class="tle">D</div>-->
          <!--<div class="divier"></div>-->
          <!--<div v-for='item in list.listD'>-->
          <!--<mt-cell :title="item.name" :value="item.phone"></mt-cell>-->
          <!--</div>-->
          <!--</li>-->
          <!--<li class="com-card t10" v-show='list.listE.length'>-->
          <!--<div class="tle">E</div>-->
          <!--<div class="divier"></div>-->
          <!--<div v-for='item in list.listE'>-->
          <!--<mt-cell :title="item.name" :value="item.phone"></mt-cell>-->
          <!--</div>-->
          <!--</li>-->
          <!--<li class="com-card t10" v-show='list.listF.length'>-->
          <!--<div class="tle">F</div>-->
          <!--<div class="divier"></div>-->
          <!--<div v-for='item in list.listF'>-->
          <!--<mt-cell :title="item.name" :value="item.phone"></mt-cell>-->
          <!--</div>-->
          <!--</li>-->
          <!--<li class="com-card t10" v-show='list.listG.length'>-->
          <!--<div class="tle">G</div>-->
          <!--<div class="divier"></div>-->
          <!--<div v-for='item in list.listG'>-->
          <!--<mt-cell :title="item.name" :value="item.phone"></mt-cell>-->
          <!--</div>-->
          <!--</li>-->
          <!--<li class="com-card t10" v-show='list.listH.length'>-->
          <!--<div class="tle">H</div>-->
          <!--<div class="divier"></div>-->
          <!--<div v-for='item in list.listH'>-->
          <!--<mt-cell :title="item.name" :value="item.phone"></mt-cell>-->
          <!--</div>-->
          <!--</li>-->
          <!--<li class="com-card t10" v-show='list.listI.length'>-->
          <!--<div class="tle">I</div>-->
          <!--<div class="divier"></div>-->
          <!--<div v-for='item in list.listI'>-->
          <!--<mt-cell :title="item.name" :value="item.phone"></mt-cell>-->
          <!--</div>-->
          <!--</li>-->
          <!--<li class="com-card t10" v-show='list.listJ.length'>-->
          <!--<div class="tle">J</div>-->
          <!--<div class="divier"></div>-->
          <!--<div v-for='item in list.listJ'>-->
          <!--<mt-cell :title="item.name" :value="item.phone"></mt-cell>-->
          <!--</div>-->
          <!--</li>-->
          <!--<li class="com-card t10" v-show='list.listK.length'>-->
          <!--<div class="tle">K</div>-->
          <!--<div class="divier"></div>-->
          <!--<div v-for='item in list.listK'>-->
          <!--<mt-cell :title="item.name" :value="item.phone"></mt-cell>-->
          <!--</div>-->
          <!--</li>-->
          <!--<li class="com-card t10" v-show='list.listL.length'>-->
          <!--<div class="tle">L</div>-->
          <!--<div class="divier"></div>-->
          <!--<div v-for='item in list.listL'>-->
          <!--<mt-cell :title="item.name" :value="item.phone"></mt-cell>-->
          <!--</div>-->
          <!--</li>-->
          <!--<li class="com-card t10" v-show='list.listM.length'>-->
          <!--<div class="tle">M</div>-->
          <!--<div class="divier"></div>-->
          <!--<div v-for='item in list.listM'>-->
          <!--<mt-cell :title="item.name" :value="item.phone"></mt-cell>-->
          <!--</div>-->
          <!--</li>-->
          <!--<li class="com-card t10" v-show='list.listN.length'>-->
          <!--<div class="tle">N</div>-->
          <!--<div class="divier"></div>-->
          <!--<div v-for='item in list.listN'>-->
          <!--<mt-cell :title="item.name" :value="item.phone"></mt-cell>-->
          <!--</div>-->
          <!--</li>-->
          <!--<li class="com-card t10" v-show='list.listO.length'>-->
          <!--<div class="tle">O</div>-->
          <!--<div class="divier"></div>-->
          <!--<div v-for='item in list.listO'>-->
          <!--<mt-cell :title="item.name" :value="item.phone"></mt-cell>-->
          <!--</div>-->
          <!--</li>-->
          <!--<li class="com-card t10" v-show='list.listP.length'>-->
          <!--<div class="tle">P</div>-->
          <!--<div class="divier"></div>-->
          <!--<div v-for='item in list.listP'>-->
          <!--<mt-cell :title="item.name" :value="item.phone"></mt-cell>-->
          <!--</div>-->
          <!--</li>-->
          <!--<li class="com-card t10" v-show='list.listQ.length'>-->
          <!--<div class="tle">Q</div>-->
          <!--<div class="divier"></div>-->
          <!--<div v-for='item in list.listQ'>-->
          <!--<mt-cell :title="item.name" :value="item.phone"></mt-cell>-->
          <!--</div>-->
          <!--</li>-->
          <!--<li class="com-card t10" v-show='list.listR.length'>-->
          <!--<div class="tle">R</div>-->
          <!--<div class="divier"></div>-->
          <!--<div v-for='item in list.listR'>-->
          <!--<mt-cell :title="item.name" :value="item.phone"></mt-cell>-->
          <!--</div>-->
          <!--</li>-->
          <!--<li class="com-card t10" v-show='list.listS.length'>-->
          <!--<div class="tle">S</div>-->
          <!--<div class="divier"></div>-->
          <!--<div v-for='item in list.listS'>-->
          <!--<mt-cell :title="item.name" :value="item.phone"></mt-cell>-->
          <!--</div>-->
          <!--</li>-->
          <!--<li class="com-card t10" v-show='list.listT.length'>-->
          <!--<div class="tle">T</div>-->
          <!--<div class="divier"></div>-->
          <!--<div v-for='item in list.listT'>-->
          <!--<mt-cell :title="item.name" :value="item.phone"></mt-cell>-->
          <!--</div>-->
          <!--</li>-->
          <!--<li class="com-card t10" v-show='list.listU.length'>-->
          <!--<div class="tle">U</div>-->
          <!--<div class="divier"></div>-->
          <!--<div v-for='item in list.listU'>-->
          <!--<mt-cell :title="item.name" :value="item.phone"></mt-cell>-->
          <!--</div>-->
          <!--</li>-->
          <!--<li class="com-card t10" v-show='list.listV.length'>-->
          <!--<div class="tle">V</div>-->
          <!--<div class="divier"></div>-->
          <!--<div v-for='item in list.listV'>-->
          <!--<mt-cell :title="item.name" :value="item.phone"></mt-cell>-->
          <!--</div>-->
          <!--</li>-->
          <!--<li class="com-card t10" v-show='list.listW.length'>-->
          <!--<div class="tle">W</div>-->
          <!--<div class="divier"></div>-->
          <!--<div v-for='item in list.listW'>-->
          <!--<mt-cell :title="item.name" :value="item.phone"></mt-cell>-->
          <!--</div>-->
          <!--</li>-->
          <!--<li class="com-card t10" v-show='list.listX.length'>-->
          <!--<div class="tle">X</div>-->
          <!--<div class="divier"></div>-->
          <!--<div v-for='item in list.listX'>-->
          <!--<mt-cell :title="item.name" :value="item.phone"></mt-cell>-->
          <!--</div>-->
          <!--</li>-->
          <!--<li class="com-card t10" v-show='list.listY.length'>-->
          <!--<div class="tle">Y</div>-->
          <!--<div class="divier"></div>-->
          <!--<div v-for='item in list.listY'>-->
          <!--<mt-cell :title="item.name" :value="item.phone"></mt-cell>-->
          <!--</div>-->
          <!--</li>-->
          <!--<li class="com-card t10" v-show='list.listZ.length'>-->
          <!--<div class="tle">Z</div>-->
          <!--<div class="divier"></div>-->
          <!--<div v-for='item in list.listZ'>-->
          <!--<mt-cell :title="item.name" :value="item.phone"></mt-cell>-->
          <!--</div>-->
          <!--</li>-->
          <!--<li class="com-card t10" v-show='list.listSpecial.length'>-->
          <!--<div class="tle">#</div>-->
          <!--<div class="divier"></div>-->
          <!--<div v-for='item in list.listSpecial'>-->
          <!--<mt-cell :title="item.name" :value="item.phone"></mt-cell>-->
          <!--</div>-->
          <!--</li>-->
        </ul>
      </section>
      <section v-show="yys">
        <ul class="com-card" style="padding-top: 0">
          <li>
            <mt-cell class="no-divier" v-for='item in yysList' :key='item.phoneNumber'
                     :title="item.phoneNumber"></mt-cell>
          </li>
        </ul>
      </section>

      <section v-show="lxr">
        <div class="com-card t10 jjlxr" :class="{pb: !lxrSJ}" @click="lxrSJ = !lxrSJ">
          <div class="clearfix">
            <div class="pull-left tle1">
              紧急联系人
            </div>
            <div class="pull-right tle2 right-icon" :class="{rotate90: lxrSJ}">
              <i class="mintui mintui-back xl"></i>
            </div>
          </div>
          <div v-show="lxrSJ">
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
                  <li class="text-center ys">{{lxrList.contact1Name}}</li>
                  <li class="text-center ys">{{lxrList.contact1Relation}}</li>
                  <li class="last text-center ys">{{lxrList.contact1Mobile}}</li>
                </ul>
              </div>
              <div class="item">
                <ul>
                  <li class="text-center ys">{{lxrList.contact2Name}}</li>
                  <li class="text-center ys">{{lxrList.contact2Relation}}</li>
                  <li class="last text-center ys">{{lxrList.contact2Mobile}}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
<script>
  /* eslint-disable */
  import {Toast} from 'mint-ui'
  import {All} from './../api/api'
  export default {
    name: "CmailList",
    data() {
      return {
        isNav: 1,
        sjh: true,
        yys: false,
        yysList: [],
        lxr: false,
        lxrList: [],
        lxrSJ: true,
        receiptStatus: null,
        receiptId: null,
        mailList: []
//        list: {
//          listA: [],
//          listB: [],
//          listC: [],
//          listD: [],
//          listE: [],
//          listF: [],
//          listG: [],
//          listH: [],
//          listI: [],
//          listJ: [],
//          listK: [],
//          listL: [],
//          listM: [],
//          listN: [],
//          listO: [],
//          listP: [],
//          listQ: [],
//          listR: [],
//          listS: [],
//          listT: [],
//          listU: [],
//          listV: [],
//          listW: [],
//          listX: [],
//          listY: [],
//          listZ: [],
//          listSpecial: []
//        }
      }
    },
    methods: {
      history() {
        this.$router.push({
          path: '/LIouDetails',
          query: {receiptStatus: this.receiptStatus, receiptId: this.receiptId}
        });
      },
      openThis(index) {
        this.sjh = false;
        this.yys = false;
        this.lxr = false;
        if (index === 1) {
          this.init()
          this.sjh = true;
        }
        if (index === 2) {
          this.yys = true;
          let params = {
            funCode: 110033,
            borrowerId: this.$route.query.borrowerUserId
          }
          All(params).then(res => {
//      		console.log(res)
            if (res.retCode === '0000') {
              this.yysList = res.retData
            } else {
              Toast({
                message: res.retMsg,
                position: 'bottom',
                duration: 2000
              })
            }
          })
        }
        if (index === 3) {
          this.lxr = true;
          let params = {
            funCode: 110034,
            borrowerId: this.$route.query.borrowerUserId
          }
          All(params).then(res => {
//      		console.log(res)
            if (res.retCode === '0000') {
              this.lxrList = res.retData
            } else {
              Toast({
                message: res.retMsg,
                position: 'bottom',
                duration: 2000
              })
            }

          })
        }
        this.isNav = index;
      },
      init() {
        let this_ = this;
        this.receiptStatus = this.$route.query.receiptStatus;
        this.receiptId = this.$route.query.receiptId;
        let params = {
          funCode: 110016,
          lenderUserId: this.$route.query.lenderUserId, // 借款人id
          borrowerUserId: this.$route.query.borrowerUserId
        };
        All(params).then(res => {
          // console.log(res)
          if (res.retCode === '0000') {
            let zimu = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
            let speil = {g_key: "#", g_value: []};
            let arr = [];
            for (let i2 = 0; i2 < zimu.length; i2++) {
              let obj2 = {
                g_key: zimu[i2],
                g_value: []
              };
              arr.push(obj2);
            }
            for (let i = 0; i < res.retData.length; i++) {
              let py = res.retData[i].pinyin;
              if (!(py.match(/^[a-z]+$/i))) {
                speil.g_value.push(a.retData[i]);
              } else {
                let pinyin = py.toUpperCase();
                for (let j = 0; j < arr.length; j++) {
                  if (pinyin === arr[j].g_key) {
                    arr[j].g_value.push(a.retData[i]);
                  }
                }
              }
            }
            arr.push(speil);
            this_.mailList = arr;
//            for (var i = 0; i < res.retData.length; i++) {
//              if (res.retData[i].pinyin === 'a') {
//                this.list.listA.push(res.retData[i])
//              } else if (res.retData[i].pinyin === 'b') {
//                this.list.listB.push(res.retData[i])
//              } else if (res.retData[i].pinyin === 'c') {
//                this.list.listC.push(res.retData[i])
//              } else if (res.retData[i].pinyin === 'd') {
//                this.list.listD.push(res.retData[i])
//              } else if (res.retData[i].pinyin === 'e') {
//                this.list.listE.push(res.retData[i])
//              } else if (res.retData[i].pinyin === 'f') {
//                this.list.listF.push(res.retData[i])
//              } else if (res.retData[i].pinyin === 'g') {
//                this.list.listG.push(res.retData[i])
//              } else if (res.retData[i].pinyin === 'h') {
//                this.list.listH.push(res.retData[i])
//              } else if (res.retData[i].pinyin === 'i') {
//                this.list.listI.push(res.retData[i])
//              } else if (res.retData[i].pinyin === 'j') {
//                this.list.listJ.push(res.retData[i])
//              } else if (res.retData[i].pinyin === 'k') {
//                this.list.listK.push(res.retData[i])
//              } else if (res.retData[i].pinyin === 'l') {
//                this.list.listL.push(res.retData[i])
//              } else if (res.retData[i].pinyin === 'm') {
//                this.list.listM.push(res.retData[i])
//              } else if (res.retData[i].pinyin === 'n') {
//                this.list.listN.push(res.retData[i])
//              } else if (res.retData[i].pinyin === 'o') {
//                this.list.listO.push(res.retData[i])
//              } else if (res.retData[i].pinyin === 'p') {
//                this.list.listP.push(res.retData[i])
//              } else if (res.retData[i].pinyin === 'q') {
//                this.list.listQ.push(res.retData[i])
//              } else if (res.retData[i].pinyin === 'r') {
//                this.list.listR.push(res.retData[i])
//              } else if (res.retData[i].pinyin === 's') {
//                this.list.listS.push(res.retData[i])
//              } else if (res.retData[i].pinyin === 't') {
//                this.list.listT.push(res.retData[i])
//              } else if (res.retData[i].pinyin === 'u') {
//                this.list.listU.push(res.retData[i])
//              } else if (res.retData[i].pinyin === 'v') {
//                this.list.listV.push(res.retData[i])
//              } else if (res.retData[i].pinyin === 'w') {
//                this.list.listW.push(res.retData[i])
//              } else if (res.retData[i].pinyin === 'x') {
//                this.list.listX.push(res.retData[i])
//              } else if (res.retData[i].pinyin === 'y') {
//                this.list.listY.push(res.retData[i])
//              } else if (res.retData[i].pinyin === 'z') {
//                this.list.listZ.push(res.retData[i])
//              } else {
//                this.list.listSpecial.push(res.retData[i])
//              }
//            }
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
    mounted() {
      this.init()
    },
    components: {},
    computed: {},       // 计算属性是基于它们的依赖进行缓存的。计算属性只有在它的相关依赖发生改变时才会重新求值
    watch: {},
    filters: {}
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss">
  @import "../common/sass/Cyucb";

  #CmailList {
    .mail-list {
      margin-top: 0.8rem;
      position: relative;
      display: -webkit-flex; /* Safari */
      display: flex;
      align-items: center;
      height: rem(45rem);
      background: #ffffff;

      .item {
        flex-grow: 1;
        align-items: center;
        justify-content: center;
        text-align: center;
        font-size: rem(14rem);
        color: #888;
        margin-top: rem(1rem);
      }
      .item.active {
        color: rgb(99, 190, 113);
      }
    }

    .tabs {
      padding: (10rem/46.687) (6rem/46.687);
    }

    .com-card {
      border-radius: rem(4rem);
      background: #ffffff;
      padding: rem(15rem) 0 0 rem(15rem);
      padding: rem(15rem) rem(15rem) 0 rem(15rem);

      .divier {
        margin: rem(15rem) rem(-15rem) rem(1rem) rem(-15rem);
        background-size: 120% 0 !important;
      }
      .no-divier .mint-cell-wrapper {
        background-size: 120% 0 !important;
      }

      .tle {
        font-size: rem(16rem);
        font-weight: bold;
        color: #000;
      }

      a {
        background-size: 120% 0;
      }
      a .mint-cell-wrapper {
        padding: 0;
        /*background-size: 120% 0;*/
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

    .fade-enter-active, .fade-leave-active {
      transition: all 0.3s ease
    }
    .fade-enter, .fade-leave-active {
      opacity: 0
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
          border-bottom: rem(1rem) solid rgb(229, 229, 229);
        }
        li.ys {
          color: rgb(136, 136, 136);
        }

      }
      .last {
        border-bottom: none !important;
      }
    }
  }
</style>
