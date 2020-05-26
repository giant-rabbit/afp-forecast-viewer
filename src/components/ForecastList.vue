<template>
    <div class="afp-forecast-archive">
        <loader :show="!loaded" />
        <alert :show="error"/>
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
                        class="afp-html-a"
                        v-tooltip="'View product'"
                        :to="{ name: 'ArchivedForecast', params: { zone: zoneName, date: props.row.start_date  }}"
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
    </div>
</template>

<script>
import Vue from 'vue'
import { ClientTable, Event } from 'vue-tables-2'
import ForecastFilter from '../components/ForecastFilter'
import Loader from '../components/Loader'
import Alert from '../components/Alert'
import tableTheme from '../vueTableTheme'
import tableTemplate from '../vueTableTemplate'
import moment from 'moment/src/moment.js'
Vue.use(ClientTable, {}, false, tableTheme, tableTemplate)


export default {
    data() {
        return {
            loaded: false,
            error: false,
            selected: [],
            /**
             * Set up Vue Tables 2
             */
            columns: ['start_date', 'danger_rating'],
            data: [],
            zoneName: '',
            options: {
                skin: 'table',
                columnsClasses: {
                    danger_rating: 'afp-table-dangerRating',
                    start_date: 'afp-table-time',
                },
                headings: {
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
                    noResults: "No products found",
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
    props: ['zone'],
    components: {
        ForecastFilter,
        Loader,
        Alert
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
                    // filter by zone
                    this.data = this.data.filter(function (value, index, arr) {
                        return value.product_type == 'forecast' || value.product_type == 'summary'
                    })
                    var ref = this
                    this.data = this.data.filter(function (value, index, arr) {
                        var i = 0
                        value.forecast_zone.forEach(zone => {
                            if (zone.id == ref.zone) {
                                i++
                            }
                        })
                        return i > 0
                    })
                    this.data.forEach(function (forecast, index) {
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
                    this.loaded = true
                })
                .catch(e => {
                    this.loaded = true
                    this.error = true
                })
        }
    },
    mounted() {
        this.zoneName = this.$route.params.product
        this.getProducts()
    }
}

</script>

<style scoped lang="scss">
@import "../assets/bootstrap4/functions";
@import "../assets/bootstrap4/_variables.scss";
@import "../assets/bootstrap4/mixins";

.VueTables::v-deep {
    padding-bottom: 1rem;
    .afp-table {
        th,
        td {
            padding: 0.3rem 0.75rem;
            border-top: none;
            &.afp-table-time {
                width: 140px;
                max-width: 140px;
                min-width: 140px;
                white-space: initial !important;
            }
            &.afp-table-dangerRating {
                min-width: 500px;
            }
        }

        th {
            font-family: $headings-font-family;
            font-weight: $headings-font-weight;
            font-size: $font-size-sm;
            text-transform: uppercase;
            padding: $table-cell-padding;
        }
    }

    .afp-danger {
        padding: 0.3rem 0.7rem;
        font-size: $font-size-sm;
        text-transform: uppercase;
        font-weight: bold;
        display: block;
        &.afp-danger-no.rating {
            background-color: $no-rating;
            width: 100%;
        }
        &.afp-danger-low {
            background-color: $low;
            width: 20%;
        }

        &.afp-danger-moderate {
            background-color: $moderate;
            width: 40%;
        }

        &.afp-danger-considerable {
            background-color: $considerable;
            width: 60%;
        }

        &.afp-danger-high {
            background-color: $high;
            width: 80%;
        }

        &.afp-danger-extreme {
            background-color: $extreme;
            color: #fff !important;
            width: 100%;
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
        .afp-page-link {
            border-radius: $border-radius;
            font-weight: bold;
            margin: 0 1px;
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
