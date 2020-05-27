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
        <video-modal
            @close="videoModal = false"
            :show="videoModal"
            :caption="videoCaption"
            :id="videoId"
        />
    </div>
</template>

<script>
//import moment from 'moment'
import ForecastProduct from '../components/ForecastProduct'
import WeatherProduct from '../components/WeatherProduct'
import SynopsisProduct from '../components/SynopsisProduct'
import VideoModal from '../components/VideoModal'

export default {
    data() {
        return {
            forecastData: {},
            videoModal: false,
            videoCaption: '',
            videoId: ''
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
        SynopsisProduct,
        VideoModal
    },
    methods: {
        tineMCEclass(search) {
            // Add AFP specific classes to TinyMCE tags
            search = JSON.stringify(search)
            search = search
                .replace(/<p/g, '<p class=\\"afp-html-p\\"')
                .replace(/<a/g, '<a class=\\"afp-html-a\\"')
                .replace(/<hr>/g, '<hr class=\\"afp-html-hr\\">')
                .replace(/<table/g, '<table class=\\"afp-html-table\\"')
                .replace(/<figure class=\\"/g, '<figure class=\\"afp-html-figure afp-tinymce-figure ')
                .replace(/<img/g, '<img class=\\"afp-html-img afp-tinymce-img\\"')
                .replace(/<h1>/g, '<h1 class=\\"afp-html-h1\\">')
                .replace(/<h2>/g, '<h2 class=\\"afp-html-h2\\">')
                .replace(/<h3>/g, '<h3 class=\\"afp-html-h3\\">')
                .replace(/<h4>/g, '<h4 class=\\"afp-html-h4\\">')
                .replace(/<h5>/g, '<h5 class=\\"afp-html-h5\\">')
                .replace(/<h6>/g, '<h6 class=\\"afp-html-h6\\">')
                .replace(/<ul>/g, '<ul class=\\"afp-html-ul\\">')
                .replace(/<li>/g, '<li class=\\"afp-html-li\\">')
                .replace(/<iframe/g, '<iframe class=\\"afp-html-iframe afp-tinymce-iframe\\"')
            return JSON.parse(search)
        }
    },
    mounted() {
        this.forecastData = this.data
        this.forecastData = this.tineMCEclass(this.forecastData)
        this.$nextTick(function () {
            // add event listener to open video modal
            var videos = document.querySelectorAll('.afp-video-modal')
            videos.forEach(el => {
                var caption = el.getElementsByTagName('figcaption')
                if(caption.length != 0) {
                    var image = el.getElementsByTagName('img')
                    caption = caption[0].innerHTML
                    image[0].setAttribute('data-video-caption', caption)
                }
                el.addEventListener('click', event => {
                    this.videoId = event.target.dataset.videoId
                    this.videoCaption = event.target.dataset.videoCaption
                    this.videoModal = true
                })
            })
            // add data atttributes to figures to open in photoswipe
            var figures = document.querySelectorAll('.afp-photoswipe')
            figures.forEach((figure) => {
                var caption = figure.getElementsByTagName('figcaption')
                var image = figure.getElementsByTagName('img')
                caption = caption[0].innerHTML
                image[0].setAttribute('data-pswp-title', caption)
                image[0].setAttribute('data-pswp-src', image[0].src)
            })
        })
    }
}

</script>

<style lang="scss">
// Do the following in plugin so it's available when used as stand-along previewer
// Import prefixed Bootstrap 4
$class-prefix: "afp";
@import "../assets/bootstrap4/bootstrap.scss";

// Import app stylesheet
@import "../assets/app.scss";
</style>

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
