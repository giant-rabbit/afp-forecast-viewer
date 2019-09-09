<template>
    <div id="media-gallery" :class="$style.galleryWrapper">
        <figure :class="$style.galleryItem" v-for="item in media" :key="item.id">
            <img
                v-if="item.type == 'photo'"
                :class="$style.galleryImg"
                v-preview:scope-a
                :src="item.url"
                :alt="item.caption"
                v-tooltip="'Click to enlarge'"
            />
            <iframe
                v-if="item.type == 'video'"
                :class="$style.galleryVid"
                :src="'https://www.youtube.com/embed/' + item.url"
                frameborder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
            ></iframe>
            <figcaption>{{item.caption}}</figcaption>
        </figure>
    </div>
</template>

<script>

export default {
    data() {
        return {
        }
    },
    props: ['media']
}
</script>

<style module lang="scss">
@import "../assets/css/bootstrap/functions";
@import "../assets/css/_variables.scss";
@import "../assets/css/bootstrap/mixins/breakpoints";

$gallery-height: 200px;

.galleryWrapper {
    height: auto;
    white-space: nowrap;
    overflow-x: auto;
    overflow-y: hidden;
    padding-bottom: $spacer;
    &::-webkit-scrollbar-track {
        background-color: $app-gray-light;
    }
    &::-webkit-scrollbar {
        height: 6px;
    }
    &::-webkit-scrollbar-thumb {
        background-color: $app-bg-color;
    }
}

.galleryItem {
    display: inline-block;
    margin: 0 !important;
    margin-right: 1em !important;
    vertical-align: top;
    figcaption {
        font-style: italic;
        font-size: $font-size-sm;
    }
}

.galleryImg {
    height: $gallery-height !important;
    width: auto !important;
    cursor: pointer;
}

.galleryVid {
    height: $gallery-height;
    width: $gallery-height * 1.78;
}
</style>