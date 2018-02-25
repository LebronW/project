<template>
	<section class="personal">
		<div class="forgetHead">
			<img src="../images/back_aw.png" @click="history"/>
			<span>个人信息</span>
			<!--<button>保存</button>-->
		</div>
		<div class="personalList">
			<mt-cell title="昵称" to='/nickname'>
			  <span style="color: rgb(51,51,51); font-size:0.231rem;">{{nickname}}</span>
			</mt-cell>
			<mt-cell title="密码设置" to='/modifyPass'>
			  <span style="color: rgb(153,153,153); font-size:0.2rem;">修改</span>
			</mt-cell>
		</div>
		<div class="next">
			<button @click='next'>退出登录</button>
		</div>
	</section>

</template>
<script>
//	import { MessageBox, Toast } from 'mint-ui'
//	import { logout, getUser } from './../api/api'
//	import {mapMutations} from 'vuex'
//	import { removeStore, getStore } from './../config/mUtils'
export default {
  data () {
    return {
    	phone: '', // 手机号
    	nickname: null // 昵称

    }
  },
  methods: {
//	...mapMutations([
//		'OUT_LOGIN'
//	]),
  	history() { // 后退
		this.$router.push({path: '/mine'})
	},
	next() {
//		MessageBox.confirm('', {
//			title: '',
//			message: '确定退出'
//		}).then(action => {
//		  	logout().then(res => {
//				if (res.code === 200) {
//					Toast({
//						message: res.msg,
//						duration: 2000
//					});
//					this.OUT_LOGIN()
//					this.$router.push({path: '/mine'})
//					removeStore('token')
//					removeStore('userId')
//				}
//			})
//		});

//    // 网易云信登出
//    this.$store.dispatch('logout');
	},
	init() {
//		var userId = getStore('userId')
//		let params = {
//			userId: userId
//		}
//		getUser(params).then(res => {
//			console.log(res)
//			if (res.code === 200) {
//				this.nickname = res.data.nickName
//			} else if (res.code === 413) {
//				MessageBox.alert(res.msg).then(action => {
//				  this.$router.push({path: '/login'})
//				});
//			}
//		})
	}
  },
  mounted() {
//	this.init()
  }
}
</script>

<style lang="scss" rel="stylesheet/scss">
.personal {
	flex:1;
	z-index: 11;
	background: #f3f5f8;

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
			font-size: 0.278rem;
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
	.personalList {
		width: 100%;
		margin-top: 0.2rem;

		.mint-cell {
			height: 0.772rem;
			min-height: 0.772rem;

			.mint-cell-wrapper {
				width: 100%;
				/*border-top:0.01rem solid rgba(0,0,0,0.1);*/
				/*border-bottom: 0.01rem solid rgba(0,0,0,0.1);*/
				.mint-cell-value {
					margin-right: 0.2rem;
				}
				.mint-cell-text {
					margin-left: 0.1rem;
				}
			}

		}
		.mint-cell:nth-child(2) {
			margin-top: 0.2rem;
		}
		.mint-cell-text {
			font-size: 0.25rem;
		}
		.mint-cell-allow-right::after {
			width: 0.15rem;
			height: 0.15rem;
			border: 0.02rem solid #c8c8cd;
			border-bottom-width: 0;
			border-left-width: 0;
			right: 0.2rem;
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
.mint-msgbox {

	.mint-msgbox-content {
		height: 1rem;
		min-height: 1rem;
		.mint-msgbox-message {
			height: 1rem;
			line-height: 1rem;
			font-size: 0.25rem;
			color: black;
		}
	}
	.mint-msgbox-btns {
		height: 0.6rem;
		line-height: 0.6rem;

		.mint-msgbox-btn {
			font-size: 0.25rem;
		}
		.mint-msgbox-confirm {
			color: #b74545;
		}
		.mint-msgbox-cancel {
			color: #999999;
		}
	}
}
</style>
