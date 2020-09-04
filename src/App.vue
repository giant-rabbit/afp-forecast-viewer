<template>
    <div id="afp" class="afp-forecast-view afp-html-body">
        <v-style v-if="this.$config.color">
            .afp-forecast-view a:not(.afp-native-link):not(.afp-btn-primary) {
            color: {{this.$config.color}} !important;
            }
            .afp-forecast-view a:not(.afp-native-link):not(.afp-btn-primary):hover,.afp-forecast-view a:not(.afp-native-link):not(.afp-btn-primary):focus {
            color: {{luminance(this.$config.color,-0.3)}} !important;
            }
            .afp-forecast-view .afp-btn-primary {
            background-color: {{this.$config.color}} !important;
            border-color: {{this.$config.color}} !important;
            color: #ffffff !important;
            }
            .afp-forecast-view .afp-btn-primary:hover, .afp-forecast-view .afp-btn-primary:focus {
            background-color: {{luminance(this.$config.color,-0.3)}} !important;
            border-color: {{luminance(this.$config.color,-0.3)}} !important;
            color: #ffffff !important;
            }
            .afp-forecast-view .afp-checkbox:checked:before {
            color: {{this.$config.color}} !important;
            }
        </v-style>
        <router-view
            v-if="loaded && !error"
            :key="$route.name + ($route.params.zone || '') + ($route.params.date || '') + ($route.params.product || '')"
        ></router-view>
        <loader :show="!loaded" />
        <div v-if="error && loaded" class="afp-container afp-pt-2">
            <alert show="true" />
        </div>
        <back-to-top />
    </div>
</template>

<script>
import Vue from 'vue'
import BackToTop from './components/BackToTop'
import Loader from './components/Loader'
import Alert from './components/Alert'

export default {
    name: 'app',
    data() {
        return {
            loaded: false,
            error: false
        }
    },
    components: {
        BackToTop,
        Loader,
        Alert
    },
    methods: {
        // Function to darken link color
        luminance(hex, lum) {
            // validate hex string
            hex = String(hex).replace(/[^0-9a-f]/gi, '');
            if (hex.length < 6) {
                hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
            }
            lum = lum || 0;
            // convert to decimal and change luminosity
            var rgb = "#", c, i;
            for (i = 0; i < 3; i++) {
                c = parseInt(hex.substr(i * 2, 2), 16);
                c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
                rgb += ("00" + c).substr(c.length);
            }
            return rgb;
        }
    },
    mounted() {
        this.$api
            .get('/public/avalanche-center/' + this.$centerId)
            .then(response => {
                var centerMeta = response.data
                
                // Temporarily reduce to one zone
                // var zone = centerMeta.zones[0]
                // centerMeta.zones = []
                // centerMeta.zones.push(zone)

                // Reorder zones if config property is set
                if (centerMeta.config.hasOwnProperty('zone_order') && centerMeta.zones.length > 1) {
                    var zones = []
                    centerMeta.config.zone_order.forEach(item => {
                        var zone = centerMeta.zones.find(zone => zone.id == item)
                        zones.push(zone)
                    })
                    centerMeta.zones = zones
                }
                Vue.prototype.$centerMeta = centerMeta
                console.log(Vue.prototype.$centerMeta)
                this.loaded = true
            })
            .catch(e => {
                console.log('error retrieving avalanche center meta')
                this.error = true
                this.loaded = true
            })

    }
}
</script>

<style lang="scss">
// Bootstrap 4 is imported in the plugin (ForecastPlugin.vue) so it's available when used as stand-along previewer

// // Import prefixed Bootstrap 4
// $class-prefix: "afp";
// @import "./assets/bootstrap4/bootstrap.scss";

// // Import app stylesheet
// @import "./assets/app.scss";
</style>
