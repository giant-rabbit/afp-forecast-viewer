<template>
    <div class="afp-forecast-view" :class="$style.container">
        <!-- Header -->
        <div :class="$style.row">
            <div :class="$style.metaColumn">
                <h5>Issued</h5>
                {{ data.published_time | publicDate }}
            </div>
            <div :class="$style.metaColumn">
                <h5>Expires</h5>
                {{ data.expires_time | publicDate }}
            </div>
            <div :class="$style.metaColumn">
                <h5>Author</h5>
                {{ data.author }}
            </div>
        </div>

        <!-- Bottom line -->
        <div v-if="data.bottom_line != ''" :class="$style.bottomLine">
            <span :class="$style.bottomLineTitle">BOTTOM LINE:</span>
            <span v-html="'' + data.bottom_line"></span>
        </div>

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
        <media-gallery :class="$style.spacer" :media="data.media" />
        <!-- <div v-if="this.$config.mediaUrl" :class="$style.textCenter">
                        <a
                            :href="this.$config.mediaUrl"
                            @click="tabSelected = 'weather'"
                            :class="$style.btnPrimary"
                            class="afp-btn-primary"
                        >View More Media</a>
        </div>-->

        <!-- weather -->
        <div v-if="data.weather_data" :class="$style.spacer">
            <h2>Weather</h2>
            <!-- weather table -->
            <weather-table
                :periods="data.weather_data[0].periods"
                :data="data.weather_data[0].data"
                :zone="data.forecast_zone.name"
                :class="$style.spacer"
            />
        </div>
    </div>
</template>

<script>
import moment from 'moment'
import AvalancheDanger from '../components/AvalancheDanger'
import AvalancheProblem from '../components/AvalancheProblem'
import MediaGallery from '../components/MediaGallery'
import WeatherTable from '../components/WeatherTable'

export default {
    data() {
        return {
        }
    },
    props: {
        data: {
            type: Object,
            default: {}
        },
        product: {
            type: String,
            default: 'forecast'
        },
        config: {
            type: Object,
            default: function () {
                return {
                    elevations: {
                        upper: "Alpine",
                        middle: "Treeline",
                        lower: "Below Treeline"
                    },
                    assets: {
                        icons: true,
                        photoswipe: true
                    }
                }
            }
        }
    },
    components: {
        AvalancheDanger,
        AvalancheProblem,
        MediaGallery,
        WeatherTable
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

.productExpired {
    font-size: $font-size-lg;
    color: #fff;
    padding: $alert-padding-y $alert-padding-x;
    margin-bottom: $spacer;
    @include border-radius($alert-border-radius);
    background-color: $high;
    span {
        vertical-align: middle;
    }
    i {
        vertical-align: middle;
        font-size: 200%;
        line-height: 1;
        padding-right: $spacer * 0.5;
    }
}

.container {
    composes: container from "../assets/css/style.css";
}

.row {
    composes: row from "../assets/css/style.css";
}

.metaColumn {
    composes: col-md-4 from "../assets/css/style.css";
    composes: col-12 from "../assets/css/style.css";
    margin-bottom: $spacer;
}

.bottomLine {
    p:last-of-type {
        margin-bottom: 0;
    }
    background-color: $gray-300;
    padding: $spacer;
    font-size: $font-size-lg;
    border-radius: $border-radius;
    margin-bottom: $spacer;
}
.bottomLineTitle {
    float: left;
    padding-right: .5rem;
    font-weight: bold;
}
</style>
