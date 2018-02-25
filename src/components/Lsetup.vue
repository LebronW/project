<template>
  <section class="Lsetup">
    <div class="forgetHead">
      <img src="../images/fauhuibaise.png@2x.png" @click='history'/>
      <span>设置</span>
    </div>
    <div class="LsetupContent">
      <div @click='modify'>
        <mt-cell is-link title="编辑资料" class="borrow"></mt-cell>
      </div>
      <div style='margin-top: (20rem/64.687);'>
        <mt-cell title="当前版本" class="borrow" @click.native='fn'>
          <span style="color: rgb(186,186,186)">1.0.0</span>
        </mt-cell>
      </div>
    </div>
    <button @click='next'>退出登录</button>
    <router-view></router-view>
  </section>
</template>
<script>
  import {MessageBox, Toast} from 'mint-ui'
  import {All} from './../api/api'
  import {mapMutations} from 'vuex'
  import {removeStore} from './../config/mUtils'
  export default {
    data () {
      return {}
    },
    methods: {
      ...mapMutations([
        'OUT_LOGIN', 'TYPE_DHH'
      ]),
      history() { // 后退
        this.$router.push({path: '/mine'})
      },
      modify() { // 进入设置头像页面
        this.$router.push({path: '/LSetupHeadPortrait'})
      },
      fn() {
        console.log(sessionStorage.getItem("type"))
      },
      next() { // 退出登录

        MessageBox.confirm('', {
          title: '',
          message: '确定退出'
        }).then(action => {
          let params = {
            funCode: 100002 // 功能码
          }
          All(params).then(res => {
            console.log(res)
            if (res.retCode === '0000') {
              this.OUT_LOGIN()
              removeStore('token')
              removeStore('userId')
              removeStore('mobile')
              removeStore('userType')
              removeStore('name')
              removeStore('imAccid')
              removeStore('imToken')
              removeStore('iconUrl')
              localStorage.clear();
              this.$store.dispatch('logout')   // 网易云信退出登录
              Toast({
                message: '退出成功',
                position: 'bottom',
                duration: 2000
              });
              sessionStorage.setItem("type", 1);
//              window.location.reload();
              this.$router.push({path: '/index'})
            } else {
            	Toast({
                message: res.retMsg,
                position: 'bottom',
                duration: 2000
              });
            }
          })

        });
      }

    },
    mounted() {

    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  .Lsetup {
    flex: 1;
    z-index: 11;
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: #f3f5f8;

    .forgetHead {
      position: relative;
      height: 0.8rem;
      line-height: 0.8rem;
      background: #e01625;
      width: 100%;

      img:nth-child(1) {
        width: 0.15rem;
        margin-left: 0.2rem;
        vertical-align: middle;
      }
      span:nth-child(2) {
        vertical-align: middle;
        font-size: 0.279rem;
        color: white;
        display: inline-block;
        width: 90%;
        text-align: center;
      }
    }
    .LsetupContent {
      width: 96%;
      margin-left: 2%;
      margin-top: (20rem/64.687);

      .mint-cell-wrapper {

      }
      .mint-cell:last-child {
        background-image: none;
      }
      .invite {
        margin-top: 0.2rem;
      }
      .mint-cell {
        border-radius: 0.05rem;
        height: (44rem/64.687);
        min-height: (44rem/64.687);
        margin-top: (10rem/64.687);
        .mint-cell-wrapper {
          background-image: none;
          font-size: (14rem/64.687);

          span {
            margin-left: (10rem/64.687);
            font-size: (14rem/64.687);
          }
          img {
            width: 0.4rem;
            position: absolute;
            top: 0.2rem;
          }
        }
        .mint-cell-allow-right::after {
          width: 0.12rem;
          height: 0.12rem;
          border: 0.02rem solid rgb(186, 186, 186);
          border-bottom-width: 0;
          border-left-width: 0;
          right: 0.247rem;
        }

      }
    }
    button {
      width: 100%;
      height: (50rem/64.687);
      background: #e01625;
      color: rgb(255, 255255, 255);
      outline: none;
      border: 0;
      position: absolute;
      bottom: 0;
      font-size: (16rem/64.687);
    }
  }

  /*.mint-msgbox {
      .mint-msgbox-header {
          padding: 0.1rem 0 0 0;

          .mint-msgbox-title {
              width: 100%;
              height: 0.4rem;
              line-height: 0.4rem;
              font-size: (16rem/64.687);
          }
      }
      .mint-msgbox-content {
          padding: 0 0 0.1rem;

          .mint-msgbox-message {
              width: 100%;
              height: 0.8rem;
              line-height: 0.8rem;
              font-size: (14rem/64.687);
          }
      }
      .mint-msgbox-btns {
          width: 100%;
          height: 0.6rem;
          line-height: 0.6rem;


          .mint-msgbox-btn {
              color: black;
              font-size: (16rem/64.687);
          }
      }
  }*/
</style>
