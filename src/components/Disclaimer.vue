<template>
        <div class="afp-disclaimer">
            This information is provided by the U.S.D.A. Forest Service and describes general backcountry avalanche hazard and conditions.
            <br />It does not apply to ski areas and highways where avalanche mitigation is conducted.
        </div>
</template>

<style scoped lang="scss">
@import "../assets/bootstrap4/_functions.scss";
@import "../assets/bootstrap4/_variables.scss";
@import "../assets/bootstrap4/_mixins.scss";

.afp-disclaimer {
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