<template>
    <div class="media-gallery">
        <flickity class="carousel" :options="flickityOptions">
            <div v-for="item in media" class="carousel-cell" :key="item.id">
                <figure v-if="item.type == 'photo'">
                    <img v-preview:scope-a :src="item.url" :alt="item.caption" />
                    <figcaption>{{item.caption}}</figcaption>
                </figure>
                <figure v-if="item.type == 'video'">
                    <div class="video-container">
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
        </flickity>
    </div>
</template>

<script>
import Flickity from 'vue-flickity'

export default {
    data() {
        return {
            flickityOptions: {
                cellAlign: "left",
                contain: true,
                groupCells: true,
                imagesLoaded: true
            }
        }
    },
    components: {
        Flickity
    },
    props: ['media'],
    methods: {
        hideDots() {
            var viewportWidth = document.querySelector('.carousel').offsetWidth
            var cells = document.getElementsByClassName('carousel-cell')
            var cellWidth = 0
            for (var i = 0; i < cells.length; i++) {
                cellWidth += cells[i].offsetWidth
            }
            if (cellWidth <= viewportWidth) {
                document.querySelector('.flickity-page-dots').style.display = "none"
            } else {
                document.querySelector('.flickity-page-dots').style.display = "block"
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

<style scoped lang="scss">
@import '../assets/css/bootstrap/functions';
@import "../assets/css/_variables.scss";
@import '../assets/css/bootstrap/mixins/breakpoints';

$carousel-height: 200px;

/deep/.carousel {
    figure {
        margin-right: 10px;
        cursor: pointer;
    }
    figcaption {
        font-style: italic;
        font-size: $font-size-sm;
    }
    img {
        height: $carousel-height;
        width: auto;
    }
    .video-container {
        height: $carousel-height;
        width: 16/9 * $carousel-height;
    }
    .flickity-button {
        top: $carousel-height / 2;
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