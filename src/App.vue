<template>
    <div id="afp" class="afp-forecast-view">
        <v-style v-if="this.$config.color">
            .afp-forecast-view a:not(.afp-native-link) {
            color: {{this.$config.color}} !important;
            }
            .afp-forecast-view a:not(.afp-native-link):hover,.afp-forecast-view a:not(.afp-native-link):focus {
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
        <link
            v-if="this.$config.assets.photoswipe"
            rel="stylesheet"
            href="https://unpkg.com/photoswipe/dist/photoswipe.css"
        />
        <link
            v-if="this.$config.assets.photoswipe"
            rel="stylesheet"
            href="https://unpkg.com/photoswipe/dist/default-skin/default-skin.css"
        />
        <link
            v-if="this.$config.assets.icons"
            href="https://cdn.materialdesignicons.com/3.6.95/css/materialdesignicons.min.css"
            media="all"
            rel="stylesheet"
            type="text/css"
        />
        <!-- <div style="background-color: #444;">
            <router-link to="/archive">Archive</router-link>
            <router-link :to="{ name: 'Forecast' }">Forecast</router-link>
            <router-link :to="{ name: 'Weather' }">Weather</router-link>
            <router-link :to="{ name: 'Synopsis' }">Synopsis</router-link>
        </div>-->
        <transition name="fade" mode="out-in">
            <keep-alive>
                <router-view
                    :key="$route.name + ($route.params.zone || '') + ($route.params.date || '') + ($route.params.product || '')"
                ></router-view>
            </keep-alive>
        </transition>
    </div>
</template>

<script>
import Vue from 'vue'

export default {
    name: 'app',
    data() {
        return {
        }
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
    }
}
</script>

<style lang="scss">
// Import global styles
@import "./assets/css/app.scss";
</style>
