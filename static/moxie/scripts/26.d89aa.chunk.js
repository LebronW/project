webpackJsonp([26,41],{14:function(e,t,n){try{(function(){"use strict";function s(e){return e&&e.__esModule?e:{default:e}}function a(e,t){var n={};for(var s in e)t.indexOf(s)>=0||Object.prototype.hasOwnProperty.call(e,s)&&(n[s]=e[s]);return n}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var s=t[n];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(e,s.key,s)}}return function(t,n,s){return n&&e(t.prototype,n),s&&e(t,s),t}}(),l=function(e,t,n){for(var s=!0;s;){var a=e,o=t,r=n;s=!1,null===a&&(a=Function.prototype);var i=Object.getOwnPropertyDescriptor(a,o);if(void 0!==i){if("value"in i)return i.value;var l=i.get;if(void 0===l)return;return l.call(r)}var u=Object.getPrototypeOf(a);if(null===u)return;e=u,t=o,n=r,s=!0,i=u=void 0}},u=n(2),d=s(u),c=n(16),f=n(10),p=(s(f),n(1)),h=function(e){function t(e,n){o(this,t),l(Object.getPrototypeOf(t.prototype),"constructor",this).call(this,e,n),this.state={}}return r(t,e),i(t,[{key:"componentDidMount",value:function(){}},{key:"render",value:function(){var e=this.props,t=e.showTips,n=e.showOrHideSpinner,s=e.size,o=e.color,r=e.boxSize,i=(a(e,["showTips","showOrHideSpinner","size","color","boxSize"]),{display:n,width:"100%",maxWidth:p.qsParams.maxWidth?p.qsParams.maxWidth:"800px",height:p.qsParams.height?p.qsParams.height+"px":"100%",position:"fixed",right:0,bottom:0,margin:"0 auto",left:0,top:0,zIndex:996,background:"rgba(0,0,0,.4)"});return d.default.createElement("div",{style:i},d.default.createElement("div",{className:"SpinerBox",style:{overflow:"hidden",background:"rgba(22,22,22,0.8)",position:"absolute",top:"40%",left:"50%",width:""+r,height:""+r,borderRadius:"10px"}},d.default.createElement("div",{className:"newSpiner",style:{top:t?r/6+"px":(r-s)/2+"px"}},d.default.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 32 32",width:s,height:s,fill:o},d.default.createElement("path",{opacity:".25",d:"M16 0 A16 16 0 0 0 16 32 A16 16 0 0 0 16 0 M16 4 A12 12 0 0 1 16 28 A12 12 0 0 1 16 4"}),d.default.createElement("path",{d:"M16 0 A16 16 0 0 1 32 16 L28 16 A12 12 0 0 0 16 4z"}))),d.default.createElement("div",{style:{color:"#fff",textAlign:"center",width:"100%",fontSize:"13px",position:"absolute",top:""+2*r/3}},t)))}}]),t}(d.default.Component);t.default=h,h.contextTypes={history:function(){return c.PropTypes.history}},h.defaultProps={boxSize:120,size:48,showTips:"正在加载",color:"#fff"},e.exports=t.default}).call(this)}finally{}},51:function(e,t,n){try{(function(){"use strict";function s(e){return e&&e.__esModule?e:{default:e}}function a(e){var t="";return"login"==e.tasktype?t=l.default.zhengxinNewLogin:"creatLoginTask"==e.tasktype?t=l.default.zhengXinNewLoginTask:"loginImgcode"==e.tasktype?t=l.default.zhengxinNewLogImgCode:"creatRegistTask"==e.tasktype?t=l.default.zhengXinNewRegistTask:"registImgcode"==e.tasktype?t=l.default.zhengxinNewRegImgCode:"registStep1"==e.tasktype?t=l.default.zhengxinNewRegStep1:"registStep2"==e.tasktype?t=l.default.zhengxinNewRegStep2:"registStep2ActCode"==e.tasktype?t=l.default.zhengxinNewRegActCode:"zhengxinReportApply"==e.tasktype?t=l.default.zhengxinReportApply:"submitAnswerResult"==e.tasktype?t=l.default.zhengxinReportAnswer:"zhengxinReportSms"==e.tasktype?t=l.default.zhengxinReportSms:"zhengxinfindLoginName"==e.tasktype?t=l.default.zhengxinfindLoginName:"zhengXinfindLogNameTask"==e.tasktype?t=l.default.zhengXinfindLogNameTask:"zhengxinFindLogNameImgCode"==e.tasktype?t=l.default.zhengxinFindLogNameImgCode:"zhengxinResetPwdTask"==e.tasktype?t=l.default.zhengxinResetPwdTask:"zhengxinresetPwdImgCode"==e.tasktype?t=l.default.zhengxinresetPwdImgCode:"zhengxinresetPwdidentyVerify"==e.tasktype?t=l.default.zhengxinresetPwdidentyVerify:"zhengxinresetPwdactCode"==e.tasktype?t=l.default.zhengxinresetPwdactCode:"zhengxinresetPwdupdatepwd"==e.tasktype?t=l.default.zhengxinresetPwdupdatepwd:"zhengxinresetPwdanswerquestion"==e.tasktype&&(t=l.default.zhengxinresetPwdanswerquestion),r.request.post(t).set(o({},d.default.addDefaultHeaders())).set("Content-Type","application/json").set("Accept","application/json").set("Cache-Control","no-store").send(e.requestParams)}Object.defineProperty(t,"__esModule",{value:!0});var o=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var s in n)Object.prototype.hasOwnProperty.call(n,s)&&(e[s]=n[s])}return e};t.default=a;var r=n(1),i=n(27),l=s(i),u=n(12),d=s(u);e.exports=t.default}).call(this)}finally{}},844:function(e,t,n){try{(function(){"use strict";function t(e){return e&&e.__esModule?e:{default:e}}function s(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var o=function(){function e(e,t){for(var n=0;n<t.length;n++){var s=t[n];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(e,s.key,s)}}return function(t,n,s){return n&&e(t.prototype,n),s&&e(t,s),t}}(),r=function(e,t,n){for(var s=!0;s;){var a=e,o=t,r=n;s=!1,null===a&&(a=Function.prototype);var i=Object.getOwnPropertyDescriptor(a,o);if(void 0!==i){if("value"in i)return i.value;var l=i.get;if(void 0===l)return;return l.call(r)}var u=Object.getPrototypeOf(a);if(null===u)return;e=u,t=o,n=r,s=!0,i=u=void 0}},i=n(2),l=t(i),u=n(16),d=n(1),c=n(12),f=t(c),p=n(51),h=t(p),m=n(10),g=t(m),y=n(14),x=t(y),w=n(8),v=t(w),b=n(6),z=t(b),k=n(7),T=t(k),_=n(30),P=t(_),S=n(72),E=t(S),N=/^[a-zA-Z0-9\-_\/]{6,16}$/,O=/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/,C=/^[1][3,4,5,7,8][0-9]{9}$/,I=function(e){function t(e,a){s(this,t),r(Object.getPrototypeOf(t.prototype),"constructor",this).call(this,e,a),this.state={bgImg:"url("+n(20)+")",Type:"password",confirm:"password",confirmBgImg:"url("+n(20)+")",tips:"",showTips:"none",vcodeLimited:!1,taskId:"",tcId:"",showspinner:"none",themeColor:d.qsParams.themeColor?"#"+d.qsParams.themeColor:"#c11000"}}return a(t,e),o(t,[{key:"componentWillMount",value:function(){clearTimeout(this.timer)}},{key:"componentDidMount",value:function(){PG.refreshTitle("征信注册"),this.setState({taskId:storage.getItem("zhengxinRegisterTaskid")})}},{key:"render",value:function(){var e=this;return this.context.history.pushState,l.default.createElement("div",{className:"zx-new mx-view"},"NO"==d.qsParams.showTitleBar||0==d.qsParams.showTitleBar||PG.Device.SDK?null:l.default.createElement("div",{style:{height:"NO"==d.qsParams.showTitleBar||PG.Device.SDK?0:44}},l.default.createElement(z.default,{title:"征信报告查询",left:l.default.createElement(T.default,{onTap:function(){v.default.call(e)}},l.default.createElement("i",{className:"ion-chevron-left"}))})),l.default.createElement(x.default,{showOrHideSpinner:this.state.showspinner}),l.default.createElement("div",{className:"zx_register_title"},"人行征信个人信用信息服务平台"),l.default.createElement("div",{style:{background:"#fff",fontSize:"14px"}},l.default.createElement("div",{className:"",style:{padding:"10px 15px",borderBottom:"1px solid #c11000",fontSize:"18px",color:"#858585",borderColor:this.state.themeColor}},"补充用户资料"),l.default.createElement("div",{className:"new_zx_inputBox"},l.default.createElement(E.default,{ref:"zx_userName",onBlur:function(){e.setState({thips:"",showTips:"none"})},onFocus:this.showTips.bind(this,"zx_userName"),type:"text",placeholder:"请输入登录名"}),l.default.createElement(E.default,{ref:"zx_pwd",onBlur:function(){e.setState({thips:"",showTips:"none"})},onFocus:this.showTips.bind(this,"zx_pwd"),type:this.state.Type,placeholder:"请输入登录密码"}),l.default.createElement(E.default,{ref:"zx_pwd_confirm",onFocus:function(){e.setState({tips:"",showTips:"none"})},type:this.state.confirm,placeholder:"请再次确认密码"}),l.default.createElement(E.default,{ref:"zx_phone",type:"text",onFocus:function(){e.setState({tips:"",showTips:"none"})},placeholder:"请输入手机号"}),l.default.createElement("div",{style:{position:"relative"},className:"zx_verify_code"},l.default.createElement(E.default,{ref:"zx_actCode",type:"text",onFocus:function(){e.setState({tips:"",showTips:"none"})},placeholder:"请输入动态码"}),l.default.createElement(g.default,{onTap:this.getActiveCode.bind(this)},l.default.createElement("div",{style:{position:"absoulte",right:"48px"},className:"zx_refresh_code"},l.default.createElement("span",{ref:"actHtml",style:{width:"80px"},className:"zx_refresh"},"获取动态码")))),l.default.createElement("div",{style:{display:this.state.showTips,padding:" 10px 15px 0"},className:"zx_tip"},this.state.tips),l.default.createElement("div",{className:"zx_btn"},l.default.createElement(g.default,{onTap:this.nextStep.bind(this)},l.default.createElement("button",{style:{backgroundColor:this.state.themeColor,marginTop:"20px"}},"下一步")),l.default.createElement(g.default,{onTap:function(){v.default.call(e)}},l.default.createElement("button",null,"上一步")))),l.default.createElement("div",{className:"zx_regPro"},l.default.createElement("div",{style:{borderColor:this.state.themeColor},className:"zx_regPro_title"},"注册流程"),l.default.createElement("div",{className:"zx_regPro_details"},l.default.createElement("span",null,"填写身份信息 > "),l.default.createElement("span",null,"补充用户资料 > "),l.default.createElement("span",null,"完成注册")))),l.default.createElement("div",{className:"zx_footer"},"本平台数据来源为中国人民银行征信中心"))}},{key:"showTips",value:function(e){"zx_userName"==e?this.setState({tips:"登录名由6-16位数字、字母、“_”、“-”、“/”组成，不含特殊字符，如：%、@、#、空格等",showTips:"block"}):"zx_pwd"==e&&this.setState({tips:"密码长度必须在6-20之间，可以使用数字、小写字母和大写字母，但必须同时包含数字和字母。",showTips:"block"})}},{key:"nextStep",value:function(){var e=this;if(!N.test(this.refs.zx_userName.getValue()))return this.setState({tips:"登录名格式不正确!",showTips:"block"}),!1;if(!O.test(this.refs.zx_pwd.getValue()))return this.setState({tips:"密码格式不正确!",showTips:"block"}),!1;if(this.refs.zx_pwd_confirm.getValue()!=this.refs.zx_pwd.getValue()&&""!=this.refs.zx_pwd_confirm.getValue())return this.setState({tips:"两次密码不一致!",showTips:"block"}),!1;if(!C.test(this.refs.zx_phone.getValue()))return this.setState({tips:"手机号格式不正确!",showTips:"block"}),!1;if(""==this.refs.zx_actCode.getValue().Trim())return this.setState({tips:"请输入动态码！",showTips:"block"}),!1;this.setState({showspinner:"block"});var t={tasktype:"registStep2",requestParams:{mobile:this.refs.zx_phone.getValue().Trim(),passWord:this.refs.zx_pwd.getValue().Trim(),taskId:this.state.taskId,tcId:this.state.tcId,userId:f.default.userId,userName:this.refs.zx_userName.getValue().Trim(),verifyCode:this.refs.zx_actCode.getValue().Trim()}};(0,h.default)(t).then(function(n){if(e.setState({showspinner:"none"}),0!=n.body.code||"YES"!=d.qsParams.quitOnRegisterDone&&1!=d.qsParams.quitOnRegisterDone){if(0==n.body.code){var s={};s.userName=t.nameInput,s.password=t.pwdInput,storage.setItem("userInfo",JSON.stringify(s)),PG.alert(n.body.message),e.context.history.go(-2)}else if(11==n.body.code||10==n.body.code)e.setState({tips:n.body.message,showTips:"block"});else if(1==n.body.code||15==n.body.code)return e.context.history.go(-1),PG.alert(n.body.message),!1}else PG.alert(n.body.message),setTimeout(function(){(0,P.default)({taskType:"zhengxin"})},2e3)}).catch(function(t){e.setState({showspinner:"none"});var n=t.body?t.body.detail:"网络异常，请稍后再试"+t;PG.alert(n)})}},{key:"timeInterval",value:function(e){var t=this;this.refs.actHtml.innerHTML=e+"s重发",this.timer=setTimeout(function(){return 1==e?(t.refs.actHtml.innerHTML="获取动态码",void t.setState({vcodeLimited:!1})):(e--,void t.timeInterval(e))},1e3)}},{key:"getActiveCode",value:function(){var e=this;if(!C.test(this.refs.zx_phone.getValue().Trim()))return void this.setState({tips:"请输入正确的手机号!",showTips:"block"});var t={tasktype:"registStep2ActCode",requestParams:{taskId:this.state.taskId,userId:f.default.userId,mobile:this.refs.zx_phone.getValue().Trim()}};if(!this.state.vcodeLimited){this.setState({vcodeLimited:!0});var n=30;this.timeInterval(n),(0,h.default)(t).then(function(t){e.setState({tips:t.body.message,showTips:"block"}),15==t.body.code&&(PG.alert(t.body.message),e.context.history.go(-1)),0==t.body.code&&e.setState({tcId:t.body.tcid})}).catch(function(e){var t=e.body?e.body.detail:"网络异常，请稍后再试"+e;PG.alert(t)})}}}]),t}(l.default.Component);I.contextTypes={history:u.PropTypes.history},e.exports=I}).call(this)}finally{}}});