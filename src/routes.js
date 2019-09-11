import Vue from 'vue'
import Router from 'vue-router'
import Forecast from './components/Forecast'
import Archive from './components/Archive'

Vue.use( Router )

export default new Router({
	mode: 'hash', 
	routes: [
		{
			path: '/archive',
			name: 'Archive',
			component: Archive
        },
		{
			path: '/forecast/:zone/',
			name: 'Forecast',
			component: Forecast,
        },
		{
			path: '/forecast/:zone/:date/',
			name: 'ArchivedForecast',
			component: Forecast,
		},
		{
			path: '*',
			redirect: { name: 'Archive' }
		}
	]
})
