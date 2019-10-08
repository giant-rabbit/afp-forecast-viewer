<template>
        <div :class="$style.disclaimer">
            This information is provided by the U.S.D.A. Forest Service and describes general backcountry avalanche hazard and conditions.
            <br />It does not apply to ski areas and highways where avalanche mitigation is conducted.
        </div>
</template>

<style module lang="scss">
@import "../assets/css/bootstrap/functions";
@import "../assets/css/_variables.scss";
@import "../assets/css/bootstrap/mixins";

.disclaimer {
    // margin-top: $spacer * 1.5;
    // border-top: 1.5px solid $gray-200;
    padding: 1.5 * $spacer 0;
    font-size: $font-size-sm;
    text-align: center;
    @include media-breakpoint-down(md) {
        br {
            display: none;
        }
    }
}
</style>