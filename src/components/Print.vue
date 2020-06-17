<template>
    <div class="afp-print-modal">
        <!-- <button
            ref="button"
            @click="modal = true"
            class="afp-html-button afp-btn afp-btn-link afp-d-none afp-d-md-inline-block"
        >
            <i class="mdi mdi-printer"></i> Print
        </button>-->
        <button
            ref="button"
            @click="modal = true"
            class="afp-html-button afp-btn afp-btn-light afp-btn-sm afp-d-none afp-d-md-inline-block"
        >
            <i class="mdi mdi-printer"></i> Print
        </button>

        <transition name="fade">
            <div v-if="modal" @click="modal = false" class="afp-modal-backdrop"></div>
        </transition>
        <transition name="fade">
            <div v-if="modal" @click="modal = false" class="afp-modal">
                <div class="afp-modal-dialog afp-modal-dialog-centered" role="document">
                    <div class="afp-modal-content" @click.stop>
                        <div class="afp-modal-header">
                            <h3
                                class="afp-html-h4 afp-mb-0 afp-modal-title"
                            >Select forecast sections to print:</h3>
                            <button
                                type="button"
                                class="afp-html-button afp-close"
                                @click="modal = false"
                            >
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="afp-modal-body afp-pt-0 afp-pb-0">
                            <!-- <p class="afp-html-p afp-font-italic">Select the forecast sections you'd like to print:</p> -->
                            <div>
                                <input
                                    class="afp-checkbox afp-html-input"
                                    id="bottomLine"
                                    type="checkbox"
                                    v-model="bottomLine"
                                />
                                <label class="afp-html-label" for="bottomLine">Bottom Line & Danger (Recommended)</label>
                            </div>
                            <div v-if="data.product_type == 'forecast'">
                                <input
                                    class="afp-checkbox afp-html-input"
                                    id="problems"
                                    type="checkbox"
                                    v-model="problems"
                                />
                                <label class="afp-html-label" for="problems">Avalanche Problems</label>
                            </div>
                            <div>
                                <input
                                    class="afp-checkbox afp-html-input"
                                    id="discussion"
                                    type="checkbox"
                                    v-model="discussion"
                                />
                                <label class="afp-html-label" for="discussion">Forecast Discussion</label>
                            </div>
                            <div>
                                <input
                                    class="afp-checkbox afp-html-input"
                                    id="weather"
                                    type="checkbox"
                                    v-model="weather"
                                />
                                <label class="afp-html-label" for="weather">Weather Forecast</label>
                            </div>
                        </div>
                        <div class="afp-modal-footer">
                            <button
                                type="button"
                                @click="modal = false"
                                class="afp-html-button afp-btn afp-btn-secondary"
                            >Cancel</button>
                            <button
                                type="button"
                                @click="printProduct"
                                class="afp-html-button afp-btn afp-btn-primary"
                            >
                                <i v-if="button !='Print'" class="mdi mdi-loading mdi-spin"></i>
                                {{button}}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
        <!-- Hidden container for PDF -->
        <div id="afp-pdf-container">
            <div id="afp-pdf">
                <!-- Title, etc -->
                <div class="afp-pdfHeader afp-mb-2">
                    <qrcode-vue class="afp-qrcode" :value="url" size="100" level="H"></qrcode-vue>
                    <h6 class="afp-mb-1 afp-html-h6">{{centerMeta.name}} - {{centerMeta.url}}</h6>
                    <h2
                        class="afp-html-h2 afp-mb-1"
                        v-if="data.product_type == 'forecast'"
                    >Backcountry Avalanche Forecast</h2>
                    <h2 class="afp-html-h2 afp-mb-1" v-else>General Avalanche Information</h2>
                    <h3 class="afp-html-h3 afp-text-muted">{{zone}}</h3>
                    <!-- <span>{{url}}</span> -->
                </div>

                <!-- Header -->
                <product-header :published="data.published_time" :author="data.author" />

                <!-- Warning -->
                <avy-warning
                    v-if="data.warning_product && bottomLine"
                    :data="data.warning_product"
                />

                <!-- Bottom line -->
                <div v-if="data.bottom_line != '' && bottomLine" class="afp-bottomLine">
                    <h4 class="afp-html-h4 afp-printHeader">The Bottom Line</h4>
                    <div class="afp-bottomLine-text afp-tinymce" v-html="data.bottom_line"></div>
                </div>

                <!-- Danger -->
                <avalanche-danger
                    v-if="data.product_type == 'forecast' && bottomLine"
                    :danger="data.danger"
                    class="afp-pageBreak"
                />

                <!-- problems -->
                <avalanche-problem
                    v-if="problems"
                    v-for="problem in data.forecast_avalanche_problems"
                    v-bind:key="'printProblem'+problem.rank"
                    :problem="problem"
                    class="afp-pageBreak"
                />

                <!-- Discussion -->
                <div v-if="data.hazard_discussion != '' && discussion">
                    <h4 class="afp-html-h4 afp-printHeader">Forecast Discussion</h4>
                    <div class="afp-tinymce afp-mb-3 afp-pageBreak" v-html="data.hazard_discussion"></div>
                </div>

                <!-- Weather -->
                <div
                    v-if="data.hasOwnProperty('weather_product') && data.weather_product.weather_discussion != '' && weather"
                >
                    <h4 class="afp-html-h4 afp-printHeader">Weather Forecast</h4>
                    <div
                        class="afp-tinymce afp-mb-3"
                        v-html="data.weather_product.weather_discussion"
                    ></div>
                    <weather-table
                        v-if="data.product_type == 'forecast'"
                        :periods="data.weather_table.periods"
                        :data="data.weather_table.data"
                        :zone="data.weather_table.zone_name"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ProductHeader from '../components/ProductHeader'
