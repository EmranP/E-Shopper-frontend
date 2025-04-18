import { FC, lazy } from 'react'
import { Provider } from 'react-redux'
import {
	createBrowserRouter,
	RouterProvider,
	useRouteError,
} from 'react-router-dom'
import { CartAdminPageContent } from '../../pages/admin/admin-panel/cart/CartAdminPageContent'
import { CategoriesAdminPageContent } from '../../pages/admin/admin-panel/categories/CategoriesAdminPageContent'
import { OrdersAdminPageContent } from '../../pages/admin/admin-panel/orders/OrdersAdminPageContent'
import { ProductsAdminPageContent } from '../../pages/admin/admin-panel/products/ProductsAdminPageContent'
import { UsersAdminPageContent } from '../../pages/admin/admin-panel/users/UsersAdminPageContent'
import { CartPage } from '../../pages/cart/CartPage'
import { CategoryContent } from '../../pages/home/content/CategoryContent'
import { MainContent } from '../../pages/home/content/MainContent'
import { ProductsContent } from '../../pages/home/content/ProductsContent'
import { CurrentProduct } from '../../pages/product/CurrentProduct'
import { WrapperSuspense } from '../../shared/ui/WrapperSuspense'
import { ROLES } from '../constants/roles/roles'
import { ProtectedRoute } from './ProtectedRoute'
import { store } from './store'

const HomePage = lazy(() => import('../../pages/home/HomePage'))
const NotFoundPage = lazy(() => import('../../pages/404/NotFoundPage'))
const LoginPage = lazy(() => import('../../pages/auth/LoginPage'))
const RegistrationPage = lazy(() => import('../../pages/auth/RegistrationPage'))
const AdminPanelPage = lazy(
	() => import('../../pages/admin/admin-panel/AdminPanelPage')
)

const BubbleError: FC = () => {
	const errorRoutes = useRouteError() as unknown

	let errorMessage = 'Unknown error'

	if (
		errorRoutes &&
		typeof errorRoutes === 'object' &&
		'message' in errorRoutes
	) {
		errorMessage = (errorRoutes as { message: string }).message
	}
	return (
		<h1 className='text-center p-20 text-3xl font-semibold'>
			Error: {errorMessage}
		</h1>
	)
}

const router = createBrowserRouter([
	{
		path: '/',
		element: (
			<WrapperSuspense>
				<HomePage />
			</WrapperSuspense>
		),
		errorElement: <BubbleError />,
		children: [
			{
				path: '',
				element: <MainContent />,
				children: [
					{
						path: '',
						element: <ProductsContent />,
						errorElement: <BubbleError />,
					},
					{
						path: 'category-products/:categoryProductId',
						element: <CategoryContent />,
						errorElement: <BubbleError />,
					},
				],
			},
			{
				path: 'products/:productId',
				element: <CurrentProduct />,
				errorElement: <BubbleError />,
			},
			{
				path: 'category-products/:categoryProductId/products/:productId',
				element: <CurrentProduct />,
				errorElement: <BubbleError />,
			},
		],
	},
	{
		path: '/auth/login',
		element: (
			<WrapperSuspense>
				<LoginPage />
			</WrapperSuspense>
		),
	},
	{
		path: '/auth/registration',
		element: (
			<WrapperSuspense>
				<RegistrationPage />
			</WrapperSuspense>
		),
	},
	{
		path: '/admin',
		element: <ProtectedRoute requiredRole={[ROLES.ADMIN]} />,
		errorElement: <BubbleError />,
		children: [
			{
				path: 'panel',
				element: <AdminPanelPage />,
				errorElement: <BubbleError />,
				children: [
					{
						path: '',
						element: <UsersAdminPageContent />,
						errorElement: <BubbleError />,
					},
					{
						path: 'orders',
						element: <OrdersAdminPageContent />,
						errorElement: <BubbleError />,
					},
					{
						path: 'products',
						element: <ProductsAdminPageContent />,
						errorElement: <BubbleError />,
					},
					{
						path: 'categories',
						element: <CategoriesAdminPageContent />,
						errorElement: <BubbleError />,
					},
					{
						path: 'carts',
						element: <CartAdminPageContent />,
						errorElement: <BubbleError />,
					},
				],
			},
		],
	},
	{
		path: '/cart',
		element: (
			<WrapperSuspense>
				<CartPage />
			</WrapperSuspense>
		),
		errorElement: <BubbleError />,
	},
	{
		path: '*',
		element: (
			<WrapperSuspense>
				<NotFoundPage />
			</WrapperSuspense>
		),
	},
])

export const BrowserRouter: FC = () => {
	return (
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	)
}
