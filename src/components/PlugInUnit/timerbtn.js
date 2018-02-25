import Vue from 'vue'
import myTimer from './timerbtn.vue'

const Timerbtn = {
	install: function(vue) {
		Vue.component('Timerbtn', myTimer)
	}
}

export default Timerbtn
