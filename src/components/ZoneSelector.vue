<template>
    <div class="afp-zone-selector">
        <button ref="button" @click="show = !show" class="afp-html-button afp-btn">Choose Zone</button>
        <transition name="expand" @enter="enter" @after-enter="afterEnter" @leave="leave">
            <div
                v-closable="{
                    exclude: ['button'],
                    handler: 'onClose'
                }"
                v-if="show"
                class="afp-dropdown-menu"
            >
                <span v-if="date == ''">
                    <router-link
                        v-for="zone in centerZones"
                        :to="{ name: 'ZoneForecast', params: { zone: urlString(zone.name) }}"
                        class="afp-html-a afp-dropdown-item afp-native-link"
                        v-bind:key="zone.id"
                    >{{zone.name}}</router-link>
                </span>
                <span v-else>
                    <router-link
                        v-for="zone in centerZones"
                        :to="{ name: 'ArchivedForecast', params: { zone: urlString(zone.name), date: date }}"
                        class="afp-html-a afp-dropdown-item afp-native-link"
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
            centerZones: this.$centerMeta.zones
        }
    },
    methods: {
        urlString(string) {
            string = string.replace(/ /g, '-')
            string = string.toLowerCase()
            return string
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
        if (this.$route.params.date != undefined) {
            this.date = this.$route.params.date
        } else {
            this.date = ''
        }
    }
}
</script>

<style scoped lang="scss">
@import "../assets/bootstrap4/_functions.scss";
@import "../assets/bootstrap4/_variables.scss";
@import "../assets/bootstrap4/_mixins.scss";

.afp-zone-selector {
    position: relative;
    margin-bottom: 1rem;
    @media print {
        display: none;
    }
    button {
        background-color: #fff;
        border-color: $gray-400;
        color: $gray-700;
        position: relative;
        padding: 0.6rem 0.75rem;
        padding-right: 3rem;
        width: 100%;
        text-align: left;
        &:not(:focus) {
            box-shadow: $app-box-shadow;
        }
        &:hover {
            border-color: $gray-500;
        }
        &:after {
            content: "";
            border-left: 2px solid $gray-500;
            border-bottom: 2px solid $gray-500;
            position: absolute;
            right: 1rem;
            top: 0.9rem;
            width: 0.6rem;
            height: 0.6rem;
            transform: rotate(-45deg);
        }
    }
    .afp-dropdown-menu {
        display: inline-block;
        right: 0;
        //box-shadow: $app-box-shadow;
        @include media-breakpoint-up(md) {
            left: initial;
        }
        .afp-dropdown-item {
            font-weight: bold;
        }
    }
    .expand-enter-active,
    .expand-leave-active {
        transition: height 0.15s ease-in-out;
        overflow: hidden;
    }

    .expand-enter,
    .expand-leave-to {
        height: 0;
    }
}
</style>

