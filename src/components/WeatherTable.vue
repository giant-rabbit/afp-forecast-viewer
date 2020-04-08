<template>
    <div class="afp-weather-table afp-my-3">
        <table class="afp-html-table afp-table">
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
                        <info v-if="row.field == 'Ridgeline Wind Speed'" content="<h5 class='afp-html-h5'>Ridgetop Wind Speed</h5><strong>CALM</strong> - No air motion. Smoke rises vertically.<br><strong>LIGHT</strong> - Light to gentle breeze, flags and twigs in motion.<br><strong>MODERATE</strong> - Fresh breeze. Small trees sway. Flags stretched. Snow begins to drift.<br><strong>STRONG</strong> - Strong breeze. Whole trees in motion.<br><strong>EXTREME</strong> - Gale force or higher. " />
                        <info v-if="row.field == 'Snowfall'" content="<h5 class='afp-html-h5'>Snowfall</h5>Values are estimates from middle and upper elevation.<br><strong>24hr</strong> - Snow total from yesterday morning through this morning.<br><strong>12hr</strong> - Snow total from last night through this morning." />
                        <info v-if="row.field == 'Snow Water Equivalent'" content="<h5 class='afp-html-h5'>Snow Water Equivalent (SWE)</h5>The depth of water that would result if you melted the snowfall. SWE is a better estimate of weight added to the snowpack than snowfall." />
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
        </table>
    </div>
</template>

<script>

export default {
    props: ['data', 'periods', 'zone'],
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
        th,
        td {
            vertical-align: middle;
            text-align: center;
            &:first-of-type {
                text-align: left;
                width: 300px;
            }
        }
        th {
            &::v-deep {
                font-family: $headings-font-family;
                font-size: $font-size-sm;
                text-transform: capitalize;
                font-weight: normal;
                span {
                    font-weight: bold;
                    margin-right: 0.5rem;
                }
            }
            &:first-of-type {
                font-size: $font-size-base;
                font-weight: $headings-font-weight;
                background-color: $gray-200;
            }
        }
        .afp-table-splitCell:first-of-type {
            padding-right: 15px;
        }
    }
}
</style>