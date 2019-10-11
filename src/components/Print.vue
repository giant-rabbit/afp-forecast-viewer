<template>
    <div data-html2canvas-ignore>
        <button ref="button" @click="render" :class="$style.btn">{{button}}</button>
        <div id="afp-pdf"></div>
    </div>
</template>

<script>
import html2canvas from 'html2canvas'
import * as JsPDF from 'jspdf'

export default {
    data() {
        return {
            button: 'Print'
        }
    },
    methods: {
        print() {
            this.button = 'Generating PDF...'
            var element = document.querySelector('#afp')
            html2canvas(element, {
                imageTimeout: 1000,
                scale: 1,
                windowWidth: 1200,
                width: 1200,
                // windowWidth: element.scrollWidth,
                // windowHeight: element.scrollHeight,
                // allowTaint: true,
                // foreignObjectRendering: true
            }).then(canvas => {
                canvas.getContext('2d');
                var imgData = canvas.toDataURL("image/jpeg", 1.0)
                var pdf = new JsPDF('p', 'px', 'letter')

                var pageWidth = pdf.internal.pageSize.getWidth()
                var HTML_Width = 1200
                var HTML_Height = element.scrollHeight
                var PDF_Width = HTML_Width
                var PDF_Height = PDF_Width * 1.29412
                var totalPDFPages = Math.ceil(HTML_Height / PDF_Height) - 1
                var canvas_image_width = pageWidth
                var canvas_image_height = pageWidth / HTML_Width * HTML_Height

                pdf.addImage(imgData, 'JPG', 0, 0, canvas_image_width, canvas_image_height)
                for (var i = 1; i <= totalPDFPages; i++) {
                    pdf.addPage('letter')
                    pdf.addImage(imgData, 'JPG', 0, -(canvas_image_width * 1.29412 * i), canvas_image_width, canvas_image_height)
                }
                pdf.save("forecast.pdf")
                this.button = "Print"
            });
        },
        render() {
            var element = document.querySelector('#afp')
            html2canvas(element, {
                imageTimeout: 1000,
                scale: 1,
                windowWidth: 1200,
                width: 1200,
                // windowWidth: element.scrollWidth,
                // windowHeight: element.scrollHeight,
                // allowTaint: true,
                // foreignObjectRendering: true
            }).then(canvas => {
                document.getElementById('afp-pdf').appendChild(canvas)
                // toDataURL defaults to png, so we need to request a jpeg, then convert for file download.
                // var a = document.createElement('a');
                // a.href = canvas.toDataURL("image/jpeg").replace("image/jpeg", "image/octet-stream");
                // a.download = 'somefilename.jpg';
                // a.click();
            })
        }
    },
    mounted() {
    }
}
</script>

<style module lang="scss">
@import "../assets/css/bootstrap/functions";
@import "../assets/css/_variables.scss";
@import "../assets/css/bootstrap/mixins";

.btn {
    composes: btn from "../assets/css/style.css";
    background-color: #fff;
    border-color: $gray-400;
    color: $gray-700;
    box-shadow: $app-box-shadow;
    &:hover {
        border-color: $gray-500;
    }
}
</style>