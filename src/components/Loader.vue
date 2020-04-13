<template>
    <transition name="fade">
        <div v-if="show" class="afp-loader">
            <div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    props: ['show']
}
</script>

<style scoped lang="scss">
@import "../assets/bootstrap4/_functions.scss";
@import "../assets/bootstrap4/_variables.scss";

.afp-loader {
    text-align: center;
    width: 100%;
    padding-top: 50px;
    height: 80vh;

    div {
        display: inline-block;
        position: relative;
        width: 64px;
        height: 64px;

        div {
            display: inline-block;
            position: absolute;
            left: 6px;
            width: 13px;
            background: $gray-500;
            animation: afp-loader 1.2s cubic-bezier(0, 0.5, 0.5, 1) infinite;
        }
        div:nth-child(1) {
            left: 6px;
            animation-delay: -0.24s;
        }
        div:nth-child(2) {
            left: 26px;
            animation-delay: -0.12s;
        }
        div:nth-child(3) {
            left: 45px;
            animation-delay: 0;
        }
    }
}

@keyframes afp-loader {
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