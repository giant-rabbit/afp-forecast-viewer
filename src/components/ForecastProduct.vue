<template>
    <div>
        <div :class="$style.row">
            <!-- Zone selector -->
            <div v-if="!preview" :class="$style.zoneSelector">
                <zone-selector />
            </div>
            <!-- Title -->
            <div :class="$style.title">
                <h1 v-if="data.product_type == 'forecast'">Backcountry Avalanche Forecast</h1>
                <h1 v-else>Avalanche Conditions Summary</h1>
                <h2 v-if="!preview">
                    <i class="mdi mdi-map-marker"></i>
                    {{zone}}
                </h2>
            </div>
        </div>
        <!-- Header -->
        <product-header
            :preview="preview"
            :published="data.published_time"
            :expires="data.expires_time"
            :author="data.author"
        />

        <!-- Warning -->
        <!-- Need logic for showing warning -->
        <!-- <avy-warning v-if="!preview" /> -->

        <!-- Bottom line -->
        <div v-if="data.bottom_line != ''" :class="$style.bottomLine">
            <v-popover :class="$style.dangerIcon">
                <img
                    :src="this.$dangerScale[highestDanger].icon"
                    v-tooltip="'Click to learn more'"
                />
                <template slot="popover">
                    <div v-html="this.$dangerScale[highestDanger].advice"></div>
                </template>
            </v-popover>
            <h5 :class="$style.bottomLineTitle">THE BOTTOM LINE</h5>
            <div :class="$style.bottomLineText" v-html="data.bottom_line"></div>
        </div>

        <!-- Tab navigation -->
        <tabs
            v-if="!preview && data.product_type == 'forecast'"
            ref="tabs"
            :tabs="tabsForecast"
            :custom="$config.tabs"
            :selected="tabSelected"
            @changeTab="changeTab"
        />
        <tabs
            v-if="!preview && data.product_type == 'summary'"
            ref="tabs"
            :tabs="tabsSummary"
            :custom="$config.tabs"
            :selected="tabSelected"
            @changeTab="changeTab"
        />
        <tabs v-if="preview" ref="tabs" :tabs="tabsPreview" :selected="tabSelected" />

        <!-- Tab container -->
        <content-panel>
            <!-- Avalanche forecast tab -->
            <div
                v-if="tabSelected == 'forecast' && data.product_type == 'forecast'"
                :class="$style.tabPane"
            >
                <!-- danger -->
                <avalanche-danger
                    :danger="data.danger"
                    :date="data.published_time"
                    :config="config"
                />

                <!-- problems -->
                <avalanche-problem
                    v-for="problem in data.forecast_avalanche_problems"
                    v-bind:key="problem.rank"
                    :problem="problem"
                    :config="config"
                />

                <!-- discussion -->
                <div v-if="data.hazard_discussion != ''" :class="$style.divider">
                    <h2 v-if="data.product_type == 'forecast'">Forecast Discussion</h2>
                    <h2 v-else>Snowpack & Avalanche Conditions</h2>
                    <div v-html="data.hazard_discussion"></div>
                </div>

                <!-- media -->
                <media-gallery
                    :class="$style.mediaGallery"
                    :media="data.media"
                    scope="scope-forecast"
                    v-if="data.media.length > 0"
                    key="forecast"
                />

                <!-- weather summary -->
                <div
                    v-if="!preview && data.weather_table && data.product_type == 'forecast'"
                    :class="[$style.divider, $style.wxSummary]"
                >
                    <h2>Weather Summary</h2>
                    <weather-table
                        :periods="data.weather_table.periods"
                        :data="data.weather_table.data"
                        :zone="data.weather_table.zone_name"
                    />
                    <div :class="$style.textCenter">
                        <button
                            @click="scrollToTabs('weather')"
                            :class="$style.btn"
                            class="afp-btn-primary"
                        >Full Weather Forecast</button>
                    </div>
                </div>

                <!-- weather forecast for print -->
                <div :class="[$style.divider, $style.printWx]">
                    <h2>Weather Forecast</h2>
                    <weather-content v-if="data.weather_product" :data="data.weather_product" />
                </div>
            </div>

            <!-- Summary tab -->
            <div
                v-if="tabSelected == 'forecast' && data.product_type == 'summary'"
                :class="$style.tabPane"
            >
                <div :class="$style.spacer">
                    <h2>Snowpack & Avalanche Conditions</h2>
                    <div v-if="data.hazard_discussion != ''" v-html="data.hazard_discussion"></div>
                </div>
                <!-- media -->
                <media-gallery
                    :class="$style.divider"
                    :media="data.media"
                    scope="scope-forecast"
                    v-if="data.media.length > 0"
                />
                <!-- weather forecast for print -->
                <div :class="[$style.divider, $style.printWx]">
                    <h2>Weather Forecast</h2>
                    <div v-if="data.weather_discussion != ''" v-html="data.weather_discussion"></div>
                </div>
            </div>

            <!-- Forecast Weather tab -->
            <div
                v-if="tabSelected == 'weather' && data.product_type == 'forecast'"
                :class="$style.tabPane"
            >
                <div v-if="data.weather_product">
                    <product-header
                        :published="data.weather_product.published_time"
                        :author="data.weather_product.author"
                        :expires="false"
                    />
                    <weather-content :data="data.weather_product" />
                </div>
                <div v-else>No Weather Forecast to display.</div>
            </div>

            <!-- Summary Weather tab -->
            <div
                v-if="tabSelected == 'weatherSummary'  && data.product_type == 'summary'"
                :class="$style.tabPane"
            >
                <div v-if="data.weather_discussion != ''" v-html="data.weather_discussion"></div>
            </div>

            <!-- Synopsis tab -->
            <div v-if="tabSelected == 'synopsis'" :class="$style.tabPane">
                <!-- Title -->
                <div v-if="data.synopsis_product">
                    <h1 v-html="data.synopsis_product.bottom_line"></h1>
                    <product-header
                        :published="data.synopsis_product.published_time"
                        :author="data.synopsis_product.author"
                        :expires="false"
                    />
                    <synopsis-content :data="data.synopsis_product" />
                    <div :class="[$style.textCenter, $style.spacer]">
                        <button
                            @click="$router.replace({ name: 'ArchiveTab', params: { tab: 'synopsis' } })"
                            :class="$style.btn"
                            class="afp-btn-primary"
                        >View Previous Synopses</button>
                    </div>
                </div>
                <div v-else>No Regional Synopsis to display.</div>
            </div>

            <!-- Custom tab content -->
            <div v-for="customTab in config.tabs" v-bind:key="customTab.id">
                <div v-show="tabSelected == customTab.id" :class="$style.tabPane">
                    <div :id="customTab.id"></div>
                </div>
            </div>
        </content-panel>
        <disclaimer />
    </div>
