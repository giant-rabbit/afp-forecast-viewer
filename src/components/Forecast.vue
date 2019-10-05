<template>
    <div v-if="loaded">
        <div :class="$style.row">
            <!-- Zone selector -->
            <div :class="$style.zoneSelector">
                <zone-selector :zone="zone" />
            </div>
            <!-- Title -->
            <div :class="$style.title">
                <!-- Need logic for summary product title -->
                <h1>Backcountry Avalanche Forecast</h1>
                <h2>{{data.forecast_zone.name}}</h2>
            </div>
        </div>
        <!-- Header -->
        <div :class="$style.row">
            <div :class="$style.metaColumn">
                <div :class="$style.metaColumnContent">
                    <h6>Issued</h6>
                    {{ data.published_time | publicDate }}
                </div>
            </div>
            <div :class="$style.metaColumn">
                <div :class="$style.metaColumnContent">
                    <h6>Expires</h6>
                    {{ data.expires_time | publicDate }}
                </div>
            </div>
            <div :class="$style.metaColumn">
                <div :class="$style.metaColumnContent">
                    <h6>Author</h6>
                    {{ data.author }}
                </div>
            </div>
        </div>

        <div :class="$style.warning">
            <i class="mdi mdi-alert"></i>
            <h2>Avalanche Warning In Effect</h2>
            <span>Issued: Fri, February 15, 2019 at 2:06 PM PST</span>
        </div>

        <!-- Bottom line -->
        <div v-if="data.bottom_line != ''" :class="$style.bottomLine">
            <img :class="$style.dangerIcon" :src="this.$dangerScale[4].icon" />
            <h5 :class="$style.bottomLineTitle">THE BOTTOM LINE</h5>
            <div :class="$style.bottomLineText" v-html="data.bottom_line"></div>
        </div>

        <!-- Tab navigation -->
        <tabs
            ref="tabs"
            :tabs="tabs"
            :custom="$config.tabs"
            :selected="tabSelected"
            @changeTab="changeTab"
        />

        <!-- Tab container -->
        <div :class="$style.tabContainer">
            <!-- Avalanche forecast tab -->
            <div v-show="tabSelected == 'forecast'" :class="$style.tabPane">
                <!-- Need expiration -->
                <!-- Need logic for summary product -->
                <forecast-view
                    :class="$style.forecastProduct"
                    v-if="loaded"
                    :data="data"
                    :product="'forecast'"
                    :config="config"
                />
                <h2>Weather Summary</h2>
                <weather-table
                    :periods="data.weather_data[0].periods"
                    :data="data.weather_data[0].data"
                    :zone="data.weather_data[0].zone_name"
                />
                <div :class="$style.textCenter">
                    <button
                        @click="scrollToTabs('weather')"
                        :class="$style.btn"
                    >Full Weather Forecast</button>
                </div>
            </div>

            <!-- Weather tab -->
            <div v-show="tabSelected == 'weather'" :class="$style.tabPane">
                <forecast-view v-if="loaded" :data="data" :product="'weather'" :config="config" />
            </div>

            <!-- Synopsis tab -->
            <div v-if="tabSelected == 'synopsis'" :class="$style.tabPane">
                <forecast-view v-if="loaded" :data="data" :product="'synopsis'" :config="config" />
            </div>

            <!-- Custom tab content -->
            <div v-for="customTab in config.tabs" v-bind:key="customTab.id">
                <div v-show="tabSelected == customTab.id" :class="$style.tabPane">
                    <div :id="customTab.id"></div>
                </div>
            </div>
        </div>
        <div :class="$style.disclaimer">
            This information is provided by the U.S.D.A. Forest Service and describes general backcountry avalanche hazard and conditions.
            <br />It does not apply to ski areas and highways where avalanche mitigation is conducted.
        </div>
    </div>
</template>

<script>
import ZoneSelector from '../components/ZoneSelector'
import Tabs from '../components/Tabs'
import WeatherTable from '../components/WeatherTable'

export default {
    data() {
        return {
            tabs: [
                {
                    id: "forecast",
                    name: "Avalanche Forecast"
                },
                {
                    id: "weather",
                    name: "Weather Forecast"
                },
                {
                    id: "synopsis",
                    name: "Regional Synopsis"
                }
            ],
            tabSelected: "forecast",
            zone: '',
            date: '',
            config: this.$config,
            data: null,
            centerZones: [],
            loaded: false
        }
    },
    computed: {
        expired: function () {
            return moment(this.data.expires_time).isBefore()
        },
    },
    components: {
        ZoneSelector,
        Tabs,
        WeatherTable
    },
    methods: {
        // getProduct() {
        //     this.$api
        //         .get('/forecast/54357')
        //         .then(response => {
        //             this.data = response.data
        //             this.loaded = true
        //         })
        //         .catch(e => {
        //             this.$eventBus.$emit('showAlert')
        //         })
        // },
        getProduct() {
            // load dummy data
            var ref = this
            setTimeout(function () {
                ref.data = ref.$sampleData
                ref.data.forecast_avalanche_problems.sort(function (a, b) {
                    return a.rank - b.rank
                })
                ref.loaded = true
                ref.$eventBus.$emit('loaded')
                ref.$nextTick(() => {
                    var event = new Event('forecast-loaded')
                    window.dispatchEvent(event)
                })
            }, 500)
        },
        changeTab(tab) {
            this.tabSelected = tab
            this.$router.push({ query: { nav: this.tabSelected } })
        },
        scrollToTabs(tab) {
            var ref = this
            var offset = document.getElementById('tabs').offsetTop
            const onScroll = function () {
                const scrollTop = window.scrollTop || window.pageYOffset

                if (scrollTop === offset) {
                    window.removeEventListener('scroll', onScroll)
                    ref.tabSelected = tab
                }
            }
            window.addEventListener('scroll', onScroll)
            onScroll()
            window.scrollTo({
                top: offset,
                behavior: 'smooth'
            })
        },
    },
    mounted() {
        //trigger event for custom content to be loaded
        this.$eventBus.$emit('loading')
        this.date = this.$route.params.date
        this.zone = this.$route.params.zone
        this.getProduct()
        if (this.$route.query.nav && this.$route.query.nav != '') {
            this.tabSelected = this.$route.query.nav
        }
    },
}
</script>

