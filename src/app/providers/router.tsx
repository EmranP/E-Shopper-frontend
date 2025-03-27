import { FC, lazy } from 'react'
import { Provider } from 'react-redux'
import {
	createBrowserRouter,
	RouterProvider,
	useRouteError,
} from 'react-router-dom'
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
const OrdersAdminPage = lazy(
	() => import('../../pages/admin/orders/OrdersAdminPage ')
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
		element: <ProtectedRoute requiredRole={ROLES.ADMIN} />,
		errorElement: <BubbleError />,
		children: [
			{
				path: 'panel',
				element: (
					<WrapperSuspense>
						<AdminPanelPage />
					</WrapperSuspense>
				),
				errorElement: <BubbleError />,
				children: [],
			},
			{
				path: 'orders',
				element: (
					<WrapperSuspense>
						<OrdersAdminPage />
					</WrapperSuspense>
				),
				errorElement: <BubbleError />,
			},
		],
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
