<template>
    <div v-if="loaded">
        <forecast-view product="weather" :data="data" :config="config" :preview="preview" />
    </div>
</template>

<script>

export default {
    data() {
        return {
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
                ref.loaded = true
                ref.$eventBus.$emit('loaded')
            }, 500)
        }
    },
    mounted() {
        //trigger event for custom content to be loaded
        this.$eventBus.$emit('loading')
        //this.date = this.$route.params.date
        this.getProduct()
    },
}
</script>
