<template>
    <div class="afp-container">
        <forecast-product
            v-if="product == 'forecast' || product == 'summary'"
            :preview="preview"
            :data="forecastData"
            :config="config"
            :zone="zone"
        />
        <weather-product
            v-if="product == 'weather'"
            :preview="preview"
            :data="forecastData"
            :config="config"
        />
        <synopsis-product
            v-if="product == 'synopsis'"
            :preview="preview"
            :data="forecastData"
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
            forecastData: {}
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
                        upper: "Upper Elevation",
                        middle: "Middle Elevation",
                        lower: "Lower Elevation"
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
    },
    // watch: {
    //     data: {
    //         handler: function () {
    //             this.data.hazard_discussion = this.tineMCEclass(this.data.hazard_discussion)
    //         }
    //     },
    // },
    methods: {
        tineMCEclass(search) {
            // Add AFP specific classes to TinyMCE tags
            search = JSON.stringify(search)
            search = search.replace(/<p/g, '<p class=\\"afp-html-p\\"')
            search = search.replace(/<a/g, '<a class=\\"afp-html-a\\"')
            search = search.replace(/<hr>/g, '<hr class=\\"afp-html-hr\\">')
            search = search.replace(/<table/g, '<table class=\\"afp-html-table\\"')
            search = search.replace(/<figure class=\\"/g, '<figure class=\\"afp-html-figure afp-tinymce-figure ')
            search = search.replace(/<img/g, '<img class=\\"afp-html-img afp-tinymce-img\\"')
            search = search.replace(/<h1>/g, '<h1 class=\\"afp-html-h1\\">')
            search = search.replace(/<h2>/g, '<h2 class=\\"afp-html-h2\\">')
            search = search.replace(/<h3>/g, '<h3 class=\\"afp-html-h3\\">')
            search = search.replace(/<h4>/g, '<h4 class=\\"afp-html-h4\\">')
            search = search.replace(/<h5>/g, '<h5 class=\\"afp-html-h5\\">')
            search = search.replace(/<h6>/g, '<h6 class=\\"afp-html-h6\\">')
            search = search.replace(/<ul>/g, '<ul class=\\"afp-html-ul\\">')
            search = search.replace(/<li>/g, '<li class=\\"afp-html-li\\">')
            search = search.replace(/<iframe/g, '<iframe class=\\"afp-html-iframe\\"')
            return JSON.parse(search)
        },
    },
    mounted() {
        this.forecastData = this.data
        this.forecastData = this.tineMCEclass(this.forecastData)
    }
}
</script>

<style scoped lang="scss">
@import "../assets/bootstrap4/_functions.scss";
@import "../assets/bootstrap4/_variables.scss";

.afp-container {
    min-height: 300px;
    position: relative;
    padding-top: 0.5 * $spacer;
    @media print {
        width: 100% !important;
        max-width: none;
    }
}
</style>