<style module lang="scss">
@import "../assets/css/bootstrap/functions";
@import "../assets/css/_variables.scss";
@import "../assets/css/bootstrap/mixins";

.spacer {
    margin-bottom: $spacer;
}

.title {
    composes: col-md-8 from "../assets/css/style.css";
    composes: col-lg-9 from "../assets/css/style.css";
    h2 {
        color: $gray-700 !important;
        margin-bottom: 0 !important
    }
}

.zoneSelector {
    composes: col-md-4 from "../assets/css/style.css";
    composes: col-lg-3 from "../assets/css/style.css";
    composes: order-md-2 from "../assets/css/style.css";
}

.row {
    composes: row from "../assets/css/style.css";
    margin-bottom: $spacer;
}

.metaColumn {
    composes: col-md-4 from "../assets/css/style.css";
    composes: col-12 from "../assets/css/style.css";
}

.productExpired {
    font-size: $font-size-lg;
    color: #fff;
    padding: $alert-padding-y $alert-padding-x;
    margin-bottom: $spacer;
    @include border-radius($alert-border-radius);
    background-color: $high;
    span {
        vertical-align: middle;
    }
    i {
        vertical-align: middle;
        font-size: 200%;
        line-height: 1;
        padding-right: 0.5rem;
    }
}
.warning {
    position: relative;
    h2 {
        color: #fff !important;
        margin-bottom: 0.5rem !important;
        margin-left: 65px;
        margin-top: 0;
    }
    span {
        display: block;
        color: #fff !important;
        font-size: $font-size-sm;
        margin-left: 65px;
    }
    padding: 1.5rem;
    margin-bottom: $spacer;
    @include border-radius($alert-border-radius);
    background-color: $high;
    i {
        color: #fff !important;
        font-size: 4rem;
        line-height: 1;
        position: absolute;
        top: 1.5rem;
        left: 15px;
        @include media-breakpoint-up(sm) {
            transform: translate(0, -50%);
            top: 50%;
        }
    }
}
.metaColumnContent {
    border-left: 1.5px solid $gray-200;
    padding: 0.5rem 0 0.5rem 2rem;
}

.bottomLine {
    position: relative;
    background-color: #fff;
    padding: $spacer;
    border-radius: $border-radius;
    border: 1.2px solid $gray-400;
    box-shadow: $app-box-shadow;
    margin-top: 3rem;
    margin-bottom: 3rem;
}

.dangerIcon {
    height: 60px !important;
    width: auto !important;
    position: absolute;
    top: -20px;
    left: -20px;
    @include media-breakpoint-down(xs) {
        left: -15px;
    }
}

.bottomLineTitle {
    display: inline-block;
    border-bottom: 1px solid $gray-400;
    padding-bottom: 0.1rem;
}

.bottomLineText {
    font-size: $font-size-lg;
    margin-top: 0.7rem;
}

.tabContainer {
    background-color: #fff;
    position: relative;
    // width: 100vw;
    // left: calc(-1 * (100vw - 100% + 15px) / 2);
    // padding-left: calc((100vw - 100% + 15px) / 2);
    // padding-right: calc((100vw - 100% - 15px) / 2);
    margin-right: -15px;
    margin-left: -15px;
    padding-right: 15px;
    padding-left: 15px;
    padding-top: $spacer;
    padding-bottom: $spacer;
    border: 1px solid $gray-400;
    // border-bottom: 1px solid $gray-400;
    box-shadow: $app-box-shadow;
    @include media-breakpoint-down(xs) {
        border-left: none;
        border-right: none;
        box-shadow: none;
    }
}

.tabPane {
    min-height: 80vh;
}

.forecastProduct {
    @include divider;
}

.btn {
    composes: btn from "../assets/css/style.css";
    composes: btn-secondary from "../assets/css/style.css";
}

.textCenter {
    text-align: center;
}

.disclaimer {
    // margin-top: $spacer * 1.5;
    // border-top: 1.5px solid $gray-200;
    padding: 1.5 * $spacer 0;
    font-size: $font-size-sm;
    text-align: center;
    @include media-breakpoint-down(md) {
        br {
            display: none;
        }
    }
}
</style>
