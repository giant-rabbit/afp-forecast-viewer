<template>
    <div class="media-gallery">
        <flickity class="afp-carousel" :options="flickityOptions">
            <figure
                :class="[item.type == 'photo' ? $style.galleryItemImg : $style.galleryItemVid, $style.galleryItem]"
                class="afp-carousel-cell"
                v-for="item in media"
                :key="item.id"
            >
                <img
                    v-if="item.type == 'photo'"
                    :class="$style.galleryImg"
                    v-preview:scope-forecast
                    :src="item.url"
                    :alt="item.caption"
                    v-tooltip="item.caption"
                />
                <i class="mdi mdi-arrow-expand"></i>
                <iframe
                    v-tooltip="item.caption"
                    v-if="item.type == 'video'"
                    :class="$style.galleryVid"
                    :src="'https://www.youtube.com/embed/' + item.url"
                    frameborder="0"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                ></iframe>
                <!-- <figcaption :class="$style.galleryCaption">{{item.caption}}</figcaption> -->
                <!-- <v-popover :class="$style.galleryCaption" class="afp-popover-trigger">
                    <button v-tooltip="'Click for caption'" :class="$style.captionTrigger">
                        <i class="mdi mdi-comment"></i>
                    </button>
                    <template slot="popover">
                        <div v-html="item.caption"></div>
                    </template>
                </v-popover>-->
            </figure>
        </flickity>
    </div>
</template>

<script>
import Flickity from '../components/Flickity'

export default {
    data() {
        return {
            flickityOptions: {
                cellAlign: "left"
            }
        }
    },
    components: {
        Flickity
    },
    props: ['media'],
    methods: {
        hideDots() {
            var viewportWidth = document.querySelector('.afp-carousel').offsetWidth
            var cells = document.getElementsByClassName('afp-carousel-cell')
            var cellWidth = 0
            for (var i = 0; i < cells.length; i++) {
                cellWidth += cells[i].offsetWidth
            }
            if (cellWidth <= viewportWidth) {
                document.querySelector('.flickity-page-dots').style.display = "none"
                document.querySelector('.flickity-button.previous').style.display = "none"
                document.querySelector('.flickity-button.next').style.display = "none"
            } else {
                document.querySelector('.flickity-page-dots').style.display = "block"
                document.querySelector('.flickity-button.previous').style.display = "inline-block"
                document.querySelector('.flickity-button.next').style.display = "inline-block"
            }
        }
    },
    mounted() {
        this.hideDots()
        window.addEventListener("resize", this.hideDots)
    },
    created() {
    },
    destroyed() {
        window.removeEventListener("resize", this.hideDots)
    },
}
</script>

<style module lang="scss">
@import "../assets/css/bootstrap/functions";
@import "../assets/css/_variables.scss";
@import "../assets/css/bootstrap/mixins/breakpoints";

$gallery-height: 200px;

.galleryItem {
    margin: 0 !important;
    margin-right: 1rem !important;
    height: $gallery-height;
    overflow: hidden;
    position: relative;
    cursor: pointer;
    // box-shadow: $app-box-shadow;
    // figcaption {
    //     font-style: italic;
    //     font-size: $font-size-sm;
    //     white-space: initial;
    // }
    // &:hover {
    //     figcaption {
    //         bottom: 0;
    //     }
    // }
}

.galleryItemImg {
    i {
        font-size: 1.3rem;
        position: absolute;
        bottom: 0.3rem;
        left: 0.3rem;
        border-radius: $border-radius;
        line-height: 1;
        background-color: rgba(255, 255, 255, 0.5);
        padding: 0.2rem;
        color: $gray-800;
    }
}

.galleryItemVid {
    width: $gallery-height * 1.78;
    i {
        display: none;
    }
}

.galleryImg {
    height: $gallery-height !important;
    width: auto !important;
    max-width: initial !important;
}

.galleryVid {
    height: $gallery-height;
    width: $gallery-height * 1.78;
}

// .galleryCaption {
//     position: absolute;
//     height: auto;
//     max-height: $gallery-height;
//     bottom: 0;
//     left: 0;
//     right: 0;
//     padding: .5rem 1rem;
//     background-color: rgba(0, 0, 0, 0.4);
//     font-size: $font-size-sm;
//     color: #fff;
//     // white-space: initial;
//     transition: all $transition;
//     opacity: 1;
// }

// .galleryCaption {
//     position: absolute;
//     bottom: 0.3rem;
//     left: 0.3rem;
// }

// .captionTrigger {
//     composes: btn from "../assets/css/style.css";
//     line-height: 1;
//     background-color: rgba(255, 255, 255, 0.5);
//     padding: 0.2rem;
//     color: $gray-800;
// }
</style>

<style scoped lang="scss">
// .afp-popover-trigger >>> .trigger {
//     all: unset;
//     display: inline !important;
// }
</style>