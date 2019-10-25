<template>
    <div :class="$style.warning">
        <i class="mdi mdi-alert"></i>
        <h2>Avalanche Warning In Effect</h2>
        <span><strong>ISSUED</strong>{{ data.published_time | publicDate }}</span>
        <span><strong>EXPIRES</strong>{{ data.expires_time | publicDate }}</span>
    </div>
</template>

<script>
import moment from 'moment/src/moment.js'

export default {
    props: ['data'],
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
        margin-left: 75px;
        margin-top: 0;
    }
    span {
        display: block;
        color: #fff !important;
        font-size: $font-size-sm;
        margin-left: 75px;
        border-left: 1.5px solid rgba(255,255,255,0.7);
        padding: 0.1rem 0 0.1rem 1rem;
        strong {
            opacity: .7;
            padding-right: .5rem;
        }
    }
    padding: 1.5rem;
    margin-bottom: $spacer;
    @include border-radius($alert-border-radius);
    background-color: $high;
    -webkit-print-color-adjust: exact;
    border: 2px solid $high;
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