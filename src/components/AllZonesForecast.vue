<template>
    <!-- Need:
    Print version-->

    <div class="afp-container afp-pt-3">
        <div class="afp-row afp-justify-content-center">
            <!-- All zones forecast -->
            <div v-if="loaded" class="afp-col-lg-9 afp-col-md-12">
                <h1 class="afp-html-h1">Backcountry Avalanche Forecast</h1>
                <!-- Warning -->
                <div v-for="(forecast, index) in data.forecasts" v-bind:key="'forecast-' + index">
                    <!-- Title -->
                    <h2 class="afp-html-h2 afp-gray-700 afp-zone-title afp-mb-3">
                        <i class="mdi mdi-map-marker"></i>{{centerMeta.zones[index].name}}
                    </h2>
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
                    <bottom-line
                        class="afp-mb-2"
                        v-if="forecast.bottom_line != ''"
                        :bottomLine="forecast.bottom_line"
                        :highestDanger="forecast.highestDanger"
                    />

                    <content-panel class="afp-mb-3">
                        <!-- danger -->
                        <avalanche-danger
                            :danger="forecast.danger"
                            :date="forecast.published_time"
                            :config="config"
                        />
                        <div class="afp-text-right afp-mb-2">
                            <router-link
                                :to="{ name: 'ZoneForecast', params: { zone: urlString(centerMeta.zones[index].name) }}"
                                class="afp-html-a afp-btn afp-btn-primary"
                            >
                                Full Forecast
                                <i class="mdi mdi-arrow-right"></i>
                            </router-link>
                        </div>
                    </content-panel>
                </div>
                <h1 class="afp-html-h1">Weather Forecast</h1>
                <h2 class="afp-html-h2 afp-gray-700 afp-mb-3">
                    <i class="mdi mdi-map-marker"></i>
                    All Zones
                </h2>
                <product-header
                    :published="data.weather_product.published_time"
                    :author="data.weather_product.author"
                    :expires="false"
                />
                <content-panel>
                    <div
                        class="afp-pb-2"
                        v-if="data.weather_product"
                        v-html="data.weather_product.weather_discussion"
                    ></div>
                    <div class="afp-pb-2" v-else>
                        <p class="afp-html-p">No Weather Forecast product found.</p>
                    </div>
                </content-panel>
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
import BottomLine from '../components/BottomLine'
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
        BottomLine,
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
        tineMCEclass(search) {
            // Add AFP specific classes to TinyMCE tags
            search = JSON.stringify(search)
            search = search
                .replace(/<p/g, '<p class=\\"afp-html-p\\"')
                .replace(/<a/g, '<a class=\\"afp-html-a\\"')
                .replace(/<hr>/g, '<hr class=\\"afp-html-hr\\">')
                .replace(/<table/g, '<table class=\\"afp-html-table\\"')
                .replace(/<figure class=\\"/g, '<figure class=\\"afp-html-figure afp-tinymce-figure ')
                .replace(/<img/g, '<img class=\\"afp-html-img afp-tinymce-img\\"')
                .replace(/<h1>/g, '<h1 class=\\"afp-html-h1\\">')
                .replace(/<h2>/g, '<h2 class=\\"afp-html-h2\\">')
                .replace(/<h3>/g, '<h3 class=\\"afp-html-h3\\">')
                .replace(/<h4>/g, '<h4 class=\\"afp-html-h4\\">')
                .replace(/<h5>/g, '<h5 class=\\"afp-html-h5\\">')
                .replace(/<h6>/g, '<h6 class=\\"afp-html-h6\\">')
                .replace(/<ul>/g, '<ul class=\\"afp-html-ul\\">')
                .replace(/<li>/g, '<li class=\\"afp-html-li\\">')
                .replace(/<iframe/g, '<iframe class=\\"afp-html-iframe\\"')
            return JSON.parse(search)
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
                        return this.tineMCEclass(data)
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
            return this.$api
                .get('/public/product?type=weather&center_id=' + this.$centerId + '&zone_id=' + this.centerMeta.zones[0].id + '&published_time=' + this.date)
                .then(response => {
                    if (response.data.published_time != null) {
                        return this.tineMCEclass(response.data)
                    } else {
                        return false
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
        this.data.weather_product = await this.getWeather()
        this.$eventBus.$emit('loaded')
        this.loaded = true
        document.body.classList.add('afp-forecast-type-all')
    }
}
</script>
