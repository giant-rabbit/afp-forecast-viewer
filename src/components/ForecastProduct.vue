<template>
    <div>
        <print :data="data" :zone="zone" :danger="highestDanger" :centerMeta="centerMeta" />
        <div class="afp-row afp-mb-3">
            <!-- Zone selector -->
            <div
                v-if="!preview && centerMeta.zones.length > 1"
                class="afp-col-md-4 afp-col-lg-3 afp-order-md-2 text-md-right"
            >
                <zone-selector />
            </div>
            <!-- Title -->
            <div class="afp-forecast-title afp-col-md-8 afp-col-lg-9">
                <h1
                    class="afp-html-h1"
                    v-if="data.product_type == 'forecast'"
                >Backcountry Avalanche Forecast</h1>
                <h1 class="afp-html-h1" v-else>General Avalanche Information</h1>
                <h2 class="afp-html-h2 afp-gray-700 afp-zone-title">
                    <i class="mdi mdi-map-marker"></i>
                    {{zone}}
                </h2>
            </div>
        </div>
        <!-- Warning -->
        <avy-warning v-if="!preview && data.warning_product" :data="data.warning_product" />

        <!-- Header -->
        <product-header
            :preview="preview"
            :published="data.published_time"
            :expires="data.expires_time"
            :author="data.author"
        />

        <!-- Bottom line -->
        <bottom-line
            v-if="data.bottom_line != ''"
            :bottomLine="data.bottom_line"
            :highestDanger="highestDanger"
        />

        <!-- Tab navigation -->
        <tabs
            v-if="!preview && data.product_type == 'forecast'"
            ref="tabs"
            :tabs="tabsForecast"
            :custom="$config.tabs"
            :blog="$centerMeta.config.blog"
            :selected="tabSelected"
            @changeTab="changeTab"
        />
        <tabs
            v-if="!preview && data.product_type == 'summary'"
            ref="tabs"
            :tabs="tabsSummary"
            :custom="$config.tabs"
            :blog="$centerMeta.config.blog"
            :selected="tabSelected"
            @changeTab="changeTab"
        />
        <tabs
            v-if="preview && data.product_type == 'forecast'"
            ref="tabs"
            :tabs="tabsForecastPreview"
            :selected="tabSelected"
            @changeTab="changeTab"
        />
        <tabs
            v-if="preview && data.product_type == 'summary'"
            ref="tabs"
            :tabs="tabsSummaryPreview"
            :selected="tabSelected"
            @changeTab="changeTab"
        />

        <!-- Tab container -->
        <content-panel>
            <photoswipe v-if="data.product_type == 'forecast'" key="forecast">
                <!-- Avalanche forecast tab -->
                <div v-show="tabSelected == 'forecast'" class="afp-tabPane">
                    <!-- danger -->
                    <avalanche-danger :danger="data.danger" :date="data.published_time" />

                    <!-- problems -->
                    <avalanche-problem
                        v-for="problem in data.forecast_avalanche_problems"
                        v-bind:key="problem.rank"
                        :problem="problem"
                    />

                    <!-- discussion -->
                    <div v-if="data.hazard_discussion != ''" class="afp-divider afp-mb-4">
                        <h2 class="afp-html-h2">Forecast Discussion</h2>
                        <div class="afp-tinymce" v-html="data.hazard_discussion"></div>
                    </div>

                    <!-- media -->
                    <media-gallery
                        class="afp-divider afp-print-hide"
                        :media="data.media"
                        v-if="data.media.length > 0"
                        key="forecast"
                    />

                    <!-- weather summary -->
                    <div
                        v-if="!preview && data.weather_table && data.product_type == 'forecast'"
                        class="afp-divider afp-print-hide afp-mb-4"
                    >
                        <h2 class="afp-html-h2">Weather Summary</h2>
                        <weather-table
                            :periods="data.weather_table.periods"
                            :data="data.weather_table.data"
                            :zone="data.weather_table.zone_name"
                        />
                        <div class="afp-text-center">
                            <button
                                @click="scrollToTabs('weather')"
                                class="afp-html-button afp-btn afp-btn-primary"
                            >Full Weather Forecast</button>
                        </div>
                    </div>

                    <!-- weather forecast for print -->
                    <div class="afp-divider afp-print-show">
                        <h2 class="afp-html-h2">Weather Forecast</h2>
                        <weather-content v-if="data.weather_product" :data="data.weather_product" />
                    </div>
                </div>
            </photoswipe>
            <photoswipe v-if="data.product_type == 'summary'" key="summary">
                <!-- Summary tab -->
                <div v-show="tabSelected == 'forecast'" class="afp-tabPane">
                    <div
                        v-if="data.hazard_discussion != 'null' && data.hazard_discussion != ''"
                        class="afp-mb-3"
                    >
                        <h2 class="afp-html-h2">Forecast Discussion</h2>
                        <div class="afp-tinymce" v-html="data.hazard_discussion"></div>
                    </div>
                    <!-- media -->
                    <media-gallery
                        class="afp-divider afp-print-hide"
                        :media="data.media"
                        v-if="data.media.length > 0"
                    />
                    <!-- weather forecast for print -->
                    <div class="afp-divider afp-print-show">
                        <h2 class="afp-html-h2">Weather Forecast</h2>
                        <weather-content v-if="data.weather_product" :data="data.weather_product" />
                    </div>
                </div>
            </photoswipe>

            <!-- Weather tab -->
            <div
                v-show="tabSelected == 'weather' && (data.product_type == 'forecast' || data.product_type == 'summary')"
                class="afp-tabPane"
            >
                <div v-if="data.weather_product">
                    <product-header
                        :published="data.weather_product.published_time"
                        :author="data.weather_product.author"
                        :expires="false"
                    />
                    <weather-content :data="data.weather_product" />
                </div>
                <p v-else>No Weather Forecast to display.</p>
            </div>

            <!-- Blog tab -->
            <div v-show="tabSelected == 'blog'" class="afp-tabPane">
                <!-- Title -->
                <div
                    v-if="data.hasOwnProperty('synopsis_product') && data.synopsis_product.avalanche_center != null"
                >
                    <h1 class="afp-html-h1" v-html="data.synopsis_product.bottom_line"></h1>
                    <product-header
                        :published="data.synopsis_product.published_time"
                        :author="data.synopsis_product.author"
                        :expires="false"
                    />
                    <synopsis-content :data="data.synopsis_product" />
                </div>
                <div v-else>No Conditions Blog post to display.</div>
            </div>

            <!-- Custom tab content -->
            <div v-for="customTab in config.tabs" v-bind:key="customTab.id">
                <div v-show="tabSelected == customTab.id" class="afp-tabPane">
                    <custom-tab :id="customTab.id" :tab="customTab.id" :url="customTab.url"></custom-tab>
                </div>
            </div>
        </content-panel>
        <disclaimer />
    </div>
