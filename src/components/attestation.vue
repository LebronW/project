<template>
	<section class="attestation">
		<div class="attestation-head">
			<span class="Supermarket">消息记录</span>
		</div>
		<div class="content">
			<mt-loadmore :bottomPullText='bottomPullText' :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
				<ul>
					<li class="d">
						<img src="../images/Icon.png"/>
						<div class="two">
							<span>名字</span>
							<span>个人</span>
							<span>|</span>
							<span>借款3000元</span>
						</div>
						<span class="LdTime">11:12</span>
						<div class="LdText">
							<span>请问你是在寻找借款吗</span>
						</div>
						<span class="LdNews">2</span>
					</li>
				</ul>
			</mt-loadmore>
	</div>
	</section>
  
</template>
<script>
//	import { getFlowPlatformInfo } from './../api/api'
//	import { setStore } from '../config/mUtils'
export default {
  data () {
    return {
    	msg: [],
		moneyList: ['不限', '2000以下', '2000-5000', '5000以上'],
		timeList: ['不限', '7天', '15天', '1个月', '1-6个月', '6-12个月', '12个月以上'],
		allLoaded: true,
		maneyBox: false, // 金额筛选
		timeBox: false, // 期限筛选
		searchCondition: { // 查询全部参数
			flag: 'all',
			current: 0 // 分页
		},
		bottomPullText: '上拉加载'
    }
  },
  methods: {
    loadTop() {
	  // 加载更多数据
//	  this.init()
//	  this.$refs.loadmore.onTopLoaded();
	}
//	loadBottom() {
	  // 加载更多数据
//	  this.more()
//	}
//	more() {
//		this.searchCondition.current = parseInt(this.searchCondition.current) + 1;
//		let params = this.searchCondition
//		getFlowPlatformInfo(params).then(res => {
//			if (res.code === 200) {
//				for (var i = 0; i < res.data.length; i++) {
//					res.data[i].ptag = res.data[i].ptag.split('|')
//					this.msg.push(res.data[i])
//				}
//				if (res.data.length < 14) {
//					this.allLoaded = true
//					this.bottomPullText = '数据已加载完毕'
//				} else {
//					this.allLoaded = false
//				}
//				this.$refs.loadmore.onBottomLoaded();
//			}
//		})
//	},
//	moneyClick(index) { // 金钱筛选
//		var sp = document.getElementsByClassName('moneySpan')
//		for (var i = 0; i < sp.length; i++) {
//			sp[i].style.cssText = 'color:#999999;border: 0.01rem solid #9e9e9e;'
//		}
//		sp[index].style.cssText = 'color:red;border: 0.01rem solid red;'
//		this.isactive1 = false
//		this.maneyBox = false
//		this.leftImg = true
//		let params = {
//			flag: 'search',
//			current: 0,
//			limit: index,
//			deadLine: '0'
//		}
//		getFlowPlatformInfo(params).then(res => {
//			if (res.code === 200) {
//				for (var i = 0; i < res.data.length; i++) {
//					res.data[i].ptag = res.data[i].ptag.split('|')
//				}
//				this.msg = res.data
//			}
//		})
//	},
//	timeClick(index) { // 时间筛选
//		var sp = document.getElementsByClassName('timeSpan')
//		for (var i = 0; i < sp.length; i++) {
//			sp[i].style.cssText = 'color:#999999;border: 0.01rem solid #9e9e9e;'
//		}
//		sp[index].style.cssText = 'color:red;border: 0.01rem solid red;'
//		this.isactive2 = false
//		this.timeBox = false
//		this.rightImg = true
//		let params = {
//			flag: 'search',
//			current: 0,
//			deadLine: index,
//			limit: '0'
//		}
//		getFlowPlatformInfo(params).then(res => {
//			if (res.code === 200) {
//				for (var i = 0; i < res.data.length; i++) {
//					res.data[i].ptag = res.data[i].ptag.split('|')
//				}
//				this.msg = res.data
//			}
//		})
//	},
//	init() { // 获取数据
//		let params = {
//			flag: 'all',
//			current: 0
//		}
//		getFlowPlatformInfo(params).then(res => {
//			if (res.code === 200) {
//				
//				if (res.data.length < 14) {
//					this.allLoaded = true
//				} else {
//					this.allLoaded = false
//				}
//				for (var i = 0; i < res.data.length; i++) {
//					res.data[i].ptag = res.data[i].ptag.split('|')
//				}
//				this.msg = res.data
//			}
//		})
//	},
//	into(index) {
//		setStore('id', this.msg[index].id)
//		setStore('pcode', this.msg[index].pcode)
//		this.$router.push({path: '/detailsPage', query: {distail: 1}})
//  }
  },
  mounted() {
//	this.init()
  }
}
</script>

