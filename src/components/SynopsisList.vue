<template>
    <div v-show="loaded">
        <synopsis-filter :data="data" ref="synopsisFilter" key="synopsisFilter" />
        <v-client-table :columns="columns" :data="data" :options="options" ref="synopsisTable" key="synopsisTable">
            <div slot="start_date" slot-scope="props">
                <!-- need logic for link based on product type -->
                <router-link
                    class
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
