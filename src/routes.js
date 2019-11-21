import Vue from 'vue'
import Router from 'vue-router'
import Forecast from './components/Forecast'
import Weather from './components/Weather'
import Synopsis from './components/Synopsis'
import Archive from './components/Archive'

Vue.use(Router)

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
			component: Archive,
			meta: { bodyClass: 'afp-archive' }
		},
		{
			path: '/archive/:tab/',
			name: 'ArchiveTab',
			component: Archive,
			meta: { bodyClass: 'afp-archive' }
		},
		{
			path: '/weather',
			name: 'Weather',
			component: Weather,
			meta: { bodyClass: 'afp-weather' }
		},
		// {
		// 	path: '/weather/:date/',
		// 	name: 'ArchivedWeather',
		// 	component: Weather,
		// },
		{
			path: '/blog',
			name: 'Synopsis',
			component: Synopsis,
			meta: { bodyClass: 'afp-synopsis' }
		},
		{
			path: '/blog/:date/',
			name: 'ArchivedSynopsis',
			component: Synopsis,
			meta: { bodyClass: 'afp-synopsis-archived' }
		},
		{
			path: '',
			name: 'Forecast',
			component: Forecast,
			meta: { bodyClass: 'afp-forecast' }
		},
		{
			path: '/:zone/',
			name: 'ZoneForecast',
			component: Forecast,
			meta: { bodyClass: 'afp-forecast' }
		},
		{
			path: '/:zone/:date/',
			name: 'ArchivedForecast',
			component: Forecast,
			meta: { bodyClass: 'afp-forecast-archive' }
		},
		{
			path: '*',
			redirect: { name: 'Forecast' }
		}
	],
	scrollBehavior(to, from, savedPosition) {
		return { x: 0, y: 0 }
	}
})
