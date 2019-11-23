import Vue from 'vue'
import App from './App.vue'
import forecastView from './plugin.js'
import router from './routes.js'
import axios from 'axios'
import merge from 'deepmerge'
// import moment from 'moment'
import moment from 'moment/src/moment.js'
import vbclass from 'vue-body-class'

// Load forecast view plugin
Vue.use(forecastView)

// Get Config
var configDefault = {
    "center": "SNFAC",
    "color": false,
    "tabs": [],
    "blog": true,
    "elevations": {
        "upper": "Upper Elevation",
        "middle": "Middle Elevation",
        "lower": "Lower Elevation"
    },
    "assets": {
        "icons": true,
        "photoswipe": true
    },
    "mediaUrl": false
}
var configElement = document.getElementById('afp-public-config')
if( configElement) {
    var config = JSON.parse(configElement.innerHTML)
    config = merge(configDefault, config)
} else {
    var config = configDefault
}
Vue.prototype.$config = config
Vue.prototype.$centerId = config.center

// Event bus
Vue.prototype.$eventBus = new Vue()

// Router
Vue.use(vbclass, router)

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

axios
    .get('https://api.avalanche.org/v2/public/avalanche-center/' + config.center)
    .then(response => {
        Vue.prototype.$centerMeta = response.data
        // Vue instance
        window.App = new Vue({
            el: '#afp-public-root',
            router,
            render: h => h(App)
        })
    })
    .catch(e => {
        console.log('error retrieving avalanche center meta')
    })


