import { FC, useEffect } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAppSelector } from '../../shared/hooks/store.hooks'
import { useActions } from '../../shared/hooks/useActions'
import { IProtectedRoute } from '../../shared/types/ui.interface'
import { Loader } from '../../shared/ui/Loader'

export const ProtectedRoute: FC<IProtectedRoute> = ({ requiredRole }) => {
	const { user, isLoading } = useAppSelector(state => state.auth)
	const { checkAuth } = useActions()
	const token = localStorage.getItem('token')

	useEffect(() => {
		if (token) {
			checkAuth()
		}
	}, [])

	if (isLoading) return <Loader />

	if (!user && !token) {
		return <Navigate to={'/auth/login'} replace />
	}

	if (user && user.role !== requiredRole) {
		return <Navigate to={'/'} replace />
	}

	if (!user) return null

	return <Outlet />
}
