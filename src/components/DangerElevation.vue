<template>
    <div>
        <svg
            id="afp-danger-svg"
            width="250"
            height="300"
            viewBox="0 0 250 300"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            xml:space="preserve"
            xmlns:serif="http://www.serif.com/"
            style=" fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2; width: 250px; height: 300px;"
        >
            <path
                :style="{ fill: dangerColor[danger.lower]}"
                style="stroke-width: 0px"
                d="M31.504,210l175,0l43.496,90l-250,0l31.504,-90Z"
            />
            <path
                :style="{ fill: dangerColor[danger.middle]}"
                style="stroke-width: 0px"
                d="M204.087,205l-170.833,0l31.503,-90l95.834,0l43.496,90Z"
            />
            <path
                :style="{ fill: dangerColor[danger.upper]}"
                style="stroke-width: 0px"
                d="M158.174,110l-91.666,0l38.504,-110l53.162,110Z"
            />
            <path
                id="shadow"
                d="M99.011,210c-3.794,30.144 -7.698,59.375 -12.011,90l-87,0l31.504,-90l67.507,0Zm-1.408,-95c-3.251,15.893 -6.676,31.781 -9.635,47.705c-1.273,6.846 -3.406,15.213 1.651,18.637c2.083,1.41 4.648,0.508 6.573,-0.902c2.241,-1.691 4.211,-2.45 4.974,-0.968c0.039,0.075 0.075,0.152 0.11,0.229c0.05,0.113 0.096,0.228 0.138,0.344c0.058,0.161 0.11,0.324 0.156,0.489c0.051,0.182 0.095,0.366 0.134,0.55c0.052,0.243 0.095,0.488 0.13,0.734c0.039,0.268 0.069,0.537 0.093,0.806c0.034,0.391 0.054,0.783 0.063,1.175c0.011,0.479 0.006,0.959 -0.013,1.438c-0.022,0.572 -0.064,1.143 -0.118,1.714c-0.024,0.238 -0.049,0.476 -0.077,0.713c-0.713,5.827 -1.427,11.6 -2.144,17.336l-66.384,0l31.503,-90l32.846,0Zm-31.095,-5l38.504,-110l1.271,2.63c-2.976,10.361 -7.251,22.561 -9.283,33.37c-0.723,3.846 -2.208,8.886 1.178,11.874c2.974,2.624 7.911,-1.792 8.984,0.865c0.035,0.088 0.067,0.176 0.098,0.266c1.203,3.557 0.359,7.346 -0.101,11.018c-2.092,16.703 -5.183,33.346 -8.539,49.977l-32.112,0Z"
                style="fill-opacity:0.1;"
            />
        </svg>
        <img id="afp-danger-img" />
    </div>
</template>

<script>

export default {
    data() {
        return {
            dangerColor: [
                '#cccccc',
                '#50b849',
                '#fef200',
                '#f7941d',
                '#ed1b24',
                '#000000',

            ]
        }
    },
    props: ['danger'],
    mounted() {
        // var svg = document.querySelector('#afp-danger-svg')
        // var img = document.querySelector('#afp-danger-img')
        // var svgData = new XMLSerializer().serializeToString(svg)
        // var canvas = document.createElement("canvas");
        // canvas.width = 750;
        // canvas.height = 900;
        // var ctx = canvas.getContext("2d")
        // ctx.scale(3, 3)
        // var imgTemp = document.createElement("img");
        // imgTemp.setAttribute("src", "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgData))));
        // imgTemp.onload = function () {
        //     ctx.drawImage(imgTemp, 0, 0);
        //     var canvasdata = canvas.toDataURL("image/png", 1);
        //     img.setAttribute("src", canvasdata);
        // }
    }
}

</script>