<template>
    <div>
        <div v-if="expired && !preview" :class="$style.productExpired">
            <i class="mdi mdi-clock-alert"></i>
            <h2>This product is expired</h2>
        </div>
        <div :class="$style.row">
            <div v-if="published != ''" :class="$style.metaColumn">
                <div :class="$style.metaColumnContent">
                    <h6>Issued</h6>
                    {{ published | publicDate }}
                </div>
            </div>
            <div v-if="expires != ''" :class="$style.metaColumn">
                <div :class="$style.metaColumnContent">
                    <h6>Expires</h6>
                    {{ expires | publicDate }}
                </div>
            </div>
            <div v-if="author != ''" :class="$style.metaColumn">
                <div :class="$style.metaColumnContent">
                    <h6>Author</h6>
                    {{ author }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import moment from 'moment/src/moment.js'

export default {
    props: ['preview', 'published', 'expires', 'author'],
    computed: {
        expired: function () {
            return moment(this.expires).isBefore()
        },
    },
}
</script>

<style module lang="scss">
@import "../assets/css/bootstrap/functions";
@import "../assets/css/_variables.scss";
@import "../assets/css/bootstrap/mixins";

.row {
    composes: row from "../assets/css/style.css";
    margin-bottom: $spacer;
}

.metaColumn {
    composes: col-md-4 from "../assets/css/style.css";
    composes: col-12 from "../assets/css/style.css";
}

.metaColumnContent {
    border-left: 1.5px solid $gray-200;
    padding: 0.5rem 0 0.5rem 2rem;
}

.productExpired {
    position: relative;
    h2 {
        color: #fff !important;
        margin: 0 !important;
        display: inline;
        vertical-align: middle;
        padding-left: 1rem;
    }
    padding: 1rem 1rem;
    margin-bottom: $spacer;
    @include border-radius($alert-border-radius);
    background-color: $high;
    i {
        color: #fff !important;
        font-size: 3rem;
        line-height: 1;
        vertical-align: middle
    }
}
</style>