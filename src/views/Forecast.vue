<template>
    <div>
        <div class="afp-container afp-pt-2">
            <button
                v-if="id != ''"
                @click="$router.replace({ name: 'ArchiveProduct', params: { product: urlString(zoneName) } })"
                class="afp-html-button afp-btn afp-btn-primary"
            >
                <i class="mdi mdi-arrow-left"></i> Archive
            </button>
            <not-found v-if="notFound" />
            <loader :show="!loaded" />
        </div>
        <forecast-view
            v-if="loaded && !notFound"
            :product="data.product_type"
            :data="data"
            :config="config"
            :preview="preview"
            :zone="zoneName"
        />
    </div>
</template>

<script>
import Loader from '../components/Loader'
import NotFound from '../components/NotFound'
import moment from 'moment'

export default {
    data() {
        return {
            zone: '',
            zoneName: '',
            id: '',
            date: '',
            centerMeta: this.$centerMeta,
            config: this.$config,
            data: {
                weather_product: false,
                warning_product: false,
                synopsis_product: false
            },
            preview: false,
            loaded: false,
            notFound: false,
        }
    },
    components: {
        Loader,
        NotFound
    },
    watch: {
        '$route.params.zone': {
            handler: function () {
                this.loaded = false
                this.notFound = false
                this.getProducts()
            }
        },
        '$route.params.id': {
            handler: function () {
                this.loaded = false
                this.notFound = false
                this.getProducts()
            }
        }
    },
    methods: {
        urlString(string) {
            string = string.replace(/ /g, '-')
            string = string.toLowerCase()
            return string
        },
        async getProducts() {
            if (this.$route.params.id != undefined) {
                this.id = this.$route.params.id
            } else {
                this.id = ''
            }
            if (this.$route.params.zone != undefined) {
                // convert URL zone slug to zone id
                this.zone = this.$route.params.zone.replace(/-/g, ' ');
                this.zone = this.zone.toLowerCase().split(' ').map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join(' ')
                let zone = this.centerMeta.zones.find(zone => zone.name == this.zone)
                if(zone) {
                    this.zone = zone.id
                    this.zoneName = zone.name
                } else {
                    this.notFound = true
                    this.loaded = true
                }
            } 
            if (this.id) {
                await this.getForecastById()
            } else {
                await this.getForecast()
            }
            // check if valid forecast
            if (this.data.published_time != null && this.data.forecast_zone.filter(e => e.id === this.zone).length > 0 && (this.data.product_type == 'forecast' || this.data.product_type == 'summary')) {
                this.data.forecast_avalanche_problems.sort(function (a, b) {
                    return a.rank - b.rank
                })
                this.date = moment(this.data.published_time).format('YYYY-MM-DD')
                await this.getWeather()
            } else {
                this.notFound = true
            }
            this.data.synopsis_product = {};
            this.data.synopsis_product.avalanche_center = null
            await this.getWarning()
            document.body.classList.add('afp-forecast-type-' + this.data.product_type)
            document.body.classList.add('afp-forecast-zone-' + this.zone)
            await this.getSynopsis()
            this.loaded = true
        },
        getForecast() {
            return this.$api
                .get('/public/product?type=forecast&center_id=' + this.$centerId + '&zone_id=' + this.zone)
                .then(response => {
                    this.data = response.data
                })
                .catch(e => {
                    this.notFound = true
                })
        },
        getForecastById() {
            return this.$api
                .get('/public/product/' + this.id)
                .then(response => {
                    this.data = response.data
                })
                .catch(e => {
                    this.notFound = true
                })
        },
        getWeather() {
            return this.$api
                .get('/public/product?type=weather&center_id=' + this.$centerId + '&zone_id=' + this.zone + '&published_time=' + this.date)
                .then(response => {
                    if (response.data.published_time != null) {
                        this.data.weather_product = response.data
                        if (this.data.weather_product.weather_data.length > 0) {
                            let tables = []
                            this.centerMeta.zones.forEach(item => {
                                let temp = this.data.weather_product.weather_data.find(temp => temp.zone_id == item.id)
                                tables.push(temp)
                            })
                            this.data.weather_product.weather_data = tables
                            let table = this.data.weather_product.weather_data.find(table => table.zone_id == this.zone)
                            if (table != null) {
                                this.data.weather_table = table
                            }
                        } else {
                            this.data.weather_product.weather_data = false
                        }
                    }
                })
                .catch(e => {
                    this.data.weather_product = false
                })
        },
        getWarning() {
            return this.$api
                .get('/public/product?type=warning&center_id=' + this.$centerId + '&zone_id=' + this.zone + '&published_time=' + this.date)
                .then(response => {
                    if (response.data.published_time != null) {
                        this.data.warning_product = response.data
                    } else {
                        this.data.warning_product = false
                    }
                })
                .catch(e => {
                    this.data.warning_product = false
                })
        },
        getSynopsis() {
            return this.$api
                .get('/public/product?type=synopsis&center_id=' + this.$centerId + '&zone_id=' + this.zone + '&published_time=' + this.date)
                .then(response => {
                    this.data.synopsis_product = response.data
                })
                .catch(e => {
                    this.data.synopsis_product = false
                })
        },

    },
    mounted() {
        this.getProducts()
        this.trackPage('Avalanche Forecast')
    }
}
</script>

