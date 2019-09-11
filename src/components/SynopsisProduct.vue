<template>
    <div>
        <!-- Header -->
        <h2>{{data.bottom_line2}}</h2>
        <div :class="$style.row">
            <div :class="$style.metaColumn">
                <h5>Issued</h5>
                {{ data.published_time | publicDate }}
            </div>
            <div :class="$style.metaColumn">
                <h5>Author</h5>
                {{ data.author }}
            </div>
        </div>

        <!-- discussion -->
        <div class="afp-synopsis" v-html="data.hazard_discussion2"></div>

        <!-- media -->
        <div v-if="data.media.length > 0">
            <h3>Media</h3>
            <media-gallery :class="$style.spacer" :media="data.media" scope="scope-synopsis"/>
        </div>
    </div>
</template>

<script>
import MediaGallery from '../components/MediaGallery'

export default {
    data() {
        return {
        }
    },
    props: ['data', 'config'],
    components: {
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
    composes: container from "../assets/css/style.css";
}

.row {
    composes: row from "../assets/css/style.css";
}

.metaColumn {
    composes: col-md-6 from "../assets/css/style.css";
    composes: col-12 from "../assets/css/style.css";
    margin-bottom: $spacer;
}
</style>

<style scoped lang="scss">
.afp-synopsis::v-deep {
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
        margin-left: auto;
        margin-right: auto;
    }
}
</style>