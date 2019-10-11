<template>
    <div :class="$style.dangerMobile">
        <div class="treelines">
            <div :class="$style.dangerNumbers">
                <span :class="{[$style.extremeText]:(danger.upper == 5)}">{{danger.upper}}</span>
                <span :class="{[$style.extremeText]:(danger.middle == 5)}">{{danger.middle}}</span>
                <span :class="{[$style.extremeText]:(danger.lower == 5)}">{{danger.lower}}</span>
            </div>
            <span :class="$style.upper" :data-id="danger.upper"></span>
            <span :class="$style.middle" :data-id="danger.middle"></span>
            <span :class="$style.lower" :data-id="danger.lower"></span>
        </div>
        <div :class="$style.triangleInner"></div>
        <div :class="$style.triangle"></div>
    </div>
</template>

<script>

export default {
    data() {
        return {
        }
    },
    props: ['danger'],
}

</script>

<style module lang="scss">
@import "../assets/css/bootstrap/functions";
@import "../assets/css/_variables.scss";
@import "../assets/css/bootstrap/mixins/breakpoints";

.dangerMobile {
    position: relative;
    display: inline-block;
    height: 140px;
    width: 160px;
}

.dangerNumbers {
    position: absolute;
    width: 40px;
    left: calc(50% - 20px);
    z-index: 4;
    font-weight: bold;
    text-align: center;
    span {
        &:first-of-type {
            margin-top: 14px;
        }
        display: block;
        line-height: 40px;
    }
}
.extremeText {
    color: #fff;
}

.upper {
    position: absolute;
    z-index: 3;
    bottom: 89px;
    left: 56px;
    border-right: 24px solid transparent;
    border-left: 24px solid transparent;
    border-bottom: 43px solid #ccc;
    background-color: transparent !important;
    -webkit-print-color-adjust: exact !important;
}

.middle {
    position: absolute;
    z-index: 3;
    bottom: 47px;
    left: 42px;
    width: 50px;
    height: 39px;
    display: inline-block;
    transform: skewX(-30deg);
    border-bottom-color: #ccc;
    background-color: #ccc;
    -webkit-print-color-adjust: exact !important;
    &:after {
        content: "";
        position: absolute;
        top: 0;
        bottom: 47px;
        right: -26px;
        width: 50px;
        height: 39px;
        display: inline-block;
        transform: skewX(49deg);
        background-color: #ccc;
        -webkit-print-color-adjust: exact !important;
    }
}

.lower {
    position: absolute;
    z-index: 3;
    bottom: 8px;
    left: 19px;
    width: 90px;
    height: 36px;
    display: inline-block;
    transform: skewX(-30deg);
    border-bottom-color: #ccc;
    background-color: #ccc;
    -webkit-print-color-adjust: exact !important;
    &:after {
        content: "";
        position: absolute;
        top: 0;
        bottom: 8px;
        right: -32px;
        width: 90px;
        height: 36px;
        display: inline-block;
        transform: skewX(49deg);
        background-color: #ccc;
        -webkit-print-color-adjust: exact !important;
    }
}

.triangleInner {
    position: absolute;
    z-index: 2;
    right: 42px;
    top: 31px;
    background-color: #fff;
    -webkit-print-color-adjust: exact !important;
    text-align: left;
    transform: rotate(-60deg) skewX(-30deg) scale(1, 0.866);
    width: 76px;
    height: 76px;
    border-top-right-radius: 5%;
    &:before,
    &:after {
        content: "";
        position: absolute;
        background-color: inherit;
        width: 76px;
        height: 76px;
        border-top-right-radius: 5%;
    }
    &:before {
        transform: rotate(-135deg) skewX(-45deg) scale(1.414, 0.707)
            translate(0, -50%);
    }
    &:after {
        transform: rotate(135deg) skewY(-45deg) scale(0.707, 1.414)
            translate(50%);
    }
}

.triangle {
    position: absolute;
    right: 40px;
    top: 28px;
    background-color: $gray-400;
    -webkit-print-color-adjust: exact !important;
    text-align: left;
    transform: rotate(-60deg) skewX(-30deg) scale(1, 0.866);
    width: 80px;
    height: 80px;
    border-top-right-radius: 10%;
    &:before,
    &:after {
        content: "";
        position: absolute;
        background-color: inherit;
        -webkit-print-color-adjust: exact !important;
        width: 80px;
        height: 80px;
        border-top-right-radius: 10%;
    }
    &:before {
        transform: rotate(-135deg) skewX(-45deg) scale(1.414, 0.707)
            translate(0, -50%);
    }
    &:after {
        transform: rotate(135deg) skewY(-45deg) scale(0.707, 1.414)
            translate(50%);
    }
}

.upper,.middle, .lower {
    &[data-id="0"], &[data-id="0"]:after  {
        border-bottom-color: $no-rating;
        background-color: $no-rating;
    }
    &[data-id=""], &[data-id=""]:after {
        border-bottom-color: $no-rating;
        background-color: $no-rating;
    }
    &[data-id="null"], &[data-id="null"]:after {
        border-bottom-color: $no-rating;
        background-color: $no-rating;
    }
    &[data-id="1"], &[data-id="1"]:after {
        border-bottom-color: $low;
        background-color: $low;
    }
    &[data-id="2"], &[data-id="2"]:after {
        border-bottom-color: $moderate;
        background-color: $moderate;
    }
    &[data-id="3"], &[data-id="3"]:after {
        border-bottom-color: $considerable;
        background-color: $considerable;
    }
    &[data-id="4"], &[data-id="4"]:after {
        border-bottom-color: $high;
        background-color: $high;
    }
    &[data-id="5"], &[data-id="5"]:after {
        border-bottom-color: $extreme;
        background-color: $extreme;
    }
}

</style>

