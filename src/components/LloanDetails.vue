<template>
	<section class="LloanDetails">
		<div class="detailsPageHead">
			<img src="../images/fauhuibaise.png@2x.png" @click='history'/>
			<span>借条详情1</span>
		</div>
		<div class="LIouDetailsBox">
			<div class="LIouDetailsContent">
				<div class="top">
					<span class="loanNumber" v-show='detailsType == 0 | detailsType == 1 | detailsType == 3 | detailsType == 4'>借款编号87654321</span>
					<span class="loanNumber1" v-show='detailsType == 2'>借款编号87654321</span>
					<span class="waitConfirmLoan" v-show='detailsType == 0'>待确认</span>
					<span class="repayMents" v-show='detailsType == 1'>待还款</span>
					<span class="reimBursement" v-show='detailsType == 2'>已还款</span>
					<span class="loanOverdue" v-show='detailsType == 3'>已逾期</span>
					<span class="reimBursement" v-show='detailsType == 4'>已拒绝</span>
				</div>
				<div class="bottom">
					<div>
						<span class="money" v-show='detailsType == 0 | detailsType == 1' style="color: rgb(255,68,0);">3000 <b>元</b></span>
						<span class="money1" v-show='detailsType == 2 | detailsType == 4' style="color: rgb(136,136,136);">3000 <b>元</b></span>
						<span class="money2" v-show='detailsType == 3' style="color: #ff4400;">3000 <b>元</b></span>
						<span class="loanTime">借款金额</span>
					</div>
					<div>
						<span class="money" v-show='detailsType == 0 | detailsType == 1 | detailsType == 3'>05 <b>月</b></span>
						<span class="money1" v-show='detailsType == 2 | detailsType == 4' style="color: rgb(136,136,136);">05 <b>月</b></span>
						<span class="loanTime">出借日2017年12月</span>
					</div>
					<div>
						<span class="money" v-show='detailsType == 0 | detailsType == 1'>14 <b>日</b></span>
						<span class="money1" v-show='detailsType == 2 | detailsType == 4' style="color: rgb(136,136,136);">14 <b>日</b></span>
						<span class="money2" v-show='detailsType == 3' style="color: #ff4400;">14 <b>日</b></span>
						<span class="loanTime">还款日2017年12月</span>
					</div>
				</div>
			</div>
			<div class="LIouInfo">
				<div>
					<span class="loanPeople" v-show='detailsType == 0 | detailsType == 1 | detailsType == 3 | detailsType == 4'>借款人</span>
					<span class="loanPeople1" v-show='detailsType == 2'>借款人</span>
					<span class="loanPeopleName">李琳</span>
				</div>
				<div>
					<span class="loanPurpose" v-show='detailsType == 0 | detailsType == 1 | detailsType == 3 | detailsType == 4'>借款用途</span>
					<span class="loanPurpose1" v-show='detailsType == 2'>借款用途</span>
					<span class="loanPeopleName">个体经营</span>
				</div>
				
			</div>
			<div class="LPrompt">
				<div v-show='detailsType == 4'>
					<span class="loanPrompt">拒绝原因</span>
				</div>
				<div v-show='detailsType == 4'>
					<span>1.本平台仅为借款信息平台，交易涉及风险由借贷双方承担。</span>
				</div>
			</div>
			<div class="LPrompt">
				<div>
					<span class="loanPrompt" v-show='detailsType == 0 | detailsType == 1 | detailsType == 3 | detailsType == 4'>重要提示</span>
					<span class="loanPrompt1" v-show='detailsType == 2'>重要提示</span>
				</div>
				<div>
					<span>1.本平台仅为借款信息平台，交易涉及风险由借贷双方承担。</span>
					<span>2.本平台提供的信用报告，是放款的重要依据之一，可做参考。</span>
					<span>3.除平台提供的信用报告，出借人务必按照自己的风控规则严格审核，方可出借，以防受骗。</span>
				</div>
			</div>
			<mt-button class='btn0' v-show='detailsType == 1' type="primary">确认收款</mt-button>
			<mt-button @click='gainAdd' class='btn1' v-show='detailsType == 3' type="primary">获取通讯录</mt-button>
			<mt-button class='btn' v-show='detailsType == 3' type="primary">确认收款</mt-button>
			<mt-button class='btn2' v-show='detailsType == 4' type="primary">重新发起</mt-button>
		</div>
	</section>
  
