<template>
    <transition name="fade">
        <div v-if="show" :class="$style.loaderContainer">
            <!-- <i class="mdi mdi-alert"></i> -->
            <div :class="$style.loader">
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    data() {
        return {
            show: false,
        }
    },
    mounted() {
        this.$eventBus.$on('loaded', data => {
            this.show = false
        })
        this.$eventBus.$on('loading', data => {
            this.show = true
        })
    }
}
</script>

<style module lang="scss">
@import "../assets/css/bootstrap/functions";
@import "../assets/css/_variables.scss";
@import "../assets/css/bootstrap/mixins";

.loaderContainer {
    text-align: center;
    position: absolute;
    width: 100%;
    top: 50px;
    left: 0;
}

.loader {
    display: inline-block;
    position: relative;
    width: 64px;
    height: 64px;
}
.loader div {
    display: inline-block;
    position: absolute;
    left: 6px;
    width: 13px;
    background: $gray-500;
    animation: loader 1.2s cubic-bezier(0, 0.5, 0.5, 1) infinite;
}
.loader div:nth-child(1) {
    left: 6px;
    animation-delay: -0.24s;
}
.loader div:nth-child(2) {
    left: 26px;
    animation-delay: -0.12s;
}
.loader div:nth-child(3) {
    left: 45px;
    animation-delay: 0;
}
@keyframes loader {
    0% {
        top: 6px;
        height: 51px;
    }
    50%,
    100% {
        top: 19px;
        height: 26px;
    }
}
</style>