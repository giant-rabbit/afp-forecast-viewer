<template>
    <div>
        <!-- Title -->
        <h1 :class="$style.title">Archive</h1>

        <!-- Tab navigation -->
        <tabs ref="tabs" :tabs="tabs" :selected="tabSelected" @changeTab="changeTab" />

        <!-- Tab container -->
        <content-panel>
            <!-- Forecast Archive tab -->
            <div v-show="tabSelected == 'forecast'" :class="$style.tabPane"></div>

            <!-- Synopsis Archive tab -->
            <div v-if="tabSelected == 'synopsis'" :class="$style.tabPane"></div>
        </content-panel>
        <disclaimer />
    </div>
</template>

<script>
import Tabs from '../components/Tabs'
import ContentPanel from '../components/ContentPanel'
import AvalancheDanger from '../components/AvalancheDanger'
import AvalancheProblem from '../components/AvalancheProblem'
import MediaGallery from '../components/MediaGallery'
import WeatherContent from '../components/WeatherContent'
import WeatherTable from '../components/WeatherTable'
import SynopsisContent from '../components/SynopsisContent'
import Disclaimer from '../components/Disclaimer'

export default {
    data() {
        return {
            // make tabs a computed property conditional on preview, weather, and synopsis
            tabs: [
                {
                    id: "forecast",
                    name: "Avalanche Forecast"
                },
                {
                    id: "synopsis",
                    name: "Regional Synopsis"
                }
            ],
            tabSelected: "forecast"
        }
    },
    components: {
        Tabs,
        ContentPanel,
        Disclaimer
    },
    methods: {
        changeTab(tab) {
            this.tabSelected = tab
            this.$router.push({ query: { nav: this.tabSelected } })
        }
    },
    mounted() {
        if (this.$route.query.nav && this.$route.query.nav != '') {
            this.tabSelected = this.$route.query.nav
        }
    }
}
</script>

<style module lang="scss">
@import "../assets/css/bootstrap/functions";
@import "../assets/css/_variables.scss";
@import "../assets/css/bootstrap/mixins";

.title {
    margin-bottom: $spacer !important;
}

.row {
    composes: row from "../assets/css/style.css";
    margin-bottom: $spacer;
}
</style>
