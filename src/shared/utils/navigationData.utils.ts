import { ROLES } from '../../app/constants/roles/roles'

export const navigationLink = [
	{
		id: 1,
		title: 'home',
		path: '/',
		isRoles: [ROLES.USER, ROLES.ADMIN],
	},
	{
		id: 2,
		title: 'orders',
		path: '/orders',
		isRoles: [ROLES.USER, ROLES.ADMIN],
	},
	{
		id: 3,
		title: 'users orders',
		path: '/admin/orders',
		isRoles: [ROLES.ADMIN],
	},
	{
		id: 4,
		title: 'admin-panel',
		path: '/admin',
		isRoles: [ROLES.ADMIN],
	},
	{
		id: 5,
		title: 'users',
		path: '/admin/user',
		isRoles: [ROLES.ADMIN],
	},
	{
		id: 6,
		title: 'carts',
		path: '/admin/carts',
		isRoles: [ROLES.ADMIN],
	},
]
