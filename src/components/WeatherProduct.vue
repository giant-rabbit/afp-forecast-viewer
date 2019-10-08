<template>
    <div>
        <div :class="$style.title">
            <h1>Weather Forecast</h1>
            <h2>
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

<style module lang="scss">
@import "../assets/css/bootstrap/functions";
@import "../assets/css/_variables.scss";
@import "../assets/css/bootstrap/mixins";

.title {
    h2 {
        color: $gray-700 !important;
        margin-bottom: 0 !important;
    }
    margin-bottom: $spacer;
}
</style>
