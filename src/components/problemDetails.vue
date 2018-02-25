<template>
	<section class="problemDetails">
		<div class="problemDetailsHead">
			<img src="../images/back_aw.png" @click="history"/>
			<span>常见问题</span>
		</div>
		<div class="problem1">
			<span>{{problemCtitle}}</span>
		</div>
		<div class="problemContent">
			<span>{{content}}</span>
		</div>
		<!--<div class="bottom" @click='myProblem'>
			<span>常见问题</span>
		</div>-->
	</section>
  
</template>
<script>
//	import { getContent } from './../api/api'
//	import { getStore } from '../config/mUtils'
export default {
  data () {
    return {
    	content: null,
    	problemCtitle: null
    }
  },
  methods: {
  	history() { // 后退
		this.$router.push({path: '/problem'})
	},
	myProblem() {
		this.$router.push({path: '/myProblem'})
	},
	init() {
//		var id = parseInt(getStore('problem'))
//		this.problemCtitle = getStore('problemCtitle')
//		let params = {
//			id: id
//		}
//		getContent(params).then(res => {
//			if (res.code === 200) {
//				this.content = res.data
//			}
//		})
	}
  },
  computed: {
  	
  },
  mounted() {
//	this.init()
  }
}
</script>

<style lang="scss" rel="stylesheet/scss">
.problemDetails {
	flex:1;
	z-index: 11;
	background: #f3f5f8;
	
	.problemDetailsHead {
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
	}
	.problem1 {
		width: 100%;
		height: 0.773rem;
		line-height: 0.773rem;
		background: white;
		margin-top: 0.224rem;
		
		span {
			display: inline-block;
			font-size: 0.232rem;
			color: rgb(51,51,51);
			margin-left: 0.24rem;	
			letter-spacing: 0.02rem;
			font-weight: 600;		
		}
	}
	.problemContent {
		width: 100%;
		background: white;
		/*margin-top: 1rem;*/
		margin-top: 0.224rem;
		
		span {
			width: 90%;
			line-height: 0.28rem;
			margin-left: 5%;
			display: inline-block;
			font-size: 0.216rem;
			letter-spacing: 0.02rem;
			padding-top: 0.24rem;
			padding-bottom: 0.3rem;
		}
	}
	/*.bottom {
		width: 100%;
		text-align: center;
		position: absolute;
		bottom: 0;
		
		span {
			display: inline-block;
			width: 100%;
			height: 0.6rem;
			line-height: 0.6rem;
			font-size: 0.216rem;
			color: rgb(238,89,36);
		}
	}*/
}
</style>
