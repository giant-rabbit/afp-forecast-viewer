<template>
    <div class="afp-warning afp-alert afp-alert-danger">
        <i class="mdi mdi-alert"></i>
        <h2 class="afp-html-h2">Avalanche Warning In Effect</h2>
        <span>
            <strong>ISSUED</strong>
            {{ data.published_time | publicDate }}
        </span>
        <span>
            <strong>EXPIRES</strong>
            {{ data.expires_time | publicDate }}
        </span>
    </div>
</template>

<script>
import moment from 'moment/src/moment.js'

export default {
    props: ['data'],
}
</script>

<style scoped lang="scss">
@import "../assets/bootstrap4/_functions.scss";
@import "../assets/bootstrap4/_variables.scss";
@import "../assets/bootstrap4/_mixins.scss";

.afp-warning {
    -webkit-print-color-adjust: exact;
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
        border-left: 1.5px solid rgba(255, 255, 255, 0.7);
        padding: 0.1rem 0 0.1rem 1rem;
        strong {
            opacity: 0.7;
            padding-right: 0.5rem;
        }
    }
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