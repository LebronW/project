var config = {
  sdk: 'NIM_Web_SDK_v4.7.3.js',
  // 用户自定义的登录注册地址
  loginUrl: 'http://118.178.247.200:6070/#/login',
  registUrl: 'http://118.178.247.200:6070/#/login',
  homeUrl: '',

  // 资源路径根目录，为了方便用户部署在二级以上URL路径上
  resourceUrl: 'http://yx-web.nos.netease.com/webdoc/h5',
  // 用户logo地址
  logo: 'http://yx-web.nos.netease.com/webdoc/h5/im/logo.png',
  // 默认用户头像
  defaultUserIcon: require('../../images/touxiang@2x.png'),
  // 系统通知图标
  noticeIcon: 'http://yx-web.nos.netease.com/webdoc/h5/im/notice-icon.png',
  // 我的手机图标
  myPhoneIcon: 'http://yx-web.nos.netease.com/webdoc/h5/im/my-phone.png',
  // 本地消息显示数量，会影响性能
  localMsglimit: 36
}

const env = 'online'

var appConfig = {
  // 用户的appkey
  // 用于在web demo中注册账号异步请求demo 服务器中使用
  test: {
    appkey: 'fe416640c8e8a72734219e1847ad2547',
    postUrl: 'https://apptest.netease.im'
  },
  online: {
    appkey: '8ad2f10a2c5acf2f1f692ad1fa68b8f5',
    postUrl: 'https://app.netease.im'
  }
}

config = Object.assign(config, appConfig[env])

export default config
