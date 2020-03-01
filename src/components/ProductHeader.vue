<template>
    <div>
        <div v-if="expired && !preview" :class="$style.productExpired">
            <h2>
                <i class="mdi mdi-clock-alert"></i> This product is expired
            </h2>
        </div>
        <div :class="$style.row">
            <div v-if="published != ''" :class="$style.metaColumn">
                <div :class="$style.metaColumnContent">
                    <h6>Issued</h6>
                    {{ published | publicDate }}
                </div>
            </div>
            <div v-if="expires && showExpires" :class="$style.metaColumn">
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
    props: ['preview', 'published', 'expires', 'showExpires', 'author'],
    computed: {
        expired: function () {
            if (this.expires) {
                return moment(this.expires).isBefore()
            } else {
                return false
            }
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
    composes: col-12 from "../assets/css/style.css";
    composes: col-md from "../assets/css/style.css";
}

.metaColumnContent {
    border-left: 1.5px solid $gray-200;
    padding: 0.5rem 0 0.5rem 2rem;
}

.productExpired {
    position: relative;
    h2 {
        color: #fff !important;
        margin-bottom: 0 !important;
        margin-left: 50px;
    }
    padding: 1.5rem;
    margin-bottom: $spacer;
    @include border-radius($alert-border-radius);
    background-color: $high;
    background-color: $high;
    -webkit-print-color-adjust: exact;
    border: 2px solid $high;
    i {
        color: #fff !important;
        font-size: 3rem;
        line-height: 1;
        position: absolute;
        left: 15px;
        transform: translate(0, -50%);
        top: 50%;
    }
}
</style>