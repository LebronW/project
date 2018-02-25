<template>
  <ul id="chat-list" class="m-chat-list p-chat-list">
    <li class="u-msg item-time" v-if="canLoadMore">
      ---- 上拉加载更多 ----
    </li>
    <li class="u-msg item-time" v-else>
      ---- 已无更多记录 ----
    </li>
    <chat-item
      v-for="msg in msglist"
      :type="type"
      :rawMsg="msg"
      :isRobot="isRobot"
      :userInfos="userInfos"
      :myInfo="myInfo"
      :key="msg.idClient"
      @msg-loaded="msgLoaded"
    ></chat-item>
  </ul>
</template>
<script type="text/javascript">
  import ChatItem from './ChatItem'

  export default {
    components: {
      ChatItem
    },
    props: {
      type: String, // 类型，chatroom, session
      canLoadMore: [String, Boolean],
      isRobot: {
        type: Boolean,
        default () {
          return false
        }
      },
      msglist: {
        type: Array,
        default () {
          return []
        }
      },
      userInfos: {
        type: Object,
        default () {
          return {}
        }
      },
      myInfo: {
        type: Object,
        default () {
          return {}
        }
      }
      // robotInfos: {
      //   type: Object,
      //   default () {
      //     return {}
      //   }
      // }
    },
    data () {
      return {
        isFullImgShow: false,
        msgLoadedTimer: null
      }
    },
    methods: {
      showFullImg (src) {
        this.$store.dispatch('showFullscreenImg', {
          src
        })
      },
      msgLoaded () {
        clearTimeout(this.msgLoadedTimer)
        this.msgLoadedTimer = setTimeout(() => {
          this.$emit('msgs-loaded')
        }, 20)
      }
    }
  }
</script>

<style lang="scss">
  @import "../../common/sass/Cyucb";

  .m-chat-list {
    position: relative;
    display: block;
    box-sizing: border-box;
    padding: rem(16rem) rem(12rem);
    width: 100%;
    height: 100%;
    -webkit-overflow-scrolling: touch;
    overflow-y: scroll;
    overflow-x: hidden;
  }

  .u-msg.item-time {
    font-size: rem(12rem);
    text-align: center;
    position: relative;
    padding: rem(18rem) 0;
    color: #000;
  }

  .u-msg.item-time:first-child {
    padding-top: rem(5rem);
    padding-bottom: 0;
  }

  .p-chat-list {
    .u-icon {
      width: 1.4rem;
      height: 1.6rem;
      margin-right: 0.2rem;
      vertical-align: bottom;
    }
  }
</style>
