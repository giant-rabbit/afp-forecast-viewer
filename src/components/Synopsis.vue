<template>
    <div :class="$style.container">
        <button
            @click="$router.replace({ name: 'ArchiveTab', params: { tab: 'synopsis' } })"
            :class="$style.btn"
            class="afp-btn-primary"
        ><i class="mdi mdi-arrow-left"></i> Archive</button>
        <not-found v-if="notFound" />
        <loader />
        <forecast-view
            v-if="loaded"
            product="synopsis"
            :data="data"
            :preview="preview"
        />
    </div>
</template>

<script>
import Loader from '../components/Loader'
import NotFound from '../components/NotFound'

export default {
    data() {
        return {
            date: '',
            zone: '',
            data: {},
            preview: false,
            loaded: false,
            notFound: false
        }
    },
    components: {
        Loader,
        NotFound
    },
    watch: {
        '$route.params.date': {
            handler: function () {
                this.loaded = false
                this.notFound = false
                this.$eventBus.$emit('loading')
                this.getProducts()
            },
            deep: true,
            immediate: true
        }
    },
    methods: {
        async getProducts() {
            if (this.$route.params.date != undefined) {
                this.date = this.$route.params.date
            } else {
                this.date = ''
            }
            this.$api
                .get('/avalanche-center/' + this.$centerId)
                .then(response => {
                    this.zone = response.data.zones[0].id
                    this.getSynopsis()
                })
                .catch(e => {
                    // this.$router.push({ name: 'NotFound' })
                })
        },
        getSynopsis() {
            this.$api
                .get('/public/product?type=synopsis&center_id=' + this.$centerId + '&zone_id=' + this.zone + '&published_time=' + this.date)
                .then(response => {
                    if (response.data.published_time == null) {
                        this.notFound = true
                        this.$eventBus.$emit('loaded')
                    } else {
                        this.data = response.data
                        this.loaded = true
                        this.$eventBus.$emit('loaded')
                    }
                })
                .catch(e => {
                    this.notFound = true
                    this.$eventBus.$emit('loaded')
                })
        }
    },
    mounted() {
        this.$eventBus.$emit('loading')
        this.getProducts()
    },
}
</script>

<style module lang="scss">
@import "../assets/css/bootstrap/functions";
@import "../assets/css/_variables.scss";
@import "../assets/css/bootstrap/mixins";

.container {
    min-height: 100vh;
}

.btn {
    composes: btn from "../assets/css/style.css";
    composes: btn-secondary from "../assets/css/style.css";
    margin-bottom: .5*$spacer;
}
</style>
