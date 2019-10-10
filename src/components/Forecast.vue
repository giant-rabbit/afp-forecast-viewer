<template>
    <div>
        <alert />
        <loader />
        <!-- need logic for whether to show forecast or summary -->
        <forecast-view
            v-if="loaded"
            product="forecast"
            :data="data"
            :weather="weather"
            :config="config"
            :preview="preview"
            :key="refresh"
        />
    </div>
</template>

<script>
import Loader from '../components/Loader'
import Alert from '../components/Alert'

export default {
    data() {
        return {
            zone: '',
            date: '',
            centerMeta: [],
            config: this.$config,
            data: {},
            weather: null,
            preview: false,
            loaded: false,
            refresh: 0
        }
    },
    components: {
        Loader,
        Alert
    },
    methods: {
        async getZone() {
            this.$api
                .get('/avalanche-center/' + this.$centerId)
                .then(response => {
                    this.centerMeta = response.data
                    // convert URL zone slug to zone id
                    this.zone = this.$route.params.zone.replace(/-/g, ' ');
                    this.zone = this.zone.toLowerCase().split(' ').map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join(' ')
                    let zone = this.centerMeta.zones.find(zone => zone.name == this.zone)
                    this.zone = zone.id
                    this.getForecast()
                    this.getWeather()
                    this.getSynopsis()
                })
                .catch(e => {
                    // this.$router.push({ name: 'NotFound' })
                })
        },
        getForecast() {
            this.$api
                .get('/public/product?type=forecast&center_id=' + this.$centerId + '&zone_id=' + this.zone)
                .then(response => {
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
                })
                .catch(e => {
                    this.$router.push({ name: 'NotFound' })
                })
        },
        getWeather() {
            this.$api
                .get('/public/product?type=weather&center_id=' + this.$centerId + '&zone_id=' + this.zone)
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
                .get('/public/product?type=synopsis&center_id=' + this.$centerId + '&zone_id=' + this.zone)
                .then(response => {
                    this.data.synopsis_product = response.data
                })
            // .catch(e => {
            //     this.$router.push({ name: 'NotFound' })
            // })
        },
        // getProduct() {
        //     // load dummy data
        //     var ref = this
        //     setTimeout(function () {
        //         ref.data = ref.$sampleData
        //         ref.data.forecast_avalanche_problems.sort(function (a, b) {
        //             return a.rank - b.rank
        //         })
        //         ref.loaded = true
        //         ref.$eventBus.$emit('loaded')
        //         ref.$nextTick(() => {
        //             var event = new Event('forecast-loaded')
        //             window.dispatchEvent(event)
        //         })
        //     }, 500)
        // }
    },
    mounted() {
        //trigger event for custom content to be loaded
        this.$eventBus.$emit('loading')
        this.date = this.$route.params.date
        // this.zone = this.$route.params.zone

        this.getZone()
        if (this.$route.query.nav && this.$route.query.nav != '') {
            this.tabSelected = this.$route.query.nav
        }
    },
}
</script>

<style module lang="scss">
@import "../assets/css/bootstrap/functions";
@import "../assets/css/_variables.scss";
@import "../assets/css/bootstrap/mixins";
</style>
