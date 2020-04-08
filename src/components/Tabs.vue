<template>
    <ul id="tabs" class="afp-tabs">
        <li v-for="tab in tabs" :key="tab.id" class="afp-tab">
            <a
                class="afp-native-link afp-tab-link"
                href="#"
                :class="{'afp-active' : selected == tab.id }"
                @click.prevent="$emit('changeTab', tab.id)"
                v-html="tab.name"
            ></a>
        </li>
        <li v-if="custom" v-for="tab in custom" v-bind:key="tab.id" class="afp-tab">
            <a
                class="afp-native-link afp-tab-link"
                href="#"
                :class="{'afp-active' : selected == tab.id }"
                @click.prevent="$emit('changeTab', tab.id)"
            >{{ tab.name }}</a>
        </li>
        <li v-if="blog" key="blog" class="afp-tab">
            <a
                class="afp-native-link afp-tab-link"
                href="#"
                :class="{'afp-active' : selected == 'blog' }"
                @click.prevent="$emit('changeTab', 'blog')"
            >Conditions Blog</a>
        </li>
    </ul>
</template>

<script>
export default {
    props: ['tabs', 'custom', 'selected', 'blog'],
}
</script>

<style scoped lang="scss">
@import "../assets/bootstrap4/_functions.scss";
@import "../assets/bootstrap4/_variables.scss";
@import "../assets/bootstrap4/_mixins.scss";

@media print {
    .afp-tabs {
        display: none !important;
    }
}

.afp-tabs {
    .afp-tab {
        margin-bottom: -1px;
        margin-left: 2px;
        margin-right: 2px;
    }
    @include media-breakpoint-up(md) {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -ms-flex-wrap: wrap;
        flex-wrap: wrap;
        padding-left: 0;
        margin-bottom: 0;
        list-style: none;
        margin-left: 10px;
        margin-right: 10px;
        .afp-tab-link {
            position: relative;
            z-index: 1;
            color: $gray-500 !important;
            font-weight: 700;
            padding: 0.75rem 1rem;
            display: block;
            border: 1px solid $gray-400;
            border-radius: $border-radius $border-radius 0 0;
            background-color: #fcfcfd !important;
            text-decoration: none !important;
            font-size: $font-size-sm;
            &:hover,
            &:focus {
                background-color: #fff !important;
                color: $gray-900 !important;
            }
            &.afp-active {
                background-color: #fff !important;
                border-bottom: 1px solid #fff;
                color: $gray-900 !important;
            }
        }
    }

    @include media-breakpoint-down(sm) {
        list-style: none;
        margin-bottom: 1rem;
        padding: 0;
        .afp-tab-link {
            position: relative;
            z-index: 1;
            color: $gray-500 !important;
            font-weight: 700;
            padding: 0.5rem 1rem;
            display: block;
            border: 1px solid $gray-400;
            //border-radius: $border-radius $border-radius;
            background-color: #fcfcfd !important;
            text-decoration: none !important;
            font-size: $font-size-sm;
            &:hover,
            &:focus {
                background-color: #fff !important;
                color: $gray-900 !important;
            }
            &.afp-active {
                background-color: #fff !important;
                color: $gray-900 !important;
            }
        }
    }
}
</style>