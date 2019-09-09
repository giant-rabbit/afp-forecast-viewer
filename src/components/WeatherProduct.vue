<template>
    <div>
        <!-- Header -->
        <div :class="$style.row">
            <div :class="$style.metaColumn">
                <h5>Issued</h5>
                {{ data.published_time | publicDate }}
            </div>
            <div :class="$style.metaColumn">
                <h5>Author</h5>
                {{ data.author }}
            </div>
        </div>

        <!-- Weather discussion -->
        <div v-show="data.weather_discussion != ''" :class="$style.spacer">
            <h2>Weather Discussion</h2>
            <div v-html="data.weather_discussion"></div>
        </div>

        <!-- Weather tables -->
        <div v-for="(zone,index) in data.weather_data" :key="zone.zone_id" >
            <weather-table :periods="zone.periods" :data="zone.data" :zone="zone.zone_name" :key="index"/>
        </div>
    </div>
</template>

<script>
import WeatherTable from '../components/WeatherTable'

export default {
    props: ['data', 'config'],
    components: {
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

.container {
    composes: container from "../assets/css/style.css";
}

.row {
    composes: row from "../assets/css/style.css";
}

.metaColumn {
    composes: col-md-6 from "../assets/css/style.css";
    composes: col-12 from "../assets/css/style.css";
    margin-bottom: $spacer;
}
</style>
