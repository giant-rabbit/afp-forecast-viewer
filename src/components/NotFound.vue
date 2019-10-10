<template>
    <div :class="$style.container">
        <div :class="$style.title">
            <h1>404</h1>
            <h2><i class="mdi mdi-alert"></i> The requested page can't be found.</h2>
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
    h1 {
        font-size: 6rem !important;
    }
    h2 {
        color: $gray-700 !important;
        margin-bottom: 0 !important;
    }
}
</style>
