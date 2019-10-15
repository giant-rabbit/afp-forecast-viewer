<template>
    <div>Custom Tab</div>
</template>

<script>
export default {
    props: ['tab'],
    mounted() {
        // this.$nextTick(() => {
            var event = new Event( this.tab + '-tab-loaded')
            window.dispatchEvent(event)
        // })
    }
}
</script>