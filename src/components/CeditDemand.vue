<template>
  <div id="CeditDemand" class="main">
    <mt-header fixed class="index-header" :title="title">
      <router-link to="" slot="left" @click.native="history">
        <mt-button icon="back"></mt-button>
      </router-link>
      <mt-button slot="right" @click="submitDemand">完成</mt-button>
    </mt-header>
    <div class="container">
      <form>
        <a class="mint-cell mint-field is-textarea is-nolabel">
          <div class="mint-cell-left"></div>
          <div class="mint-cell-wrapper">
            <div class="mint-cell-title">
              <span class="mint-cell-text"></span>
            </div>
            <div class="mint-cell-value">
              <textarea :placeholder="placeholder" rows="6" class="mint-field-core" v-model="demand"></textarea>
              <div class="mint-field-other"></div>
            </div>
          </div>
          <div class="mint-cell-right"></div>
        </a>
        <div class="mint-cell xs">{{length}} / 100</div>
      </form>

    </div>
  </div>
</template>
<script>
  /* eslint-disable */
  import {getStore, setStore} from '../config/mUtils'
  import {All} from './../api/api'
  import {Toast} from 'mint-ui'
  export default {
    name: "CeditDemand",
    data() {
      return {
        title: "",
        demand: "",
        placeholder: "",
        length: 0
      }
    },
    mounted() {
      let userType = getStore("userType");
      if (userType && userType == "1") {
        // 出借人
        this.title = "出借需求";
        this.placeholder = "完整写下出借需求，提高成功率"
      }
      if (userType && userType == "2") {
        // 借款人
        this.title = "借款需求";
        this.placeholder = "完整写下借款借需求，提高成功率"
      }
      let demand =getStore("demand");
      if (demand) this.demand = demand;
    },
    methods: {
      history() {
        this.$router.go(-1);
      },
      submitDemand() {
        let this_ = this;
        let userType = getStore("userType");
        let params = {};
        params.borrowExplain = this_.demand;
        let UUserCard = getStore("cardId");
        if (UUserCard) {
          if (UUserCard.length === 15) {
            params.sex = parseInt(UUserCard.substr(14, 1)) % 2 === 1 ? "男" : "女";
            params.birthday = "19" + UUserCard.substring(6, 8) + UUserCard.substring(8, 10) + UUserCard.substring(10, 12);
          }
          if (UUserCard.length === 18) {
            params.sex = parseInt(UUserCard.substr(16, 1)) % 2 === 1 ? "男" : "女";
            params.birthday = UUserCard.substring(6, 10) + UUserCard.substring(10, 12) + UUserCard.substring(12, 14);
          }
        }
        if (userType && userType == "1") params.funCode = "110036";
        if (userType && userType == "2") params.funCode = "110038";
        All(params).then(res => {
          if (res.retCode != "0000") return Toast({message: res.retMsg, position: 'bottom', duration: 1500});
          Toast({message: "提交成功", position: 'bottom', duration: 1500});
          setStore("demand", this_.demand);
          setTimeout(function () {
            this_.$router.push({path: '/mine'});
          }, 1500)
        })

      }
    },
    components: {},
    computed: {},       // 计算属性是基于它们的依赖进行缓存的。计算属性只有在它的相关依赖发生改变时才会重新求值
    watch: {
      demand(nV, oV) {
        let le = nV.length;
        if (le <= 70) return this.length = nV.length;
        this.demand = nV.substring(0, 100);
        this.length = 100;
      }
    },
    filters: {}
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss">
  #CeditDemand {
    textarea {
      width: 100%;
      outline: none;
      resize: none;
    }
    .xs {
      text-align: right;
      font-size: (14rem/64.687);
      min-height: (22rem/64.687);
      padding-right: (10rem/64.687);
    }
  }
</style>