import AvyWarning from '../components/AvyWarning'
import AvalancheDanger from '../components/AvalancheDanger'
import AvalancheProblem from '../components/AvalancheProblem'
import WeatherTable from '../components/WeatherTable'
import html2pdf from 'html2pdf.js'
import QrcodeVue from 'qrcode.vue'

export default {
    data() {
        return {
            button: 'Print',
            modal: false,
            bottomLine: true,
            discussion: false,
            problems: false,
            weather: false
        }
    },
    props: ['data', 'zone', 'danger', 'centerMeta'],
    computed: {
        url: function () {
            return window.location.href
        }
    },
    components: {
        ProductHeader,
        AvyWarning,
        AvalancheDanger,
        AvalancheProblem,
        WeatherTable,
        QrcodeVue
    },
    methods: {
        printProduct() {
            this.button = 'Generating PDF'
            var element = document.getElementById('afp-pdf')
            var opt = {
                margin: .4,
                filename: 'forecast.pdf',
                image: { type: 'jpeg', quality: 1 },
                jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
                html2canvas: { useCORS: true, scale: 2, scrollX: 0, scrollY: 0 },
                pagebreak: { after: ['.afp-pageBreak'], avoid: ['img', 'svg'] }
            }

            // Change to .save() for production
            html2pdf().set(opt).from(element).save().then(pdf => {
            // html2pdf().set(opt).from(element).toPdf().get('pdf').then(pdf => {
            //     window.open(pdf.output('bloburl'), '_blank')
                this.button = 'Print'
                this.modal = false
            })
        }
    },
    mounted() {
    }
}
</script>

<style scoped lang="scss">
@import "../assets/bootstrap4/_functions.scss";
@import "../assets/bootstrap4/_variables.scss";
@import "../assets/bootstrap4/_mixins.scss";

.afp-print-modal {
    .afp-btn-light {
        font-size: $font-size-base;
        float: right;
    }

    .afp-modal {
        display: block;
        .afp-close {
            outline: none;
        }
        .mdi-spin:before {
            animation: mdi-spin 800ms infinite linear;
            margin-right: 0.3rem;
        }
        .afp-html-label {
            font-weight: normal;
            font-size: $font-size-base;
            margin-bottom: 0;
        }
    }
    .afp-modal-backdrop {
        background-color: rgba($modal-backdrop-bg, 70%);
    }

    #afp-pdf-container {
        display: none;
    }
}

#afp-pdf {
    background-color: #fff;
    padding: 0 1rem;
    .afp-pdfHeader {
        position: relative;
        .afp-qrcode {
            position: absolute;
            top: 0;
            right: 0;
        }
    }
    .afp-printHeader {
        display: inline-block;
        border-bottom: 1px solid $gray-400;
        padding-bottom: 0.1rem;
    }

    .afp-bottomLine-text {
        font-size: $font-size-lg;
    }
    &::v-deep {
        .afp-header {
            margin-bottom: 0.5 * $spacer !important;
        }
        .afp-warning {
            margin-bottom: 0.5 * $spacer !important;
            i:before {
                font-family: $font-family-sans-serif;
                font-style: normal;
                font-weight: 700;
                padding-left: 0.5 * $spacer;
                content: "!";
            }
        }
        .afp-danger {
            margin-bottom: 0 !important;
            .afp-danger-today {
                -webkit-box-flex: 0;
                -ms-flex: 0 0 100%;
                flex: 0 0 100%;
                max-width: 100%;
                margin-bottom: 0.5 * $spacer !important;
                .afp-html-h2 {
                    display: inline-block;
                    border-bottom: 1px solid $gray-400;
                    padding-bottom: 0.1rem;
                    font-size: $font-size-base;
                    margin-bottom: 0 !important;
                }
            }
        }
        .afp-problem {
            padding-top: 0;
            border: none;
            margin-bottom: 0.5 * $spacer !important;
            .afp-html-h2 {
                font-size: $h4-font-size;
            }
            figure,
            .afp-elevationLabel,
            .afp-elevationMarker {
                display: none;
            }
            .afp-infoGraphics {
                margin-top: 0.5 * $spacer;
            }
            .afp-problem-column .afp-html-h5:first-of-type {
                margin-top: 0.5rem !important;
            }
            .afp-problemIcon {
                height: 140px !important;
                width: 140px !important;
                margin: 0;
            }
            .afp-roseContainer {
                margin: 0;
                margin-bottom: 2rem;
            }
            .afp-problemSlider {
                height: 180px;
                margin-bottom: 0;
            }
        }
        .afp-weather-table {
            margin: 0 !important;
            .afp-table th,
            .afp-table td {
                font-size: $font-size-sm !important;
                padding-top: 0.3rem;
                padding-bottom: 0.3rem;
                &:first-of-type {
                    width: 200px;
                    max-width: 200px;
                    min-width: 200px;
                }
            }
            .afp-table th:first-of-type {
                background-color: #fff;
                color: #fff;
                font-size: 0.1px !important;
            }
        }

        .afp-outlook,
        .afp-popover-trigger,
        // .afp-dangerScale,
        .afp-outlookMobile,
        .afp-dangerScale .afp-col-lg-auto {
            display: none;
        }
    }
}
</style>