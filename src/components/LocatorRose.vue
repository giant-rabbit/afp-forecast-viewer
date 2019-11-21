<template>
    <div :class="$style.rose" class="rose">
        <div :class="$style.roseContainer">
            <label :class="[$style.aspectMarker, $style.north]">N</label>
            <label :class="[$style.aspectMarker, $style.east]">E</label>
            <label :class="[$style.aspectMarker, $style.south]">S</label>
            <label :class="[$style.aspectMarker, $style.west]">W</label>
            <label :class="[$style.aspectMarker, $style.northwest]">NW</label>
            <label :class="[$style.aspectMarker, $style.northeast]">NE</label>
            <label :class="[$style.aspectMarker, $style.southeast]">SE</label>
            <label :class="[$style.aspectMarker, $style.southwest]">SW</label>
            <div :class="[$style.elevationMarker, $style.elevationMarkerUpper]"></div>
            <div :class="[$style.elevationMarker, $style.elevationMarkerMiddle]"></div>
            <div :class="[$style.elevationMarker, $style.elevationMarkerLower]"></div>
            <div
                :class="[$style.elevationLabel, $style.elevationLabelUpper]"
            >{{this.config.elevations.upper}}</div>
            <div
                :class="[$style.elevationLabel, $style.elevationLabelMiddle]"
            >{{this.config.elevations.middle}}</div>
            <div
                :class="[$style.elevationLabel, $style.elevationLabelLower]"
            >{{this.config.elevations.lower}}</div>
            <svg
                class="afp-rose-svg"
                width="100%"
                height="100%"
                viewBox="0 0 1050 1050"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                xml:space="preserve"
                xmlns:serif="http://www.serif.com/"
                style=" fill-rule:evenodd;clip-rule:evenodd;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:1.5;"
            >
                <path
                    data-id="north upper"
                    d="M529.716,527l68.371,-166.7l-138.1,0l69.729,166.7Z"
                    :style="'stroke: ' + borderColor + '; stroke-width: 10px; fill: transparent'"
                />
                <path
                    data-id="north middle"
                    d="M666.581,193.63l-277.081,0l69.27,166.67l138.541,0l69.27,-166.67Z"
                    :style="'stroke: ' + borderColor + '; stroke-width: 10px; fill: transparent'"
                />
                <path
                    data-id="north lower"
                    d="M734.1,26.997l-414.2,0l69.943,166.67l275.865,0l68.392,-166.67Z"
                    :style="'stroke: ' + borderColor + '; stroke-width: 10px; fill: transparent'"
                />
                <path
                    data-id="northeast upper"
                    d="M529.716,527l166.22,-69.529l-97.651,-97.652l-68.569,167.181Z"
                    :style="'stroke: ' + borderColor + '; stroke-width: 10px; fill: transparent'"
                />
                <path
                    data-id="northeast middle"
                    d="M862.222,388.05l-195.925,-195.926l-68.873,166.835l97.963,97.963l166.835,-68.872Z"
                    :style="'stroke: ' + borderColor + '; stroke-width: 10px; fill: transparent'"
                />
                <path
                    data-id="northeast lower"
                    d="M1027.79,317.966l-292.884,-292.884l-68.396,167.311l195.066,195.066l166.214,-69.493Z"
                    :style="'stroke: ' + borderColor + '; stroke-width: 10px; fill: transparent'"
                />
                <path
                    data-id="east upper"
                    d="M527.716,528.339l166.7,68.371l0,-138.1l-166.7,69.729Z"
                    :style="'stroke: ' + borderColor + '; stroke-width: 10px; fill: transparent'"
                />
                <path
                    data-id="east middle"
                    d="M861.086,665.204l0,-277.081l-166.67,69.27l0,138.541l166.67,69.27Z"
                    :style="'stroke: ' + borderColor + '; stroke-width: 10px; fill: transparent'"
                />
                <path
                    data-id="east lower"
                    d="M1027.72,732.723l0,-414.2l-166.67,69.943l0,275.865l166.67,68.392Z"
                    :style="'stroke: ' + borderColor + '; stroke-width: 10px; fill: transparent'"
                />
                <path
                    data-id="southeast upper"
                    d="M527.716,528.339l69.529,166.22l97.652,-97.651l-167.181,-68.569Z"
                    :style="'stroke: ' + borderColor + '; stroke-width: 10px; fill: transparent'"
                />
                <path
                    data-id="southeast middle"
                    d="M666.666,860.845l195.926,-195.925l-166.835,-68.872l-97.963,97.962l68.872,166.835Z"
                    :style="'stroke: ' + borderColor + '; stroke-width: 10px; fill: transparent'"
                />
                <path
                    data-id="southeast lower"
                    d="M736.75,1026.42l292.884,-292.884l-167.311,-68.396l-195.066,195.066l69.493,166.214Z"
                    :style="'stroke: ' + borderColor + '; stroke-width: 10px; fill: transparent'"
                />
                <path
                    data-id="south upper"
                    d="M527.918,528.416l-68.371,166.7l138.1,0l-69.729,-166.7Z"
                    :style="'stroke: ' + borderColor + '; stroke-width: 10px; fill: transparent'"
                />
                <path
                    data-id="south middle"
                    d="M391.053,861.786l277.081,0l-69.27,-166.67l-138.541,0l-69.27,166.67Z"
                    :style="'stroke: ' + borderColor + '; stroke-width: 10px; fill: transparent'"
                />
                <path
                    data-id="south lower"
                    d="M323.534,1028.42l414.2,0l-69.943,-166.67l-275.865,0l-68.392,166.67Z"
                    :style="'stroke: ' + borderColor + '; stroke-width: 10px; fill: transparent'"
                />
                <path
                    data-id="southwest upper"
                    d="M527.918,528.416l-166.22,69.529l97.651,97.652l68.569,-167.181Z"
                    :style="'stroke: ' + borderColor + '; stroke-width: 10px; fill: transparent'"
                />
                <path
                    data-id="southwest middle"
                    d="M195.412,667.366l195.926,195.926l68.872,-166.835l-97.963,-97.963l-166.835,68.872Z"
                    :style="'stroke: ' + borderColor + '; stroke-width: 10px; fill: transparent'"
                />
                <path
                    data-id="southwest lower"
                    d="M29.841,737.451l292.884,292.883l68.396,-167.31l-195.066,-195.067l-166.214,69.494Z"
                    :style="'stroke: ' + borderColor + '; stroke-width: 10px; fill: transparent'"
                />
                <path
                    data-id="west upper"
                    d="M528.918,527.077l-166.7,-68.371l0,138.1l166.7,-69.729Z"
                    :style="'stroke: ' + borderColor + '; stroke-width: 10px; fill: transparent'"
                />
                <path
                    data-id="west middle"
                    d="M195.548,390.212l0,277.081l166.67,-69.27l0,-138.541l-166.67,-69.27Z"
                    :style="'stroke: ' + borderColor + '; stroke-width: 10px; fill: transparent'"
                />
                <path
                    data-id="west lower"
                    d="M28.915,322.693l0,414.2l166.67,-69.943l0,-275.865l-166.67,-68.392Z"
                    :style="'stroke: ' + borderColor + '; stroke-width: 10px; fill: transparent'"
                />
                <path
                    data-id="northwest upper"
                    d="M529.918,527.077l-69.529,-166.22l-97.652,97.651l167.181,68.569Z"
                    :style="'stroke: ' + borderColor + '; stroke-width: 10px; fill: transparent'"
                />
                <path
                    data-id="northwest middle"
                    d="M390.968,194.571l-195.926,195.926l166.835,68.872l97.963,-97.963l-68.872,-166.835Z"
                    :style="'stroke: ' + borderColor + '; stroke-width: 10px; fill: transparent'"
                />
                <path
                    data-id="northwest lower"
                    d="M318.884,27l-292.884,292.884l167.311,68.396l195.066,-195.066l-69.493,-166.214Z"
                    :style="'stroke: ' + borderColor + '; stroke-width: 10px; fill: transparent'"
                />
            </svg>
        </div>
    </div>
