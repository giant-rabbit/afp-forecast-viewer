<template>
    <v-popover class="afp-popover-trigger" @show="uiClick('info pop up')">
        <button v-tooltip="'Click to learn more'" class="afp-html-button afp-btn">
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

<style scoped lang="scss">
@import "../assets/bootstrap4/_functions.scss";
@import "../assets/bootstrap4/_variables.scss";
@import "../assets/bootstrap4/_mixins.scss";

.afp-popover-trigger {
    display: inline-block;
    &::v-deep .trigger {
        all: unset;
        display: inline !important;
    }
    .afp-html-button {
        cursor: help !important;
        transform: translateY(-6px);
        margin-left: 4px;
        text-transform: lowercase;
        color: #fff !important;
        -webkit-text-fill-color: #fff !important;
        font-size: 14px;
        line-height: 18px;
        padding: 0;
        height: 18px;
        width: 18px;
        //background-color: $no-rating-border !important;
        background-color: $gray-600;
        border-radius: 6px;
    }
}
</style>