<template>
    <div :class="$style.galleryWrapper">
        <figure :class="$style.galleryItem" v-for="item in media" :key="item.id">
            <img
                v-if="item.type == 'photo'"
                :class="$style.galleryImg"
                v-preview:scope-a
                :src="item.url"
                :alt="item.caption"
            />
            <div v-if="item.type == 'video'" :class="$style.galleryVid">
                <iframe
                    width="100%"
                    height="100%"
                    :src="'https://www.youtube.com/embed/' + item.url"
                    frameborder="0"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                ></iframe>
            </div>
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
    props: ['media'],
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
    &::-webkit-scrollbar-track
    {
        background-color: $app-gray-light;
    }
    &::-webkit-scrollbar
    {
        height: 6px;
        //background-color: $app-gray-light;
    }
    &::-webkit-scrollbar-thumb
    {
        //width: 6px;
        background-color: $gray-500;
    }
}

.galleryItem {
    display: inline-block;
    margin: 0;
    margin-right: 1em;
    figcaption {
        font-style: italic;
        font-size: $font-size-sm;
    }
}

.galleryImg {
    height: $gallery-height;
    width: auto
}

.galleryVid {
    height: $gallery-height;
    width: $gallery-height * 1.78;
    iframe {
        width: 100%;
        height: 100%;
    }
}


// /deep/.carousel {
//     figure {
//         margin-right: 10px;
//         cursor: pointer;
//     }
//     figcaption {
//         font-style: italic;
//         font-size: $font-size-sm;
//     }
//     img {
//         height: $carousel-height;
//         width: auto;
//     }
//     .video-container {
//         height: $carousel-height;
//         width: 16/9 * $carousel-height;
//     }
//     .flickity-button {
//         top: $carousel-height / 2;
//         border-radius: 50% !important;
//         &:disabled {
//             display: none;
//         }
//     }
//     .flickity-page-dots {
//         bottom: -40px;
//     }
// }
</style>