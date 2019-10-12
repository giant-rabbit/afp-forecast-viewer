<template>
    <div :class="$style.dangerScale">
        <div :class="$style.firstColumn">
            <h5>
                Danger Scale
                <!-- <info :content="this.$helpContent.dangerScale" /> -->
            </h5>
        </div>
        <div :class="$style.secondColumn">
            <ul>
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
    width: 20%;
    font-size: 0.6rem;
    line-height: 1.1;
    margin-right: 0px;
    overflow: hidden;
    text-align: center;
    @include media-breakpoint-up(md) {
        font-size: $font-size-sm;
    }
    &:before {
        content: "";
        display: block;
        height: 10px;
        border: 5px solid $no-rating;
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
    }
}
.low:before {
    border-color: $low;
    border-radius: $border-radius 0 0 $border-radius;
}
.mod:before {
    border-color: $moderate;
}
.cons:before {
    border-color: $considerable;
}
.high:before {
    border-color: $high;
}
.ext:before {
    border-color: $extreme;
    border-radius: 0 $border-radius $border-radius 0;
}
.mod span,
.cons span, .ext span {
    @include media-breakpoint-down(xs) {
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

