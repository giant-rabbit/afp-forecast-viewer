import Vue from 'vue'
import Router from 'vue-router'
import Forecast from './components/Forecast'
import Weather from './components/Weather'
import Synopsis from './components/Synopsis'
import Archive from './components/Archive'
//import AllZonesForecast from './components/AllZonesForecast'

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
			path: '/archive/:product/',
			name: 'ArchiveProduct',
			component: Archive,
			meta: { bodyClass: 'afp-archive' }
		},
		{
			path: '/weather',
			name: 'Weather',
			component: Weather,
			meta: { bodyClass: 'afp-weather' }
		},
		{
			path: '/blog',
			name: 'Synopsis',
			component: Synopsis,
			meta: { bodyClass: 'afp-blog' }
		},
		{
			path: '/blog/:date/',
			name: 'ArchivedSynopsis',
			component: Synopsis,
			meta: { bodyClass: 'afp-blog-archived' }
		},
		// {
		// 	path: '',
		// 	name: 'AllZonesForecast',
		// 	component: AllZonesForecast,
		// 	meta: { bodyClass: 'afp-forecast' }
		// },
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
			meta: { bodyClass: 'afp-forecast-archived' }
		},
		{
			path: '*',
			redirect: { name: 'AllZonesForecast' },
			meta: { bodyClass: 'afp-forecast' }
		}
	],
	scrollBehavior(to, from, savedPosition) {
		return { x: 0, y: 0 }
	}
})
