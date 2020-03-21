<template>
    <div>
        <!-- discussion -->
        <div :class="[$style.clearfix, $style.spacer]" class="afp-synopsis" v-html="data.hazard_discussion"></div>

        <!-- media -->
        <media-gallery v-if="data.media.length > 0" :media="data.media" scope="scope-synopsis" key="synopsis" />

        <!-- Older posts -->
        <div v-if="!preview" :class="[$style.textCenter, $style.spacer]">
            <button
                @click="$router.replace({ name: 'ArchiveProduct', params: { product: 'blog' } })"
                :class="$style.btn"
                class="afp-btn-primary"
            >View Previous Posts</button>
        </div>
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

<style module lang="scss">
@import "../assets/css/bootstrap/functions";
@import "../assets/css/_variables.scss";
@import "../assets/css/bootstrap/mixins";

.spacer {
    margin-bottom: $spacer;
}

.clearfix::after {
    display: block;
    content: "";
    clear: both;
}

.container {
    margin-bottom: $spacer;
}

.btn {
    composes: btn from "../assets/css/style.css";
    composes: btn-primary from "../assets/css/style.css";
}

.textCenter {
    text-align: center;
}
</style>