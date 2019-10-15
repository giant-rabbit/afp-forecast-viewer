<template>
    <div>
        <div :class="$style.container">
            <button
                v-if="date != ''"
                @click="$router.replace({ name: 'Archive' })"
                :class="$style.btn"
                class="afp-btn-primary"
            >
                <i class="mdi mdi-arrow-left"></i> Archive
            </button>
            <not-found v-if="notFound" />
            <loader />
        </div>
        <forecast-view
            v-if="loaded"
            :product="data.product_type"
            :data="data"
            :config="config"
            :preview="preview"
            :zone="zoneName"
            :key="refresh"
        />
    </div>
</template>

<script>
import Loader from '../components/Loader'
import NotFound from '../components/NotFound'

export default {
    data() {
        return {
            zone: '',
            zoneName: '',
            date: '',
            centerMeta: [],
            config: this.$config,
            data: {},
            preview: false,
            loaded: false,
            notFound: false,
            refresh: 0
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
                this.$eventBus.$emit('loading')
                this.getProducts()
            }
        },
        '$route.params.date': {
            handler: function () {
                this.loaded = false
                this.notFound = false
                this.$eventBus.$emit('loading')
                this.getProducts()
            }
        }
    },
    methods: {
        async getProducts() {
            this.$api
                .get('/avalanche-center/' + this.$centerId)
                .then(response => {
                    this.centerMeta = response.data
                    if (this.$route.params.date != undefined) {
                        this.date = this.$route.params.date
                    } else {
                        this.date = ''
                    }
                    if (this.$route.params.zone != undefined) {
                        // convert URL zone slug to zone id
                        this.zone = this.$route.params.zone.replace(/-/g, ' ');
                        this.zone = this.zone.toLowerCase().split(' ').map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join(' ')
                        let zone = this.centerMeta.zones.find(zone => zone.name == this.zone)
                        this.zone = zone.id
                        this.zoneName = zone.name
                    } else {
                        this.zone = this.centerMeta.zones[0].id
                        this.zoneName = this.centerMeta.zones[0].name
                    }
                    this.getForecast()
                    this.getSynopsis()
                })
                .catch(e => {
                    this.notFound = true
                    this.$eventBus.$emit('loaded')
                })
        },
        getForecast() {
            this.$api
                .get('/public/product?type=forecast&center_id=' + this.$centerId + '&zone_id=' + this.zone + '&published_time=' + this.date)
                .then(response => {
                    if (response.data.published_time == null) {
                        this.notFound = true
                        this.$eventBus.$emit('loaded')
                    } else {
                        this.data = response.data
                        this.data.forecast_avalanche_problems.sort(function (a, b) {
                            return a.rank - b.rank
                        })
                        this.loaded = true
                        if (this.data.product_type == 'forecast') {
                            this.getWeather()
                        }
                        this.$eventBus.$emit('loaded')
                        // fire event for custom tab content
                        this.$nextTick(() => {
                            var event = new Event('forecast-loaded')
                            window.dispatchEvent(event)
                        })
                    }
                })
                .catch(e => {
                    this.notFound = true
                    this.$eventBus.$emit('loaded')
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
        getSynopsis() {
            this.$api
                .get('/public/product?type=synopsis&center_id=' + this.$centerId + '&zone_id=' + this.zone + '&published_time=' + this.date)
                .then(response => {
                    this.data.synopsis_product = response.data
                })
        },

    },
    mounted() {
        this.$eventBus.$emit('loading')
        this.getProducts()
    },
}
</script>

<style module lang="scss">
@import "../assets/css/bootstrap/functions";
@import "../assets/css/_variables.scss";
@import "../assets/css/bootstrap/mixins";

.container {
    composes: container from "../assets/css/style.css";
    padding-top: .5*$spacer;
}
.btn {
    composes: btn from "../assets/css/style.css";
    composes: btn-secondary from "../assets/css/style.css";
}
</style>
