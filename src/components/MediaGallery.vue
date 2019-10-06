<template>
    <div>
        <video-modal
            @close="videoModal = false"
            :show="videoModal"
            :caption="videoCaption"
            :id="videoId"
        />
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
                        v-preview:scope-forecast
                        :src="item.url"
                        :alt="item.caption"
                        v-tooltip="item.caption"
                    />
                    <img
                        v-if="item.type == 'video'"
                        :class="$style.galleryImg"
                        :src="'https://img.youtube.com/vi/' + item.url + '/maxresdefault.jpg'"
                        :alt="item.caption"
                        v-tooltip="item.caption"
                        @click="showVideoModal(item.url,item.caption)"
                    />
                    <i
                        @click="showVideoModal(item.url,item.caption)"
                        v-if="item.type == 'video'"
                        :class="$style.videoIcon"
                        class="mdi mdi-youtube"
                    ></i>
                    <i :class="$style.expandIcon" class="mdi mdi-arrow-expand"></i>
                    <!-- <iframe
                    v-tooltip="item.caption"
                    v-if="item.type == 'video'"
                    :class="$style.galleryVid"
                    :src="'https://www.youtube.com/embed/' + item.url"
                    frameborder="0"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                    ></iframe>-->
                    <!-- <figcaption :class="$style.galleryCaption">{{item.caption}}</figcaption> -->
                    <!-- <v-popover :class="$style.galleryCaption" class="afp-popover-trigger">
                    <button v-tooltip="'Click for caption'" :class="$style.captionTrigger">
                        <i class="mdi mdi-comment"></i>
                    </button>
                    <template slot="popover">
                        <div v-html="item.caption"></div>
                    </template>
                    </v-popover>-->
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
        },
        showVideoModal(id, caption) {
            this.videoId = id
            this.videoCaption = caption
            this.videoModal = true
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
