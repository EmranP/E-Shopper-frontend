import { FC, lazy, Suspense } from 'react'
import { Provider } from 'react-redux'
import {
	createBrowserRouter,
	RouterProvider,
	useRouteError,
} from 'react-router-dom'
import { Loader } from '../../shared/ui/Loader'
import { ROLES } from '../constants/roles/roles'
import { ProtectedRoute } from './ProtectedRoute'
import { store } from './store'

const HomePage = lazy(() => import('../../pages/home/HomePage'))
const NotFoundPage = lazy(() => import('../../pages/404/NotFoundPage'))
const LoginPage = lazy(() => import('../../pages/auth/LoginPage'))
const RegistrationPage = lazy(() => import('../../pages/auth/RegistrationPage'))
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
			<Suspense fallback={<Loader />}>
				<HomePage />
			</Suspense>
		),
		errorElement: <BubbleError />,
	},
	{
		path: '/auth/login',
		element: (
			<Suspense fallback={<Loader />}>
				<LoginPage />
			</Suspense>
		),
	},
	{
		path: '/auth/registration',
		element: (
			<Suspense fallback={<Loader />}>
				<RegistrationPage />
			</Suspense>
		),
	},
	{
		path: '/admin',
		errorElement: <BubbleError />,
		element: <ProtectedRoute requiredRole={ROLES.ADMIN} />,
		children: [
			{
				path: 'orders',
				element: (
					<Suspense fallback={<Loader />}>
						<OrdersAdminPage />
					</Suspense>
				),
				errorElement: <BubbleError />,
			},
		],
	},
	{
		path: '*',
		element: (
			<Suspense fallback={<Loader />}>
				<NotFoundPage />
			</Suspense>
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
