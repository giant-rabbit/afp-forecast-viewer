<template>
    <div>
        <div :class="$style.container">
            <button
                v-if="date != ''"
                @click="$router.replace({ name: 'ArchiveProduct', params: { product: 'blog' } })"
                :class="$style.btn"
                class="afp-btn-primary"
            >
                <i class="mdi mdi-arrow-left"></i> Archive
            </button>
            <not-found v-if="notFound" />
            <loader />
        </div>
        <forecast-view v-if="loaded" product="synopsis" :data="data" />
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
                this.getProduct()
            },
            deep: true,
            immediate: true
        }
    },
    methods: {
        async getProduct() {
            if (this.$route.params.date != undefined) {
                this.date = this.$route.params.date
            } else {
                this.date = ''
            }
            this.zone = this.$centerMeta.zones[0].id
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
        this.getProduct()
    },
}
</script>

<style module lang="scss">
@import "../assets/css/bootstrap/functions";
@import "../assets/css/_variables.scss";
@import "../assets/css/bootstrap/mixins";

.container {
    composes: container from "../assets/css/style.css";
    padding-top: .5*$spacer;
}
.btn {
    composes: btn from "../assets/css/style.css";
    composes: btn-primary from "../assets/css/style.css";
}
</style>
