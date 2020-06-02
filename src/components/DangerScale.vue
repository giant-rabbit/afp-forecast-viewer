<template>
    <div class="afp-dangerScale afp-row">
        <div class="afp-col-lg-auto">
            <a
                class="afp-html-a"
                href="#"
                target="_blank"
                @click.prevent="dangerScaleLink"
            >
                <h5 class="afp-html-h5" v-tooltip="'Click to learn more'">
                    Danger Scale
                    <i class="mdi mdi-open-in-new"></i>
                </h5>
            </a>
        </div>
        <div class="afp-col-lg">
            <ul class="afp-html-ul">
                <li class="afp-html-li afp-low">Low (1)</li>
                <li class="afp-html-li afp-mod">
                    Mod<span>erate</span> (2)
                </li>
                <li class="afp-html-li afp-cons">
                    Cons<span>iderable</span> (3)
                </li>
                <li class="afp-html-li afp-high">High (4)</li>
                <li class="afp-html-li afp-ext">
                    Extr<span>eme</span> (5)
                </li>
            </ul>
        </div>
    </div>
</template>

<script>

export default {
    methods: {
        dangerScaleLink() {
            this.uiClick('danger scale link')
            window.open('https://avalanche.org/avalanche-encyclopedia/danger-scale/')
        }
    }
}

</script>

<style scoped lang="scss">
@import "../assets/bootstrap4/_functions.scss";
@import "../assets/bootstrap4/_variables.scss";
@import "../assets/bootstrap4/_mixins.scss";

.afp-dangerScale {
    @include media-breakpoint-up(md) {
        -webkit-box-pack: center !important;
        -ms-flex-pack: center !important;
        justify-content: center !important;
    }
    .afp-html-h5 {
        margin-bottom: 1em;
    }
    .afp-html-a {
        text-decoration: none !important;
    }

    .afp-html-ul {
        margin: 0;
        width: 100%;
        padding: 0;
    }

    // .popover {
    //     div {
    //         display: block !important;
    //         cursor: help;
    //     }
    // }
    .afp-html-li {
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
            margin-bottom: 0.3rem;
        }
    }
    // .none {
    //     margin-right: 2%;
    //     br {
    //         @include media-breakpoint-up(lg) {
    //             display: none;
    //         }
    //     }
    //     span {
    //         display: none;
    //         @include media-breakpoint-up(xl) {
    //             display: inline;
    //         }
    //     }
    //     &:before {
    //         border-radius: $border-radius;
    //     }
    // }
    .afp-low:before {
        border-color: $low;
        background-color: $low;
        border-radius: $border-radius 0 0 $border-radius;
    }
    .afp-mod:before {
        border-color: $moderate;
        background-color: $moderate;
    }
    .afp-cons:before {
        border-color: $considerable;
        background-color: $considerable;
    }
    .afp-high:before {
        border-color: $high;
        background-color: $high;
    }
    .afp-ext:before {
        border-color: $extreme;
        background-color: $extreme;
        border-radius: 0 $border-radius $border-radius 0;
    }
    .afp-mod span,
    .afp-cons span,
    .afp-ext span {
        @include media-breakpoint-down(xs) {
            display: none;
        }
    }
}
</style>
