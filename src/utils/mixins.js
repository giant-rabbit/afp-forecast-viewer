import Vue from 'vue'
import moment from 'moment'

Vue.mixin({
    methods: {
        // Utilities
        getUrl(item, size) {
            if (item.url.hasOwnProperty(size)) {
                return item.url[size]
            } else {
                if (item.type == 'video' && size == 'video_id') {
                    return item.url
                } else if (item.type == 'video' && size != 'video_id') {
                    return 'https://img.youtube.com/vi/' + item.url + '/mqdefault.jpg'
                } else {
                    return item.url
                }
            }
        },
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
        },
        toYear(date) {
            return moment(date).format('YYYY')
        },
        toMonth(date) {
            return moment(date).format('MM')
        },
        toDay(date) {
            return moment(date).format('DD')
        },
    }
})