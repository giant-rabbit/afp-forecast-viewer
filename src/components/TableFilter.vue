<template>
    <div :class="$style.spacer">
        <button
            v-tooltip="'Toggle filters'"
            @click="show = !show"
            :class="$style.toggleBtn" class="afp-btn-primary"
        >
            <i class="mdi mdi-filter"></i> Filters
    
        </button>
        <button
            v-tooltip="'Reset filters'"
            :class="$style.resetBtn"
            @click="resetTableFilter"
        >
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

                    <div id="product" :class="[$style.column]">
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

                    <div id="start_date_iso" :class="[$style.column]">
                        <h5>Filter by Year</h5>
                        <div
                            :class="$style.checkboxes"
                            v-for="(year, index) in years"
                            v-bind:key="index"
                        >
                            <input
                                v-model="yearFilter"
                                :class="$style.checkbox"
                                type="checkbox"
                                class="afp-checkbox"
                                :value="year"
                                :id="year"
                            />
                            <label :for="year">{{year}}</label>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
        <div>
            <span v-for="column in filterQuery" v-bind:key="column.columnName">
                <transition-group name="fade">
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
                </transition-group>
            </span>
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
                    name: 'Watch',
                    value: 'watch'
                },
                {
                    name: 'Warning',
                    value: 'warning'
                },
                {
                    name: 'Special Bulletin',
                    value: 'special'
                }
            ],
            productFilter: [],
            zoneFilter: [],
            years: [],
            yearFilter: [],
            filterQuery: []
        }
    },
    // components: {
    //     BDropdown,
    //     BDropdownText
    // },
    props: ['data'],
    watch: {
        productFilter: function () {
            this.tableFilter()
        },
        zoneFilter: function () {
            this.tableFilter()
        },
        yearFilter: function () {
            this.tableFilter()
        },
        data: function () {
            var years = []
            this.data.forEach(function (item, index) {
                var year = moment(item.start_date_iso).format('YYYY')
                years.push(year)
            })
            this.years = [...new Set(years)]
        }
    },
    methods: {
        tableFilter() {
            this.filterQuery = []
            if (this.productFilter.length > 0) {
                var filter = {
                    columnName: "product",
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
            if (this.yearFilter.length > 0) {
                var filter = {
                    columnName: "start_date_iso",
                    columnFilter: this.yearFilter
                }
                this.filterQuery.push(filter)
            }
            Event.$emit('vue-tables.filter::multiFilter', this.filterQuery);
        },
        removeFilter(column, filter) {
            var group = document.querySelector('#' + column)
            var checkbox = group.querySelector("input[type='checkbox'][value='" + filter + "']")
            group.querySelector("input[type='checkbox'][value='" + filter + "']").click()

        },
        resetTableFilter() {
            this.productFilter = []
            this.zoneFilter = []
            this.statusFilter = []
            this.yearFilter = []
        },
        getCenterMeta() {
            this.$api
                .get('/avalanche-center/' + this.$centerId)
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
    margin-bottom: $spacer;
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
    background-color: $gray-200;
    padding: 0 1rem;
    margin-bottom: 1rem;
}

.row {
    composes: row from "../assets/css/style.css";
}

.column {
    composes: col-12 from "../assets/css/style.css";
    composes: col-md-6 from "../assets/css/style.css";
    composes: col-lg-4 from "../assets/css/style.css";
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

.filterTags {
    composes: btn from "../assets/css/style.css";
    composes: btn-primary from "../assets/css/style.css";
    font-size: $font-size-sm;
    margin: .3rem .3rem 0 0;
    padding: 0.15rem 0.4rem;
}
</style>

<style scoped lang="scss">
.expand-enter-active,
.expand-leave-active {
  transition: height .3s ease-in-out;
  overflow: hidden;
}

.expand-enter,
.expand-leave-to {
  height: 0;
}
</style>
