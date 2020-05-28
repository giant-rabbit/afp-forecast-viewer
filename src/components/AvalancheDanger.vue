<template>
    <div class="afp-danger afp-mb-4">
        <div class="afp-row">
            <div
                class="afp-danger-today afp-mb-3"
                :class="{'afp-danger-noOutlook' : !outlookDanger }"
            >
                <h2 class="afp-html-h2">
                    Avalanche Danger
                    <info :content="this.$helpContent.avalancheDanger" />
                </h2>
                {{ todayDate }}
                <div class="afp-dangerGraphic">
                    <div class="afp-elevationBlock">
                        <span class="afp-elevationLabel">{{elevations.upper.title}}</span>
                        <span
                            class="afp-dangerLabel"
                        >{{this.$dangerScale[currentDanger.upper].rating}} ({{currentDanger.upper}})</span>
                        <v-popover class="afp-dangerIcon" @show="uiClick('info pop up » danger')">
                            <img
                                :src="this.$dangerScale[currentDanger.upper].icon"
                                v-tooltip="'Click to learn more'"
                            />
                            <template slot="popover">
                                <div v-html="this.$dangerScale[currentDanger.upper].advice"></div>
                            </template>
                        </v-popover>
                    </div>
                    <div class="afp-elevationBlock">
                        <span class="afp-elevationLabel">{{elevations.middle.title}}</span>
                        <span
                            class="afp-dangerLabel"
                        >{{this.$dangerScale[currentDanger.middle].rating}} ({{currentDanger.middle}})</span>
                        <v-popover class="afp-dangerIcon" @show="uiClick('info pop up » danger')">
                            <img
                                :src="this.$dangerScale[currentDanger.middle].icon"
                                v-tooltip="'Click to learn more'"
                            />
                            <template slot="popover">
                                <div v-html="this.$dangerScale[currentDanger.middle].advice"></div>
                            </template>
                        </v-popover>
                    </div>
                    <div class="afp-elevationBlock">
                        <span class="afp-elevationLabel">{{elevations.lower.title}}</span>
                        <span
                            class="afp-dangerLabel"
                        >{{this.$dangerScale[currentDanger.lower].rating}} ({{currentDanger.lower}})</span>
                        <v-popover class="afp-dangerIcon" @show="uiClick('info pop up » danger')">
                            <img
                                :src="this.$dangerScale[currentDanger.lower].icon"
                                v-tooltip="'Click to learn more'"
                            />
                            <template slot="popover">
                                <div v-html="this.$dangerScale[currentDanger.lower].advice"></div>
                            </template>
                        </v-popover>
                    </div>
                    <danger-elevation class="afp-dangerMountain" :danger="currentDanger"></danger-elevation>
                </div>
            </div>
            <div v-if="outlookDanger" class="afp-outlook">
                <h2 class="afp-html-h2">
                    Outlook
                    <info :content="this.$helpContent.avalancheDangerOutlook" />
                </h2>
                {{outlookDate}}
                <div class="afp-dangerGraphic">
                    <div class="afp-elevationOutlookBlock">
                        <span
                            class="afp-dangerOutlookLabel"
                        >{{this.$dangerScale[outlookDanger.upper].rating}} ({{outlookDanger.upper}})</span>
                        <v-popover class="afp-dangerIcon afp-dangerIconOutlook" @show="uiClick('info pop up » danger')">
                            <img
                                :src="this.$dangerScale[outlookDanger.upper].icon"
                                v-tooltip="'Click to learn more'"
                            />
                            <template slot="popover">
                                <div v-html="this.$dangerScale[outlookDanger.upper].advice"></div>
                            </template>
                        </v-popover>
                    </div>
                    <div class="afp-elevationOutlookBlock">
                        <span
                            class="afp-dangerOutlookLabel"
                        >{{this.$dangerScale[outlookDanger.middle].rating}} ({{outlookDanger.middle}})</span>
                        <v-popover class="afp-dangerIcon afp-dangerIconOutlook" @show="uiClick('info pop up » danger')">
                            <img
                                :src="this.$dangerScale[outlookDanger.middle].icon"
                                v-tooltip="'Click to learn more'"
                            />
                            <template slot="popover">
                                <div v-html="this.$dangerScale[outlookDanger.middle].advice"></div>
                            </template>
                        </v-popover>
                    </div>
                    <div class="afp-elevationOutlookBlock">
                        <span
                            class="afp-dangerOutlookLabel"
                        >{{this.$dangerScale[outlookDanger.lower].rating}} ({{outlookDanger.lower}})</span>
                        <v-popover class="afp-dangerIcon afp-dangerIconOutlook" @show="uiClick('info pop up » danger')">
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
        <div v-if="outlookDanger" class="afp-outlookMobile">
            <div class="afp-outlookMobileText">
                <h2 class="afp-html-h2">
                    Outlook
                    <info :content="this.$helpContent.avalancheDangerOutlook" />
                </h2>
                {{outlookDate}}
            </div>
            <div class="afp-outlookMobileGraphic">
                <danger-elevation-mobile class="afp-dangerMountainMobile" :danger="outlookDanger"></danger-elevation-mobile>
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
            elevations: this.$centerMeta.config.elevations
        }
    },
    components: {
        DangerElevation,
        DangerElevationMobile,
        DangerScale
    },
    props: ['danger', 'date'],
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

<style scoped lang="scss">
@import "../assets/bootstrap4/_functions.scss";
@import "../assets/bootstrap4/_variables.scss";
@import "../assets/bootstrap4/_mixins.scss";

.afp-danger {
    .afp-html-h2 {
        margin-bottom: 0.5rem !important;
    }

    .afp-danger-today {
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
        &.afp-danger-noOutlook {
            flex: 0 0 100%;
            max-width: 100%;
        }
    }

    .afp-outlook {
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

    .afp-dangerGraphic {
        position: relative;
        padding-top: $spacer;
        overflow: hidden;
        page-break-inside: avoid;
        @include media-breakpoint-down(sm) {
            margin-left: -15px;
            margin-right: -10px;
        }
    }

    .afp-dangerMountain {
        position: absolute;
        bottom: 5px;
        left: 100px;
        width: 250px;
        height: 300px;
        @include media-breakpoint-between(lg, lg) {
            left: 90px;
        }
        @include media-breakpoint-down(sm) {
            left: initial;
            right: 185px;
        }
    }

    $elevation-height: 90px;

    .afp-elevationBlock {
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

    .afp-elevationLabel {
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
        // .afp-popover-trigger {
        //     position: absolute;
        //     top: 0;
        //     left: -10px;
        // }
    }

    .afp-dangerLabel {
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

    .afp-dangerIcon::v-deep {
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
            height: 100%;
            width: auto;
            max-width: initial;
        }
    }

    .afp-elevationOutlookBlock {
        -webkit-print-color-adjust: exact;
        position: relative;
        background-color: $gray-300;
        border: 2px solid $gray-300;
        height: $elevation-height;
        margin-bottom: 5px;
        margin-right: 50px;
    }

    .afp-dangerOutlookLabel {
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

    .afp-dangerIconOutlook {
        height: 86px !important;
        width: 70px !important;
        padding: 16px 0;
        margin-left: -25px;
    }

    .afp-outlookMobile {
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

    .afp-outlookMobileText {
        position: absolute;
        top: 0;
        left: 0;
    }

    .afp-outlookMobileGraphic {
        position: absolute;
        top: 0;
        right: 0;
    }
}
</style>
