<template>
    <div v-if="loaded">
        <div :class="$style.clear">
            <!-- Title -->
            <div :class="$style.title">
                <!-- Need logic for summary product title -->
                <h1>Backcountry Avalanche Forecast</h1>
            </div>

            <!-- Zone selector -->
            <zone-selector :zone="zone" />
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

        <!-- Bottom line -->
        <div v-if="data.bottom_line != ''" :class="$style.bottomLine">
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
                <forecast-view v-if="loaded" :data="data" :product="'forecast'" />
                <div :class="$style.textCenter">
                    <button
                        @click="scrollToTabs('weather')"
                        :class="$style.btnPrimary"
                        class="afp-btn-primary"
                    >Full Weather Forecast</button>
                </div>
            </div>

            <!-- Weather tab -->
            <div v-show="tabSelected == 'weather'" :class="$style.tabPane">
                <forecast-view v-if="loaded" :data="data" :product="'weather'" />
            </div>

            <!-- Synopsis tab -->
            <div v-if="tabSelected == 'synopsis'" :class="$style.tabPane">
                <forecast-view v-if="loaded" :data="data" :product="'synopsis'" />
            </div>

            <!-- Custom tab content -->
            <div v-for="customTab in config.tabs" v-bind:key="customTab.id">
                <div v-show="tabSelected == customTab.id" :class="$style.tabPane">
                    <div :id="customTab.id"></div>
                </div>
            </div>

            <div
                :class="$style.disclaimer"
            >This information is provided by the U.S.D.A. Forest Service and describes general backcountry avalanche hazard and conditions. It does not apply to ski areas and highways where avalanche mitigation is conducted. Read more here.</div>
        </div>
    </div>
</template>

<script>
import ZoneSelector from '../components/ZoneSelector'
import Tabs from '../components/Tabs'

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
        Tabs
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

.clear {
    &::after {
        display: block;
        content: "";
        clear: both;
    }
}

.title {
    @include media-breakpoint-up(md) {
        float: left;
    }
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

.metaColumnContent {
    border-left: 1.5px solid $gray-200;
    padding: 0.5rem 0 0.5rem 2rem;
}

.bottomLine {
    background-color: #fff;
    padding: $spacer;
    border-radius: $border-radius;
    border: 1.2px solid $gray-400;
    box-shadow: $app-box-shadow;
    margin-top: 3rem;
    margin-bottom: 3rem;
}

.bottomLineTitle {
    display: inline-block;
    border-bottom: 1px solid $gray-400;
}

.bottomLineText {
    font-size: $font-size-lg;
    margin-top: 0.7rem;
}

.btnPrimary {
    composes: btn from "../assets/css/style.css";
    composes: btn-primary from "../assets/css/style.css";
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
        padding-right: $spacer * 0.5;
    }
}

.tabContainer {
    background-color: #fff;
    width: 100vw;
    overflow-x: hidden;
    position: relative;
    left: calc(-1 * (100vw - 100% + 15px) / 2);
    padding-left: calc((100vw - 100% + 15px) / 2);
    padding-right: calc((100vw - 100% + 15px) / 2);
    padding-top: $spacer;
    padding-bottom: $spacer;
    border-top: 1px solid $gray-400;
}

.tabPane {
    min-height: 80vh;
}

.textCenter {
    text-align: center;
}

.disclaimer {
    margin-top: $spacer * 1.5;
    border-top: $border-width solid $app-border-color;
    padding: $spacer 0;
    font-size: $font-size-sm;
}
</style>
