<template>
    <div class="afp-blog-archive" v-show="loaded">
        <synopsis-filter :data="data" ref="synopsisFilter" key="synopsisFilter" />
        <v-client-table :columns="columns" :data="data" :options="options" ref="synopsisTable" key="synopsisTable">
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
</template>

<script>
import Vue from 'vue'
import { ClientTable, Event } from 'vue-tables-2'
import SynopsisFilter from '../components/SynopsisFilter'
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
                perPage: 20,
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
        SynopsisFilter
    },
    methods: {
        getProducts() {
            var ref = this
            this.$api
                .get('/public/products?avalanche_center_id=' + this.$centerId)
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

<style scoped lang="scss">
@import "../assets/css/bootstrap/functions";
@import "../assets/css/_variables.scss";
@import "../assets/css/bootstrap/mixins";

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
