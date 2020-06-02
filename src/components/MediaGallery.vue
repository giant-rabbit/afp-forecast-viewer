<template>
    <div class="afp-media-gallery">
        <h2 class="afp-html-h2">Media</h2>
        <div class="afp-owl-carousel afp-owl-theme">
            <div v-for="(item, index) in media" :key="index" class="afp-galleryItem">
                <div
                    v-if="item.type == 'photo'"
                    class="afp-image-container afp-galleryImgContainer"
                >
                    <img
                        class="afp-galleryImg"
                        :src="item.url"
                        :alt="item.caption"
                        :data-pswp-title="item.caption"
                        :data-pswp-src="item.url"
                    />
                </div>
                <div
                    v-if="item.type == 'video'"
                    class="afp-image-container afp-galleryImgContainer afp-video-container afp-video-modal"
                >
                    <img
                        class="afp-galleryImg"
                        :src="'https://img.youtube.com/vi/' + item.url + '/mqdefault.jpg'"
                        :alt="item.caption"
                        :data-video-id="item.url"
                        :data-video-caption="item.caption"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import 'owl.carousel'

export default {
    data() {
        return {
        }
    },
    props: ['media'],
    methods: {
    },
    mounted() {
        $('.afp-owl-carousel').owlCarousel({
            loop: false,
            nav: true,
            margin: 10,
            navText: ["<i class='mdi mdi-chevron-left-circle'></i>", "<i class='mdi mdi-chevron-right-circle'></i>"],
            slideBy: "page",
            responsive: {
                0: {
                    items: 1,
                },
                768: {
                    items: 2,
                },
                992: {
                    items: 3,
                },
                1200: {
                    items: 4,
                }
            },
            refreshClass: "afp-owl-refresh",
            loadingClass: "afp-owl-loading",
            loadedClass: "afp-owl-loaded",
            dragClass: "afp-owl-drag",
            grabClass: "afp-owl-grab",
            stageClass: "afp-owl-stage",
            stageOuterClass: "afp-owl-stage-outer",
            navContainerClass: "afp-owl-nav",
            navClass: ["afp-owl-prev", "afp-owl-next"],
            dotClass: "afp-owl-dot",
            dotsClass: "afp-owl-dots",
            itemClass: "afp-owl-item"
        })
    }
}
</script>

<style scoped lang="scss">
@import "../assets/bootstrap4/_functions.scss";
@import "../assets/bootstrap4/_variables.scss";
@import "../assets/bootstrap4/_mixins.scss";

$gallery-height: 200px;

