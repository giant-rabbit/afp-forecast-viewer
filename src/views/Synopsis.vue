<template>
    <div>
        <div class="afp-container afp-pt-2">
            <button
                v-if="date != ''"
                @click="$router.replace({ name: 'ArchiveProduct', params: { product: 'blog' } })"
                class="afp-html-button afp-btn afp-btn-primary"
            >
                <i class="mdi mdi-arrow-left"></i> Archive
            </button>
            <not-found v-if="notFound" />
            <loader :show="!loaded" />
        </div>
        <forecast-view v-if="loaded && !notFound" product="synopsis" :data="data" />
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
                    } else {
                        this.data = response.data
                        this.loaded = true
                    }
                })
                .catch(e => {
                    this.loaded = true
                    this.notFound = true
                })
        }
    },
    mounted() {
        this.getProduct()
        this.trackPage('Conditions Blog')
    },
}
</script>
