<template>
    <ul id="tabs" :class="$style.tabs">
        <li v-for="tab in tabs" :key="tab.id" :class="$style.tab">
            <a
                class="afp-native-link"
                href="#"
                :class="[$style.tabLink, {[$style.tabLinkActive] : selected == tab.id }]"
                @click.prevent="$emit('changeTab', tab.id)"
                v-html="tab.name"
            ></a>
        </li>
        <li v-if="custom" v-for="tab in config.tabs" v-bind:key="tab.id" :class="$style.tab">
            <a
                class="afp-native-link"
                href="#"
                :class="[$style.tabLink, {[$style.tabLinkActive] : selected == tab.id }]"
                @click.prevent="$emit('changeTab', tab.id)"
            >{{ tab.name }}</a>
        </li>
    </ul>
</template>

<script>
export default {
    data() {
        return {
            config: this.$config,
        }
    },
    props: ['tabs', 'custom', 'selected'],
}
</script>

<style module lang="scss">
@import "../assets/css/bootstrap/functions";
@import "../assets/css/_variables.scss";
@import "../assets/css/bootstrap/mixins/breakpoints";

.tab {
    margin-bottom: -1px;
    margin-right: 5px;
}

@include media-breakpoint-up(md) {
    .tabs {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -ms-flex-wrap: wrap;
        flex-wrap: wrap;
        padding-left: 0;
        margin-bottom: 0;
        list-style: none;
    }
    .tabLink {
        position: relative;
        z-index: 1;
        color: $gray-500 !important;
        font-weight: 700;
        padding: 0.75rem 1rem;
        display: block;
        border: 1px solid $gray-400;
        border-radius: $border-radius $border-radius 0 0;
        background-color: #fcfcfd !important;
        text-decoration: none !important;
        &:hover,
        &:focus {
            background-color: #fff !important;
            color: $gray-900 !important;
        }
    }
    .tabLinkActive {
        background-color: #fff !important;
        border-bottom: 1px solid #fff;
        color: $gray-900 !important;
    }
}
@include media-breakpoint-down(sm) {
    .tabs {
        margin: 0;
        padding: 0;
        list-style: none;
        display: table;
        table-layout: fixed;
        width: 100%;
        overflow: hidden;
    }
    .tab {
        display: table-cell;
        vertical-align: bottom;
    }
    .tabLink {
        position: relative;
        z-index: 1;
        color: $gray-500 !important;
        font-weight: 700;
        padding: 0.5rem 1rem;
        text-decoration: none !important;
        background-color: transparent !important;
        display: table-caption;
        text-align: center;
        border-bottom: 3px solid transparent;
        &:hover,
        &:focus {
            color: $gray-900 !important;
        }
    }
    .tabLinkActive {
        border-color: $gray-900;
        color: $gray-900 !important;
    }
}
@include media-breakpoint-down(xs) {
    .tabLink {
        font-size: $font-size-sm;
    }
}
</style>