</template>
<script>
	import { MessageBox, Toast } from 'mint-ui'
export default {
  data () {
    return {
    	detailsType: 1 // 借条详情状态0待确认/1代还款/2已还款/3已逾期/4已拒绝
    }
  },
  methods: {
    history() { // 后退
    	this.$router.push({path: '/Liou'})
	},
	gainAdd() { // 获取通讯录
		MessageBox.confirm('', {
			title: '获取通讯录',
			cancelButtonText: '否',
			confirmButtonText: '是',
			message: '需要花费15点券(原价30点券)才能查看对方通讯录，是否查看'
		}).then(action => {
			Toast({
				message: '获取成功',
				position: 'bottom',
				duration: 2000
			});
		});
	}
  },
  computed: {
  	
  },
  mounted() {
  	
  }
}
</script>

<style lang="scss" rel="stylesheet/scss">
.LloanDetails {
	flex:1;
	z-index: 12;
	position: absolute;
	top: 0;
	width: 100%;
	height: 100%;
	background: #eeeff6;
	
	.detailsPageHead {
		position: fixed;
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
	.LIouDetailsBox {
		margin-top: 1rem;
	}
	
	.LIouDetailsContent {
		width: 96%;
		margin-left: 2%;
		border-radius: 0.05rem;
		margin-top: 0.2rem;
		background: white;
		
		.top {
			width: 94%;
			margin-left: 3%;
			border-bottom: 0.01rem solid rgb(229,229,229);
			height: (44rem/64.687);
			
			span {
				display: inline-block;
				width: 47.2%;
				height: (44rem/64.687);
				line-height: (44rem/64.687);
				font-size: (15rem/64.687);
			}
			/*待确认/代还款编号*/
			.loanNumber {
				margin-left: (10rem/64.687);
			}
			.loanNumber1 {
				margin-left: (10rem/64.687);
				color: rgb(136,136,136);
			}
			/*待确认*/
			.waitConfirmLoan {
				text-align: right;
				color: rgb(99,190,113);
			}
			/*代还款*/
			.repayMents {
				text-align: right;
				color: #1b9dff;
			}
			/*已还款*/
			.reimBursement {
				text-align: right;
				color: rgb(136,136,136);
			}
			/*已逾期*/
			.loanOverdue {
				text-align: right;
				color: #ff4400;
			}
		}
		.bottom {
			width: 94%;
			margin-left:3% ;
			height: (109rem/64.687);
			background: white;
			
			div {
				display: inline-block;
				text-align: center;
				height:(109rem/64.687);
				width: 32%;
				
				span {
					display: inline-block;
					width: 100%;
				}
				.money {
					margin-top: (27rem/64.687);
					font-size: (24rem/64.687);
					
					b {
						font-size: (12rem/64.687);
						color: rgb(136,136,136);
					}
				}
				.money1 {
					margin-top: (27rem/64.687);
					font-size: (24rem/64.687);
					
					b {
						font-size: (12rem/64.687);
						color: rgb(136,136,136);
					}
				}
				.money2 {
					margin-top: (27rem/64.687);
					font-size: (24rem/64.687);
					
					b {
						font-size: (12rem/64.687);
						color: rgb(136,136,136);
					}
				}
				.loanTime {
					font-size:(12rem/64.687);
					color: rgb(136,136,136);
					margin-top: (10rem/64.687);
				}
			}
			div:nth-child(1) {
				span {
					text-align: left;
					margin-left: (10rem/64.687);
				}
			}
			div:nth-child(3) {
				span {
					text-align: right;
				}
			}
		}
	}
	.LIouInfo {
		width: 96%;
		margin-left: 2%;
		border-radius: 0.05rem;
		margin-top: 0.2rem;
		background: white;
		
		div {
			width: 94%;
			margin-left: 3%;
			height: (44rem/64.687);
			line-height: (44rem/64.687);
			
			span {
				display: inline-block;
				width: 47.2%;
				font-size: (15rem/64.687);
			}
			.loanPeople {
				margin-left: (10rem/64.687);
				letter-spacing: 0.13rem;
			}
			.loanPeople1 {
				color: rgb(136,136,136);
				margin-left: (10rem/64.687);
				letter-spacing: 0.13rem;
			}
			.loanPeopleName {
				text-align: right;
				color: rgb(136,136,136);
			}
			.loanPurpose {
				margin-left: (10rem/64.687);
			}
			.loanPurpose1 {
				color: rgb(136,136,136);
				margin-left: (10rem/64.687);
			}
		}
		div:nth-child(1) {
			border-bottom: 0.01rem solid rgb(229,229,229);
		}
	}
	.LPrompt {
		width: 96%;
		margin-left: 2%;
		border-radius: 0.05rem;
		margin-top: 0.2rem;
		background: white;
		
		div:nth-child(1) {
			width: 94%;
			margin-left: 3%;
			height: (44rem/64.687);
			line-height: (44rem/64.687);
			border-bottom: 0.01rem solid rgb(229,229,229);
			.loanPrompt {
				margin-left: (10rem/64.687);
				font-size: (15rem/64.687);
			}
			.loanPrompt1 {
				margin-left: (10rem/64.687);
				color: rgb(136,136,136);
			}
		}
		div:nth-child(2) {
			width: 94%;
			margin-top: 0.3rem;
			margin-left: 3%;
			
			span {
				display: inline-block;
				margin-left: (10rem/64.687);
				font-size: (13rem/64.687);
				color: rgb(136,136,136);
				line-height: 0.35rem;
			}
			span:nth-last-child(1) {
				margin-bottom: 0.5rem;
			}
		}
	}
	.btn0 {
		width: 96%;
		margin-left: 2%;
		height: (44rem/64.687);
		line-height: (44rem/64.687);
		margin-top: (95rem/64.687);
		margin-bottom: (20rem/64.687);
		background: #1b9dff;
		font-size: (16rem/64.687);
		color: #FFFFFF;
		/*position: fixed;
		bottom: (20rem/64.687);*/
	}
	.btn {
		width: 96%;
		margin-left: 2%;
		height: (44rem/64.687);
		line-height: (44rem/64.687);
		/*position: absolute;*/
		margin-top: (10rem/64.687);
		margin-bottom: (20rem/64.687);
		background: #1b9dff;
		font-size: (16rem/64.687);
		color: #FFFFFF;
	}
	.btn1 {
		width: 96%;
		margin-left: 2%;
		height: (44rem/64.687);
		line-height: (44rem/64.687);
		/*position: absolute;*/
		margin-top: (42rem/64.687);
		background: #FFFFFF;
		font-size: (16rem/64.687);
		color: rgb(136,136,136);
	}
	.btn2 {
		width: 96%;
		margin-left: 2%;
		height: (44rem/64.687);
		line-height: (44rem/64.687);
		margin-top: (20rem/64.687);
		margin-bottom: (20rem/64.687);
		background: #1b9dff;
		font-size: (16rem/64.687);
		color: #FFFFFF;
	}
}
.mint-msgbox {
	.mint-msgbox-header {
		padding: 0.2rem 0 0 0;
		
		.mint-msgbox-title {
			width: 100%;
			height: 0.5rem;
			line-height: 0.5rem;
			font-size: (18rem/64.687);
		}
	}
	.mint-msgbox-content {
		padding: 0.2rem 0 0.3rem 0;
		
		.mint-msgbox-message {
			width: 68%;
			margin-left: 16%;
			line-height: 0.3rem;
			font-size: (12rem/64.687);
		}
	}
	.mint-msgbox-btns {
		width: 100%;
		height: (49rem/64.687);
		line-height: (49rem/64.687);
		
		
		.mint-msgbox-btn {
			color: black;
			font-size: (16rem/64.687);
		}
	}
}
</style>
