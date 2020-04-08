<template>
    <transition name="zoom">
        <div v-if="show" class="afp-videoModal" @click="$emit('close')">
            <div class="afp-videoContainer">
                <iframe
                    :src="'https://www.youtube.com/embed/' + id + '?autoplay=1'"
                    frameborder="0"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                ></iframe>
            </div>
            <i class="mdi mdi-close"></i>
            <div class="afp-videoCaption">
                <div>{{caption}}</div>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    // data() {
    //     return {
    //         show: false,
    //     }
    // },
    props: ['show', 'id', 'caption']
}
</script>

<style scoped lang="scss">
@import "../assets/bootstrap4/_functions.scss";
@import "../assets/bootstrap4/_variables.scss";
@import "../assets/bootstrap4/_mixins.scss";

.afp-videoModal {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.9);
    z-index: 100000;
    cursor: pointer;

    .afp-videoContainer {
        width: 75%;
        @include media-breakpoint-down(xs) {
            width: 90%;
        }
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        &:before {
            display: block;
            content: "";
            width: 100%;
            padding-top: 56.25%;
        }
        iframe {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
        }
    }

    .afp-videoCaption {
        position: absolute;
        bottom: 0;
        right: 0;
        left: 0;
        background-color: rgba(0, 0, 0, 0.3);

        > div {
            width: 75%;
            @include media-breakpoint-down(xs) {
                width: 90%;
            }
            margin: 0 auto;
            padding: 1rem;
            color: #fff;
            font-size: $font-size-sm;
            text-align: center;
        }
    }

    .mdi-close {
        position: absolute;
        right: 1rem;
        top: 1rem;
        line-height: 1;
        font-size: 1.5rem;
        color: #fff;
    }
}

.zoom-enter-active {
    animation: zoom-in 0.2s;
}
// .zoom-leave-active {
//   animation: zoom-in .2s reverse;
// }
@keyframes zoom-in {
    0% {
        transform: scale(0.8);
    }
    100% {
        transform: scale(1);
    }
}
</style>