import ForecastView from './components/ForecastView';
import moment from 'moment'
import PhotoSwipe from 'photoswipe/dist/photoswipe'
import PhotoSwipeUI from 'photoswipe/dist/photoswipe-ui-default'
import createPreviewDirective from "vue-photoswipe-directive";
import InfoPopover from './components/InfoPopover'
import VTooltip from 'v-tooltip'
import styles from './assets/css/app.scss'


// import MyDirective from './directives/MyDirective.js';

export default {
    install(Vue, options) {

        // Register components
        Vue.component('forecast-view', ForecastView)
        Vue.component('info', InfoPopover)

        // Filters 
        Vue.filter('formatDate', function (value) {
            if (value) {
                return moment(value).format('YYYY-MM-DD HH:mm')
            }
        })

        Vue.filter('publicDate', function (value) {
            if (value) {
                return moment(value).format('dddd, MMMM D, YYYY - h:mmA')
            }
        })

        Vue.filter('capitalize', function (value) {
            if (!value) return ''
            value = value.toString()
            return value.charAt(0).toUpperCase() + value.slice(1)
        })

        // Tooltips
        Vue.use(VTooltip,
            {
                defaultPlacement: 'bottom',
                defaultClass: '',
                defaultTemplate: '<div class="afp-tooltip" role="tooltip"><div class="afp-tooltip-arrow"></div><div class="afp-tooltip-inner"></div></div>',
                defaultArrowSelector: '.afp-tooltip-arrow, .afp-tooltip__arrow',
                defaultInnerSelector: '.afp-tooltip-inner, .afp-tooltip__inner',
                defaultDelay: 400,
                defaultTrigger: 'hover',
                defaultOffset: 0,
                defaultContainer: '.afp-forecast-view',
                popover: {
                    defaultPlacement: 'bottom',
                    defaultClass: '',
                    defaultBaseClass: 'afp-popover',
                    defaultWrapperClass: 'afp-wrapper',
                    defaultInnerClass: 'afp-popover-inner',
                    defaultArrowClass: 'afp-popover-arrow',
                    defaultOpenClass: 'afp-popover-open',
                    defaultContainer: '.afp-forecast-view',
                },
            }
        )
        
        // Load content for help popovers
        Vue.prototype.$helpContent = {
            dangerScale: 'The <a href="https://avalanche.org/avalanche-encyclopedia/danger-scale/" target="_blank">North American Avalanche Danger Scale</a> is a tool used by avalanche forecasters to communicate the potential for avalanches to cause harm or injury to backcountry travelers.',
            problemType: '<p>Avalanche Problems are categories of avalanche activity. The Problems may not describe all avalanche activity you might observe, but they categorize the avalanches by how we manage the risk in the terrain. This approach focuses on relevant observations you can make in the field and how to treat the avalanche risk.</p><p>The forecasts list up to three current Problems, along with the spatial distribution, the likelihood of avalanches, and anticipated size. Forecasters may provide specific details to a Problem in the Discussion tab.</p><p>This <a href="https://avalanche.org/avalanche-encyclopedia/avalanche-problem/" target="_blank">link</a> has detailed descriptions of each Avalanche Problem and suggestions for risk treatment.</p>',
            problemLocation: 'The Aspect/Elevation diagram describes the spatial pattern of the Avalanche Problem by aspect (the direction a slope faces) and elevation band (Above, Near, or Below Treeline). The diagram will be filled with black where the Avalanche Problem may exist. You can view the diagram as you would a mountain on a topographic map. The outer ring represents the Below Treeline elevation band, middle ring Near Treeline, and the inner ring Above Treeline. The diagram is oriented like a compass, with the top wedges representing north aspects, the left wedges representing west, etc.',
            problemLikelihood: 'Likelihood is a description of the chance of encountering a particular Avalanche Problem. It combines the spatial distribution of the Problem and the sensitivity or ease of triggering an avalanche. The spatial distribution indicates how likely you are to encounter the Problem in the highlighted avalanche terrain. The sensitivity indicates how easy it is to trigger avalanches including both natural and human triggered avalanches.',
            problemSize: 'Size is based on the destructive potential of avalanches. SMALL avalanches are relatively harmless to people unless they push you into a terrain trap. LARGE avalanches could bury, injure or kill a person. VERY LARGE avalanches could bury cars, destroy a house, or break trees. HISTORIC avalanches are even more destructive, and nearing the maximum size the slope could produce.'
        }
    }
}
