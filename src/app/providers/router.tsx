import { FC, lazy, Suspense } from 'react'
import { Provider } from 'react-redux'
import {
	createBrowserRouter,
	RouterProvider,
	useRouteError,
} from 'react-router-dom'
import { Loader } from '../../shared/ui/Loader'
import { store } from './store'

const HomePage = lazy(() => import('../../pages/home/HomePage'))
const NotFoundPage = lazy(() => import('../../pages/404/NotFoundPage'))
const LoginPage = lazy(() => import('../../pages/auth/LoginPage'))
const RegistrationPage = lazy(() => import('../../pages/auth/RegistrationPage'))

const BubbleError: FC = () => {
	const errorRoutes = useRouteError()
	if (errorRoutes) throw errorRoutes
	return null
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
