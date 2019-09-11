<template>
    <div v-if="loaded">
        <!-- Zone selector -->
        <!-- <zone-selector :zone="zone" /> -->

        <!-- Title -->
        <div :class="$style.title">
            <!-- Need logic for summary product title -->
            <h1>Backcountry Avalanche Forecast</h1>
        </div>

        <!-- Tab navigation -->
        <tabs
            ref="tabs"
            :tabs="tabs"
            :custom="$config.tabs"
            :selected="tabSelected"
            @changeTab="changeTab"
        />

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
                    name: "Weather"
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

// .title h1 {
//     margin-bottom: $spacer;
// }

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

.row {
    composes: row from "../assets/css/style.css";
}

.metaColumn {
    composes: col-md-4 from "../assets/css/style.css";
    composes: col-12 from "../assets/css/style.css";
    margin-bottom: $spacer;
}

.bottomLine {
    strong {
        float: left;
    }
    // p:first-of-type {
    //     display: inline;
    // }
    p:last-of-type {
        margin-bottom: 0;
    }
    background-color: $gray-300;
    padding: $spacer;
    font-size: $font-size-lg;
    border-radius: $border-radius;
    margin-bottom: $spacer;
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
