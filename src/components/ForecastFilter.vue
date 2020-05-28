<template>
    <div class="afp-filter afp-mb-2">
        <div class="afp-filter-row">
            <div class="afp-filter-column">
                <select v-model="dangerFilter" @change="uiClick('forecast filter » danger')" class="afp-html-select afp-form-control afp-custom-select" >
                    <option class="afp-html-option" value>Filter by Danger</option>
                    <option class="afp-html-option"
                        v-for="(rating, index) in danger"
                        :key="index"
                        :value="rating.value"
                    >{{ rating.name }}</option>
                </select>
            </div>
            <div class="afp-filter-column">
                <input
                    class="afp-html-input afp-form-control"
                    placeholder="Filter by Date (YYYY or YYYY-MM-DD)"
                    v-model="dateFilter"
                    @click="uiClick('forecast filter » year')"
                    type="text"
                />
            </div>
            <div class="afp-filter-columnButton">
                <button
                    v-tooltip="'Clear filters'"
                    @click="resetTableFilter"
                    class="afp-html-button afp-btn afp-btn-primary"
                ><i class="mdi mdi-filter-remove"></i></button>
            </div>
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
            centerMeta: this.$centerMeta,
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
            dangerFilter: '',
            filterQuery: [],
            dateFilter: ''
        }
    },
    props: ['data'],
    watch: {
        dangerFilter: function () {
            this.tableFilter()
        },
        dateFilter: function () {
            this.tableFilter()
        },
    },
    methods: {
        tableFilter() {
            this.filterQuery = []
            if (this.dangerFilter.length != '') {
                var filter = {
                    columnName: "danger_rating",
                    columnFilter: [this.dangerFilter]
                }
                this.filterQuery.push(filter)
            }
            if (this.dateFilter != '') {
                var filter = {
                    columnName: "start_date",
                    columnFilter: [this.dateFilter]
                }
                this.filterQuery.push(filter)
            }
            Event.$emit('vue-tables.filter::multiFilter', this.filterQuery);
        },
        resetTableFilter() {
            this.dangerFilter = ''
            this.dateFilter = ''
            this.tableFilter()
        }
    },
    mounted() {

    }
}

</script>

<style scoped lang="scss">
@import "../assets/bootstrap4/functions";
@import "../assets/bootstrap4/_variables.scss";
@import "../assets/bootstrap4/mixins";

.afp-filter {
    .afp-filter-column,
    .afp-filter-columnButton {
        padding: 0 0.1rem 0.5rem 0.1rem;
        display: block;
        width: 100%;
    }

    @include media-breakpoint-up(sm) {
        .afp-filter-row {
            width: 100%;
            display: flex;
        }

        .afp-filter-column {
            width: calc(50% - 1rem);
            display: inline-block;
        }

        .afp-filter-columnButton {
            width: 3rem;
            display: inline-block;
        }
    }

    .afp-html-button {
        display: block;
        width: 100%;
        height: 2.5rem;
        padding: .375rem .75rem;
    }
}
</style>
