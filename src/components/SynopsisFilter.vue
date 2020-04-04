<template>
    <div class="afp-filter afp-mb-2">
        <div class="afp-filter-row">
            <div class="afp-filter-column">
                <input
                    class="afp-html-input afp-form-control"
                    placeholder="Filter by Date (YYYY or YYYY-MM-DD)"
                    v-model="dateFilter"
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
            dateFilter: '',
            filterQuery: []
        }
    },
    props: ['data'],
    watch: {
        dateFilter: function () {
            this.filterQuery = []
            this.tableFilter()
        },
    },
    methods: {
        tableFilter() {
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
            this.dateFilter = ''
            this.filterQuery = []
        },
    },
    mounted() {
    }
}

</script>

<style scoped lang="scss">
@import "../assets/css/bootstrap/functions";
@import "../assets/css/_variables.scss";
@import "../assets/css/bootstrap/mixins";
.afp-filter {
    .afp-filter-column,
    .afp-filter-columnButton {
        padding: 0 0.1rem 0.5rem 0.1rem;
    }

    .afp-filter-column {
        width: calc(100% - 3rem);
        display: inline-block;
    }

    .afp-filter-columnButton {
        width: 3rem;
        display: inline-block;
    }

    @include media-breakpoint-up(md) {
        .afp-filter-column {
            width: 50%;
        }
    }
    @include media-breakpoint-up(lg) {
        .afp-filter-column {
            width: 33%;
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