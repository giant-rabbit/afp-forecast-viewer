<template>
    <transition name="fade">
        <div v-if="show" :class="$style.alert">
            <i class="mdi mdi-alert"></i>
            <span>There was an error loading the data.</span>
            <button
                @click="show = false"
                type="button"
                class="close"
                data-dismiss="alert"
                aria-label="Close"
                :class="$style.close"
            >
                <i class="mdi mdi-close"></i>
            </button>
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
        this.$eventBus.$on('showAlert', data => {
            this.show = true
        })
    }
}
</script>

<style module lang="scss">
@import "../assets/css/bootstrap/functions";
@import "../assets/css/_variables.scss";
@import "../assets/css/bootstrap/mixins";

.alert {
    padding: $alert-padding-y $alert-padding-x;
    position: relative;
    margin-bottom: $spacer;
    @include border-radius($alert-border-radius);
    background-color: $high;
    color: #fff !important;
    span {
        vertical-align: middle;
    }
    i {
        vertical-align: middle;
        font-size: 1.5rem;
        line-height: 1;
        padding-right: $spacer * 0.5;
    }
}
.close {
    position: absolute;
    top: 0;
    right: 0;
    padding: .75rem;
    color: inherit;
    background-color: transparent;
    border: 0;
    -webkit-appearance: none;
}
</style>