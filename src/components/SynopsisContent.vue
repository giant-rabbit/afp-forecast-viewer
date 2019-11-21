<template>
    <div>
        <!-- discussion -->
        <div :class="$style.container" class="afp-synopsis" v-html="data.hazard_discussion"></div>

        <!-- media -->
        <div v-if="data.media.length > 0">
            <h2>Media</h2>
            <media-gallery :media="data.media" scope="scope-synopsis" key="synopsis" />
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

.container {
    margin-bottom: $spacer;
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