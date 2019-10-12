<template>
    <div :class="$style.selector">
        <button ref="button" @click="show = !show" :class="$style.btn">Choose Zone</button>
        <transition name="expand" @enter="enter" @after-enter="afterEnter" @leave="leave">
            <div
                v-closable="{
                    exclude: ['button'],
                    handler: 'onClose'
                }"
                v-if="show"
                :class="$style.dropdown"
            >
                <span v-if="date == ''">
                    <router-link
                        v-for="zone in centerZones"
                        :to="{ name: 'ZoneForecast', params: { zone: urlString(zone.name) }}"
                        :class="$style.link"
                        class="afp-native-link"
                        v-bind:key="zone.id"
                    >{{zone.name}}</router-link>
                </span>
                <span v-else>
                    <router-link
                        v-for="zone in centerZones"
                        :to="{ name: 'ArchivedForecast', params: { zone: urlString(zone.name), date: date }}"
                        :class="$style.link"
                        class="afp-native-link"
                        v-bind:key="zone.id"
                    >{{zone.name}}</router-link>
                </span>
            </div>
        </transition>
    </div>
</template>

<script>

export default {
    data() {
        return {
            show: false,
            date: '',
            centerZones: []
        }
    },
    methods: {
        urlString(string) {
            string = string.replace(/ /g, '-')
            string = string.toLowerCase()
            return string
        },
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
        if (this.$route.params.date != undefined) {
            this.date = this.$route.params.date
        } else {
            this.date = ''
        }
    }
}
</script>

<style module lang="scss">
@import "../assets/css/bootstrap/functions";
@import "../assets/css/_variables.scss";
@import "../assets/css/bootstrap/mixins";

.selector {
    position: relative;
    margin-bottom: 1rem;
    @media print {
        display: none;
    }
}

.btn {
    composes: btn from "../assets/css/style.css";
    background-color: #fff;
    border-color: $gray-400;
    color: $gray-700;
    position: relative;
    padding: 0.6rem 0.75rem;
    padding-right: 3rem;
    box-shadow: $app-box-shadow;
    width: 100%;
    text-align: left;
    &:hover {
        border-color: $gray-500;
    }
    &:after {
        content: "";
        border-left: 1px solid $gray-500;
        border-bottom: 1px solid $gray-500;
        position: absolute;
        right: 1rem;
        top: 0.9rem;
        width: 0.6rem;
        height: 0.6rem;
        transform: rotate(-45deg);
    }
}

.dropdown {
    position: absolute;
    top: 100%;
    @include media-breakpoint-down(sm) {
        left: 0;
    }
    right: 0;
    z-index: $zindex-dropdown;
    min-width: $dropdown-min-width;
    padding: $dropdown-padding-y 0;
    margin: $dropdown-spacer 0 0;
    color: $dropdown-color;
    text-align: left;
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