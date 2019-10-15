<template>
    <div :class="$style.danger">
        <div :class="$style.row">
            <div
                :class="{[$style.today] : outlookDanger, [$style.todayNoOutlook] : !outlookDanger}"
            >
                <h6>
                    Avalanche Danger
                    <info :content="this.$helpContent.avalancheDanger" />
                </h6>
                {{ todayDate }}
                <div :class="$style.dangerGraphic">
                    <div :class="$style.elevationBlock">
                        <span :class="$style.elevationLabel">{{config.elevations.upper}}</span>
                        <span
                            :class="$style.dangerLabel"
                        >{{this.$dangerScale[currentDanger.upper].rating}} ({{currentDanger.upper}})</span>
                        <v-popover :class="$style.dangerIcon">
                            <img
                                :src="this.$dangerScale[currentDanger.upper].icon"
                                v-tooltip="'Click to learn more'"
                            />
                            <template slot="popover">
                                <div v-html="this.$dangerScale[currentDanger.upper].advice"></div>
                            </template>
                        </v-popover>
                    </div>
                    <div :class="$style.elevationBlock">
                        <span :class="$style.elevationLabel">{{config.elevations.middle}}</span>
                        <span
                            :class="$style.dangerLabel"
                        >{{this.$dangerScale[currentDanger.middle].rating}} ({{currentDanger.middle}})</span>
                        <v-popover :class="$style.dangerIcon">
                            <img
                                :src="this.$dangerScale[currentDanger.middle].icon"
                                v-tooltip="'Click to learn more'"
                            />
                            <template slot="popover">
                                <div v-html="this.$dangerScale[currentDanger.middle].advice"></div>
                            </template>
                        </v-popover>
                    </div>
                    <div :class="$style.elevationBlock">
                        <span :class="$style.elevationLabel">{{config.elevations.lower}}</span>
                        <span
                            :class="$style.dangerLabel"
                        >{{this.$dangerScale[currentDanger.lower].rating}} ({{currentDanger.lower}})</span>
                        <v-popover :class="$style.dangerIcon">
                            <img
                                :src="this.$dangerScale[currentDanger.lower].icon"
                                v-tooltip="'Click to learn more'"
                            />
                            <template slot="popover">
                                <div v-html="this.$dangerScale[currentDanger.lower].advice"></div>
                            </template>
                        </v-popover>
                    </div>
                    <danger-elevation :class="$style.dangerMountain" :danger="currentDanger"></danger-elevation>
                </div>
            </div>
            <div v-if="outlookDanger" :class="$style.outlook">
                <h6>
                    Outlook
                    <info :content="this.$helpContent.avalancheDangerOutlook" />
                </h6>
                {{outlookDate}}
                <div :class="$style.dangerGraphic">
                    <div :class="$style.elevationOutlookBlock">
                        <span
                            :class="$style.dangerOutlookLabel"
                        >{{this.$dangerScale[outlookDanger.upper].rating}} ({{outlookDanger.upper}})</span>
                        <v-popover :class="[$style.dangerIcon, $style.dangerIconOutlook]">
                            <img
                                :src="this.$dangerScale[outlookDanger.upper].icon"
                                v-tooltip="'Click to learn more'"
                            />
                            <template slot="popover">
                                <div v-html="this.$dangerScale[outlookDanger.upper].advice"></div>
                            </template>
                        </v-popover>
                    </div>
                    <div :class="$style.elevationOutlookBlock">
                        <span
                            :class="$style.dangerOutlookLabel"
                        >{{this.$dangerScale[outlookDanger.middle].rating}} ({{outlookDanger.middle}})</span>
                        <v-popover :class="[$style.dangerIcon, $style.dangerIconOutlook]">
                            <img
                                :src="this.$dangerScale[outlookDanger.middle].icon"
                                v-tooltip="'Click to learn more'"
                            />
                            <template slot="popover">
                                <div v-html="this.$dangerScale[outlookDanger.middle].advice"></div>
                            </template>
                        </v-popover>
                    </div>
                    <div :class="$style.elevationOutlookBlock">
                        <span
                            :class="$style.dangerOutlookLabel"
                        >{{this.$dangerScale[outlookDanger.lower].rating}} ({{outlookDanger.lower}})</span>
                        <v-popover :class="[$style.dangerIcon, $style.dangerIconOutlook]">
                            <img
                                :src="this.$dangerScale[outlookDanger.lower].icon"
                                v-tooltip="'Click to learn more'"
                            />
                            <template slot="popover">
                                <div v-html="this.$dangerScale[outlookDanger.lower].advice"></div>
                            </template>
                        </v-popover>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="outlookDanger" :class="$style.outlookMobile">
            <div :class="$style.outlookMobileText">
                <h6>
                    Outlook
                    <info :content="this.$helpContent.avalancheDangerOutlook" />
                </h6>
                {{outlookDate}}
            </div>
            <div :class="$style.outlookMobileGraphic">
                <danger-elevation-mobile
                    :class="$style.dangerMountainMobile"
                    :danger="outlookDanger"
                ></danger-elevation-mobile>
            </div>
        </div>
        <danger-scale />
    </div>
