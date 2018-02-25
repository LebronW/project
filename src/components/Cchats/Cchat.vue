<template>
  <div id="Cchat" class="main">
    <mt-header fixed class="index-header" :title="sessionName | nameFilter(to, myInfo)">
      <router-link to="" slot="left" @click.native="history">
        <mt-button icon="back"></mt-button>
      </router-link>
      <mt-button slot="right" @click='Report()'>举报</mt-button>
    </mt-header>
    <div class="btn-groups" v-show="isLend">
      <div class="item">
        <mt-button class="btn xybg" @click="checkOrgetReport">{{reportTitle}}</mt-button>
      </div>
      <div class="item">
        <mt-button class="btn djt" @click="addLiou">
          <!--<img src="../../images/icon_eye@3x.png" slot="icon">-->
          打借条
        </mt-button>
      </div>
    </div>
    <!--<mt-button class="cc-btn" v-show="isLend" @click="checkOrgetReport">-->
    <!--<img src="../../images/icon_eye@3x.png" slot="icon">-->
    <!--{{reportTitle}}-->
    <!--</mt-button>-->
    <div class="m-chat-main" :class="{'cmt-header': !isLend, 'cmt-lend-header': isLend}">
      <chat-list ref="chatList"
                 type="session"
                 :msglist="msglist"
                 :userInfos="userInfos"
                 :myInfo="myInfo"
                 :isRobot="isRobot"
                 @msgs-loaded="msgsLoaded"
                 :canLoadMore="canLoadMore"
                 v-touch:swipedown="loadMore"
      ></chat-list>
      <chat-editor
        type="session"
        :scene="scene"
        :to="to"
        :isRobot="isRobot"
      ></chat-editor>
    </div>
    <mt-popup class="c-pop" v-model="fw_pop" position="bottom" popup-transition="popup-fade">
      <div class="head">
        <div>
          <button @click="fw_pop = false">取消</button>
        </div>
        <div>
          <h2>举报</h2>
        </div>
        <div>
          <button @click="sureReport">确定</button>
        </div>
      </div>
      <mt-picker :slots="report" @change="FWChange"></mt-picker>
    </mt-popup>

    <transition name="fade">
      <div class="mint-toast is-pbottom mint-toast-pop-leave-to mc-toast" v-show="isPublish">
        <img src="../../images/icon_gou.png" alt=""/>
        <span class="mint-toast-text">举报成功</span>
      </div>
    </transition>
  </div>
</template>

