<template>
  <div id="app">
    <!--<keep-alive>-->
    <router-view></router-view>
    <!--</keep-alive>-->
    <section class="footer" v-show="footer_isShow">
      <ul class="footer-ul">
        <router-link to="/index" class="footer-li" v-show="isZY">
          <li @click="zy">
            <span v-bind:class="[errorClass ,isactive ? activeClass : '']"></span>
            <span :class="{'c-active': isactive}">出资人</span>
          </li>
        </router-link>
        <router-link to="/card" class="footer-li" v-show="isXYK">
          <li @click="xyk">
            <span v-bind:class="[errorClass3 ,isactive3 ? activeClass3 : '']"></span>
            <span :class="{'c-active': isactive3}">借款人</span>
          </li>
        </router-link>
        <router-link to="" class="footer-li" @click.native="toSession">
          <li @click="rz">
            <span v-bind:class="[errorClass1 ,isactive1 ? activeClass1 : '']"></span>
            <span :class="{'c-active': isactive1}">消息</span>
            <span v-show="unreadAll > 0" class="u-unread">{{unreadAll}}</span>
          </li>
        </router-link>
        <router-link to="/mine" class="footer-li" @click.native="toMine">
          <li @click="wd">
            <span v-bind:class="[errorClass2 ,isactive2 ? activeClass2 : '']"></span>
            <span :class="{'c-active': isactive2}">我的</span>
          </li>
        </router-link>
      </ul>
    </section>
    <!--加载中-->
    <loading></loading>
  </div>
