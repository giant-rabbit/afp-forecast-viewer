import Vue from 'vue'
import App from './App.vue'
import forecastView from './plugin.js'
import { baseRoutes } from './routes.js'
import axios from 'axios'
import merge from 'deepmerge'
import moment from 'moment'
import vbclass from 'vue-body-class'
import Router from 'vue-router'
import VueGtag from "vue-gtag"
import mixins from './mixins.js'
// Components
import Forecast from './views/Forecast'
import Weather from './views/Weather'
import Synopsis from './views/Synopsis'
import Archive from './views/Archive'
import AllZonesForecast from './views/AllZonesForecast'


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

axios
    .get('https://api.avalanche.org/v2/public/avalanche-center/' + config.center)
    .then(response => {
        Vue.prototype.$centerMeta = response.data
        // Dummy config data
        var config = {
            zoneOrder: [295, 296, 294, 293],
            blog: true,
            elevations: {
                upper: {
                    title: "Upper Elevation",
                    description: "Upper elevation description",
                },
                middle: {
                    title: "Middle Elevation",
                    description: "Middle elevation description",
                },
                lower: {
                    title: "Lower Elevation",
                    description: "Lower elevation description",
                }
            },
        }
        // Reorder zones if config property is set
        if (config.zoneOrder) {
            var zones = []
            config.zoneOrder.forEach(function (item) {
                var zone = response.data.zones.find(zone => zone.id == item)
                zones.push(zone)
            })
            Vue.prototype.$centerMeta.zones = zones
            Vue.prototype.$centerMeta.config = config
        }

        // Router
        Vue.use(Router)
        var routes = baseRoutes
        const router = new Router({
            mode: 'hash',
            routes,
            scrollBehavior(to, from, savedPosition) {
                if (savedPosition) {
                    return savedPosition
                } else {
                    return { x: 0, y: 0 }
                }
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

        // Google analytics
        // if (window.ga && ga.create) {
        //     ga('set', 'page', Vue.prototype.$config.baseUrl + '/#' + router.currentRoute.path);
        //     ga('send', 'pageview');
        //     //console.log(config.baseUrl + '/#' + router.currentRoute.path)
        //     router.afterEach((to, from) => {
        //         ga('set', 'page', Vue.prototype.$config.baseUrl + '/#' + to.path);
        //         ga('send', 'pageview');
        //         // console.log(config.baseUrl + '/#' + to.path)
        //     })
        //     console.log('Google Analytics loaded')
        // } else {
        //     console.log('Google Analytics not loaded')
        // }
        // console.log(Vue.prototype.$config.baseUrl + '/#' + router.currentRoute.path)
        // router.afterEach((to, from) => {
        //     console.log(Vue.prototype.$config.baseUrl + '/#' + to.path)
        // })
    })
    .catch(e => {
        console.log('error retrieving avalanche center meta')
    })


