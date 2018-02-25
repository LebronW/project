<template>
  <div class="m-chat-editor" @click="hideRobotList">
    <div class="m-chat-editor-main clearfix">
      <div class="u-editor-icons-l pull-left">
        <img class="u-editor-emoji" :src="icon1" @click.stop="showEmoji">
      </div>
      <div class="u-editor-input pull-left">
        <input v-model="msgToSent" v-focus="focusState"/>
      </div>
      <div class="u-editor-icons-r pull-right">
        <button class="u-editor-send" @click="sendTextMsg">发 送</button>
      </div>
    </div>
    <chat-emoji
      v-bind:type="type"
      v-bind:scene="scene"
      v-bind:to="to"
      v-show="isEmojiShown"
      v-on:add-emoji="addEmoji"
      v-on:hide-emoji="hideEmoji"
    ></chat-emoji>
  </div>
</template>

<script>
  /* eslint-disable */
  import {Toast} from 'mint-ui';
  import ChatEmoji from './ChatEmoji'
  import pageUtil from '../../NetEaseSDK/utils/page';
  import {getStore} from '../../config/mUtils'
  import {All} from '../../api/api'
  export default {
    components: {
      ChatEmoji
    },
    updated () {
      window.document.body.addEventListener('click', () => {
        this.isEmojiShown = false
      })
    },
    props: {
      type: String,
      scene: String,
      to: String,
      isRobot: {
        type: Boolean,
        default () {
          return false
        }
      }
    },
    watch: {
      continueRobotAccid (curVal, oldVal) {
        if (curVal && this.robotInfos[curVal]) {
          this.msgToSent = `@${this.robotInfos[curVal].nick} `
        }
        // 重置
        this.$store.dispatch('continueRobotMsg', '')
      },
      msgToSent (curVal, oldVal) {
        if (this.isRobot) {
          return
        }
        let indexAt = this.msgToSent.indexOf('@')
        if (indexAt >= 0 && (indexAt === this.msgToSent.length - 1)) {
          if (this.robotslist && this.robotslist.length > 0) {
            this.isRobotListShown = true
          }
        } else if (this.isRobotListShown === true) {
          this.isRobotListShown = false
        }
      },
      isEmojiShown: function (val) {
        let h = 0;
        this.icon1 = val ? require('../../images/icon_jianpan@2x.png') : require('../../images/icon_bq@2x.png');
        h = val ? (50 + 230) / 64.687 : (50) / 64.687;
        if (h > 0) document.getElementsByClassName("m-chat-main")[0].style.paddingBottom = h + 'rem';
      }
    },
    data () {
      return {
        isEmojiShown: false,
        isRobotListShown: false,
        focusState: false,
        msgToSent: '',
        icon1: require('../../images/icon_bq@2x.png')
      }
    },
    computed: {
      continueRobotAccid () {
        return this.$store.state.continueRobotAccid
      },
      robotslist () {
        return this.$store.state.robotslist
      },
      robotInfos () {
        return this.$store.state.robotInfos
      },
      robotInfosByNick () {
        return this.$store.state.robotInfosByNick
      }
    },
    methods: {
      abc(text) {
        var value = text.replace(/[^0-9]/ig, "");
//  		var value = phone.substring(phone.length-11)
        return value
      },
      sendTextMsg () {
        let _this = this;
        // 屏蔽手机号
        let msgY = this.msgToSent;
        let phoneReg = /^1[3|4|5|6|7|8|9][0-9]{9}$/;
        let msgPhone = this.msgToSent.match(/\d+/g);
        if (msgPhone) {
          for (let i = 0; i < msgPhone.length; i++) {
            if (msgPhone[i] && phoneReg.test(msgPhone[i]) && msgY.indexOf(msgPhone[i]) >= 0) {
              this.msgToSent = this.msgToSent.replace(msgPhone[i], "******");
            }
            if (msgPhone[i] && msgPhone[i].length >= 11) {
              let qian11 = msgPhone[i].substring(0, 11);
              let hou11 = msgPhone[i].substring(msgPhone[i].length - 11);
              if (phoneReg.test(qian11)) this.msgToSent = this.msgToSent.replace(qian11, "******");
              if (phoneReg.test(hou11)) this.msgToSent = this.msgToSent.replace(hou11, "******");
            }
          }
        }

        if (/^\s*$/.test(this.msgToSent)) {
          Toast({
            message: '不能为空',
            position: 'bottom',
            duration: 1000
          });
          return
        } else if (this.msgToSent.length > 800) {
          Toast({
            message: '请不要超过800个字',
            position: 'bottom',
            duration: 1000
          });
          return
        }
        this.msgToSent = this.msgToSent.trim();
        if (this.type === 'session') {
          // 如果是机器人
          if (this.isRobot) {
            this.$store.dispatch('sendRobotMsg', {
              type: 'text',
              scene: this.scene,
              to: this.to,
              robotAccid: this.to,
              // 机器人后台消息
              content: this.msgToSent,
              // 显示的文本消息
              body: this.msgToSent
            })
          } else {
            let robotAccid = ''
            let robotText = ''

            let atUsers = this.msgToSent.match(/@[^\s@$]+/g)
            if (atUsers) {
              for (let i = 0; i < atUsers.length; i++) {
                let item = atUsers[i].replace('@', '')
                if (this.robotInfosByNick[item]) {
                  robotAccid = this.robotInfosByNick[item].account
                  robotText = (this.msgToSent + '').replace(atUsers[i], '').trim()
                  break
                }
              }
            }
            if (robotAccid) {
              if (robotText) {
                this.$store.dispatch('sendRobotMsg', {
                  type: 'text',
                  scene: this.scene,
                  to: this.to,
                  robotAccid,
                  // 机器人后台消息
                  content: robotText,
                  // 显示的文本消息
                  body: this.msgToSent
                });
                pageUtil.scrollChatListDown();
              } else {
                this.$store.dispatch('sendRobotMsg', {
                  type: 'welcome',
                  scene: this.scene,
                  to: this.to,
                  robotAccid,
                  // 显示的文本消息
                  body: this.msgToSent
                });
                pageUtil.scrollChatListDown();
              }
            } else {
              this.$store.dispatch('sendMsg', {
                type: 'text',
                scene: this.scene,
                to: this.to,
                text: this.msgToSent
              });
              let userType = getStore("userType");
              if (userType && userType == "2") {
                let loanAccid = getStore("imAccid");
                let userInfos = _this.$store.state.userInfos;
                let lendAccid = (_this.$route.params.sessionId).replace(/^p2p-/, '');
                if (!loanAccid || !userInfos || !lendAccid) return;
                if (userInfos && lendAccid && userInfos[lendAccid] && userInfos[lendAccid].custom && userInfos[lendAccid].custom.crm_borrower_report_record && userInfos[lendAccid].custom.crm_borrower_report_record.length > 0) {
                  let crm = userInfos[lendAccid].custom.crm_borrower_report_record;
                  for (let i = 0; i < crm.length; i++) {
                    if (crm[i] == loanAccid) return;
                  }
                }
                let p = {
                  funCode: "130009",
                  borrowerAccId: loanAccid,
                  lenderAccId: lendAccid,
                  lenderId: userInfos[lendAccid].custom.userId
                };
                All(p).then(res => {})
              }
              pageUtil.scrollChatListDown();
            }
          }
        } else if (this.type === 'chatroom') {
          let robotAccid = ''
          let robotText = ''

          let atUsers = this.msgToSent.match(/@[^\s@$]+/g)
          if (atUsers) {
            for (let i = 0; i < atUsers.length; i++) {
              let item = atUsers[i].replace('@', '')
              if (this.robotInfosByNick[item]) {
                robotAccid = this.robotInfosByNick[item].account
                robotText = (this.msgToSent + '').replace(atUsers[i], '').trim()
                break
              }
            }
          }
          if (robotAccid) {
            if (robotText) {
              this.$store.dispatch('sendChatroomRobotMsg', {
                type: 'text',
                robotAccid,
                // 机器人后台消息
                content: robotText,
                // 显示的文本消息
                body: this.msgToSent
              })
            } else {
              this.$store.dispatch('sendChatroomRobotMsg', {
                type: 'welcome',
                robotAccid,
                // 显示的文本消息
                body: this.msgToSent
              })
            }
          } else {
            this.$store.dispatch('sendChatroomMsg', {
              type: 'text',
              text: this.msgToSent
            })
          }
        }
        this.msgToSent = ''
      },
      sendFileMsg () {
        let ipt = this.$refs.fileToSent
        if (ipt.value) {
          if (this.type === 'session') {
            this.$store.dispatch('sendFileMsg', {
              scene: this.scene,
              to: this.to,
              fileInput: ipt
            })
          } else if (this.type === 'chatroom') {
            this.$store.dispatch('sendChatroomFileMsg', {
              fileInput: ipt
            })
          }
        }
      },
      showEmoji () {
        let vm = this;
        vm.icon1 = require('../../images/icon_jianpan@2x.png');
        setTimeout(function () {
          vm.isEmojiShown = true;
        }, 200);
      },
      hideEmoji () {
        let h = (50) / 64.687;
        document.getElementsByClassName("m-chat-main")[0].style.paddingBottom = h + 'rem';
        this.isEmojiShown = false;
      },
      addEmoji (emojiName) {
        this.msgToSent += emojiName;
        this.hideEmoji()
      },
      chooseRobot (robot) {
        if (robot && robot.account) {
          let len = this.msgToSent.length;
          if (len === 0 || this.msgToSent[len - 1] !== '@') {
            this.msgToSent += '@' + robot.nick + ' '
          } else {
            this.msgToSent += robot.nick + ' '
          }
        }
      },
      hideRobotList () {
        this.isRobotListShown = false
      }
    },
    directives: {
      focus: {
        update: function (el, {value}) {
          if (value) {
            el.focus();
          }
        }
      }
    }
  }
