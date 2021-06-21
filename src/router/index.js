import { createWebHistory, createRouter } from 'vue-router';

const routes = [
	{
		path: '/',
		name: 'home',
		meta: {title: 'Головна', layout: 'admin-layout'},
		component: () => import('@/views/BushingStatistic.vue'),
	},
	{
		path: '/companies',
		name: 'companies',
		meta: {title: 'Компанії', layout: 'admin-layout'},
		component: () => import('../views/Companies.vue'),
	},
	{
		path: '/filials',
		name: 'filials',
		meta: {title: 'Підрозділи', layout: 'admin-layout'},
		component: () => import('../views/Filials.vue'),
	},
	{
		path: '/stantions',
		name: 'stantions',
		meta: {title: 'Підстанції', layout: 'admin-layout'},
		component: () => import('../views/Stantions.vue'),
	},
	{
		path: '/disps',
		name: 'disps',
		meta: {title: 'Диспетчерські найменування', layout: 'admin-layout'},
		component: () => import('../views/Disps.vue'),
	},
	{
		path: '/bushing-statistic',
		name: 'bushing-statistic',
		meta: {title: 'Статистика', layout: 'admin-layout'},
		component: () => import('../views/BushingStatistic.vue'),
	},
	{
		path: '/bushing-passports',
		name: 'bushing-passports',
		meta: {title: 'Паспорти', layout: 'admin-layout'},
		component: () => import('../views/BushingPassports.vue'),
	},
	{
		path: '/bushing-tests',
		name: 'bushing-tests',
		meta: {title: 'Випробування', layout: 'admin-layout'},
		component: () => import('../views/BushingTests.vue'),
	},
	{
		path: '/bushing-passport-create',
		name: 'bushing-passport-create',
		meta: {title: 'Створення паспорту вводу', layout: 'admin-layout'},
		component: () => import('../views/BushingPassportCreate.vue'),
	},
	{
		path: '/bushing-passport-edit',
		name: 'bushing-passport-edit',
		meta: {title: 'Редагування паспорту вводу', layout: 'admin-layout'},
		component: () => import('../views/BushingPassportEdit.vue'),
	},
	{
		path: '/bushing-test-create',
		name: 'bushing-test-create',
		meta: {title: 'Створення випробування вводу', layout: 'admin-layout'},
		component: () => import('../views/BushingTestCreate.vue'),
	},
	{
		path: '/bushing-test-edit',
		name: 'bushing-test-edit',
		meta: {title: 'Редагування випробування вводу', layout: 'admin-layout'},
		component: () => import('../views/BushingTestEdit.vue'),
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

router.beforeEach((to, from, next) => {
    document.title = to.meta.title  || 'SDZP'
    next()
});

export default router;