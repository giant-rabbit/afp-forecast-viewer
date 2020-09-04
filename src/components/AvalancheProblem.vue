<template>
    <div class="afp-problem afp-mb-4 afp-divider">
        <h2 class="afp-html-h2">Avalanche Problem #{{problem.rank}}</h2>
        <info :content="this.$helpContent.avalancheProblem" />
        <div class="afp-infoGraphics afp-row">
            <div class="afp-problem-column afp-col-lg-3 afp-col-6 afp-text-center afp-mb-3">
                <v-popover @show="uiClick('info pop up » problem')">
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
                    :location="problem.location"
                    :key="'rose'+problem.rank"
                    :zone="zone"
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
        <figure
            v-if="problem.media.url !='' && problem.media.type == 'photo' "
            class="afp-html-figure "
        >
            <div class="afp-imageContainer afp-image-container">
                <img
                    :src="problem.media.url"
                    :alt="problem.media.caption"
                    :data-pswp-src="problem.media.url"
                    :data-pswp-title="problem.media.caption"
                    class="afp-html-img"
                />
            </div>
            <figcaption class="afp-html-figcaption">{{problem.media.caption}}</figcaption>
        </figure>
        <figure
            v-if="problem.media.url !='' && problem.media.type == 'video' "
            class="afp-html-figure  afp-video-modal"
        >
            <div class="afp-imageContainer afp-image-container afp-video-container">
                <img
                    :src="'https://img.youtube.com/vi/' + problem.media.url + '/mqdefault.jpg'"
                    :alt="problem.media.caption"
                    @click="videoModal = true"
                    :data-video-id=" problem.media.url"
                    class="afp-html-img"
                />
            </div>
            <figcaption class="afp-html-figcaption">{{problem.media.caption}}</figcaption>
        </figure>
        <div class="afp-tinymce" v-html="problem.discussion"></div>
    </div>
</template>

<script>
import LocatorRose from '../components/LocatorRose'
import ProblemSlider from '../components/ProblemSlider'

export default {
    data() {
        return {
            likelihoodOptions: ['unlikely', 'possible', 'likely', 'very likely', 'almost certain'],
            likelihoodLabels: ['Unlikely', 'Possible', 'Likely', 'Very Likely', 'Almost Certain'],
            sizeOptions: ['1', '1.5', '2', '2.5', '3', '3.5', '4'],
            sizeLabels: ['Small (D1)', '', 'Large (D2)', '', 'Very Large (D3) ', '', 'Historic (D4-5)']
        }
    },
    components: {
        LocatorRose,
        ProblemSlider
    },
    props: ['problem', 'zone'],
    mounted() {

    }
}
</script>

<style scoped lang="scss">
@import "../assets/bootstrap4/_functions.scss";
@import "../assets/bootstrap4/_variables.scss";
@import "../assets/bootstrap4/_mixins.scss";

.afp-problem {
    overflow: hidden;
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
}
</style>
