<template>
    <div v-show="loaded">
        <h1>Forecast Archive</h1>
        <!-- <table-filter :data="data" ref="filter" /> -->
        <content-panel :class="$style.container">
            <v-client-table :columns="columns" :data="data" :options="options" ref="table">
                <div slot="start_date" slot-scope="props">
                    <!-- need logic for link based on product type -->
                    <router-link
                        class
                        v-tooltip="'View product'"
                        :to="{ name: 'ArchivedForecast', params: { zone: 'sawtooth', date: props.row.start_date  }}"
                    >{{props.row.start_date}}</router-link>
                </div>
                <span slot="danger_rating" slot-scope="props">
                    <span v-if="props.row.danger_rating == ''"></span>
                    <span
                        v-else
                        :class="'afp-danger afp-danger-' + props.row.danger_rating"
                    >{{props.row.danger_rating}}</span>
                </span>
            </v-client-table>
        </content-panel>
    </div>
</template>

<script>
import Vue from 'vue'
import { ClientTable, Event } from 'vue-tables-2'
import TableFilter from '../components/TableFilter'
import ContentPanel from '../components/ContentPanel'
import tableTheme from '../vueTableTheme'
import tableTemplate from '../vueTableTemplate'
import moment from 'moment/src/moment.js'
Vue.use(ClientTable, {}, false, tableTheme, tableTemplate)


export default {
    name: 'Archive',
    data() {
        return {
            loaded: false,
            selected: [],
            /**
             * Set up Vue Tables 2
             */
            columns: ['start_date', 'product_type', 'forecast_zones', 'danger_rating'],
            data: [],
            options: {
                skin: 'table',
                columnsClasses: {
                    forecast_zones: 'afp-table-zones',
                    danger: 'afp-table-danger',
                    product_type: 'afp-table-product',
                    start_date: 'afp-table-time',
                },
                headings: {
                    product_type: "Product",
                    forecast_zones: 'Zones',
                    danger_rating: "Danger",
                    start_date: 'Published',
                },
                orderBy: {
                    column: 'start_date',
                    ascending: false
                },
                sortable: ['start_date', 'danger_rating'],
                filterable: true,
                perPage: 10,
                perPageValues: [10, 25, 50],
                pagination: { chunk: 5 },
                sortIcon: {
                    base: 'mdi',
                    up: 'mdi-sort-ascending',
                    down: 'mdi-sort-descending',
                    is: 'mdi-sort'
                },

                texts: {
                    noResults: "No matching products",
                    count: "Showing {from} to {to} of {count} products|{count} products|One product",
                },
                saveState: true,
                // customFilters: [
                //     {
                //         name: 'multiFilter',
                //         callback: function (row, query) {
                //             var result = true
                //             query.forEach(function (column, index) {
                //                 var thisResult = false
                //                 column.columnFilter.forEach(function (filter, index) {
                //                     if (typeof filter === "boolean") {
                //                         thisResult = thisResult || row[column.columnName] == filter
                //                     } else if (row[column.columnName] == null) {
                //                         thisResult = thisResult || false
                //                     } else {
                //                         thisResult = thisResult || row[column.columnName].includes(filter)
                //                     }
                //                 })
                //                 result = result && thisResult
                //             })
                //             return result
                //         }
                //     }
                // ]

            }
        }
    },
    components: {
        TableFilter,
        ContentPanel
    },
    methods: {
        getProducts() {
            var ref = this
            this.$api
                .get('forecasts?avalanche_center_id=' + this.$centerId)
                .then(response => {
                    this.data = response.data
                    this.data.forEach(function (forecast, index) {
                        if (forecast.start_date) {
                            forecast.start_date = moment(forecast.start_date).format('YYYY-MM-DD')
                        }
                        switch (forecast.danger_rating) {
                            case 0:
                                forecast.danger_rating = ""
                                break
                            case 1:
                                forecast.danger_rating = "low"
                                break
                            case 2:
                                forecast.danger_rating = "moderate"
                                break
                            case 3:
                                forecast.danger_rating = "considerable"
                                break
                            case 4:
                                forecast.danger_rating = "high"
                                break
                            case 5:
                                forecast.danger_rating = "extreme"
                                break
                            default:
                                forecast.danger_rating = ""
                        }
                        switch (forecast.product_type) {
                            case "forecast":
                                forecast.product_type = "Avalanche Forecast"
                                break
                            case "weather":
                                forecast.product_type = "Weather Forecast"
                                break
                            case "synopsis":
                                forecast.product_type = "Regional Synopsis"
                                break
                            case "summary":
                                forecast.product_type = "Conditions Summary"
                                break
                        }
                        var zones = "";
                        forecast.forecast_zone.forEach(function (zone, index) {
                            if (index == 0) {
                                zones = zone.name
                            } else {
                                zones += ', ' + zone.name
                            }
                        })
                        forecast.forecast_zones = zones
                    })
                    this.$eventBus.$emit('loaded')
                    this.loaded = true
                })
                .catch(e => {
                    this.$eventBus.$emit('showAlert')
                    this.$eventBus.$emit('loaded')
                })
        }
    },
    mounted() {
        this.$eventBus.$emit('loading')
        this.getProducts()
        this.$eventBus.$on('refreshProducts', data => {
            this.getProducts()
        })
    }
}

