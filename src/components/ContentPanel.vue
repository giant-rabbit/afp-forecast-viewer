<template>
    <div :class="$style.contentPanel">
        <slot></slot>
    </div>
</template>

<style module lang="scss">
@import "../assets/css/bootstrap/functions";
@import "../assets/css/_variables.scss";
@import "../assets/css/bootstrap/mixins";

.contentPanel {
    background-color: #fff;
    position: relative;
    // width: 100vw;
    // left: calc(-1 * (100vw - 100% + 15px) / 2);
    // padding-left: calc((100vw - 100% + 15px) / 2);
    // padding-right: calc((100vw - 100% - 15px) / 2);
    margin-right: -15px;
    margin-left: -15px;
    padding-right: 15px;
    padding-left: 15px;
    padding-top: $spacer;
    //padding-bottom: $spacer;
    border: 1px solid $gray-400;
    // border-bottom: 1px solid $gray-400;
    box-shadow: $app-box-shadow;
    @include media-breakpoint-down(xs) {
        border-left: none;
        border-right: none;
        box-shadow: none;
    }
}
</style>