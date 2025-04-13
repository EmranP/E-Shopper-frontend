/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { toast } from 'react-toastify'
import { infoAuthMessage } from '../../app/constants/utils/showToast.constant'
import { useAppSelector } from '../../shared/hooks/store.hooks'
import { useActions } from '../../shared/hooks/useActions'
import { Loader } from '../../shared/ui/Loader'
import { Toast } from '../../shared/ui/Toast'
import { Footer } from '../../widgets/footer/ui/Footer'
import { Header } from '../../widgets/header/ui/Header'
import { LayoutContent } from '../../widgets/layout/Content'
import { Layout } from '../../widgets/layout/Layout'

const HomePage: FC = () => {
	const { auth } = useAppSelector(state => state)
	const { checkAuth, getUserCarts } = useActions()

	const { isLoading, user } = auth

	useEffect(() => {
		const token = localStorage.getItem('token')
		if (token) {
			checkAuth()
		}
	}, [])

	useEffect(() => {
		if (user?.isActivated) {
			toast.info(infoAuthMessage)
		}
	}, [user?.isActivated])

	useEffect(() => {
		if (!user?.id) return
		getUserCarts(user.id)
	}, [user?.id])

	if (isLoading) return <Loader />

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
