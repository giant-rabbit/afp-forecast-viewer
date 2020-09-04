import Vue from 'vue'
import App from './App.vue'
import forecastView from './plugin.js'
import routerMultiZone from './router/multiZone.js'
import routerSingleZone from './router/singleZone.js'
import axios from 'axios'
import merge from 'deepmerge'
import moment from 'moment'
import vbclass from 'vue-body-class'
import VueGtag from "vue-gtag"
import mixins from './utils/mixins.js'


// Load forecast view plugin
Vue.use(forecastView)

// Get Config
var configDefault = {
    "center": "SNFAC",
    "color": false,
    "tabs": [],
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
            baseURL: 'https://staging-api.avalanche.org/v2'
        })
    }
})


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

// Get centermeta and mount app
Vue.prototype.$api
    .get('/public/avalanche-center/' + Vue.prototype.$centerId)
    .then(response => {
        var centerMeta = response.data
        // Reorder zones if config property is set
        if (centerMeta.config.hasOwnProperty('zone_order')) {
            var zones = []
            centerMeta.config.zone_order.forEach(item => {
                var zone = centerMeta.zones.find(zone => zone.id == item)
                zones.push(zone)
            })
            centerMeta.zones = zones
        }
        Vue.prototype.$centerMeta = centerMeta
        console.log(Vue.prototype.$centerMeta)

        const router = routerMultiZone
        // Add Body class based on route
        Vue.use(vbclass, router)
        // Vue instance
        window.App = new Vue({
            el: '#afp-public-root',
            router,
            render: h => h(App),
        })
    })
    .catch(e => {
        Vue.prototype.$centerMeta = false
        console.log(Vue.prototype.$centerMeta)
        console.log('error retrieving avalanche center meta')
    })




