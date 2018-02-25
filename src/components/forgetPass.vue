<template>
	<section class="forgetPass">
		<div class="forgetHead">
			<img src="../images/back_aw.png" @click='history'/>
			<span>忘记密码</span>
		</div>
		<div class="loginForm">
			<div class="phone">
				<!--<img src="../images/loginphone.png"/>-->
				<input placeholder="请输入手机号" type="number" v-model='phone' oninput="if(value.length>11)value=value.slice(0,11)"/>
			</div>
			<div class="smscode">
				<!--<img src="../images/yanzhengma.png"/>-->
				<input type="text" placeholder="请输入验证码" v-model='smsCode' maxlength="4"/>
				<span @click='send'>
	    			<timer-btn class="btn btn-default" ref="btn" :second="60"></timer-btn>
	    		</span>
				<div v-show='boxType' class="forgetBox" :state='boxState' @click='box'></div>
			</div>
		</div>
		<div class="next">
			<button @click='next'>下一步</button>
		</div>
	</section>
</template>
<script>
	import { Toast } from 'mint-ui'
//	import { fetchSmsVCode, verifySms } from './../api/api'
export default {
  data () {
    return {
    	boxType: false, // 短信验证码状态
    	phone: '', // 手机号
    	smsCode: '' // 短信验证码
    }
  },
  methods: {
  	history() { // 后退
		this.$router.push({path: '/login'})
	},
	box() { // 验证码状态
		var phoneReg = /^1[3|4|5|7|8][0-9]{9}$/
		if (phoneReg.test(this.phone)) {
    		
    	} else {
    		Toast({
				message: '请输入正确手机号码',
				position: 'bottom',
				duration: 2000
			});
    	}
	},
    send() { // 获取验证码
//  	var phoneReg = /^1[3|4|5|7|8][0-9]{9}$/
//  	if (phoneReg.test(this.phone)) {
//  		let params = {
//  			phone: this.phone,
//  			type: 'findReg'
//  		}
//  		fetchSmsVCode(params).then(res => {
//  			if (res.data.state === '10') {
//  				Toast({
//						message: res.msg,
//						position: 'bottom',
//						duration: 2000
//					});
//  			} else if (res.data.state === '20') {
//  				Toast({
//						message: res.data.message,
//						position: 'bottom',
//						duration: 2000
//					});
//  			} else if (res.code === 500) {
//  				Toast({
//						message: res.msg,
//						position: 'bottom',
//						duration: 2000
//					});
//  			}
//  		})
//  	} else {
//  		Toast({
//				message: '请输入正确手机号码',
//				position: 'bottom',
//				duration: 2000
//			});
//  	}
    },
    next() { // 下一步
//  	if (this.phone === '' || this.phone.length !== 11) {
//  		Toast({
//				message: '请输入正确手机号码',
//				position: 'bottom',
//				duration: 2000
//			});
//  	} else {
//  		if (this.smsCode === '' || this.smsCode.length !== 4) {
//  			Toast({
//					message: '请输入正确验证码',
//					position: 'bottom',
//					duration: 2000
//				});
//  		} else {
//  			let params = {
//  				phone: this.phone,
//  				vcode: this.smsCode,
//  				type: 'findReg'
//  			}
//  			verifySms(params).then(res => {
//  				if (res.data.state === '10') {
//						this.$router.push({path: '/resetPass', query: {phone: this.phone}})
//					} else if (res.data.state === '20') {
//						Toast({
//							message: res.data.message,
//							position: 'bottom',
//							duration: 2000
//						});
//					}
//  			})
//  		}
//  	}
    	
    }
  },
  computed: {
  	boxState() {
  		var phoneReg = /^1[3|4|5|7|8][0-9]{9}$/
  		if (phoneReg.test(this.phone)) {
  			this.boxType = false
  		} else {
  			this.boxType = true
  		}
  	}
  },
  components: {
		'timer-btn': require('../components/PlugInUnit/timerbtn.vue')
	}
}
</script>

<style lang="scss" rel="stylesheet/scss">
.forgetPass {
	flex:1;
	z-index: 11;
	background: white;
	
	.forgetHead {
		background: white;
		width: 100%;
		height: 0.8rem;
		line-height: 0.8rem;
		
		img {
			vertical-align: middle;
			width: 0.2rem;
			margin-left: 0.2rem;
			
		}
		span {
			vertical-align: middle;
			font-size: 0.278rem;
			color: black;
			display: inline-block;
			width: 90%;
			text-align: center;
		}
	}
	
	.loginForm {
		width: 100%;
		background: white;
		
		.phone {
			width: 92%;
			height: 1rem;
			margin-top: 1.3rem;
			margin-left: 4%;
			position: relative;
			
			input {
				position: absolute;
				width: 100%;
				height: 0.6rem;
				outline: none;
				border:0;
				font-size: 0.25rem;
				top: 0.21rem;
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
			/*img {
				position: absolute;
				width: 0.25rem;
				top: 0.32rem;
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
			}*/
		}
		.smscode {
			width: 92%;
			height: 1rem;
			margin-left: 4%;
			position: relative;
			
			/*img {
				position: absolute;
				width: 0.25rem;
				top: 0.4rem;
				left: 0.2rem;
			}*/
			input {
				position: absolute;
				width: 100%;
				height: 0.6rem;
				outline: none;
				border:0;
				font-size: 0.25rem;
				top: 0.24rem;
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
			/*img {
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
			}*/
			span:nth-child(2) {
				position: absolute;
				right: 0;
				top: 0.3rem;
				.btn {
					height: 0.5rem;
					width: 1.4rem;
					background: #FFFFFF;
					font-size: 0.22rem;
					color: #d84949;
					outline: none;
					-webkit-appearance: none;
					border: 0;
					float: right;
					position: absolute;
					right: 0rem;
					text-align: right;
				}
			}
			.forgetBox {
				width: 1.8rem;
				height: 0.6rem;
				background: rgba(0,0,0,0);
				position: absolute;
				right: 0;
				top: 0.2rem;
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
			margin-top: 1.12rem;
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
