<template>
    <div>
        <div class="afp-container afp-pt-2">
            <div v-if="notFound" style="min-height: 80vh;">
                There is no current Weather Forecast product to display. View the
                <router-link :to="{ name: 'Forecast'}">Current Avalanche Forecast</router-link>product.
            </div>
            <loader :show="!loaded" />
        </div>
        <forecast-view v-if="loaded && !notFound" product="weather" :data="data" />
    </div>
</template>

<script>
import Loader from '../components/Loader'

export default {
    data() {
        return {
            date: '',
            zone: this.$centerMeta.zones[0].id,
            data: {},
            loaded: false,
            notFound: false,
            centerMeta: this.$centerMeta,
        }
    },
    components: {
        Loader
    },
    methods: {
        getWeather() {
            this.$api
                .get('/public/product?type=weather&center_id=' + this.$centerId + '&zone_id=' + this.zone)
                .then(response => {
                    if (response.data.published_time == null) {
                        this.notFound = true
                    } else {
                        this.data = response.data
                        if (this.data.weather_data.length > 0) {
                            var tables = []
                            this.centerMeta.zones.forEach(item => {
                                let temp = this.data.weather_data.find(temp => temp.zone_id == item.id)
                                tables.push(temp)
                            })
                            this.data.weather_data = tables
                        } 
                        this.loaded = true
                    }
                })
                .catch(e => {
                    this.loaded = true
                    this.notFound = true
                })
        }
    },
    mounted() {
        this.getWeather()
    },
}
</script>
