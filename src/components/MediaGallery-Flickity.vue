<template>
    <div class="media-gallery">
        <flickity class="carousel" :options="flickityOptions">
            <figure
                :class="[item.type == 'photo' ? $style.galleryItemImg : $style.galleryItemVid, $style.galleryItem]"
                v-for="item in media"
                :key="item.id"
            >
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
        </flickity>
    </div>
</template>

<script>
import Flickity from 'vue-flickity'

export default {
    data() {
        return {
            // flickityOptions: {
            //     cellAlign: "left",
            //     contain: true,
            //     groupCells: true,
            //     imagesLoaded: true
            // }
        }
    },
    components: {
        Flickity
    },
    props: ['media'],
    // methods: {
    //     hideDots() {
    //         var viewportWidth = document.querySelector('.carousel').offsetWidth
    //         var cells = document.getElementsByClassName('carousel-cell')
    //         var cellWidth = 0
    //         for (var i = 0; i < cells.length; i++) {
    //             cellWidth += cells[i].offsetWidth
    //         }
    //         if (cellWidth <= viewportWidth) {
    //             document.querySelector('.flickity-page-dots').style.display = "none"
    //         } else {
    //             document.querySelector('.flickity-page-dots').style.display = "block"
    //         }
    //     }
    // },
    // mounted() {
    //     this.hideDots()
    //     window.addEventListener("resize", this.hideDots)
    // },
    // created() {
    // },
    // destroyed() {
    //     window.removeEventListener("resize", this.hideDots)
    // },
}
</script>

<style module lang="scss">
@import "../assets/css/bootstrap/functions";
@import "../assets/css/_variables.scss";
@import "../assets/css/bootstrap/mixins/breakpoints";

$gallery-height: 300px;

.galleryWrapper {
    height: auto;
    white-space: nowrap;
    overflow-x: auto;
    overflow-y: hidden;
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
    margin-right: 1rem !important;
    margin-bottom: 1rem !important;
    vertical-align: top;
    overflow: hidden;
    figcaption {
        font-style: italic;
        font-size: $font-size-sm;
        white-space: initial;
    }
}

.galleryItemImg {
    width: $gallery-height;
}

.galleryItemVid {
    width: $gallery-height * 1.78;
}

.galleryImg {
    height: $gallery-height !important;
    width: $gallery-height !important;
    cursor: pointer;
    object-fit: cover;
}

.galleryVid {
    height: $gallery-height;
    width: $gallery-height * 1.78;
}
</style>

<style lang="scss">
.carousel {
    .flickity-button {
        top: 300px / 2;
        border-radius: 50% !important;
        &:disabled {
            display: none;
        }
    }
    .flickity-page-dots {
        bottom: -40px;
    }
}
</style>