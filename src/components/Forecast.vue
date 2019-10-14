<template>
    <div :class="$style.container">
        <not-found v-if="notFound" />
        <loader />
        <forecast-view
            v-if="loaded"
            :product="data.product_type"
            :data="data"
            :config="config"
            :preview="preview"
            :key="refresh"
            :zone="zoneName"
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
            },
            deep: true,
            immediate: true
        },
        '$route.params.date': {
            handler: function () {
                this.loaded = false
                this.notFound = false
                this.$eventBus.$emit('loading')
                this.getProducts()
            },
            deep: true,
            immediate: true
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
                        this.zone = this.$route.params.zone.replace(/-/g, ' ');
                        this.zone = this.zone.toLowerCase().split(' ').map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join(' ')
                        let zone = this.centerMeta.zones.find(zone => zone.name == this.zone)
                        this.zone = zone.id
                        this.zoneName = zone.name
                    } else {
                        this.zone = this.centerMeta.zones[0].id
                        this.zoneName = this.centerMeta.zones[0].name
                    }
                    // convert URL zone slug to zone id
                    this.getForecast()
                    this.getWeather()
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
                        this.$eventBus.$emit('loaded')
                        // this.$nextTick(() => {
                        //     var event = new Event('forecast-loaded')
                        //     window.dispatchEvent(event)
                        // })
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
                    this.data.weather_product = response.data
                    let table = this.data.weather_product.weather_data.find(table => table.zone_id == this.zone)
                    if (table != null) {
                        this.data.weather_table = table
                        this.refresh++
                    }
                })
            // .catch(e => {
            //     this.$router.push({ name: 'NotFound' })
            // })
        },
        getSynopsis() {
            this.$api
                .get('/public/product?type=synopsis&center_id=' + this.$centerId + '&zone_id=' + this.zone + '&published_time=' + this.date)
                .then(response => {
                    this.data.synopsis_product = response.data
                })
            // .catch(e => {
            //     this.$router.push({ name: 'NotFound' })
            // })
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
    min-height: 100vh;
}
</style>
