webpackJsonp([67],{214:function(e,t,a){try{(function(){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var s=a(2),n=r(s),o=(a(1),a(9)),l=a(8),u=(r(l),a(4)),i=r(u),d=a(15),f=r(d),p=a(13),m=r(p),c=a(5),h=r(c),g=a(11),E=(r(g),a(18)),v=r(E),y=a(6),T=(r(y),a(7)),S=(r(T),a(41)),k=r(S),w=n.default.createClass({displayName:"ImportForm",getInitialState:function(){return{phoneInfo:null,unsupport:!1,showUnsupport:!1,isStart:!1,defaultUsername:"",frontConf:this.props.frontConf}},componentDidMount:function(){},componentWillUnmount:function(){this.unmount=!0},render:function(){var e=this.handleImport,t=this.state,a=t.unsupport,r=t.showUnsupport,s=t.isStart,o=(t.defaultUsername,this.props.pageConfig),l=f.default.get(this.props.taskType,0,0,0),u="";l&&l.loginParam&&(u=l.loginParam.phone);var i=r?n.default.createElement("div",{className:"carrier-unsupport"},n.default.createElement("i",null),n.default.createElement("p",null,a)):n.default.createElement("div",{className:"config-import-page"},n.default.createElement("div",{className:"form common-form"},n.default.createElement("div",{className:"input-item"},n.default.createElement(m.default,{type:"text",ref:"username",id:"zxUsername",placeholder:"请\b输入支付宝账号/邮箱/手机号",label:"账户名",defaultValue:u})),n.default.createElement("div",{className:"input-item"},n.default.createElement(m.default,{type:"password",ref:"password",id:"zxPassword",placeholder:"请输入登录密码",label:"密码"}))),n.default.createElement(k.default,{ref:"agreementField",uid:o.login_type,frontConf:this.state.frontConf}),n.default.createElement("div",{className:"page-wrapper"},n.default.createElement(h.default,{types:"full",onTap:e,disable:s,state:s,getState:function(e){switch(e){case!1:return"提交";case!0:return"登录中...";default:return"提交"}}})));return n.default.createElement("div",null,n.default.createElement(v.default,null,i))},handleImport:function(){var e=this,t=this.props,a=t.onSubmitTaskDone;if(t.pageConfig,this.state.phoneInfo,!this.refs.agreementField.isChecked(S.AGREEMENT_TYPE.MOXIE))return void setTimeout(function(){return i.default.alert("请勾选同意《用户使用协议》","")});if(!this.refs.agreementField.isChecked(S.AGREEMENT_TYPE.TENANT))return void setTimeout(function(){return i.default.alert("请勾选同意《用户使用协议》","")});var r=this.refs.username.getValue(),s=this.refs.password.getValue();if(!r)return void setTimeout(function(){return i.default.alert("请输入正确的登录名","")});if(!s)return void setTimeout(function(){return i.default.alert("请输入正确的登录密码","")});this.setState({isStart:!0});var n=void 0;(0,o.submitTaskHelper)({taskType:this.props.taskType,loginType:"pwd",username:r,password:s}).then(function(t){if(n=t,t.body.task_id){e.setState({isStart:!1}),i.default.refreshStatus("2","创建任务成功"),i.default.mxSaveTaskId(t.body.task_id);var s={taskId:t.body.task_id,username:r,mappingId:t.body.mapping_id,taskType:e.props.taskType,loginType:"pwd",loginParam:{phone:r}};a(s)}}).catch(function(t){e.setState({isStart:!1});var a=t&&t.response&&t.response.body||{};a.errors&&a.errors[0]&&(10220011===a.errors[0].code||10220012===a.errors[0].code)?(i.default.refreshStatus("-2",a.errors[0].message),e.showUnsupport(a.errors[0].message)):(i.default.refreshStatus("-3","服务异常，创建任务失败"),e.handleError(t,a.detail))})},handleError:function(e){var t=arguments.length<=1||void 0===arguments[1]?"任务提交失败":arguments[1];try{t=e&&e.body&&e.body.detail||t}catch(e){}if("任务提交失败"==t){if(e&&e.message&&e.message.indexOf("the network is offline")!=-1)return void i.default.alert("网络开小差啦，请稍后再试");i.default.alert(t+"\n"+e)}else i.default.alert(t);this.setState({isStart:!1})},showUnsupport:function(e){this.setState({unsupport:e||this.state.unsupport,showUnsupport:!0})}});t.default=w,e.exports=t.default}).call(this)}finally{}}});