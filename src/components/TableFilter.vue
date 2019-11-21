<template>
    <div :class="$style.spacer">
        <button
            v-tooltip="'Toggle filters'"
            @click="show = !show"
            :class="$style.toggleBtn"
            class="afp-btn-primary"
        >
            <i class="mdi mdi-filter"></i>
            Filters
        </button>
        <button v-tooltip="'Reset filters'" :class="$style.resetBtn" @click="resetTableFilter">
            <i class="mdi mdi-filter-remove"></i> Reset
        </button>
        <transition name="expand" @enter="enter" @after-enter="afterEnter" @leave="leave">
            <div v-if="show" :class="$style.filterContainer">
                <div :class="$style.row">
                    <div id="forecast_zones" :class="[$style.column]">
                        <h5>Filter by Zone</h5>
                        <div
                            :class="$style.checkboxes"
                            v-for="zone in centerMeta.zones"
                            v-bind:key="zone.id"
                        >
                            <input
                                v-model="zoneFilter"
                                :class="$style.checkbox"
                                class="afp-checkbox"
                                type="checkbox"
                                :value="zone.name"
                                :id="'zone-' + zone.id"
                            />
                            <label :for="'zone-' + zone.id">{{zone.name}}</label>
                        </div>
                    </div>

                    <div id="product_type" :class="[$style.column]">
                        <h5>Filter by Product</h5>
                        <div
                            :class="$style.checkboxes"
                            v-for="(product, index) in products"
                            v-bind:key="index"
                        >
                            <input
                                v-model="productFilter"
                                :class="$style.checkbox"
                                class="afp-checkbox"
                                type="checkbox"
                                :value="product.value"
                                :id="product.value"
                            />
                            <label :for="product.value">{{product.name}}</label>
                        </div>
                    </div>

                    <div id="danger_rating" :class="[$style.column]">
                        <h5>Filter by Danger</h5>
                        <div
                            :class="$style.checkboxes"
                            v-for="(rating, index) in danger"
                            v-bind:key="index"
                        >
                            <input
                                v-model="dangerFilter"
                                :class="$style.checkbox"
                                class="afp-checkbox"
                                type="checkbox"
                                :value="rating.value"
                                :id="rating.value"
                            />
                            <label :for="rating.value">{{rating.name}}</label>
                        </div>
                    </div>

                    <div id="start_date" :class="[$style.column]">
                        <h5>Search by Date</h5>
                        <!-- <div
                            :class="$style.checkboxes"
                            v-for="(year, index) in years"
                            v-bind:key="index"
                        >
                            <input
                                v-model="yearFilter"
                                :class="$style.checkbox"
                                type="checkbox"
                                class="afp-checkbox"
                                :value="year.value"
                                :id="year.value"
                            />
                            <label :for="year.value">{{year.name}}</label>
                        </div>-->
                        <div :class="$style.search">
                            <input
                                :class="$style.searchInput"
                                placeholder="Search yyyy-mm-dd"
                                v-model="dateFilter"
                                type="text"
                            />
                            <button
                                v-if="dateFilter"
                                :class="$style.searchClear"
                                @click="dateFilter = ''"
                            >
                                <i class="mdi mdi-close"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
        <div>
            <transition-group name="fade">
                <span v-for="column in filterQuery" v-bind:key="column.columnName">
                    <button
                        @click="removeFilter(column.columnName, filter)"
                        :class="$style.filterTags"
                        class="afp-btn-primary"
                        v-for="filter in column.columnFilter"
                        v-bind:key="filter"
                    >
                        <i class="mdi mdi-close"></i>&nbsp;
                        <span>{{filter}}</span>
                    </button>
                </span>
            </transition-group>
        </div>
    </div>
</template>

<script>
import Vue from 'vue'
import { Event } from 'vue-tables-2'
// import moment from 'moment'

