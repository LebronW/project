<template>
  <div id="CpublishLoan" class="main">
    <mt-header fixed class="index-header" title="发布借款">
      <router-link to="" slot="left" @click.native="history">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <div class="container">
      <div class="filed">
        <mt-cell title="借款金额" is-link :value="sMoney" :class="{'heizi': sMoney != '请选择借款金额'}"
                 @click.native="showPop(1)"></mt-cell>
        <mt-cell title="借款期限" is-link :value="sDate" :class="{'heizi': sDate != '请选择借款期限'}"
                 @click.native="showPop(2)"></mt-cell>
        <mt-cell title="借款利率" class="br">
          <input id="input" v-model="fRate" class="ipt" type="number" placeholder="请输入借款利率" @blur="fRateBlur"/>
          <span class="ipt-sp">%</span>
        </mt-cell>
        <mt-field class="txta t10" placeholder="请写下借款用途" type="textarea" rows="4" v-model="fForwhat"></mt-field>
      </div>
    </div>
    <mt-button class="submit" @click="publish">发布</mt-button>

    <mt-popup class="c-pop" v-model="moneyPop" position="bottom" popup-transition="popup-fade">
      <div class="head">
        <div>
          <!--<button @click="closePop(1)">取消</button>-->
        </div>
        <div>
          <button @click="closePop(1)">确定</button>
        </div>
      </div>
      <mt-picker :slots="moneySlots" @change="moneyChange" valueKey="value"></mt-picker>
    </mt-popup>
    <mt-popup class="c-pop" v-model="datePop" position="bottom" popup-transition="popup-fade">
      <div class="head">
        <div>
          <!--<button @click="closePop(2)">取消</button>-->
        </div>
        <div>
          <button @click="closePop(2)">确定</button>
        </div>
      </div>
      <mt-picker :slots="dateSlots" @change="dateChange" valueKey="value"></mt-picker>
    </mt-popup>

    <transition name="fade">
      <div class="mint-toast is-pbottom mint-toast-pop-leave-to mc-toast" v-show="isPublish">
        <img src="../images/icon_gou@2x.png" alt="">
        <span class="mint-toast-text">发布成功</span>
      </div>
    </transition>
  </div>
</template>
<script>
  import {All} from './../api/api'
  import {getStore} from '../config/mUtils'
  import {Toast} from 'mint-ui'
  export default {
    name: "CpublishLoan",
    data() {
      return {
        fMoney: "",
        fRate: "",
        sMoney: "请选择借款金额",
        moneyPop: false,
        moneySlots: [],
        fDate: "",
        sDate: "请选择借款期限",
        fForwhat: '',
        datePop: false,
        dateSlots: [],
        isPublish: false
      }
    },
    methods: {
      history() {
        this.$router.go(-1);
      },
      fRateBlur() {
        let fRate = parseFloat(this.fRate);
        if (fRate && (fRate > 36 || fRate < 1)) {
          Toast({
            message: '借款利率为1%~36%',
            position: 'bottom',
            duration: 1500
          });
          this.fRate = 36;
        }
      },
      showPop(index) {
        if (index === 1) {
          this.moneyPop = true;
          this.sMoney = this.moneySlots[0].values[0].value;
          this.fMoney = this.moneySlots[0].values[0];
        }
        if (index === 2) {
          this.datePop = true;
          this.sDate = this.dateSlots[0].values[0].value;
          this.fDate = this.dateSlots[0].values[0];
        }
      },
      closePop(index) {
        if (index === 1) this.moneyPop = false;
        if (index === 2) this.datePop = false;
      },
      moneyChange(picker, values) {
        if (this.moneyPop && values[0]) {
          this.fMoney = values[0];
          this.sMoney = values[0].value;
        }
      },
      dateChange(picker, values) {
        if (this.datePop && values[0]) {
          this.fDate = values[0];
          this.sDate = values[0].value;
        }
      },
      init() {
        let vm = this;
        // 金额
        All({funCode: 110024, userType: getStore("userType")}).then(res => {
//        console.log(res);
          if (res.retCode !== "0000" || !res.retData || res.retData.lenght === 0) return;
          for (let i = 0; i < res.retData.length; i++) {
            res.retData[i].value = (res.retData[i].value).replace(" ", " ~ ")
          }
          let nObj = {flex: 1, values: res.retData, textAlign: 'center'};
          vm.$set(vm.moneySlots, 0, nObj);
          // 期限
          All({funCode: 110021, userType: getStore("userType")}).then(res => {
//          console.log(res);
            if (res.retCode !== "0000" || !res.retData || res.retData.lenght === 0) return;
            for (let j = 0; j < res.retData.length; j++) {
              res.retData[j].value = (res.retData[j].value).replace(" ", " ~ ")
            }
            let n2Obj = {flex: 1, values: res.retData, textAlign: 'center'};
            vm.$set(vm.dateSlots, 0, n2Obj);
          })
        })
      },
      publish() {
        let vm = this;
        if (!vm.fMoney.key || !vm.fDate.key || !vm.fRate) return;
        let params = {
          funCode: 110018,
          amountIndex: vm.fMoney.key,
          daysIndex: vm.fDate.key,
          desc: vm.fForwhat,
          imAccid: getStore("imAccid"),
          fee: vm.fRate / 100
        };
        All(params).then(res => {
//        console.log(res);
          if (res.retCode === "0000") {
            vm.isPublish = true;
            window.setTimeout(function () {
              vm.isPublish = false;
              vm.$router.push({path: '/index', query: {'zntj': 1}});
            }, 1500);
          }
        });
      }
    },
    mounted() {
      this.init();
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

  #CpublishLoan {
    .ipt {
      text-align: right;
      outline: none;
      padding-right: (3rem/64.687);
    }
    .ipt-sp {
      margin-top: (1rem/64.687);
    }
    .heizi {
      .mint-cell-value.is-link {
        color: #000000;
      }
    }
    .filed a:first-child {
      border-top-left-radius: (6rem/64.687);
      border-top-right-radius: (6rem/64.687);

      .mint-cell-wrapper {
        background-size: 120% 0;
      }
    }
    .br {
      border-bottom-left-radius: (6rem/64.687);
      border-bottom-right-radius: (6rem/64.687);
    }
    .filed a:last-child {
      // border-radius: (6rem/64.687);
      background-size: 120% 0;
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

        button {
          font-size: rem(18rem);
          border: none;
          background: transparent;
          outline: none;
        }
      }
    }

    .container a .mint-cell-title .mint-cell-text {
      padding-left: rem(10rem);
    }
    .txta {
      background-size: 120% 0;
      border-radius: rem(6rem);
      .mint-cell-wrapper {
        background-size: 120% 0;
      }
      textarea.mint-field-core {
        font-size: rem(14rem);
        height: rem(133rem);
        resize: none;
        padding-left: rem(10rem);
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
      bottom: 12%;
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
</style>
