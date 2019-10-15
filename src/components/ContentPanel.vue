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
    padding-right: 15px;
    padding-left: 15px;
    padding-top: $spacer;
    border: 1px solid $gray-400;
    box-shadow: $app-box-shadow;
    @include media-breakpoint-down(xs) {
        margin-right: -15px;
        margin-left: -15px;
        border-left: none;
        border-right: none;
        box-shadow: none;
    }
}
</style>