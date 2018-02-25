<template>
	<section class="invite">
		<div class="box">
			<el-collapse accordion>
				<el-collapse-item title='申请贷款的基本需求是什么？'>
					<div>1.年龄20-60周岁的具有合法收入和还款能力的中国公民，2.具有稳定的工资收入，具有如期偿还贷款的能力，3.无不良信用记录。</div>
				</el-collapse-item>
				<el-collapse-item title='网贷白户可以申请贷款吗？'>
					<div>虽然大部分银行和小贷公司都要求借款人必须有信用记录，但是也会有一些小额信贷公司允许网贷白户个人申请。</div>
				</el-collapse-item>
				<el-collapse-item title='信用白户如何申请贷款？'>
					<div>1.尝试多个匹配机构，不是所有机构都提供白户贷款，寻找合适的机构才更重要，您可以通过平台匹配合适的机构，2.信用卡开道，在贷款之前申请使用信用卡，保持良好的信用记录也是一种有效的解决办法，3.申请抵押贷款，来弥补您的信用空白的缺陷，从而打消贷款机构的顾虑。</div>
				</el-collapse-item>
				<el-collapse-item title='无抵押贷款与抵押贷款的区别？'>
					<div>1.申请门槛不同，申请无抵押贷款需要考虑个人资质，而申请抵押贷款，需要考虑抵押物，2.额度不同，无抵押贷款额度以借款人月收入10倍左右为主，而抵押贷款额度通常以抵押物评估值的70%，3.贷款期限不同，申请无抵押贷款的借款人，只要资质好、手续齐全，最快当天可获贷；而抵押贷款由于需要走评估、抵押登记等程序，所以放款时间比较长，一般在十个工作日左右。</div>
				</el-collapse-item>
				<el-collapse-item title='影响贷款利息的因素有哪些？'>
					<div>1.贷款机构，银行对申请人的要求高，贷款公司要求稍低。正因为此，贷款公司的贷款利息通常高于银行，2.申请人职业性质，很多贷款机构针对公务员、事业单位工作人员等职位推出的无抵押贷款产品，利息要低于普通工薪族很多。</div>
				</el-collapse-item>
				<el-collapse-item title='分期还款和到期还款有什么区别？'>
					<div>1。按月分析还款是指采用等额本息还款方式或等额本金还款方式，按月偿还贷款本金和利息，2。到期全额还款是指采用每月付息，到期全额还本的计算方式。</div>
				</el-collapse-item>
				<el-collapse-item title='网贷会收取前期费用吗？'>
					<div>正规的放款平台贷款前不会收取任何前期费用，收取费用的都是骗子，他们利用了你急需用钱的心理，通过收取资料费、前期利息费、开卡费等等不断的向你下套，碰到这类骗子一定要提高警惕，切勿再上当受骗。</div>
				</el-collapse-item>
				<el-collapse-item title='我该填写什么样的联系人？小贷会联系他们吗？'>
					<div>部分网贷会让你填写两到三个联系人，一般都会要求至少有一个是直系亲属，我们看到的绝大多数的案例中，网贷机构在审批时，都不会给这些联系人打电话，但是呢，身正不怕影子斜，你没有歪念的话，我们建议你如实填写。</div>
				</el-collapse-item>
				<el-collapse-item title='如何加快审核速度？'>
					<div>1.保证填写信息的真实性，2.信息的完整性，一般信息填写越完整，审核速度越快。</div>
				</el-collapse-item>
				<el-collapse-item title='如何保证个人贷款的通过率？'>
					<div>申请个人贷款要注重自身的征信报告、还清未还贷款、如实填资质证明、工作证明、居住情况等则可以增加个人贷款通过率。</div>
				</el-collapse-item>
				<el-collapse-item title='电话审核一般核实哪些问题？'>
					<div> 1.核对姓名；2.核对身份证号码；3.借款用途；4.提交申请填写过的信息；5.资产信息；6.工作信息；7.个人征信情况等。</div>
				</el-collapse-item>
				<el-collapse-item title='贷款是怎么授信的？'>
					<div>是根据您的信用报告进行评估给出的额度，有额度填写资料申请借款，具体放款情况以最终审核结果为准。</div>
				</el-collapse-item>
				<el-collapse-item title='不还款的影响有哪些'>
					<div>不还款将会被记录个人征信，将会影响到您日后的购房贷款、购车贷款、甚至一切需要信用评分的服务申请。</div>
				</el-collapse-item>
				<el-collapse-item title='为什么提交真实的资料，还是被拒了？'>
					<div>每个贷款机构的审批要求和正常都是不一样，所以一家贷款没有通过也不要气馁，建议您多申请几家不同机构的贷款，有可能会提供审批通过率。</div>
				</el-collapse-item>
				<el-collapse-item title='没有按时还款怎么办？'>
					<div>如果没有按时还款，将会收取逾期违约金和罚息，逾期时间越长罚息越高。如已经逾期，建议您尽快还款，以减少不必要的损失。</div>
				</el-collapse-item>
			</el-collapse>
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
  	
  },
  computed: {
  	
  }
}
</script>

<style lang="scss" rel="stylesheet/scss">
.invite {
	width: 101.5%;
	height: 100%;
	position: fixed;
	z-index: 15;
	top: 0;
	left: 0;
	background-color: #fff;
	overflow-y: scroll;
	
	.box {
		width: 100%;
		height: 100%;
		
		.el-collapse {
		
			.el-collapse-item__header {
				color: black;
				font-size: 0.22rem;
				height: 0.6rem;
				line-height: 0.6rem;
				border-bottom:0.02rem solid #dfe6ec;
			}
			.el-collapse-item__content {
				background: white;
				color: black;
				font-size: 0.22rem;
			}
			.el-collapse-item.is-active>.el-collapse-item__header .el-collapse-item__header__arrow {
				transform: rotate(-90deg);
			}
			.el-collapse-item:last-child {
				padding-bottom: 1rem;
			}
		}
	}
	
	
}

</style>
