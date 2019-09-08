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
                    No&nbsp;Rating
                    <span>(Info&nbsp;Avail)</span>
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
    margin: 2 * $spacer 0;
    composes: row from "../assets/css/style.css";
    h5 {
        margin-bottom: 1em;
    }
    ul {
        height: 50px;
        width: 100%;
        padding: 0;
    }
}
.li {
    display: block;
    float: left;
    width: 16.3%;
    height: 50px;
    border-top: 10px solid $no-rating;
    font-size: 0.6rem;
    line-height: 1.5rem;
    margin-right: 0px;
    overflow: hidden;
    @include media-breakpoint-up(md) {
        font-size: $font-size-sm;
    }
}
.none {
    margin-right: 2%;
    span {
        display: none;
        @include media-breakpoint-up(xl) {
            display: inline;
        }
    }
}
.low {
    border-color: $low;
}
.mod {
    border-color: $moderate;
}
.cons {
    border-color: $considerable;
}
.high {
    border-color: $high;
}
.ext {
    border-color: $extreme;
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

