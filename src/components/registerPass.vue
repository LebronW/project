<template>
	<section class="registerPass" :state='pageState'>
		<div class="registerHead">
			<img src="../images/back_aw.png" @click='history'/>
			<span>注册</span>
		</div>
		<div class="loginForm">
			<div class="password">
				<!--<img src="../images/password.png"/>-->
				<input id="password" v-model='password' placeholder="请输入登录密码" type="password" @focus='focus'/>
				<div v-show='yanjing'>
					<img v-if='eyeShow == 1' src="../images/yanjing.png" @click='eyeDisplay'/>
					<img v-if='eyeShow == 2' src="../images/yincang.png" @click='eyeHide'/>
				</div>
			</div>
		</div>
		<div class="next">
			<button @click='login'>确定</button>
		</div>
	</section>
  
</template>
 merit: ' 
<script>
//	let Base64 = require('js-base64').Base64
//	import { strEnc } from '../common/js/des.js'
//	import { Toast } from 'mint-ui'
//	import { loginRegister } from './../api/api'
	import { mapMutations } from 'vuex'
export default {
  data () {
    return {
    	yanjing: false, // 眼睛显示隐藏
    	eyeShow: 1, // 密码显示隐藏
    	password: '', // 密码
    	phone: '', // 手机号码
    	code: '', // 短信验证码
    	invitationCode: '', // 邀请码
		client: 'wx', // 客户端类型
		registerAddr: '', // 注册地址
		channelCode: 'h5', // 渠道编码
		registerCoordinate: '', // 注册坐标，经纬度
		userInfo: '' // 用户信息
    }
  },
  methods: {
  	...mapMutations([
		'RECORD_USERINFO', 'GET_USERINFO'
	]),
  	history() { // 后退
		this.$router.push({path: '/login'})
	},
	focus() { // 眼睛显示
    	this.yanjing = true
    },
    eyeDisplay() { // 显示密码
    	var psd = document.getElementById('password')
    	psd.type = 'text'
    	this.eyeShow = 2
    },
    eyeHide() { // 隐藏密码
    	var psd = document.getElementById('password')
    	this.eyeShow = 1
    	psd.type = 'password'
    },
    login() { // 注册
//  	var passReg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/
//  	var key = 'pasec23der1e12ecjer3AFRGYD03847@@*^DEJUsdu33'
//		var aa = strEnc(this.password, key)
//		var loginWord = Base64.encode(aa)
//		if (passReg.test(this.password)) {
//			let params = {
//				loginName: this.phone, // 手机号码
//				loginPwd: loginWord, // 密码
//				vcode: this.code, // 短信验证码
//				invitationCode: this.invitationCode, // 邀请码
//				client: this.client, // 客户端类型
//				registerAddr: this.registerAddr, // 注册地址
//				channelCode: this.channelCode, // 渠道编码
//				registerCoordinate: this.registerCoordinate, // 注册坐标经纬度
//				signMsg: '',
//				blackBox: '',
//				mobileType: '3'
//  		}
//			loginRegister(params).then(res => {
//				console.log(res)
//				if (res.code === 200) {
//					this.userInfo = res.data
//					if (!this.userInfo.userId) {
//						alert('登录失败')
//					} else {
//						this.RECORD_USERINFO(this.userInfo)
//						Toast({
//							message: res.msg,
//							position: 'bottom',
//							duration: 2000
//						});
//						this.$router.push({path: '/mine'})
//					}
//				} else if (res.code !== 200) {
//					Toast({
//						message: res.msg,
//						duration: 2000
//					});
//				}
//			})
//		} else {
//			Toast({
//				message: '密码为6-16位字符，包括数字和字母',
//				position: 'bottom',
//				duration: 2000
//			});
//		}
    }
  },
  computed: {
  	pageState() { // 页面状态
		this.phone = this.$route.query.loginPhone
		this.code = this.$route.query.code
	}
  },
  components: {
		
	}
}
</script>

<style lang="scss" rel="stylesheet/scss">
.registerPass {
	flex:1;
	z-index: 11;
	background: white;
	
	
	.registerHead {
		position: relative;
		margin-top: 0.2rem;
		width: 100%;
		
		img:nth-child(1) {
			width: 0.2rem;
			margin-left: 0.2rem;
			vertical-align: middle;
		}
		span:nth-child(2) {
			vertical-align: middle;
			font-size: 0.279rem;
			color: black;
			display: inline-block;
			width: 90%;
			text-align: center;
		}
	}
	
	.loginForm {
		width: 100%;
		height: 2.1rem;
		position: relative;
		margin-top:1.4rem;
		
		.password {
			position: relative;
			width: 92%;
			margin-left:4%;
			
			input {
				font-size: 0.25rem;
				position: absolute;
				width: 100%;
				height: 0.6rem;
				top: 1rem;
				outline: none;
				border: 0;
				border-bottom: 0.01rem rgba(0,0,0,0.1) solid;
			}
			::-webkit-input-placeholder { /* WebKit browsers */
			    color:rgb(199,199,199);
			}
			:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
			    color:rgb(199,199,199);
			}
			::-moz-placeholder { /* Mozilla Firefox 19+ */
			    color:rgb(199,199,199);
			}
			:-ms-input-placeholder { /* Internet Explorer 10+ */
			    color:rgb(199,199,199);
			}
			div:nth-child(2) {
				position: absolute;
				right: 0;
				top: 1.2rem;
				img {
					width: 0.3rem;
				}
			}
			
			
			
			/*img:nth-child(1) {
				position: absolute;
				width: 0.25rem;
				top: 1.2rem;
			}
			input {
				font-size: 0.25rem;
				position: absolute;
				width: 80%;
				height: 0.6rem;
				left: 0.5rem;
				top: 1rem;
				outline: none;
				border: 0;
				padding-left: 0.3rem;
				border-bottom: 0.01rem rgba(0,0,0,0.1) solid;
			}
			div:nth-child(2) {
				position: absolute;
				right: 0.4rem;
				img {
					width: 0.3rem;
				}
			}*/
		}
	}
	.next {
		button {
			outline: none;
			border: 0;
			width: 92%;
			height: 0.742rem;
			margin-left: 4%;
			margin-top: 1.2rem;
			border-radius: 0.1rem;
			color: white;
			font-size: 0.263rem;
			background: -webkit-linear-gradient(left, rgb(238,89,36) , rgb(245,140,53));
		    background: -o-linear-gradient(right, rgb(238,89,36) , rgb(245,140,53)); 
		    background: -moz-linear-gradient(right, rgb(238,89,36) , rgb(245,140,53)); 
		    background: linear-gradient(to right, rgb(238,89,36) , rgb(245,140,53)); 
		}
	}
}

</style>
