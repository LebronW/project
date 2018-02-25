<template>
  <div id="CpublishLend" class="main">
    <mt-header fixed class="index-header" title="发布出借">
      <router-link to="" slot="left" @click.native="history">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <div class="container">
      <div class="filed">
        <mt-cell title="出借金额" is-link :value="sMoney" :class="{'heizi': sMoney != '请选择出借金额'}" @click.native="showPop(1)"></mt-cell>
        <mt-cell title="出借期限" class="br" is-link :value="sDate" :class="{'heizi': sDate != '请选择出借期限'}" @click.native="showPop(2)"></mt-cell>
        <mt-cell title="出借利率" @click.native="showPop(3)">
          <input id="input" v-model="fRate" class="ipt" type="text" placeholder="请输入出借利率" @focus='focus' @blur='blur'
                 :state='fRateState'/>
          <span v-show='fRateType'>%</span>
        </mt-cell>
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
  import {Toast} from 'mint-ui'
  import {All} from './../api/api'
  import {getStore} from '../config/mUtils'
  export default {
    name: "CpublishLend",
    data() {
      return {
        sMoney: "请选择出借金额",
        fMoney: '',
        moneyPop: false,
        moneySlots: [],
        sDate: "请选择出借期限",
        fDate: '',
        datePop: false,
        dateSlots: [],
        fRate: "",
        fRateType: false,
        isPublish: false
      }
    },
    mounted() {
      this.init()
    },
    methods: {
      history() {
        this.$router.go(-1);
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
        if (index === 1) {
          this.moneyPop = false;
        }
        if (index === 2) {
          this.datePop = false;
        }
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
        let params = {
          funCode: 110021
        }
        All(params).then(res => {
          if (res.retCode !== "0000" || !res.retData || res.retData.lenght === 0) return;
          for (let i = 0; i < res.retData.length; i++) {
            res.retData[i].value = (res.retData[i].value).replace(" ", " ~ ")
          }
          let nObj = {flex: 1, values: res.retData, textAlign: 'center'};
          vm.$set(vm.dateSlots, 0, nObj);
          var userType = getStore('userType');
          let params = {
            funCode: 110024,
            userType: userType
          }
          All(params).then(res => {
            if (res.retCode !== "0000" || !res.retData || res.retData.lenght === 0) return;
            for (let j = 0; j < res.retData.length; j++) {
              res.retData[j].value = (res.retData[j].value).replace(" ", " ~ ")
            }
            let n2Obj = {flex: 1, values: res.retData, textAlign: 'center'};
            vm.$set(vm.moneySlots, 0, n2Obj);
          })
        })
      },
      publish() {
        let _this = this;
        let params = {
          funCode: 110006,
          fee: this.fRate / 100,
          amountIndex: this.fMoney.key,
          daysIndex: this.fDate.key
        };
        console.log(params);
        All(params).then(res => {
          if (res.retCode === "0000") {
            _this.isPublish = true;
            window.setTimeout(function () {
              _this.isPublish = false;
              _this.$router.push({path: '/card'})  // 借款人列表
            }, 1500);
          }
        })
      },
      focus() {
        this.fRateType = true
      },
      blur() {
        if (this.fRate) {
          this.fRateType = true
        } else {
          this.fRateType = false
        }
      }
    },
    components: {},
    computed: {
      fRateState() {
        if (this.fRate) {
          this.fRateType = true
        }
        if (this.fRate > 36) {
          this.fRate = 36;
          Toast({
            message: '出借利率为1%~36%',
            position: 'bottom',
            duration: 2000
          });
        }
        if (this.fRate.length > 0 && this.fRate < 1) {
          this.fRate = 1;
          Toast({
            message: '出借利率为1%~36%',
            position: 'bottom',
            duration: 2000
          });
        }
      }
    },       // 计算属性是基于它们的依赖进行缓存的。计算属性只有在它的相关依赖发生改变时才会重新求值
    watch: {},
    filters: {}
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss">
  @import "../common/sass/Cyucb";

  #CpublishLend {
    .heizi {
      .mint-cell-value.is-link{
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
      margin-top: rem(10rem);
      border-radius: (6rem/64.687);
      background-size: 120% 0;

      .mint-cell-wrapper {
        background-size: 120% 0;
      }
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

    .mint-cell {
      .mint-cell-wrapper {
        .mint-cell-value {

          input {
            height: 0.5rem;
            outline: none;
            border: 0;
            text-align: right;
            color: #000;
            margin-right: 0.1rem;
          }
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
