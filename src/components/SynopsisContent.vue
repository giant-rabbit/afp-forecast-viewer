<template>
    <div>
        <photoswipe key="blog">
            <!-- discussion -->
            <div class="afp-tinymce afp-mb-3" v-html="data.hazard_discussion"></div>

            <!-- media -->
            <media-gallery
                v-if="data.hasOwnProperty('media') && data.media.length > 0"
                :media="data.media"
                key="synopsis"
            />

            <!-- Older posts -->
            <div v-if="!preview" class="afp-text-center afp-mb-3">
                <button
                    @click="$router.replace({ name: 'ArchiveProduct', params: { product: 'blog' } })"
                    class="afp-html-button afp-btn afp-btn-primary"
                >View Previous Posts</button>
            </div>
        </photoswipe>
    </div>
</template>

<script>
import ProductHeader from '../components/ProductHeader'
import MediaGallery from '../components/MediaGallery'

export default {
    data() {
        return {
        }
    },
    props: ['data', 'config', 'preview'],
    components: {
        ProductHeader,
        MediaGallery
    }
}
</script>