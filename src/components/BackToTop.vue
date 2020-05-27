<template>
    <transition name="fade">
        <button
            v-show="visible"
            @click="backToTop"
            class="afp-to-top afp-html-button afp-btn afp-btn-secondary"
        >
            <i class="mdi mdi-arrow-up"></i>
            <br />Top
        </button>
    </transition>
</template>

<script>

export default {
    data() {
        return {
            visible: false,
            visibleoffset: 500,
            visibleoffsetbottom: 0
        }
    },
    methods: {
        catchScroll() {
            const pastTopOffset = window.pageYOffset > parseInt(this.visibleoffset)
            const pastBottomOffset = window.innerHeight + window.pageYOffset >= document.body.offsetHeight - parseInt(this.visibleoffsetbottom)
            this.visible = parseInt(this.visibleoffsetbottom) > 0 ? pastTopOffset && !pastBottomOffset : pastTopOffset
        },
        backToTop() {
            window.smoothscroll()
        }
    },
    mounted() {
        window.smoothscroll = () => {
            let currentScroll = document.documentElement.scrollTop || document.body.scrollTop
            if (currentScroll > 0) {
                window.requestAnimationFrame(window.smoothscroll)
                window.scrollTo(0, Math.floor(currentScroll - (currentScroll / 5)))
            }
        }
        window.addEventListener('scroll', this.catchScroll)
    },
    destroyed() {
        window.removeEventListener('scroll', this.catchScroll)
    }
}
</script>

<style scoped lang="scss">
@import "../assets/bootstrap4/_functions.scss";
@import "../assets/bootstrap4/_variables.scss";

.afp-to-top {
    position: fixed;
    right: 0;
    bottom: 20px;
    z-index: 1049;
    box-shadow: $app-box-shadow;
    border-radius: $border-radius-lg;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    //text-transform: uppercase;
    font-weight: normal;
    line-height: 1.2;
}
</style>