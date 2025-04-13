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
		title: 'admin-panel',
		path: '/admin/panel',
		isRoles: [ROLES.ADMIN],
	},
	{
		id: 4,
		title: 'users',
		path: '/admin/user',
		isRoles: [ROLES.ADMIN],
	},
]
