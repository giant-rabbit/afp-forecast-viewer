<template>
    <div class="afp-contentPanel afp-pt-3">
        <slot></slot>
    </div>
</template>

<style scoped lang="scss">
@import "../assets/bootstrap4/_functions.scss";
@import "../assets/bootstrap4/_variables.scss";
@import "../assets/bootstrap4/_mixins.scss";

.afp-contentPanel {
    background-color: #fff;
    position: relative;
    padding-right: 15px;
    padding-left: 15px;
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