<template>
    <div :class="$style.gallery">
        <video-modal
            @close="videoModal = false"
            :show="videoModal"
            :caption="videoCaption"
            :id="videoId"
        />
        <h2>Media</h2>
        <carousel
            :key="key"
            class="afp-carousel"
            :margin="10"
            :nav="true"
            :loop="false"
            :slideBy="'page'"
            :navText="['<i class=\'mdi mdi-chevron-left-circle\'></i>','<i class=\'mdi mdi-chevron-right-circle\'></i>']"
            :responsive="{0:{items:1},576:{items:2},768:{items:3},992:{items:4}}"
        >
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
        </carousel>
    </div>
</template>

<script>
import Carousel from 'vue-owl-carousel'
import VideoModal from '../components/VideoModal'

export default {
    data() {
        return {
            videoModal: false,
            videoCaption: '',
            videoId: '',
            key: 1
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
.owl-theme {
    margin-top: 20px;
    margin-bottom: 50px;
}
 
.owl-theme .owl-nav {
    .owl-prev, .owl-next {
        position: absolute;
        top: 50%;
        margin-top: -28px;
        padding: 0 2px;
        -webkit-tap-highlight-color: transparent; 
        color: #FFF !important;
        opacity: .5;
        font-size: 36px !important;
        display: inline-block;
        cursor: pointer !important
    }
    .owl-prev {
        left: 3px;
    }
    .owl-next {
        right: 3px;
    }
}

.owl-theme .owl-nav [class*='owl-']:hover {
    opacity: 1;
    text-decoration: none; 
}
.owl-theme .owl-nav .disabled {
    opacity: 0 !important;
    cursor: default !important; 
}

.owl-theme .owl-nav.disabled + .owl-dots {
    margin-top: 10px; 
}

.owl-theme .owl-dots {
    text-align: center;
    -webkit-tap-highlight-color: transparent; 
    position: absolute;
    width: 100%;
}

.owl-theme .owl-dots .owl-dot {
    display: inline-block;
    zoom: 1;
    display: inline; 
    margin-top: 10px;
}

.owl-theme .owl-dots .owl-dot span {
    width: 10px;
    height: 10px;
    margin: 5px 7px;
    //background: @gray-light;
    display: block;
    -webkit-backface-visibility: visible;
    border-radius: 30px; 
}

// .owl-theme .owl-dots .owl-dot.active span, .owl-theme .owl-dots .owl-dot:hover span {
//     background: @brand-primary; 
// }


</style>
