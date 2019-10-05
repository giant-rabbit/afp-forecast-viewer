<template>
    <div :class="$style.dangerScale">
        <div :class="$style.firstColumn">
            <h5>
                Danger Scale
                <info :content="this.$helpContent.dangerScale" />
            </h5>
        </div>
        <div :class="$style.secondColumn">
            <ul>
                <li :class="[$style.none, $style.li]">
                    Conditions&nbsp;<br>Summary
                    <!-- <span>(No Rating)</span> -->
                </li>
                <li :class="[$style.low, $style.li]">Low (1)</li>
                <li :class="[$style.mod, $style.li]">
                    Mod<span>erate</span> (2)
                </li>
                <li :class="[$style.cons, $style.li]">
                    Cons<span>iderable</span> (3)
                </li>
                <li :class="[$style.high, $style.li]">High (4)</li>
                <li :class="[$style.ext, $style.li]">Extr<span>eme</span> (5)</li>
            </ul>
        </div>
    </div>
</template>

<script>

export default {
}

</script>

<style module lang="scss">
@import "../assets/css/bootstrap/functions";
@import "../assets/css/_variables.scss";
@import "../assets/css/bootstrap/mixins/breakpoints";

.dangerScale {
    composes: row from "../assets/css/style.css";
    h5 {
        margin-bottom: 1em;
    }
    ul {
        margin: 0;
        width: 100%;
        padding: 0;
    }
}
.li {
    display: block;
    float: left;
    width: 16.3%;
    font-size: 0.6rem;
    line-height: 1.1;
    margin-right: 0px;
    overflow: hidden;
    @include media-breakpoint-up(md) {
        font-size: $font-size-sm;
    }
    &:before {
        content: "";
        display: block;
        height: 10px;
        background-color: $no-rating;
        margin-bottom: .3rem;
    }
}
.none {
    margin-right: 2%;
    br {
        @include media-breakpoint-up(lg) {
            display: none;
        } 
    }
    span {
        display: none;
        @include media-breakpoint-up(xl) {
            display: inline;
        }
    }
    &:before {
        border-radius: $border-radius;
        border: 2px solid $no-rating-border;
    }
}
.low:before {
    background-color: $low;
    border-radius: $border-radius 0 0 $border-radius;
}
.mod:before {
    background-color: $moderate;
}
.cons:before {
    background-color: $considerable;
}
.high:before {
    background-color: $high;
}
.ext:before {
    background-color: $extreme;
    border-radius: 0 $border-radius $border-radius 0;
}
.mod span,
.cons span, .ext span {
    @include media-breakpoint-down(sm) {
        display: none;
    }
}

.firstColumn {
    composes: col-lg-2 from "../assets/css/style.css";
}
.secondColumn {
    composes: col-lg-10 from "../assets/css/style.css";
}
</style>

