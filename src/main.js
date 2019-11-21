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

// API
Vue.use({
    install(Vue) {
        Vue.prototype.$api = axios.create({
            baseURL: 'https://staging-api.avalanche.org/v2'
        })
    }
})

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

// Dummy Data
Vue.prototype.$sampleData = {
    id: 54357,
    published_time: "2019-08-19T13:30:00+00:00",
    expires_time: "2019-08-19T13:30:00+00:00",
    author: "Chris Lundy",
    product_type: "forecast",
    bottom_line: "<p>Stubborn wind slabs exist in unusual locations including well below ridgelines and on the sides of mid-slope gullies. Use visual clues like snow blown off of trees, new snow drifts, and fresh cornices to gauge where wind slabs have formed.</p><p>If the sun comes out, expect small, natural loose avalanches to occur on steep and rocky slopes.</p>",
    bottom_line2: "This is the synopsis title",
    hazard_discussion: "<p>We have no recent observations post-weekend storm from this zone. Based on neighboring weather stations and radar and satellite information, we estimate 6-18 inches of snow fell Saturday night through Sunday in the Mountain Loop area and that moderate west winds moved a significant amount of snow around near and above treeline.</p>",
    hazard_discussion2: "<p><figure class=\"image align-left\"><img src=\"https://www.sawtoothavalanche.com/img/field/190413_titus_WL_ASc.jpg\" alt=\"\" width=\"300\" height=\"225\" />\n<figcaption>This is the caption for the image!!</figcaption>\n</figure>A split flow pattern is keeping our region under generally quiet weather, but weak upper-level low pressure over Oregon is helping to&nbsp;create diurnal instability. Shower and isolated thunderstorm activity from highway 2 southward and over the Olympics will continue into the early evening hours before fizzling out and leading to clearing skies. Without strong steering&nbsp;flow aloft, shower activity is forming over the terrain and drifting gradually eastward. Up to a quarter inch may fall in heavier showers in parts of the SW Washington Cascades, particularly near Mt. Rainier.</p>\n<p>Saturday looks similar to Friday, but with a very weak trough moving across the region late in the day, sparking a few scattered showers particularly over the Washington Cascades, mainly during the evening hours, but clouds will build during the afternoon. Skies should clear once again late Saturday night.</p>\n<p>Sunday afternoon and evening, models have some scattered convective shower activity in the afternoon.</p>\n<p>Throughout the forecast period, precipitation should take the form of mostly rain, with high elevation snow above 5500-6000 ft, with locally lower snow levels and reduced visibility in intense convective showers.</p>\n<figure class=\"image align-right\"><img src=\"https://www.sawtoothavalanche.com/img/field/190413_titus_WL_ASc.jpg\" alt=\"\" width=\"300\" height=\"225\" />\n<figcaption>This is the caption for the image!!</figcaption>\n</figure>\n<p>A split flow pattern is keeping our region under generally quiet weather, but weak upper-level low pressure over Oregon is helping to&nbsp;create diurnal instability. Shower and isolated thunderstorm activity from highway 2 southward and over the Olympics will continue into the early evening hours before fizzling out and leading to clearing skies. Without strong steering&nbsp;flow aloft, shower activity is forming over the terrain and drifting gradually eastward. Up to a quarter inch may fall in heavier showers in parts of the SW Washington Cascades, particularly near Mt. Rainier.</p>\n<p>Saturday looks similar to Friday, but with a very weak trough moving across the region late in the day, sparking a few scattered showers particularly over the Washington Cascades, mainly during the evening hours, but clouds will build during the afternoon. Skies should clear once again late Saturday night.</p>\n<p>Sunday afternoon and evening, models have some scattered convective shower activity in the afternoon.</p>\n<p>Throughout the forecast period, precipitation should take the form of mostly rain, with high elevation snow above 5500-6000 ft, with locally lower snow levels and reduced visibility in intense convective showers.</p>\n<p><iframe src=\"//www.youtube.com/embed/cjqcJT35A2s\" width=\"560\" height=\"314\" allowfullscreen=\"allowfullscreen\"></iframe></p>\n<p>&nbsp;</p>",
    announcement: null,
    status: "published",
    avalanche_center: {
        id: "SNFAC",
        name: "Sawtooth Avalanche Center",
        url: "https://www.sawtoothavalanche.com/",
        city: "Ketchum",
        state: "ID"
    },
    forecast_zone: {
        id: 293,
        name: "Sawtooth Mountains",
        url: "https://www.sawtoothavalanche.com/adv-sawtooth.php",
        state: "ID"
    },
    warning: null,
    forecast_avalanche_problems: [
        {
            id: 129,
            forecast_id: 54365,
            avalanche_problem_id: 3,
            rank: 1,
            likelihood: ["likely", "likely"],
            discussion: "<p>Strong winds formed stubborn, new slabs this weekend. Reports from the field in nearby zones indicate wind loading in unusual locations including much further down the slope than normal and on cross-loaded gully features. Wind slabs like this can be tricky. They often don’t seem very reactive. This can lure you out onto the slab. Using visual clues can help you identify and avoid wind loaded slopes. If you see fresh cornices, wind drifted snow, or feel firm, hollow, surface snow, wind slabs are nearby. We may see these slabs grow deeper at higher elevations, as moderate north winds transport more snow Monday.</p><p>If you use the nice weather to travel to higher elevations or into more remote areas take the time to stop and observe the snow. Due to stormy weather we have not received any information from higher elevations in quite some time.</p>",
            media: {
                url: "https://www.sawtoothavalanche.com/img/field/190413_titus_WL_ASc.jpg",
                type: "photo",
                caption: "Sample caption about the photo"
            },
            location: [
                "north upper",
                "northeast upper",
                "east upper",
                "north middle",
                "northeast middle"
            ],
            size: [
                "2",
                "3"
            ],
            name: "Wind Slab",
            problem_description: "Wind Slab avalanches are the release of a cohesive layer of snow (a slab) formed by the wind. Wind typically transports snow from the upwind sides of terrain features and deposits snow on the downwind side. Wind slabs are often smooth and rounded and sometimes sound hollow, and can range from soft to hard. Wind slabs that form over a persistent weak layer (surface hoar, depth hoar, or near-surface facets) may be termed Persistent Slabs or may develop into Persistent Slabs.",
            icon: "https://staging-api.avalanche.org/img/avalanche_problems/WindSlab.png"
        },
        {
            id: 129,
            forecast_id: 54365,
            avalanche_problem_id: 3,
            rank: 2,
            likelihood: "unlikely",
            discussion: "<p>Strong winds formed stubborn, new slabs this weekend. Reports from the field in nearby zones indicate wind loading in unusual locations </p>",
            media: {
                url: "cjqcJT35A2s",
                type: "video",
                caption: "Sample caption about the video"
            },
            location: [
                "south upper",
                "southeast upper",
                "east upper",
                "south middle",
                "southeast middle"
            ],
            size: [
                "1.5",
                "2.5"
            ],
            name: "Storm Slab",
            problem_description: "Storm Slab avalanches are the release of a cohesive layer (a slab) of new snow that breaks within new snow or on the old snow surface. Storm-slabs typically last between a few hours and few days (following snowfall). Storm-slabs that form over a persistent weak layer (surface hoar, depth hoar, or near-surface facets) may be termed Persistent Slabs or may develop into Persistent Slabs.",
            icon: "https://staging-api.avalanche.org/img/avalanche_problems/StormSlab.png"
        }
    ],
    danger: [
        {
            lower: 2,
            upper: 4,
            middle: 3,
            valid_day: "current"
        },
        {
            lower: 5,
            upper: 3,
            middle: 4,
            valid_day: "tomorrow"
        }
    ],
    media: [
        {
            id: 1,
            url: "https://www.sawtoothavalanche.com/img/field/190413_titus_WL_ASc.jpg",
            type: "photo",
            caption: "This is the caption"
        },
        {
            id: 2,
            url: "https://www.sawtoothavalanche.com/img/field/180322_Keystone_crownprofile_SS.jpg",
            type: "photo",
            caption: "Strong winds formed stubborn, new slabs this weekend. Reports from the field in nearby zones indicate wind loading in unusual locations "
        },
        {
            id: 3,
            url: "cjqcJT35A2s",
            type: "video",
            caption: "Video caption"
        },
        {
            id: 4,
            url: "https://www.sawtoothavalanche.com/img/field/190409_cabin_cr_E_9800.jpg",
            type: "photo",
            caption: "Strong winds formed stubborn, new slabs this weekend. Reports from the field in nearby zones indicate wind loading in unusual locations "
        },
        {
            id: 5,
            url: "https://www.sawtoothavalanche.com/img/field/WarmSpringsRd2.jpg",
            type: "photo",
            caption: "Strong winds formed stubborn, new slabs this weekend. Reports from the field in nearby zones indicate wind loading in unusual locations "
        },
        {
            id: 6,
            url: "IjgH4mcNTZc",
            type: "video",
            caption: "Video caption"
        }
    ],
    weather_discussion: "<p>Cool NW flow has exceeded post-frontal snowfall accumulations in a few areas along the west slopes of the Cascades through early this afternoon. Those same areas, from Stevens Pass/Mountain Loop and south&nbsp;to&nbsp;Mt. Hood, will continue to see persistent snow showers through the early evening.&nbsp;It&nbsp;won't be until the flow aloft turns more northerly this evening that&nbsp;the showers&nbsp;really wind.&nbsp;</p>\n<p>Upper level ridging will build offshore and conditions will dry out tonight with clear skies expected in most locations. Some low clouds may get pulled into the Cascade Passes as light east flow develops. Other than the aforementioned low clouds in the Passes and some high clouds coming over the Olymipcs/north Cascades in the afternoon, generally sunny skies and cool temperatures are forecast on Monday.&nbsp; &nbsp;</p>\n<p>The upper level ridge will begin to flop over into southern B.C. on Tuesday, allowing more high clouds from a weak frontal&nbsp;boundary to push further south.&nbsp; Periods of high clouds are likely for northern half of the forecast area Monday night and Tuesday with diminishing cloud cover for areas further south. Freezing levels will begin to moderate Tuesday as warmer air works over the region.&nbsp;&nbsp;</p>",
    weather_data: [
        {
            data: [
                {
                    field: 'Temperature (F)',
                    values: [
                        '4',
                        '3',
                        '4'
                    ]
                },
                {
                    field: 'Cloud Cover',
                    values: [
                        'Clear',
                        'Clear',
                        'Clear'
                    ]
                },
                {
                    field: 'Ridgeline Wind Speed',
                    values: [
                        'Moderate',
                        'Moderate',
                        'Light'
                    ]
                },
                {
                    field: 'Wind Direction',
                    values: [
                        'SE',
                        'S',
                        'N'
                    ]
                },
                {
                    field: 'Snowfall (in)',
                    values: [
                        '0',
                        '0',
                        '0'
                    ]
                },
                {
                    field: 'Snow Water Equivalent (in)',
                    values: [
                        '0',
                        '0',
                        '0'
                    ]
                }
            ],
            periods: [
                '<span>Last Night</span>(5PM - 5AM)',
                '<span>Today</span>(5PM - 5AM)',
                '<span>Tonight</span>(5PM - 5AM)'
            ],
            zone_id: 293,
            zone_name: 'Sawtooth Mountains'
        },
        {
            data: [
                {
                    field: 'Temperature (F)',
                    values: [
                        '45',
                        '73',
                        '23'
                    ]
                },
                {
                    field: 'Cloud Cover',
                    values: [
                        'Broken',
                        'Overcast',
                        'Clear'
                    ]
                },
                {
                    field: 'Ridgeline Wind Speed',
                    values: [
                        'Calm',
                        'Light',
                        'Light'
                    ]
                },
                {
                    field: 'Wind Direction',
                    values: [
                        'N',
                        'NE',
                        'NW'
                    ]
                },
                {
                    field: 'Snowfall (in)',
                    values: [
                        '1',
                        '2',
                        '2'
                    ]
                },
                {
                    field: 'Snow Water Equivalent (in)',
                    values: [
                        '10',
                        '0',
                        '0'
                    ]
                }
            ],
            periods: [
                '<span>Last Night</span>(5PM - 5AM)',
                '<span>Today</span>(5PM - 5AM)',
                '<span>Tonight</span>(5PM - 5AM)'
            ],
            zone_id: 294,
            zone_name: 'Smoky & Boulder Mountains'
        },
        {
            data: [
                {
                    field: 'Temperature (F)',
                    values: [
                        '45',
                        '33',
                        '23'
                    ]
                },
                {
                    field: 'Cloud Cover',
                    values: [
                        'Broken',
                        'Broken',
                        'Scattered'
                    ]
                },
                {
                    field: 'Ridgeline Wind Speed',
                    values: [
                        'Strong',
                        'Strong',
                        'Strong'
                    ]
                },
                {
                    field: 'Wind Direction',
                    values: [
                        'N',
                        'N',
                        'SE'
                    ]
                },
                {
                    field: 'Snowfall (in)',
                    values: [
                        '0',
                        '0',
                        '0'
                    ]
                },
                {
                    field: 'Snow Water Equivalent (in)',
                    values: [
                        '000',
                        '0',
                        '0'
                    ]
                }
            ],
            periods: [
                '<span>Last Night</span>(5PM - 5AM)',
                '<span>Today</span>(5PM - 5AM)',
                '<span>Tonight</span>(5PM - 5AM)'
            ],
            zone_id: 296,
            zone_name: 'Soldier Mountains'
        },
        {
            data: [
                {
                    field: 'Temperature (F)',
                    values: [
                        '45',
                        '32',
                        '34'
                    ]
                },
                {
                    field: 'Cloud Cover',
                    values: [
                        'Scattered',
                        'Broken',
                        'Broken'
                    ]
                },
                {
                    field: 'Ridgeline Wind Speed',
                    values: [
                        'Strong',
                        'Strong',
                        'Extreme'
                    ]
                },
                {
                    field: 'Wind Direction',
                    values: [
                        'N',
                        'N',
                        'N'
                    ]
                },
                {
                    field: 'Snowfall (in)',
                    values: [
                        '1',
                        '2',
                        '3'
                    ]
                },
                {
                    field: 'Snow Water Equivalent (in)',
                    values: [
                        '0',
                        '.1',
                        '0'
                    ]
                }
            ],
            periods: [
                '<span>Last Night</span>(5PM - 5AM)',
                '<span>Today</span>(5PM - 5AM)',
                '<span>Tonight</span>(5PM - 5AM)'
            ],
            zone_id: 295,
            zone_name: 'Wood River Valley'
        }
    ]
}

// Vue instance
window.App = new Vue({
    el: '#afp-public-root',
    router,
    render: h => h(App)
})
