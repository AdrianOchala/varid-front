import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import vuetify from './plugins/vuetify'
import helpers from './plugins/helpers'
Vue.config.productionTip = false

const helpersPlugin = {
    install () {
        Vue.helpers = helpers;
        Vue.prototype.$helpers = helpers
    }
}

Vue.use(helpersPlugin);
Vue.use(VueAxios, axios)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
