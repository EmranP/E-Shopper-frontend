/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useEffect } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useActions } from '../../shared/hooks/useActions'
import { useAppSelector } from '../../shared/hooks/useStoreApp.hooks'
import { IProtectedRoute } from '../../shared/types/ui.interface'
import { Loader } from '../../shared/ui/Loader'

export const ProtectedRoute: FC<IProtectedRoute> = ({ requiredRole }) => {
	const { user, isLoading } = useAppSelector(state => state.auth)
	const { checkAuth, getUserCarts } = useActions()
	const token = localStorage.getItem('token')
	useEffect(() => {
		if (token) {
			checkAuth()
		}
	}, [])

	useEffect(() => {
		if (user?.id) {
			getUserCarts(user.id)
		}
	}, [user, user?.id])

	if (isLoading) return <Loader />

	if (!user && !token) {
		return <Navigate to={'/auth/login'} replace />
	}

	if (user && !requiredRole.includes(user.role)) {
		return <Navigate to={'/'} replace />
	}

	if (!user) return null

	return <Outlet />
}
