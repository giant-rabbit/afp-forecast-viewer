<template>
    <div v-if="loaded">
        <forecast-view product="forecast" :data="data" :config="config" :preview="preview" />
    </div>
</template>

<script>

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
    methods: {
        // getProduct() {
        //     this.$api
        //         .get('/forecast/54357')
        //         .then(response => {
        //             this.data = response.data
        //             this.loaded = true
        //         })
        //         .catch(e => {
        //             this.$eventBus.$emit('showAlert')
        //         })
        // },
        getProduct() {
            // load dummy data
            var ref = this
            setTimeout(function () {
                ref.data = ref.$sampleData
                ref.data.forecast_avalanche_problems.sort(function (a, b) {
                    return a.rank - b.rank
                })
                ref.loaded = true
                ref.$eventBus.$emit('loaded')
                ref.$nextTick(() => {
                    var event = new Event('forecast-loaded')
                    window.dispatchEvent(event)
                })
            }, 500)
        }
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
