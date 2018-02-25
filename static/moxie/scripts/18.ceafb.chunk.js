webpackJsonp([18,62],{14:function(e,t,a){try{(function(){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function o(e,t){var a={};for(var n in e)t.indexOf(n)>=0||Object.prototype.hasOwnProperty.call(e,n)&&(a[n]=e[n]);return a}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var s=function(){function e(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,a,n){return a&&e(t.prototype,a),n&&e(t,n),t}}(),l=function(e,t,a){for(var n=!0;n;){var o=e,r=t,i=a;n=!1,null===o&&(o=Function.prototype);var s=Object.getOwnPropertyDescriptor(o,r);if(void 0!==s){if("value"in s)return s.value;var l=s.get;if(void 0===l)return;return l.call(i)}var u=Object.getPrototypeOf(o);if(null===u)return;e=u,t=r,a=i,n=!0,s=u=void 0}},u=a(2),c=n(u),d=a(16),f=a(10),p=(n(f),a(1)),m=function(e){function t(e,a){r(this,t),l(Object.getPrototypeOf(t.prototype),"constructor",this).call(this,e,a),this.state={}}return i(t,e),s(t,[{key:"componentDidMount",value:function(){}},{key:"render",value:function(){var e=this.props,t=e.showTips,a=e.showOrHideSpinner,n=e.size,r=e.color,i=e.boxSize,s=(o(e,["showTips","showOrHideSpinner","size","color","boxSize"]),{display:a,width:"100%",maxWidth:p.qsParams.maxWidth?p.qsParams.maxWidth:"800px",height:p.qsParams.height?p.qsParams.height+"px":"100%",position:"fixed",right:0,bottom:0,margin:"0 auto",left:0,top:0,zIndex:996,background:"rgba(0,0,0,.4)"});return c.default.createElement("div",{style:s},c.default.createElement("div",{className:"SpinerBox",style:{overflow:"hidden",background:"rgba(22,22,22,0.8)",position:"absolute",top:"40%",left:"50%",width:""+i,height:""+i,borderRadius:"10px"}},c.default.createElement("div",{className:"newSpiner",style:{top:t?i/6+"px":(i-n)/2+"px"}},c.default.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 32 32",width:n,height:n,fill:r},c.default.createElement("path",{opacity:".25",d:"M16 0 A16 16 0 0 0 16 32 A16 16 0 0 0 16 0 M16 4 A12 12 0 0 1 16 28 A12 12 0 0 1 16 4"}),c.default.createElement("path",{d:"M16 0 A16 16 0 0 1 32 16 L28 16 A12 12 0 0 0 16 4z"}))),c.default.createElement("div",{style:{color:"#fff",textAlign:"center",width:"100%",fontSize:"13px",position:"absolute",top:""+2*i/3}},t)))}}]),t}(c.default.Component);t.default=m,m.contextTypes={history:function(){return d.PropTypes.history}},m.defaultProps={boxSize:120,size:48,showTips:"正在加载",color:"#fff"},e.exports=t.default}).call(this)}finally{}},17:function(e,t,a){try{(function(){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var e={DEFAULT:"DEFAULT",SUCC:"SUCC",FAIL:"FAIL"};t.TASK_STATUS=e}).call(this)}finally{}},19:function(e,t,a){try{(function(){"use strict";function e(e){return e&&e.__esModule?e:{default:e}}function n(e){var t=e.task,a=e.callbacks;a=l({waitCode:u.noop,doneSucc:u.noop,doneFail:u.noop,doneTimeout:u.noop,doneLogin:u.noop,pendingTimeout:u.noop,doing:u.noop,error:u.noop,spiner:u.noop,showProgress:u.noop,importSucc:u.noop,onError:u.noop,errorCatch:u.noop,refreshImgCode:u.noop,setqrCodeTaskInfo:u.noop,doneScan:u.noop,zxBankSpiner:u.noop,showQrcodeInCrawlStatus:u.noop,hideQrCode:u.noop},a);var d,f=o(t),p=u.request.get(f+("?d="+Date.now())).set(l({},m.default.addDefaultHeaders())).set("Accept","application/json").set("Cache-Control","no-store");return d="carrier"==t.taskType?(0,u.guardTimeoutLongtime)(p):(0,u.guardTimeout)(p),d.then(function(e){var o=!1;if(a.setqrCodeTaskInfo&&"qrcode"==t.loginType&&a.setqrCodeTaskInfo(t),a.showProgress&&a.showProgress(e.body.description),"LOGIN"!=e.body.phase&&(a.doneLogin&&(o=a.doneLogin(t,e.body)),"alipay"==t.taskType&&"WAIT_CODE"!=e.body.phase_status&&a.hideQrCode&&a.hideQrCode(),r(t),(c.qsParams.quitOnLoginDone||c.qsParams.canLeave)&&"zhengxin"!=t.taskType))return o=!0,!1;switch("LOGIN"==e.body.phase&&"WAIT_CODE"!=e.body.phase_status&&a.doneScan&&a.doneScan(),e.body.phase_status){case b.WAIT_CODE:a.spiner&&a.spiner(),a.zxBankSpiner&&a.zxBankSpiner(),a.waitCode&&(o=a.waitCode(t,e.body));break;case b.CONTINUE:a.spiner&&a.spiner(),a.zxBankSpiner&&a.zxBankSpiner(),a.waitCode&&a.waitCode(t,e.body);break;case b.DONE_SUCC:e.body.finished===!0?(a.zxBankSpiner&&a.zxBankSpiner(),storage.setItem(t.taskType+"ImportStatus","succ"),setTimeout(function(){a.spiner&&a.spiner(),a.showProgress&&a.showProgress(""),v.default.refreshStatus("1",e.body.description)},3e3),a.importSucc&&a.importSucc(e.body),a.doneSucc&&a.doneSucc(t,e.body),o=!0,i(t)):a.doing&&(o=a.doing(t,e.body));break;case b.DONE_FAIL:a.hideQrCode&&a.hideQrCode(),storage.setItem(t.taskType+"ImportStatus","fail"),"LOGIN"===e.body.phase?("BALO-23001-10"==e.body.error_code&&a.doneTimeout&&a.doneTimeout(t,e.body),a.refreshImgCode(),v.default.refreshStatus("-4",e.body.description)):v.default.refreshStatus("0",e.body.description),a.zxBankSpiner&&a.zxBankSpiner(),setTimeout(function(){a.spiner&&a.spiner(),a.showProgress&&a.showProgress("")},3e3),a.doneFail&&a.doneFail(t,e.body),o=!0,s(t,e);break;case b.DONE_TIMEOUT:a.hideQrCode&&a.hideQrCode(),storage.setItem(t.taskType+"ImportStatus","fail"),"LOGIN"===e.body.phase?v.default.refreshStatus("-4",e.body.description,t.loginType,e.body.phase):v.default.refreshStatus("0",e.body.description,t.loginType,e.body.phase),a.doneTimeout&&a.doneTimeout(t,e.body),o=!0,s(t,e);break;case b.DOING:v.default.refreshStatus("2",e.body.description,t.loginType,e.body.phase),a.doing&&(o=a.doing(t,e.body));break;default:v.default.refreshStatus("-3","异常错误"),a.doneFail&&a.doneFail(t,e.body),o=!0,s(t,e)}"LOGIN"!=e.body.phase,o||setTimeout(function(){n({task:t,callbacks:a})},k)}).catch(function(e){var n=e&&e.body&&e.body.detail||e;v.default.alert("服务异常，请稍候再试！"+n),a.zxBankSpiner&&a.zxBankSpiner(),a.spiner&&a.spiner(),a.onError&&a.onError(t,e),a.error&&a.error(t,e),a.errorCatch&&a.errorCatch(e)})}function o(e){var t="";return t="bank"==e.taskType?f.default.checkImportState.replace("{taskid}",e.taskId):"carrier"==e.taskType?f.default.checkCarrierImportStatev2.replace("{taskid}",e.taskId):"chsi"==e.taskType?f.default.checkChsiImportState.replace("{taskid}",e.taskId):"fund"==e.taskType?f.default.checkFundImportState.replace("{taskid}",e.taskId):"email"==e.taskType||"qq"==e.taskType?f.default.checkEmailImportState.replace("{taskid}",e.taskId):"tax"==e.taskType?f.default.taxStatus.replace("{task_id}",e.taskId)+("?d="+Date.now()):"security"==e.taskType?f.default.checkSecurityImportState.replace("{taskid}",e.taskId)+("?d="+Date.now()):"alipay"==e.taskType||"wechat"==e.taskType?f.default.commonImportStateUrlv2.replace("{taskid}",e.taskId):"sametrade"==e.taskType?f.default.checkSametradeTaskStatus.replace("{task_id}",e.taskId):f.default.commonImportStateUrl.replace("{taskid}",e.taskId)}function r(e){v.default.mxHideWebView(),v.default.mxCanLeave(!0),v.default.loginDone=1,(c.qsParams.canLeave||c.qsParams.quitOnLoginDone)&&"zhengxin"!=e.taskType&&(console.log("finishImport"),v.default.finishImport(e.taskId,"2","登录认证成功","SUCC"),(0,y.default)({taskType:e.taskType}))}function i(e){v.default.finishImport(e.taskId,"1","认证成功","SUCC"),(0,y.default)({taskType:e.taskType})}function s(e,t){console.log("handleDoneFail"),"LOGIN"===t.body.phase?"zhengxin"!=e.taskType&&("qrcode"==e.loginType&&"DONE_TIMEOUT"==t.body.phase_status||v.default.alert(t.body.description)):(v.default.finishImport(e.taskId,"0",t.description,"FAIL"),c.qsParams.quitOnFail&&(0,y.default)({taskType:e.taskType}))}Object.defineProperty(t,"__esModule",{value:!0});var l=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e},u=a(1),c=a(1),d=a(27),f=e(d),p=a(12),m=e(p),h=a(30),y=e(h),g=a(4),v=e(g),k=2500,b={DOING:"DOING",WAIT_CODE:"WAIT_CODE",DONE_SUCC:"DONE_SUCC",DONE_FAIL:"DONE_FAIL",DONE_TIMEOUT:"DONE_TIMEOUT"};t.STATE=b,t.default=n}).call(this)}finally{}},21:function(e,t,a){try{(function(){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var i=function(){function e(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,a,n){return a&&e(t.prototype,a),n&&e(t,n),t}}(),s=function(e,t,a){for(var n=!0;n;){var o=e,r=t,i=a;n=!1,null===o&&(o=Function.prototype);var s=Object.getOwnPropertyDescriptor(o,r);if(void 0!==s){if("value"in s)return s.value;var l=s.get;if(void 0===l)return;return l.call(i)}var u=Object.getPrototypeOf(o);if(null===u)return;e=u,t=r,a=i,n=!0,s=u=void 0}},l=a(2),u=n(l),c=function(e){function t(e,a){o(this,t),s(Object.getPrototypeOf(t.prototype),"constructor",this).call(this,e,a)}return r(t,e),i(t,null,[{key:"propTypes",value:{desc:l.PropTypes.string.isRequired},enumerable:!0}]),i(t,[{key:"render",value:function(){var e=u.default.createElement("img",{style:{width:"350px"},src:a(45)});return u.default.createElement("div",{className:"waiting-view"},u.default.createElement("h3",{style:{width:"80%",textAlign:"center",fontSize:"16px",color:"#70BEEB",height:"50px",lineHeight:"50px",borderBottom:"1px solid #efeff4"}},"获取结果中..."),u.default.createElement("h4",{style:{height:"20px",fontSize:"14px",color:"#666666"}},this.props.desc),u.default.createElement("div",{className:"waiting-gif"},e))}}]),t}(u.default.Component);t.default=c,e.exports=t.default}).call(this)}finally{}},22:function(e,t,a){try{(function(){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var i=function(){function e(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,a,n){return a&&e(t.prototype,a),n&&e(t,n),t}}(),s=function(e,t,a){for(var n=!0;n;){var o=e,r=t,i=a;n=!1,null===o&&(o=Function.prototype);var s=Object.getOwnPropertyDescriptor(o,r);if(void 0!==s){if("value"in s)return s.value;var l=s.get;if(void 0===l)return;return l.call(i)}var u=Object.getPrototypeOf(o);if(null===u)return;e=u,t=r,a=i,n=!0,s=u=void 0}},l=a(2),u=n(l),c=a(1),d=a(23),f=a(5),p=n(f),m=(a(17),function(e){function t(e,a){o(this,t),s(Object.getPrototypeOf(t.prototype),"constructor",this).call(this,e,a),this.state={}}return r(t,e),i(t,null,[{key:"propTypes",value:{succ:l.PropTypes.bool.isRequired,taskInfo:l.PropTypes.any.isRequired,canQuitAuth:l.PropTypes.bool},enumerable:!0}]),i(t,[{key:"render",value:function(){var e=this,t={color:void 0!=c.qsParams.themeColor?"#"+c.qsParams.themeColor:d.DEFAULT_THEMECOLOR,fontSize:"12px"},a=void 0!=c.qsParams.themeColor?"#"+c.qsParams.themeColor:d.DEFAULT_THEMECOLOR,n=null;return n=this.props.succ?u.default.createElement("div",{className:"finish-status succ"},u.default.createElement("svg",{width:"48",height:"48",viewBox:"0 0 48 48"},u.default.createElement("g",{className:"transform-group"},u.default.createElement("g",{transform:"scale(0.046875, 0.046875)"},u.default.createElement("path",{d:"M511.996387 9.862132c-277.328216 0-502.134255 224.813265-502.134255 502.137868 0 277.328216 224.80604 502.137868 502.134255 502.137868 277.320991 0 502.137868-224.809652 502.137868-502.137868C1014.137868 234.675397 789.320991 9.862132 511.996387 9.862132L511.996387 9.862132zM824.889692 388.748635l-351.388132 338.834686c-4.670966 4.663741-9.952445 8.337656-15.587949 11.028971-22.065166 15.761349-52.915939 13.75641-72.730516-6.061779l-150.897848-150.897848c-22.065166-22.065166-22.065166-57.832555 0-79.883271 22.054329-22.065166 57.821717-22.065166 79.886884 0l113.291695 113.28447 317.531758-306.192112c22.061554-22.061554 57.832555-22.061554 79.883271 0C846.954858 330.919692 846.954858 366.687081 824.889692 388.748635L824.889692 388.748635zM824.889692 388.748635",fill:a})))),u.default.createElement("p",{style:t},"验证成功"),c.qsParams.token?u.default.createElement(p.default,{types:"full",style:"width:50%;height:44px;",onTap:function(){e.onSuccDetailButtonClick()}},"详情查询"):null):u.default.createElement("div",{className:"finish-status fail"},u.default.createElement("i",{className:"import-fail-img"}),u.default.createElement("p",{className:"fail-desc",style:{marginBottom:"20px"}},this.props.desc),"YES"!=c.qsParams.notRetryOnFail&&1!=c.qsParams.notRetryOnFail?u.default.createElement(p.default,{types:"full",style:"width:50%;height:44px;",onTap:function(){e.retryButtonClick()}},"点击重试"):null),u.default.createElement("div",{className:"waiting-view"},u.default.createElement("div",{className:"waiting-gif"},n))}},{key:"retryButtonClick",value:function(){window.location.reload()}},{key:"retryButtonClick",value:function(){window.location.reload()}},{key:"onSuccDetailButtonClick",value:function(){if(void 0==c.qsParams.token)return void PG.alert("缺少token值");var e=this.props.taskInfo,t=(0,c.getENV)(),a="";a="test"==t?"http://192.168.0.11:8282":"pre"==t||"qa"==t?"https://qa.51datakey.com":"https://api.51datakey.com";var n="";switch(e.taskType){case"email":n=a+"/h5/resultV3/moxie.html#/emailResult?taskId="+e.taskId+"&token="+c.qsParams.token+"&mainTitle="+c.qsParams.mainTitle+"&icoUrl="+c.qsParams.icoUrl;break;case"bank":n=a+"/h5/resultV3/moxie.html#/bankResult/?taskId="+e.taskId+"&token="+c.qsParams.token+"&mainTitle="+c.qsParams.mainTitle+"&icoUrl="+c.qsParams.icoUrl;break;case"carrier":n=a+"/h5/resultV4/carrier/moxie.html?taskId="+e.account+"&token="+c.qsParams.token+"&mainTitle="+c.qsParams.mainTitle+"&icoUrl="+c.qsParams.icoUrl;break;case"shixin":n=a+"/h5/resultV4/shixin/moxie.html?taskId="+e.taskId+"&token="+c.qsParams.token+"&mainTitle="+c.qsParams.mainTitle+"&icoUrl="+c.qsParams.icoUrl;break;case"tax":n=a+"/h5/resultV4/tax/moxie.html?taskId="+e.taskId+"&token="+c.qsParams.token+"&mainTitle="+c.qsParams.mainTitle+"&icoUrl="+c.qsParams.icoUrl;break;case"zhixing":n=a+"/h5/resultV4/zhixing/moxie.html?taskId="+e.taskId+"&token="+c.qsParams.token+"&mainTitle="+c.qsParams.mainTitle+"&icoUrl="+c.qsParams.icoUrl;break;default:n=a+"/h5/resultV3/moxie.html#/"+e.taskType+"?taskId="+e.taskId+"&token="+c.qsParams.token+"&mainTitle="+c.qsParams.mainTitle+"&icoUrl="+c.qsParams.icoUrl}"test"==t?n+="&env=test":"pre"!=t&&"qa"!=t||(n+="&env="+t),window.location.href=n}}]),t}(u.default.Component));t.default=m,e.exports=t.default}).call(this)}finally{}},23:function(e,t,a){try{(function(){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var e="#58B5EB";t.DEFAULT_THEMECOLOR=e}).call(this)}finally{}},24:function(e,t,a){try{(function(){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var e={LOGIN:"LOGIN",RECEIVE:"RECEIVE",EXTRACT:"EXTRACT",STORE:"STORE",DONE:"DONE"};t.PHASE=e}).call(this)}finally{}},220:function(e,t,a){try{(function(){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var o=a(2),r=n(o),i=a(96),s=(n(i),a(9)),l=a(15),u=n(l),c=a(1),d=a(53),f=n(d),p=a(4),m=n(p),h=a(10),y=n(h),g=a(13),v=n(g),k=a(5),b=n(k),T=a(11),S=(n(T),a(40)),P=r.default.createClass({displayName:"index",propTypes:{pageConfig:o.PropTypes.object.isRequired,inMemoryLogin:o.PropTypes.object,areaCode:o.PropTypes.string.isRequired},getInitialState:function(){return{loginTypeIndex:0,isStart:!1,frontConf:this.props.frontConf}},getDefaultProps:function(){return{auto:0,inMemoryLogin:null}},componentDidMount:function(){var e=this,t=this.props.pageConfig,a=(0,S.getParams)("loginParams");if(a){var n=!1;t.fields.map(function(e,o){a[t.login_type]&&a[t.login_type][e.name]||(n=!0)}),n||(this.timer=setInterval(function(){var a=!1;t.fields.map(function(t,n){e.refs[t.name]||(a=!0)}),a||(clearInterval(e.timer),e.handleImport())},100))}var o=document.getElementsByClassName("fund-bottom")[0],r=document.body.clientHeight;window.onresize=function(){document.body.clientHeight<r?o.style.display="none":o.style.display="flex"};var i=this.autoImport,s=this.props.inMemoryLogin;if(this.isMounted=!0,s&&s.loginType){for(var l=0,u=0;u<1;u++)if(t.login_type===s.loginType){l=u;break}this.setState({loginTypeIndex:l},i)}},componentWillUnmount:function(){this.isMounted=!1},render:function(){var e=this.handleImport,t=this.handleProtocol,a=this.renderInputs,n=this.state.isStart,o=this.props.pageConfig,i=void 0!=c.qsParams.agreementEntryText?c.qsParams.agreementEntryText:"同意《用户使用协议》",s=a(),l=({backgroundColor:"#"+c.qsParams.themeColor},r.default.createElement("div",{className:"config-import-page"},s.length>0?r.default.createElement("div",{className:"form common-form"},s):null,r.default.createElement("div",{style:{display:"NO"==c.qsParams.showAgreement||0==c.qsParams.showAgreement?"none":"block"},className:"protocol"},r.default.createElement("input",{id:"protocol"+o.login_type,ref:"protocol"+o.login_type,type:"checkbox",defaultChecked:!0}),r.default.createElement("label",{htmlFor:"protocol"+o.login_type},r.default.createElement("span",{style:{background:c.qsParams.themeColor?"#"+c.qsParams.themeColor:"rgb(126, 195, 235)"}})),r.default.createElement(y.default,{onTap:t},r.default.createElement("a",null,i))),c.qsParams.tenantAgreementUrl||this.state.frontConf.tenantAgreementUrl?r.default.createElement("div",{className:"protocol"},r.default.createElement("input",{id:"tanent_protocol"+o.login_type,ref:"tanent_protocol"+o.login_type,type:"checkbox",defaultChecked:!0}),r.default.createElement("label",{htmlFor:"tanent_protocol"+o.login_type},r.default.createElement("span",{style:{background:c.qsParams.themeColor?"#"+c.qsParams.themeColor:"rgb(126, 195, 235)"}})),r.default.createElement(y.default,{onTap:this.handleTanentProtocol},r.default.createElement("a",null,c.qsParams.tenantAgreementEntryText||this.state.frontConf.tenantAgreementEntryText||"同意《用户使用协议》"))):null,r.default.createElement("div",{className:"page-wrapper"},r.default.createElement(y.default,{onTap:e},r.default.createElement(b.default,{types:"full",onTap:function(){},disable:n,state:n,getState:function(e){switch(e){case!1:return"提交";case!0:return"登录中...";default:return"提交"}}})),this.props.tips&&"null"!=this.props.tips?r.default.createElement("div",{className:"tip"},r.default.createElement("div",null,"温馨提示:"),"*",this.props.tips):null)));return r.default.createElement("div",null,l)},showPwd:function(e,t){var n=f.default.findDOMNode(this.refs[e]).querySelector("input");"password"==n.type?(n.type="text",this.refs[e+"-span"].style.backgroundImage="url("+a(37)+")"):(n.type="password",this.refs[e+"-span"].style.backgroundImage="url("+a(20)+")")},clearVal:function(e){this.refs[e].setValue("")},renderInputs:function(){var e=this,t=this.tryGetCachedValue,a=(this.wrapValidator,this.state.loginTypeIndex,this.props.pageConfig),n=a,o=!1,i=void 0;try{i=(0,S.getParams)("loginParams")?(0,S.getParams)("loginParams"):{},i[a.login_type]&&(o=!0)}catch(e){console.log(e)}return n.fields.map(function(n,s){var l=t(n.name);if("select"==n.type){for(var u=[],c=0;c<n.list.length;c++)u.push(r.default.createElement("option",{key:c,value:n.list[c].value},n.list[c].key));var d=r.default.createElement("select",{ref:""+n.name,defaultValue:n.list[0].value},u);return r.default.createElement("div",{className:"input-item",key:n.fieldId},n.label,r.default.createElement("span",{className:"input-select"},d),r.default.createElement("p",{className:"input-tip"},n.des))}return r.default.createElement("div",{className:"input-item",key:n.fieldId},r.default.createElement(v.default,{key:a.login_type+"-"+n.label,type:""+n.type,ref:""+n.name,id:"inp"+s,defaultValue:o&&i[a.login_type][n.name]?i[a.login_type][n.name]:l,name:n.label,placeholder:"请输入"+n.label,label:n.label}),r.default.createElement("p",{className:"input-tip"},n.des),r.default.createElement("div",{className:"tex_box"},r.default.createElement("span",{ref:n.name+"-span",onClick:"password"==n.name?function(){return e.showPwd(n.name)}:function(){return e.clearVal(n.name)},className:"password"==n.name?n.name:"textt"})))})},handleImport:function(){function e(){u.default.set("fund",o,n.loginModel,n.login_type,{loginParam:l,loginFail:!0})}var t=this,a=(this.doneLogin,this.props),n=a.pageConfig,o=a.areaCode,r=a.onSubmitTaskDone,i=(this.state.loginTypeIndex,n);if(!document.getElementById("protocol"+n.login_type).checked)return void setTimeout(function(){return m.default.alert("请勾选同意《用户使用协议》","")});if(this.refs["tanent_protocol"+n.login_type]&&!this.refs["tanent_protocol"+n.login_type].checked)return void setTimeout(function(){return m.default.alert("请勾选同意《用户使用协议》","")});var l=i.fields.reduce(function(e,a){if("select"==a.type){var n=t.refs[""+a.name].value;0==a.required&&""==n||(e[""+a.name]=n)}else{var n=t.refs[""+a.name].getValue();0==a.required&&""==n||(e[""+a.name]=n)}return e},{});for(var c in l)if(""==l[c])return void setTimeout(function(){return m.default.alert("请填写完整的信息!","")});this.setState({isStart:!0}),(0,s.submitTaskHelper)({taskType:"fund",taskSubType:"",username:l.account,password:l.password,loginType:n.login_type,areaCode:o,idCard:l.idCard,realName:l.realName,loanAccount:l.loanAccount,loanPassWord:l.loanPassWord,corpAccount:l.corpAccount,corpName:l.corpName,mobile:l.mobile,subArea:l.subArea}).then(function(e){if(e.body.task_id){t.setState({isStart:!1}),m.default.refreshStatus("2","创建任务成功"),m.default.mxSaveTaskId(e.body.task_id);var a={taskId:e.body.task_id,bankId:o,username:l.account,loginModel:n.loginModel,loginType:n.login_type,taskType:"fund",loginParam:{account:l.account,idCard:l.idCard,realName:l.realName}};r(a)}}).catch(function(a){t.setState({isStart:!1}),console.log(a.body),m.default.refreshStatus("-3","服务异常，创建任务失败"),console.log("登录失败，标记失败"),e(),t.handleError(a)})},getLastLogin:function(){var e=this.props,t=e.pageConfig,a=e.areaCode;return u.default.get("fund",a,t.loginModel,t.login_type)},handleError:function(e){var t=e&&e.body&&e.body.detail||"网络异常，请稍后再试!\n"+e;m.default.alert(t),this.setState({isStart:!1})},handleTanentProtocol:function(){var e=c.qsParams.tenantAgreementUrl||this.state.frontConf.tenantAgreementUrl;m.default.openWebView("用户使用协议",e,"","agreement")},handleProtocol:function(){var e=c.qsParams.agreementUrl||this.state.frontConf.agreementUrl;m.default.openWebView("用户使用协议",e,"","agreement")},selectLoginType:function(e){this.state.isStart||this.setState({loginTypeIndex:e})},doneLogin:function(e){return e.importResult={},this.props.setTaskStore(e),this.props.onLoginDone(),!0},autoImport:function(){this.props.auto&&this.handleImport()},tryGetCachedValue:function(e){var t=this.props.inMemoryLogin,a=this.getLastLogin(),n="";return a&&a.loginParam&&(n=(0,c.testPassword)(e)?a.loginFail?null:"":a.loginParam[e]),t&&t.loginParam&&t.loginParam[e]&&(n=t.loginParam[e]),n},handleJumpPage:function(){m.default.openWebView("个人公积金",this.props.webUrl)},wrapValidator:function(e){return function(t){return""===t||new RegExp(e).test(t)}}});t.default=P,e.exports=t.default}).call(this)}finally{}},815:function(e,t,a){try{(function(){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function o(e,t){var a={};for(var n in e)t.indexOf(n)>=0||Object.prototype.hasOwnProperty.call(e,n)&&(a[n]=e[n]);return a}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var s=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e},l=function(){function e(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,a,n){return a&&e(t.prototype,a),n&&e(t,n),t}}(),u=function(e,t,a){for(var n=!0;n;){var o=e,r=t,i=a;n=!1,null===o&&(o=Function.prototype);var s=Object.getOwnPropertyDescriptor(o,r);if(void 0!==s){if("value"in s)return s.value;var l=s.get;if(void 0===l)return;return l.call(i)}var u=Object.getPrototypeOf(o);if(null===u)return;e=u,t=r,a=i,n=!0,s=u=void 0}},c=a(2),d=n(c),f=a(1),p=a(4),m=n(p),h=a(19),y=n(h),g=a(9),v=a(8),k=n(v),b=a(220),T=n(b),S=a(59),P=n(S),E=a(18),w=n(E),C=a(6),I=n(C),O=a(7),_=n(O),x=a(13),q=(n(x),a(5)),N=(n(q),a(14)),L=n(N),A=a(11),U=n(A),D=a(21),M=n(D),j=a(17),F=a(15),V=n(F),B=a(24),z=a(22),R=n(z),G=a(40),W=a(39),H=a(12),Q=n(H),K="此次尝试失败，请重试",J="验证完成",Y="fundImportTask",X=function(e){function t(e,t){r(this,a),u(Object.getPrototypeOf(a.prototype),"constructor",this).call(this,e,t),this.wrapView=this.wrapView.bind(this),this.renderImportPages=this.renderImportPages.bind(this),this.onIndexChange=this.onIndexChange.bind(this),this.state={pages:[],matchPages:[],importState:"YES"===f.qsParams.continue?JSON.parse(storage.getItem(Y)):null,currentPhone:Number(f.qsParams.mobile)?f.qsParams.mobile:"",taskStatus:j.TASK_STATUS.DEFAULT,isLoginDone:!1,showSpiner:!0,taskInfo:null,tips:"",webUrl:"",information:{},cityName:"",show:null,invalid:"YES"===f.qsParams.invalid||1==f.qsParams.invalid,isCheckingStatus:!0,selectedIndex:0,frontConf:Q.default.frontConf[Q.default.taskType]}}i(t,e),l(t,[{key:"componentDidMount",value:function(){var e=this,t=String(this.props.params.areaCode||f.qsParams.areaCode);return t?void(0,g.fetchLoginConfig)({taskType:"fund",areaCode:t}).then(function(t){var a=t.body.city;e.setState({cityName:a}),m.default.refreshTitle(a+"公积金");var n=t.body.element,o=t.body.tips,r=t.body.webUrl,i=t.body.information,s=f.qsParams.loginOthersHide,l=!1,u={};(0,G.getParams)("loginParams")&&(l=!0,u=(0,G.getParams)("loginParams"));var c=n.filter(function(e){return!l||!(("YES"==s||1==s)&&void 0==u[e.login_type])});0==c.length?e.setState({pages:n,matchPages:c,tips:o,webUrl:r,information:i,invalid:!0,unsupportMessage:"抱歉，该登录方式暂不支持"}):e.setState({pages:n,matchPages:c,tips:o,webUrl:r,information:i})}).then(function(){e.setState({isCheckingStatus:!1})}).catch(function(t){console.log(t),e.setState({invalid:!0,isCheckingStatus:!1})}):void this.setState({invalid:!0})}},{key:"render",value:function(){var e=this,t=this.wrapView,a=(this.handleBack,this.state),n=a.pages,r=a.isCheckingStatus,i=a.invalid,s=(a.importState,o(this.props,[]),n[0]&&n[0].areaName||"公积金导入",""),l=t(s,d.default.createElement("div",{className:"centered"},d.default.createElement(U.default,{size:"44",color:"#999"})));return n&&n.length>0&&(l=this.state.isLoginDone?this.state.taskStatus==j.TASK_STATUS.DEFAULT?d.default.createElement(M.default,{desc:this.state.desc}):d.default.createElement(R.default,{succ:this.state.taskStatus==j.TASK_STATUS.SUCC,taskInfo:this.state.taskInfo,desc:this.state.desc}):d.default.createElement("div",null,this.renderImportPages(),this.state.taskInfo&&this.state.showSpiner?d.default.createElement(L.default,{color:"#fff",showTips:this.state.desc}):null)),i&&(l=t(s,d.default.createElement("div",{className:"service-unsupport"},d.default.createElement("i",null),d.default.createElement("p",null,"抱歉，该城市公积金服务暂不可用")))),r&&(l=t(s,d.default.createElement("div",{className:"centered"},d.default.createElement(U.default,{size:"44",color:"#999"})))),d.default.createElement("div",{className:"import-onlinebank"},d.default.createElement("div",{className:"mx-view"},"NO"==f.qsParams.showTitleBar||0==f.qsParams.showTitleBar||m.default.Device.SDK?null:d.default.createElement("div",{style:{height:"NO"==f.qsParams.showTitleBar||m.default.Device.SDK?0:44}},d.default.createElement(I.default,{title:this.state.cityName+"公积金",left:d.default.createElement(_.default,{onTap:function(){k.default.call(e)}},d.default.createElement("i",{className:"ion-chevron-left"}))})),l))}},{key:"renderImportPages",value:function(){var e=this,t=this.onIndexChange,a=this.wrapView,n=(this.handleBack,this.tips,this.webUrl,this.state),r=n.selectedIndex,i=n.currentLogin,l=(n.pages,n.matchPages),u=o(this.props,[]),c="",p=String(this.props.params.areaCode||f.qsParams.areaCode),m=d.default.createElement(P.default,{selectedIndex:r,onIndexChange:t},l.map(function(t){return t.loginModel=0,d.default.createElement("div",{title:t.label,key:t.login_type},d.default.createElement(T.default,s({key:t.login_type,frontConf:e.state.frontConf,areaCode:p,inMemoryLogin:i&&i.loginModel===t.loginModel?i:null,pageConfig:t,onSubmitTaskDone:e.onSubmitTaskDone.bind(e),tips:e.state.tips,webUrl:e.state.webUrl},u)))}));return a(c,m)}},{key:"wrapView",value:function(e,t){var a=this,n=this.state.information;if(n&&"string"==typeof n&&(n=JSON.parse(n)),n&&n.fields)var o=n.fields;return d.default.createElement("div",null,e,d.default.createElement(w.default,null,t,d.default.createElement("div",{ref:"fund_bottom",className:"fund-bottom",style:{position:this.state.pos,color:f.qsParams.themeColor?"#"+f.qsParams.themeColor:"#5e82fb"}},o?d.default.createElement("div",null,d.default.createElement("span",{className:"ion-ios-help-outline"}),d.default.createElement("a",{onClick:function(){a.handleClick()}},"常见问题")):null,this.state.webUrl?d.default.createElement("div",{className:"d-official"},d.default.createElement("span",{className:"ion-ios-redo-outline"}),d.default.createElement("a",{onClick:function(){a.handleJumpPage()}},"跳转官网")):null),d.default.createElement("div",{className:"d-mask",style:{display:this.state.show}},d.default.createElement("div",null,d.default.createElement("div",null,o?o.map(function(e,t){return d.default.createElement("div",{key:t,className:"mask-in"},d.default.createElement("h3",null,e.lable),d.default.createElement("div",null,e.value))}):null),d.default.createElement("div",{onClick:function(){a.handleClose()}})))))}},{key:"onIndexChange",value:function(e){this.setState({selectedIndex:e})}},{key:"handleJumpPage",value:function(){m.default.openWebView("个人公积金",this.state.webUrl)}},{key:"handleClick",value:function(){this.setState({show:"block"})}},{key:"handleClose",value:function(){this.setState({show:"none"})}},{key:"onSubmitTaskDone",value:function(e){this.props.hideVCodeModal(),window.storage.setItem(Y,JSON.stringify(e)),this.setState({taskInfo:e}),this.startPoll()}},{key:"startPoll",value:function(){(0,y.default)({task:this.state.taskInfo,isLogin:!1,callbacks:{waitCode:this.initVCode.bind(this),doneLogin:this.doneLogin.bind(this),doneSucc:this.onSucc.bind(this),doneFail:this.onFail.bind(this),doneTimeout:this.onFail.bind(this),doing:this.updateState.bind(this),pendingTimeout:this.onPendingTimeout.bind(this),error:this.onError.bind(this)}})}},{key:"initVCode",value:function(e,t){var a=this;return this.setState({showSpiner:!1}),this.props.showVCodeModal({title:"验证码",desc:t.description,waitSeconds:0,type:t.input.type,imgSrc:"img"==t.input.type?t.input.value:"",onConfirm:function(t){
a.submitVCode(t,e),a.setState({showSpiner:!0})},onCancel:function(){a.storeLoginInfo(e,!0),a.setState({taskInfo:null,showSpiner:!0})}}),this.updateState(e,t),!0}},{key:"submitVCode",value:function(e,t){var a=this;(0,g.submitVCode)(e,t).catch(function(e){console.log(e)}).then(function(){return a.startPoll()})}},{key:"doneLogin",value:function(e,t){this.updateState(e,t),this.setState({isLoginDone:!0})}},{key:"removeTaskStore",value:function(){window.storage.removeItem(Y)}},{key:"updateState",value:function(e,t){return this.setState({phase:t.phase,desc:t.description,isLoginDone:t.phase!==B.PHASE.LOGIN}),!!this.state.hasQuit}},{key:"storeLoginInfo",value:function(e){var t=!(arguments.length<=1||void 0===arguments[1])&&arguments[1];this.removeTaskStore();var a=this.props.params.cardType||f.qsParams.cardType;void 0==e.bankId&&(e.bankId=0),void 0==e.loginModel&&(e.loginModel=0),void 0==e.loginType&&(e.loginType=0),V.default.set(e.taskType,e.bankId,a,e.loginType,{loginParam:e.loginParam,loginFail:t})}},{key:"onSucc",value:function(e,t){this.storeLoginInfo(e),t.description=J,this.updateState(e,t),this.setState({taskStatus:j.TASK_STATUS.SUCC})}},{key:"onFail",value:function(e,t){this.storeLoginInfo(e,!0),t.phase!=B.PHASE.LOGIN&&this.setState({taskStatus:j.TASK_STATUS.FAIL,desc:t.description}),this.setState({taskInfo:null})}},{key:"onPendingTimeout",value:function(e){this.storeLoginInfo(e),this.setState({taskStatus:j.TASK_STATUS.FAIL,desc:K,taskInfo:null})}},{key:"onError",value:function(e,t){console.log(t),this.storeLoginInfo(e,!0),this.setState({taskStatus:j.TASK_STATUS.FAIL,desc:"服务异常,请稍后再试",taskInfo:null})}},{key:"handleBack",value:function(){(this.state.isLoginDone||this.state.isFail)&&(f.qsParams.backUrl||f.qsParams.back_url)?quitBack({taskType:"fund"}):(this.setState({hasQuit:!0}),k.default.call(this))}}],[{key:"propTypes",value:{showVCodeModal:c.PropTypes.func,hideVCodeModal:c.PropTypes.func},enumerable:!0}]);var a=t;return t=(0,W.observer)(t)||t}(d.default.Component);t.default=X,e.exports=t.default}).call(this)}finally{}}});