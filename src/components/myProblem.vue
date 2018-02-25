<template>
	<section class="myProblem">
		<div class="forgetHead">
			<img src="../images/fauhuibaise.png@2x.png" @click="history"/>
			<span>意见反馈</span>
		</div>
		<div class="content">
			<textarea v-model='probiem' class="text" cols="30" rows="10" maxlength="300" placeholder="请输入进的反馈意见，我们会为您不断进步。"></textarea>
			<button>确定</button>
		</div>
	</section>
  
</template>
<script>
export default {
  data () {
    return {
    	probiem: ''
    }
  },
  methods: {
  	history() { // 后退
		this.$router.push({path: '/problem'})
	}
  },
  computed: {
  	
  },
  components: {
		
	}
}
</script>

<style lang="scss" rel="stylesheet/scss">
.myProblem {
	flex:1;
	z-index: 11;
	background: #f3f5f8;
	
	.forgetHead {
		width: 100%;
		background: -webkit-linear-gradient(left, rgb(238,89,36) , rgb(245,140,53));
	    background: -o-linear-gradient(right, rgb(238,89,36) , rgb(245,140,53)); 
	    background: -moz-linear-gradient(right, rgb(238,89,36) , rgb(245,140,53)); 
	    background: linear-gradient(to right, rgb(238,89,36) , rgb(245,140,53)); 
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
			color: white;
			display: inline-block;
			width: 90%;
			text-align: center;
		}
	}
	.content {
		width: 100%;
		margin-top: 0.24rem;
		
		.text{
			font-size: 0.216rem;
			width: 93.5%;
			border: 0;
			outline: none;
			resize: none;
			padding: 0.2rem;
			letter-spacing: 0.02rem;
			line-height: 0.28rem;
		}
		.mint-cell {
			min-height: 0.75rem;
				
		}
		.mint-cell-wrapper {
			background-image: none;
			
			.mint-cell-title {
				width: 1.6rem;
			}
			
			font-size: 0.25rem;
		}
		::-webkit-input-placeholder { /* WebKit browsers */
		    color:rgb(153,153,153);
		}
		:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
		    color:rgb(153,153,153);
		}
		::-moz-placeholder { /* Mozilla Firefox 19+ */
		   color:rgb(153,153,153);
		}
		:-ms-input-placeholder { /* Internet Explorer 10+ */
		    color:rgb(153,153,153);
		}
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