</script>

<style module lang="scss">
@import "../assets/css/bootstrap/functions";
@import "../assets/css/_variables.scss";
@import "../assets/css/bootstrap/mixins";

.container {
    margin-bottom: $spacer;
}
</style>

<style scoped lang="scss">
@import "../assets/css/bootstrap/functions";
@import "../assets/css/_variables.scss";
@import "../assets/css/bootstrap/mixins";

.VueTables::v-deep {
    padding-bottom: 1rem;
    table {
        border-collapse: collapse;
        width: 100%;
        margin-bottom: $spacer;
        color: $table-color;
        background-color: $table-bg; // Reset for nesting within parents with `background-color`.

        th,
        td {
            padding: $table-cell-padding;
            vertical-align: top;
            border-top: $table-border-width solid $table-border-color;
        }

        thead th {
            vertical-align: bottom;
            border-bottom: (2 * $table-border-width) solid $table-border-color;
        }

        tbody + tbody {
            border-top: (2 * $table-border-width) solid $table-border-color;
        }
        th {
            font-family: $headings-font-family;
            font-weight: $headings-font-weight;
            font-size: $font-size-sm;
            text-transform: uppercase;
        }
        td,
        th {
            vertical-align: middle !important;
            border-top: none;
            &.afp-table-time,
            &.afp-table-product {
                width: 120px;
                max-width: 120px;
                min-width: 120px;
                white-space: initial !important;
            }
        }
        td.afp-table-product {
            text-transform: capitalize;
        }
    }
    .afp-danger {
        padding: 0.2rem 0.3rem;
        font-size: $font-size-sm;
        text-transform: uppercase;
        font-weight: bold;
        border-radius: $btn-border-radius-sm;
        &.afp-danger-low {
            background-color: $low;
        }

        &.afp-danger-moderate {
            background-color: $moderate;
        }

        &.afp-danger-considerable {
            background-color: $considerable;
        }

        &.afp-danger-high {
            background-color: $high;
        }

        &.afp-danger-extreme {
            background-color: $extreme;
            color: #fff !important;
        }
    }
    .VueTables__sort-icon {
        float: none !important;
        margin-left: 3px;
        &.mdi.mdi-sort {
            color: $gray-700;
        }
    }
    .VuePagination {
        nav {
            width: 100%;
            text-align: center;
            .afp-pagination {
                display: flex;
                @include list-unstyled();
                @include border-radius();
                justify-content: center;
            }
            .afp-page-link {
                position: relative;
                display: block;
                padding: $pagination-padding-y $pagination-padding-x;
                margin-left: -$pagination-border-width;
                line-height: $pagination-line-height;
                color: $gray-900 !important;
                background-color: $pagination-bg;
                border-radius: $border-radius;
                border: none;
                font-weight: bold;
                margin: 0 1px;
                &:hover {
                    color: $pagination-hover-color;
                    text-decoration: none;
                    background-color: $pagination-hover-bg;
                }

                &:focus {
                    outline: $pagination-focus-outline;
                }
            }
            .afp-page-item {
                &.afp-page-link-active .afp-page-link {
                    color: #fff !important;
                    background-color: $gray-600;
                }

                &.afp-page-link-disabled .afp-page-link {
                    color: $gray-300 !important;
                    cursor: not-allowed;
                    background-color: $pagination-disabled-bg;
                }
            }
        }
        .VuePagination__count {
            width: 100%;
            font-family: $headings-font-family;
            font-weight: $headings-font-weight;
            font-size: $font-size-sm;
            text-align: center;
        }
    }
    .afp-table-responsive {
        @include table-responsive;
        margin-top: 0;
    }
}
</style>
