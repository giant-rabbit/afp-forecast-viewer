<template>
    <div :class="$style.masonryWrapper">
        <figure :class="$style.masonryItem" v-for="item in media" :key="item.id">
            <img
                v-if="item.type == 'photo'"
                :class="$style.masonryImg"
                v-preview:scope-a
                :src="item.url"
                :alt="item.caption"
            />
            <div v-if="item.type == 'video'" class="video-container">
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

.masonryWrapper {
    column-count: 2;
  column-gap: 1em;
    @include media-breakpoint-up(md) {
        -webkit-column-count: 3;
        -moz-column-count: 3;
        column-count: 3;
    }
    @include media-breakpoint-up(lg) {
        -webkit-column-count: 4;
        -moz-column-count: 4;
        column-count: 4;
    }
}

.masonryItem {
    display: inline-block;
    figcaption {
        font-style: italic;
        font-size: $font-size-sm;
    }
}

.masonryImg {
    width: 100%;
    height: auto;
}

$carousel-height: 200px;

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