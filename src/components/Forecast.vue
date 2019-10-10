<template>
    <div>
        <alert />
        <loader />
        <!-- need logic for whether to show forecast or summary -->
        <forecast-view
            v-if="loaded"
            product="forecast"
            :data="data"
            :config="config"
            :preview="preview"
        />
    </div>
</template>

<script>
import Loader from '../components/Loader'
import Alert from '../components/Alert'

export default {
    data() {
        return {
            zone: '',
            date: '',
            config: this.$config,
            data: null,
            preview: false,
            loaded: false
        }
    },
    components: {
        Loader,
        Alert
    },
    methods: {
        getProduct() {
            this.$api
                .get('/public/product?type=forecast&center_id=' + this.$centerId + '&zone_id=293')
                .then(response => {
                    this.data = response.data
                    this.data.forecast_avalanche_problems.sort(function (a, b) {
                        return a.rank - b.rank
                    })
                    this.loaded = true
                    this.$eventBus.$emit('loaded')
                    // Where to put this (below)?
                    // ref.$nextTick(() => {
                    //     var event = new Event('forecast-loaded')
                    //     window.dispatchEvent(event)
                    // })
                })
                .catch(e => {
                    this.$eventBus.$emit('showAlert')
                })
        },
        // getProduct() {
        //     // load dummy data
        //     var ref = this
        //     setTimeout(function () {
        //         ref.data = ref.$sampleData
        //         ref.data.forecast_avalanche_problems.sort(function (a, b) {
        //             return a.rank - b.rank
        //         })
        //         ref.loaded = true
        //         ref.$eventBus.$emit('loaded')
        //         ref.$nextTick(() => {
        //             var event = new Event('forecast-loaded')
        //             window.dispatchEvent(event)
        //         })
        //     }, 500)
        // }
    },
    mounted() {
        //trigger event for custom content to be loaded
        this.$eventBus.$emit('loading')
        this.date = this.$route.params.date
        this.zone = this.$route.params.zone
        this.getProduct()
        if (this.$route.query.nav && this.$route.query.nav != '') {
            this.tabSelected = this.$route.query.nav
        }
    },
}
</script>

<style module lang="scss">
@import "../assets/css/bootstrap/functions";
@import "../assets/css/_variables.scss";
@import "../assets/css/bootstrap/mixins";
</style>
