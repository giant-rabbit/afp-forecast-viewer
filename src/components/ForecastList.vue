<template>
    <div v-show="loaded">
        <forecast-filter :data="data" ref="forecastFilter" key="forecastFilter" />
        <v-client-table
            :columns="columns"
            :data="data"
            :options="options"
            ref="forecastTable"
            key="forecastTable"
        >
            <div slot="start_date" slot-scope="props">
                <router-link
                    class
                    v-tooltip="'View product'"
                    :to="{ name: 'ArchivedForecast', params: { zone: urlString(props.row.forecast_zone[0].name), date: props.row.start_date  }}"
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
    </div>
</template>

<script>
import Vue from 'vue'
import { ClientTable, Event } from 'vue-tables-2'
import ForecastFilter from '../components/ForecastFilter'
import tableTheme from '../vueTableTheme'
import tableTemplate from '../vueTableTemplate'
import moment from 'moment/src/moment.js'
Vue.use(ClientTable, {}, false, tableTheme, tableTemplate)


export default {
    data() {
        return {
            loaded: false,
            selected: [],
            /**
             * Set up Vue Tables 2
             */
            columns: ['start_date', 'danger_rating', 'forecast_zones'],
            data: [],
            options: {
                skin: 'table',
                columnsClasses: {
                    forecast_zones: 'afp-table-zones',
                    danger_rating: 'afp-table-danger',
                    start_date: 'afp-table-time',
                },
                headings: {
                    forecast_zones: 'Zones',
                    danger_rating: "Danger",
                    start_date: 'Published',
                },
                orderBy: {
                    column: 'start_date',
                    ascending: false
                },
                sortable: ['start_date'],
                filterable: true,
                perPage: 100,
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
                //saveState: true,
                customFilters: [
                    {
                        name: 'multiFilter',
                        callback: function (row, query) {
                            var result = true
                            query.forEach(function (column, index) {
                                var thisResult = false
                                column.columnFilter.forEach(function (filter, index) {
                                    if (typeof filter === "boolean") {
                                        thisResult = thisResult || row[column.columnName] == filter
                                    } else if (row[column.columnName] == null) {
                                        thisResult = thisResult || false
                                    } else {
                                        thisResult = thisResult || row[column.columnName].includes(filter)
                                    }
                                })
                                result = result && thisResult
                            })
                            return result
                        }
                    }
                ]

            }
        }
    },
    components: {
        ForecastFilter
    },
    methods: {
        urlString(string) {
            string = string.replace(/ /g, '-')
            string = string.toLowerCase()
            return string
        },
        getProducts() {
            var ref = this
            this.$api
                .get('/public/products?avalanche_center_id=' + this.$centerId)
                .then(response => {
                    this.data = response.data
                    this.data = this.data.filter(function (value, index, arr) {
                        return value.product_type == 'forecast' || value.product_type == 'summary'
                    })
                    var zones = ""
                    this.data.forEach(function (forecast, index) {
                        forecast.forecast_zone.forEach(function (zone, index) {
                            if (index == 0) {
                                zones = zone.name
                            } else {
                                zones += ', ' + zone.name
                            }
                        })
                        forecast.forecast_zones = zones
                        var time = moment(forecast.start_date).startOf('day').hour(14)
                        if (moment(forecast.start_date).isAfter(time)) {
                            forecast.start_date = moment(forecast.start_date).add(1, 'days')
                        }
                        forecast.start_date = moment(forecast.start_date).format('YYYY-MM-DD')
                        switch (forecast.danger_rating) {
                            case 0:
                                forecast.danger_rating = "no rating"
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
                                forecast.danger_rating = "no rating"
                        }
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
    }
}

</script>

<style module lang="scss">
@import "../assets/css/bootstrap/functions";
@import "../assets/css/_variables.scss";
@import "../assets/css/bootstrap/mixins";

.container,
.title {
    margin-bottom: $spacer !important;
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
            &.afp-table-time {
                width: 140px;
                max-width: 140px;
                min-width: 140px;
                white-space: initial !important;
            }
            &.afp-table-danger {
                width: 160px;
                max-width: 160px;
                min-width: 160px;
                white-space: initial !important;
            }
        }
    }
    .afp-danger {
        padding: 0.2rem 0.3rem;
        font-size: $font-size-sm;
        text-transform: uppercase;
        font-weight: bold;
        border-radius: $btn-border-radius-sm;
        display: block;
        text-align: center;
        &.afp-danger-no.rating {
            background-color: $no-rating;
        }
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
    .VueTables__sortable {
        cursor: pointer;
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
