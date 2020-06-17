// const Forecast = () => import('./views/Forecast')
// const Archive = () => import('./views/Archive')
// const AllZonesForecast = () => import('./views/AllZonesForecast')
// const Weather = () => import('./views/Weather')
// const Synopsis = () => import('./views/Synopsis')

import Forecast from './views/Forecast'
import Weather from './views/Weather'
import Synopsis from './views/Synopsis'
import Archive from './views/Archive'
import AllZonesForecast from './views/AllZonesForecast'

function loadView(view) {
	return () => import(/* webpackChunkName: "view-[request]" */ `@/views/${view}.vue`)
}

export const baseRoutes = [
	{
		path: '/archive',
		name: 'Archive',
		component: loadView('Archive'),
		meta: { bodyClass: 'afp-archive' }
	},
	{
		path: '/archive/:product/',
		name: 'ArchiveProduct',
		component: loadView('Archive'),
		meta: { bodyClass: 'afp-archive' }
	},
	{
		path: '/weather',
		name: 'Weather',
		component: loadView('Weather'),
		meta: { bodyClass: 'afp-weather' }
	},
	{
		path: '/blog',
		name: 'Synopsis',
		component: loadView('Synopsis'),
		meta: { bodyClass: 'afp-blog' }
	},
	{
		path: '/blog/:date/',
		name: 'ArchivedSynopsis',
		component: loadView('Synopsis'),
		meta: { bodyClass: 'afp-blog-archived' }
	},
	{
		path: '/all',
		name: 'AllZonesForecast',
		component: loadView('AllZonesForecast'),
		meta: { bodyClass: 'afp-forecast' }
	},
	{
		path: '/:zone/',
		name: 'ZoneForecast',
		component: loadView('Forecast'),
		meta: { bodyClass: 'afp-forecast' }
	},
	{
		path: '/:zone/:date/',
		name: 'ArchivedForecast',
		component: loadView('Forecast'),
		meta: { bodyClass: 'afp-forecast-archived' }
	},
	{
		path: '*',
		redirect: { name: 'AllZonesForecast' },
		meta: { bodyClass: 'afp-forecast' }
	}
]

// export const blogRoutes = [
// 	{
// 		path: '/blog',
// 		name: 'Synopsis',
// 		component: loadView('Synopsis,
// 		meta: { bodyClass: 'afp-blog' }
// 	},
// 	{
// 		path: '/blog/:date/',
// 		name: 'ArchivedSynopsis',
// 		component: loadView('Synopsis,
// 		meta: { bodyClass: 'afp-blog-archived' }
// 	}
// ]

