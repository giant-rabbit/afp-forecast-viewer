<template>
    <div :class="$style.selector">
        <button
            ref="button"
            @click="show = !show"
            :class="$style.btn"
            class="afp-btn-primary"
            v-tooltip="'Switch zone'"
        >{{zone}}</button>
        <transition name="expand" @enter="enter" @after-enter="afterEnter" @leave="leave">
            <div
                v-closable="{
                    exclude: ['button'],
                    handler: 'onClose'
                }"
                v-if="show"
                :class="$style.dropdown"
            >
                <a
                    href="#"
                    :class="$style.link"
                    class="afp-dropdown-item"
                    @click.prevent
                    v-for="zone in centerZones"
                    v-bind:key="zone.id"
                >{{zone.name}}</a>
            </div>
        </transition>
    </div>
</template>

<script>

export default {
    data() {
        return {
            show: false,
            centerZones: []
        }
    },
    props: ['zone'],
    methods: {
        getZones() {
            this.$api
                .get('/forecast-zones?avalanche_center_id=' + this.$centerId + '&fields=id,name,zone_id')
                .then(response => {
                    this.centerZones = response.data
                })
                .catch(e => {
                    this.showAlert('error', '')
                })
        },
        onClose() {
            this.show = false
        },
        // Transitions for menu
        enter(element) {
            const width = getComputedStyle(element).width;

            element.style.width = width;
            element.style.position = 'absolute';
            element.style.visibility = 'hidden';
            element.style.height = 'auto';

            const height = getComputedStyle(element).height;

            element.style.width = null;
            element.style.position = null;
            element.style.visibility = null;
            element.style.height = 0;

            getComputedStyle(element).height;
            setTimeout(() => {
                element.style.height = height;
            });
        },
        afterEnter(element) {
            element.style.height = 'auto';
        },
        leave(element) {
            const height = getComputedStyle(element).height;

            element.style.height = height;

            getComputedStyle(element).height;

            setTimeout(() => {
                element.style.height = 0;
            });
        },

    },
    mounted() {
        this.getZones()
    }
}
</script>

<style module lang="scss">
@import "../assets/css/bootstrap/functions";
@import "../assets/css/_variables.scss";
@import "../assets/css/bootstrap/mixins";

.selector {
    margin-bottom: $spacer;
    position: relative;
}

.btn {
    composes: btn from "../assets/css/style.css";
    composes: btn-primary from "../assets/css/style.css";
    composes: btn-lg from "../assets/css/style.css";
    position: relative;
    padding-right: 4rem;
    &:after {
        content: "\F140";
        color: #fff;
        font: normal normal normal 24px/1 "Material Design Icons";
        font-size: 1.75rem;
        line-height: 3rem;
        position: absolute;
        right: 0;
        top: 0;
        bottom: 0;
        width: 3rem;
        border-left: $border-width solid #fff;
    }
}

.dropdown {
    position: absolute;
    top: 100%;
    left: 0;
    z-index: $zindex-dropdown;
    float: left;
    min-width: $dropdown-min-width;
    padding: $dropdown-padding-y 0;
    margin: $dropdown-spacer 0 0; // override default ul
    @include font-size($dropdown-font-size);
    color: $dropdown-color;
    text-align: left; // Ensures proper alignment if parent has it changed (e.g., modal footer)
    list-style: none;
    background-color: $dropdown-bg;
    background-clip: padding-box;
    border: $dropdown-border-width solid $dropdown-border-color;
    @include border-radius($dropdown-border-radius);
    @include box-shadow($dropdown-box-shadow);
    display: inline-block;
}

.link {
    display: block;
    padding: $dropdown-item-padding-y $dropdown-item-padding-x;
    text-decoration: none;
    clear: both;
    font-weight: bold;
    color: $dropdown-link-color !important;
    white-space: nowrap; // prevent links from randomly breaking onto new lines
    @include hover-focus {
        color: $dropdown-link-hover-color;
        text-decoration: none !important;
        @include gradient-bg($dropdown-link-hover-bg);
    }
    &.active,
    &:active {
        color: $dropdown-link-active-color;
        text-decoration: none;
        @include gradient-bg($dropdown-link-active-bg);
    }
}
</style>

<style scoped lang="scss">
.expand-enter-active,
.expand-leave-active {
    transition: height 0.15s ease-in-out;
    overflow: hidden;
}

.expand-enter,
.expand-leave-to {
    height: 0;
}
</style>