<template>
	<section class="modifyPass">
		<div class="forgetHead">
			<img src="../images/back_aw.png" @click="history"/>
			<span>修改登录密码</span>
		</div>
		<div class="modifyPassList">
			<div>
				<input id="password" v-model='oldPass' maxlength="16" type="password" placeholder="请输入原始密码"/>
				<img v-if='eyeShow == 1' src="../images/yanjing.png" @click='eyeDisplay'/>
				<img v-if='eyeShow == 2' src="../images/yincang.png" @click='eyeHide'/>
			</div>
			<div>
				<input id="password1" v-model='newPass' maxlength="16" type="password" placeholder="请输入新密码"/>
				<img v-if='eyeShow1 == 1' src="../images/yanjing.png" @click='eyeDisplay1'/>
				<img v-if='eyeShow1 == 2' src="../images/yincang.png" @click='eyeHide1'/>
			</div>
			<div>
				<input id="password2" v-model='confirmPass' maxlength="16" type="password" placeholder="再次输入密码"/>
				<img v-if='eyeShow2 == 1' src="../images/yanjing.png" @click='eyeDisplay2'/>
				<img v-if='eyeShow2 == 2' src="../images/yincang.png" @click='eyeHide2'/>
			</div>
		</div>
		<!--<div class="modifyFoot">
			<span>密码为6-16位字符，包括数字和字母</span>
		</div>-->
		<div class="next">
			<button @click='next'>确定</button>
		</div>
	</section>
  
</template>
<script>
//	let Base64 = require('js-base64').Base64
//	import { strEnc } from '../common/js/des.js'
//	import { Toast } from 'mint-ui'
//	import { changeLoginPwd } from './../api/api'
export default {
  data () {
    return {
    	eyeShow: 1,
    	eyeShow1: 1,
    	eyeShow2: 1,
    	oldPass: '', // 旧密码
    	newPass: '', // 新密码
    	confirmPass: '' // 确认密码
    }
  },
  methods: {
  	history() { // 后退
		this.$router.push({path: '/personal'})
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
    eyeDisplay2() { // 显示密码
    	var psd = document.getElementById('password2')
    	this.eyeShow2 = 2
    	psd.type = 'text'
    },
    eyeHide2() { // 隐藏密码
    	var psd = document.getElementById('password2')
    	this.eyeShow2 = 1
    	psd.type = 'password'
    },
	next() {
//		var reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/
//		var key = 'pasec23der1e12ecjer3AFRGYD03847@@*^DEJUsdu33'
//		var a = strEnc(this.oldPass, key)
//		var oldPwd = Base64.encode(a)
//		var b = strEnc(this.confirmPass, key)
//		var newPwd = Base64.encode(b)
//		if (this.oldPass !== '') {
//			if (reg.test(this.newPass)) {
//				if (this.newPass === this.confirmPass) {
//					let params = {
//						oldPwd: oldPwd,
//						newPwd: newPwd,
//						mobileType: '3'
//					}
//					changeLoginPwd(params).then(res => {
//						if (res.code === 200) {
//							Toast({
//								message: res.msg,
//								duration: 2000
//							});
//							this.$router.push({path: '/personal'})
//						} else {
//							Toast({
//								message: res.msg,
//								duration: 2000
//							});
//						}
//					})
//				} else {
//					Toast({
//						message: '两次密码不一致，请重新输入',
//						position: 'bottom',
//						duration: 2000
//					});
//				}
//			} else {
//				Toast({
//					message: '新密码为6-16位字符，包括数字和字母',
//					position: 'bottom',
//					duration: 2000
//				});
//			}
//		} else {
//			Toast({
//				message: '请输入原始密码',
//				position: 'bottom',
//				duration: 2000
//			});
//		}
	}
  },
  computed: {
  	
  }
}
</script>

<style lang="scss" rel="stylesheet/scss">
.modifyPass {
	flex:1;
	z-index: 11;
	background: white;
	
	.forgetHead {
		width: 100%;
		background: white;
		position: relative;
		height: 0.8rem;
		line-height: 0.8rem;
		
		img {
			vertical-align: middle;
			width: 0.15rem;
			margin-left: 0.2rem;
		}
		span:nth-child(2) {
			vertical-align: middle;
			font-size: 0.25rem;
			color: black;
			display: inline-block;
			width: 90%;
			text-align: center;
		}
		button:nth-child(3) {
			position: absolute;
			outline: none;
			border: 0;
			background: white;
			right: 0.2rem;
			top: 0.24rem;
			font-size: 0.25rem;
		}
	}
	.modifyPassList {
		width: 100%;
		
		div {
			/*border: 1px solid red;*/
			width: 92%;
			margin-left: 4%;
			height: 0.8rem;
			margin-top: 0.1rem;
			background: white;
			border-bottom: 0.01rem solid rgba(0,0,0,0.1);
			
			input {
				width: 93%;
				height: 0.8rem;
				outline: none;
				border: 0;
				font-size: 0.25rem;
				/*color: rgb(199,199,199);*/
			}
			img {
				width: 0.3rem;
			}
		}
		::-webkit-input-placeholder { 
		    color:rgb(199,199,199);
		}
		:-moz-placeholder { 
		    color:rgb(199,199,199);
		}
		::-moz-placeholder { 
		    color:rgb(199,199,199);
		}
		:-ms-input-placeholder { 
		    color:rgb(199,199,199);
		}
	}
	.modifyFoot {
		width: 100%;
		margin-top: 0.2rem;
		
		span {
			display: inline-block;
			width: 80%;
			font-size: 0.2rem;
			height: 0.6rem;
			line-height: 0.6rem;
			padding-left: 0.2rem;
		}
	}
	.next {
		button {
			outline: none;
			border: 0;
			width: 92%;
			height: 0.742rem;
			margin-left: 4%;
			margin-top: 0.928rem;
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
