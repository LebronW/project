<template>
  <div id="Cverified" class="main">
    <mt-header fixed class="index-header" title="身份认证">
      <router-link to="" slot="left" @click.native="history">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <div class="container">
      <form class="form">
        <div class="group">
          <div id="modify">
            <input type="file" accept="image/png,image/jpg,image/jpeg" @change='imgChange'/>
            <span>头  像</span>
            <img v-show='!headImg' src="../images/touxiang@2x.png"/>
            <img v-show='headImg' :src="headImg"/>
            <img src="../images/right_aw.png"/>
          </div>
        </div>
        <div class="group t15">
          <mt-field label="姓　　名" placeholder="请输入真实姓名" :attr="{maxlength:10}" v-model="name"
                    :disabled="isAuthInfo"></mt-field>
          <mt-field label="身份证号" placeholder="请输入身份证号码" v-model="id" :attr="{maxlength:18}" id="userIdCard"
                    :disabled="isAuthInfo"></mt-field>
          <mt-field label="手机号码" placeholder="请输入手机号码" v-model="phone" type="number" :disabled="isAuthInfo"></mt-field>

        </div>
        <div class="group t15">
          <mt-field label="性　　别" v-model="sex" :disabled="true"></mt-field>
          <mt-field label="生　　日" v-model="birthday" :disabled="true"></mt-field>
        </div>
      </form>


    </div>
    <mt-button class="submit" v-show="isShow" @click="next">下一步</mt-button>
  </div>
