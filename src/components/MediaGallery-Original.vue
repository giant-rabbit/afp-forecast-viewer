<template>
    <div class="afp-media-gallery">
        <h2 class="afp-html-h2">Media</h2>
        <div class="afp-carousel">
            <div v-for="item in media" :key="item.id">
                <div class="afp-galleryItem">
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
    </div>
</template>

<script>
import { tns } from "tiny-slider/src/tiny-slider.js"

export default {
    data() {
        return {
        }
    },
    props: ['media'],
    methods: {
    },
    mounted() {
        var slider = tns({
            container: '.afp-carousel',
            slideBy: 'page',
            gutter: 10,
            controlsPosition: 'bottom',
            controlsText: ["<i class='mdi mdi-chevron-left-circle'></i>", "<i class='mdi mdi-chevron-right-circle'></i>"],
            navPosition: 'bottom',
            loop: false,
            swipeAngle: 30,
            speed: 500,
            responsive: {
                0: {
                    items: 1,
                    gutter: 10
                },
                576: {
                    items: 2
                },
                768: {
                    items: 3
                },
                992: {
                    items: 4
                }
            }
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
    margin-bottom: 2.5 * $spacer;

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
        // custom theme start
        .tns-outer {
            position: relative;
        }
        .tns-controls {
            [aria-controls] {
                position: absolute;
                top: 50%;
                margin-top: -25px;
                font-size: 50px;
                line-height: 1;
                padding: 0;
                background: none;
                border: none;
                color: #fff;
                opacity: 0.5;
                &:hover {
                    opacity: 1;
                }
                &:disabled {
                    display: none;
                }
            }
            [data-controls="prev"] {
                left: 0;
            }
            [data-controls="next"] {
                right: 0;
            }
        }
        .tns-outer [aria-controls],
        .tns-outer [data-action] {
            cursor: pointer;
            &:focus {
                outline: none;
            }
        }
        .tns-nav {
            position: absolute;
            top: 100%;
            width: 100%;
            margin-top: 0.5rem;
            text-align: center;
        }
        .tns-nav > [aria-controls] {
            width: 10px;
            height: 10px;
            padding: 0;
            margin: 0 8px;
            border-radius: 50%;
            background: #333;
            opacity: 0.25;
            border: 0;
        }
        .tns-nav > .tns-nav-active {
            opacity: 1;
        }
        // custom theme end
        .tns-outer {
            padding: 0 !important; // remove padding: clientWidth = width + padding (0) = width
            [hidden] {
                display: none !important;
            }
            [aria-controls],
            [data-action] {
                cursor: pointer;
            }
        }
        .tns-slider {
            -webkit-transition: all 0s;
            -moz-transition: all 0s;
            transition: all 0s;
            > .tns-item {
                -webkit-box-sizing: border-box;
                -moz-box-sizing: border-box;
                box-sizing: border-box;
            }
        }

        .tns-horizontal {
            &.tns-subpixel {
                white-space: nowrap;
                > .tns-item {
                    display: inline-block;
                    vertical-align: top;
                    white-space: normal;
                }
            }
            &.tns-no-subpixel {
                &:after {
                    content: "";
                    display: table;
                    clear: both;
                }
                > .tns-item {
                    float: left;
                }
            }
            &.tns-carousel {
                &.tns-no-subpixel {
                    > .tns-item {
                        margin-right: -100%;
                    }
                }
            }
        }
        .tns-no-calc {
            position: relative;
            left: 0;
        }
        .tns-gallery {
            position: relative;
            left: 0;
            min-height: 1px; // make sure slider container is visible
            // overflow: hidden;
            > .tns-item {
                position: absolute;
                left: -100%;
                -webkit-transition: transform 0s, opacity 0s;
                -moz-transition: transform 0s, opacity 0s;
                transition: transform 0s, opacity 0s;
            }
            > .tns-slide-active {
                position: relative;
                left: auto !important;
            }
            > .tns-moving {
                -webkit-transition: all 0.25s;
                -moz-transition: all 0.25s;
                transition: all 0.25s;
            }
        }
        .tns-ovh {
            overflow: hidden;
        }
        .tns-visually-hidden {
            position: absolute;
            left: -10000em;
        }
        .tns-transparent {
            opacity: 0;
            visibility: hidden;
        }

        // *** Fix a viewport issue in initialization
        .tns-vpfix {
            white-space: nowrap;
            > div,
            > li {
                display: inline-block;
            }
        }

        // *** Detecting browser capability ***
        $width: 310px;
        $height: 10px;
        $count: 70;
        $perpage: 3;

        .tns-t {
            &-subp2 {
                margin: 0 auto;
                width: $width;
                position: relative;
                height: $height;
                overflow: hidden;
            }
            &-ct {
                width: (100% * $count / $perpage);
                width: -webkit-calc(100% * #{$count} / #{$perpage});
                width: -moz-calc(100% * #{$count} / #{$perpage});
                width: calc(100% * #{$count} / #{$perpage});
                position: absolute;
                right: 0;
                &:after {
                    content: "";
                    display: table;
                    clear: both;
                }
                > div {
                    width: (100% / $count);
                    width: -webkit-calc(100% / #{$count});
                    width: -moz-calc(100% / #{$count});
                    width: calc(100% / #{$count});
                    height: $height;
                    float: left;
                }
            }
        }
    }
}
</style>