<script>
  /* eslint-disable */
  import ChatEditor from './ChatEditor'
  import ChatList from './ChatList'
  import util from '../../NetEaseSDK/utils'
  import pageUtil from '../../NetEaseSDK/utils/page'
  import {MessageBox, Toast} from 'mint-ui';
  import {getStore} from '../../config/mUtils'
  import {All} from '../../api/api'
  export default {
    components: {
      ChatEditor,
      ChatList
    },
    // 进入该页面，文档被挂载
    mounted () {
      //      let winH = document.body.offsetHeight;
//      let chatH = (winH / 64.687) - 0.8;
//      if (chatH > 0) document.getElementsByClassName("m-chat-list")[0].style.height = chatH + 'rem';
      this.$store.dispatch('showLoading');
      if (this.$route.query.borrowerId) this.borrowerId = this.$route.query.borrowerId;
      let userType = getStore("userType");
      if (userType && userType == "1") {
        this.isFF();
        this.isLend = true;
      }
      this.imFrom = getStore("imAccid");
      this.imTo = (this.$route.params.sessionId || '').replace(/^p2p-/, '');
      let Liou = this.$route.query.Liou;
      if (Liou && Liou == "ok") {
        this.$store.dispatch('sendMsg', {
          type: 'text',
          scene: this.scene,
          to: this.to,
          text: `${getStore("name")}已完成还款，请前往我的借条查看并确认已收到欠款`
        });
      }
      let request = this.$route.query.request;
      if (request && request == "ok") {
        let chatRequest = sessionStorage.getItem("chatRequest");
        this.$store.dispatch('sendMsg', {
          type: 'text',
          scene: this.scene,
          to: this.to,
          text: chatRequest
        });
        setTimeout(function () {
          sessionStorage.removeItem("chatRequest");
        }, 2000)
      }
      // 此时设置当前会话
      this.$store.dispatch('setCurrSession', this.sessionId);
      pageUtil.scrollChatListDown();
      setTimeout(() => {
        this.$store.dispatch('hideLoading')
      }, 1000);
      let to = this.to;
      if (to && !this.userInfos[to]) this.$store.dispatch('addFriend', this.to); // 添加好友
    },
    updated () {
//      let tempPagePos = pageUtil.getChatListHeight();
//      pageUtil.scrollChatListDown(tempPagePos - this.currPagePos);
//      this.currPagePos = tempPagePos
    },
    // 离开该页面，此时重置当前会话
    destroyed () {
      this.$store.dispatch('resetCurrSession')
    },
    data () {
      return {
        leftBtnOptions: {
          backText: ' ',
          preventGoBack: true
        },
        reportTitle: "获取信用报告",
        isLend: false,
        currPagePos: 0,
        fw_pop: false,
        report: [{
          flex: 1,
          values: ['淫秽色情', '营销广告', '恶意谩骂', '恶意诈骗'],
          textAlign: 'center'
        }],
        tipOffReason: null, // 投诉理由
        imFrom: null, // 投诉者id
        imTo: null, // 被投诉者的网易云id
        isPublish: false, // 举报成功,
        borrowerId: ""
      }
    },
    computed: {
      sessionId () {
        let sessionId = this.$route.params.sessionId || '';
        return sessionId
      },
      sessionName () {
        let sessionId = this.sessionId;
//      console.log(sessionId)
        let user = null;
        if (/^p2p-/.test(sessionId)) {
          user = sessionId.replace(/^p2p-/, '');
          if (user === this.$store.state.userUID) {
            return '我的手机'
          } else if (this.isRobot) {
            return this.robotInfos[user].nick
          } else {
            let userInfo = this.userInfos[user] || {};
            return util.getFriendAlias(userInfo)
          }
        } else if (/^team-/.test(sessionId)) {
          return '群'
        }
      },
      scene () {
        return util.parseSession(this.sessionId).scene
      },
      to () {
        return util.parseSession(this.sessionId).to
      },
      // 判断是否是机器人
      isRobot () {
        let sessionId = this.sessionId
        let user = null
        if (/^p2p-/.test(sessionId)) {
          user = sessionId.replace(/^p2p-/, '')
          if (this.robotInfos[user]) {
            return true
          }
        }
        return false
      },
      myInfo () {
        return this.$store.state.myInfo
      },
      userInfos () {
        return this.$store.state.userInfos
      },
      robotInfos () {
        return this.$store.state.robotInfos
      },
      msglist () {
        let msgs = this.$store.state.currSessionMsgs
        return msgs
      },
      canLoadMore () {
        return !this.$store.state.noMoreHistoryMsgs
      }
    },
    methods: {
      history () {
        this.$router.push({path: '/Session'});
      },
      addLiou() {
        let userName = this.sessionName;
        let userPhone = this.sessionId.replace(/^p2p-/, '');
        this.$router.push({path: '/CpublishLiou', query: {userName: userName, userPhone: userPhone}});
      },
      FWChange(picker, values) {
        this.tipOffReason = values[0];
      },
      Report() { // 打开举报
        this.fw_pop = true
      },
      sureReport() { // 确认举报
        var _this = this
        _this.fw_pop = false
        let params = {
          funCode: 110010,
          imFrom: _this.imFrom, // 投诉者的网易云id
          imTo: _this.imTo, // 被投诉者的网易云id
          tipOffReason: _this.tipOffReason
        }
        All(params).then(res => {
          if (res.retCode === '0000') {
            _this.isPublish = true;
            window.setTimeout(function () {
              _this.isPublish = false;
            }, 1000);
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
      },
      isFF() {
        let vm = this;
        let myInfo = vm.myInfo;
        let imAccid = vm.sessionId.replace(/^p2p-/, '');
        if (!myInfo) return Toast({message: "系统异常，请稍后重试", position: 'bottom', duration: 1500});
        if (myInfo && myInfo.custom && myInfo.custom.crm_borrower_report_record && myInfo.custom.crm_borrower_report_record.length !== 0) {
          let crm = myInfo.custom.crm_borrower_report_record;
          for (let i = 0; i < crm.length; i++) {
            if (crm[i] == imAccid) {
              vm.reportTitle = "查看信用报告";
              break;
            }
          }
        }
      },
      checkOrgetReport () {
        let _this = this;
        let stampsPay = (getStore("stampsPay")).split("_");
        let balance = getStore("balance");
        let lenderAccid = getStore("imAccid");
        let brrowerAccid = _this.sessionId.replace(/^p2p-/, '');
        let brrowerInfo = _this.userInfos[brrowerAccid];
        let bcustom = brrowerInfo.custom;
        let brrowerId = bcustom.userId;
        if (_this.borrowerId) brrowerId = _this.borrowerId;
        if (!brrowerAccid || !brrowerInfo || !bcustom || !brrowerId) return;
        switch (_this.reportTitle) {
          case "获取信用报告":
            if (!stampsPay[0] || !balance || !lenderAccid) return;
            MessageBox({
              title: '查看资料',
              message: `需要花费${stampsPay[0]}点券(原价${stampsPay[1]}点券)才能查看对方资料，是否查看?`,
              showCancelButton: true,
              confirmButtonText: '是',
              cancelButtonText: '否'
            }).then((action) => {
              if (action == 'confirm') {
                All({
                  funCode: 130005,
                  consumeType: "0",
                  consumeUserId: brrowerId,
                  borrowerAccid: brrowerAccid,
                  lenderAccid: lenderAccid,
                  stampsNum: stampsPay[0]
                }).then(res => {
                  if (res.retCode == "300003") {
                    // 点券不足去充值
                    MessageBox({
                      title: '充值点券',
                      message: '点券不足，无法查看，是否充值点券?',
                      showCancelButton: true,
                      confirmButtonText: '是',
                      cancelButtonText: '否'
                    }).then((action) => {
                      if (action === 'confirm') {
                        let path = _this.$route.path;
                        path = path.substr(1, path.length - 1);
                        _this.$router.push({path: '/Cpaycoup', from: path});
                      }
                    });
                  }
                  if (res.retCode != "0000") return Toast({message: res.retMsg, position: 'bottom', duration: 1500});
                  // 获取信用报告
                  _this.$store.dispatch('sendMsg', {
                    type: 'custom',
                    scene: this.scene,
                    to: this.to,
                    pushContent: '',
                    content: {
                      type: 6,
                      data: {
                        value: `获取成功！查看 <a href='#/CcreditReport?borrowerId=${brrowerId}&from=Cchat_${_this.sessionId}&imAccid=${brrowerAccid}' class='report_a'>${_this.sessionName}信用报告</a>`
                      }
                    },
                    isLocal: true
                  });
                  pageUtil.scrollChatListDown();
                });
              }
            });
            break;
          case "查看信用报告":
            _this.$router.push({
              path: '/CcreditReport',
              query: {borrowerId: brrowerId, from: `Cchat_${_this.sessionId}`, imAccid: brrowerAccid}
            });
            break;
        }
      },
//      getReport() {
//        let vm = this;
//        let isFF = false;
//        let myInfo = vm.myInfo;
//        let userInfos = vm.userInfos;
//        let imAccid = vm.sessionId.replace(/^p2p-/, '');
//        let userInfo = userInfos[imAccid];
//        if (!myInfo || !userInfo) return Toast({message: "系统异常，请稍后重试", position: 'bottom', duration: 1500});
//        let consumeUser = userInfo.custom;
//        if (myInfo && myInfo.custom && myInfo.custom.crm_borrower_report_record && myInfo.custom.crm_borrower_report_record.length !== 0) {
//          let crm = myInfo.custom.crm_borrower_report_record;
//          for (let i = 0; i < crm.length; i++) {
//            if (crm[i] == imAccid) {
//              isFF = true;
//              break;
//            }
//          }
//        }
//        if (!isFF) {    // 未付费
//          let stampsPay = (getStore("stampsPay")).split("_");
//          if (!stampsPay[0]) return;
//          MessageBox({
//            title: '查看资料',
//            message: `需要花费${stampsPay[0]}点券(原价${stampsPay[1]}点券)才能查看对方资料，是否查看?`,
//            showCancelButton: true,
//            confirmButtonText: '是',
//            cancelButtonText: '否'
//          }).then((action) => {
//            if (action == 'confirm') {
//              let balance = getStore("balance");
//              let consumeUserId = consumeUser.userId;
//              let borrowAccid = imAccid;
//              let lenderAccid = getStore("imAccid");
//              if (!stampsPay[0] || !consumeUserId || !lenderAccid || !borrowAccid) return;
//              All({
//                funCode: 130005,
//                consumeType: "0",
//                consumeUserId: consumeUserId,
//                borrowerAccid: borrowAccid,
//                lenderAccid: lenderAccid,
//                stampsNum: stampsPay[0]
//              }).then(res => {
//                if (res.retCode == "300003") {
//                  // 点券不足去充值
//                  MessageBox({
//                    title: '充值点券',
//                    message: '点券不足，无法查看，是否充值点券?',
//                    showCancelButton: true,
//                    confirmButtonText: '是',
//                    cancelButtonText: '否'
//                  }).then((action) => {
//                    if (action === 'confirm') {
//                      let path = this.$route.path;
//                      path = path.substr(1, path.length - 1);
//                      this.$router.push({path: '/Cpaycoup', from: path});
//                    }
//                  });
//                }
//                if (res.retCode != "0000") return;
//                // 获取信用报告
//                let userInfo = vm.userInfos[imAccid];
//                let consumeUserId = "";
//                console.log(userInfo)
//                if (userInfo && userInfo.custom && userInfo.custom.userId) consumeUserId = userInfo.custom.userId;
//                if (!consumeUserId || !vm.sessionId || !imAccid) return;
//                vm.$store.dispatch('sendMsg', {
//                  type: 'custom',
//                  scene: this.scene,
//                  to: this.to,
//                  pushContent: '',
//                  content: {
//                    type: 6,
//                    data: {
//                      value: `获取成功！查看 <a href='#/CcreditReport?borrowerId=${consumeUserId}&from=Cchat_${vm.sessionId}&imAccid=${imAccid}' class='report_a'>${vm.sessionName}信用报告</a>`
//                    }
//                  },
//                  isLocal: true
//                });
//                pageUtil.scrollChatListDown();
//              })
//            }
//          });
//        } else {
//          let userInfo = vm.userInfos[imAccid];
//          let consumeUserId = "";
//          if (userInfo && userInfo.custom && userInfo.custom.userId) consumeUserId = userInfo.custom.userId;
//          if (!consumeUserId || !vm.sessionId || !imAccid) return;
//          vm.$store.dispatch('sendMsg', {
//            type: 'custom',
//            scene: this.scene,
//            to: this.to,
//            pushContent: '',
//            content: {
//              type: 6,
//              data: {
//                value: `获取成功！查看 <a href='#/CcreditReport?borrowerId=${consumeUserId}&from=Cchat_${vm.sessionId}&imAccid=${imAccid}' class='report_a'>${vm.sessionName}信用报告</a>`
//              }
//            },
//            isLocal: true
//          });
//          pageUtil.scrollChatListDown();
//        }
//      },
      msgsLoaded () {
//        pageUtil.scrollChatListDown();
      },
//      enterNameCard () {
//        if (/^p2p-/.test(this.sessionId)) {
//          let account = this.sessionId.replace(/^p2p-/, '')
//          if (account === this.$store.state.userUID) {
//            location.href = `#/general`
//            return
//          }
//          location.href = `#/namecard/${account}`
//        }
//      },
      getHistoryMsgs () {
        if (this.canLoadMore) {
          this.$store.dispatch('getHistoryMsgs', {
            scene: this.scene,
            to: this.to
          });
          let tempPagePos = pageUtil.getChatListHeight();
          pageUtil.scrollChatListDown(tempPagePos - this.currPagePos);
          this.currPagePos = tempPagePos;
        }
      },
      loadMore () {
        if (pageUtil.getChatListScroll() <= 5) {
          this.getHistoryMsgs()
        }
      }
    },
    filters: {
      nameFilter(val, to, myInfo) {
        if (getStore("userType") && getStore("userType") == 1) {
          let res = "";
          if (val) res = val.substring(0, 1) + "**";
          if (myInfo && myInfo.custom && myInfo.custom.crm_borrower_report_record && myInfo.custom.crm_borrower_report_record.length !== 0) {
            let crm = myInfo.custom.crm_borrower_report_record;
            for (let i = 0; i < crm.length; i++) {
              if (crm[i] === to) res = val;
            }
          }
          return res;
        } else return val;

      }
    }
  }
  /**
   *  删除本地会话消息
   *  let s = this;
   *  this.$store.dispatch('deleteSession', s.sessionId);
   */

</script>
<style lang="scss">
  @import "../../common/sass/Cyucb";

  #Cchat {
    /*flex: 1;*/
    /*position: fixed;*/
    /*z-index: 20;*/
    /*overflow-y: hidden;*/

    /*.cc-btn {*/
    /*top: 0.8rem;*/
    /*box-shadow: none;*/
    /*width: 100%;*/
    /*height: rem(44rem);*/
    /*background: #ffffff;*/
    /*color: #888;*/
    /*font-size: rem(14rem);*/
    /*position: fixed;*/
    /*!*position: absolute;*!*/
    /*z-index: 10;*/

    /*img {*/
    /*height: rem(16rem);*/
    /*margin-right: rem(3rem);*/
    /*}*/
    /*}*/
    .btn-groups {
      top: 0.8rem;
      box-shadow: none;
      width: 100%;
      height: rem(58rem);
      background: url("../../images/img_ltbg@2x.png");
      background-size: 100% 100%;
      color: #888;
      font-size: rem(14rem);
      position: fixed;
      z-index: 10;
      display: -webkit-flex; /* Safari */
      display: flex;
      justify-content: space-between;
      align-content: center;
      .item {
        flex-grow: 1;
        height: 100%;
        width: 50%;
        background: transparent;
        border: none;
        text-align: center;
        vertical-align: middle;
        line-height: rem(58rem);

        .btn {
          /*width: 100%;*/
          /*height: 100%;*/
          background: transparent;
          border: none;
          box-shadow: 0 0 0 transparent;
          height: auto;
          padding: rem(4rem) rem(15rem) rem(6rem) rem(15rem);
          border-radius: rem(6rem);
          .mint-button-text {
            font-weight: 600;
            color: #ffffff;
            font-size: rem(16rem);
          }
        }

        .btn.xybg {
          background: #1b9dff;
        }
        .btn.djt {
          background: #ffaa00;
        }
        img {
          height: rem(16rem);
          margin-right: rem(3rem);
        }
      }
    }
    .cmt-header {
      padding-top: 0.8rem !important;
    }

    /* 聊天页面 */
    .m-chat-main {
      /*position: relative;*/
      position: fixed;
      /*bottom: 0;*/
      /*z-index: 500;*/
      display: block;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      overflow: hidden;
      /* 聊天页面有输入框 */
      padding: 0 0 rem(50rem) 0;

      .m-chat-editor {

      }
    }
    .m-chat-main.cmt-lend-header {
      padding-top: 0.8rem + rem(44rem);
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

  .mint-toast-icon .c-icon-success {
    background: url("../../images/icon_gou.png");

  }

</style>
