<template>
    <div class="afp-filter afp-mb-2">
        <div class="afp-filter-row">
            <div :class="blog ? 'afp-filter-column-half' : 'afp-filter-column-third'">
                <select
                    v-model="seasonFilter"
                    @change="uiClick('forecast filter » season')"
                    class="afp-html-select afp-form-control afp-custom-select"
                >
                    <option
                        class="afp-html-option"
                        v-for="(season, index) in seasons"
                        :key="index"
                        :value="season.value"
                    >{{ season.name }}</option>
                </select>
            </div>
            <div v-if="!blog" class="afp-filter-column-third">
                <select
                    v-model="dangerFilter"
                    @change="uiClick('forecast filter » danger')"
                    class="afp-html-select afp-form-control afp-custom-select"
                >
                    <option
                        class="afp-html-option"
                        v-for="(rating, index) in danger"
                        :key="index"
                        :value="rating.value"
                    >{{ rating.name }}</option>
                </select>
            </div>
            <div :class="blog ? 'afp-filter-column-half' : 'afp-filter-column-third'">
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
                >
                    <i class="mdi mdi-filter-remove"></i>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import { Event } from 'vue-tables-2'
import moment from 'moment'

export default {
    data() {
        return {
            show: false,
            centerMeta: this.$centerMeta,
            danger: [
                {
                    name: 'All Danger Ratings',
                    value: 'all'
                },
                {
                    name: 'No Rating',
                    value: 'no rating'
                },
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
            seasons: [],
            seasonFilter: 'current',
            dangerFilter: 'all',
            filterQuery: [],
            dateFilter: ''
        }
    },
    props: ['data', 'blog'],
    watch: {
        value: function () {
            this.seasonFilter = this.value
        },
        seasonFilter: function () {
            this.$emit('input', this.seasonFilter)
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
            if (this.dangerFilter != 'all') {
                var filter = {
                    columnName: "danger_rating",
                    columnFilter: [this.dangerFilter]
                }
                this.filterQuery.push(filter)
            }
            if (this.dateFilter != '') {
                var filter2 = {
                    columnName: "start_date",
                    columnFilter: [this.dateFilter]
                }
                this.filterQuery.push(filter2)
            }
            Event.$emit('vue-tables.filter::multiFilter', this.filterQuery);
        },
        resetTableFilter() {
            this.seasonFilter = 'current'
            this.dangerFilter = 'all'
            this.dateFilter = ''
            this.tableFilter()
        }
    },
    mounted() {
        // Populate season options
        var now = moment()
        var season
        if (now.isBefore(now.year() + '-08-31')) {
            season = now.year()
        } else {
            season = now.year() + 1
        }
        let item = {}
        item.name = 'Current Season'
        item.value = 'current'
        this.seasons.push(item)
        season--
        while (season > 2019) {
            let item = {}
            item.name = (season - 1) + '-' + (season - 2000) + ' Season'
            item.value = season
            this.seasons.push(item)
            season--
        }
    }
}

</script>

<style scoped lang="scss">
@import "../assets/bootstrap4/functions";
@import "../assets/bootstrap4/_variables.scss";
@import "../assets/bootstrap4/mixins";

.afp-filter {
    .afp-filter-column-half,
    .afp-filter-column-third,
    .afp-filter-columnButton {
        padding: 0 0.1rem 0.5rem 0.1rem;
        display: block;
        width: 100%;
    }

    @include media-breakpoint-up(md) {
        .afp-filter-row {
            width: 100%;
            display: flex;
        }

        .afp-filter-column-third {
            width: calc(33% - 1rem);
            display: inline-block;
        }
        .afp-filter-column-half {
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
        padding: 0.375rem 0.75rem;
    }
}
</style>
