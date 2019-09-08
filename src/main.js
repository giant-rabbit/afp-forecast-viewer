import Vue from 'vue'
import App from './App.vue'
import forecastView from './plugin.js'

Vue.use(forecastView)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