</template>

<script>

export default {
    data() {
        return {
            // borderColor: '#C8CACE',
            // fillColor: '#515558'
            borderColor: '#515558',
            fillColor: '#C8CACE'
        }
    },
    props: ['location', 'rank', 'config'],
    watch: {
        location: function () {
            this.roseColor()
        }
    },
    methods: {
        roseColor() {
            var rose = document.querySelector('#problem-' + this.rank + ' .rose svg')
            var color = this.fillColor
            this.location.forEach(function (each) {
                rose.querySelector('[data-id="' + each + '"]').style.fill = color
            })
        },
    },
    mounted() {
        this.roseColor()
    }
}

</script>

<style module lang="scss">
@import "../assets/css/bootstrap/functions";
@import "../assets/css/_variables.scss";
@import "../assets/css/bootstrap/mixins/breakpoints";

$rose-size: 150px;
$rose-size-xs: 120px;
$rose-margin: 20px;

.rose {
    width: $rose-size + 2 * $rose-margin;
    margin-left: auto;
    margin-right: auto;
}
.roseContainer {
    margin: $rose-margin;
    margin-bottom: 80px;
    position: relative;
    height: $rose-size;
    width: $rose-size;
}

.aspectMarker {
    position: absolute;
    transform: translate(-50%, -50%);
    font-size: 0.7rem;
    font-weight: bold;
    margin: 0;
}
.north {
    left: 50%;
    top: -10px;
}
.south {
    left: 50%;
    top: $rose-size + 10px;
}
.east {
    top: 50%;
    left: $rose-size + 10px;
}
.west {
    top: 50%;
    left: -10px;
}
.northwest {
    left: 13px;
    top: 13px;
}
.northeast {
    left: $rose-size - 13px;
    top: 13px;
}
.southeast {
    left: $rose-size - 13px;
    top: $rose-size - 13px;
}
.southwest {
    left: 13px;
    top: $rose-size - 13px;
}

