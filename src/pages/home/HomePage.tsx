/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useEffect, useMemo } from 'react'
import { Outlet } from 'react-router-dom'
import { toast } from 'react-toastify'
import { infoAuthMessage } from '../../app/constants/utils/showToast.constant'
import { useActions } from '../../shared/hooks/useActions'
import { useAppSelector } from '../../shared/hooks/useStoreApp.hooks'
import { Loader } from '../../shared/ui/Loader'
import { Toast } from '../../shared/ui/Toast'
import { Footer } from '../../widgets/footer/ui/Footer'
import { Header } from '../../widgets/header/ui/Header'
import { LayoutContent } from '../../widgets/layout/Content'
import { Layout } from '../../widgets/layout/Layout'

const HomePage: FC = () => {
	const { auth } = useAppSelector(state => state)
	const actions = useActions()

	const { isAppLoading, user } = auth
	const isActivatedFromStorage = localStorage.getItem('isActivated')

	const checkAuth = useMemo(() => actions.checkAuth, [])
	const getUserCarts = useMemo(() => actions.getUserCarts, [])

	useEffect(() => {
		const token = localStorage.getItem('token')
		if (token) {
			checkAuth()
		}
	}, [checkAuth])

	useEffect(() => {
		if (isActivatedFromStorage) return

		if (user?.isActivated) {
			toast.info(infoAuthMessage)

			localStorage.setItem('isActivated', 'activated')
		}
	}, [isActivatedFromStorage, user?.isActivated])

	useEffect(() => {
		if (!user?.id) return
		getUserCarts(user.id)
	}, [getUserCarts, user?.id])

	if (isAppLoading) return <Loader />

	return (
		<Layout>
			<Header />
			<LayoutContent>
				<Outlet />
			</LayoutContent>
			<Footer />
			<Toast position='bottom-right' theme='dark' />
		</Layout>
	)
}

export default HomePage