</template>
<script>
  /* eslint-disable */
  import {All} from './../api/api'
  import {Toast} from 'mint-ui'
  import {getStore, setStore} from '../config/mUtils'
  export default {
    name: "Cverified",
    data() {
      return {
        headImg: '',
        base64: '',
        name: '',
        id: '',
        phone: '',
        queryUrl: '',
        isShow: true,
        sex: '',
        birthday: '',
        isAuthInfo: false
      }
    },
    mounted() {
      let vm = this;
      vm.queryUrl = vm.$route.query.from;
      let iconUrl = getStore("iconUrl");
      if (iconUrl) vm.headImg = iconUrl;

      // 如果是已认证的
      let personInfoState = getStore("personInfoState");
      if (personInfoState && personInfoState == "1") {
        vm.isShow = false;
        vm.isAuthInfo = true;
        vm.name = getStore("name");
        vm.id = getStore("cardId");
        vm.phone = getStore("mobile");
        vm.sex = getStore("sex");
        vm.birthday = getStore("birthday");
      }
      /**
       *  有弹出输入框的时候，隐藏提交按钮
       */
      let winHeight = document.documentElement.clientHeight;
      window.onresize = function () {
        let thisHeight = document.documentElement.clientHeight;
        vm.isShow = winHeight - thisHeight <= 50;
      };
      // 监听输入
      let item = document.getElementById("userIdCard").querySelector("input");
      let idReg = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
      item.onblur = function () {
        let UUserCard = vm.id;
        if (UUserCard && idReg.test(UUserCard)) {
          if (UUserCard.length === 15) {
            vm.sex = parseInt(UUserCard.substr(14, 1)) % 2 === 1 ? "男" : "女";
            vm.birthday = "19" + UUserCard.substring(6, 8) + UUserCard.substring(8, 10) + UUserCard.substring(10, 12);
          }
          if (UUserCard.length === 18) {
            vm.sex = parseInt(UUserCard.substr(16, 1)) % 2 === 1 ? "男" : "女";
            vm.birthday = UUserCard.substring(6, 10) + UUserCard.substring(10, 12) + UUserCard.substring(12, 14);
          }
        } else {
          vm.id = "";
          Toast({
            message: "请输入正确的身份证号",
            position: 'bottom',
            duration: 2000
          });
        }
      };
    },
    methods: {
      history() {
        if (this.queryUrl && (this.queryUrl).indexOf("mine") >= 0) this.$router.push({path: "/mine"});
        else if (this.queryUrl && this.queryUrl === "Liou") this.$router.push({path: "/Liou"});
        else this.$router.push({path: "/card"});
      },
      next() {
        let this_ = this;
        var nameReg = /^[\u4e00-\u9fa5]+(·[\u4e00-\u9fa5]+)*$/
        var idReg = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
        var phoneReg = /^1[3|4|5|6|7|8|9][0-9]{9}$/
        if (this.name) {
          if (nameReg.test(this.name)) {
            if (this.id) {
              if (idReg.test(this.id)) {
                if (this.phone) {
                  if (phoneReg.test(this.phone)) {
                    this.$store.dispatch('showLoading');
                    let params = {
                      funCode: 130007,
                      realName: this.name,
                      cardId: this.id
                    };
                    All(params).then(res => {
                      console.log(res)
                      if (res.retCode === '0000') {
                        var imAccid = getStore('imAccid');
                        let params = {
                          funCode: 110005,
                          name: this_.name,
                          cardId: this_.id,
                          authMobile: this_.phone,
                          imAccid: imAccid,
                          sex: this_.sex,
                          birthday: this_.birthday
                        }
                        All(params).then(res => {
                          this_.$store.dispatch('hideLoading');
                          console.log(res)
                          if (res.retCode === '0000') {
                            setStore("personInfoState", "1");
                            setStore("sex", this_.sex);
                            setStore("birthday", this_.birthday);
                            if (this_.queryUrl && this_.queryUrl === "mineIdAuth") this_.$router.push({path: '/mine'});
                            if (this_.queryUrl && this_.queryUrl === "Liou") this_.$router.push({path: '/Liou'});
                            else this_.$router.push({path: '/card'});
                          } else if (res.retCode === '7777') {
                            Toast({
                              message: res.retMsg,
                              position: 'bottom',
                              duration: 2000
                            });
                            this.$router.push({path: '/login'})
                          } else {
                            Toast({
                              message: res.retMsg,
                              position: 'bottom',
                              duration: 2000
                            });
                          }
                        })
                      } else if (res.retCode === '250010') {
                        Toast({
                          message: res.retMsg,
                          position: 'bottom',
                          duration: 2000
                        });
                      } else if (res.retCode === '7777') {
                        Toast({
                          message: res.retMsg,
                          position: 'bottom',
                          duration: 2000
                        });
                        this.$router.push({path: '/login'})
                      }
                    })
                  } else {
                    Toast({
                      message: '请输入正确的手机号码',
                      position: 'bottom',
                      duration: 2000
                    });
                  }
                } else {
                  Toast({
                    message: '请输入手机号码',
                    position: 'bottom',
                    duration: 2000
                  });
                }
              } else {
                Toast({
                  message: '请输入正确的身份证号码',
                  position: 'bottom',
                  duration: 2000
                });
              }
            } else {
              Toast({
                message: '请输入身份证号码',
                position: 'bottom',
                duration: 2000
              });
            }
          } else {
            Toast({
              message: '请输入正确的姓名',
              position: 'bottom',
              duration: 2000
            });
          }
        } else {
          Toast({
            message: '请输入姓名',
            position: 'bottom',
            duration: 2000
          });
        }
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
              _this.base64 = data.split(',')[1];
              _this.$store.dispatch('showLoading');
              // 图片上传
              _this.upload()
            }
          }
        }
      },
      upload() {
        let this_ = this;
        var imAccid = getStore('imAccid')
        let params = {
          funCode: 110012,
          base64Str: this_.base64,
          imAccid: imAccid
        }
        All(params).then(res => {
          console.log(res)
          if (res.retCode === '0000') {
            this_.$store.dispatch('hideLoading');
            setStore('iconUrl', res.retData.iconUrl)
            this_.headImg = res.retData.iconUrl
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
      }
    },
    components: {},
    computed: {
//      sex() {
//        let UUserCard = this.id;
//        if (!UUserCard) return "";
//        return parseInt(UUserCard.substr(16, 1)) % 2 === 1 ? "男" : "女";
//      },
//      birthday() {
//        let UUserCard = this.id;
//        if (!UUserCard) return "";
//        // 获取出生日期
//        let birth = UUserCard.substring(10, 12) + "-" + UUserCard.substring(12, 14);
//        return birth;
//      }
    },       // 计算属性是基于它们的依赖进行缓存的。计算属性只有在它的相关依赖发生改变时才会重新求值
    watch: {},
    filters: {}
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss">
  @import "../common/sass/Cyucb";

  .form {
    a:first-child {
      border-top-left-radius: rem(4rem);
      border-top-right-radius: rem(4rem);
      .mint-cell-wrapper {
        background-size: 120px 0;
      }
    }
    a:last-child {
      background-size: 120px 0;
      border-bottom-left-radius: rem(4rem);
      border-bottom-right-radius: rem(4rem);
    }

    a .mint-cell-title .mint-cell-text {
      padding-left: rem(5rem);
    }

    a .mint-cell-value {
      margin-top: rem(4rem);
      input {
        text-align: right;
        padding-right: rem(5rem);
      }
    }

    #modify {
      width: 100%;
      height: (44rem/64.687);
      line-height: (44rem/64.687);
      background: white;
      position: relative;
      border-radius: 0.05rem;

      span {
        display: inline-block;
        width: 80%;
        font-size: (14rem/64.687);
        color: #000000;
        margin-left: 0.23225rem;
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
        border: none;
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        z-index: 5;
        opacity: 0;
      }

    }
  }
</style>