.elevationMarker {
    position: absolute;
    height: $rose-size * 0.6;
    width: 1px;
    border-left: 1px solid $gray-700;
    border-right: 1px solid $gray-700;
    background-color: $gray-700;
    &:before {
        content: "";
        position: absolute;
        width: 6px;
        height: 6px;
        border-radius: 50%;
        border: 3px solid $gray-700;
        left: -3px;
    }
}
.elevationMarkerUpper {
    left: $rose-size * 0.42;
    top: $rose-size * 0.58;
}
.elevationMarkerMiddle {
    left: $rose-size * 0.33;
    top: $rose-size * 0.67;
}
.elevationMarkerLower {
    left: $rose-size * 0.23;
    top: $rose-size * 0.77;
}

.elevationLabel {
    position: absolute;
    font-size: 0.7rem;
    transform: translateY(-30%);
    padding-left: 0.3rem;
    margin: 0;
}

.elevationLabelUpper {
    left: $rose-size * 0.42;
    top: $rose-size * 0.58 + $rose-size * 0.6;
}
.elevationLabelMiddle {
    left: $rose-size * 0.33;
    top: $rose-size * 0.675 + $rose-size * 0.6;
}
.elevationLabelLower {
    left: $rose-size * 0.23;
    top: $rose-size * 0.77 + $rose-size * 0.6;
}

@include media-breakpoint-down(xs) {
    .elevationLabel,
    .elevationMarker {
        display: none;
    }
    .rose {
        width: $rose-size-xs + 2 * $rose-margin;
    }
    .roseContainer {
        margin-bottom: 55px;
        height: $rose-size-xs;
        width: $rose-size-xs;
    }
    .north {
        left: 50%;
        top: -8px;
    }
    .south {
        left: 50%;
        top: $rose-size-xs + 8px;
    }
    .east {
        top: 50%;
        left: $rose-size-xs + 8px;
    }
    .west {
        top: 50%;
        left: -8px;
    }
    .northwest {
        left: 10px;
        top: 10px;
    }
    .northeast {
        left: $rose-size-xs - 10px;
        top: 10px;
    }
    .southeast {
        left: $rose-size-xs - 10px;
        top: $rose-size-xs - 10px;
    }
    .southwest {
        left: 10px;
        top: $rose-size-xs - 10px;
    }
}
</style>