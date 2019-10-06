<template>
    <v-popover :class="$style.infoContainer" class="afp-popover-trigger">
        <button v-tooltip="'Click to learn more'" :class="$style.info">
            <i class="mdi mdi-information-variant"></i>
        </button>
        <template slot="popover">
            <div v-html="content"></div>
        </template>
    </v-popover>
</template>

<script>

export default {
    components: {
    
    },
    props: ['content']
}
</script>

<style module lang="scss">
@import "../assets/css/bootstrap/functions";
@import "../assets/css/_variables.scss";
@import "../assets/css/bootstrap/mixins/breakpoints";
.infoContainer {
    display: inline-block;
}
.info {
    composes: btn from "../assets/css/style.css";
    cursor: help !important;
    transform: translateY(-6px);
    margin-left: 2px;
    text-transform: lowercase;
    color: #fff !important;
    -webkit-text-fill-color: #fff !important;
    font-size: 12px;
    line-height: 18px;
    padding: 0;
    height: 18px;
    width: 18px;
    background-color: $no-rating-border !important;
    border-radius: 50%;
}
</style>

<style scoped lang="scss">

.afp-popover-trigger >>> .trigger {
    all: unset;
    display: inline !important;
}
</style>