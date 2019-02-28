import Vue from 'nativescript-vue'
import Vuex from 'vuex'
import router from './router'
import store from './store'
// import VueDevtools from 'nativescript-vue-devtools'

if(TNS_ENV !== 'production') {
  // Vue.use(VueDevtools)
}
// Prints Vue logs when --env.production is *NOT* set while building
Vue.config.silent = (TNS_ENV === 'production')

Vue.prototype.$router = router
Vue.prototype.$goto = function (to, options){
	var options = options || { 
        clearHistory: false, 
        backstackVisible: true, 
        transition: { 
            name: "slide",
            duration: 380,
            curve: "easeIn"
        }
    }
	this.$navigateTo(this.$router[to], options)
}

new Vue({
	store,
	render: h => h('frame', [h(router['words'])])
}).$start()
