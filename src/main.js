import Vue from 'vue'
import App from './App.vue'
import forecastView from './plugin.js'
import router from './router'
import axios from 'axios'
import merge from 'deepmerge'
import moment from 'moment'
import vbclass from 'vue-body-class'
// import Router from 'vue-router'
import VueGtag from "vue-gtag"
import mixins from './utils/mixins.js'
// Components
// import Forecast from './views/Forecast'
// import Weather from './views/Weather'
// import Synopsis from './views/Synopsis'
// import Archive from './views/Archive'
// import AllZonesForecast from './views/AllZonesForecast'


// Load forecast view plugin
Vue.use(forecastView)

// Get Config
var configDefault = {
    "center": "SNFAC",
    "color": false,
    "tabs": [],
    "elevations": {
        "upper": "Upper Elevation",
        "middle": "Middle Elevation",
        "lower": "Lower Elevation"
    },
    "assets": {
        "icons": true,
        "photoswipe": true
    },
    "baseUrl": ''
}
var configElement = document.getElementById('afp-public-config')
if (configElement) {
    var config = JSON.parse(configElement.innerHTML)
    config = merge(configDefault, config)
} else {
    var config = configDefault
}
Vue.prototype.$config = config
Vue.prototype.$centerId = config.center

// Style tag
Vue.component('v-style', {
    render: function (createElement) {
        return createElement('style', this.$slots.default)
    }
})

// Click outside directive
let handleOutsideClick
Vue.directive('closable', {
    bind(el, binding, vnode) {
        handleOutsideClick = (e) => {
            e.stopPropagation()
            const { handler, exclude } = binding.value
            let clickedOnExcludedEl = false
            exclude.forEach(refName => {
                if (!clickedOnExcludedEl) {
                    const excludedEl = vnode.context.$refs[refName]
                    clickedOnExcludedEl = excludedEl.contains(e.target)
                }
            })
            if (!el.contains(e.target) && !clickedOnExcludedEl) {
                vnode.context[handler]()
            }
        }
        document.addEventListener('click', handleOutsideClick)
        document.addEventListener('touchstart', handleOutsideClick)
    },
    unbind() {
        document.removeEventListener('click', handleOutsideClick)
        document.removeEventListener('touchstart', handleOutsideClick)
    }
})

// API
Vue.use({
    install(Vue) {
        Vue.prototype.$api = axios.create({
            baseURL: 'https://api.avalanche.org/v2'
        })
    }
})

// Add Body class based on route
Vue.use(vbclass, router)

// Google Analytics - gtag
Vue.use(VueGtag, {
    config: {
        params: {
            send_page_view: false
        }
    },
    // pageTrackerTemplate(to) {
    //     return {
    //         page_title: 'AFP Forecast Viewer',
    //         page_path: Vue.prototype.$config.baseUrl + '/#' + to.path
    //     }
    // },
    disableScriptLoad: true,
})

// Vue instance
window.App = new Vue({
    el: '#afp-public-root',
    router,
    render: h => h(App),
})



