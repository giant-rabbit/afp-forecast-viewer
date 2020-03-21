<template>
    <div class="afp-slider">
        <div class="afp-rail">
            <div
                class="afp-step"
                v-for="(label, index) in labels"
                :key="'step' + index"
                :style="'bottom: ' + index / (options.length - 1) * 100 + '%'"
                v-if="label != ''"
            ></div>
            <div
                :class="{'afp-active' : index >= markActive[0] && index <= markActive[1]}"
                class="afp-label"
                v-for="(label, index) in labels"
                :key="'label' + index"
                :style="'bottom: ' + index / (options.length - 1) * 100 + '%'"
            >{{label}}</div>
            <div
                class="afp-process"
                :style="'bottom: calc(' + markActive[0] / (options.length - 1) * 100 + '% - 4px); top: calc(' + (100 - (markActive[1] / (options.length - 1) * 100)) + '% - 4px)'"
            ></div>
        </div>
    </div>
</template>

<script>

export default {
    data() {
        return {
            borderColor: '#C8CACE',
            fillColor: '#515558'
        }
    },
    props: ['options', 'labels', 'data'],
    computed: {
        markActive: function () {
            if (typeof this.data == 'string') {
                return [this.options.findIndex(x => x == this.data), this.options.findIndex(x => x == this.data)]
            } else {
                return [this.options.findIndex(x => x == this.data[0]), this.options.findIndex(x => x == this.data[1])]
            }
        }
    }
}

</script>

<style scoped lang="scss">
@import "../assets/bootstrap4/_functions.scss";
@import "../assets/bootstrap4/_variables.scss";
@import "../assets/bootstrap4/_mixins.scss";

$border: $gray-700;
$fill: $gray-400;

.afp-slider {
    position: relative;
    margin-left: auto;
    margin-right: auto;
    padding: 0.5rem;
    width: 8rem;
    height: 200px;
    margin-bottom: 40px;
    @include media-breakpoint-down(xs) {
        height: 175px;
    }

    .afp-rail {
        height: 100%;
        border-left: 1px solid $border;
        border-right: 1px solid $border;
        background-color: $border;
        -webkit-print-color-adjust: exact;
        width: 1px;
        position: relative;
        top: 0;
        left: 15px;
    }

    .afp-step {
        position: absolute;
        border-top: 1px solid $border;
        border-bottom: 1px solid $border;
        background-color: $border;
        -webkit-print-color-adjust: exact;
        width: 24px;
        height: 2px;
        left: -12px !important;
    }

    .afp-process {
        position: absolute;
        border: 2px solid $border;
        background-color: $fill;
        -webkit-print-color-adjust: exact;
        width: 24px !important;
        left: -12px;
        transform: translateY(-1px);
    }
    .afp-label {
        position: absolute;
        font-size: 14px;
        line-height: 1;
        text-transform: capitalize;
        text-align: left;
        color: $gray-500;
        width: 8rem;
        left: 30px;
        transform: translateY(6px);
    }

    .afp-Active {
        font-weight: bold;
        color: $body-color;
    }
}
</style>