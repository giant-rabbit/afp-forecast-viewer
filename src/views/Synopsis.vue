<template>
    <div>
        <div v-if="$centerMeta.config.blog" class="afp-container afp-pt-2">
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
        <forecast-view v-if="loaded && !notFound && $centerMeta.config.blog" product="synopsis" :data="data" />
        <div v-if="!$centerMeta.config.blog" class="afp-container afp-pt-2">
            <h4 class="afp-html-h4 afp-text-center">
                Sorry, this product is not enabled
            </h4>
        </div>
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
        '$route.params.year': {
            handler: function () {
                this.loaded = false
                this.notFound = false
                this.getProduct()
            }
        },
        '$route.params.month': {
            handler: function () {
                this.loaded = false
                this.notFound = false
                this.getProduct()
            }
        },
        '$route.params.day': {
            handler: function () {
                this.loaded = false
                this.notFound = false
                this.getProduct()
            }
        }
    },
    methods: {
        async getProduct() {
            if (this.$route.params.year != undefined && this.$route.params.month != undefined && this.$route.params.day != undefined) {
                this.date = this.$route.params.year + '-' + this.$route.params.month + '-' + this.$route.params.day 
            } else {
                this.date = ''
            }
            this.zone = this.$centerMeta.zones[0].id
            this.$api
                .get('/public/product?type=synopsis&center_id=' + this.$centerId + '&zone_id=' + this.zone + '&published_time=' + this.date)
                .then(response => {
                    if (response.data.published_time == null) {
                        this.notFound = true
                        this.loaded = true
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