<style lang="scss" rel="stylesheet/scss">
.attestation {
	flex:1;
	background: #f3f5f8;
	.attestation-head {
		width: 100%;
		/*height: 1.5rem;*/
		position: fixed;
		z-index: 10;
		background: white;
		
		.Supermarket {
			display: inline-block;
			width: 100%;
			text-align: center;
			font-size: 0.278rem;
			height: 0.8rem;
			line-height: 0.8rem;
			color: white;
			background: #e01625;
		}
		
	}
	
	.content {
		margin-top: 1rem;
		width: 100%;
		/*height: 76%;*/
		position: absolute;
		margin-bottom: 2rem;
		
		.mint-loadmore {
			width: 100%;
			/*height:100%;*/
		}
		.mint-loadmore-content {
			width: 100%;
			/*height: 100%;*/
			.mint-loadmore-top {
				margin-top: -0.8rem;
			}
		}
		.mint-loadmore-bottom {
			margin-bottom: 0;
		}
		ul {
			width: 100%;
			/*height: 100%;*/
			
			li:nth-last-child(1) {
				/*margin-bottom: 1rem;*/
			}
		}
		.d {
			width: 96%;
			margin-left: 2%;
			margin-top: 0.1rem;
			height: 1.2rem;
			background: white;
			position: relative;
			
			span {
				font-size: 0.216rem;
				color: #666666;
			}
			
			.two {
				font-size: 0.185rem;
				position: absolute;
				top: 0.3rem;
				left: 1rem;
				
				span:nth-child(1) {
					font-size: 0.25rem;
					color: #000000;
				}
				span:nth-child(2) {
					margin-left: 0.1rem;
					color: rgb(136,136,136);
				}
				span:nth-child(3) {
					color: rgb(136,136,136);
				}
				span:nth-child(4) {
					color: rgb(136,136,136);
				}
			}
			.LdTime {
				font-size: 0.247rem;
				position: absolute;
				top: 0.3rem;
				right: 0.2rem;
				color: rgb(136,136,136);
			}
			/*span:nth-child(4) {
				position: absolute;
				top: 0.7rem;
				left: 0.8rem;
				color: rgb(102,102,102);
				
			}*/
			.LdText {
				position: absolute;
				top: 0.6rem;
				font-size: 0.216rem;
				left: 0.95rem;
				
				span {
					display: inline-block;
					color:rgb(102,102,102);
					padding: 0.05rem;
					margin-left: 0.03rem;
					border-radius:0.05rem ;
				}                                                
			}
			.LdNews {
				position: absolute;
				top: 0.15rem;
				left: 0.7rem;
				width: 0.25rem;
				height: 0.25rem;
				background: red;
				border-radius: 0.2rem;
				text-align: center;
				line-height: 0.25rem;
				color: white;
				font-size: 0.15rem;
			}
			img:nth-child(1) {
				width: 0.68rem;
				height: 0.68rem;
				position: absolute;
				border-radius: 0.1rem;
				top: 0.25rem;
				left: 0.2rem;
			}
		}
	}
}

</style>
