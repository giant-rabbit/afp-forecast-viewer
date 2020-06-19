<template>
    <div>
        <!-- Weather discussion -->
        <div
            v-show="data.weather_discussion != ''"
            class="afp-tinymce afp-mb-3"
            v-html="data.weather_discussion"
        ></div>

        <!-- Weather tables -->
        <div v-for="(zone, index) in data.weather_data" :key="'weatherTable' + index">
            <weather-table :data="zone" />
        </div>
    </div>
</template>

<script>
import ProductHeader from '../components/ProductHeader'
import WeatherTable from '../components/WeatherTable'

export default {
    props: ['data'],
    components: {
        ProductHeader,
        WeatherTable
    }
}
</script>
