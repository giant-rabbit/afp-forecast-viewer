import Vue from 'vue'
import Router from 'vue-router'
import Forecast from './views/Forecast'
import Weather from './views/Weather'
import Synopsis from './views/Synopsis'
import Archive from './views/Archive'
import AllZonesForecast from './views/AllZonesForecast'

Vue.use(Router)

export default new Router({
	mode: 'hash',
	routes: [
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
		{
			path: '/all',
			name: 'AllZonesForecast',
			component: AllZonesForecast,
			meta: { bodyClass: 'afp-forecast' }
		},
		// {
		// 	path: '',
		// 	name: 'Forecast',
		// 	component: Forecast,
		// 	meta: { bodyClass: 'afp-forecast' }
		// },
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
		if (savedPosition) {
			return savedPosition
		} else {
			return { x: 0, y: 0 }
		}
	}
})
