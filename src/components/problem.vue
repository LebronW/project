<template>
	<section class="problem">
		<div class="forgetHead">
			<img src="../images/fauhuibaise.png@2x.png" @click='history'/>
			<span>关于我们</span>
		</div>
		<div class="content">
			<img src="../images/img_gywm@2x.png"/>
			<div>
				<h2>新版APP</h2>
				<span>浙江奕霖科技浙江奕霖科技浙江奕霖科技浙江奕霖科技浙江奕霖科技浙江奕霖科技浙江奕霖科技浙江奕霖科技浙江奕霖科技浙江奕霖科技浙江奕霖科技浙江奕霖科技。</span>
				<span>圣诞快乐就分凉快圣诞节弗兰克设计费克里斯多夫看啥课裸嫁时代开了房叫唠嗑撒地方雷克萨。</span>
				<span>圣诞快乐就分凉快圣诞节弗兰克设计费克里斯多夫看啥课裸嫁时代开了房叫唠嗑撒地方雷克萨。</span>
				<span>看手机福克斯就是看得见开始打几快乐圣诞节看浪费时间快乐圣诞节凉快圣诞节分凉快圣诞节菲利克斯就废凉快圣诞节费率看似简单费率看似简单费率。</span>
			</div>
		</div>
	</section>
  
</template>
<script>
export default {
  data () {
    return {
    	
    }
  },
  methods: {
  	history() { // 后退
		this.$router.push({path: '/mine'})
	}
  },
  computed: {
  	
  },
  mounted() {
  	
  }
  
}
</script>

<style lang="scss" rel="stylesheet/scss">
.problem {
	flex:1;
	z-index: 11;
	position: fixed;
	width: 100%;
	height: 100%;
	background: #eeeff6;
	
	.forgetHead {
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
	.content {
		width: 96%;
		margin-left: 2%;
		margin-top: (20rem/64.687);
		
		img {
			width: 100%;
			height: (151rem/64.687);
			border-radius: 0.05rem 0.05rem 0 0;
		}
		
		div {
			width: 100%;
			background: white;
			border-radius: 0 0 0.05rem 0.1rem;
			
			h2 {
				display: inline-block;
				margin-top: 0.1rem;
				width: 100%;
				font-size: (16rem/64.687);
				height: (36rem/64.687);
				line-height: (36rem/64.687);
				text-align: center;
				font-weight: 600;
			}
			
			span {
				width: 90%;
				margin-left: 5%;
				display: inline-block;
				font-size: (12rem/64.687);
				color: rgb(136,136,136);
				line-height: 0.4rem;
				margin-bottom: 0.2rem;
			}
			span:nth-last-child(1) {
				margin-bottom: 0.5rem;
			}
		}
	}
}
</style>
