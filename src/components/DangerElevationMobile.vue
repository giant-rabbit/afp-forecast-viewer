<template>
    <div class="afp-dangerMobile">
        <svg
            width="160"
            height="140"
            viewBox="0 0 160 140"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            xml:space="preserve"
            xmlns:serif="http://www.serif.com/"
            style="fill-rule:evenodd;clip-rule:evenodd;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:1.5;"
        >
            <path
                d="M30.222,95.2l99.556,0l21.333,37.8l-142.222,0l21.333,-37.8Z"
                :style="{ fill: dangerColor[danger.lower]}"
                style="stroke-width: 0px"
            />
            <path
                d="M128.593,93.1l-97.186,0l21.334,-37.8l54.518,0l21.334,37.8Z"
                :style="{ fill: dangerColor[danger.middle]}"
                style="stroke-width: 0px"
            />
            <path
                d="M106.074,53.2l-52.148,0l26.074,-46.2l26.074,46.2Z"
                :style="{ fill: dangerColor[danger.upper]}"
                style="stroke-width: 0px"
            />
            <path
                d="M77.387,5.329c0.532,-0.942 1.531,-1.525 2.613,-1.525c1.082,0 2.081,0.583 2.613,1.525c11.761,20.84 59.726,105.827 71.306,126.346c0.524,0.929 0.516,2.067 -0.022,2.988c-0.538,0.921 -1.524,1.487 -2.59,1.487c-23.343,0 -119.271,0 -142.614,0c-1.066,0 -2.052,-0.566 -2.59,-1.487c-0.538,-0.921 -0.546,-2.059 -0.022,-2.988c11.58,-20.519 59.545,-105.506 71.306,-126.346Z"
                style="fill:none;stroke:#ccc;stroke-width:2.51px;"
            />
        </svg>
        <div class="afp-dangerNumbers">
            <span :class="{'afp-extremeText':(danger.upper == 5)}">{{danger.upper}}</span>
            <span :class="{'afp-extremeText':(danger.middle == 5)}">{{danger.middle}}</span>
            <span :class="{'afp-extremeText':(danger.lower == 5)}">{{danger.lower}}</span>
        </div>
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
}

</script>

<style scoped lang="scss">

.afp-dangerMobile {
    height: 140px;
    width: 160px;
    position: relative;
    page-break-inside: avoid;

    .afp-dangerNumbers {
        page-break-inside: avoid;
        position: absolute;
        top: 0;
        width: 40px;
        left: calc(50% - 20px);
        z-index: 4;
        font-weight: bold;
        text-align: center;
        font-size: 16px;
        span {
            &:first-of-type {
                margin-top: 14px;
            }
            display: block;
            line-height: 1;
            padding-top: 12px;
            padding-bottom: 12px;
        }
    }

    .afp-extremeText {
        color: #fff;
    }
}
</style>