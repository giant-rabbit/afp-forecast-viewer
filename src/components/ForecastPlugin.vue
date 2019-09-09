<template>
    <div class="afp-forecast-view" :class="$style.container">
        <forecast-product v-if="product == 'forecast'" :data="data" :config="config"/>
        <weather-product v-if="product == 'weather'" :data="data" :config="config"/>
    </div>
</template>

<script>
//import moment from 'moment'
import ForecastProduct from '../components/ForecastProduct'
import WeatherProduct from '../components/WeatherProduct'

export default {
    data() {
        return {
        }
    },
    props: {
        data: {
            type: Object,
            default: {}
        },
        product: {
            type: String,
            default: 'forecast'
        },
        config: {
            type: Object,
            default: function () {
                return {
                    elevations: {
                        upper: "Alpine",
                        middle: "Treeline",
                        lower: "Below Treeline"
                    },
                    assets: {
                        icons: true,
                        photoswipe: true
                    }
                }
            }
        }
    },
    components: {
        ForecastProduct,
        WeatherProduct
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
</style>
