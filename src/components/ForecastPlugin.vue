<template>
    <!-- <div class="afp-forecast-view"> -->
    <div :class="$style.container">
        <forecast-product
            v-if="product == 'forecast' || product == 'summary'"
            :preview="preview"
            :data="data"
            :config="config"
            :zone = "zone"
        />
        <weather-product
            v-if="product == 'weather'"
            :preview="preview"
            :data="data"
            :config="config"
        />
        <synopsis-product
            v-if="product == 'synopsis'"
            :preview="preview"
            :data="data"
            :config="config"
        />
    </div>
</template>

<script>
//import moment from 'moment'
import ForecastProduct from '../components/ForecastProduct'
import WeatherProduct from '../components/WeatherProduct'
import SynopsisProduct from '../components/SynopsisProduct'

export default {
    data() {
        return {
        }
    },
    props: {
        data: {
            type: Object
        },
        preview: {
            type: Boolean,
            default: false
        },
        product: {
            type: String,
            default: 'forecast'
        },
        zone: {
            type: String,
            default: ''
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
        WeatherProduct,
        SynopsisProduct
    }
}
</script>

<style module lang="scss">
@import "../assets/css/bootstrap/functions";
@import "../assets/css/_variables.scss";
@import "../assets/css/bootstrap/mixins";

.container {
    composes: container from "../assets/css/style.css";
    min-height: 300px;
    position: relative;
    padding-top: .5*$spacer;
    @media print {
        width: 100% !important;
        max-width: none;
    }
}
</style>
