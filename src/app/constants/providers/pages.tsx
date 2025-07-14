import { lazy } from 'react'

export const pages = {
	HomePage: lazy(() => import('../../../pages/home/HomePage')),
	LoginPage: lazy(() => import('../../../pages/auth/LoginPage')),
	RegistrationPage: lazy(() => import('../../../pages/auth/RegistrationPage')),
	AdminPanelPage: lazy(
		() => import('../../../pages/admin/admin-panel/AdminPanelPage')
	),
	CartPage: lazy(() => import('../../../pages/cart/CartPage.tsx')),
	OrderPage: lazy(() => import('../../../pages/orders/Orders')),
	NotFoundPage: lazy(() => import('../../../pages/404/NotFoundPage')),
}
