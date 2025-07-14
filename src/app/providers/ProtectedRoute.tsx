/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useEffect, useMemo } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useActions } from '../../shared/hooks/useActions'
import { useAppSelector } from '../../shared/hooks/useStoreApp.hooks'
import { IProtectedRoute } from '../../shared/types/ui.interface'
import { Loader } from '../../shared/ui/Loader'

export const ProtectedRoute: FC<IProtectedRoute> = ({ requiredRole }) => {
	const { user, isAppLoading } = useAppSelector(state => state.auth)
	const actions = useActions()
	const token = localStorage.getItem('token')

	const checkAuth = useMemo(() => actions.checkAuth, [])
	const getUserCarts = useMemo(() => actions.getUserCarts, [])

	useEffect(() => {
		if (token) {
			checkAuth()
		}
	}, [checkAuth, token])

	useEffect(() => {
		if (user?.id) {
			getUserCarts(user.id)
		}
	}, [getUserCarts, user, user?.id])

	if (isAppLoading) return <Loader />

	if (!user && !token) {
		return <Navigate to={'/auth/login'} replace />
	}

	if (user && !requiredRole.includes(user.role)) {
		return <Navigate to={'/'} replace />
	}

	if (!user) return null

	return <Outlet />
}
