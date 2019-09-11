<template>
    <ul id="tabs" :class="$style.tabs">
        <li v-for="tab in tabs" :key="tab.id" :class="$style.tab">
            <a
                href="#"
                class="afp-tab"
                :class="[$style.tabLink, {[$style.tabLinkActive] : selected == tab.id }, {'afp-tab-active' : selected == tab.id }]"
                @click.prevent="$emit('changeTab', tab.id)"
            >{{tab.name}}</a>
        </li>
        <li v-if="custom" v-for="tab in config.tabs" v-bind:key="tab.id" :class="$style.tab">
            <a
                href="#"
                class="afp-tab"
                :class="[$style.tabLink, {[$style.tabLinkActive] : selected == tab.id }, {'afp-tab-active' : selected == tab.id }]"
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

.tabs {
    margin: 0;
    padding: 0;
    margin: $spacer 0;
}

.tab {
    display: inline-block;
    margin: .3rem 0.5rem 0 0;
}

.tabLink {
    composes: btn from "../assets/css/style.css";
    //composes: btn-sm from "../assets/css/style.css";
    color: $gray-700 !important;
    &:hover, &:focus {
        background-color: $primary;
        color: #fff !important;
        text-decoration: none !important;
    }

}
.tabLinkActive {
    background-color: $primary;
    color: #fff !important;
}

.nav-tabs .nav-link {
    border: $border-width solid $nav-tabs-border-color;
    margin-right: $spacer * 0.5;
    background-color: $app-gray-light;
    color: $gray-700 !important;
    text-transform: uppercase;
    font-weight: bold;
    &:hover,
    &:focus {
        background-color: $body-bg;
        color: $primary !important;
    }
}
</style>