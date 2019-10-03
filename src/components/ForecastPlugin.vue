<template>
    <!-- <div class="afp-forecast-view"> -->
    <div>
        <forecast-product v-if="product == 'forecast'" :data="data" :config="config" />
        <weather-product v-if="product == 'weather'" :data="data" :config="config" />
        <summary-product v-if="product == 'summary'" :data="data" :config="config" />
        <synopsis-product v-if="product == 'synopsis'" :data="data" :config="config" />
    </div>
</template>

<script>
//import moment from 'moment'
import ForecastProduct from '../components/ForecastProduct'
import WeatherProduct from '../components/WeatherProduct'
import SummaryProduct from '../components/SummaryProduct'
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
        WeatherProduct,
        SummaryProduct,
        SynopsisProduct
    }
}
</script>
