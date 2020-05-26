<template>
    <transition name="fade">
        <div v-if="show" class="afp-alert afp-alert-secondary">
            <i class="mdi mdi-alert"></i>
            <span>There was an error loading the data.</span>
        </div>
    </transition>
</template>

<script>
export default {
    props: ['show']
}
</script>

<style scoped lang="scss">
@import "../assets/bootstrap4/functions";
@import "../assets/bootstrap4/_variables.scss";
@import "../assets/bootstrap4/mixins";

.afp-alert {
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

</style>