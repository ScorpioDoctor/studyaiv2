import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'
import './api/axios'

import './plugins/iview'
import './plugins/mavoneditor'
import './plugins/vuequilleditor'

import TopNav from './components/TopNav'
import MainContainer from './components/MainContainer'
import BottomFooter from './components/BottomFooter'

Vue.component('top-nav', TopNav)
Vue.component('main-container', MainContainer)
Vue.component('bottom-footer', BottomFooter)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
