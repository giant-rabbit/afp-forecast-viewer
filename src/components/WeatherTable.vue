<template>
    <div v-if="data.hasOwnProperty('columns')" class="afp-weather-table afp-my-3">
        <table class="afp-html-table afp-table">
            <thead>
                <tr v-for="(headingRow, rowIndex) in data.columns" :key="'headingRow'+rowIndex">
                    <th
                        class="afp-table-title"
                        v-if="rowIndex == 0"
                        :rowspan="data.columns.length"
                    >{{data.zone_name}}</th>
                    <th
                        v-for="(heading, index) in headingRow"
                        :key="'heading'+index"
                        :colspan="heading.hasOwnProperty('colspan') ? heading.colspan : 1"
                        :rowspan="heading.hasOwnProperty('rowspan') ? heading.rowspan : 1"
                        :width="heading.hasOwnProperty('width') ? heading.width + '%' : ''"
                    >
                        <label class="afp-html-label">{{heading.heading}}</label>
                        <span>{{heading.subheading}}</span>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(row, rowIndex) in data.rows" :key="'row'+rowIndex">
                    <td class="afp-table-rowHeader">
                        <label class="afp-html-label">
                            {{row.heading}}
                            <!-- <span v-if="row.unit">({{row.unit}})</span> -->
                            <info v-if="row.help" :content="row.help" />
                        </label>
                    </td>

                    <td
                        v-for="(column, colIndex) in data.data[rowIndex]"
                        :key="'cell-'+colIndex+'-'+rowIndex"
                        :colspan="data.data[rowIndex][colIndex].hasOwnProperty('colspan') ? data.data[rowIndex][colIndex].colspan : 1"
                    >
                        <label v-if="data.data[rowIndex][colIndex].value != '' && data.data[rowIndex][colIndex].value != '-'" class="afp-html-label">{{data.data[rowIndex][colIndex].prefix}}</label>
                        {{data.data[rowIndex][colIndex].value}}
                        <span
                            v-if="data.data[rowIndex][colIndex].value != '' && data.data[rowIndex][colIndex].value != '-'"
                        >{{row.unit}}</span>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>

export default {
    props: ['data', 'zone'],
}

</script>
<style scoped lang="scss">
@import "../assets/bootstrap4/_functions.scss";
@import "../assets/bootstrap4/_variables.scss";
@import "../assets/bootstrap4/_mixins.scss";

.afp-weather-table {
    @include table-responsive;
    .afp-table {
        border-bottom: $table-border-width solid $table-border-color;
        .afp-html-label {
            margin-bottom: 0;
        }
        th.afp-table-title {
            font-size: $font-size-base;
            font-weight: $headings-font-weight;
            background-color: $gray-200;
            width: 275px;
            max-width: 275px;
            min-width: 275px;
            white-space: normal !important;
        }
        td.afp-table-rowHeader {
            text-align: left;
        }
        th span {
            font-size: $font-size-sm;
            font-weight: normal;
            margin-left: 0.3rem;
        }
        th,
        td {
            vertical-align: middle;
            text-align: center;
        }
        .afp-html-table {
            width: 100%;
            td {
                width: 50%;
                border: none;
                padding: 0 0.2rem;
                vertical-align: middle;
                text-align: left;
                &:first-of-type {
                    text-align: right;
                }
            }
        }
    }
}
</style>