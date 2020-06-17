<template>
    <div class="afp-blog-archive">
        <forecast-filter :data="data" :blog="true" v-model="season" />
        <loader :show="!loaded" />
        <alert :show="error"/>
        <div v-show="loaded">
            <!-- <synopsis-filter :data="data" ref="synopsisFilter" key="synopsisFilter" /> -->
            <v-client-table
                :columns="columns"
                :data="data"
                :options="options"
                ref="synopsisTable"
                key="synopsisTable"
            >
                <div slot="start_date" slot-scope="props">
                    <!-- need logic for link based on product type -->
                    <router-link
                        class="afp-html-a"
                        v-tooltip="'View product'"
                        :to="{ name: 'ArchivedSynopsis', params: { date: props.row.start_date } }"
                    >{{props.row.start_date}}</router-link>
                </div>
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
import tableTheme from '../utils/vueTableTheme'
import tableTemplate from '../utils/vueTableTemplate'
import moment from 'moment'
Vue.use(ClientTable, {}, false, tableTheme, tableTemplate)


export default {
    data() {
        return {
            loaded: false,
            error: false,
            season: null,
            /**
             * Set up Vue Tables 2
             */
            columns: ['start_date', 'bottom_line'],
            data: [],
            options: {
                skin: 'table',
                columnsClasses: {
                    start_date: 'afp-table-time',
                },
                headings: {
                    bottom_line: "Title",
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
    components: {
        ForecastFilter,
        Loader,
        Alert
    },
    computed: {
        currentSeason: function () {
            var now = moment()
            if (now.isBefore(now.year() + '-08-31')) {
                return now.year()
            } else {
                return now.year() + 1
            }
        },
    },
    watch: {
        season: function () {
            this.getProducts()
        }
    },
    methods: {
        getProducts() {
            this.loaded = false
            var start = ""
            var end = ""
            if (this.season == null || this.season == 'current') {
                start = (this.currentSeason - 1) + "-09-01"
                end = this.currentSeason + "-08-31"
            } else {
                start = (this.season - 1) + "-09-01"
                end = this.season + "-08-31"
            }
            this.$api
                .get('/public/products?avalanche_center_id=' + this.$centerId + '&date_start=' + start + '&date_end=' + end)
                .then(response => {
                    this.data = response.data
                    // filter forecasts
                    this.data = this.data.filter(function (value, index, arr) {
                        return value.product_type == 'synopsis'
                    })
                    this.data.forEach(function (forecast, index) {
                        if (forecast.start_date) {
                            forecast.start_date = moment(forecast.start_date).format('YYYY-MM-DD')
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
        }

        th {
            font-family: $headings-font-family;
            font-weight: $headings-font-weight;
            font-size: $font-size-sm;
            text-transform: uppercase;
            padding: $table-cell-padding;
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
