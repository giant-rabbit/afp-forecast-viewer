<template>
    <div :class="$style.container">
        <!-- All zones forecast -->
        <div v-if="loaded">
            <h1 :class="$style.title">All Zones Avalanche Forecast</h1>
            <!-- Warning -->
            <avy-warning v-if="data.warning_product" :data="data.warning_product" />
            <div v-for="(forecast, index) in data.forecasts" v-bind:key="'forecast-' + index">
                <!-- Title -->
                <div :class="$style.title">
                    <h2>
                        <i class="mdi mdi-map-marker"></i>
                        {{centerMeta.zones[index].name}}
                    </h2>
                </div>
                <!-- Header -->
                <product-header
                    :published="forecast.published_time"
                    :expires="forecast.expires_time"
                    :author="forecast.author"
                />
                <!-- Bottom line -->
                <div v-if="forecast.bottom_line != ''" :class="$style.bottomLine">
                    <v-popover :class="$style.dangerIcon">
                        <img
                            :src="$dangerScale[forecast.highestDanger].icon"
                            v-tooltip="'Click to learn more'"
                        />
                        <template slot="popover">
                            <div v-html="$dangerScale[forecast.highestDanger].advice"></div>
                        </template>
                    </v-popover>
                    <h5 :class="$style.bottomLineTitle">THE BOTTOM LINE</h5>
                    <div :class="$style.bottomLineText" v-html="forecast.bottom_line"></div>
                </div>
                <!-- danger -->
                <content-panel :class="$style.divider">
                    <avalanche-danger
                        :danger="forecast.danger"
                        :date="forecast.published_time"
                        :config="config"
                    />
                </content-panel>
                <!-- <div :class="$style.divider"></div> -->
                <disclaimer />
            </div>
        </div>
        <not-found v-if="notFound" />
        <loader />
    </div>
</template>

<script>
import Loader from '../components/Loader'
import NotFound from '../components/NotFound'
import AvyWarning from '../components/AvyWarning'
import ProductHeader from '../components/ProductHeader'
import ContentPanel from '../components/ContentPanel'
import AvalancheDanger from '../components/AvalancheDanger'
import WeatherContent from '../components/WeatherContent'
import Disclaimer from '../components/Disclaimer'

export default {
    data() {
        return {
            zone: '',
            zoneName: '',
            date: '',
            centerMeta: this.$centerMeta,
            config: this.$config,
            data: {
                forecasts: [],
                weather_product: false,
                warning_product: false
            },
            loaded: false,
            notFound: false,
            refresh: 0
        }
    },
    components: {
        Loader,
        NotFound,
        ProductHeader,
        AvyWarning,
        ContentPanel,
        AvalancheDanger,
        WeatherContent,
        Disclaimer
    },
    methods: {
        getForecast(zone) {
            return this.$api
                .get('/public/product?type=forecast&center_id=' + this.$centerId + '&zone_id=' + zone)
                .then(response => {
                    if (response.data.published_time == null) {
                        return false
                    } else {
                        var data = response.data
                        data.forecast_avalanche_problems.sort(function (a, b) {
                            return a.rank - b.rank
                        })
                        return data
                        // this.getWarning()
                        // if (this.data.product_type == 'forecast') {
                        //     this.getWeather()
                        // }
                        // document.body.classList.add('afp-forecast-type-' + this.data.product_type)
                        // document.body.classList.add('afp-forecast-zone-' + this.zone)

                    }
                })
                .catch(e => {
                    return false
                })
        },
        getWeather() {
            this.$api
                .get('/public/product?type=weather&center_id=' + this.$centerId + '&zone_id=' + this.zone + '&published_time=' + this.date)
                .then(response => {
                    if (response.data.published_time != null) {
                        this.data.weather_product = response.data
                        let table = this.data.weather_product.weather_data.find(table => table.zone_id == this.zone)
                        if (table != null) {
                            this.data.weather_table = table
                            this.refresh++
                        }
                    } else {
                        this.data.weather_product = false
                    }
                })
        },
        getWarning() {
            this.$api
                .get('/public/product?type=warning&center_id=' + this.$centerId + '&zone_id=' + this.zone + '&published_time=' + this.date)
                .then(response => {
                    if (response.data.published_time != null) {
                        this.data.warning_product = response.data
                        this.refresh++
                    } else {
                        this.data.warning_product = false
                    }
                    this.loaded = true
                    this.$eventBus.$emit('loaded')
                })
        }

    },
    async mounted() {
        this.$eventBus.$emit('loading')
        var promiseArray = []
        this.centerMeta.zones.forEach(zone => {
            promiseArray.push(this.getForecast(zone.id))
        })
        Promise.all(promiseArray).then(data => {
            data.forEach(zone => {
                this.data.forecasts.push(zone)
            })
            this.data.forecasts.forEach(zone => {
                if (zone.product_type == 'forecast') {
                    let current = zone.danger.find(current => current.valid_day == "current");
                    zone.highestDanger = Math.max(current.lower, current.middle, current.upper)
                } else {
                    zone.highestDanger = 0
                }
            })
            this.$eventBus.$emit('loaded')
            this.loaded = true
        })
    }
}
</script>

<style module lang="scss">
@import "../assets/css/bootstrap/functions";
@import "../assets/css/_variables.scss";
@import "../assets/css/bootstrap/mixins";

.container {
    composes: container from "../assets/css/style.css";
    padding-top: $spacer;
}
.spacer {
    margin-bottom: $spacer;
}

.divider {
    margin-bottom: 2 * $spacer;
}

.title {
    margin-bottom: $spacer !important;
    h2 {
        color: $gray-700 !important;
        margin-bottom: 0 !important;
        text-indent: -0.75rem;
        margin-left: 1.5rem;
    }
}

.bottomLine {
    position: relative;
    background-color: #fff;
    padding: $spacer;
    // border-radius: $border-radius;
    border: 1.2px solid $gray-400;
    box-shadow: $app-box-shadow;
    margin-top: 3rem;
    margin-bottom: 2rem;
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
    composes: btn-primary from "../assets/css/style.css";
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
