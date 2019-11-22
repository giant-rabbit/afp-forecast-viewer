<template>
    <div>
        <!-- discussion -->
        <div :class="$style.container" class="afp-synopsis" v-html="data.hazard_discussion"></div>

        <!-- media -->
        <div v-if="data.media.length > 0">
            <h2>Media</h2>
            <media-gallery :media="data.media" scope="scope-synopsis" key="synopsis" />
        </div>

        <!-- Older posts -->
        <div :class="[$style.textCenter, $style.spacer]">
            <button
                @click="$router.replace({ name: 'ArchiveTab', params: { tab: 'blog' } })"
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
    props: ['data', 'config'],
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

<style scoped lang="scss">
.afp-synopsis::v-deep {
    img {
        max-width: 100% !important;
        height: auto !important;
    }
    figure {
        margin: 0 1rem 1rem 1rem !important;
        display: inline-block;
        figcaption {
            font-style: italic;
            font-size: 80%;
        }
    }
    figure.align-right {
        float: right !important;
        margin: 0 0 1rem 1rem !important;
    }
    figure.align-left {
        float: left !important;
        margin: 0 1rem 1rem 0 !important;
    }
    figure.align-center {
        display: table;
        margin-left: auto !important;
        margin-right: auto !important;
    }
}
</style>