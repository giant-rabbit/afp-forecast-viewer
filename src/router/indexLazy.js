// import Forecast from './views/Forecast'
// import Weather from './views/Weather'
// import Synopsis from './views/Synopsis'
// import Archive from './views/Archive'
// import AllZonesForecast from './views/AllZonesForecast'

import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
	{
		path: '/archive',
		name: 'Archive',
		component: () => import(/* webpackChunkName: "forecast" */ '../views/Archive'),
		meta: { bodyClass: 'afp-archive' }
	},
	{
		path: '/archive/:product/',
		name: 'ArchiveProduct',
		component: () => import(/* webpackChunkName: "archive" */ '../views/Archive'),
		meta: { bodyClass: 'afp-archive' }
	},
	{
		path: '/weather',
		name: 'Weather',
		component: () => import(/* webpackChunkName: "weather" */ '../views/Weather'),
		meta: { bodyClass: 'afp-weather' }
	},
	{
		path: '/blog',
		name: 'Synopsis',
		component: () => import(/* webpackChunkName: "synopsis" */ '../views/Synopsis'),
		meta: { bodyClass: 'afp-blog' }
	},
	{
		path: '/blog/:date/',
		name: 'ArchivedSynopsis',
		component: () => import(/* webpackChunkName: "synopsis" */ '../views/Synopsis'),
		meta: { bodyClass: 'afp-blog-archived' }
	},
	{
		path: '/all',
		name: 'AllZonesForecast',
		component: () => import(/* webpackChunkName: "allzonesforecast" */ '../views/AllZonesForecast'),
		meta: { bodyClass: 'afp-forecast' }
	},
	{
		path: '/:zone/',
		name: 'ZoneForecast',
		component: () => import(/* webpackChunkName: "forecast" */ '../views/Forecast'),
		meta: { bodyClass: 'afp-forecast' }
	},
	{
		path: '/:zone/:date/',
		name: 'ArchivedForecast',
		component: () => import(/* webpackChunkName: "forecast" */ '../views/Forecast'),
		meta: { bodyClass: 'afp-forecast-archived' }
	},
	{
		path: '*',
		redirect: { name: 'AllZonesForecast' },
		meta: { bodyClass: 'afp-forecast' }
	}
]

const router = new VueRouter({
	routes
})

export default router

