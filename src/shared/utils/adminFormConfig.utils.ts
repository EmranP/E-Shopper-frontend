import { ROLES } from '../../app/constants/roles/roles'

export const adminFormConfigUser = [
	{
		label: 'Customer',
		value: 'Customer',
		roleId: ROLES.USER,
	},
	{
		label: 'Admin',
		value: 'Admin',
		roleId: ROLES.ADMIN,
	},
]

export const adminFormConfigOrders = [
	{
		label: 'Pending',
		value: 'pending',
	},
	{
		label: 'Shipped',
		value: 'shipped',
	},
	{
		label: 'Delivered',
		value: 'delivered',
	},
]
