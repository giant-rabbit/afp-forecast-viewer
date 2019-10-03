<template>
    <div>

        <!-- danger -->
        <avalanche-danger :class="$style.spacer" :danger="data.danger" />

        <!-- problems -->
        <avalanche-problem
            v-for="problem in data.forecast_avalanche_problems"
            v-bind:key="problem.rank"
            :problem="problem"
            :config="config"
        />

        <!-- discussion -->
        <div v-show="data.hazard_discussion != ''" :class="$style.spacer">
            <h2>Forecast Discussion</h2>
            <div v-html="data.hazard_discussion"></div>
        </div>

        <!-- media -->
        <media-gallery :class="$style.spacer" :media="data.media" scope="scope-forecast" />
        <!-- <div v-if="this.$config.mediaUrl" :class="$style.textCenter">
                        <a
                            :href="this.$config.mediaUrl"
                            @click="tabSelected = 'weather'"
                            :class="$style.btnPrimary"
                            class="afp-btn-primary"
                        >View More Media</a>
        </div>-->
    </div>
</template>

<script>
import AvalancheDanger from '../components/AvalancheDanger'
import AvalancheProblem from '../components/AvalancheProblem'
import MediaGallery from '../components/MediaGallery'

export default {
    data() {
        return {
        }
    },
    props: ['data', 'config'],
    components: {
        AvalancheDanger,
        AvalancheProblem,
        MediaGallery
    }
}
</script>

<style module lang="scss">
@import "../assets/css/bootstrap/functions";
@import "../assets/css/_variables.scss";
@import "../assets/css/bootstrap/mixins";

.spacer {
    margin-bottom: $spacer;
}

// .btnPrimary {
//     composes: btn from "../assets/css/style.css";
//     composes: btn-primary from "../assets/css/style.css";
// }


.container {
    composes: container from "../assets/css/style.css";
}

</style>
