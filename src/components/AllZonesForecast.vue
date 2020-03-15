<template>
    <!-- Need:
    Print version-->

    <div :class="$style.container">
        <div :class="$style.row">
            <!-- All zones forecast -->
            <div v-if="loaded" :class="$style.column">
                <h1 class="afp-html-h1" :class="$style.title">Backcountry Avalanche Forecast</h1>
                <!-- Warning -->
                <div v-for="(forecast, index) in data.forecasts" v-bind:key="'forecast-' + index">
                    <!-- Title -->
                    <div :class="$style.title">
                        <h2 class="afp-html-h2">
                            <i class="mdi mdi-map-marker"></i>
                            {{centerMeta.zones[index].name}}
                        </h2>
                    </div>
                    <!-- Warning -->
                    <avy-warning
                        v-if="data.warning_product[index]"
                        :data="data.warning_product[index]"
                    />
                    <!-- Header -->
                    <product-header
                        :published="forecast.published_time"
                        :expires="forecast.expires_time"
                        :showExpires="false"
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
                        <h5 class="afp-html-h5" :class="$style.bottomLineTitle">THE BOTTOM LINE</h5>
                        <div :class="$style.bottomLineText" v-html="forecast.bottom_line"></div>
                    </div>
                    <div :class="$style.danger">
                        <!-- danger -->
                        <avalanche-danger
                            :class="$style.spacer"
                            :danger="forecast.danger"
                            :date="forecast.published_time"
                            :config="config"
                        />
                        <div :class="$style.textRight">
                            <router-link
                                :to="{ name: 'ZoneForecast', params: { zone: urlString(centerMeta.zones[index].name) }}"
                                :class="$style.btn"
                                class="afp-btn-primary"
                            >
                                Full Forecast
                                <i class="mdi mdi-arrow-right"></i>
                            </router-link>
                        </div>
                    </div>
                    <div :class="$style.spacer"></div>
                </div>
                <h1 class="afp-html-h1" :class="$style.title">Weather Forecast</h1>
                <div :class="$style.title">
                    <h2 class="afp-html-h2">
                        <i class="mdi mdi-map-marker"></i>
                        All Zones
                    </h2>
                </div>
                <product-header
                    :published="data.weather_product.published_time"
                    :author="data.weather_product.author"
                    :expires="false"
                />
                <div
                    v-if="data.weather_product"
                    v-html="data.weather_product.weather_discussion"
                    :class="$style.weather"
                ></div>
                <div v-else :class="$style.weather"><p class="afp-html-p">No Weather Forecast product found.</p></div>
                <disclaimer />
            </div>
            <not-found v-if="notFound" />
            <loader />
        </div>
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
            centerMeta: this.$centerMeta,
            config: this.$config,
            data: {
                forecasts: [],
                weather_product: false,
                warning_product: []
            },
            loaded: false,
            notFound: false
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
        urlString(string) {
            string = string.replace(/ /g, '-')
            string = string.toLowerCase()
            return string
        },
        getForecast(zone) {
            return this.$api
                .get('/public/product?type=forecast&center_id=' + this.$centerId + '&zone_id=' + zone)
                .then(response => {
                    if (response.data.published_time == null) {
                        return false
                    } else {
                        var data = response.data
                        data.danger.splice(1, 2)
                        return data
                    }
                })
                .catch(e => {
                    this.notFound = true
                    this.$eventBus.$emit('loaded')
                    return false
                })
        },
        getWarning(zone) {
            return this.$api
                .get('/public/product?type=warning&center_id=' + this.$centerId + '&zone_id=' + zone)
                .then(response => {
                    if (response.data.published_time == null) {
                        return false
                    } else {
                        return response.data
                    }
                })
                .catch(e => {
                    return false
                })
        },
        getWeather() {
            this.$api
                .get('/public/product?type=weather&center_id=' + this.$centerId + '&zone_id=' + this.centerMeta.zones[0].id + '&published_time=' + this.date)
                .then(response => {
                    if (response.data.published_time != null) {
                        this.data.weather_product = response.data
                    } else {
                        this.data.weather_product = false
                    }
                })
        },
    },
    async mounted() {
        this.$eventBus.$emit('loading')
        var promiseArray = []
        this.centerMeta.zones.forEach(zone => {
            promiseArray.push(this.getForecast(zone.id))
        })
        await Promise.all(promiseArray).then(data => {
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
        })
        var promiseArray = []
        this.centerMeta.zones.forEach(zone => {
            promiseArray.push(this.getWarning(zone.id))
        })
        await Promise.all(promiseArray).then(data => {
            data.forEach(zone => {
                this.data.warning_product.push(zone)
            })
        })
        await this.getWeather()
        this.$eventBus.$emit('loaded')
        this.loaded = true
        document.body.classList.add('afp-forecast-type-all')
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

.row {
    composes: row from "../assets/css/style.css";
    justify-content: center;
}

.column {
    composes: col-lg-9 from "../assets/css/style.css";
    composes: col-md-12 from "../assets/css/style.css";
}
.spacer {
    margin-bottom: $spacer;
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
    border: 1.2px solid $gray-400;
    box-shadow: $app-box-shadow;
    margin-top: 3rem;
    margin-bottom: 1rem;
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
    // p:last-of-type {
    //     margin-bottom: 0 !important;
    // }
}

.danger {
    position: relative;
    background-color: #fff;
    padding: 2rem 1rem 0 1rem;
    border: 1.2px solid $gray-400;
    box-shadow: $app-box-shadow;
    margin-top: 1rem;
    margin-bottom: 1rem;
    @include media-breakpoint-down(xs) {
        margin-right: -15px;
        margin-left: -15px;
        border-left: none;
        border-right: none;
        box-shadow: none;
    }
}

.weather {
    position: relative;
    background-color: #fff;
    padding: 2rem 1rem 1rem 1rem;
    // border-radius: $border-radius;
    border: 1.2px solid $gray-400;
    box-shadow: $app-box-shadow;
    margin-top: $spacer;
}

.wxSummary {
    @media print {
        display: none;
    }
}

.btn {
    composes: btn from "../assets/css/style.css";
    composes: btn-primary from "../assets/css/style.css";
    // composes: btn-sm from "../assets/css/style.css";
}

.textRight {
    text-align: right;
    margin-bottom: 0.5 * $spacer;
}

.printWx {
    display: none;
    @media print {
        display: block;
        margin-top: $spacer;
    }
}
</style>
