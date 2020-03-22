<template>
    <div>
        <div class="afp-weather afp-mb-3">
            <h1 class="afp-html-h1">Weather Forecast</h1>
            <h2 class="afp-html-h2">
                <i class="mdi mdi-map-marker"></i>
                All Zones
            </h2>
        </div>
        <!-- Header -->
        <product-header
            :preview="preview"
            :published="data.published_time"
            :expires="false"
            :author="data.author"
        />

        <content-panel>
            <!-- Content -->
            <weather-content :data="data" />
        </content-panel>
        <disclaimer />
    </div>
</template>

<script>
import ProductHeader from '../components/ProductHeader'
import ContentPanel from '../components/ContentPanel'
import WeatherContent from '../components/WeatherContent'
import Disclaimer from '../components/Disclaimer'

export default {
    data() {
        return {
            date: ''
        }
    },
    props: ['preview', 'data', 'config'],
    components: {
        ProductHeader,
        ContentPanel,
        WeatherContent,
        Disclaimer
    },
}
</script>

<style scoped lang="scss">
@import "../assets/bootstrap4/_functions.scss";
@import "../assets/bootstrap4/_variables.scss";

.afp-weather {
    .afp-html-h2 {
        color: $gray-700 !important;
    }
}
</style>
