<template>
    <div class="afp-container afp-pt-3">
        <!-- Title -->
        <div class="afp-mb-3">
            <button
                v-if="product"
                @click="$router.replace({ name: 'Archive' })"
                class="afp-html-button afp-btn afp-btn-primary afp-mb-2"
            >
                <i class="mdi mdi-arrow-left"></i> All Products
            </button>
            <h1 class="afp-html-h1">Forecast Archive</h1>
            <h2 class="afp-html-h2 afp-gray-700 afp-zone-title" v-if="productName" v-html="productName"></h2>
            <h2 class="afp-html-h2 afp-gray-700" v-else>Choose a zone or product:</h2>
        </div>

        <!-- Product selector buttons -->
        <div v-if="!product" class="afp-row">
            <div class="afp-col-md-8 afp-col-lg-6">
                <button
                    class="afp-html-button afp-btn afp-btn-archive"
                    @click="$router.replace({ name: 'ArchiveProduct', params: { product: urlString(zone.name) } })"
                    v-for="zone in centerMeta.zones"
                    :key="zone.id"
                >{{zone.name}}</button>
                <button
                v-if="centerMeta.config.blog"
                    @click="$router.replace({ name: 'ArchiveProduct', params: { product: 'blog' } })"
                    class="afp-html-button afp-btn afp-btn-archive afp-mt-3"
                >Conditions Blog</button>
            </div>
        </div>

        <!-- Archive -->
        <keep-alive>
            <content-panel v-if="product">
                <!-- Forecast Archive -->
                <forecast-list v-if="product != '' && product !='blog'" :zone="product" />

                <!-- Blog Archive tab -->
                <synopsis-list v-if="product == 'blog'" />
            </content-panel>
        </keep-alive>
        <disclaimer />
    </div>
</template>

<script>
import Tabs from '../components/Tabs'
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
            }
        }
    },
    mounted() {
        this.getArchive()
        this.trackPage('Archive')
    }
}
</script>

<style scoped lang="scss">
@import "../assets/bootstrap4/_functions.scss";
@import "../assets/bootstrap4/_variables.scss";
@import "../assets/bootstrap4/_mixins.scss";

.afp-container {
    min-height: 100vh;
}

.afp-btn.afp-btn-archive {
    background-color: #fff;
    border-color: $gray-400;
    color: $gray-700;
    position: relative;
    padding: 0.6rem 1rem;
    box-shadow: $app-box-shadow;
    width: 100%;
    margin-bottom: 0.3rem;
    text-align: left;
    padding-right: 3rem;
    &:hover {
        border-color: $gray-500;
    }
    &:after {
        content: "";
        border-left: 2px solid $gray-500;
        border-bottom: 2px solid $gray-500;
        position: absolute;
        right: 1rem;
        top: 1rem;
        width: 0.6rem;
        height: 0.6rem;
        transform: rotate(-135deg);
    }
}
</style>
