<template>
  <div id="CeditPersonInfo" class="main">
    <mt-header fixed class="index-header" title="个人信息">
      <router-link to="" slot="left" @click.native="history">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <div class="container">
      <form>
        <div class="form-group">
          <div id="modify">
            <input type="file" accept="image/png,image/jpg,image/jpeg" @change='imgChange'/>
            <span>头 像</span>
            <img v-show='!headImg' src="../images/touxiang@2x.png"/>
            <img v-show='headImg' :src="headImg"/>
            <img src="../images/right_aw.png"/>
          </div>
        </div>
        <div class="form-group t10">
          <mt-field label="姓　　名" placeholder="请输入真实姓名" v-model="username" :class="{'heizi': username}"></mt-field>
          <mt-field label="身份证号" placeholder="请输入身份证号" v-model="idCard" :attr="{maxlength: 18}"
                    :class="{'heizi': idCard}" id="userIdCard"></mt-field>
          <mt-field label="性　　别" v-model="sex" :class="{'heizi': sex}" :disabled="true"></mt-field>
          <mt-field label="生　　日" v-model="birthday" :class="{'heizi': birthday}" :disabled="true"></mt-field>
          <mt-cell title="身份证照" is-link :value="cardPic" :class="{'heizi': cardPic == '已添加'}"
                   @click.native="toCardPic"></mt-cell>
        </div>
        <div class="form-group t10">
          <mt-cell title="居住地址" is-link :value="addr" :class="{'cl-balck': addr != '请选择省市区'}"
                   @click.native="getArea"></mt-cell>
          <mt-field label="" v-model="detailAddr" :class="{'heizi': detailAddr}"></mt-field>
          <mt-field label="微信号" placeholder="请填写微信号码" v-model="wechat" :attr="{maxlength: 20}"
                    :class="{'heizi': wechat}"></mt-field>
          <mt-field label="QQ号" placeholder="请填写QQ号码" v-model="qq" :attr="{maxlength: 10}"
                    :class="{'heizi': qq}"></mt-field>
          <mt-field label="手机号" placeholder="请填写手机号码" v-model="phone" :attr="{maxlength: 11}"
                    :class="{'heizi': phone}"></mt-field>
        </div>
        <div class="form-group t10">
          <mt-cell title="亲友关系" is-link :value="relation1" :class="{'cl-balck': relation1 != '请选择关系'}"
                   @click.native="showPop(1)"></mt-cell>
          <mt-field label="姓名" placeholder="请填写亲友姓名" v-model="relation1_name" :class="{'heizi': relation1_name}"
                    id="friend1n"></mt-field>
          <mt-field label="手机号" placeholder="请填写亲友手机号" v-model="relation1_phone" :class="{'heizi': relation1_phone}"
                    :attr="{maxlength: 11}"
                    id="friend1p"></mt-field>
        </div>
        <div class="form-group t10">
          <mt-cell title="亲友关系" is-link :value="relation2" :class="{'cl-balck': relation2 != '请选择关系'}"
                   @click.native="showPop(2)"></mt-cell>
          <mt-field label="姓名" placeholder="请填写亲友姓名" v-model="relation2_name" :class="{'heizi': relation2_name}"
                    id="friend2n"></mt-field>
          <mt-field label="手机号" placeholder="请填写亲友手机号" v-model="relation2_phone" :class="{'heizi': relation2_phone}"
                    id="friend2p"></mt-field>
        </div>
      </form>
      <div class="tip">
        温馨提示：个人信息提交后一个月内不得修改
      </div>
    </div>
    <mt-button class="submit" @click="submit" v-show="isShow">立即申请</mt-button>
    <mt-popup v-model="pop_re" position="bottom" popup-transition="popup-fade" style="width: 100%">
      <mt-picker v-show="relaSl == 1" :slots="re1Solts" :visibleItemCount="3" @change="onRe1Change"></mt-picker>
      <mt-picker v-show="relaSl == 2" :slots="re2Solts" @change="onRe2Change"></mt-picker>
    </mt-popup>
    <mt-popup class="c-pop" v-model="pop_address" position="bottom">
      <div class="head">
        <div></div>
        <div><h2>选择地址</h2></div>
        <div @click="pop_address = false">
          <img src="../images/backoff.png" alt="">
        </div>
      </div>
      <div>
        <mt-picker :slots="addressSlots" @change="onAddressChange" :visible-item-count="5" valueKey="name"></mt-picker>
      </div>
    </mt-popup>
    <mt-popup v-model="idCardPicShow" position="right" class="idcard-pic">
      <div id="CardPic" class="main">
        <mt-header fixed class="index-header" title="照片验证">
          <router-link to="" slot="left" @click.native="backInfo">
            <mt-button icon="back"></mt-button>
          </router-link>
        </mt-header>
        <div class="container">
          <form class="pic-form">
            <div class="group">
              <div class="item">
                <img :src="idCardPic.zm" alt="">
                <input class="hide-input" type="file" accept="image/*;" capture="camera" @change='idcardChange_zm'/>
              </div>
              <div class="item">
                <img src="../images/img_paishe_zm@2x.png" alt="">
              </div>
            </div>
            <div class="group t20">
              <div class="item">
                <img :src="idCardPic.fm" alt="">
                <input class="hide-input" type="file" accept="image/*;" capture="camera" @change='idcardChange_fm'/>
              </div>
              <div class="item">
                <img src="../images/img_paishe_fm@2x.png" alt="">
              </div>
            </div>
            <div class="group t20">
              <div class="item">
                <img :src="idCardPic.sc" alt="">
                <input class="hide-input" type="file" accept="image/*;" capture="camera" @change='idcardChange_sc'/>
              </div>
              <div class="item">
                <img src="../images/img_paishe_sc@2x.png" alt="">
              </div>
            </div>
          </form>
        </div>
        <mt-button class="submit" @click="idCardSubmit">提交</mt-button>
      </div>
    </mt-popup>
  </div>
