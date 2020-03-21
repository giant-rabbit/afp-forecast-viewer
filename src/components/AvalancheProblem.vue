<template>
    <div :id="'problem-' + problem.rank" class="afp-problem afp-mb-4 afp-divider">
        <h2 class="afp-html-h2">Avalanche Problem #{{problem.rank}}</h2>
        <info :content="this.$helpContent.avalancheProblem" />
        <div class="afp-infoGraphics afp-row">
            <div class="afp-problem-column afp-col-lg-3 afp-col-6 afp-text-center afp-mb-3">
                <v-popover>
                    <img
                        v-tooltip="'Click to learn more'"
                        class="afp-problemIcon"
                        :src="problem.icon"
                    />
                    <template slot="popover">
                        <div v-html="problem.problem_description"></div>
                    </template>
                </v-popover>
                <div class="afp-problemText">
                    {{problem.name}}
                    <!-- <info :content="problem.problem_description" /> -->
                </div>
                <h5 class="afp-html-h5">
                    Problem Type
                    <!-- <info :content="this.$helpContent.problemType" /> -->
                </h5>
            </div>
            <div class="afp-problem-column afp-col-lg-3 afp-col-6 afp-text-center afp-mb-3">
                <locator-rose
                    ref="rose"
                    class="location"
                    :config="config"
                    :rank="problem.rank"
                    :location="problem.location"
                ></locator-rose>
                <h5 class="afp-html-h5">
                    Aspect/Elevation
                    <!-- <info :content="this.$helpContent.problemLocation" /> -->
                </h5>
            </div>
            <div class="afp-problem-column afp-col-lg-3 afp-col-6 afp-text-center afp-mb-3">
                <problem-slider
                    key="likelihood"
                    :options="likelihoodOptions"
                    :labels="likelihoodLabels"
                    :data="problem.likelihood"
                ></problem-slider>
                <h5 class="afp-html-h5">
                    Likelihood
                    <!-- <info :content="this.$helpContent.problemLikelihood" /> -->
                </h5>
            </div>
            <div class="afp-problem-column afp-col-lg-3 afp-col-6 afp-text-center afp-mb-3">
                <problem-slider
                    key="size"
                    :options="sizeOptions"
                    :labels="sizeLabels"
                    :data="problem.size"
                ></problem-slider>
                <h5 class="afp-html-h5">
                    Size
                    <!-- <info :content="this.$helpContent.problemSize" /> -->
                </h5>
            </div>
        </div>
        <figure v-if="problem.media.url !=''" class="afp-html-figure">
            <div class="afp-imageContainer">
                <img
                    v-if="problem.media.type == 'photo'"
                    v-preview:scope-forecast
                    :src="problem.media.url"
                    :alt="problem.media.caption"
                />
                <img
                    v-if="problem.media.type == 'video'"
                    :src="'https://img.youtube.com/vi/' + problem.media.url + '/mqdefault.jpg'"
                    :alt="problem.media.caption"
                    @click="videoModal = true"
                />
                <i class="mdi mdi-arrow-expand"></i>
                <i
                    @click="videoModal = true"
                    v-if="problem.media.type == 'video'"
                    class="mdi mdi-youtube"
                ></i>
            </div>
            <figcaption class="afp-html-figcaption">{{problem.media.caption}}</figcaption>
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
            sizeOptions: ['1', '1.5', '2', '2.5', '3', '3.5', '4'],
            sizeLabels: ['Small (D1)', '', 'Large (D2)', '', 'Very Large (D3) ', '', 'Historic (D4-5)']
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

<style scoped lang="scss">
@import "../assets/bootstrap4/_functions.scss";
@import "../assets/bootstrap4/_variables.scss";
@import "../assets/bootstrap4/_mixins.scss";

.afp-problem {
    @include clearfix;
    .afp-html-h2 {
        display: inline-block;
        border-bottom: 1px solid $gray-400;
        padding-bottom: 0.2rem;
    }

    .afp-infoGraphics {
        page-break-inside: avoid;
        align-items: flex-end !important;
        .afp-html-h6,
        .afp-html-h5 {
            border-top: 1px solid $gray-400;
            margin-top: 1.5rem !important;
            padding-top: 1rem;
        }
    }

    .afp-problemIcon {
        height: 170px !important;
        width: 170px !important;
        margin: 20px 15px 10px 15px;
        cursor: help;
        @include media-breakpoint-down(xs) {
            height: 130px !important;
            width: 130px !important;
            margin: 25px 15px 0px 15px;
        }
    }

    .afp-problemText {
        font-weight: bold;
    }

    .afp-column {
        @media print {
            flex: 0 0 25%;
            max-width: 25%;
        }
        overflow: hidden;
    }

    .afp-html-figure {
        width: 100%;
        @include media-breakpoint-up(md) {
            float: right;
            width: 50%;
            margin-left: 2 * $spacer !important;
        }
        @include media-breakpoint-up(lg) {
            width: 33%;
        }
        .afp-html-figcaption {
            padding-top: 0.5rem;
            font-style: italic;
            font-size: $font-size-sm;
            text-align: center;
            font-weight: lighter;
        }
    }

    .afp-imageContainer {
        position: relative;
        img {
            width: 100%;
            cursor: zoom-in;
        }
    }

    .mdi-arrow-expand {
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

    .mdi-youtube {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: $red;
        font-size: 5rem;
    }
}
</style>
