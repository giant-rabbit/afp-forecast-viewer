<template>
    <div>
        <!-- Weather discussion -->
        <div
            v-show="data.weather_discussion != ''"
            class="afp-tinymce afp-mb-3"
            v-html="data.weather_discussion"
        ></div>

        <!-- Weather tables -->
        <div class="" v-for="zone in data.weather_data" :key="zone.zone_id">
            <weather-table
                :data="zone"
                :zone="zone.zone_name"
            />
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
