import Vue from 'vue'
import Router from 'vue-router'
const index = r => require.ensure([], () => r(require('../components/index')), 'index') // 导流主页
const LIouDetails = r => require.ensure([], () => r(require('../components/LIouDetails')), 'LIouDetails') // 详情页面
const attestation = r => require.ensure([], () => r(require('../components/attestation')), 'attestation') // 贷款主页
const card = r => require.ensure([], () => r(require('../components/card')), 'card') // 借款人
const mine = r => require.ensure([], () => r(require('../components/mine')), 'mine') // 我的
const login = r => require.ensure([], () => r(require('../components/login')), 'login') // 登录
const forgetPass = r => require.ensure([], () => r(require('../components/forgetPass')), 'forgetPass') // 忘记密码
const LchoiceId = r => require.ensure([], () => r(require('../components/LchoiceId')), 'LchoiceId') // 注册
const invite = r => require.ensure([], () => r(require('../components/invite')), 'invite') // 单页面注册
const registerPass = r => require.ensure([], () => r(require('../components/registerPass')), 'registerPass') // 注册
const resetPass = r => require.ensure([], () => r(require('../components/resetPass')), 'resetPass') // 重置密码
const personal = r => require.ensure([], () => r(require('../components/personal')), 'personal') // 个人信息
const Lsetup = r => require.ensure([], () => r(require('../components/Lsetup')), 'Lsetup') // 修改昵称
const modifyPass = r => require.ensure([], () => r(require('../components/modifyPass')), 'modifyPass') // 修改密码
const problem = r => require.ensure([], () => r(require('../components/problem')), 'problem') // 常见问题
const problemDetails = r => require.ensure([], () => r(require('../components/problemDetails')), 'problemDetails') // 问题详情
// const myProblem = r => require.ensure([], () => r(require('../components/myProblem')), 'myProblem') // 意见反馈
const CpublishLend = r => require.ensure([], () => r(require('../components/CpublishLend'), 'CpublishLend'))  // 发布出借信息
const CpublishLoan = r => require.ensure([], () => r(require('../components/CpublishLoan'), 'CpublishLoan'))  // 发布借款信息
const Liou = r => require.ensure([], () => r(require('../components/Liou'), 'Liou'))  // 打借条
const LSetupHeadPortrait = r => require.ensure([], () => r(require('../components/LSetupHeadPortrait'), 'LSetupHeadPortrait'))  // 设置头像
// const LIdentity = r => require.ensure([], () => r(require('../components/LIdentity'), 'LIdentity'))  // 身份认证
const LRecharge = r => require.ensure([], () => r(require('../components/LRecharge'), 'LRecharge'))  // 充值点券
const LPayment = r => require.ensure([], () => r(require('../components/LPayment'), 'LPayment'))  // 支付成功失败页面
const CloanerInfo = r => require.ensure([], () => r(require('../components/CloanerInfo'), 'CloanerInfo'))  // 借款人信息
const ClenderInfo = r => require.ensure([], () => r(require('../components/ClenderInfo'), 'ClenderInfo'))  // 出借人信息
const CcreditReport = r => require.ensure([], () => r(require('../components/CcreditReport'), 'CcreditReport'))  // 信用报告
const Cverified = r => require.ensure([], () => r(require('../components/Cverified'), 'Cverified'))  // 实名认证
const CpublishLiou = r => require.ensure([], () => r(require('../components/CpublishLiou'), 'CpublishLiou'))  // 发起借条
const CmailList = r => require.ensure([], () => r(require('../components/CmailList'), 'CmailList'))  // 通讯录
const CcreditAuth = r => require.ensure([], () => r(require('../components/CcreditAuth'), 'CcreditAuth'))  // 信用认证
const CauthReport = r => require.ensure([], () => r(require('../components/CauthReport'), 'CauthReport'))  // 认证报告
const Cchat = r => require.ensure([], () => r(require('../components/Cchats/Cchat'), 'Cchat'))  // 聊天信息
const Session = r => require.ensure([], () => r(require('../components/Cchats/Session'), 'Session'))  // 聊天Session, 测试聊天用
const CeditPersonInfo = r => require.ensure([], () => r(require('../components/CeditPersonInfo'), 'CeditPersonInfo'))  // 借款人个人信息填写
const CpayAuthStatus = r => require.ensure([], () => r(require('../components/CpayAuthStatus'), 'CpayAuthStatus'))  // 信用认证支付状态
const Cpaycoup = r => require.ensure([], () => r(require('../components/Cpaycoup'), 'Cpaycoup'))  // 充值点券
const CeditDemand = r => require.ensure([], () => r(require('../components/CeditDemand'), 'CeditDemand'))  // 编辑需求
// const CardPic = r => require.ensure([], () => r(require('../components/CardPic'), 'CardPic'))  // 身份证照片
// const test = r => require.ensure([], () => r(require('../components/test'), 'test'))  // 充值点券

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: index
    },
    // 首页路由
    {
    	path: '/index',
    	name: 'index',
    	component: index
    },
    // 详情页面
    {
    	path: '/LIouDetails',
    	name: 'LIouDetails',
    	component: LIouDetails
    },
    // 贷款页面
    {
    	path: '/attestation',
    	name: 'attestation',
    	component: attestation
    },
    // 借款人
    {
    	path: '/card',
    	name: 'card',
    	component: card
    },
    // 我的
    {
    	path: '/mine',
    	name: 'mine',
    	component: mine,
    	children: [
    	{ // 打借条
    		path: '/Liou',
    		name: 'Liou',
    		component: Liou
    	}
    	// // 身份认证
    	// {
    	// 	path: '/LIdentity',
    	// 	name: 'LIdentity',
    	// 	component: LIdentity
    	// }
    	// 借款人我的借条
//  	{
//  		path: '/LloanDetails',
//  		name: 'LloanDetails',
//  		component: LloanDetails
//  	}
    	]
    },
    // 登录页面
    {
    	path: '/login',
    	name: 'login',
    	component: login
    },
    // 忘记密码
    {
    	path: '/forgetPass',
    	name: 'forgetPass',
    	component: forgetPass
    },
    // 重置密码
    {
    	path: '/resetPass',
    	name: 'resetPass',
    	component: resetPass
    },
    // 选择身份
    {
    	path: '/LchoiceId',
    	name: 'LchoiceId',
    	component: LchoiceId
    },
    // 注册密码界面
    {
    	path: '/registerPass',
    	name: 'registerPass',
    	component: registerPass
    },
    // 个人信息
    {
    	path: '/personal',
    	name: 'personal',
    	component: personal
    },
    // 个人设置
    {
    	path: '/Lsetup',
    	name: 'Lsetup',
    	component: Lsetup,
    	children: [
    	// 设置头像
    	{
    		path: '/LSetupHeadPortrait',
    		name: 'LSetupHeadPortrait',
    		component: LSetupHeadPortrait
    	}
    	]
    },
    // 修改密码
    {
    	path: '/modifyPass',
    	name: 'modifyPass',
    	component: modifyPass
    },
    // 常见问题
    {
    	path: '/problem',
    	name: 'problem',
    	component: problem
    },
    // 问题详情
    {
    	path: '/problemDetails',
    	name: 'problemDetails',
    	component: problemDetails
    },
    // 单页面注册
    {
    	path: '/invite',
    	name: 'invite',
    	component: invite
    },
    // 意见反馈
