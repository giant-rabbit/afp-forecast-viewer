<template>
    <div>
        <!-- Title -->
        <h1 :class="$style.title">Archive</h1>

        <!-- Tab navigation -->
        <tabs ref="tabs" :tabs="tabs" :selected="tabSelected" @changeTab="changeTab" />

        <!-- Tab container -->
        <content-panel :class="$style.panel">
            <alert />
            <loader />
            <!-- Forecast Archive tab -->
            <div v-if="tabSelected == 'forecast'" :class="$style.tabPane">
                <forecast-list />
            </div>

            <!-- Synopsis Archive tab -->
            <div v-if="tabSelected == 'synopsis'" :class="$style.tabPane">
                <synopsis-list />
            </div>
        </content-panel>
        <disclaimer />
    </div>
</template>

<script>
import Tabs from '../components/Tabs'
import Loader from '../components/Loader'
import Alert from '../components/Alert'
import ContentPanel from '../components/ContentPanel'
import ForecastList from '../components/ForecastList'
import SynopsisList from '../components/SynopsisList'
import Disclaimer from '../components/Disclaimer'

export default {
    name: 'Archive',
    data() {
        return {
            // make tabs a computed property conditional on preview, weather, and synopsis
            tabs: [
                {
                    id: "forecast",
                    name: "Avalanche Forecasts"
                },
                {
                    id: "synopsis",
                    name: "Regional Synopses"
                }
            ],
            tabSelected: "forecast"
        }
    },
    components: {
        Tabs,
        Loader,
        Alert,
        ContentPanel,
        ForecastList,
        SynopsisList,
        Disclaimer
    },
    methods: {
        changeTab(tab) {
            this.tabSelected = tab
            this.$router.push({ name: "ArchiveTab", params: { tab: this.tabSelected } })
        }
    },
    mounted() {
        var tab = this.$route.params.tab
        if (tab != undefined) {
            this.tabSelected = tab
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

.panel {
    padding-top: 1rem !important;
}

.tabPane {
    min-height: 80vh;
}
</style>
