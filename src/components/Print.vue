<template>
    <div>
        <button
            ref="button"
            @click="print"
            class="afp-html-button afp-btn afp-btn-primary afp-btn-sm"
        >{{button}}</button>
        <hr />
        <div v-show="show" id="afp-pdf">
            <!-- PDF Header -->
            <div class="afp-pdfHeader afp-mb-2">
                <qrcode-vue class="afp-qrcode" :value="url" size="100" level="H"></qrcode-vue>
                <h3 class="afp-mb-1 afp-html-h6">{{centerMeta.name}} - {{centerMeta.url}}</h3>
                <h2
                    class="afp-html-h2 afp-mb-1"
                    v-if="data.product_type == 'forecast'"
                >Backcountry Avalanche Forecast</h2>
                <h2 class="afp-html-h2 afp-mb-1" v-else>General Avalanche Information</h2>
                <h3 class="afp-html-h3 afp-text-muted">{{zone}}</h3>
                <!-- <span>{{url}}</span> -->
            </div>
            <!-- Title -->
            <div class="afp-forecast-title"></div>
            <!-- Warning -->
            <avy-warning v-if="data.warning_product" :data="data.warning_product" />

            <!-- Header -->
            <!-- <product-header
                :published="data.published_time"
                :expires="data.expires_time"
                :author="data.author"
            />-->
            <product-header :published="data.published_time" :author="data.author" />

            <!-- Bottom line -->
            <div v-if="data.bottom_line != ''" class="afp-bottomLine">
                <h4 class="afp-html-h4 afp-printHeader">THE BOTTOM LINE</h4>
                <div class="afp-bottomLine-text afp-tinymce" v-html="data.bottom_line"></div>
            </div>

            <!-- Danger -->
            <avalanche-danger v-if="data.product_type == 'forecast'" :danger="data.danger" />

            <!-- Weather -->

        </div>
        <hr />
    </div>
</template>

<script>
import ProductHeader from '../components/ProductHeader'
import AvyWarning from '../components/AvyWarning'
import AvalancheDanger from '../components/AvalancheDanger'
import WeatherTable from '../components/WeatherTable'
// import html2canvas from 'html2canvas'
import html2pdf from 'html2pdf.js'
import QrcodeVue from 'qrcode.vue'

export default {
    data() {
        return {
            button: 'Print',
            show: true,
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
        WeatherTable,
        QrcodeVue
    },
    methods: {
        print() {
            this.button = 'Generating PDF...'
            this.show = true
            var element = document.getElementById('afp-pdf')
            var opt = {
                margin: .4,
                filename: 'forecast.pdf',
                image: { type: 'jpeg', quality: 1 },
                html2canvas: { scale: 4 },
                jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
                html2canvas: { useCORS: true }
            }
            html2pdf().set(opt).from(element).toPdf().get('pdf').save().then(pdf => {
                // window.open(pdf.output('bloburl'), '_blank')
                this.button = 'Print'
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