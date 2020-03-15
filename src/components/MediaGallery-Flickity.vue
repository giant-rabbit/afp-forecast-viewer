<template>
    <div :class="$style.gallery">
        <video-modal
            @close="videoModal = false"
            :show="videoModal"
            :caption="videoCaption"
            :id="videoId"
        />
        <h2 class="afp-html-h2">Media</h2>
        <flickity class="afp-carousel" :options="flickityOptions">
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
                        :src="'https://img.youtube.com/vi/' + item.url + '/mqdefault.jpg'"
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
        </flickity>
    </div>
</template>

<script>
import Flickity from '../components/Flickity'
import VideoModal from '../components/VideoModal'

export default {
    data() {
        return {
            videoModal: false,
            videoCaption: '',
            videoId: '',
            flickityOptions: {
                cellAlign: "left",
                groupCells: true
            }
        }
    },
    components: {
        Flickity,
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
    width: 100%;
    @include media-breakpoint-up(sm) {
        width: 50%;
    }
    @include media-breakpoint-up(md) {
        width: 33%;
    }
    @include media-breakpoint-up(lg) {
        width: 25%;
    }
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
    top: 5px;
    left: 5px;
    right: 5px;
    bottom: 5px;
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

.afp-carousel .owl-dots .owl-dot:only-child {
    display: none !important;
}

</style>
