<template>
	<section class="LRecharge">
		<div class="LRechargeHead">
			<img src="../images/fauhuibaise.png@2x.png" @click='history'/>
			<span>充值点券</span>
		</div>
		<div class="LRechargeContent">
			<span>充值点券数</span>
			<span>100起</span>
		</div>
		<div class="LRechargeAgreement">
			<div @click='Agreement'>
				<img v-show='AgreementType == false' src="../images/frame1@2x.png"/>
				<img v-show='AgreementType == true' src="../images/frame2@2x.png"/>
			</div>
			<div>
				<span>已阅读并同意</span>
				<a href="">《购买服务协议》</a>
				<span>点券售价1元/点</span>
			</div>
		</div>
		<mt-popup v-model="popupVisible" position="bottom">
			<div class="top">
				<span>支付详情</span>
				<img @click='closePayment' src="../images/backoff.png"/>
			</div>
			<div class="LMoney">
				<span>支付金额</span>
				<span>100.00元</span>
			</div>
			<div class="Lmode">
				<span class="LmodeSpan">支付方式</span>
				<div>
					<span class="payment" v-for='(item, index) in paymentList' @click='payment(index)'>{{item}}</span>
				</div>
				<button @click='confirmPayment'>确认支付</button>
			</div>
		</mt-popup>
		<button class="btnRecharge" @click='Recharge'>充值</button>
		<router-view></router-view>
	</section>
</template>
<script>
	import { MessageBox, Toast } from 'mint-ui'
	import { All } from './../api/api'
export default {
  data () {
    return {
    	popupVisible: false,
    	AgreementType: true, // 协议状态
    	paymentList: ['银行卡', '微信'],
    	paymenMode: '',
    	paymenModeType: false // 支付方式状态
    }
  },
  methods: {
  	history() { // 后退
		this.$router.push({path: '/mine'})
	},
	Agreement() { // 是否同意协议
		this.AgreementType = !this.AgreementType
	},
	payment(index) { // 选择支付
		var sp = document.getElementsByClassName('payment')
		for (var i = 0; i < sp.length; i++) {
			sp[i].style.cssText = 'color:rgb(136,136,136);border: 0.01rem solid rgb(229,229,229);'
		}
		sp[index].style.cssText = 'color:white;border: 0.01rem solid rgb(229,229,229);background: #1b9dff;'
		this.paymenMode = index
		this.paymenModeType = true
	},
	closePayment() { // 关闭支付详情
		this.popupVisible = false
	},
	Recharge() { // 打开支付详情
		if (this.AgreementType === false) {
			MessageBox('提示', '请确认阅读购买服务协议');
		} else {
			this.popupVisible = true
		}
	},
	confirmPayment() { // 确认支付
		if (this.paymenModeType === true) {
			console.log(this.paymenMode)
			var payWay
			if (this.paymenMode === 0) {
				payWay = 0
			} else if (this.paymenMode === 1) {
				payWay = 2
			}
			let params = {
				payWay: payWay,
				payMoney: 100,
				payType: '2',
				funCode: 130004
			}
			console.log(params)
			All(params).then(res => {
				console.log(res)
			})
		} else {
			Toast('请选择支付方式');
		}
//		this.$router.push({path: '/LPayment'})
//		this.popupVisible = false
	}
  },
  computed: {
  	
  }
}
</script>

