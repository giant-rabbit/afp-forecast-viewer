<template>
    <div class="afp-container afp-text-center afp-not-found">
        <i class="mdi mdi-alert"></i>
        <h1 class="afp-html-h1">The requested product doesn't exist</h1>View the <router-link class="afp-html-a" :to="{ name: 'Forecast'}">Current Forecast</router-link> or view the <router-link class="afp-html-a" :to="{ name: 'Archive'}">Forecast Archive</router-link>.
    </div>
</template>

<script>

export default {
    name: 'NotFound',
}
</script>

<style lang="scss">
@import "../assets/bootstrap4/_functions.scss";
@import "../assets/bootstrap4/_variables.scss";
.afp-not-found {
    &.afp-container {
        min-height: 80vh;
    }
    i {
        font-size: 6rem !important;
        color: $gray-500 !important;
    }
}
</style>
