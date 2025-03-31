import { ROLES } from '../../app/constants/roles/roles'

export const adminFormConfig = {
	products: [
		{
			name: 'id',
			label: 'Product id',
			type: 'text',
		},
		{
			name: 'title',
			label: 'Product name',
			type: 'text',
		},
		{
			name: 'price',
			label: 'Price product',
			type: 'number',
		},
		{
			name: 'category ID',
			label: 'Categories ID',
			type: 'select',
			options: [
				{ label: 'Apple', value: 'Iphone' },
				{ label: 'Samsung', value: 'Galaxy' },
			],
		},
		{
			name: 'imageUrl',
			label: 'Image url',
			type: 'text',
		},
		{
			name: 'description',
			label: 'Description product',
			type: 'textarea',
		},
	],
	users: [
		{
			name: 'id',
			label: 'User id',
			type: 'text',
		},
		{
			name: 'role',
			label: 'User role',
			type: 'select',
			option: ['admin', 'customer'],
		},
	],
	orders: [
		{ name: 'orderId', label: 'Order id', type: 'text' },
		{
			name: 'status',
			label: 'Order status',
			type: 'select',
			options: ['pending', 'shipped', 'delivered'],
		},
	],
	category: [
		{
			name: 'categories',
			label: 'Categories id',
			type: 'text',
		},
		{
			name: 'EditCategories',
			label: 'Edit current categories',
			type: 'select',
			option: ['Apple', 'Samsung'],
		},
		{
			name: 'addCategories',
			label: 'Add new categories',
			type: 'text',
		},
	],
}

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