//  {
//  	path: '/myProblem',
//  	name: 'myProblem',
//  	component: myProblem
//  }
    // 发布出借信息
    {
     path: '/CpublishLend',
      name: 'CpublishLend',
      component: CpublishLend
    },
    // 发布借款信息
    {
     path: '/CpublishLoan',
      name: 'CpublishLoan',
      component: CpublishLoan
    },
    // 充值点券
    {
    	path: '/LRecharge',
    	name: 'LRecharge',
    	component: LRecharge
    },
    // 支付成功失败页面
    {
      path: '/LPayment',
      name: 'LPayment',
      component: LPayment
    },
    // 借款人信息
    {
      path: '/CloanerInfo',
      name: 'CloanerInfo',
      component: CloanerInfo
    },
    // 借款人个人信息填写
    {
      path: '/CeditPersonInfo',
      name: 'CeditPersonInfo',
      component: CeditPersonInfo
    },
    // // 身份证照片
    // {
    //   path: '/CardPic',
    //   name: 'CardPic',
    //   component: CardPic
    // },
    // 出借人信息
    {
      path: '/ClenderInfo',
      name: 'ClenderInfo',
      component: ClenderInfo
    },
    // 信用报告
    {
      path: '/CcreditReport',
      name: 'CcreditReport',
      component: CcreditReport
    },
    // 信用认证
    {
      path: '/CcreditAuth',
      name: 'CcreditAuth',
      component: CcreditAuth
    },
    // 信用认证支付状态
    {
      path: '/CpayAuthStatus',
      name: 'CpayAuthStatus',
      component: CpayAuthStatus
    },
    // 认证报告
    {
      path: '/CauthReport',
      name: 'CauthReport',
      component: CauthReport
    },
    // 实名认证
    {
      path: '/Cverified',
      name: 'Cverified',
      component: Cverified
    },
    // 发起借条
    {
      path: '/CpublishLiou',
      name: 'CpublishLiou',
      component: CpublishLiou
    },
    // 通讯录
    {
      path: '/CmailList',
      name: 'CmailList',
      component: CmailList
    },
    // 聊天信息
    {
      path: '/Cchat/:sessionId',
      name: 'Cchat',
      component: Cchat
    },
    // 测试聊天用
    {
      path: '/Session',
      name: 'Session',
      component: Session
    },
    // 充值点券
    {
      path: '/Cpaycoup',
      name: 'Cpaycoup',
      component: Cpaycoup
    },
    // 编辑需求
    {
      path: '/CeditDemand',
      name: 'CeditDemand',
      component: CeditDemand
    }
    // test
//  {
//    path: '/test',
//    name: 'test',
//    component: test
//  }
  ],
  'linkActiveClass': 'active'
})
