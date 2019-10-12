<template>
    <div :id="'problem-' + problem.rank" :class="$style.problemContainer">
        <h2>Avalanche Problem #{{problem.rank}}</h2>
        <info :content="this.$helpContent.avalancheProblem" />
        <div :class="$style.infoGraphics">
            <div :class="$style.col12">
                <v-popover>
                    <img :class="$style.problemIcon" :src="problem.icon" />
                    <template slot="popover">
                        <div v-html="problem.problem_description"></div>
                    </template>
                </v-popover>
                <div :class="$style.problemText">
                    {{problem.name}}
                    <!-- <info :content="problem.problem_description" /> -->
                </div>
                <h5>
                    Problem Type
                    <!-- <info :content="this.$helpContent.problemType" /> -->
                </h5>
            </div>
            <div :class="$style.col12">
                <locator-rose
                    ref="rose"
                    class="location"
                    :config="config"
                    :rank="problem.rank"
                    :location="problem.location"
                ></locator-rose>
                <h5>
                    Aspect/Elevation
                    <!-- <info :content="this.$helpContent.problemLocation" /> -->
                </h5>
            </div>
            <div :class="$style.col12">
                <problem-slider
                    key="likelihood"
                    :options="likelihoodOptions"
                    :labels="likelihoodLabels"
                    :data="problem.likelihood"
                ></problem-slider>
                <h5>
                    Likelihood
                    <!-- <info :content="this.$helpContent.problemLikelihood" /> -->
                </h5>
            </div>
            <div :class="$style.col12">
                <problem-slider
                    key="size"
                    :options="sizeOptions"
                    :labels="sizeLabels"
                    :data="problem.size"
                ></problem-slider>
                <h5>
                    Size
                    <!-- <info :content="this.$helpContent.problemSize" /> -->
                </h5>
            </div>
        </div>
        <figure v-if="problem.media.url !=''" :class="$style.problemMedia">
            <div :class="$style.imageContainer">
                <img
                    v-if="problem.media.type == 'photo'"
                    v-tooltip="'Click to enlarge'"
                    v-preview:scope-forecast
                    :src="problem.media.url"
                    :alt="problem.media.caption"
                />
                <img
                    v-if="problem.media.type == 'video'"
                    v-tooltip="'Click to play'"
                    :src="'https://img.youtube.com/vi/' + problem.media.url + '/maxresdefault.jpg'"
                    :alt="problem.media.caption"
                    @click="videoModal = true"
                />
                <i :class="$style.expandIcon" class="mdi mdi-arrow-expand"></i>
                <i
                    @click="videoModal = true"
                    v-if="problem.media.type == 'video'"
                    :class="$style.videoIcon"
                    class="mdi mdi-youtube"
                ></i>
            </div>
            <figcaption>{{problem.media.caption}}</figcaption>
        </figure>
        <video-modal
            @close="videoModal = false"
            :show="videoModal"
            :caption="problem.media.caption"
            :id="problem.media.url"
        />
        <div v-html="problem.discussion"></div>
    </div>
</template>

<script>
import LocatorRose from '../components/LocatorRose'
import ProblemSlider from '../components/ProblemSlider'
import VideoModal from '../components/VideoModal'

export default {
    data() {
        return {
            videoModal: false,
            likelihoodOptions: ['unlikely', 'possible', 'likely', 'very likely', 'almost certain'],
            likelihoodLabels: ['Unlikely', 'Possible', 'Likely', 'Very Likely', 'Almost Certain'],
            sizeOptions: ['1','1.5','2','2.5','3','3.5','4'],
            sizeLabels: ['Small', '', 'Large', '', 'Very Large', '', 'Historic']
        }
    },
    components: {
        LocatorRose,
        ProblemSlider,
        VideoModal
    },
    props: ['problem', 'config'],
    mounted() {

    }
}
</script>

<style module lang="scss">
@import "../assets/css/bootstrap/functions";
@import "../assets/css/_variables.scss";
@import "../assets/css/bootstrap/mixins/breakpoints";

.problemContainer {
    @include divider;
    margin-bottom: 1.5 * $spacer;
    &::after {
        display: block;
        content: "";
        clear: both;
    }
    h2 {
        display: inline-block;
        border-bottom: 1px solid $gray-400;
        padding-bottom: 0.2rem;
    }
}

.infoGraphics {
    composes: row from "../assets/css/style.css";
    page-break-inside: avoid;
    align-items: flex-end !important;
    h6,
    h5 {
        border-top: 1px solid $gray-400;
        margin-top: 1.5rem !important;
        padding-top: 1rem;
    }
}
.problemIcon {
    height: 170px !important;
    width: 170px !important;
    margin: 25px 15px 10px 15px;
    cursor: help;
    @include media-breakpoint-down(xs) {
        height: 130px !important;
        width: 130px !important;
        margin: 25px 15px 0px 15px;
    }
}

.problemText {
    font-weight: bold;
}

.col12 {
    composes: col-6 from "../assets/css/style.css";
    // composes: col-sm-6 from "../assets/css/style.css";
    composes: col-lg-3 from "../assets/css/style.css";
    @media print {
        flex: 0 0 25%;
        max-width: 25%;
    }
    text-align: center;
    margin-bottom: $spacer;
    overflow: hidden;
}

.problemMedia {
    width: 100%;
    @include media-breakpoint-up(md) {
        float: right;
        width: 50%;
        margin-left: 2 * $spacer !important;
    }
    @include media-breakpoint-up(lg) {
        width: 33%;
    }
    figcaption {
        padding-top: 0.5rem;
        font-style: italic;
        font-size: $font-size-sm;
        text-align: center;
        font-weight: lighter;
    }
}
.imageContainer {
    img {
        width: 100%;
        cursor: zoom-in;
        // box-shadow: $app-box-shadow;
        //box-shadow: -10px 10px 0px 0px $gray-300;
    }
    position: relative;
}

.expandIcon {
    font-size: 1.3rem;
    position: absolute;
    bottom: 0.6rem;
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

<style scoped lang="scss">
@import "../assets/css/bootstrap/functions";
@import "../assets/css/_variables.scss";
@import "../assets/css/bootstrap/mixins/breakpoints";

.slider::v-deep {
    margin-left: auto;
    margin-right: auto;
    padding: 0.5rem !important;
    width: 8rem !important;
    .vue-slider-rail {
        border: 1px solid $gray-400;
        width: 2px;
    }
    .vue-slider-process {
        border-left: 12px solid $gray-700;
        border-right: 12px solid $gray-700;
        z-index: 2;
        width: 24px !important;
        left: 50% !important;
        transform: translate(-50%, 0);
    }
    &.likelihood {
        .vue-slider-process {
            display: none;
        }
    }
    &.size {
        .vue-slider-mark:nth-child(even) {
            display: none;
        }
    }
    .vue-slider-mark-step {
        border: 1px solid $gray-400;
        width: 30px;
        height: 2px;
        top: 1px;
        left: -15px !important;
    }
    .vue-slider-dot {
        border-left: 12px solid $gray-700;
        border-right: 12px solid $gray-700;
        width: 24px !important;
        height: 10px !important;
        cursor: initial;
        border-radius: 0;
    }
    .vue-slider-mark-label {
        padding-left: 20px;
        font-size: $font-size-sm;
        text-transform: capitalize;
        width: 8rem !important;
        text-align: left;
        color: $gray-500;
        &.vue-slider-mark-label-active {
            color: $body-color;
            font-weight: bold;
        }
    }
}
</style>