<template>
    <div :class="$style.danger">
        <div :class="$style.row">
            <div :class="$style.today">
                <h6>Today's Avalanche Danger</h6>
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
                    <!-- <danger-elevation :danger="currentDanger"></danger-elevation> -->
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
                    <!-- <danger-elevation :danger="currentDanger"></danger-elevation> -->
                </div>
            </div>
        </div>
        <danger-scale />
    </div>
</template>

<script>
import DangerElevation from '../components/DangerElevation'
import DangerScale from '../components/DangerScale'
import moment from 'moment/src/moment.js'

export default {
    data() {
        return {
        }
    },
    components: {
        DangerElevation,
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
    @include divider;
}

.row {
    composes: row from "../assets/css/style.css";
}

.today {
    composes: col-lg-9 from "../assets/css/style.css";
    composes: col-md-12 from "../assets/css/style.css";
    margin-bottom: $spacer;
}

.outlook {
    composes: col-lg-3 from "../assets/css/style.css";
    composes: col-md-12 from "../assets/css/style.css";
    margin-bottom: $spacer;
}

.dangerGraphic {
    margin-top: $spacer;
}

$elevation-height: 90px;

.elevationBlock {
    position: relative;
    background-color: $gray-300;
    height: $elevation-height;
    @include media-breakpoint-up(lg) {
        margin-right: 50px;
    }
    margin-bottom: 5px;
}

.elevationLabel {
    position: absolute;
    left: 20px;
    transform: translate(0, -50%);
    top: 50%;
    width: 80px;
    display: block;
    font-size: $font-size-sm;
    font-weight: bold;
    color: $gray-600;
}

.dangerLabel {
    position: absolute;
    right: 50px;
    transform: translate(0, -50%);
    top: 50%;
    width: 200px;
    display: block;
    // font-size: $font-size-lg;
    font-weight: bold;
    color: $gray-800;
    text-transform: uppercase;
}

.dangerIcon {
    position: absolute;
    left: 100%;
    height: 90px !important;
    width: auto !important;
    padding: 10px 0;
    margin-left: -35px;
}

.elevationOutlookBlock {
    position: relative;
    background-color: $gray-300;
    height: $elevation-height;
    margin-bottom: 5px;
}

.dangerOutlookLabel {
    position: absolute;
    left: 20px;
    transform: translate(0, -50%);
    top: 50%;
    width: 200px;
    display: block;
    // font-size: $font-size-lg;
    font-weight: bold;
    color: $gray-800;
    text-transform: uppercase;
}
</style>