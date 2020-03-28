<template>
    <div>
        <div class="afp-mb-3">
            <h1 class="afp-html-h1">Weather Forecast</h1>
            <h2 class="afp-html-h2 afp-gray-700">
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

