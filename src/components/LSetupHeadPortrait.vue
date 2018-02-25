<template>
  <section class="LSetupHeadPortrait">
    <div class="forgetHead">
      <img src="../images/fauhuibaise.png@2x.png" @click='history'/>
      <span>设置</span>
    </div>
    <form action="" method="post" class="set">
      <div id="modify">
        <input type="file" accept="image/png,image/jpg,image/jpeg" @change='imgChange'/>
        <span>头 像</span>
        <img v-show='!headImg' src="../images/touxiang@2x.png"/>
        <img v-show='headImg' :src="headImg"/>
        <img src="../images/right_aw.png"/>
      </div>
    </form>
    <div class="common">
      <mt-field label="性　　别" v-model="sex" :disabled="true"></mt-field>
      <mt-field label="生　　日" v-model="birthday" :disabled="true"></mt-field>
    </div>
    <div class="duix" v-show="duixTitle && duixVaule">
      <mt-cell :title="duixTitle" is-link :value="duixVaule" :class="{'heizi': duixVaule == '已添加'}"
               @click.native="editDemand"></mt-cell>
    </div>
  </section>
</template>
<script>
  /* eslint-disable */
  import {All} from './../api/api'
  import {getStore, setStore} from '../config/mUtils'
  import {Indicator, Toast} from 'mint-ui'
  export default {
    data () {
      return {
        headImg: '',
        base64: '',
        duixTitle: "",
        duixVaule: ""
      }
    },
    methods: {
      history() { // 后退
        this.$router.push({path: '/Lsetup'})
      },
      imgChange(event) { // 上传图片
        var img1 = event.target.files[0]
        var image = new Image();
        var _this = this
        var reader = new FileReader()
        reader.readAsDataURL(img1)
        reader.onloadend = function (e) {
          var base64Str = reader.result
          image.src = reader.result
//        	var  = reader.result.split(',')[1]
          if (base64Str.length < (100 * 1024)) {
            // 图片上传
            _this.base64 = base64Str.split(',')[1]
//	          	console.log(_this.base64)
            _this.upload()
          } else {
            image.onload = function () {
              // 压缩处理
              var data = _this.compress(image, _this.Orientation);
              _this.base64 = data.split(',')[1]
              Indicator.open('Loading...');
              // 图片上传
              _this.upload()
            }
          }
        }
      },
      upload() {
        var imAccid = getStore('imAccid')
        let params = {
          funCode: 110012,
          base64Str: this.base64,
          imAccid: imAccid
        }
        All(params).then(res => {
          console.log(res)
          if (res.retCode === '0000') {
            Indicator.close();
            setStore('iconUrl', res.retData.iconUrl)
            this.headImg = res.retData.iconUrl
            Toast({
              message: '上传成功',
              position: 'bottom',
              duration: 2000
            });
          } else {
            Toast({
              message: res.retMsg,
              position: 'bottom',
              duration: 2000
            });
          }
        })
      },
      compress(img) {
        let canvas = document.createElement("canvas");
        let ctx = canvas.getContext('2d');
        // 瓦片canvas
        let tCanvas = document.createElement("canvas");
        let tctx = tCanvas.getContext("2d");
        let initSize = img.src.length;
        let width = img.width;
        let height = img.height;

        // 如果图片大于四百万像素，计算压缩比并将大小压至400万以下
        let ratio;
        if ((ratio = width * height / 4000000) > 1) {
//      console.log("大于400万像素")
          ratio = Math.sqrt(ratio);
          width /= ratio;
          height /= ratio;
        } else {
          ratio = 1;
        }
        canvas.width = width;
        canvas.height = height;
        // 铺底色
        ctx.fillStyle = "#fff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        // 如果图片像素大于100万则使用瓦片绘制
        let count;
        if ((count = width * height / 1000000) > 1) {
          count = ~~(Math.sqrt(count) + 1); // 计算要分成多少块瓦片
          // 计算每块瓦片的宽和高
          let nw = ~~(width / count);
          let nh = ~~(height / count);
          tCanvas.width = nw;
          tCanvas.height = nh;
          for (let i = 0; i < count; i++) {
            for (let j = 0; j < count; j++) {
              tctx.drawImage(img, i * nw * ratio, j * nh * ratio, nw * ratio, nh * ratio, 0, 0, nw, nh);
              ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh);
            }
          }
        } else {
          ctx.drawImage(img, 0, 0, width, height);
        }
        // 进行最小压缩
        let ndata = canvas.toDataURL('image/jpeg', 0.1);
        console.log('压缩前：' + initSize);
        console.log('压缩后：' + ndata.length);
        console.log('压缩率：' + ~~(100 * (initSize - ndata.length) / initSize) + "%");
        tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0;
        return ndata;
      },
      init() {
        let iconUrl = getStore('iconUrl');
        this.headImg = iconUrl;
        let userType = getStore("userType");
        if (userType && userType == "1") {
          this.duixTitle = "出借需求";
          this.duixVaule = "添加提高出借率";
        }
        if (userType && userType == "2") {
          this.duixTitle = "借款需求";
          this.duixVaule = "添加提高借款率";
        }
        let demand = getStore("demand");
        if (demand) this.duixVaule = "已添加";
      },
      editDemand() {
        this.$router.push({path: "/CeditDemand"});
      }
    },
    computed: {
      sex() {
        let UUserCard = getStore("cardId");
        if (UUserCard) {
          if (UUserCard.length === 15) {
            return parseInt(UUserCard.substr(14, 1)) % 2 === 1 ? "男" : "女";
          }
          if (UUserCard.length === 18) {
            return parseInt(UUserCard.substr(16, 1)) % 2 === 1 ? "男" : "女";
          }
        }
        return "";
      },
      birthday() {
        let UUserCard = getStore("cardId");
        if (UUserCard) {
          if (UUserCard.length === 15) {
            return "19" + UUserCard.substring(6, 8) + UUserCard.substring(8, 10) + UUserCard.substring(10, 12);
          }
          if (UUserCard.length === 18) {
            return UUserCard.substring(6, 10) + UUserCard.substring(10, 12) + UUserCard.substring(12, 14);
          }
        }
        return "";
      },
    },
    mounted() {
      this.init()
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  .LSetupHeadPortrait {
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
    .set {
      width: 96%;
      margin-left: 2%;

      a.mint-cell {
        min-height: 0.6802rem;
        height: 0.6802rem;
        line-height: 0.6802rem;
      }
      span.mint-cell-text {
        font-size: (14rem/64.687);
      }
      a .mint-cell-value {
        margin-top: rem(4rem);
        input {
          text-align: right;
          padding-right: (6rem/64.687);
          font-size: (14rem/64.687);
        }
      }
      a {
        min-height: (44rem/64.687);

        .mint-cell-wrapper, .mint-cell-title .mint-cell-text, .mint-cell-value span {
          font-size: (14rem/64.687);
        }
        .mint-cell-value.is-link {
          margin-top: (2rem/64.687);
        }
        .mint-cell-allow-right::after {
          border: solid 1px #c8c8cd;
          border-bottom-width: 0;
          border-left-width: 0;
          right: rem(10rem);
          width: rem(8rem);
          height: rem(8rem);
          margin-top: rem(4rem);
        }
      }
    }
    #modify {
      height: (44rem/64.687);
      line-height: (44rem/64.687);
      background: white;
      position: relative;
      border-radius: 0.05rem;
      margin-top: (20rem/64.687);

      span {
        display: inline-block;
        width: 81%;
        font-size: (14rem/64.687);
        color: #000000;
        margin-left: (10rem/64.687);
        vertical-align: middle;
        letter-spacing: 0.2rem;
      }
      img:nth-child(3) {
        width: (26rem/64.687);
        vertical-align: middle;
      }
      img:nth-child(4) {
        width: (26rem/64.687);
        height: (26rem/64.687);
        vertical-align: middle;
      }
      img:nth-child(5) {
        width: (8rem/64.687);
        vertical-align: middle;
        margin-left: 0.05rem;
      }

      input {
        border: 1px solid red;
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        z-index: 5;
        opacity: 0;
      }

    }
    .common, .duix {
      width: 96%;
      margin-left: 2%;
      margin-top: (15rem/64.687);
      /*border-radius: 0.05rem;*/

      a {
        .mint-cell-value input {
          font-size: (14rem/64.687);
          text-align: right;
          color: #333;
        }
        span.mint-cell-text {
          font-size: (14rem/64.687);
        }
        .mint-cell-value.is-link {
          font-size: (14rem/64.687);
          margin-top: (2rem/64.687);
        }
        .mint-cell-allow-right::after {
          border: solid 1px #c8c8cd;
          border-bottom-width: 0;
          border-left-width: 0;
          width: 9px;
          height: 9px;
          margin-top: (0.6rem/64.687);
        }
      }
      a:first-child {
        border-top-left-radius: 0.05rem;
        border-top-right-radius: 0.05rem;
      }
      a:last-child {
        border-bottom-left-radius: 0.05rem;
        border-bottom-right-radius: 0.05rem;
      }
    }

  }

  .heizi .mint-cell-value.is-link {
    span {
      color: #333;
    }
  }

  .mint-indicator {
    position: absolute;
    top: 1rem;
    z-index: 100;
  }
</style>
