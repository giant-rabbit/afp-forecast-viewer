<template>
    <div class="afp-dangerScale afp-row">
        <div class="afp-col-lg-auto">
            <a class="afp-html-a" href="#" target="_blank" @click.prevent="dangerScaleLink">
                <h5 class="afp-html-h5" v-tooltip="'Click to learn more'">
                    Danger Scale
                    <i class="mdi mdi-open-in-new"></i>
                </h5>
            </a>
        </div>
        <div class="afp-col-lg">
            <table class="afp-html-table afp-table">
                <thead class="afp-html-thead">
                    <tr class="afp-html-tr">
                        <th class="afp-html-th afp-low"></th>
                        <th class="afp-html-th afp-mod"></th>
                        <th class="afp-html-th afp-cons"></th>
                        <th class="afp-html-th afp-high"></th>
                        <th class="afp-html-th afp-ext"></th>
                    </tr>
                </thead>
                <tbody class="afp-html-tbody">
                    <tr class="afp-html-tr">
                        <td class="afp-html-td">Low (1)</td>
                        <td class="afp-html-td">
                            Mod<span>erate</span> (2)
                        </td>
                        <td class="afp-html-td">
                            Cons<span>iderable</span> (3)
                        </td>
                        <td class="afp-html-td">High (4)</td>
                        <td class="afp-html-td">
                            Extr<span>eme</span> (5)
                        </td>
                    </tr>
                </tbody>
            </table>
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
    .afp-table {
        margin: 0;
        th,
        td {
            border: none;
            width: 20%;
            max-width: 20%;
            min-width: 20%;
            text-align: center;
            font-size: 0.6rem;
            line-height: 1.1;
            padding: 5px 0;
            @include media-breakpoint-up(md) {
                font-size: $font-size-sm;
            }
        }
        thead {
            .afp-low {
                background-color: $low;
                border-radius: 5px 0 0 5px;
            }
            .afp-mod {
                background-color: $moderate;
            }
            .afp-cons {
                background-color: $considerable;
            }
            .afp-high {
                background-color: $high;
            }
            .afp-ext {
                background-color: $extreme;
                border-radius: 0 5px 5px 0;
            }
        }
        span {
            @include media-breakpoint-down(xs) {
                display: none;
            }
        }
    }
}
</style>
