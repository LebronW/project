<template>
  <div class="g-inherit m-main p-session">
    <mt-header fixed class="index-header" title="消息记录">
      <!--<router-link to="" slot="left" @click.native="history">-->
      <!--</router-link>-->
    </mt-header>
    <div class="con">
      <mt-cell :title="session.name | filterName(session, myInfo)"
               :label='session.lastMsgShow'
               v-for="(session, index) in sessionlist"
               :key="session.id"
               :sessionId="session.id"
               :inline-desc="session.lastMsgShow"
               @click.native="enterChat(session)">
        <span> {{session.updateTimeShow}}</span>
        <img slot="icon" :src="session.avatar" width="24" height="24">
        <span v-show="session.publishLoanInfo">个人&nbsp;|&nbsp;借款{{session.publishLoanInfo}}元</span>
        <span v-show="session.unread > 0" class="u-unread">{{session.unread}}</span>
      </mt-cell>
    </div>
  </div>
</template>

<script>
  /* eslint-disable */
  import {getStore} from '../../config/mUtils'
  import util from '../../NetEaseSDK/utils'
  import config from '../../NetEaseSDK/wyConfigs'
  import {callbackURL} from '../../api/api'
  //  import md5 from '../../NetEaseSDK/utils/md5'
  export default {
    data () {
      return {
        delSessionId: null,
        stopBubble: false,
        noticeIcon: config.noticeIcon,
        myPhoneIcon: config.myPhoneIcon
      }
    },
    mounted() {
      sessionStorage.setItem("type", 2);
    },
    computed: {
      sysMsgUnread () {
        let temp = this.$store.state.sysMsgUnread;
        let sysMsgUnread = temp.addFriend || 0;
        let customSysMsgUnread = this.$store.state.customSysMsgUnread;
        return sysMsgUnread + customSysMsgUnread
      },
      userInfos () {
        return this.$store.state.userInfos
      },
      publishLoanInfo () {
        return this.$store.state.userInfos
      },
      myInfo () {
        return this.$store.state.myInfo
      },
      myPhoneId () {
        return `${this.$store.state.userUID}`
      },
      sessionlist () {
        let sessionlist = this.$store.state.sessionlist.filter(item => {
          item.name = ''
          item.avatar = ''
          if (item.scene === 'p2p') {
            let userInfo = null
            if (item.to !== this.myPhoneId) {
              userInfo = this.userInfos[item.to]
            } else {
              // userInfo = this.myInfo
              // userInfo.alias = '我的手机'
              // userInfo.avatar = `${config.myPhoneIcon}`
              return false
            }
            if (userInfo) {
              item.name = util.getFriendAlias(userInfo);
              item.avatar = userInfo.avatar;
              item.publishLoanInfo = userInfo.custom.publishLoanInfo || "";
            }
          }
          let lastMsg = item.lastMsg || {}
          if (lastMsg.type === 'text') {
            item.lastMsgShow = lastMsg.text || ''
          } else if (lastMsg.type === 'custom') {
            item.lastMsgShow = util.parseCustomMsg(lastMsg)
          } else if (util.mapMsgType(lastMsg)) {
            item.lastMsgShow = `[${util.mapMsgType(lastMsg)}]`
          } else {
            item.lastMsgShow = ''
          }
          if (item.updateTime) {
            item.updateTimeShow = util.formatDate(item.updateTime, true)
          }
          return item
        });
        return sessionlist
      }
    },
    methods: {
      enterSysMsgs () {
//        location.href = '#/sysmsgs'
      },
      enterChat (session) {
        if (session && session.id) {
          window.location.href = callbackURL(`Cchat/${session.id}`);
        }
      },
      deleteSession () {
        if (this.delSessionId !== null) {
          this.$store.dispatch('deleteSession', this.delSessionId)
        }
      },
      hideDelBtn () {
        if (this.delSessionId !== null && !this.stopBubble) {
          // 用于判断是否前置状态是显示删除按钮
          this.delSessionId = null
          return true
        }
        return false
      }
    },
    components: {},
    filters: {
      filterName(val, session, myInfo) {
        if (getStore("userType") && getStore("userType") == 1) {
          let res = session.name.substring(0, 1) + "**";
          if (myInfo && myInfo.custom && myInfo.custom.crm_borrower_report_record && myInfo.custom.crm_borrower_report_record.length !== 0) {
            let crm = myInfo.custom.crm_borrower_report_record;
            for (let i = 0; i < crm.length; i++) {
              if (crm[i] === session.to) res = session.name;
            }
          }
          return res;
        } else return session.name;
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  .p-session {
    width: 100%;
    height: 100%;
    background: #eeeff6;

    .mint-header {
      /*margin-bottom: 1rem;*/
    }

    .mint-cell {
      width: 100%;
      height: (74rem/64.687);
      min-height: (74rem/64.687);
      margin-top: (10rem/64.687);
      position: static;

      .mint-cell-wrapper {
        position: relative;
        .mint-cell-title {
          width: 100%;
          height: (74rem/64.687);
          /*min-height: (74rem/64.687);*/

          img {
            width: (42rem/64.687);
            height: (42rem/64.687);
            margin-top: (15rem/64.687);
            border-radius: (6rem/64.687);
          }
          span:nth-child(2) {
            font-size: (15rem/64.687);
            margin-left: 0.1rem;
            display: inline-block;
            margin-top: -0.1rem;
          }
          span:nth-child(3) {
            font-size: (12rem/64.687);
            margin-left: 0.85rem;
            margin-top: -0.2rem;
          }
        }
        .mint-cell-value {
          span:nth-child(1) {
            font-size: (12rem/64.687);
          }
          span:nth-child(2) {
            position: absolute;
            display: inline-block;
            width: 100%;
            left: 2.2rem;
            font-size: (12rem/64.687);
            top: 0.3rem;
          }
        }
      }
    }
    .con {
      padding-top: 0.8rem + (10rem/64.687);
      padding-bottom: 0.9rem + (10rem/64.687);
    }
    // .mint-cell:nth-child(2) {
    //   margin-top: 0.8rem + (10rem/64.687);
    // }
    .vux-cell-primary {
      max-width: 70%;
    }

    .u-unread {
      border-radius: 50%;
      border: 1px solid red;
      background: red;
      color: #fff;
      font-size: 10px;
      position: absolute;
      top: (10rem/64.687);
      left: (43rem/64.687);
      width: (8rem/64.687);
      height: (12rem/64.687);
      padding: 0 (4rem/64.687) (2rem/64.687) (4rem/64.687);
      font-weight: bold;
    }
  }
</style>
