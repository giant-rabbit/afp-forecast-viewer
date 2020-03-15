<template>
    <div :class="$style.container">
        <div :class="$style.title">
            <i class="mdi mdi-alert"></i>
            <h1 class="afp-html-h1">The requested product doesn't exist</h1>View the <router-link :to="{ name: 'Forecast'}">Current Forecast</router-link> or view the <router-link :to="{ name: 'Archive'}">Forecast Archive</router-link>.
        </div>
    </div>
</template>

<script>

export default {
    name: 'NotFound',
}
</script>

<style module lang="scss">
@import "../assets/css/bootstrap/functions";
@import "../assets/css/_variables.scss";
@import "../assets/css/bootstrap/mixins";
.container {
    min-height: 80vh;
}

.title {
    text-align: center;
    i {
        font-size: 6rem !important;
        color: $gray-500 !important;
    }
}
</style>
