import { FC } from 'react'
import { Provider } from 'react-redux'
import {
	createBrowserRouter,
	Link,
	RouterProvider,
	useRouteError,
} from 'react-router-dom'
import { CartAdminPageContent } from '../../pages/admin/admin-panel/cart/CartAdminPageContent'
import { CategoriesAdminPageContent } from '../../pages/admin/admin-panel/categories/CategoriesAdminPageContent'
import { OrdersAdminPageContent } from '../../pages/admin/admin-panel/orders/OrdersAdminPageContent'
import { ProductsAdminPageContent } from '../../pages/admin/admin-panel/products/ProductsAdminPageContent'
import { UsersAdminPageContent } from '../../pages/admin/admin-panel/users/UsersAdminPageContent'
import { CategoryContent } from '../../pages/home/content/CategoryContent'
import { MainContent } from '../../pages/home/content/MainContent'
import { ProductsContent } from '../../pages/home/content/ProductsContent'
import { CurrentProduct } from '../../pages/product/CurrentProduct'
import { WrapperSuspense } from '../../shared/ui/WrapperSuspense'
import { pages } from '../constants/providers/pages'
import { ROLES } from '../constants/roles/roles'
import { ProtectedRoute } from './ProtectedRoute'
import { store } from './store'

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
		<div className='text-center p-20 text-3xl font-semibold'>
			<h1 className='mb-10'>Error: {errorMessage}</h1>
			<h2>
				Return home page:{' '}
				<span className='text-specialColor hover:underline'>
					<Link to={'/'}>home</Link>
				</span>
			</h2>
		</div>
	)
}

const router = createBrowserRouter([
	{
		path: '/',
		element: (
			<WrapperSuspense>
				<pages.HomePage />
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
				<pages.LoginPage />
			</WrapperSuspense>
		),
	},
	{
		path: '/auth/registration',
		element: (
			<WrapperSuspense>
				<pages.RegistrationPage />
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
				element: <pages.AdminPanelPage />,
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
				<pages.CartPage />
			</WrapperSuspense>
		),
		errorElement: <BubbleError />,
	},
	{
		path: '/orders',
		element: (
			<WrapperSuspense>
				<pages.OrderPage />
			</WrapperSuspense>
		),
		errorElement: <BubbleError />,
	},
	{
		path: '*',
		element: (
			<WrapperSuspense>
				<pages.NotFoundPage />
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
