<template>
  <div id="CauthReport" class="main">
    <mt-header fixed class="index-header" title="认证报告">
      <router-link to="" slot="left" @click.native="history">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <div class="container">
      <mt-cell :title="item.authItemName" is-link v-for="(item, index) in authData" :key='item.authItemKey'
               :class="{t10: index != 0}"
               @click.native="goAuth(item.authItemKey, item.authItemStatus)">
        <span>{{item.authItemStatus | statusVerify}}</span>
        <img slot="icon" :src="item.authItemLogo" width="24" height="24">
      </mt-cell>
    </div>
    <mt-button class="submit" @click="submit" :class="{zhe: !isBtnOk}" :disabled="!isBtnOk">完成认证</mt-button>
  </div>
</template>
<script>
  /* eslint-disable */
  import {All, callbackURL, moxieCallBack} from './../api/api'
  import {getStore, setStore} from '../config/mUtils'
  import {Toast} from 'mint-ui'
  export default {
    name: "CauthReport",
    data() {
      return {
        authData: []
      }
    },
    created() {
    },
    methods: {
      history() {
        let this_ = this;
        if (this.urlQuery && this.urlQuery === 'mine') return this.$router.push({path: '/mine'});
        if (this.urlQuery && this.urlQuery.indexOf('ClenderInfo') >= 0) return this_.$router.push({path: this_.urlQuery});
        else this.$router.push('/CcreditAuth');
      },
      init() {
        let vm = this;
        All({funCode: 130003}).then(res => {
          if (res.retCode == 7777) return vm.$router.push({path: '/login'});
          if (res.retData) vm.authData = res.retData;
          vm.moxieCallBack();
          // 判断本地是否有保存运营商或者京东认证，有就替换服务器返回的数据
          let operatorReport = sessionStorage.getItem("operatorReport"),
            jingDong = sessionStorage.getItem("jingDong");
          for (let j = 0, l = vm.authData.length; j < l; j++) {
            let ob = vm.authData[j];
            if (operatorReport == "1" && ob.authItemKey == "operatorReport") {
              ob.authItemStatus = 1;
              vm.$set(vm.authData, j, ob);
            }
            if (jingDong == "1" && ob.authItemKey == "jingDong") {
              ob.authItemStatus = 1;
              vm.$set(vm.authData, j, ob);
            }
          }
        });
      },
      moxieCallBack() {
        let moxieRes = {};   // 获取回调对象参数
        let arr = (window.location.hash).split("?");
        if (arr && arr.length == 2) {
          let arr2 = (arr[1].substr(0)).split("&");
          for (let i = 0, len = arr2.length; i < len; i++) {
            let arr3 = arr2[i].split("=");
            if (arr3 && arr3.length === 2) moxieRes[arr3[0]] = arr3[1];
          }
        }
        if (moxieRes == {} || moxieRes.mxcode != 1) return;
        let params = {
          funCode: 130002,
          authResult: moxieRes.taskId,
        };
        if (moxieRes.taskType == "carrier") {  // 运营商
          sessionStorage.setItem("operatorReport", "1");
          params.authItemKey = "operatorReport";
        }
        if (moxieRes.taskType == "jingdong") {  // 京东
          sessionStorage.setItem("jingDong", "1");
          params.authItemKey = "jingDong";
        }
        All(params).then(res => {
          console.log(res);
        });
      },
      goAuth(key, auth) {
        if (auth == "1") return Toast({message: "请勿重复认证", position: 'bottom', duration: 1500});
        let callBackUrl = callbackURL("CauthReport");
        let userId = getStore('userId');
//            userId = userId.toString(16); // 转16进制字符串
        userId = "0" + userId;
        switch (key) {
          case "ZHIMA":   // 芝麻信用
            All({funCode: 130001}).then(res => {
              if (res.retCode != "0000") return;
              if (res.retData && res.retData.url) window.location.href = res.retData.url;
            });
            break;
          case "operatorReport":   // 运营商
            window.location.href = moxieCallBack(`static/moxie/moxie.html#/carrier?apiKey=e3c3bd7d26714ec487a31a3f00fa8c62&userId=${userId}&backUrl=${callBackUrl}`);
            break;
          case "jingDong":   // 京东认证
            window.location.href = moxieCallBack(`static/moxie/moxie.html#/jingdong?apiKey=e3c3bd7d26714ec487a31a3f00fa8c62&userId=${userId}&backUrl=${callBackUrl}`);
            break;
        }
      },
      submit() {
        let pageLI = sessionStorage.getItem("pageLI");
        if (pageLI && pageLI.indexOf('ClenderInfo') >= 0) return this.$router.push({path: pageLI});
        this.$router.push({path: '/mine'});
      }
    },
    mounted() {
      let vm = this;
      vm.init();
    },
    components: {},
    computed: {
      isBtnOk() {
        let ad = this.authData;
        for (let i = 0, le = ad.length; i < le; i++) {
          if (ad[i].authItemKey == "ZHIMA" && ad[i].authItemStatus == "0") return false;
          if (ad[i].authItemKey == "operatorReport" && ad[i].authItemStatus == "0") return false;
        }
        return true;
      }
    },       // 计算属性是基于它们的依赖进行缓存的。计算属性只有在它的相关依赖发生改变时才会重新求值
    watch: {},
    filters: {
      statusVerify(val) {
        if (val === 0) return "未认证";
        if (val === 1) return "已认证";
      }
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss">
  @import "../common/sass/Cyucb";

  #CauthReport {
    .mint-cell {
      border-radius: rem(6rem);
      background-size: 120% 0;
      .mint-cell-wrapper {
        background-size: 120% 0;
      }

      .mint-cell-title {
        padding-left: rem(5rem);
      }

      .mint-cell-text {
        padding-left: rem(10rem);
      }

      .mint-cell-allow-right::after {
        margin-top: rem(1rem);
      }
    }

    .zhe {
      background: rgb(186, 186, 186) !important;
    }
  }
</style>