export default {
    data() {
        return {
            show: false,
            centerMeta: '',
            products: [
                {
                    name: 'Avalanche Forecast',
                    value: 'Avalanche Forecast'
                },
                {
                    name: 'Conditions Summary',
                    value: 'Conditions Summary'
                },
                {
                    name: 'Weather Forecast',
                    value: 'Weather Forecast'
                },
                {
                    name: 'Regional Synopsis',
                    value: 'Regional Synopsis'
                }
            ],
            productFilter: [],
            danger: [
                {
                    name: 'Low',
                    value: 'low'
                },
                {
                    name: 'Moderate',
                    value: 'moderate'
                },
                {
                    name: 'Considerable',
                    value: 'considerable'
                },
                {
                    name: 'High',
                    value: 'high'
                },
                {
                    name: 'Extreme',
                    value: 'extreme'
                }
            ],
            dangerFilter: [],
            zoneFilter: [],
            years: [
                {
                    name: '2019',
                    value: '2019'
                },
                {
                    name: '2020',
                    value: '2020'
                }
            ],
            yearFilter: [],
            filterQuery: [],
            dateFilter: ""
        }
    },
    props: ['data'],
    watch: {
        productFilter: function () {
            this.tableFilter()
        },
        zoneFilter: function () {
            this.tableFilter()
        },
        dangerFilter: function () {
            this.tableFilter()
        },
        // yearFilter: function () {
        //     this.tableFilter()
        // },
        dateFilter: function () {
            this.tableFilter()
        },
    },
    methods: {
        tableFilter() {
            this.filterQuery = []
            if (this.productFilter.length > 0) {
                var filter = {
                    columnName: "product_type",
                    columnFilter: this.productFilter
                }
                this.filterQuery.push(filter)
            }
            if (this.zoneFilter.length > 0) {
                var filter = {
                    columnName: "forecast_zones",
                    columnFilter: this.zoneFilter
                }
                this.filterQuery.push(filter)
            }
            if (this.dangerFilter.length > 0) {
                var filter = {
                    columnName: "danger_rating",
                    columnFilter: this.dangerFilter
                }
                this.filterQuery.push(filter)
            }
            // if (this.yearFilter.length > 0) {
            //     var filter = {
            //         columnName: "start_date",
            //         columnFilter: this.yearFilter
            //     }
            //     this.filterQuery.push(filter)
            // }
            if (this.dateFilter != '') {
                var filter = {
                    columnName: "start_date",
                    columnFilter: [this.dateFilter]
                }
                this.filterQuery.push(filter)
            }
            Event.$emit('vue-tables.filter::multiFilter', this.filterQuery);
        },
        removeFilter(column, filter) {
            if (column == 'start_date') {
                this.dateFilter = ''
            } else {
                var group = document.querySelector('#' + column)
                var checkbox = group.querySelector("input[type='checkbox'][value='" + filter + "']")
                group.querySelector("input[type='checkbox'][value='" + filter + "']").click()
            }

        },
        resetTableFilter() {
            this.productFilter = []
            this.zoneFilter = []
            this.dangerFilter = []
            this.yearFilter = []
            this.dateFilter = ''
        },
        getCenterMeta() {
            this.$api
                .get('/public/avalanche-center/' + this.$centerId)
                .then(response => {
                    this.centerMeta = response.data
                })
                .catch(e => {
                    this.showAlert('error', '')
                })
        },
        // Transitions for filter menu
        enter(element) {
            const width = getComputedStyle(element).width;

            element.style.width = width;
            element.style.position = 'absolute';
            element.style.visibility = 'hidden';
            element.style.height = 'auto';

            const height = getComputedStyle(element).height;

            element.style.width = null;
            element.style.position = null;
            element.style.visibility = null;
            element.style.height = 0;

            getComputedStyle(element).height;
            setTimeout(() => {
                element.style.height = height;
            });
        },
        afterEnter(element) {
            element.style.height = 'auto';
        },
        leave(element) {
            const height = getComputedStyle(element).height;

            element.style.height = height;

            getComputedStyle(element).height;

            setTimeout(() => {
                element.style.height = 0;
            });
        },
    },
    mounted() {
        this.getCenterMeta()
    }
}