<style lang="scss" rel="stylesheet/scss">
.LRecharge {
	flex:1;
	z-index: 11;
	position: fixed;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	background: #f3f5f8;
	
	.LRechargeHead {
		position: relative;
		height: 0.8rem;
		line-height: 0.8rem;
		background: #1b9dff;
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
	.LRechargeContent {
		width: 96%;
		margin-left: 2%;
		margin-top: (10rem/64.687);
		background: white;
		height: (44rem/64.687);
		border-radius: 0.05rem;
		line-height: (44rem/64.687);
		
		
		span {
			display: inline-block;
			width: 46%;
		}
		span:nth-child(1) {
			margin-left: (10rem/64.687);
			font-size: (14rem/64.687);
		}
		span:nth-child(2) {
			text-align: right;
			margin-right: (10rem/64.687);
			color: rgb(136,136,136);
			font-size: (12rem/64.687);
		}
	}
	.LRechargeAgreement {
		width: 96%;
		margin-left: 2%;
		margin-top: (15rem/64.687);
		
		div {
			display: inline-block;
		}
		div:nth-child(1) {
			vertical-align: middle;
			img {
				width: 0.3rem;
				height: 0.3rem;
			}
			
		}
		div:nth-child(2) {
			vertical-align: middle;
			margin-left: 0.1rem;
			
			span {
				font-size: (12rem/64.687);
			}
			span:nth-child(1) {
				color: rgb(136,136,136);
			}
			a {
				color: #1b9dff;
			} 
			span:nth-child(3) {
				display: inline-block;
				color: rgb(136,136,136);
				width: 2.7rem;
				text-align: right;
			} 
		}
	}
	.btnRecharge {
		width: 100%;
		height: (50rem/64.687);
		background: #1b9dff;
		color: rgb(255,255255,255);
		outline: none;
		border: 0;
		position: absolute;
		bottom: 0;
		font-size: (16rem/64.687);
	}
	.mint-popup {
		width: 100%;
		height: (242rem/64.687);
		
		.top {
			position: relative;
			width: 100%;
			height: (64rem/64.687);
			border-bottom:0.01rem solid rgb(229,229,229) ;
			line-height: (64rem/64.687);
			
			span {
				display: inline-block;
				width: 100%;
				text-align: center;
				font-size: (17rem/64.687);
				font-weight: 600;
			}
			img {
				width: (15rem/64.687);
				position: absolute;
				right: (20rem/64.687);
				top: (24rem/64.687);
			}
		}
		.LMoney {
			width: 96%;
			margin-left: 4%;
			height: (44rem/64.687);
			line-height: (54rem/64.687);
			border-bottom:0.01rem solid rgb(229,229,229) ;
			
			span {
				display: inline-block;
				width: 46%;
				font-size: (14rem/64.687);
				font-weight: 600;
			}
			span:nth-child(1) {
				margin-left: (10rem/64.687);
			}
			span:nth-child(2) {
				text-align: right;
				margin-right: (10rem/64.687);
			}
		}
		.Lmode {
			width: 96%;
			margin-left: 4%;
			height: (44rem/64.687);
			line-height: (44rem/64.687);
			border-bottom:0.01rem solid rgb(229,229,229) ;

			.LmodeSpan {
				display: inline-block;
				width: 20%;
				font-size: (14rem/64.687);
				font-weight: 600;
				margin-left: (10rem/64.687);
			}
			div {
				width: 72%;
				text-align: right;
				display: inline-block;
				
				.payment {
					display: inline-block;
					border: 0.01rem solid rgb(229,229,229);
					height: (28rem/64.687);
					line-height: (28rem/64.687);
					padding: 0 0.2rem 0 0.2rem;
					margin-left: (10rem/64.687);
					font-size: (12rem/64.687);
					color:rgb(136,136,136);
					border-radius: 0.05rem;
				}
			}
			
			button {
				width: 93.5%;
				margin-left: 2%;
				height: (44rem/64.687);
				line-height: (44rem/64.687);
				outline: none;
				border: 0;
				background: #1b9dff;
				font-size: (14rem/64.687);
				color: white;
				margin-top: (25rem/64.687);
				border-radius: 0.05rem;
			}
		}
	}
	
}
.mint-msgbox {
	.mint-msgbox-header {
		padding: 0.1rem 0 0 0;
		
		.mint-msgbox-title {
			width: 100%;
			height: 0.4rem;
			line-height: 0.4rem;
			font-size: (16rem/64.687);
		}
	}
	.mint-msgbox-content {
		padding: 0 0 0.1rem;
		
		.mint-msgbox-message {
			width: 100%;
			height: 0.8rem;
			line-height: 0.8rem;
			font-size: (14rem/64.687);
		}
	}
	.mint-msgbox-btns {
		width: 100%;
		height: 0.6rem;
		line-height: 0.6rem;
		
		
		.mint-msgbox-btn {
			color: black;
			font-size: (16rem/64.687);
		}
	}
}
</style>
