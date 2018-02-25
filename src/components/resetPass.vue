<template>
	<section class="resetPass" :state='pageState'>
		<div class="forgetHead">
			<img src="../images/back_aw.png" @click='history'/>
			<span>忘记密码</span>
		</div>
		<div class="loginForm">
			<div class="password">
				<img src="../images/password.png"/>
				<input id="password" v-model='password' placeholder="请输入密码" type="password" @focus='focus'/>
				<div>
					<img v-if='eyeShow == 1' src="../images/yanjing.png" @click='eyeDisplay'/>
					<img v-if='eyeShow == 2' src="../images/yincang.png" @click='eyeHide'/>
				</div>
			</div>
			<div class="newPassword">
				<img src="../images/password.png"/>
				<input id="password1" type="password" placeholder='请确认新密码' v-model='newPassword'/>
				<div>
					<img v-if='eyeShow1 == 1' src="../images/yanjing.png" @click='eyeDisplay1'/>
					<img v-if='eyeShow1 == 2' src="../images/yincang.png" @click='eyeHide1'/>
				</div>
			</div>
		</div>
		<div class="next">
			<button @click='next'>确定</button>
		</div>
	</section>
  
</template>
<script>
//	let Base64 = require('js-base64').Base64
//	import { strEnc } from '../common/js/des.js'
//	import { Toast } from 'mint-ui'
//	import { forgetPwd } from './../api/api'
export default {
  data () {
    return {
    	phone: '', // 电话号码
    	eyeShow: 1, // 密码显示隐藏
    	eyeShow1: 1, // 密码显示隐藏
    	password: '', // 新密码
    	newPassword: '' // 重复密码
    }
  },
  methods: {
  	history() { // 后退
		this.$router.push({path: '/login'})
	},
	focus() {
		
	},
	eyeDisplay() { // 显示密码
    	var psd = document.getElementById('password')
    	this.eyeShow = 2
    	psd.type = 'text'
    },
    eyeHide() { // 隐藏密码
    	var psd = document.getElementById('password')
    	this.eyeShow = 1
    	psd.type = 'password'
    },
    eyeDisplay1() { // 显示密码
    	var psd = document.getElementById('password1')
    	this.eyeShow1 = 2
    	psd.type = 'text'
    },
    eyeHide1() { // 隐藏密码
    	var psd = document.getElementById('password1')
    	this.eyeShow1 = 1
    	psd.type = 'password'
    },
    next() { // 确定修改密码
//  	var reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/
//  	var key = 'pasec23der1e12ecjer3AFRGYD03847@@*^DEJUsdu33'
//		var aa = strEnc(this.newPassword, key)
//		var loginWord = Base64.encode(aa)
//  	if (reg.test(this.password)) {
//  		if (this.password === this.newPassword) {
//  			let params = {
//  				phone: this.phone,
//  				newPwd: loginWord,
//  				vcode: '',
//  				mobileType: '3'
//  			}
//  			forgetPwd(params).then(res => {
//  				if (res.code === 200) {
//  					Toast({
//							message: res.msg,
//							duration: 2000
//						});
//						this.$router.push({path: '/mine'})
//  				}
//  			})
//  		} else {
//  			Toast({
//					message: '两次密码不一致',
//					position: 'bottom',
//					duration: 2000
//				});
//  		}
//  	} else {
//  		Toast({
//				message: '密码为6-16位字符，包括数字和字母',
//				position: 'bottom',
//				duration: 2000
//			});
//  	}
    }
  },
  computed: {
  	pageState() {
  		this.phone = this.$route.query.phone
  	}
  }
}
</script>

<style lang="scss" rel="stylesheet/scss">
.resetPass {
	flex:1;
	z-index: 11;
	background: #f3f5f8;
	
	.forgetHead {
		width: 100%;
		height: 0.8rem;
		background: white;
		line-height: 0.8rem;
		
		img {
			vertical-align: middle;
			width: 0.15rem;
			margin-left: 0.2rem;
		}
		span {
			vertical-align: middle;
			font-size: 0.25rem;
			color: black;
			display: inline-block;
			width: 90%;
			text-align: center;
		}
	}
	
	.loginForm {
		width: 100%;
		background: white;
		margin-top: 0.2rem;
		
		.password {
			position: relative;
			width: 100%;
			height: 1rem;
			
			img {
				position: absolute;
				width: 0.25rem;
				top: 0.34rem;
				left: 0.2rem;
			}
			input {
				position: absolute;
				width: 60%;
				left: 0.8rem;
				height: 0.6rem;
				outline: none;
				border:0;
				font-size: 0.25rem;
				top: 0.21rem;
			}
			div:nth-child(3) {
				position: absolute;
				right: 0.8rem;
				top: 0.1rem;
				img {
					width: 0.3rem;
				}
			}
		}
		.newPassword {
			position: relative;
			width: 100%;
			height: 1rem;
			background: white;
			border-top: 0.2rem solid #f3f5f8;
			
			img {
				position: absolute;
				width: 0.25rem;
				top: 0.34rem;
				left: 0.2rem;
			}
			input {
				position: absolute;
				width: 60%;
				left: 0.8rem;
				height: 0.6rem;
				outline: none;
				border:0;
				font-size: 0.25rem;
				top: 0.21rem;
			}
			div:nth-child(3) {
				position: absolute;
				right: 0.8rem;
				top: 0.1rem;
				img {
					width: 0.3rem;
				}
			}
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
