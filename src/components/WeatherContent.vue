<template>
    <div>
        <!-- Weather discussion -->
        <div
            v-show="data.weather_discussion != ''"
            :class="$style.spacer"
            v-html="data.weather_discussion"
        ></div>

        <!-- Weather tables -->
        <div :class="$style.wxTable" v-for="(zone,index) in data.weather_data" :key="zone.zone_id">
            <weather-table
                :periods="zone.periods"
                :data="zone.data"
                :zone="zone.zone_name"
                :key="index"
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

<style module lang="scss">
@import "../assets/css/bootstrap/functions";
@import "../assets/css/_variables.scss";
@import "../assets/css/bootstrap/mixins";

.spacer {
    margin-bottom: $spacer;
}
.wxTable {
    @media print {
        display: none;
    }
}
</style>
