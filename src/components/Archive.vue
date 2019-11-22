<template>
    <div :class="$style.container">
        <!-- Title -->
        <div :class="$style.title">
            <button
                v-if="product"
                @click="$router.replace({ name: 'Archive' })"
                :class="$style.btn"
                class="afp-btn-primary"
            >
                <i class="mdi mdi-arrow-left"></i> All Products
            </button>
            <h1>Forecast Archive</h1>
            <h2 v-if="productName" v-html="productName"></h2>
            <h2 v-else>Choose a zone or product:</h2>
        </div>

        <!-- Product selector buttons -->
        <div v-if="!product" :class="$style.productButtons">
            <button
                :class="$style.productButton"
                @click="$router.replace({ name: 'ArchiveProduct', params: { product: urlString(zone.name) } })"
                v-for="zone in centerMeta.zones"
                :key="zone.id"
            >{{zone.name}}</button>
        </div>
        <div v-if="!product" :class="$style.productButtons">
            <button
                @click="$router.replace({ name: 'ArchiveProduct', params: { product: 'blog' } })"
                :class="$style.productButton"
            >Conditions Blog</button>
        </div>

        <!-- Archive -->
        <content-panel v-if="product" :class="$style.panel">
            <alert />
            <loader />
            <!-- Forecast Archive -->
            <forecast-list v-if="product != '' && product !='blog'" :zone="product" />

            <!-- Blog Archive tab -->
            <synopsis-list v-if="product == 'blog'" />
            
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
            centerMeta: this.$centerMeta,
            product: '',
            productName: '',
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
    watch: {
        '$route.params.product': {
            handler: function () {
                this.getArchive()
            }
        },
    },
    methods: {
        urlString(string) {
            string = string.replace(/ /g, '-')
            string = string.toLowerCase()
            return string
        },
        getArchive() {
            this.product = this.$route.params.product
            if (this.product == undefined) {
                this.product = ""
                this.productName = ""
            } else if (this.product == 'blog') {
                this.productName = "Conditions Blog"
            } else {
                // convert URL zone slug to zone id
                this.product = this.product.replace(/-/g, ' ');
                this.product = this.product.toLowerCase().split(' ').map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join(' ')
                let zone = this.centerMeta.zones.find(zone => zone.name == this.product)
                this.product = zone.id
                this.productName = '<i class="mdi mdi-map-marker"></i>' + zone.name
                // this.loaded = false
                // this.notFound = false
                // this.$eventBus.$emit('loading')
                // this.getProducts()
            }
        }
    },
    mounted() {
        this.getArchive()
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
    min-height: 100vh;
    position: relative;
    padding-top: $spacer;
    @media print {
        width: 100% !important;
        max-width: none;
    }
}

.title {
    h2 {
        color: $gray-700 !important;
    }
    margin-bottom: $spacer !important;
}
.btn {
    composes: btn from "../assets/css/style.css";
    composes: btn-primary from "../assets/css/style.css";
    margin-bottom: .5 * $spacer !important;
}

.productButtons {
    margin-bottom: $spacer;
    @include media-breakpoint-up(md) {
        width: 75%;
        margin-left: auto;
        margin-right: auto;
    }
    @include media-breakpoint-up(lg) {
        width: 50%;
    }
}

.productButton {
    composes: btn from "../assets/css/style.css";
    background-color: #fff;
    border-color: $gray-400;
    color: $gray-700;
    position: relative;
    padding: 0.6rem 0.75rem;
    box-shadow: $app-box-shadow;
    width: 100%;
    margin-bottom: 0.3rem;
    &:hover {
        border-color: $gray-500;
    }
}
</style>
