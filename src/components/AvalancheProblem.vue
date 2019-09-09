<template>
    <div :id="'problem-' + problem.rank" :class="$style.problemContainer">
        <h2>Avalanche Problem {{problem.rank}}</h2>
        <div :class="$style.infoGraphics">
            <div :class="$style.col12">
                <img :class="$style.problemIcon" :src="problem.icon" />
                <div :class="$style.problemText">
                    {{problem.name}}
                    <info :content="problem.problem_description" />
                </div>
                <h5>
                    Problem Type
                    <info :content="this.$helpContent.problemType" />
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
                    <info :content="this.$helpContent.problemLocation" />
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
                    <info :content="this.$helpContent.problemLikelihood" />
                </h5>
            </div>
            <div :class="$style.col12">
                <vue-slider class="size slider" ref="size" v-model="problem.size" v-bind="sizeOptions"></vue-slider>
                <h5>
                    Size
                    <info :content="this.$helpContent.problemSize" />
                </h5>
            </div>
        </div>
        <figure
            v-if="problem.media.type == 'photo' && problem.media.url !=''"
            :class="$style.probleMedia"
            
        >
            <img v-tooltip="'Click to enlarge'" v-preview:scope-a :src="problem.media.url" :alt="problem.media.caption" />
            <figcaption>{{problem.media.caption}}</figcaption>
        </figure>
        <figure
            v-if="problem.media.type == 'video' && problem.media.url !=''"
            :class="$style.probleMedia"
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
    props: ['problem','config'],
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
    clear: both;
    margin-bottom: $spacer;
    &:after {
        clear: both;
    }
}

.infoGraphics {
    composes: row from "../assets/css/style.css";
    align-items: flex-end !important;
    h5 {
        border-top: 1px solid $app-border-color;
        margin-top: $spacer * 1.5 !important;
        padding-top: $spacer;
    }
}
.problemIcon {
    height: 170px !important;
    width: 170px !important;
    margin: 25px 15px 10px 15px;
}

.problemText {
    font-weight: bold;
}

.col12 {
    composes: col-12 from "../assets/css/style.css";
    composes: col-sm-6 from "../assets/css/style.css";
    composes: col-lg-3 from "../assets/css/style.css";
    text-align: center;
    margin-bottom: $spacer;
}
.col6 {
    composes: col-6 from "../assets/css/style.css";
    composes: col-lg-3 from "../assets/css/style.css";
    text-align: center;
    margin-bottom: $spacer;
}
figure.probleMedia {
    width: 100%;
    margin-bottom: $spacer !important;
    img {
        width: 100%;
        cursor: pointer;
    }
    @include media-breakpoint-up(md) {
        float: right;
        width: 50%;
        margin-left: $spacer !important;
    }
    @include media-breakpoint-up(lg) {
        width: 33%;
    }
    figcaption {
        font-style: italic;
        font-size: $font-size-sm;
    }
    a {
        display: block;
        position: relative;
        i {
            position: absolute;
            top: 50%;
            left: 50%;
            font-size: 5rem;
            color: $red;
            transform: translate(-50%, -50%);
        }
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
    padding-bottom: 0.5rem !important;
    width: 8rem !important;
    .vue-slider-rail {
        background-color: $app-border-color;
        width: 1px;
    }
    .vue-slider-process {
        background-color: $app-bg-color;
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
        background-color: $app-border-color;
        width: 30px;
        height: 1px;
        top: 1px;
        left: -15px !important;
    }
    .vue-slider-dot {
        background-color: $app-bg-color;
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