</template>

<script>
import ZoneSelector from '../components/ZoneSelector'
import ProductHeader from '../components/ProductHeader'
import AvyWarning from '../components/AvyWarning'
import Tabs from '../components/Tabs'
import ContentPanel from '../components/ContentPanel'
import AvalancheDanger from '../components/AvalancheDanger'
import AvalancheProblem from '../components/AvalancheProblem'
import MediaGallery from '../components/MediaGallery'
import WeatherContent from '../components/WeatherContent'
import WeatherTable from '../components/WeatherTable'
import SynopsisContent from '../components/SynopsisContent'
import Disclaimer from '../components/Disclaimer'

export default {
    data() {
        return {
            // make tabs a computed property conditional on preview, weather, and synopsis
            tabsForecast: [
                {
                    id: "forecast",
                    name: "Avalanche Forecast"
                },
                {
                    id: "weather",
                    name: "Weather Forecast"
                },
                {
                    id: "synopsis",
                    name: "Regional Synopsis"
                }
            ],
            tabsSummary: [
                {
                    id: "forecast",
                    name: "Conditions Summary"
                },
                {
                    id: "weatherSummary",
                    name: "Weather Forecast"
                },
                {
                    id: "synopsis",
                    name: "Regional Synopsis"
                }
            ],
            tabsPreview: [
                {
                    id: "forecast",
                    name: "Avalanche Forecast"
                }
            ],
            tabSelected: 'forecast'
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
        ZoneSelector,
        ProductHeader,
        AvyWarning,
        Tabs,
        ContentPanel,
        AvalancheDanger,
        AvalancheProblem,
        MediaGallery,
        WeatherContent,
        WeatherTable,
        SynopsisContent,
        Disclaimer
    },
    methods: {
        changeTab(tab) {
            this.tabSelected = tab
            // this.$router.push({ query: { nav: this.tabSelected } })
        },
        scrollToTabs(tab) {
            var ref = this
            var offset = document.getElementById('tabs').offsetTop
            const onScroll = function () {
                const scrollTop = window.scrollTop || window.pageYOffset

                if (scrollTop === offset) {
                    window.removeEventListener('scroll', onScroll)
                    ref.tabSelected = tab
                }
            }
            window.addEventListener('scroll', onScroll)
            onScroll()
            window.scrollTo({
                top: offset,
                behavior: 'smooth'
            })
        },
    },
    mounted() {
    }
}
</script>

<style module lang="scss">
@import "../assets/css/bootstrap/functions";
@import "../assets/css/_variables.scss";
@import "../assets/css/bootstrap/mixins";

.spacer {
    margin-bottom: $spacer;
}

.divider {
    margin-bottom: 1.5 * $spacer;
    @include divider;
}

.title {
    composes: col-md-8 from "../assets/css/style.css";
    composes: col-lg-9 from "../assets/css/style.css";
    h2 {
        color: $gray-700 !important;
        margin-bottom: 0 !important;
        text-indent: -0.75rem;
        margin-left: 1.5rem;
    }
}

.zoneSelector {
    composes: col-md-4 from "../assets/css/style.css";
    composes: col-lg-3 from "../assets/css/style.css";
    composes: order-md-2 from "../assets/css/style.css";
}

.row {
    composes: row from "../assets/css/style.css";
    margin-bottom: $spacer;
}

.bottomLine {
    position: relative;
    background-color: #fff;
    padding: $spacer;
    // border-radius: $border-radius;
    border: 1.2px solid $gray-400;
    box-shadow: $app-box-shadow;
    margin-top: 3rem;
    margin-bottom: 3rem;
}

.dangerIcon {
    height: 60px !important;
    width: 90px !important;
    position: absolute;
    top: -20px;
    left: -20px;
    @include media-breakpoint-down(xs) {
        left: -15px;
    }
    div {
        display: block !important;
        cursor: help;
        width: 100%;
        height: 100%;
    }
    img {
        height: 100% !important;
        width: auto !important;
        max-width: initial !important;
    }
}

.bottomLineTitle {
    display: inline-block;
    border-bottom: 1px solid $gray-400;
    padding-bottom: 0.1rem;
}

.bottomLineText {
    font-size: $font-size-lg;
    margin-top: 0.7rem;
}

.tabPane {
    min-height: 80vh;
}
.wxSummary {
    @media print {
        display: none;
    }
}

.btn {
    composes: btn from "../assets/css/style.css";
    composes: btn-secondary from "../assets/css/style.css";
}

.textCenter {
    text-align: center;
}

.printWx {
    display: none;
    @media print {
        display: block;
        margin-top: $spacer;
    }
}
</style>
