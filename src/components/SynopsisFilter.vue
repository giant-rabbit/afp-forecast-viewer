<template>
    <div :class="$style.spacer">
        <div :class="$style.row">
            <!-- <div :class="[$style.column]">
                <select v-model="zoneFilter" :class="$style.select">
                    <option value>Filter by Zone</option>
                    <option
                        v-for="zone in centerMeta.zones"
                        :value="zone.name"
                        :key="zone.id"
                    >{{ zone.name }}</option>
                </select>
            </div>
            <div :class="[$style.column]">
                <select v-model="dangerFilter" :class="$style.select">
                    <option value>Filter by Danger</option>
                    <option
                        v-for="(rating, index) in danger"
                        :key="index"
                        :value="rating.value"
                    >{{ rating.name }}</option>
                </select>
            </div>-->
            <div :class="[$style.column]">
                <input
                    :class="$style.input"
                    placeholder="Filter by Date (YYYY or YYYY-MM-DD)"
                    v-model="dateFilter"
                    type="text"
                />
            </div>
            <div :class="[$style.columnButton]">
                <button
                    v-tooltip="'Clear filters'"
                    @click="resetTableFilter"
                    :class="$style.reset"
                    class="afp-btn-primary"
                >
                    <i class="mdi mdi-filter-remove"></i>
                </button>
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
            centerMeta: '',
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
            zoneFilter: '',
            filterQuery: [],
            dateFilter: ''
        }
    },
    props: ['data'],
    watch: {
        zoneFilter: function () {
            this.tableFilter()
        },
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
            if (this.zoneFilter.length != '') {
                var filter = {
                    columnName: "forecast_zones",
                    columnFilter: [this.zoneFilter]
                }
                this.filterQuery.push(filter)
            }
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
            this.zoneFilter = ''
            this.dangerFilter = ''
            this.dateFilter = ''
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

.row {
    width: 100%;
    display: flex;
}

.column,
.columnButton {
    padding: 0 0.1rem 0.5rem 0.1rem;
}

.column {
    width: calc(100% - 3rem);
    display: inline-block;
}

.columnButton {
    width: 3rem;
    display: inline-block;
}

@include media-breakpoint-up(md) {
    .column {
        width: 50%;
    }
}
@include media-breakpoint-up(lg) {
    .column {
        width: 33%;
    }
}

.input,
.select {
    display: block;
    width: 100%;
    height: 2.5rem;
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
.select {
    background-position: right 5px top 50%;
    background-repeat: no-repeat;
    background-image: url("data:image/svg+xml;utf8,<svg viewBox='0 0 140 140' width='16' height='16' xmlns='http://www.w3.org/2000/svg'><g><path d='m121.3,34.6c-1.6-1.6-4.2-1.6-5.8,0l-51,51.1-51.1-51.1c-1.6-1.6-4.2-1.6-5.8,0-1.6,1.6-1.6,4.2 0,5.8l53.9,53.9c0.8,0.8 1.8,1.2 2.9,1.2 1,0 2.1-0.4 2.9-1.2l53.9-53.9c1.7-1.6 1.7-4.2 0.1-5.8z' fill='@text-color'/></g></svg>");
    padding-right: 26px;
}

.reset {
    composes: btn from "../assets/css/style.css";
    composes: btn-primary from "../assets/css/style.css";
    display: block;
    width: 100%;
    height: 2.5rem;
}
</style>
