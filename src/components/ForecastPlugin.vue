<template>
    <!-- <div class="afp-forecast-view"> -->
    <div>
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
