<template>
    <div v-show="loaded">
        <h1>Forecast Archive</h1>
        <table-filter :data="data" ref="filter" />
        <v-client-table :columns="columns" :data="data" :options="options" ref="table">
            <div slot="date_id" slot-scope="props">
                <router-link
                    class
                    v-tooltip="'View product'"
                    :to="{ name: 'ArchivedForecast', params: { zone: 'sawtooth', date: props.row.date_id  }}"
                >View</router-link>
            </div>
            <span slot="start_date_iso" slot-scope="props">{{props.row.start_date_iso | formatDate}}</span>
            <span slot="end_date_iso" slot-scope="props">{{props.row.end_date_iso | formatDate}}</span>
        </v-client-table>
    </div>
</template>

<script>
import Vue from 'vue'
import { ClientTable, Event } from 'vue-tables-2'
import moment from 'moment'
import TableFilter from '../components/TableFilter'
import tableTheme from '../vueTableTheme'
import tableTemplate from '../vueTableTemplate'
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
            columns: ['date_id', 'start_date_iso', 'end_date_iso', 'product', 'forecast_zones'],
            data: [],
            options: {
                skin: 'table',
                columnsClasses: {
                    date_id: 'afp-table-view',
                    product: 'afp-table-product',
                    forecast_zones: 'afp-table-zones',
                    start_date_iso: 'afp-table-time',
                    end_date_iso: 'afp-table-time'
                },
                headings: {
                    date_id: '',
                    product: "Product",
                    forecast_zones: 'Zones',
                    start_date_iso: 'Published',
                    end_date_iso: 'Expires',
                },
                orderBy: {
                    column: 'start_date_iso',
                    ascending: false
                },
                sortable: ['start_date_iso', 'end_date_iso', 'product'],
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
        TableFilter,
    },
    methods: {
        getProducts() {
            var ref = this
            setTimeout(function () {
                ref.loaded = true
                ref.$eventBus.$emit('loaded')
            }, 500)
            // this.$api
            //     .get('/warning/get-all-warnings-by-center/' + this.$centerId)
            //     .then(response => {
            //         this.data = response.data
            //         this.data.forEach(function (row, index) {
            //             row.date_id = moment(row.start_date_iso).format('YYYY-MM-DD')
            //         })
            //         this.$eventBus.$emit('loaded')
            //         this.loaded = true
            //     })
            //     .catch(e => {
            //         this.$eventBus.$emit('showAlert')
            //         this.$eventBus.$emit('loaded')
            //     })
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
</style>

<style scoped lang="scss">
@import "../assets/css/bootstrap/functions";
@import "../assets/css/_variables.scss";
@import "../assets/css/bootstrap/mixins";

.VueTables::v-deep {
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
            //text-transform: uppercase;
        }
        td,
        th {
            vertical-align: middle !important;
            &.afp-table-view {
                width: 60px;
                max-width: 60px;
                min-width: 60px;
                white-space: initial !important;
            }
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
                color: $pagination-color;
                background-color: $pagination-bg;
                border-radius: $border-radius;
                border: none;
                color: $gray-700;
                font-weight: bold;
                margin: 0 1px;
                &:hover {
                    color: $pagination-hover-color;
                    text-decoration: none;
                    background-color: $pagination-hover-bg;
                }

                &:focus {
                    outline: $pagination-focus-outline;
                    box-shadow: $pagination-focus-box-shadow;
                }
            }
            .afp-page-item {
                &.afp-page-link-active .afp-page-link {
                    color: $pagination-active-color;
                    background-color: $pagination-active-bg;
                }

                &.afp-page-link-disabled .afp-page-link {
                    color: $pagination-disabled-color;
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
    }
}
</style>
