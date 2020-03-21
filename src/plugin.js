import ForecastPlugin from './components/ForecastPlugin';
import PhotoSwipe from 'photoswipe/dist/photoswipe'
import PhotoSwipeUI from 'photoswipe/dist/photoswipe-ui-default'
import createPreviewDirective from "vue-photoswipe-directive";
import InfoPopover from './components/InfoPopover'
import VTooltip from 'v-tooltip'
import moment from 'moment/src/moment.js'

export default {
    install(Vue, options) {

        // Register components
        Vue.component('forecast-view', ForecastPlugin)
        Vue.component('info', InfoPopover)

        // Filters
        Vue.filter('publicDate', function (value) {
            if (value) {
                return moment(value).format('dddd, MMMM D, YYYY - h:mmA')
            }
        });

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
                    defaultInnerClass: 'afp-popover-body',
                    defaultArrowClass: 'afp-popover-arrow',
                    defaultOpenClass: 'afp-popover-open',
                    defaultContainer: '.afp-forecast-view',
                },
            }
        )
        // Photoswipe
        Vue.directive('preview', createPreviewDirective({
            shareEl: false,
            history: false,
            clickToCloseNonZoomable: false,
            bgOpacity: 0.9,
            allowPanToNext: false,
            mainClass: 'afp-photoswipe'
        },
            PhotoSwipe,
            PhotoSwipeUI)
        )

        // Load content for help popovers
        Vue.prototype.$helpContent = {
            dangerScale: 'The <a class="afp-html-a" href="https://avalanche.org/avalanche-encyclopedia/danger-scale/" target="_blank">North American Avalanche Danger Scale</a> is a tool used by avalanche forecasters to communicate the potential for avalanches to cause harm or injury to backcountry travelers.',
            avalancheDanger: '<p class="afp-html-p"><strong>Avalanche Danger</strong> is a tool used by avalanche forecasters to communicate the potential for avalanches to cause harm or injury to backcountry travelers.</p><p class="afp-html-p">Watch this <a class="afp-html-a" href="https://avalanche.org/avalanche-encyclopedia/danger-scale/"" target="_blank">video</a> to learn more about Avalanche Danger.</p>',
            avalancheDangerOutlook: '<p class="afp-html-p">The <strong>Outlook</strong> is different than today\'s Forecast. The Outlook has a higher level of uncertainty but can still communicate expected danger trends over time.</p>',
            avalancheProblem: '<p class="afp-html-p"><strong>Avalanche Problems</strong> use four factors to give a more nuanced description of the days avalanche conditions: the type of potential avalanche, it\'s location in the terrain, the likelihood of triggering it, and the potential size of the avalanche.</p><p class="afp-html-p">Watch this <a class="afp-html-a" href="https://avalanche.org/avalanche-encyclopedia/avalanche-problem/" target="_blank">video</a> to learn more about Avalanche Problems.</p>',
            problemType: '<p class="afp-html-p">Avalanche Problems are categories of avalanche activity. The Problems may not describe all avalanche activity you might observe, but they categorize the avalanches by how we manage the risk in the terrain. This approach focuses on relevant observations you can make in the field and how to treat the avalanche risk.</p><p class="afp-html-p">The forecasts list up to three current Problems, along with the spatial distribution, the likelihood of avalanches, and anticipated size. Forecasters may provide specific details to a Problem in the Discussion tab.</p><p class="afp-html-p">This <a class="afp-html-a" href="https://avalanche.org/avalanche-encyclopedia/avalanche-problem/" target="_blank">link</a> has detailed descriptions of each Avalanche Problem and suggestions for risk treatment.</p>',
            problemLocation: 'The Aspect/Elevation diagram describes the spatial pattern of the Avalanche Problem by aspect (the direction a slope faces) and elevation band (Above, Near, or Below Treeline). The diagram will be filled with black where the Avalanche Problem may exist. You can view the diagram as you would a mountain on a topographic map. The outer ring represents the Below Treeline elevation band, middle ring Near Treeline, and the inner ring Above Treeline. The diagram is oriented like a compass, with the top wedges representing north aspects, the left wedges representing west, etc.',
            problemLikelihood: 'Likelihood is a description of the chance of encountering a particular Avalanche Problem. It combines the spatial distribution of the Problem and the sensitivity or ease of triggering an avalanche. The spatial distribution indicates how likely you are to encounter the Problem in the highlighted avalanche terrain. The sensitivity indicates how easy it is to trigger avalanches including both natural and human triggered avalanches.',
            problemSize: 'Size is based on the destructive potential of avalanches. SMALL avalanches are relatively harmless to people unless they push you into a terrain trap. LARGE avalanches could bury, injure or kill a person. VERY LARGE avalanches could bury cars, destroy a house, or break trees. HISTORIC avalanches are even more destructive, and nearing the maximum size the slope could produce.'
        }

        // Danger scale info
        Vue.prototype.$dangerScale = [
            {
                level: 0,
                rating: "No Rating",
                advice: "Insufficient data for issuing of danger ratings, but a summary of avalanche conditions exists. Read the summary for more information.",
                icon: "https://avalanche.org/wp-content/themes/avalanche-org-theme-v1/includes/img/danger/no.png"
            },
            {
                level: 1,
                rating: "Low",
                advice: "<strong>TRAVEL ADVICE</strong><BR>Generally safe avalanche conditions. Watch for unstable snow on isolated terrain features.",
                icon: "https://avalanche.org/wp-content/themes/avalanche-org-theme-v1/includes/img/danger/low.png"
            },
            {
                level: 2,
                rating: "Moderate",
                advice: "<strong>TRAVEL ADVICE</strong><BR>Heightened avalanche conditions on specific terrain features. Evaluate snow and terrain carefully; identify features of concern.",
                icon: "https://avalanche.org/wp-content/themes/avalanche-org-theme-v1/includes/img/danger/moderate.png"
            },
            {
                level: 3,
                rating: "Considerable",
                advice: "<strong>TRAVEL ADVICE</strong><BR>Dangerous avalanche conditions. Careful snowpack evaluation, cautious route-finding and conservative decision-making essential.",
                icon: "https://avalanche.org/wp-content/themes/avalanche-org-theme-v1/includes/img/danger/considerable.png"
            },
            {
                level: 4,
                rating: "High",
                advice: "<strong>TRAVEL ADVICE</strong><BR>Very dangerous avalanche conditions. Travel in avalanche terrain <em>not</em> recommended.",
                icon: "https://avalanche.org/wp-content/themes/avalanche-org-theme-v1/includes/img/danger/high.png"
            },
            {
                level: 5,
                rating: "Extreme",
                advice: "<strong>TRAVEL ADVICE</strong><BR>Avoid all avalanche terrain.",
                icon: "https://avalanche.org/wp-content/themes/avalanche-org-theme-v1/includes/img/danger/extreme.png"
            }
        ]
    }
}