</script>

<style lang="scss">
  @import "../../common/sass/Cyucb";

  .m-chat-editor {
    background: #f6f6f6;
    /*position: relative;*/
    height: rem(51rem);
    width: 100%;
    /*border-top: rem(1rem) solid #d9d9da;*/
    background-image: -webkit-linear-gradient(top, #d9d9d9, #d9d9d9 50%, transparent 50%);
    background-image: linear-gradient(180deg, #d9d9d9, #d9d9d9 50%, transparent 50%);
    background-size: 120% 1px;
    background-repeat: no-repeat;
    background-position: top left;
    background-origin: content-box;

    .m-chat-editor-main {
      .u-editor-icons-l {
        height: rem(50rem);
        width: 12.5%;
        text-align: center;
        padding-top: rem(11rem);
        .u-editor-emoji {
          width: rem(27rem);
          height: rem(27rem);
        }
      }

      .u-editor-input {
        height: rem(50rem);
        padding-top: rem(7rem);
        width: 65%;
        input {
          font-size: rem(14rem);
          height: rem(34rem);
          width: 100%;
          border-radius: rem(6rem);
          background: #fcfcfc;
          outline: none;
          border: rem(1rem) solid #d9d9d9;
        }
      }

      .u-editor-icons-r {
        height: rem(50rem);
        width: 22.5%;
        text-align: center;
        padding-top: rem(7rem);
        .u-editor-send {
          width: 76%;
          height: rem(36rem);
          border-radius: rem(6rem);
          color: rgb(102, 102, 102);
          font-size: rem(12rem);
          border: solid #d9d9da rem(1rem);
          background: #fcfcfc;
          outline: none;
        }
      }
    }

    .u-icon-img {
      width: rem(12rem);
      height: rem(12rem);
    }
  }

  .m-chat-robot {
    overflow-y: scroll;
    .weui-cells {
      .weui-cell__hd {
        margin-right: 0.5rem;
      }
    }
  }


</style>
