<template>
    <div :id="'problem-' + problem.rank" :class="$style.problemContainer">
        <h2>Avalanche Problem #{{problem.rank}}</h2>
        <div :class="$style.infoGraphics">
            <div :class="$style.col12">
                <img :class="$style.problemIcon" :src="problem.icon" />
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
                <vue-slider
                    class="likelihood slider"
                    ref="likelihood"
                    :data="likelihoodData"
                    v-model="problem.likelihood"
                    v-bind="likelihoodOptions"
                ></vue-slider>
                <h5>
                    Likelihood
                    <!-- <info :content="this.$helpContent.problemLikelihood" /> -->
                </h5>
            </div>
            <div :class="$style.col12">
                <vue-slider
                    class="size slider"
                    ref="size"
                    v-model="problem.size"
                    v-bind="sizeOptions"
                ></vue-slider>
                <h5>
                    Size
                    <!-- <info :content="this.$helpContent.problemSize" /> -->
                </h5>
            </div>
        </div>
        <figure
            v-if="problem.media.type == 'photo' && problem.media.url !=''"
            :class="$style.problemMedia"
        >
            <div :class="$style.imageContainer">
                <img
                    v-tooltip="'Click to enlarge'"
                    v-preview:scope-forecast
                    :src="problem.media.url"
                    :alt="problem.media.caption"
                />
                <i class="mdi mdi-arrow-expand"></i>
            </div>
            <figcaption>{{problem.media.caption}}</figcaption>
        </figure>
        <figure
            v-if="problem.media.type == 'video' && problem.media.url !=''"
            :class="$style.problemMedia"
        >
            <div :class="$style.videoContainer">
                <iframe
                    width="100%"
                    height="100%"
                    :src="'https://www.youtube.com/embed/' + problem.media.url"
                    frameborder="0"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                ></iframe>
            </div>
            <figcaption>{{problem.media.caption}}</figcaption>
        </figure>
        <div v-html="problem.discussion"></div>
    </div>
</template>

<script>
import VueSlider from 'vue-slider-component'
import LocatorRose from '../components/LocatorRose'

export default {
    data() {
        return {
            likelihoodData: ['unlikely', 'possible', 'likely', 'very likely', 'almost certain'],
            likelihoodOptions: {
                height: 200,
                direction: 'btt',
                min: 1,
                max: 5,
                interval: 1,
                clickable: false,
                disabled: true,
                tooltip: 'none',
                marks: true,
            },
            sizeOptions: {
                height: 200,
                direction: 'btt',
                min: 1,
                max: 4,
                interval: .5,
                clickable: false,
                disabled: true,
                tooltip: 'none',
                enableCross: false,
                marks: {
                    '1': 'small',
                    '1.5': '',
                    '2': 'large',
                    '2.5': '',
                    '3': 'very large',
                    '3.5': '',
                    '4': 'historic'
                }
            },
        }
    },
    components: {
        VueSlider,
        LocatorRose
    },
    props: ['problem', 'config'],
    methods: {
    },
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
        // cursor: pointer;
        // box-shadow: $app-box-shadow;
        //box-shadow: -10px 10px 0px 0px $gray-300;
    }
    position: relative;
    i {
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
}
.videoContainer {
    height: 100%;
    width: 100%;
    position: relative;
    &:before {
        display: block;
        content: "";
        width: 100%;
        padding-top: 56.25%;
    }
    iframe {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        // box-shadow: $app-box-shadow;
        // box-shadow: -10px 10px 0px 0px $gray-300;
    }
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
        background-color: $gray-400;
        width: 2px;
    }
    .vue-slider-process {
        background-color: $gray-700;
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
        background-color: $gray-400;
        width: 30px;
        height: 2px;
        top: 1px;
        left: -15px !important;
    }
    .vue-slider-dot {
        background-color: $gray-700;
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