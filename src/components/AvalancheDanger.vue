<template>
    <div :class="$style.danger">
        <div :class="$style.row">
            <div :class="$style.today">
                <h6>
                    Today's Avalanche Danger
                    <info :content="this.$helpContent.avalancheDanger" />
                </h6>
                {{ todayDate }}
                <div :class="$style.dangerGraphic">
                    <div :class="$style.elevationBlock">
                        <span :class="$style.elevationLabel">{{config.elevations.upper}}</span>
                        <span
                            :class="$style.dangerLabel"
                        >{{this.$dangerScale[currentDanger.upper].rating}} ({{currentDanger.upper}})</span>
                        <img
                            :class="$style.dangerIcon"
                            :src="this.$dangerScale[currentDanger.upper].icon"
                        />
                    </div>
                    <div :class="$style.elevationBlock">
                        <span :class="$style.elevationLabel">{{config.elevations.middle}}</span>
                        <span
                            :class="$style.dangerLabel"
                        >{{this.$dangerScale[currentDanger.middle].rating}} ({{currentDanger.middle}})</span>
                        <img
                            :class="$style.dangerIcon"
                            :src="this.$dangerScale[currentDanger.middle].icon"
                        />
                    </div>
                    <div :class="$style.elevationBlock">
                        <span :class="$style.elevationLabel">{{config.elevations.lower}}</span>
                        <span
                            :class="$style.dangerLabel"
                        >{{this.$dangerScale[currentDanger.lower].rating}} ({{currentDanger.lower}})</span>
                        <img
                            :class="$style.dangerIcon"
                            :src="this.$dangerScale[currentDanger.lower].icon"
                        />
                    </div>
                    <danger-elevation :class="$style.dangerMountain" :danger="currentDanger"></danger-elevation>
                </div>
            </div>
            <div :class="$style.outlook">
                <h6>Outlook for Tomorrow</h6>
                {{outlookDate}}
                <div :class="$style.dangerGraphic">
                    <div :class="$style.elevationOutlookBlock">
                        <span
                            :class="$style.dangerOutlookLabel"
                        >{{this.$dangerScale[outlookDanger.upper].rating}} ({{outlookDanger.upper}})</span>
                        <img
                            :class="$style.dangerIcon"
                            :src="this.$dangerScale[outlookDanger.upper].icon"
                        />
                    </div>
                    <div :class="$style.elevationOutlookBlock">
                        <span
                            :class="$style.dangerOutlookLabel"
                        >{{this.$dangerScale[outlookDanger.middle].rating}} ({{outlookDanger.middle}})</span>
                        <img
                            :class="$style.dangerIcon"
                            :src="this.$dangerScale[outlookDanger.middle].icon"
                        />
                    </div>
                    <div :class="$style.elevationOutlookBlock">
                        <span
                            :class="$style.dangerOutlookLabel"
                        >{{this.$dangerScale[outlookDanger.lower].rating}} ({{outlookDanger.lower}})</span>
                        <img
                            :class="$style.dangerIcon"
                            :src="this.$dangerScale[outlookDanger.lower].icon"
                        />
                    </div>
                </div>
            </div>
        </div>
        <div :class="$style.outlookMobile">
            <div :class="$style.outlookMobileText">
                <h6>Outlook for Tomorrow</h6>
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
            return current
        },
        outlookDanger: function () {
            if (this.danger.length > 1) {
                let outlook = this.danger.find(outlook => outlook.valid_day == "tomorrow");
                return outlook
            } else {
                return false
            }
        },
        todayDate: function () {
            console.log(moment(this.date).hours())
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
    margin-bottom: 1.5*$spacer;
}
.row {
    composes: row from "../assets/css/style.css";
}

.today {
    composes: col-lg-8 from "../assets/css/style.css";
    composes: col-md-12 from "../assets/css/style.css";
    margin-bottom: $spacer;
}

.outlook {
    composes: col-lg-4 from "../assets/css/style.css";
    composes: col-md-12 from "../assets/css/style.css";
    margin-bottom: $spacer;
    @include media-breakpoint-down(md) {
        display: none;
    }
}

.dangerGraphic {
    position: relative;
    padding-top: $spacer;
    overflow: hidden;
    @include media-breakpoint-down(xs) {
        margin-left: -15px;
        margin-right: -10px;
    }
}

.dangerMountain {
    position: absolute;
    bottom: 5px;
    left: 110px;
    width: 250px;
    height: 300px;
    @include media-breakpoint-between(lg, lg) {
        left: 100px;
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
    position: relative;
    background-color: $gray-300;
    height: $elevation-height;
    margin-right: 60px;
    margin-bottom: 5px;
    @include media-breakpoint-down(sm) {
        margin-right: 45px;
    }
}

.elevationLabel {
    position: absolute;
    left: 30px;
    transform: translate(0, -50%);
    top: 50%;
    width: 80px;
    display: block;
    font-size: $font-size-sm;
    font-weight: bold;
    color: $gray-600;
    // @include media-breakpoint-between(lg, lg) {
    //     left: 20px;
    // }
    @include media-breakpoint-down(sm) {
        background-color: #fff;
        //background-color: rgba(255,255,255,.7);
        //border-radius: 0 $border-radius $border-radius  0;
        z-index: 1;
        padding: 0.2rem 0.4rem;
        //box-shadow: $app-box-shadow;
        //text-align: right;
        // font-size: .6rem;
        width: auto;
        left: 0px;
    }
}

.dangerLabel {
    position: absolute;
    right: 50px;
    transform: translate(0, -50%);
    top: 50%;
    width: 230px;
    display: block;
    // font-size: $font-size-lg;
    font-weight: bold;
    color: $gray-800;
    text-transform: uppercase;
    @include media-breakpoint-between(lg, lg) {
        width: 150px;
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
    // @include media-breakpoint-down(xs) {
    //     background-color: #fff;
    //     width: 160px;
    //     z-index: 1;
    //     padding: 0.2rem 0.4rem;
    //     box-shadow: $app-box-shadow;
    //     right: initial;
    //     left: 120px;
    //     text-align: right;
    // }
}

.dangerIcon {
    position: absolute;
    left: 100%;
    height: 90px !important;
    width: auto !important;
    padding: 12px 0;
    margin-left: -32px;
    z-index: 1;
    @include media-breakpoint-down(sm) {
        padding: 20px 0;
        margin-left: -25px;
    }
}

.elevationOutlookBlock {
    position: relative;
    background-color: $gray-300;
    height: $elevation-height;
    margin-bottom: 5px;
    margin-right: 60px;
}

.dangerOutlookLabel {
    position: absolute;
    left: 20px;
    transform: translate(0, -50%);
    top: 50%;
    width: 200px;
    display: block;
    font-weight: bold;
    color: $gray-800;
    text-transform: uppercase;
}

.outlookMobile {
    position: relative;
    width: 300px;
    height: 140px;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 1rem;
    @include media-breakpoint-up(lg) {
        display: none;
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