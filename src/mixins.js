import Vue from 'vue'

Vue.mixin({
    methods: {
        trackPage(title) {
            this.$gtag.pageview({
                page_title: 'AFP Viewer » ' + title,
                page_path: this.$config.baseUrl + '/#' + this.$router.currentRoute.path
            })
        }
    
    }
})