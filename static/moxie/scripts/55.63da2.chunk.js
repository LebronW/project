webpackJsonp([55],{822:function(e,t,n){try{(function(){"use strict";function t(e){return e&&e.__esModule?e:{default:e}}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var l=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}(),i=function(e,t,n){for(var a=!0;a;){var r=e,l=t,i=n;a=!1,null===r&&(r=Function.prototype);var s=Object.getOwnPropertyDescriptor(r,l);if(void 0!==s){if("value"in s)return s.value;var o=s.get;if(void 0===o)return;return o.call(i)}var u=Object.getPrototypeOf(r);if(null===u)return;e=u,t=l,n=i,a=!0,s=u=void 0}},s=n(2),o=t(s),u=n(16),c=n(6),f=t(c),d=n(7),m=t(d),h=n(18),p=t(h),v=n(11),y=t(v),b=n(1),E=n(8),N=t(E),w=n(9),P=n(10),g=t(P),O=function(e){function t(e,n){a(this,t),i(Object.getPrototypeOf(t.prototype),"constructor",this).call(this,e,n),this.renderInsurances=this.renderInsurances.bind(this),this.handleNext=this.handleNext.bind(this),this.state={insurances:[],fail:!1}}return r(t,e),l(t,[{key:"componentDidMount",value:function(){var e=this;PG.refreshTitle("选择寿险"),(0,w.fetchList)({taskType:"lifeinsr"}).then(function(t){t=t.filter(function(e){return 0===e.status}),e.setState({insurances:t})}).catch(function(t){return e.setState({fail:!0})})}},{key:"render",value:function(){var e=this,t=this.renderInsurances,n=(o.default.createElement(m.default,{onTap:N.default.bind(this,"/lifeinsurance/list")},o.default.createElement("i",{className:"ion-chevron-left"})),t()||o.default.createElement("div",{className:"centered"},o.default.createElement(y.default,{size:"44",color:"#999"})));return this.state.fail&&(n=o.default.createElement("div",{className:"centered"},"网络异常,请稍后再试")),o.default.createElement("div",null,"NO"==b.qsParams.showTitleBar||0==b.qsParams.showTitleBar||PG.Device.SDK?null:o.default.createElement("div",{style:{height:"NO"==b.qsParams.showTitleBar||PG.Device.SDK?0:44}},o.default.createElement(f.default,{title:"选择寿险",left:o.default.createElement(m.default,{onTap:function(){N.default.call(e)}},o.default.createElement("i",{className:"ion-chevron-left"}))})),o.default.createElement("div",{className:"mx-view bank-list-page",style:{top:"NO"==b.qsParams.showTitleBar||0==b.qsParams.showTitleBar||PG.Device.SDK?0:44}},o.default.createElement(p.default,null,n)))}},{key:"renderInsurances",value:function(){var e=this.state.insurances,t=this.handleNext;return 0===e.length?null:o.default.createElement("div",{style:{position:"absolute",top:0,left:0,right:0,bottom:0,overflowY:"scroll",WebkitOverflowScrolling:"touch"}},o.default.createElement("ul",{style:{backgroundColor:"white"}},e.map(function(e,n){return o.default.createElement("li",{key:n},o.default.createElement(g.default,{onTap:t.bind(null,e.host,e.items.lifeinsrName)},o.default.createElement("div",{className:"bank-item"},o.default.createElement("img",{className:"icon",src:e.items.logo}),o.default.createElement("span",{className:"tit"},e.items.lifeinsrName),o.default.createElement("span",{className:"icon-arrow"},o.default.createElement("i",{className:"ion-ios-arrow-right"})))))})))}},{key:"handleNext",value:function(e,t){var n=this.context.history.pushState;n({insuranceName:t},"/lifeinsr/"+e,b.qsParams)}}]),t}(o.default.Component);O.contextTypes={history:u.PropTypes.history},e.exports=O}).call(this)}finally{}}});