</script>

<style module lang="scss">
@import "../assets/css/bootstrap/functions";
@import "../assets/css/_variables.scss";
@import "../assets/css/bootstrap/mixins";

.spacer {
    margin-bottom: 0.5 * $spacer;
}

.toggleBtn {
    composes: btn from "../assets/css/style.css";
    composes: btn-primary from "../assets/css/style.css";
    margin-bottom: 1rem;
}

.resetBtn {
    composes: btn from "../assets/css/style.css";
    composes: btn-secondary from "../assets/css/style.css";
    margin-bottom: 1rem;
    margin-left: 1rem;
}

.filterContainer {
    background-color: #fff;
    border: 1.2px solid $gray-400;
    box-shadow: $app-box-shadow;
    padding: 1rem;
    margin-bottom: 1rem;
    h5 {
        border-bottom: 1px solid $gray-400;
        padding-bottom: 0.5rem;
        margin-bottom: 1rem;
    }
}

.row {
    composes: row from "../assets/css/style.css";
}

.column {
    composes: col-12 from "../assets/css/style.css";
    composes: col-md-6 from "../assets/css/style.css";
    composes: col-lg-3 from "../assets/css/style.css";
    padding-top: 1rem;
    padding-bottom: 1rem;
}

.checkboxes {
    position: relative;
    display: block;
    min-height: 1.5rem;
    padding-left: 0.5rem;
}

.checkbox {
    -webkit-box-shadow: none;
    clear: none;
    cursor: pointer;
    display: inline-block;
    line-height: 0;
    outline: 0;
    padding: 0 12px 0 !important;
    vertical-align: middle;
    width: 0.1px;
    height: 0.1px;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    box-shadow: none;
    border-color: transparent;
    background: transparent;
    position: relative;

    &:focus {
        outline: none;
    }
    &:before {
        position: absolute;
        top: -15px;
        left: 0;
        width: 0;
        font: normal normal normal 24px/1 "Material Design Icons";
        content: "\F131";
        color: $gray-500;
    }
    &:checked:before {
        content: "\f132";
        color: $primary;
    }
}
.search {
    position: relative;
    margin-top: 1rem;
    margin-left: 0.8rem;
}

.searchInput {
    display: block;
    width: 100%;
    font-family: $font-family-base;
    padding: 0.4rem 2.5rem 0.4rem 1rem;
    font-size: $font-size-sm;
    line-height: 1.5;
    color: $gray-700;
    background-color: $gray-300;
    background-image: none;
    border: 1px solid transparent;
    border-radius: $border-radius;
    appearance: none !important;
    box-shadow: none;
    &:focus {
        background-color: #fff;
        border: 1px solid #c8ced3;
        outline: 0;
        box-shadow: none;
    }
}
.searchClear {
    position: absolute;
    right: 0;
    top: 0;
    line-height: 2.1rem;
    padding: 0 0.5rem;
    font-size: 1.2rem;
    z-index: 1;
    appearance: none;
    border: none;
    background-color: transparent;
    color: $gray-700;
    &:focus {
        outline: 0;
        box-shadow: none;
    }
    &:hover {
        color: $gray-900;
    }
}

.filterTags {
    composes: btn from "../assets/css/style.css";
    composes: btn-primary from "../assets/css/style.css";
    font-size: $font-size-sm;
    margin: 0.3rem 0.3rem 0 0;
    padding: 0.15rem 0.4rem;
}
</style>

<style scoped lang="scss">
.expand-enter-active,
.expand-leave-active {
    transition: height 0.3s ease-in-out;
    overflow: hidden;
}

.expand-enter,
.expand-leave-to {
    height: 0;
}
</style>