</template>
<script>
  /* eslint-disable */
  import {mapMutations} from 'vuex'
  import Loading from './components/Cchats/Loading.vue'
  import {setStore, getStore} from './config/mUtils'
  import {All} from './api/api'
  export default {
    name: 'app',
    data() {
      return {
        isactive: true,
        isactive1: false,
        isactive2: false,
        isactive3: false,
        errorClass: 'one',
        errorClass1: 'two',
        errorClass2: 'three',
        activeClass: 'one1',
        activeClass1: 'two1',
        activeClass2: 'three1',
        activeClass3: 'four1',
        errorClass3: 'four',
        type: 1,
        isZY: true,
        isXYK: true,
        unreadAll: 0,
        footer_isShow: false
      }
    },
    methods: {
      ...mapMutations([
        'TYPE_DHH'
      ]),
      zy() {
        this.isactive = true
        this.isactive2 = false
        this.isactive1 = false
        this.isactive3 = false
        if (this.isactive === true) {
          this.type = 1
          this.TYPE_DHH(this.type)
        }
      },
      rz() {
        this.isactive = false
        this.isactive1 = true
        this.isactive2 = false
        this.isactive3 = false
        if (this.isactive1 === true) {
          this.type = 2
          this.TYPE_DHH(this.type)
        }
      },
      wd() {
        this.isactive = false
        this.isactive2 = true
        this.isactive1 = false
        this.isactive3 = false
        if (this.isactive2 === true) {
          this.type = 3
          this.TYPE_DHH(this.type)
        }
      },
      xyk() {
        this.isactive3 = true
        this.isactive = false
        this.isactive2 = false
        this.isactive1 = false
        if (this.isactive3 === true) {
          this.type = 4
          this.TYPE_DHH(this.type)
        }
      },
      pageState() {
        this.type = sessionStorage.getItem("type");
        if (this.type === '1') {
          this.isactive = true
          this.isactive1 = false
          this.isactive2 = false
          this.isactive3 = false
        } else if (this.type === '2') {
          this.isactive = false
          this.isactive1 = true
          this.isactive2 = false
          this.isactive3 = false
        } else if (this.type === '3') {
          this.isactive = false
          this.isactive1 = false
          this.isactive2 = true
          this.isactive3 = false
        } else if (this.type === '4') {
          this.isactive = false
          this.isactive1 = false
          this.isactive2 = false
          this.isactive3 = true
        }
      },
      toSession() {
        let userId = getStore("userId");
        let token = getStore("token");
        if (!userId || !token) return this.$router.push({'path': '/login'});
        this.$router.push({'path': '/Session'})
      },
      toMine() {
        let userId = getStore("userId");
        let token = getStore("token");
        if (!userId || !token) return this.$router.push({'path': '/login'});
        this.$router.push({'path': '/mine'})
      }
    },
    mounted() {
      this.$store.dispatch('hideLoading');
    },
    computed: {
     // unreadAll() {
     //   // 聊天未读消息
     //   let res = 0;
     //   let sessionList = vm.$store.state.sessionlist;
     //   if (sessionList && sessionList.length > 0){
     //     for (let i = 0, le = sessionList.length; i < le; i++) {
     //       if (sessionList[i].unread && sessionList[i].unread > 0) res += sessionList[i].unread;
     //     }
     //   }
     //   return res;
     // }
    },
    // 所有页面更新都会触发此函数
    updated () {
      let vm = this;
      let path = vm.$route.path;
      let tokenId = getStore('token');
      let userId = getStore('userId');
      if (userId && tokenId && path != '/login') {
//         提交sdk连接请求
        vm.$store.dispatch('connect');
        vm.$store.dispatch('updateRefreshState');
      }
      vm.pageState();
      let userType = getStore("userType");
      let personInfoState = getStore("personInfoState");
      vm.isZY = !(userType && userType == 1);
      vm.isXYK = !(userType && userType == 2);
//      console.log(path);
      vm.footer_isShow = !!(path && (path == '/' || path == '/index' || path == '/card' || path == '/mine' || path == '/Session'));
    },
    components: {
      Loading
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import './common/sass/mixin.scss';

  #app {
    font-family: '微软雅黑';
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-size: 14px;
    display: flex;
    flex-direction: column;
    height: 100%;

    input:disabled {
      background: #ffffff !important;
      border: none !important;
    }

    .footer {
      @include border-1px(rgba(7, 17, 27, 0.1));
      width: 100%;
      height: 0.9rem;
      text-align: center;
      background-color: #fff;
      z-index: 10;
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      .footer-ul {
        display: flex;
        display: -webkit-flex; /* Safari */
        align-item: center;
        justify-content: center;

        .footer-li {
          // width: 33.3%;
          flex: 1;

          span {
            display: inline-block;
            width: 100%;
            font-size: 0.17rem;
          }
          .one {
            // width: 0.35rem;
            height: 0.324rem;
            background: url(images/cjr@2x.png) no-repeat center;
            background-size: auto 100%;
            margin-top: 0.2rem;
            /*margin-bottom: 0.1rem;*/
            // margin-left: 0.05rem;
          }
          .one1 {
            // width: 0.35rem;
            height: 0.324rem;
            background: url(images/cjr_2@2x.png) no-repeat center;
            background-size: auto 100%;
            margin-top: 0.2rem;
            /*margin-bottom: 0.1rem;*/
            // margin-left: 0.05rem;
          }

          .two {
            // width: 0.378rem;
            height: 0.324rem;
            background: url(images/repaymentone.png) no-repeat center;
            background-size: auto 100%;
            margin-top: 0.2rem;
            /*margin-bottom: 0.1rem;*/
            // margin-left: 0.05rem;
          }
          .two1 {
            // width: 0.378rem;
            height: 0.324rem;
            background: url(images/repaymenttwo.png) no-repeat center;
            background-size: auto 100%;
            margin-top: 0.2rem;
            /*margin-bottom: 0.1rem;*/
            // margin-left: 0.05rem;
          }
          .three {
            // width: 0.378rem;
            height: 0.324rem;
            background: url(images/meone.png) no-repeat center;
            background-size: auto 100%;
            margin-top: 0.2rem;
            /*margin-bottom: 0.1rem;*/
            // margin-left: 0.05rem;
          }
          .three1 {
            // width: 0.378rem;
            height: 0.324rem;
            background: url(images/metwo.png) no-repeat center;
            background-size: auto 100%;
            margin-top: 0.2rem;
            /*margin-bottom: 0.1rem;*/
            // margin-left: 0.05rem;
          }
          .four {
            // width: 0.378rem;
            height: 0.324rem;
            background: url(images/cardOne.png) no-repeat center;
            background-size: auto 100%;
            margin-top: 0.2rem;
            /*margin-bottom: 0.1rem;*/
            // margin-left: 0.05rem;
          }
          .four1 {
            // width: 0.378rem;
            height: 0.324rem;
            background: url(images/cardTwo.png) no-repeat center;
            background-size: auto 100%;
            margin-top: 0.2rem;
            /*margin-bottom: 0.1rem;*/
            // margin-left: 0.05rem;
          }
        }
      }

    }
    .c-active {
      color: #e01625;
    }
    .mint-header {
      background-color: #07C2F5;
    }
    .appPopup {
      text-align: center;
      border-radius: 0.05rem;
      min-height: (265rem/64.684);

      h2 {
        height: (51rem/64.687);
        line-height: (51rem/64.687);
        width: (310rem/64.687);
        font-size: (16rem/64.687);
        color: rgb(50, 50, 50);
      }
      .appSpan {
        display: inline-block;
        width: (265rem/64.687);
        line-height: 0.3rem;
        text-align: left;
        font-size: (12rem/64.687);
        color: rgb(102, 102, 102);
      }
      .appPhone {
        display: inline-block;
        width: (265rem/64.687);
        font-size: (15rem/64.687);
        margin-top: 0.1rem;
        color: rgb(27, 157, 255);
        text-align: left;
      }
      .popupClose {
        width: 100%;
        height: (49rem/64.687);
        position: absolute;
        bottom: 0;
        left: 0;
        outline: none;
        border: 0;
        background: white;
        border-top: 0.01rem solid rgb(229, 229, 229);
        font-size: (15rem/64.687);
        color: rgb(50, 50, 50);
        border-radius: 0 0 0.05rem 0.05rem;
      }
    }

  }

  button {
    outline: none;
  }
</style>
