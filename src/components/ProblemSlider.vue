<template>
    <div :class="$style.slider">
        <div :class="$style.rail">
            <div
                :class="$style.step"
                v-for="(label, index) in labels"
                :key="'step' + index"
                :style="'bottom: ' + index / (options.length - 1) * 100 + '%'"
                v-if="label != ''"
            ></div>
            <div
                :class="$style.mark"
                v-for="(mark, index) in markActive"
                :key="'mark' + index"
                :style="'bottom: ' + mark / (options.length - 1) * 100 + '%'"
            ></div>
            <div
                :class="[{[$style.labelActive] : index >= markActive[0] && index <= markActive[1]},  $style.label]"
                v-for="(label, index) in labels"
                :key="'label' + index"
                :style="'bottom: ' + index / (options.length - 1) * 100 + '%'"
            >{{label}}</div>
            <div
                :class="$style.process"
                v-if="typeof this.data != 'string'"
                :style="'bottom: ' + markActive[0] / (options.length - 1) * 100 + '%; top: ' + (100 - (markActive[1] / (options.length - 1) * 100)) + '%'"
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

<style module lang="scss">
@import "../assets/css/bootstrap/functions";
@import "../assets/css/_variables.scss";
@import "../assets/css/bootstrap/mixins/breakpoints";

$border: $gray-700;
$fill: $gray-400;

.slider {
    position: relative;
    margin-left: auto;
    margin-right: auto;
    padding: 0.5rem;
    width: 8rem;
    height: 220px;
    // background-color: #eee;
}

.rail {
    height: 100%;
    border-left: 1px solid $border;
    border-right: 1px solid $border;
    background-color: $border;
    width: 2px;
    position: relative;
    top: 0;
    left: 15px;
}

.step {
    position: absolute;
    border-top: 1px solid $border;
    border-bottom: 1px solid $border;
    background-color: $border;
    width: 30px;
    height: 2px;
    left: -15px !important;
}

.mark {
    position: absolute;
    border-left: 12px solid $fill;
    border-right: 12px solid $fill;
    background-color: $fill;
    width: 24px !important;
    height: 10px !important;
    left: -12px;
    transform: translateY(4px);
}
.process {
    position: absolute;
    border-left: 12px solid $fill;
    border-right: 12px solid $fill;
    background-color: $fill;
    width: 24px !important;
    left: -12px;
    transform: translateY(4px);
}
.label {
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

.labelActive {
    font-weight: bold;
    color: $body-color;
}
</style>