.afp-media-gallery {
    margin-bottom: 1.5 * $spacer;

    .afp-galleryItem {
        overflow: hidden;
        position: relative;
        cursor: zoom-in;
        width: 100%;
        &:before {
            display: block;
            content: "";
            width: 100%;
            padding-top: 75%;
        }
    }

    .afp-galleryImgContainer {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        //z-index: 1;
    }

    .afp-galleryImg {
        height: 100% !important;
        width: 100% !important;
        object-fit: cover;
    }

    &::v-deep {
        // Owl Carousel Theme
        .afp-owl-theme {
            margin-top: .5 * $spacer;
            margin-bottom: .5 * $spacer;
        }

        .afp-owl-theme .afp-owl-nav {
            .afp-owl-prev,
            .afp-owl-next {
                position: absolute;
                top: calc(50% - 18px);
                margin-top: -28px;
                padding: 0 2px;
                -webkit-tap-highlight-color: transparent;
                color: #fff !important;
                opacity: 0.5;
                font-size: 40px !important;
                display: inline-block;
                cursor: pointer !important;
            }
            .afp-owl-prev {
                left: 3px;
            }
            .afp-owl-next {
                right: 3px;
            }
        }

        .afp-owl-theme .afp-owl-nav [class*="owl-"]:hover {
            opacity: 1;
            text-decoration: none;
            transition: opacity $transition;
        }
        .afp-owl-theme .afp-owl-nav .disabled {
            opacity: 0 !important;
            cursor: default !important;
        }

        .afp-owl-theme .afp-owl-nav.disabled + .afp-owl-dots {
            margin-top: 10px;
        }

        .afp-owl-theme .afp-owl-dots {
            text-align: center;
            -webkit-tap-highlight-color: transparent;
            position: relative;
            width: 100%;
        }

        .afp-owl-theme .afp-owl-dots .afp-owl-dot {
            display: inline-block;
            zoom: 1;
            display: inline;
            margin-top: 10px;
        }

        .afp-owl-theme .afp-owl-dots .afp-owl-dot span {
            width: 10px;
            height: 10px;
            margin: 5px 7px;
            background: $gray-500;
            display: block;
            -webkit-backface-visibility: visible;
            transition: opacity $transition;
            border-radius: 30px;
        }

        .afp-owl-theme .afp-owl-dots .afp-owl-dot.active span,
        .afp-owl-theme .afp-owl-dots .afp-owl-dot:hover span {
            background: $gray-900;
        }

        // Owl Carousel Core
        .afp-owl-carousel {
            display: none;
            width: 100%;
            -webkit-tap-highlight-color: transparent;
            /* position relative and z-index fix webkit rendering fonts issue */
            position: relative;
            z-index: 1;
        }
        .afp-owl-carousel .afp-owl-stage {
            position: relative;
            -ms-touch-action: pan-Y;
            touch-action: manipulation;
            -moz-backface-visibility: hidden;
            /* fix firefox animation glitch */
        }
        .afp-owl-carousel .afp-owl-stage:after {
            content: ".";
            display: block;
            clear: both;
            visibility: hidden;
            line-height: 0;
            height: 0;
        }
        .afp-owl-carousel .afp-owl-stage-outer {
            position: relative;
            overflow: hidden;
            /* fix for flashing background */
            -webkit-transform: translate3d(0px, 0px, 0px);
        }
        .afp-owl-carousel .afp-owl-wrapper,
        .afp-owl-carousel .afp-owl-item {
            -webkit-backface-visibility: hidden;
            -moz-backface-visibility: hidden;
            -ms-backface-visibility: hidden;
            -webkit-transform: translate3d(0, 0, 0);
            -moz-transform: translate3d(0, 0, 0);
            -ms-transform: translate3d(0, 0, 0);
        }
        .afp-owl-carousel .afp-owl-item {
            position: relative;
            min-height: 1px;
            float: left;
            -webkit-backface-visibility: hidden;
            -webkit-tap-highlight-color: transparent;
            -webkit-touch-callout: none;
        }
        .afp-owl-carousel .afp-owl-item img {
            display: block;
            width: 100%;
        }
        .afp-owl-carousel .afp-owl-nav.disabled,
        .afp-owl-carousel .afp-owl-dots.disabled {
            display: none;
        }
        .afp-owl-carousel .afp-owl-nav .afp-owl-prev,
        .afp-owl-carousel .afp-owl-nav .afp-owl-next,
        .afp-owl-carousel .afp-owl-dot {
            cursor: pointer;
            -webkit-user-select: none;
            -khtml-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
        }
        .afp-owl-carousel .afp-owl-nav button.afp-owl-prev,
        .afp-owl-carousel .afp-owl-nav button.afp-owl-next,
        .afp-owl-carousel button.afp-owl-dot {
            background: none;
            color: inherit;
            border: none;
            outline: none;
            padding: 0 !important;
            font: inherit;
        }
        .afp-owl-carousel.afp-owl-loaded {
            display: block;
        }
        .afp-owl-carousel.afp-owl-loading {
            opacity: 0;
            display: block;
        }
        .afp-owl-carousel.afp-owl-hidden {
            opacity: 0;
        }
        .afp-owl-carousel.afp-owl-refresh .afp-owl-item {
            visibility: hidden;
        }
        .afp-owl-carousel.afp-owl-drag .afp-owl-item {
            -ms-touch-action: pan-y;
            touch-action: pan-y;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
        }
        .afp-owl-carousel.afp-owl-grab {
            cursor: move;
            cursor: grab;
        }
        .no-js .afp-owl-carousel {
            display: block;
        }
    }
}
</style>
