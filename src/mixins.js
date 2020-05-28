import Vue from 'vue'

Vue.mixin({
    methods: {
        // GA tracking methods
        trackPage(title) {
            this.$gtag.pageview({
                page_title: 'AFP Viewer » ' + title,
                page_path: this.$config.baseUrl + '/#' + this.$router.currentRoute.path
            })
        },
        uiClick(name){
            this.$gtag.event('Forecast UI Click', {
                'event_category': 'AFP Forecast Viewer',
                'event_label': name
            })
        }

    
    }
})