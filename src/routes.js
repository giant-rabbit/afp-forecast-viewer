import Vue from 'vue'
import Router from 'vue-router'
import Forecast from './components/Forecast'
import Weather from './components/Weather'
import Synopsis from './components/Synopsis'
import Archive from './components/Archive'
import NotFound from './components/NotFound'

Vue.use( Router )

export default new Router({
	mode: 'hash', 
	routes: [
		// {
		// 	path: '/404/',
		// 	name: 'NotFound',
		// 	component: NotFound,
		// },
		{
			path: '/archive',
			name: 'Archive',
			component: Archive
		},
		{
			path: '/archive/:tab/',
			name: 'ArchiveTab',
			component: Archive
		},
		{
			path: '/weather',
			name: 'Weather',
			component: Weather,
		},
		// {
		// 	path: '/weather/:date/',
		// 	name: 'ArchivedWeather',
		// 	component: Weather,
		// },
		{
			path: '/synopsis',
			name: 'Synopsis',
			component: Synopsis,
		},
		// {
		// 	path: '/synopsis/:date/',
		// 	name: 'ArchivedSynopsis',
		// 	component: Synopsis,
		// },
		{
			path: '',
			name: 'Forecast',
			component: Forecast,
        },
		{
			path: '/:zone/',
			name: 'ZoneForecast',
			component: Forecast,
        },
		{
			path: '/:zone/:date/',
			name: 'ArchivedForecast',
			component: Forecast,
		},
		{
			path: '*',
			redirect: { name: 'Forecast' }
		}
	]
})