</template>

<script>
import DangerElevation from '../components/DangerElevation'
import DangerElevationMobile from '../components/DangerElevationMobile'
import DangerScale from '../components/DangerScale'
import moment from 'moment/src/moment.js'

export default {
    data() {
        return {
        }
    },
    components: {
        DangerElevation,
        DangerElevationMobile,
        DangerScale
    },
    props: ['danger', 'date', 'config'],
    computed: {
        currentDanger: function () {
            let current = this.danger.find(current => current.valid_day == "current");
            if (current.upper == null) {
                current.upper = 0
            }
            if (current.middle == null) {
                current.middle = 0
            }
            if (current.lower == null) {
                current.lower = 0
            }
            return current
        },
        outlookDanger: function () {
            if (this.danger.length > 1) {
                let outlook = this.danger.find(outlook => outlook.valid_day == "tomorrow");
                if (outlook.upper == null) {
                    outlook.upper = 0
                }
                if (outlook.middle == null) {
                    outlook.middle = 0
                }
                if (outlook.lower == null) {
                    outlook.lower = 0
                }
                return outlook
            } else {
                return false
            }
        },
        todayDate: function () {
            if (moment(this.date).hours() > 12) {
                return moment(this.date).add(24, 'h').format('dddd, MMMM D, YYYY')
            } else {
                return moment(this.date).format('dddd, MMMM D, YYYY')
            }

        },
        outlookDate: function () {
            if (moment(this.date).hours() > 12) {
                return moment(this.date).add(48, 'h').format('dddd, MMMM D, YYYY')
            } else {
                return moment(this.date).add(24, 'h').format('dddd, MMMM D, YYYY')
            }
        }
    }
}

</script>

<style module lang="scss">
@import "../assets/css/bootstrap/functions";
@import "../assets/css/_variables.scss";
@import "../assets/css/bootstrap/mixins";

.danger {
    margin-bottom: 1.5 * $spacer;
}
.row {
    composes: row from "../assets/css/style.css";
    justify-content: space-between;
}

.today {
    // composes: col-lg-8 from "../assets/css/style.css";
    // composes: col-md-12 from "../assets/css/style.css";
    margin-bottom: $spacer;
    width: 100%;
    padding-left: 15px;
    padding-right: 15px;
    @include media-breakpoint-up(lg) {
        flex: 0 0 70%;
        max-width: 70%;
    }
    @media print {
        width: 100%;
        flex: initial;
        max-width: 100%;
    }
}

.todayNoOutlook {
    // composes: col-lg-8 from "../assets/css/style.css";
    // composes: col-md-12 from "../assets/css/style.css";
    composes: col-12 from "../assets/css/style.css";
    margin-bottom: $spacer;
}