</template>
<script>
  /* eslint-disable */
  import {Toast} from 'mint-ui'
  import {All} from './../api/api'
  import {getStore, setStore} from '../config/mUtils'
  export default {
    name: "CeditPersonInfo",
    data() {
      return {
        username: '',
        idCard: '',
        addr: '请选择省市区',
        detailAddr: '',
        wechat: '',
        qq: '',
        phone: '',
        relation1: '请选择关系',
        relation1_name: '',
        relation1_phone: '',
        relation2: '请选择关系',
        relation2_name: '',
        relation2_phone: '',
        pop_re: false,
        relaSl: 1,
        addressSlots: [
          {
            flex: 1,
            values: [],
            textAlign: 'center'
          }, {
            divider: true,
            content: '-'
          }, {
            flex: 1,
            values: [],
            textAlign: 'center'
          }, {
            divider: true,
            content: '-'
          }, {
            flex: 1,
            values: [],
            textAlign: 'center'
          }
        ],
        userProvince: "",
        userCity: "",
        userArea: "",
        pop_address: false,
        urlQuery: '',
        isShow: true,
        headImg: '',
        base64: '',
        sex: '',
        birthday: '',
        cardPic: "待添加",
        idCardPicShow: false,
        idCardList: {
          "sc": "",
          "zm": "",
          "fm": ""
        },
        idCardPic: {
          zm: require("../images/paishe_zm@2x.png"),
          fm: require("../images/paishe_fm@2x.png"),
          sc: require("../images/paishe_sc@2x.png")
        }
      }
    },
    mounted() {
      let self = this;
      self.urlQuery = this.$route.query.from;
      let iconUrl = getStore('iconUrl');
      if (iconUrl) self.headImg = iconUrl;
      /**
       *  有弹出输入框的时候，隐藏提交按钮
       */
      let winHeight = document.documentElement.clientHeight;
      window.onresize = function () {
        let thisHeight = document.documentElement.clientHeight;
        self.isShow = winHeight - thisHeight <= 50;
      };

      // 监听亲友输入是否一致
      let arrInput = [document.getElementById("friend1n").querySelector("input"), document.getElementById("friend1p").querySelector("input"), document.getElementById("friend2n").querySelector("input"), document.getElementById("friend2p").querySelector("input")];
      arrInput.forEach(function (item, index) {
        item.onblur = function () {
          self.relation1n_C(index)
        };
      });
      // 监听输入
      let item = document.getElementById("userIdCard").querySelector("input");
      let idReg = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
      item.onblur = function () {
        let UUserCard = self.idCard;
        if (UUserCard && idReg.test(UUserCard)) {
          if (UUserCard.length === 15) {
            self.sex = parseInt(UUserCard.substr(14, 1)) % 2 === 1 ? "男" : "女";
            self.birthday = "19" + UUserCard.substring(6, 8) + UUserCard.substring(8, 10) + UUserCard.substring(10, 12);
          }
          if (UUserCard.length === 18) {
            self.sex = parseInt(UUserCard.substr(16, 1)) % 2 === 1 ? "男" : "女";
            self.birthday = UUserCard.substring(6, 10) + UUserCard.substring(10, 12) + UUserCard.substring(12, 14);
          }
        }
      };
    },
    methods: {
      history() {
        let this_ = this;
        if (this.urlQuery && this.urlQuery === 'index') return this.$router.push({path: '/index'});
        if (this.urlQuery && this.urlQuery === 'mine') return this.$router.push({path: '/mine'});
        if (this.urlQuery && this.urlQuery.indexOf('ClenderInfo') >= 0) return this_.$router.push({path: this_.urlQuery});
        else this.$router.push({path: '/index'});
      },
      submit() {
        let this_ = this;
        var nameReg = /^[\u4e00-\u9fa5]+(·[\u4e00-\u9fa5]+)*$/
        var idReg = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
        var phoneReg = /^1[3|4|5|6|7|8|9][0-9]{9}$/
        if (this.username) {
          if (nameReg.test(this.username)) {
            if (this.idCard) {
              if (idReg.test(this.idCard)) {
                if (this.addr !== '请选择省市区') {
                  if (this.detailAddr) {
                    if (this.wechat) {
                      if (this.qq) {
                        if (this.phone) {
                          if (phoneReg.test(this.phone)) {
                            if (this.relation1 !== '请选择关系') {
                              if (this.relation1_name) {
                                if (nameReg.test(this.relation1_name)) {
                                  if (this.relation1_phone) {
                                    if (phoneReg.test(this.relation1_phone)) {
                                      if (this.relation2 !== '请选择关系') {
                                        if (this.relation2_name) {
                                          if (nameReg.test(this.relation2_name)) {
                                            if (this.relation2_phone) {
                                              if (phoneReg.test(this.relation2_phone)) {
                                                var mobile = getStore('mobile')
                                                let params = {
                                                  funCode: 110008,
                                                  name: this.username,
                                                  address: this.allAddress,
                                                  cardId: this.idCard.toUpperCase(),
                                                  wxNo: this.wechat,
                                                  qq: this.qq,
                                                  firstRelation: this.relation1,
                                                  firstName: this.relation1_name,
                                                  firstMobile: this.relation1_phone,
                                                  secondRealtion: this.relation2,
                                                  secondMobile: this.relation2_phone,
                                                  secondName: this.relation2_name,
                                                  imAccid: mobile,
                                                  authMobile: this.phone,
                                                  sex: this.sex,
                                                  birthday: this.birthday,
                                                  IDCardFront: this.idCardList['zm'],
                                                  IDCardBack: this.idCardList['fm'],
                                                  IDCardHold: this.idCardList['sc']
                                                }
                                                console.log(params)
                                                All(params).then(res => {
                                                  console.log(res);
                                                  if (res.retCode !== '0000') return Toast({
                                                    message: '提交信息失败，请稍后重试',
                                                    position: 'bottom',
                                                    duration: 1500
                                                  });
                                                  Toast({
                                                    message: '提交成功',
                                                    position: 'bottom',
                                                    duration: 1500
                                                  });
                                                  setStore("personInfoState", "1");
                                                  setStore("sex", this_.sex);
                                                  setStore("birthday", this_.birthday);
                                                  this_.$router.push({
                                                    path: '/CcreditAuth',
                                                    query: {'from': 'index'}
                                                  });
                                                })
                                              } else {
                                                Toast({
                                                  message: '请填写正确的手机号',
                                                  position: 'bottom',
                                                  duration: 2000
                                                });
                                              }
                                            } else {
                                              Toast({
                                                message: '请填写亲友手机号',
                                                position: 'bottom',
                                                duration: 2000
                                              });
                                            }
                                          } else {
                                            Toast({
                                              message: '请填写正确的姓名',
                                              position: 'bottom',
                                              duration: 2000
                                            });
                                          }
                                        } else {
                                          Toast({
                                            message: '请填写亲友姓名',
                                            position: 'bottom',
                                            duration: 2000
                                          });
                                        }
                                      } else {
                                        Toast({
                                          message: '请选择亲友关系',
                                          position: 'bottom',
                                          duration: 2000
                                        });
                                      }
                                    } else {
                                      Toast({
                                        message: '请填写正确的手机号码',
                                        position: 'bottom',
                                        duration: 2000
                                      });
                                    }
                                  } else {
                                    Toast({
                                      message: '请填写亲友手机号码',
                                      position: 'bottom',
                                      duration: 2000
                                    });
                                  }
                                } else {
                                  Toast({
                                    message: '请填写正确的姓名',
                                    position: 'bottom',
                                    duration: 2000
                                  });
                                }
                              } else {
                                Toast({
                                  message: '请填写亲友姓名',
                                  position: 'bottom',
                                  duration: 2000
                                });
                              }
                            } else {
                              Toast({
                                message: '请选择亲友关系',
                                position: 'bottom',
                                duration: 2000
                              });
                            }
                          } else {
                            Toast({
                              message: '请填写正确的手机号码',
                              position: 'bottom',
                              duration: 2000
                            });
                          }
                        } else {
                          Toast({
                            message: '请填写手机号码',
                            position: 'bottom',
                            duration: 2000
                          });
                        }
                      } else {
                        Toast({
                          message: '请填写QQ号码',
                          position: 'bottom',
                          duration: 2000
                        });
                      }
                    } else {
                      Toast({
                        message: '请填写微信号码',
                        position: 'bottom',
                        duration: 2000
                      });
                    }
                  } else {
                    Toast({
                      message: '请输入详细地址',
                      position: 'bottom',
                      duration: 2000
                    });
                  }
                } else {
                  Toast({
                    message: '请选择省市区',
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
            message: '请输入真实姓名',
            position: 'bottom',
            duration: 2000
          });
        }
      },
      relation1n_C(index) {
        let vm = this;
        switch (index) {
          case 0:   // 亲友1名字
            if (vm.relation2_name && (vm.relation2_name == vm.relation1_name)) {
              Toast({
                message: "请输入不同的亲友",
                position: 'bottom',
                duration: 2000
              });
              vm.relation1_name = "";
            }
            break;
          case 1:    // 亲友1电话
            if (vm.relation1_phone == getStore("mobile") || (vm.relation2_phone && (vm.relation2_phone == vm.relation1_phone))) {
              Toast({
                message: "请输入不同的亲友电话",
                position: 'bottom',
                duration: 2000
              });
              vm.relation1_phone = "";
            }
            break;
          case 2:   // 亲友2名字
            if (vm.relation1_name && (vm.relation1_name == vm.relation2_name)) {
              Toast({
                message: "请输入不同的亲友",
                position: 'bottom',
                duration: 2000
              });
              vm.relation2_name = "";
            }
            break;
          case 3:   // 亲友2电话
            if (vm.relation2_phone == getStore("mobile") || (vm.relation1_phone && (vm.relation1_phone == vm.relation2_phone))) {
              Toast({
                message: "请输入不同的亲友电话",
                position: 'bottom',
                duration: 2000
              });
              vm.relation2_phone = "";
            }
            break;
        }
      },
      showPop(index) {
        let vm = this;
        vm.relaSl = index;
        vm.pop_re = true;
//      console.log(index)
        if (index == 1) vm.relation1 = vm.re1Solts[0].values[0];
        if (index == 2) vm.relation2 = vm.re2Solts[0].values[0];
      },
      onRe1Change(picker, values) {
        let vm = this;
        if (values[0] && vm.pop_re && vm.relaSl == 1) vm.relation1 = values[0]
      },
      onRe2Change(picker, values) {
        let vm = this;
        if (vm.pop_re && values[0] && vm.relaSl == 2) vm.relation2 = values[0]
      },
      getArea() {
        let self = this;
        let p = {funCode: 110028, id: 0};
        All(p).then(res1 => {
//        console.log(res1);
          if (!res1.retData || res1.retData.length == 0) return;
          self.addressSlots[0].values = res1.retData;
          self.userProvince = res1.retData[0].name;
          All({funCode: 110028, id: res1.retData[0].id}).then(res2 => {
            if (!res2.retData || res2.retData.length == 0) return;
            self.addressSlots[2].values = res2.retData;
            self.userCity = res2.retData[0].name;
            All({funCode: 110028, id: res2.retData[0].id}).then(res3 => {
              if (!res3.retData || res3.retData.length == 0) return;
              self.addressSlots[4].values = res3.retData;
              self.userCity = res3.retData[0].name;
            });
          });
          self.pop_address = true;
        })
      },
      onAddressChange(picker, values) {
        let self = this;
        if (values[0] && values[0].name && values[0].name != self.userProvince) {
          All({funCode: 110028, id: values[0].id}).then(res1 => {
            picker.setSlotValues(1, res1.retData);
            self.userProvince = values[0].name;
            self.addr = !self.userProvince && !self.userCity && !self.userArea ? "请选择省市区" : self.userProvince + " " + self.userCity + " " + self.userArea;
          });
        }
        if (!values[1] || !values[1].name) {
          picker.setSlotValues(2, []);
          self.userCity = "";
          self.addr = !self.userProvince && !self.userCity && !self.userArea ? "请选择省市区" : self.userProvince + " " + self.userCity + " " + self.userArea;
        }
        if (values[1] && values[1].name && values[1].name != self.userCity) {
          All({funCode: 110028, id: values[1].id}).then(res2 => {
            picker.setSlotValues(2, res2.retData);
            self.userCity = values[1].name;
            self.addr = !self.userProvince && !self.userCity && !self.userArea ? "请选择省市区" : self.userProvince + " " + self.userCity + " " + self.userArea;
          });
        }
        if (!values[2] || !values[2].name) {
          self.userArea = "";
          self.addr = !self.userProvince && !self.userCity && !self.userArea ? "请选择省市区" : self.userProvince + " " + self.userCity + " " + self.userArea;
        }
        if (values[2] && values[2].name && values[2].name != self.userArea) {
          self.userArea = values[2].name;
          self.addr = !self.userProvince && !self.userCity && !self.userArea ? "请选择省市区" : self.userProvince + " " + self.userCity + " " + self.userArea;
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
              _this.base64 = data.split(',')[1]
              _this.$store.dispatch('showLoading');
              // 图片上传
              _this.upload()
            }
          }
        }
      },
      upload() {
        let this_ = this;
        let imAccid = getStore('imAccid');
        let params = {
          funCode: 110012,
          base64Str: this.base64,
          imAccid: imAccid
        };
        All(params).then(res => {
          if (res.retCode === '0000') {
            this_.$store.dispatch('hideLoading');
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
      toCardPic() {
        let cardPic = this.cardPic;
        if (cardPic == "待添加") {
          this.isShow = false;
          this.idCardPicShow = true;
        }
      },
      backInfo() {
        this.isShow = true;
        this.idCardPicShow = false;
      },
      idCardSubmit() {
        if (this.idCardList && this.idCardList["zm"] && this.idCardList["fm"]) {
          this.cardPic = "已添加";
          this.isShow = true;
          this.idCardPicShow = false;
        }
      },
      idcardChange_zm(event) {
        let img1 = event.target.files[0];
        let image = new Image();
        let _this = this;
        let reader = new FileReader();
        reader.readAsDataURL(img1);
        reader.onloadend = function (e) {
          let base64Str = reader.result;
          image.src = reader.result;
//        	var  = reader.result.split(',')[1]
          if (base64Str.length < (100 * 1024)) {
            // 图片上传
            _this.base64 = base64Str.split(',')[1];
//	          	console.log(_this.base64)
            _this.idCardUpload('zm', _this.base64)
          } else {
            image.onload = function () {
              // 压缩处理
              let data = _this.compress(image, _this.Orientation);
              _this.base64 = data.split(',')[1];
              _this.$store.dispatch('showLoading');
              // 图片上传
              _this.idCardUpload('zm', _this.base64)
            }
          }
        }
      },
      idcardChange_fm(event) {
        let img1 = event.target.files[0];
        let image = new Image();
        let _this = this;
        let reader = new FileReader();
        reader.readAsDataURL(img1);
        reader.onloadend = function (e) {
          let base64Str = reader.result;
          image.src = reader.result;
//        	var  = reader.result.split(',')[1]
          if (base64Str.length < (100 * 1024)) {
            // 图片上传
            _this.base64 = base64Str.split(',')[1];
//	          	console.log(_this.base64)
            _this.idCardUpload('fm', _this.base64)
          } else {
            image.onload = function () {
              // 压缩处理
              let data = _this.compress(image, _this.Orientation);
              _this.base64 = data.split(',')[1];
              _this.$store.dispatch('showLoading');
              // 图片上传
              _this.idCardUpload('fm', _this.base64)
            }
          }
        }
      },
      idcardChange_sc(event) {
        let img1 = event.target.files[0];
        let image = new Image();
        let _this = this;
        let reader = new FileReader();
        reader.readAsDataURL(img1);
        reader.onloadend = function (e) {
          let base64Str = reader.result;
          image.src = reader.result;
//        	var  = reader.result.split(',')[1]
          if (base64Str.length < (100 * 1024)) {
            // 图片上传
            _this.base64 = base64Str.split(',')[1];
//	          	console.log(_this.base64)
            _this.idCardUpload('sc', _this.base64)
          } else {
            image.onload = function () {
              // 压缩处理
              let data = _this.compress(image, _this.Orientation);
              _this.base64 = data.split(',')[1];
              _this.$store.dispatch('showLoading');
              // 图片上传
              _this.idCardUpload('sc', _this.base64)
            }
          }
        }
      },
      idCardUpload(strType, base64Str) {
        let this_ = this;
        let params = {
          funCode: 110039,
          base64Str: base64Str
        };
        All(params).then(res => {
          if (res.retCode === '0000') {
            this_.$store.dispatch('hideLoading');
            this_.idCardPic[strType] = res.retData;
            this_.idCardList[strType] = res.retData;
            console.log(this_.idCardList);
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
      }
    },
    components: {},
    computed: {
      re1Solts() {
        let vm = this;
        if (vm.relation2 == "夫妻") return [{flex: 1, values: ["父母"]}];
        else if (vm.relation2 == "父母") return [{flex: 1, values: ["夫妻"]}];
        else return [{flex: 1, values: ["夫妻", "父母"]}];
      },
      re2Solts() {
        let vm = this;
        if (vm.relation1 == "请选择关系") return [{flex: 1, values: ["夫妻", "父母", "同学", "同事", "朋友"]}];
        if (vm.relation1 == "夫妻") return [{flex: 1, values: ["父母", "同学", "同事", "朋友"]}];
        if (vm.relation1 == "父母") return [{flex: 1, values: ["夫妻", "同学", "同事", "朋友"]}];
      },
      allAddress(){
        return this.userProvince + this.userCity + this.userArea + this.detailAddr;
      }
    },       // 计算属性是基于它们的依赖进行缓存的。计算属性只有在它的相关依赖发生改变时才会重新求值
    watch: {},
    filters: {}
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss">
  @import "../common/sass/Cyucb";

  #CeditPersonInfo {
    width: 100%;
    height: 100%;
    position: absolute;

    .mint-header.is-fixed {
      z-index: 20;
    }

    .allpage {
      width: 100%;
      height: 100%;
      background: #ffffff;
    }
    .container {
      background: #eeeff6;
    }
    .mint-cell.cl-balck .mint-cell-value {
      color: #000;
    }
    .mint-cell:first-child .mint-cell-wrapper {
      background-size: 120% 0;
    }
    .form-group {
      #modify {
        height: (44rem/64.687);
        line-height: (44rem/64.687);
        background: white;
        position: relative;
        border-radius: 0.05rem;

        span {
          display: inline-block;
          width: 81%;
          font-size: (14rem/64.687);
          color: #000000;
          margin-left: (14rem/64.687);
          vertical-align: middle;
          letter-spacing: 0.18rem;
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

      .mint-cell {
        width: 100%;

        .mint-cell-wrapper {

          .mint-cell-title {
            width: 25%;
          }
          .mint-cell-value {

            input {
              text-align: right;
              margin-left: 0.82rem;
              padding-right: rem(10rem);
              color: #888888;
              background: white;
            }
          }
        }

      }

      .mint-cell:first-child {
        border-top-left-radius: rem(6rem);
        border-top-right-radius: rem(6rem);
      }
      .mint-cell:last-child {
        background-size: 120% 0;
        border-bottom-left-radius: rem(6rem);
        border-bottom-right-radius: rem(6rem);
      }
      input.mint-field-core {
        text-align: right;
      }
      .mint-cell-title .mint-cell-text {
        padding-left: rem(5rem);
      }
    }
    .tip {
      margin: rem(10rem) 0 rem(70rem) rem(10rem);
      font-size: rem(12rem);
      color: #888888;
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

        h2 {
          font-size: rem(20rem);
        }
        img {
          width: rem(16rem);
          height: rem(16rem);
        }
      }
      a {
        min-height: (44rem/64.687);

        .mint-cell-wrapper {
          padding: 0 rem(10rem);
        }

        .mint-cell-wrapper, .mint-cell-title .mint-cell-text, .mint-cell-value span {
          font-size: (14rem/64.687);
        }
        .mint-cell-title, .mint-cell-value {
          margin-top: rem(3rem);
          color: #333;
          padding-right: rem(10rem);
          .zffs {
            border: rem(1rem) solid #e5e5e5;
            border-radius: rem(4rem);
            color: #888;
            padding: rem(7rem) rem(15rem);
            margin-right: rem(10rem);
            background: transparent;
          }
          .zffs.active {
            background: #1b9dff;
            border: rem(1rem) solid #1b9dff;
            color: #FFFFFF;
          }
          .zffs:last-child {
            margin-right: 0;
          }
        }
        .mint-cell-value.is-link {
          margin-right: rem(15rem);
        }
        .mint-cell-title .mint-cell-text {
          padding-left: rem(15rem);
        }
        .mint-cell-allow-right::after {
          border: solid 1px #c8c8cd;
          border-bottom-width: 0;
          border-left-width: 0;
          right: rem(10rem);
          width: rem(8rem);
          height: rem(8rem);
          margin-top: rem(2rem);
        }
      }
      .payok {
        margin: rem(24rem) 6%;
        width: 88%;
        border-radius: rem(4rem);
        border: none;
        background: #1b9dff;
        height: rem(44rem);
        color: #ffffff;
        font-size: rem(14 ewm);
        -webkit-transform: translate3d(0, 0, 0);
        transform: translate3d(0, 0, 0);
      }

    }
    .heizi {
      .mint-cell-value {
        input.mint-field-core {
          color: #000 !important;
        }
      }

      .mint-cell-value.is-link {
        span {
          color: #000 !important;
        }
      }

    }

    .idcard-pic {
      width: 100%;
      height: 100%;
      background-color: #eeeff6;
    }
  }

  #CardPic {
    .submit {
      z-index: 40;
    }
    .t20 {
      margin-top: rem(20rem);
    }
    .pic-form {
      padding: rem(30rem) rem(15rem);
      background: #ffffff;
      border-radius: rem(4rem);
      .group {
        display: -webkit-flex; /* Safari */
        display: flex;
        align-items: center;
        justify-content: center;

        .item {
          flex-grow: 1;
          text-align: center;
          position: relative;
          img {
            width: rem(158rem);
            height: rem(90rem);
          }
          .hide-input {
            opacity: 0;
            position: absolute;
            width: rem(158rem);
            height: rem(90rem);
            top: 0;
            left: 50%;
            margin-left: rem(-79rem);
          }
        }
      }
    }

  }
</style>
