webpackJsonp([57],{223:function(e,t,a){try{(function(){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var n=function(){function e(e,t){var a=[],r=!0,n=!1,s=void 0;try{for(var o,l=e[Symbol.iterator]();!(r=(o=l.next()).done)&&(a.push(o.value),!t||a.length!==t);r=!0);}catch(e){n=!0,s=e}finally{try{!r&&l.return&&l.return()}finally{if(n)throw s}}return a}return function(t,a){if(Array.isArray(t))return t;if(Symbol.iterator in Object(t))return e(t,a);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),s=a(2),o=r(s),l=a(1),u=a(9),i=a(8),d=r(i),f=a(4),c=r(f),m=a(15),p=r(m),h=a(13),g=r(h),y=a(5),v=r(y),E=a(11),b=(r(E),a(18)),w=r(b),S=a(6),T=r(S),k=a(7),I=r(k),N=a(41),x=r(N),P=o.default.createClass({displayName:"ImportForm",propTypes:{setTaskStore:s.PropTypes.func},getInitialState:function(){return{phoneInfo:null,unsupport:!1,showUnsupport:!1,isStart:!1,defaultUsername:"",Type:"password",bgImg:"url("+a(20)+")",frontConf:this.props.frontConf}},componentDidMount:function(){},componentWillUnmount:function(){this.unmount=!0},render:function(){var e=this,t=this.handleImport,a=(this.handleProtocol,this.state),r=a.unsupport,n=a.showUnsupport,s=a.isStart,l=(a.defaultUsername,a.defaultCode,p.default.get("jingdong",0,0,0)),u="";l&&l.loginParam&&(u=l.loginParam.phone);var i=o.default.createElement(I.default,{onTap:d.default.bind(this,null)},o.default.createElement("i",{className:"ion-chevron-left"})),f=("YES"==this.props.isWeb?o.default.createElement(T.default,{title:"京东",left:i}):null,n?o.default.createElement("div",{className:"carrier-unsupport"},o.default.createElement("i",null),o.default.createElement("p",null,r)):o.default.createElement("div",{className:"config-import-page"},o.default.createElement("div",{className:"form common-form"},o.default.createElement("div",{className:"input-item"},o.default.createElement(g.default,{type:"text",ref:"username",id:"zxUsername",placeholder:"请输入邮箱/用户名/已验证手机号",label:"账户名",defaultValue:u}),o.default.createElement("div",{onClick:function(){return e.clearValue("#zxUsername")},className:"tex_box name"},o.default.createElement("span",{className:"textt"}))),o.default.createElement("div",{className:"input-item"},o.default.createElement(g.default,{type:this.state.Type,ref:"password",id:"zxPassword",placeholder:"请输入登录密码",label:"密码"}),o.default.createElement("div",{onClick:this.showPwd,className:"tex_box"},o.default.createElement("span",{style:{backgroundImage:this.state.bgImg},className:"password password_show"})))),o.default.createElement(x.default,{ref:"agreementField",uid:"0",frontConf:this.state.frontConf}),o.default.createElement("div",{className:"page-wrapper"},o.default.createElement(v.default,{types:"full",onTap:t,disable:!!s,state:s,getState:function(e){switch(e){case!1:return"提交";case!0:return"登录中...";default:return"提交"}}}))));return o.default.createElement("div",null,o.default.createElement(w.default,null,f))},clearValue:function(e){document.querySelector(e).parentNode.querySelector("input").value=""},showPwd:function(){"text"==this.state.Type?this.setState({Type:"password",bgImg:"url("+a(20)+")"}):this.setState({Type:"text",bgImg:"url("+a(37)+")"})},handleImport:function(){var e=this;if(!this.refs.agreementField.isChecked(N.AGREEMENT_TYPE.MOXIE))return void setTimeout(function(){return c.default.alert("请勾选同意《用户使用协议》","")});if(!this.refs.agreementField.isChecked(N.AGREEMENT_TYPE.TENANT))return void setTimeout(function(){return c.default.alert("请勾选同意《用户使用协议》","")});var t=this.props.onSubmitTaskDone,a=(this.state.phoneInfo,this.refs.username.getValue()),r=this.refs.password.getValue();if(!a)return void setTimeout(function(){return c.default.alert("请输入正确的登录名","")});if(!r)return void setTimeout(function(){return c.default.alert("请输入正确的登录密码","")});this.setState({isStart:!0});var n=void 0;(0,u.submitTaskHelper)({taskType:"jingdong",username:a,password:r}).then(function(r){if(n=r,r.body.task_id){e.setState({isStart:!1}),c.default.refreshStatus("2","创建任务成功"),c.default.mxSaveTaskId(r.body.task_id);var s={taskId:r.body.task_id,username:a,mappingId:r.body.mapping_id,taskType:"jingdong",loginParam:{phone:a}};t(s)}}).catch(function(t){e.setState({isStart:!1});var a=t&&t.response&&t.response.body||{};a.errors&&a.errors[0]&&(10220011===a.errors[0].code||10220012===a.errors[0].code)?(c.default.refreshStatus("-2",a.errors[0].message),e.showUnsupport(a.errors[0].message)):(c.default.refreshStatus("-3","服务异常，创建任务失败"),e.handleError(t,a.detail))})},handleError:function(e){var t=arguments.length<=1||void 0===arguments[1]?"任务提交失败":arguments[1];try{t=e&&e.body&&e.body.detail||t}catch(e){}if("任务提交失败"==t){if(e&&e.message&&e.message.indexOf("the network is offline")!=-1)return void c.default.alert("网络开小差啦，请稍后再试");c.default.alert(t+"\n"+e)}else c.default.alert(t);this.setState({isStart:!1})},handleTanentProtocol:function(){var e=l.qsParams.tenantAgreementUrl||this.state.frontConf.tenantAgreementUrl;c.default.openWebView("用户使用协议",e,"","agreement")},handleProtocol:function(){var e=l.qsParams.agreementUrl||this.state.frontConf.agreementUrl;c.default.openWebView("用户使用协议",e,"","agreement")},handleForgetSMS:function(e){var t=n(e,3),a=t[0],r=t[1],s=t[2];c.default.confirm(r,"","取消,发送",function(e){2==e&&((0,l.isIOS)()?window.location.href="sms:"+s+"&body="+a:window.location.href="sms:"+s+"?body="+a)})},showUnsupport:function(e){this.setState({unsupport:e||this.state.unsupport,showUnsupport:!0})}});t.default=P,e.exports=t.default}).call(this)}finally{}}});