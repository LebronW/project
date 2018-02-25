// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Vuex from 'vuex'
import store from './vuex/index'
import router from './router'
import './common/js/rem.js'
import { Swipe, SwipeItem, InfiniteScroll, Loadmore, Cell, Field, Button, Header, Picker, Popup, DatetimePicker, Actionsheet } from 'mint-ui'
import 'mint-ui/lib/style.css'
import { Collapse, CollapseItem } from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import axios from 'axios'
// 添加手势触摸事件，使用方法如 v-touch:swipeleft
import VueTouch from './NetEaseSDK/plugins/touchEvent'

Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)
Vue.component(Loadmore.name, Loadmore)
Vue.component(Cell.name, Cell)
Vue.component(Field.name, Field)
Vue.component(Button.name, Button)
Vue.component(Header.name, Header)
Vue.component(Collapse.name, Collapse)
Vue.component(CollapseItem.name, CollapseItem)
Vue.component(Picker.name, Picker);
Vue.component(Popup.name, Popup);
Vue.component(Actionsheet.name, Actionsheet);
Vue.component(DatetimePicker.name, DatetimePicker);

Vue.use(Vuex)
Vue.use(InfiniteScroll)
Vue.use(VueTouch)

Vue.prototype.$http = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
