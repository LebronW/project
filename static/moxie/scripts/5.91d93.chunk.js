webpackJsonp([5,67],{14:function(e,t,a){try{(function(){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}function n(e,t){var a={};for(var o in e)t.indexOf(o)>=0||Object.prototype.hasOwnProperty.call(e,o)&&(a[o]=e[o]);return a}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function s(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var i=function(){function e(e,t){for(var a=0;a<t.length;a++){var o=t[a];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,a,o){return a&&e(t.prototype,a),o&&e(t,o),t}}(),l=function(e,t,a){for(var o=!0;o;){var n=e,r=t,s=a;o=!1,null===n&&(n=Function.prototype);var i=Object.getOwnPropertyDescriptor(n,r);if(void 0!==i){if("value"in i)return i.value;var l=i.get;if(void 0===l)return;return l.call(s)}var d=Object.getPrototypeOf(n);if(null===d)return;e=d,t=r,a=s,o=!0,i=d=void 0}},d=a(2),u=o(d),c=a(16),f=a(10),p=(o(f),a(1)),h=function(e){function t(e,a){r(this,t),l(Object.getPrototypeOf(t.prototype),"constructor",this).call(this,e,a),this.state={}}return s(t,e),i(t,[{key:"componentDidMount",value:function(){}},{key:"render",value:function(){var e=this.props,t=e.showTips,a=e.showOrHideSpinner,o=e.size,r=e.color,s=e.boxSize,i=(n(e,["showTips","showOrHideSpinner","size","color","boxSize"]),{display:a,width:"100%",maxWidth:p.qsParams.maxWidth?p.qsParams.maxWidth:"800px",height:p.qsParams.height?p.qsParams.height+"px":"100%",position:"fixed",right:0,bottom:0,margin:"0 auto",left:0,top:0,zIndex:996,background:"rgba(0,0,0,.4)"});return u.default.createElement("div",{style:i},u.default.createElement("div",{className:"SpinerBox",style:{overflow:"hidden",background:"rgba(22,22,22,0.8)",position:"absolute",top:"40%",left:"50%",width:""+s,height:""+s,borderRadius:"10px"}},u.default.createElement("div",{className:"newSpiner",style:{top:t?s/6+"px":(s-o)/2+"px"}},u.default.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 32 32",width:o,height:o,fill:r},u.default.createElement("path",{opacity:".25",d:"M16 0 A16 16 0 0 0 16 32 A16 16 0 0 0 16 0 M16 4 A12 12 0 0 1 16 28 A12 12 0 0 1 16 4"}),u.default.createElement("path",{d:"M16 0 A16 16 0 0 1 32 16 L28 16 A12 12 0 0 0 16 4z"}))),u.default.createElement("div",{style:{color:"#fff",textAlign:"center",width:"100%",fontSize:"13px",position:"absolute",top:""+2*s/3}},t)))}}]),t}(u.default.Component);t.default=h,h.contextTypes={history:function(){return c.PropTypes.history}},h.defaultProps={boxSize:120,size:48,showTips:"正在加载",color:"#fff"},e.exports=t.default}).call(this)}finally{}},17:function(e,t,a){try{(function(){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var e={DEFAULT:"DEFAULT",SUCC:"SUCC",FAIL:"FAIL"};t.TASK_STATUS=e}).call(this)}finally{}},19:function(e,t,a){try{(function(){"use strict";function e(e){return e&&e.__esModule?e:{default:e}}function o(e){var t=e.task,a=e.callbacks;a=l({waitCode:d.noop,doneSucc:d.noop,doneFail:d.noop,doneTimeout:d.noop,doneLogin:d.noop,pendingTimeout:d.noop,doing:d.noop,error:d.noop,spiner:d.noop,showProgress:d.noop,importSucc:d.noop,onError:d.noop,errorCatch:d.noop,refreshImgCode:d.noop,setqrCodeTaskInfo:d.noop,doneScan:d.noop,zxBankSpiner:d.noop,showQrcodeInCrawlStatus:d.noop,hideQrCode:d.noop},a);var c,f=n(t),p=d.request.get(f+("?d="+Date.now())).set(l({},h.default.addDefaultHeaders())).set("Accept","application/json").set("Cache-Control","no-store");return c="carrier"==t.taskType?(0,d.guardTimeoutLongtime)(p):(0,d.guardTimeout)(p),c.then(function(e){var n=!1;if(a.setqrCodeTaskInfo&&"qrcode"==t.loginType&&a.setqrCodeTaskInfo(t),a.showProgress&&a.showProgress(e.body.description),"LOGIN"!=e.body.phase&&(a.doneLogin&&(n=a.doneLogin(t,e.body)),"alipay"==t.taskType&&"WAIT_CODE"!=e.body.phase_status&&a.hideQrCode&&a.hideQrCode(),r(t),(u.qsParams.quitOnLoginDone||u.qsParams.canLeave)&&"zhengxin"!=t.taskType))return n=!0,!1;switch("LOGIN"==e.body.phase&&"WAIT_CODE"!=e.body.phase_status&&a.doneScan&&a.doneScan(),e.body.phase_status){case T.WAIT_CODE:a.spiner&&a.spiner(),a.zxBankSpiner&&a.zxBankSpiner(),a.waitCode&&(n=a.waitCode(t,e.body));break;case T.CONTINUE:a.spiner&&a.spiner(),a.zxBankSpiner&&a.zxBankSpiner(),a.waitCode&&a.waitCode(t,e.body);break;case T.DONE_SUCC:e.body.finished===!0?(a.zxBankSpiner&&a.zxBankSpiner(),storage.setItem(t.taskType+"ImportStatus","succ"),setTimeout(function(){a.spiner&&a.spiner(),a.showProgress&&a.showProgress(""),g.default.refreshStatus("1",e.body.description)},3e3),a.importSucc&&a.importSucc(e.body),a.doneSucc&&a.doneSucc(t,e.body),n=!0,s(t)):a.doing&&(n=a.doing(t,e.body));break;case T.DONE_FAIL:a.hideQrCode&&a.hideQrCode(),storage.setItem(t.taskType+"ImportStatus","fail"),"LOGIN"===e.body.phase?("BALO-23001-10"==e.body.error_code&&a.doneTimeout&&a.doneTimeout(t,e.body),a.refreshImgCode(),g.default.refreshStatus("-4",e.body.description)):g.default.refreshStatus("0",e.body.description),a.zxBankSpiner&&a.zxBankSpiner(),setTimeout(function(){a.spiner&&a.spiner(),a.showProgress&&a.showProgress("")},3e3),a.doneFail&&a.doneFail(t,e.body),n=!0,i(t,e);break;case T.DONE_TIMEOUT:a.hideQrCode&&a.hideQrCode(),storage.setItem(t.taskType+"ImportStatus","fail"),"LOGIN"===e.body.phase?g.default.refreshStatus("-4",e.body.description,t.loginType,e.body.phase):g.default.refreshStatus("0",e.body.description,t.loginType,e.body.phase),a.doneTimeout&&a.doneTimeout(t,e.body),n=!0,i(t,e);break;case T.DOING:g.default.refreshStatus("2",e.body.description,t.loginType,e.body.phase),a.doing&&(n=a.doing(t,e.body));break;default:g.default.refreshStatus("-3","异常错误"),a.doneFail&&a.doneFail(t,e.body),n=!0,i(t,e)}"LOGIN"!=e.body.phase,n||setTimeout(function(){o({task:t,callbacks:a})},k)}).catch(function(e){var o=e&&e.body&&e.body.detail||e;g.default.alert("服务异常，请稍候再试！"+o),a.zxBankSpiner&&a.zxBankSpiner(),a.spiner&&a.spiner(),a.onError&&a.onError(t,e),a.error&&a.error(t,e),a.errorCatch&&a.errorCatch(e)})}function n(e){var t="";return t="bank"==e.taskType?f.default.checkImportState.replace("{taskid}",e.taskId):"carrier"==e.taskType?f.default.checkCarrierImportStatev2.replace("{taskid}",e.taskId):"chsi"==e.taskType?f.default.checkChsiImportState.replace("{taskid}",e.taskId):"fund"==e.taskType?f.default.checkFundImportState.replace("{taskid}",e.taskId):"email"==e.taskType||"qq"==e.taskType?f.default.checkEmailImportState.replace("{taskid}",e.taskId):"tax"==e.taskType?f.default.taxStatus.replace("{task_id}",e.taskId)+("?d="+Date.now()):"security"==e.taskType?f.default.checkSecurityImportState.replace("{taskid}",e.taskId)+("?d="+Date.now()):"alipay"==e.taskType||"wechat"==e.taskType?f.default.commonImportStateUrlv2.replace("{taskid}",e.taskId):"sametrade"==e.taskType?f.default.checkSametradeTaskStatus.replace("{task_id}",e.taskId):f.default.commonImportStateUrl.replace("{taskid}",e.taskId)}function r(e){g.default.mxHideWebView(),g.default.mxCanLeave(!0),g.default.loginDone=1,(u.qsParams.canLeave||u.qsParams.quitOnLoginDone)&&"zhengxin"!=e.taskType&&(console.log("finishImport"),g.default.finishImport(e.taskId,"2","登录认证成功","SUCC"),(0,y.default)({taskType:e.taskType}))}function s(e){g.default.finishImport(e.taskId,"1","认证成功","SUCC"),(0,y.default)({taskType:e.taskType})}function i(e,t){console.log("handleDoneFail"),"LOGIN"===t.body.phase?"zhengxin"!=e.taskType&&("qrcode"==e.loginType&&"DONE_TIMEOUT"==t.body.phase_status||g.default.alert(t.body.description)):(g.default.finishImport(e.taskId,"0",t.description,"FAIL"),u.qsParams.quitOnFail&&(0,y.default)({taskType:e.taskType}))}Object.defineProperty(t,"__esModule",{value:!0});var l=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var o in a)Object.prototype.hasOwnProperty.call(a,o)&&(e[o]=a[o])}return e},d=a(1),u=a(1),c=a(27),f=e(c),p=a(12),h=e(p),m=a(30),y=e(m),v=a(4),g=e(v),k=2500,T={DOING:"DOING",WAIT_CODE:"WAIT_CODE",DONE_SUCC:"DONE_SUCC",DONE_FAIL:"DONE_FAIL",DONE_TIMEOUT:"DONE_TIMEOUT"};t.STATE=T,t.default=o}).call(this)}finally{}},21:function(e,t,a){try{(function(){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var s=function(){function e(e,t){for(var a=0;a<t.length;a++){var o=t[a];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,a,o){return a&&e(t.prototype,a),o&&e(t,o),t}}(),i=function(e,t,a){for(var o=!0;o;){var n=e,r=t,s=a;o=!1,null===n&&(n=Function.prototype);var i=Object.getOwnPropertyDescriptor(n,r);if(void 0!==i){if("value"in i)return i.value;var l=i.get;if(void 0===l)return;return l.call(s)}var d=Object.getPrototypeOf(n);if(null===d)return;e=d,t=r,a=s,o=!0,i=d=void 0}},l=a(2),d=o(l),u=function(e){function t(e,a){n(this,t),i(Object.getPrototypeOf(t.prototype),"constructor",this).call(this,e,a)}return r(t,e),s(t,null,[{key:"propTypes",value:{desc:l.PropTypes.string.isRequired},enumerable:!0}]),s(t,[{key:"render",value:function(){var e=d.default.createElement("img",{style:{width:"350px"},src:a(45)});return d.default.createElement("div",{className:"waiting-view"},d.default.createElement("h3",{style:{width:"80%",textAlign:"center",fontSize:"16px",color:"#70BEEB",height:"50px",lineHeight:"50px",borderBottom:"1px solid #efeff4"}},"获取结果中..."),d.default.createElement("h4",{style:{height:"20px",fontSize:"14px",color:"#666666"}},this.props.desc),d.default.createElement("div",{className:"waiting-gif"},e))}}]),t}(d.default.Component);t.default=u,e.exports=t.default}).call(this)}finally{}},22:function(e,t,a){try{(function(){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var s=function(){function e(e,t){for(var a=0;a<t.length;a++){var o=t[a];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,a,o){return a&&e(t.prototype,a),o&&e(t,o),t}}(),i=function(e,t,a){for(var o=!0;o;){var n=e,r=t,s=a;o=!1,null===n&&(n=Function.prototype);var i=Object.getOwnPropertyDescriptor(n,r);if(void 0!==i){if("value"in i)return i.value;var l=i.get;if(void 0===l)return;return l.call(s)}var d=Object.getPrototypeOf(n);if(null===d)return;e=d,t=r,a=s,o=!0,i=d=void 0}},l=a(2),d=o(l),u=a(1),c=a(23),f=a(5),p=o(f),h=(a(17),function(e){function t(e,a){n(this,t),i(Object.getPrototypeOf(t.prototype),"constructor",this).call(this,e,a),this.state={}}return r(t,e),s(t,null,[{key:"propTypes",value:{succ:l.PropTypes.bool.isRequired,taskInfo:l.PropTypes.any.isRequired,canQuitAuth:l.PropTypes.bool},enumerable:!0}]),s(t,[{key:"render",value:function(){var e=this,t={color:void 0!=u.qsParams.themeColor?"#"+u.qsParams.themeColor:c.DEFAULT_THEMECOLOR,fontSize:"12px"},a=void 0!=u.qsParams.themeColor?"#"+u.qsParams.themeColor:c.DEFAULT_THEMECOLOR,o=null;return o=this.props.succ?d.default.createElement("div",{className:"finish-status succ"},d.default.createElement("svg",{width:"48",height:"48",viewBox:"0 0 48 48"},d.default.createElement("g",{className:"transform-group"},d.default.createElement("g",{transform:"scale(0.046875, 0.046875)"},d.default.createElement("path",{d:"M511.996387 9.862132c-277.328216 0-502.134255 224.813265-502.134255 502.137868 0 277.328216 224.80604 502.137868 502.134255 502.137868 277.320991 0 502.137868-224.809652 502.137868-502.137868C1014.137868 234.675397 789.320991 9.862132 511.996387 9.862132L511.996387 9.862132zM824.889692 388.748635l-351.388132 338.834686c-4.670966 4.663741-9.952445 8.337656-15.587949 11.028971-22.065166 15.761349-52.915939 13.75641-72.730516-6.061779l-150.897848-150.897848c-22.065166-22.065166-22.065166-57.832555 0-79.883271 22.054329-22.065166 57.821717-22.065166 79.886884 0l113.291695 113.28447 317.531758-306.192112c22.061554-22.061554 57.832555-22.061554 79.883271 0C846.954858 330.919692 846.954858 366.687081 824.889692 388.748635L824.889692 388.748635zM824.889692 388.748635",fill:a})))),d.default.createElement("p",{style:t},"验证成功"),u.qsParams.token?d.default.createElement(p.default,{types:"full",style:"width:50%;height:44px;",onTap:function(){e.onSuccDetailButtonClick()}},"详情查询"):null):d.default.createElement("div",{className:"finish-status fail"},d.default.createElement("i",{className:"import-fail-img"}),d.default.createElement("p",{className:"fail-desc",style:{marginBottom:"20px"}},this.props.desc),"YES"!=u.qsParams.notRetryOnFail&&1!=u.qsParams.notRetryOnFail?d.default.createElement(p.default,{types:"full",style:"width:50%;height:44px;",onTap:function(){e.retryButtonClick()}},"点击重试"):null),d.default.createElement("div",{className:"waiting-view"},d.default.createElement("div",{className:"waiting-gif"},o))}},{key:"retryButtonClick",value:function(){window.location.reload()}},{key:"retryButtonClick",value:function(){window.location.reload()}},{key:"onSuccDetailButtonClick",value:function(){if(void 0==u.qsParams.token)return void PG.alert("缺少token值");var e=this.props.taskInfo,t=(0,u.getENV)(),a="";a="test"==t?"http://192.168.0.11:8282":"pre"==t||"qa"==t?"https://qa.51datakey.com":"https://api.51datakey.com";var o="";switch(e.taskType){case"email":o=a+"/h5/resultV3/moxie.html#/emailResult?taskId="+e.taskId+"&token="+u.qsParams.token+"&mainTitle="+u.qsParams.mainTitle+"&icoUrl="+u.qsParams.icoUrl;break;case"bank":o=a+"/h5/resultV3/moxie.html#/bankResult/?taskId="+e.taskId+"&token="+u.qsParams.token+"&mainTitle="+u.qsParams.mainTitle+"&icoUrl="+u.qsParams.icoUrl;break;case"carrier":o=a+"/h5/resultV4/carrier/moxie.html?taskId="+e.account+"&token="+u.qsParams.token+"&mainTitle="+u.qsParams.mainTitle+"&icoUrl="+u.qsParams.icoUrl;break;case"shixin":o=a+"/h5/resultV4/shixin/moxie.html?taskId="+e.taskId+"&token="+u.qsParams.token+"&mainTitle="+u.qsParams.mainTitle+"&icoUrl="+u.qsParams.icoUrl;break;case"tax":o=a+"/h5/resultV4/tax/moxie.html?taskId="+e.taskId+"&token="+u.qsParams.token+"&mainTitle="+u.qsParams.mainTitle+"&icoUrl="+u.qsParams.icoUrl;break;case"zhixing":o=a+"/h5/resultV4/zhixing/moxie.html?taskId="+e.taskId+"&token="+u.qsParams.token+"&mainTitle="+u.qsParams.mainTitle+"&icoUrl="+u.qsParams.icoUrl;break;default:o=a+"/h5/resultV3/moxie.html#/"+e.taskType+"?taskId="+e.taskId+"&token="+u.qsParams.token+"&mainTitle="+u.qsParams.mainTitle+"&icoUrl="+u.qsParams.icoUrl}"test"==t?o+="&env=test":"pre"!=t&&"qa"!=t||(o+="&env="+t),window.location.href=o}}]),t}(d.default.Component));t.default=h,e.exports=t.default}).call(this)}finally{}},23:function(e,t,a){try{(function(){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var e="#58B5EB";t.DEFAULT_THEMECOLOR=e}).call(this)}finally{}},24:function(e,t,a){try{(function(){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var e={LOGIN:"LOGIN",RECEIVE:"RECEIVE",EXTRACT:"EXTRACT",STORE:"STORE",DONE:"DONE"};t.PHASE=e}).call(this)}finally{}},75:function(e,t,a){e.exports=a.p+"assets/dce45f5d.download.gif"},76:function(e,t,a){e.exports=a.p+"assets/a44566d4.invalid.png"},214:function(e,t,a){try{(function(){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var n=a(2),r=o(n),s=(a(1),a(9)),i=a(8),l=(o(i),a(4)),d=o(l),u=a(15),c=o(u),f=a(13),p=o(f),h=a(5),m=o(h),y=a(11),v=(o(y),a(18)),g=o(v),k=a(6),T=(o(k),a(7)),S=(o(T),a(41)),b=o(S),E=r.default.createClass({displayName:"ImportForm",getInitialState:function(){return{phoneInfo:null,unsupport:!1,showUnsupport:!1,isStart:!1,defaultUsername:"",frontConf:this.props.frontConf}},componentDidMount:function(){},componentWillUnmount:function(){this.unmount=!0},render:function(){var e=this.handleImport,t=this.state,a=t.unsupport,o=t.showUnsupport,n=t.isStart,s=(t.defaultUsername,this.props.pageConfig),i=c.default.get(this.props.taskType,0,0,0),l="";i&&i.loginParam&&(l=i.loginParam.phone);var d=o?r.default.createElement("div",{className:"carrier-unsupport"},r.default.createElement("i",null),r.default.createElement("p",null,a)):r.default.createElement("div",{className:"config-import-page"},r.default.createElement("div",{className:"form common-form"},r.default.createElement("div",{className:"input-item"},r.default.createElement(p.default,{type:"text",ref:"username",id:"zxUsername",placeholder:"请\b输入支付宝账号/邮箱/手机号",label:"账户名",defaultValue:l})),r.default.createElement("div",{className:"input-item"},r.default.createElement(p.default,{type:"password",ref:"password",id:"zxPassword",placeholder:"请输入登录密码",label:"密码"}))),r.default.createElement(b.default,{ref:"agreementField",uid:s.login_type,frontConf:this.state.frontConf}),r.default.createElement("div",{className:"page-wrapper"},r.default.createElement(m.default,{types:"full",onTap:e,disable:n,state:n,getState:function(e){switch(e){case!1:return"提交";case!0:return"登录中...";default:return"提交"}}})));return r.default.createElement("div",null,r.default.createElement(g.default,null,d))},handleImport:function(){var e=this,t=this.props,a=t.onSubmitTaskDone;if(t.pageConfig,this.state.phoneInfo,!this.refs.agreementField.isChecked(S.AGREEMENT_TYPE.MOXIE))return void setTimeout(function(){return d.default.alert("请勾选同意《用户使用协议》","")});if(!this.refs.agreementField.isChecked(S.AGREEMENT_TYPE.TENANT))return void setTimeout(function(){return d.default.alert("请勾选同意《用户使用协议》","")});var o=this.refs.username.getValue(),n=this.refs.password.getValue();if(!o)return void setTimeout(function(){return d.default.alert("请输入正确的登录名","")});if(!n)return void setTimeout(function(){return d.default.alert("请输入正确的登录密码","")});this.setState({isStart:!0});var r=void 0;(0,s.submitTaskHelper)({taskType:this.props.taskType,loginType:"pwd",username:o,password:n}).then(function(t){if(r=t,t.body.task_id){e.setState({isStart:!1}),d.default.refreshStatus("2","创建任务成功"),d.default.mxSaveTaskId(t.body.task_id);var n={taskId:t.body.task_id,username:o,mappingId:t.body.mapping_id,taskType:e.props.taskType,loginType:"pwd",loginParam:{phone:o}};a(n)}}).catch(function(t){e.setState({isStart:!1});var a=t&&t.response&&t.response.body||{};a.errors&&a.errors[0]&&(10220011===a.errors[0].code||10220012===a.errors[0].code)?(d.default.refreshStatus("-2",a.errors[0].message),e.showUnsupport(a.errors[0].message)):(d.default.refreshStatus("-3","服务异常，创建任务失败"),e.handleError(t,a.detail))})},handleError:function(e){var t=arguments.length<=1||void 0===arguments[1]?"任务提交失败":arguments[1];try{t=e&&e.body&&e.body.detail||t}catch(e){}if("任务提交失败"==t){if(e&&e.message&&e.message.indexOf("the network is offline")!=-1)return void d.default.alert("网络开小差啦，请稍后再试");d.default.alert(t+"\n"+e)}else d.default.alert(t);this.setState({isStart:!1})},showUnsupport:function(e){this.setState({unsupport:e||this.state.unsupport,showUnsupport:!0})}});t.default=E,e.exports=t.default}).call(this)}finally{}},805:function(e,t,a){try{(function(){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}function n(e,t){var a={};for(var o in e)t.indexOf(o)>=0||Object.prototype.hasOwnProperty.call(e,o)&&(a[o]=e[o]);return a}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function s(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var i=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var o in a)Object.prototype.hasOwnProperty.call(a,o)&&(e[o]=a[o])}return e},l=function(){function e(e,t){for(var a=0;a<t.length;a++){var o=t[a];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,a,o){return a&&e(t.prototype,a),o&&e(t,o),t}}(),d=function(e,t,a){for(var o=!0;o;){var n=e,r=t,s=a;o=!1,null===n&&(n=Function.prototype);var i=Object.getOwnPropertyDescriptor(n,r);if(void 0!==i){if("value"in i)return i.value;var l=i.get;if(void 0===l)return;return l.call(s)}var d=Object.getPrototypeOf(n);if(null===d)return;e=d,t=r,a=s,o=!0,i=d=void 0}},u=a(2),c=o(u),f=a(1),p=a(59),h=o(p),m=a(19),y=o(m),v=a(9),g=a(214),k=o(g),T=a(13),S=(o(T),a(5)),b=o(S),E=a(8),I=o(E),w=a(6),P=o(w),C=a(7),O=o(C),q=a(14),x=o(q),_=a(11),N=(o(_),a(21)),D=o(N),A=a(24),U=a(17),L=a(15),M=o(L),j=a(22),V=o(j),F=a(10),Q=o(F),z=a(39),B=a(12),G=o(B),R="AlipayQRCodeTask",W="alipay",H="验证完成",K="此次尝试失败，请重试",J=function(e){function t(e,t){r(this,o),d(Object.getPrototypeOf(o.prototype),"constructor",this).call(this,e,t),this.state={selectedIndex:1,taskStatus:U.TASK_STATUS.DEFAULT,isLoginDone:!1,isScanned:!1,showSpiner:!1,qrCodeTaskInfo:null,taskInfo:null,showQRCodeInstruction:!1,qrcodeValue:null,qrcodeTimeout:!1,stopPollingQrcode:!1,hasCreatedQrCodeTask:!1,frontConf:G.default.frontConf[G.default.taskType]}}s(t,e),l(t,null,[{key:"propTypes",value:{showVCodeModal:u.PropTypes.func,hideVCodeModal:u.PropTypes.func},enumerable:!0}]),l(t,[{key:"componentDidMount",value:function(){PG.refreshTitle("支付宝登录")}},{key:"componentWillUnmount",value:function(){this.unmounted=!0,this.state.isLoginDone&&storage.removeItem(R)}},{key:"render",value:function(){var e=this,t=n(this.props,[]),o=void 0;return o=this.state.isLoginDone?this.state.taskStatus==U.TASK_STATUS.DEFAULT?c.default.createElement(D.default,{desc:this.state.desc}):c.default.createElement(V.default,{succ:this.state.taskStatus==U.TASK_STATUS.SUCC,taskInfo:this.state.taskInfo||this.state.qrCodeTaskInfo,desc:this.state.desc}):c.default.createElement("div",null,c.default.createElement(h.default,{selectedIndex:this.state.selectedIndex,onIndexChange:this.onIndexChange.bind(this)},c.default.createElement("div",{key:0,title:"扫码登录"},c.default.createElement("div",{className:"qrcode-login"},c.default.createElement("div",{className:"qrcode-title"},function(){return null==e.state.qrcodeValue?0==e.state.qrcodeTimeout?"正在获取二维码":"二维码超时":"扫码授权"}()),c.default.createElement("div",{className:"qrcode-content"},this.state.qrcodeValue?c.default.createElement(Q.default,{onPress:function(){e.onPressImg(e.state.qrcodeValue)}},c.default.createElement("div",null,c.default.createElement("img",{className:"qrcode-image",src:"data:image/png;base64,"+this.state.qrcodeValue}))):c.default.createElement(Q.default,{onTap:function(){e.state.qrcodeTimeout&&e.createAlipayQrcodeTask()}},c.default.createElement("div",{className:"qrcode-image"},this.state.qrcodeTimeout?c.default.createElement("div",{className:"qrcode-retry-button"},"点击重新获取"):null)),function(){return null==e.state.qrcodeValue?0==e.state.qrcodeTimeout?c.default.createElement("img",{className:"qrcode-center",src:a(949)}):c.default.createElement(Q.default,{onTap:function(){e.state.qrcodeTimeout&&e.createAlipayQrcodeTask()}},c.default.createElement("img",{className:"qrcode-center",src:a(76)})):null}(),this.state.qrcodeValue||this.state.qrcodeTimeout?null:c.default.createElement("img",{className:"qrcode-center-circle",src:a(75)})),c.default.createElement("div",{className:"qrcode-instruction"},c.default.createElement("div",{className:"qrcode-instruction-text"},PG.Device.Mobile?PG.Device.Wechat?"1.长按或截图保存二维码\r\n2.打开支付宝进行扫码授权\r\n3.扫码后请稍作等待":"1.长按或截图保存二维码\r\n2.请点击扫一扫进行扫码授权\r\n3.扫码后请稍作等待":"1.请打开手机支付宝扫码\r\n2.扫码后请稍作等待")),this.state.qrcodeValue?c.default.createElement("div",{className:"vcode-dialog-body-operation",style:{padding:0}},c.default.createElement("div",{className:"operation-main"},c.default.createElement(b.default,{types:"small outline",onTap:function(){e.setState({showQRCodeInstruction:!0})}},"查看指引"),PG.Device.Mobile&&!PG.Device.Wechat?c.default.createElement(b.default,{types:"small outline",onTap:function(){window.location.href="alipayqr://platformapi/startapp?saId=10000007"}},"扫一扫"):null)):null)),c.default.createElement("div",{key:1,title:"支付宝账号"},c.default.createElement(k.default,i({taskType:W,frontConf:this.state.frontConf,pageConfig:{login_type:"account"},defaultUsername:"",onSubmitTaskDone:this.onSubmitTaskDone.bind(this)},t)))),1==this.state.selectedIndex&&this.state.taskInfo&&this.state.showSpiner||0==this.state.selectedIndex&&this.state.isScanned&&this.state.showSpiner&&this.state.qrcodeValue?c.default.createElement(x.default,{color:"#fff",showTips:this.state.desc}):null,this.state.showQRCodeInstruction?c.default.createElement("div",{className:"vcode-tips-bg",onClick:function(){e.setState({showQRCodeInstruction:!1})}},c.default.createElement("div",{className:"iknow-button"},"我知道了"),this.renderInstructionView()):null),c.default.createElement("div",{className:"import-carrier"},c.default.createElement("div",{className:"mx-view"},"NO"==f.qsParams.showTitleBar||0==f.qsParams.showTitleBar||PG.Device.SDK?null:c.default.createElement("div",{style:{height:"NO"==f.qsParams.showTitleBar||0==f.qsParams.showTitleBar||PG.Device.SDK?0:44}},c.default.createElement(P.default,{title:"支付宝登录",left:c.default.createElement(O.default,{onTap:function(){I.default.call(e)}},c.default.createElement("i",{className:"ion-chevron-left"}))})),o))}},{key:"renderInstructionView",value:function(){return PG.Device.Mobile?c.default.createElement("div",{className:"instruction-view"},c.default.createElement("div",{className:"instruction-view-card"},c.default.createElement("div",{className:"text1"},"第一步"),c.default.createElement("div",{className:"text2"},"长按或截图保存二维码"),c.default.createElement("img",{src:a(264)})),PG.Device.Wechat?c.default.createElement("div",{className:"instruction-view-card"},c.default.createElement("div",{className:"text1"},"第二步"),c.default.createElement("div",{className:"text2"},"打开支付宝的扫一扫功能"),c.default.createElement("img",{src:a(169)})):c.default.createElement("div",{className:"instruction-view-card"},c.default.createElement("div",{className:"text1"},"第二步"),c.default.createElement("div",{className:"text2"},"点击扫一扫跳转支付宝"),c.default.createElement("img",{src:a(265)})),c.default.createElement("div",{className:"instruction-view-card"},c.default.createElement("div",{className:"text1"},"第三步"),c.default.createElement("div",{className:"text2"},"打开相册，扫描二维码"),c.default.createElement("img",{src:a(266)}))):c.default.createElement("div",{className:"instruction-view",style:{width:"100%"}},c.default.createElement("div",{className:"instruction-view-card",style:{width:"100%"}},c.default.createElement("div",{className:"text2"},"打开支付宝的扫一扫功能进行扫描"),c.default.createElement("img",{src:a(169)})))}},{key:"onIndexChange",value:function(e){var t=this.state.selectedIndex==e;if(this.setState({selectedIndex:e,showSpiner:!1}),0==e){var a=storage.getItem(R)?JSON.parse(storage.getItem(R)):null;a?(this.setState({qrCodeTaskInfo:a,showSpiner:!1}),!t&&a&&this.startPoll(a)):this.createAlipayQrcodeTask()}}},{key:"onPressImg",value:function(e){try{"function"==typeof window.mxPostMessage&&window.mxPostMessage(JSON.stringify({type:"mxSaveImg",value:e,succText:"保存成功，请点击扫一扫进行扫码",failText:"保存失败，请截图后进行扫码"}))}catch(e){}}},{key:"createAlipayQrcodeTask",value:function(){var e=this;this.setState({qrcodeTimeout:!1,hasCreatedQrCodeTask:!0});var t=void 0;(0,v.submitTaskHelper)({taskType:W,loginType:"qrcode"}).then(function(a){if(t=a,a.body.task_id){var o={taskId:a.body.task_id,mappingId:a.body.mapping_id,taskType:W,loginType:"qrcode"};storage.setItem(R,JSON.stringify(o)),e.props.hideVCodeModal(),e.setState({qrCodeTaskInfo:o,showSpiner:!1}),e.startPoll(o)}}).catch(function(t){var a=t&&t.response&&t.response.body||{};a.errors&&a.errors[0]&&(10220011===a.errors[0].code||10220012===a.errors[0].code)?(PG.refreshStatus("-2",a.errors[0].message),e.showUnsupport(a.errors[0].message)):(PG.refreshStatus("-3","服务异常，创建二维码任务失败"),e.handleError(t,a.detail))})}},{key:"onSubmitTaskDone",value:function(e){this.props.hideVCodeModal(),this.setState({taskInfo:e,showSpiner:!0}),this.startPoll(e)}},{key:"handleError",value:function(e){var t=arguments.length<=1||void 0===arguments[1]?"任务提交失败":arguments[1];console.log(e);try{t=e&&e.body&&e.body.detail||t}catch(e){}if("任务提交失败"==t){if(e&&e.message&&e.message.indexOf("the network is offline")!=-1)return void PG.alert("网络开小差啦，请稍后再试");PG.alert(t+"\n"+e)}else PG.alert(t);this.setState({isStart:!1})}},{key:"startPoll",value:function(e){var t=this;(0,y.default)({task:e,isLogin:!1,callbacks:{waitCode:this.initVCode.bind(this),doneLogin:this.doneLogin.bind(this),doneSucc:this.onSucc.bind(this),doneFail:this.onFail.bind(this),doneTimeout:this.onFail.bind(this),doing:this.doing.bind(this),pendingTimeout:this.onPendingTimeout.bind(this),error:this.onError.bind(this),hideQrCode:this.hideQrCode.bind(this),doneScan:function(){t.setState({isScanned:!0,showSpiner:!0})}}})}},{key:"hideQrCode",value:function(){this.setState({showQrcodeInCrawlStatus:!1})}},{key:"initVCode",value:function(e,t){var a=this;return this.unmounted||1==this.state.selectedIndex&&"qrcode"==e.loginType?(this.setState({stopPollingQrcode:!0}),!0):"qrcode"!=e.loginType&&!this.state.taskInfo||("qrcode"!=t.input.type&&this.setState({showSpiner:!1}),"qrcode"==t.input.type&&"qrcode"==e.loginType&&"LOGIN"==t.phase?(this.setState({showSpiner:!1}),this.setState({qrcodeValue:t.input.value})):this.props.showVCodeModal({title:"验证码",desc:t.description,waitSeconds:0,type:t.input.type,imgSrc:"img"==t.input.type||"qrcode"==t.input.type?t.input.value:"",onConfirm:function(t){a.submitVCode(t,e),a.setState({showSpiner:!0})},onCancel:function(){a.storeLoginInfo(e,!0),a.setState({taskInfo:null,showSpiner:!1})}}),this.updateState(e,t),!("qrcode"==e.loginType&&"qrcode"==t.input.type&&this.state.qrCodeTaskInfo||"qrcode"==t.input.type&&this.state.taskInfo))}},{key:"submitVCode",value:function(e,t){var a=this;(0,v.submitVCode)(e,t).catch(function(e){console.log(e)}).then(function(){return a.startPoll(t)})}},{key:"doing",value:function(e,t){return this.unmounted||1==this.state.selectedIndex&&"qrcode"==e.loginType?(this.setState({stopPollingQrcode:!0}),!0):(this.props.hideVCodeModal(),void this.updateState(e,t))}},{key:"doneLogin",value:function(e,t){("qrcode"==e.loginType&&"DONE"==t.phase&&"DONE_SUCC"==t.phase_status||"DONE_FAIL"==t.phase_status)&&storage.removeItem(R),"qrcode"==e.loginType&&"DONE_TIMEOUT"==t.phase_status||(this.updateState(e,t),this.setState({isLoginDone:!0}))}},{key:"updateState",value:function(e,t){this.setState({phase:t.phase,desc:t.description,isLoginDone:t.phase!==A.PHASE.LOGIN})}},{key:"storeLoginInfo",value:function(e){var t=!(arguments.length<=1||void 0===arguments[1])&&arguments[1];"qrcode"!=e.loginType&&"alipayQrcode"!=e.taskType||storage.removeItem(R),this.props.params.cardType||f.qsParams.cardType,void 0==e.bankId&&(e.bankId=0),void 0==e.loginModel&&(e.loginModel=0),void 0==e.loginType&&(e.loginType=0),M.default.set(e.taskType,0,0,e.loginType,{loginParam:e.loginParam,loginFail:t})}},{key:"onSucc",value:function(e,t){return this.storeLoginInfo(e),this.unmounted||1==this.state.selectedIndex&&"qrcode"==e.loginType?(this.setState({stopPollingQrcode:!0}),!0):(this.props.hideVCodeModal(),t.description=H,this.updateState(e,t),
void this.setState({taskStatus:U.TASK_STATUS.SUCC}))}},{key:"onFail",value:function(e,t){return this.storeLoginInfo(e,!0),this.unmounted||1==this.state.selectedIndex&&"qrcode"==e.loginType?(this.setState({stopPollingQrcode:!0}),!0):(this.props.hideVCodeModal(),"qrcode"==e.loginType&&"DONE_TIMEOUT"==t.phase_status&&"RECEIVE"!=t.phase?(this.setState({desc:t.description,qrcodeValue:null,qrcodeTimeout:!0,qrCodeTaskInfo:null,isScanned:!1}),void(0==this.state.hasCreatedQrCodeTask&&this.createAlipayQrcodeTask())):(t.phase!=A.PHASE.LOGIN&&this.setState({taskStatus:U.TASK_STATUS.FAIL,desc:t.description}),"qrcode"==e.loginType?this.setState({qrCodeTaskInfo:null,isScanned:!1}):this.setState({taskInfo:null}),void this.setState({showSpiner:!1})))}},{key:"onPendingTimeout",value:function(e){return this.storeLoginInfo(e),this.unmounted||1==this.state.selectedIndex&&"qrcode"==e.loginType?(this.setState({stopPollingQrcode:!0}),!0):(this.props.hideVCodeModal(),this.setState({taskStatus:U.TASK_STATUS.FAIL,desc:K}),"qrcode"==e.loginType?this.setState({qrCodeTaskInfo:null,isScanned:!1}):this.setState({taskInfo:null}),void this.setState({showSpiner:!1}))}},{key:"onError",value:function(e,t){return this.storeLoginInfo(e,!0),this.unmounted||1==this.state.selectedIndex&&"qrcode"==e.loginType?(this.setState({stopPollingQrcode:!0}),!0):(this.props.hideVCodeModal(),console.log(t),this.setState({taskStatus:U.TASK_STATUS.FAIL,desc:"服务异常,请稍后再试"}),"qrcode"==e.loginType?this.setState({qrCodeTaskInfo:null,isScanned:!1}):this.setState({taskInfo:null}),void this.setState({showSpiner:!1}))}},{key:"handleBack",value:function(){(this.state.isLoginDone||this.state.isFail)&&(f.qsParams.backUrl||f.qsParams.back_url)?quitBack({taskType:W}):(this.unmounted=!0,I.default.call(this))}}]);var o=t;return t=(0,z.observer)(t)||t}(c.default.Component);t.default=J,e.exports=t.default}).call(this)}finally{}},949:function(e,t,a){e.exports=a.p+"assets/b3732342.alipay-logo.png"}});
