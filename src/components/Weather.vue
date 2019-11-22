<template>
    <div>
        <div :class="$style.container">
            <not-found v-if="notFound" />
            <loader />
        </div>
        <forecast-view v-if="loaded" product="weather" :data="data" />
    </div>
</template>

<script>
import Loader from '../components/Loader'
import NotFound from '../components/NotFound'

export default {
    data() {
        return {
            date: '',
            zone: this.$centerMeta.zones[0].id,
            data: {},
            loaded: false,
            notFound: false
        }
    },
    components: {
        Loader,
        NotFound
    },
    methods: {
        getWeather() {
            this.$api
                .get('/public/product?type=weather&center_id=' + this.$centerId + '&zone_id=' + this.zone)
                .then(response => {
                    if (response.data.published_time == null) {
                        this.notFound = true
                        this.$eventBus.$emit('loaded')
                    } else {
                        this.data = response.data
                        this.loaded = true
                        this.$eventBus.$emit('loaded')
                    }
                })
                .catch(e => {
                    this.notFound = true
                    this.$eventBus.$emit('loaded')
                })
        }
    },
    mounted() {
        this.$eventBus.$emit('loading')
        this.getWeather()
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
</style>
