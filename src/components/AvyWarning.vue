<template>
    <div :class="$style.warning">
        <i class="mdi mdi-alert"></i>
        <h2>Avalanche Warning In Effect</h2>
        <span>Issued: Fri, February 15, 2019 at 2:06 PM PST</span>
    </div>
</template>

<script>
import moment from 'moment/src/moment.js'

export default {
}
</script>

<style module lang="scss">
@import "../assets/css/bootstrap/functions";
@import "../assets/css/_variables.scss";
@import "../assets/css/bootstrap/mixins";

.warning {
    position: relative;
    h2 {
        color: #fff !important;
        margin-bottom: 0.5rem !important;
        margin-left: 65px;
        margin-top: 0;
    }
    span {
        display: block;
        color: #fff !important;
        font-size: $font-size-sm;
        margin-left: 65px;
    }
    padding: 1.5rem;
    margin-bottom: $spacer;
    @include border-radius($alert-border-radius);
    background-color: $high;
    i {
        color: #fff !important;
        font-size: 4rem;
        line-height: 1;
        position: absolute;
        top: 1.5rem;
        left: 15px;
        @include media-breakpoint-up(sm) {
            transform: translate(0, -50%);
            top: 50%;
        }
    }
}
</style>