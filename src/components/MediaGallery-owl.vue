<template>
    <div :class="$style.gallery">
        <video-modal
            @close="videoModal = false"
            :show="videoModal"
            :caption="videoCaption"
            :id="videoId"
        />
        <carousel class="afp-carousel" :items="2" :margin="10" :rewind="false" :responsive="{0:{items:1, nav: true},576:{items:2, nav: true},768:{items:3, nav: true},992:{items:4, nav: true}}">
            <div
                class="afp-carousel-cell"
                v-for="item in media"
                :key="item.id"
                :class="$style.galleryItem"
            >
                <div :class="$style.galleryImgContainer">
                    <img
                        v-if="item.type == 'photo'"
                        :class="$style.galleryImg"
                        v-preview:[scope]
                        :src="item.url"
                        :alt="item.caption"
                    />
                    <img
                        v-if="item.type == 'video'"
                        :class="$style.galleryImg"
                        :src="'https://img.youtube.com/vi/' + item.url + '/maxresdefault.jpg'"
                        :alt="item.caption"
                        @click="showVideoModal(item.url,item.caption)"
                    />
                    <i
                        @click="showVideoModal(item.url,item.caption)"
                        v-if="item.type == 'video'"
                        :class="$style.videoIcon"
                        class="mdi mdi-youtube"
                    ></i>
                    <i :class="$style.expandIcon" class="mdi mdi-arrow-expand"></i>
                </div>
            </div>
        </carousel>
    </div>
</template>

<script>
import Carousel from 'vue-owl-carousel2'
import VideoModal from '../components/VideoModal'

export default {
    data() {
        return {
            videoModal: false,
            videoCaption: '',
            videoId: '',
            options: {
                items: 2,
                margin: 10,
                rewind: false
            }
        }
    },
    components: {
        Carousel,
        VideoModal
    },
    props: ['media', 'scope'],
    methods: {
        showVideoModal(id, caption) {
            this.videoId = id
            this.videoCaption = caption
            this.videoModal = true
        }
    }
}
</script>

<style module lang="scss">
@import "../assets/css/bootstrap/functions";
@import "../assets/css/_variables.scss";
@import "../assets/css/bootstrap/mixins/breakpoints";

$gallery-height: 200px;

.gallery {
    margin-bottom: 2.5 * $spacer;
    @media print {
        display: none;
    }
}

.galleryItem {
    // width: 100%;
    // @include media-breakpoint-up(sm) {
    //     width: 50%;
    // }
    // @include media-breakpoint-up(md) {
    //     width: 33%;
    // }
    // @include media-breakpoint-up(lg) {
    //     width: 25%;
    // }
    overflow: hidden;
    position: relative;
    cursor: zoom-in;
    &:before {
        display: block;
        content: "";
        width: 100%;
        padding-top: 75%;
    }
}

.galleryImgContainer {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    //z-index: 1;
}
.galleryImg {
    height: 100% !important;
    width: 100% !important;
    object-fit: cover;
}

.expandIcon {
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

.videoIcon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: $red;
    font-size: 5rem;
}
</style>

<style lang="scss">

.afp-carousel .flickity-page-dots li:only-child {
    display: none !important;
}

</style>
