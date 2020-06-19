<template>
    <div class="afp-weather-table afp-my-3">
        <!-- <table class="afp-html-table afp-table">
            <thead>
                <tr>
                    <th>{{zone}}</th>
                    <th v-for="(heading, index) in periods" :key="index" v-html="heading"></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(row, rowIndex) in data" :key="rowIndex">
                    <td>
                        <label class="afp-html-label">{{row.field}}</label>
                        <info
                            v-if="row.field == 'Ridgeline Wind Speed'"
                            content="<h5 class='afp-html-h5'>Ridgetop Wind Speed</h5><strong>CALM</strong> - No air motion. Smoke rises vertically.<br><strong>LIGHT</strong> - Light to gentle breeze, flags and twigs in motion.<br><strong>MODERATE</strong> - Fresh breeze. Small trees sway. Flags stretched. Snow begins to drift.<br><strong>STRONG</strong> - Strong breeze. Whole trees in motion.<br><strong>EXTREME</strong> - Gale force or higher. "
                        />
                        <info
                            v-if="row.field == 'Snowfall'"
                            content="<h5 class='afp-html-h5'>Snowfall</h5>Values are estimates from middle and upper elevation.<br><strong>24hr</strong> - Snow total from yesterday morning through this morning.<br><strong>12hr</strong> - Snow total from last night through this morning."
                        />
                        <info
                            v-if="row.field == 'Snow Water Equivalent'"
                            content="<h5 class='afp-html-h5'>Snow Water Equivalent (SWE)</h5>The depth of water that would result if you melted the snowfall. SWE is a better estimate of weight added to the snowpack than snowfall."
                        />
                    </td>
                    <td v-for="(column, index) in row.values" :key="index">
                        <span v-if="typeof column === 'string'">
                            {{column}}
                            <span v-if="row.unit != '' && column != ''">{{row.unit}}</span>
                        </span>
                        <span v-else>
                            <span class="afp-table-splitCell">
                                <label class="afp-html-label">{{column[0].label}}:</label>
                                {{column[0].value}}
                                <span
                                    v-if="row.unit != '' && column[0].value != ''"
                                >{{row.unit}}</span>
                            </span>
                            <span class="afp-table-splitCell">
                                <label class="afp-html-label">{{column[1].label}}:</label>
                                {{column[1].value}}
                                <span
                                    v-if="row.unit != '' && column[1].value != ''"
                                >{{row.unit}}</span>
                            </span>
                        </span>
                    </td>
                </tr>
            </tbody>
        </table>-->

        <!-- new table -->
        <table class="afp-html-table afp-table">
            <thead>
                <tr v-for="(headingRow, rowIndex) in data.columns" :key="'headingRow'+rowIndex">
                    <th
                        class="afp-table-title"
                        v-if="rowIndex == 0"
                        :rowspan="data.columns.length"
                    >{{zone}}</th>
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
                            <span v-if="row.unit != null">({{row.unit}})</span>
                        </label>
                    </td>

                    <td
                        v-for="(column, colIndex) in data.data[rowIndex]"
                        :key="'cell-'+colIndex+'-'+rowIndex"
                        :colspan="data.data[rowIndex][colIndex].hasOwnProperty('colspan') ? data.data[rowIndex][colIndex].colspan : 1"
                    >
                        <!-- <table
                            v-if="data.data[rowIndex][colIndex].hasOwnProperty('prefix')"
                            class="afp-html-table"
                        >
                            <tr>
                                <td>
                                    <label
                                        class="afp-html-label"
                                    >{{data.data[rowIndex][colIndex].prefix}}</label>
                                </td>
                                <td>{{data.data[rowIndex][colIndex].value}}</td>
                            </tr>
                        </table>
                        <span v-else>{{data.data[rowIndex][colIndex].value}}</span>-->
                        <label class="afp-html-label">{{data.data[rowIndex][colIndex].prefix}}</label>
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
            width: 250px;
            max-width: 250px;
            min-width: 250px;
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