.outlook {
    // composes: col-lg-3 from "../assets/css/style.css";
    // composes: offset-lg-1 from "../assets/css/style.css";
    // composes: col-md-12 from "../assets/css/style.css";
    flex: 0 0 260px;
    max-width: 260px;
    padding-right: 15px;
    margin-bottom: $spacer;
    @include media-breakpoint-up(xl) {
        flex: 0 0 280px;
        max-width: 280px;
    }
    @include media-breakpoint-down(md) {
        display: none;
    }
    @media print {
        display: none !important;
    }
}

.dangerGraphic {
    position: relative;
    padding-top: $spacer;
    overflow: hidden;
    page-break-inside: avoid;
    @include media-breakpoint-down(sm) {
        margin-left: -15px;
        margin-right: -10px;
    }
}

.dangerMountain {
    position: absolute;
    bottom: 5px;
    left: 100px;
    width: 250px;
    height: 300px;
    @include media-breakpoint-between(lg, lg) {
        left: 90px;
    }
    // @include media-breakpoint-down(sm) {
    //     left: 90px;
    // }
    @include media-breakpoint-down(sm) {
        left: initial;
        right: 185px;
    }
}

$elevation-height: 90px;

.elevationBlock {
    -webkit-print-color-adjust: exact;
    position: relative;
    background-color: $gray-300;
    border: 2px solid $gray-300;
    height: $elevation-height;
    margin-right: 60px;
    margin-bottom: 5px;
    @include media-breakpoint-down(sm) {
        margin-right: 45px;
    }
}

.elevationLabel {
    position: absolute;
    left: 15px;
    transform: translate(0, -50%);
    top: 50%;
    width: 80px;
    display: block;
    font-size: $font-size-sm;
    font-weight: bold;
    color: $gray-600;
    @include media-breakpoint-down(sm) {
        background-color: #fff;
        z-index: 1;
        padding: 0.2rem 0.4rem;
        width: auto;
        left: -2px;
    }
}

.dangerLabel {
    position: absolute;
    right: 50px;
    transform: translate(0, -50%);
    top: 50%;
    width: 230px;
    display: block;
    font-size: 1.1rem;
    font-weight: bold;
    color: $gray-800;
    text-transform: uppercase;
    @include media-breakpoint-between(lg, lg) {
        width: 160px;
    }
    @include media-breakpoint-between(md, md) {
        width: 180px;
    }
    @include media-breakpoint-down(sm) {
        font-size: $font-size-sm;
        width: auto;
        z-index: 1;
        right: 35px;
        text-align: right;
    }
}

.dangerIcon {
    position: absolute;
    left: 100%;
    height: 86px !important;
    width: 70px !important;
    padding: 10px 0;
    margin-left: -31px;
    z-index: 1;
    @include media-breakpoint-down(sm) {
        padding: 20px 0;
        margin-left: -25px;
    }
    div {
        display: block !important;
        cursor: help;
        width: 100%;
        height: 100%;
    }
    img {
        height: 100% !important;
        width: auto !important;
        max-width: initial !important;
    }
}

.elevationOutlookBlock {
    -webkit-print-color-adjust: exact;
    position: relative;
    background-color: $gray-300;
    border: 2px solid $gray-300;
    height: $elevation-height;
    margin-bottom: 5px;
    margin-right: 50px;
}

.dangerOutlookLabel {
    position: absolute;
    left: 20px;
    transform: translate(0, -50%);
    top: 50%;
    width: 200px;
    display: block;
    font-weight: bold;
    font-size: 0.9rem;
    color: $gray-800;
    text-transform: uppercase;
}

.dangerIconOutlook {
    height: 86px !important;
    width: 70px !important;
    padding: 16px 0;
    margin-left: -26px;
}

.outlookMobile {
    position: relative;
    width: 330px;
    height: 140px;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 1rem;
    page-break-inside: avoid;
    @include media-breakpoint-up(lg) {
        display: none;
    }
    @media print {
        display: block !important;
    }
}

.outlookMobileText {
    position: absolute;
    top: 0;
    left: 0;
}
.outlookMobileGraphic {
    position: absolute;
    top: 0;
    right: 0;
}
</style>