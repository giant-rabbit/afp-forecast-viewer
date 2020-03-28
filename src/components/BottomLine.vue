<template>
    <div class="afp-bottomLine">
        <v-popover class="afp-bottomLine-icon">
            <img :src="this.$dangerScale[highestDanger].icon" v-tooltip="'Click to learn more'" />
            <template slot="popover">
                <div v-html="this.$dangerScale[highestDanger].advice"></div>
            </template>
        </v-popover>
        <h5 class="afp-html-h5 afp-bottomLine-title">THE BOTTOM LINE</h5>
        <div class="afp-bottomLine-text afp-tinymce" v-html="bottomLine"></div>
    </div>
</template>

<script>
export default {
    data() {
        return {
        }
    },
    props: ['highestDanger', 'bottomLine'],
}
</script>

<style scoped lang="scss">
@import "../assets/bootstrap4/_functions.scss";
@import "../assets/bootstrap4/_variables.scss";
@import "../assets/bootstrap4/_mixins.scss";

.afp-forecast-title .afp-html-h2 {
    color: $gray-700 !important;
    margin-bottom: 0 !important;
    text-indent: -0.75rem;
    margin-left: 1.5rem;
}
.afp-bottomLine {
    position: relative;
    background-color: #fff;
    padding: $spacer;
    // border-radius: $border-radius;
    border: 1.2px solid $gray-400;
    box-shadow: $app-box-shadow;
    margin-top: 3rem;
    margin-bottom: 2rem;
    .afp-bottomLine-icon::v-deep {
        height: 60px !important;
        width: 90px !important;
        position: absolute;
        top: -20px;
        left: -20px;
        @include media-breakpoint-down(xs) {
            left: -15px;
        }
        > div {
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

    .afp-bottomLine-title {
        display: inline-block;
        border-bottom: 1px solid $gray-400;
        padding-bottom: 0.1rem;
    }

    .afp-bottomLine-text {
        font-size: $font-size-lg;
        margin-top: 0.7rem;
    }
}
</style>