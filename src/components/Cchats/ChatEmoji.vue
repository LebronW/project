<template>
  <div class="m-chat-emoji">
    <div class="emoji-content">
      <div class="cnt">
        <mt-swipe :auto="0" v-if="currEmoji.list.length === 125" class="cmt-swipe">
          <mt-swipe-item v-for="(p, i1) in pages" :key='p.key'>
            <span
              v-for="(item, i2) in currEmoji.list"
              v-show="i1 == 0 && i2 < 27"
              class="emoji-item"
              :class="{'pinup-item':item.type==='pinup'}"
              @click.stop="selectEmoji(item)">
                <img :src="item.img">
            </span>
            <span
              v-for="(item, i2) in currEmoji.list"
              v-show="i1 == 1 && 27 <= i2 && i2 < 54"
              class="emoji-item"
              :class="{'pinup-item':item.type==='pinup'}"
              @click.stop="selectEmoji(item)">
                <img :src="item.img">
            </span>
            <span
              v-for="(item, i2) in currEmoji.list"
              v-show="i1 == 2 && 54 <= i2 && i2 < 81"
              class="emoji-item"
              :class="{'pinup-item':item.type==='pinup'}"
              @click.stop="selectEmoji(item)">
                <img :src="item.img">
            </span>
            <span
              v-for="(item, i2) in currEmoji.list"
              v-show="i1 == 3 && 81 <= i2 && i2 < 108"
              class="emoji-item"
              :class="{'pinup-item':item.type==='pinup'}"
              @click.stop="selectEmoji(item)">
                <img :src="item.img">
            </span>
            <span
              v-for="(item, i2) in currEmoji.list"
              v-show="i1 == 4 && 108 <= i2 && i2 < 135"
              class="emoji-item"
              :class="{'pinup-item':item.type==='pinup'}"
              @click.stop="selectEmoji(item)">
                <img :src="item.img">
            </span>
          </mt-swipe-item>
        </mt-swipe>
        <span v-else class="emoji-item" :class="{'pinup-item':item.type==='pinup'}" v-for="item in currEmoji.list"
              @click.stop="selectEmoji(item)">
        <img :src="item.img">
        </span>
      </div>
    </div>
    <div class="emoji-channel">
      <span class="emoji-album" :class="{active: item.name==currAlbum}" v-for="(item, index) in emoji"
            @click.stop="selectAlbum(item)">
        <img :src="item.album">
      </span>
      <!--<span v-if="type==='session'" class="emoji-album" :class="{active: item.name==currAlbum}"-->
      <!--v-for="item in pinup" @click.stop="selectAlbum(item)">-->
      <!--<img :src="item.album">-->
      <!--</span>-->
    </div>
  </div>
</template>

<script>
  import emojiObj from '../../NetEaseSDK/wyConfigs/emoji'
  function genEmojiList(type, emojiList) {
    let result = {}
    for (let name in emojiList) {
      let emojiMap = emojiList[name]
      let list = []
      for (let key in emojiMap) {
        list.push({
          type,
          name,
          key,
          img: emojiMap[key].img
        })
      }
      if (list.length > 0) {
        result[name] = {
          type,
          name,
          list,
          album: list[0].img
        }
      }
    }
    return result
  }

  export default {
    components: {},
    props: {
      type: String,
      scene: String,
      to: String
    },
    data () {
      return {
        currType: 'emoji',
        currAlbum: 'emoji',
        pages: [{}, {}, {}, {}, {}]
      }
    },
    computed: {
      emoji () {
        return genEmojiList('emoji', emojiObj.emojiList)
      },
      pinup () {
        return genEmojiList('pinup', emojiObj.pinupList)
      },
      currEmoji () {
        if (this.currType === 'emoji') {
          return this.emoji[this.currAlbum]
        } else if (this.currType === 'pinup') {
          return this.pinup[this.currAlbum]
        }
        return []
      }
    },
    methods: {
      selectAlbum (album) {
        this.currType = album.type
        this.currAlbum = album.name
      },
      selectEmoji (emoji) {
        if (this.currType === 'emoji') {
          // 由触发父组件事件，增加表情文案
          this.$emit('add-emoji', emoji.key)
        } else if (this.currType === 'pinup') {
          if (this.type === 'session') {
            this.$store.dispatch('sendMsg', {
              type: 'custom',
              scene: this.scene,
              to: this.to,
              pushContent: '[贴图表情]',
              content: {
                type: 3,
                data: {
                  catalog: this.currAlbum,
                  chartlet: emoji.key
                }
              }
            })
          } else if (this.type === 'chatroom') {
            this.$store.dispatch('sendChatroomMsg', {
              type: 'custom',
              pushContent: '[贴图表情]',
              content: {
                type: 3,
                data: {
                  catalog: this.currAlbum,
                  chartlet: emoji.key
                }
              }
            })
          }
          this.$emit('hide-emoji')
        }
      }
    }
  }
</script>

<style lang="scss">
  @import "../../common/sass/Cyucb";

  .m-chat-emoji {
    border-top: rem(1rem) solid #d9d9da;
    position: absolute;
    bottom: 0;
    height: rem(230rem);
    left: 0;
    width: 100%;
    background-color: #f6f6f6;
    .emoji-channel {
      background: #ffffff;
      position: relative;
      width: 100%;
      height: auto;
      /*margin: 0 1rem;*/
      .emoji-album {
        display: inline-block;
        /*padding: 0.1rem;*/
        width: rem(45rem);
        height: rem(44rem);
        border-right: 1px solid #f0f0f0;
        img {
          margin: rem(7rem);
          display: block;
          /*width: inherit;*/
          /*height: inherit;*/
          width: rem(31rem);
          height: rem(30rem)
        }
        &.active {
          background-color: #f6f6f6;
        }
      }
    }
    .emoji-content {
      position: relative;
      width: 100%;
      height: rem(187rem);
      background-color: #f6f6f6;
      overflow-y: auto;
      .cnt {
        position: relative;
        display: block;
        margin: rem(24rem) rem(16rem);
        text-align: left;
      }
      .emoji-item {
        display: inline-block;
        width: rem(28rem);
        height: rem(28rem);
        padding: rem(7rem);
        vertical-align: middle;
        /*border: 1px solid #fff;*/
        /*margin-left: -1px;*/
        /*margin-bottom: -1px;*/
        img {
          width: inherit;
          height: inherit;
        }
      }
      .pinup-item {
        width: 44px;
        height: 44px;
      }
    }

    .cmt-swipe{
      height: rem(167rem);
      .mint-swipe-indicator {
        width: rem(8rem);
        height: rem(8rem);
        border-radius: 50%;
      }
      .mint-swipe-indicator.is-active {
        background: #666;
        opacity: 1;
        border-radius: 50%;
      }
    }

  }
</style>