</template>

<script>
import Print from '../components/Print'
import ZoneSelector from '../components/ZoneSelector'
import ProductHeader from '../components/ProductHeader'
import AvyWarning from '../components/AvyWarning'
import BottomLine from '../components/BottomLine'
import Tabs from '../components/Tabs'
import ContentPanel from '../components/ContentPanel'
import AvalancheDanger from '../components/AvalancheDanger'
import AvalancheProblem from '../components/AvalancheProblem'
import MediaGallery from '../components/MediaGallery'
import WeatherContent from '../components/WeatherContent'
import WeatherTable from '../components/WeatherTable'
import SynopsisContent from '../components/SynopsisContent'
import CustomTab from '../components/CustomTab'
import Disclaimer from '../components/Disclaimer'

export default {
    data() {
        return {
            tabsForecast: [
                {
                    id: "forecast",
                    name: "Avalanche Forecast"
                },
                {
                    id: "weather",
                    name: "Weather Forecast"
                }
            ],
            tabsSummary: [
                {
                    id: "forecast",
                    name: "Avalanche Information"
                },
                {
                    id: "weather",
                    name: "Weather Summary"
                }
            ],
            tabsForecastPreview: [
                {
                    id: "forecast",
                    name: "Avalanche Forecast"
                }
            ],
            tabsSummaryPreview: [
                {
                    id: "forecast",
                    name: "Avalanche Information"
                }
            ],
            tabSelected: 'forecast',
            centerMeta: this.$centerMeta
        }
    },
    computed: {
        highestDanger: function () {
            if (this.data.product_type == 'forecast') {
                let current = this.data.danger.find(current => current.valid_day == "current");
                return Math.max(current.lower, current.middle, current.upper)
            } else {
                return 0
            }
        },
    },
    props: ['preview', 'data', 'config', 'zone'],
    components: {
        Print,
        ZoneSelector,
        ProductHeader,
        AvyWarning,
        BottomLine,
        Tabs,
        ContentPanel,
        AvalancheDanger,
        AvalancheProblem,
        MediaGallery,
        WeatherContent,
        WeatherTable,
        SynopsisContent,
        CustomTab,
        Disclaimer
    },
    methods: {
        changeTab(tab) {
            this.tabSelected = tab
            // this.$gtag.event('Forecast Tab Click', {
            //     'event_category': 'AFP Forecast Viewer',
            //     'event_label': tab
            // })
            this.uiClick('tab click » ' + tab)
        },
        scrollToTabs(tab) {
            this.tabSelected = tab
            document.getElementById("tabs").scrollIntoView()
            this.uiClick('full weather forecast')
        },
    },
    mounted() { }
}
</script>

<style scoped lang="scss">
// .afp-tabPane {
//     min-height: 80vh;
// }
</style>
