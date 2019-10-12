<template>
    <div :class="$style.tableResponsive">
        <table :class="$style.table" >
            <thead>
                <tr>
                    <th>{{zone}}</th>
                    <th v-for="(heading, index) in periods" :key="index" v-html="heading"></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(row, rowIndex) in data" :key="rowIndex">
                    <td>
                        <label>{{row.field}}</label>
                    </td>
                    <td v-for="(column, index) in row.values" :key="index">{{column}}</td>
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
<style module lang="scss">
@import "../assets/css/bootstrap/functions";
@import "../assets/css/_variables.scss";
@import "../assets/css/bootstrap/mixins/breakpoints";

.table {
       border-collapse: collapse;
        width: 100%;
        margin-bottom: $spacer;
        color: $table-color;
        background-color: $table-bg; // Reset for nesting within parents with `background-color`.
        border-bottom: $table-border-width solid $table-border-color;
        th,
        td {
            padding: $table-cell-padding;
            vertical-align: top;
            border-top: $table-border-width solid $table-border-color;
            text-align: center;
            &:first-of-type {
                text-align: left;
                width: 300px;
            }
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
        font-size: $font-size-sm;
        text-transform: capitalize;
        font-weight: normal;
        //border-top: 1px solid $border-color !important;
        span {
            font-weight: $headings-font-weight;
            margin-right: 0.5rem;
        }
    }
    td,
    th {
        vertical-align: middle !important;
    }
    th:first-of-type {
        font-size: $font-size-base;
        font-weight: $headings-font-weight;
        background-color: $gray-200;
    }
}
.tableResponsive {
    composes: table-responsive from "../assets/css/style.css";
}
</style>