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
	const { isLoading, user } = useAppSelector(state => state.auth)
	const { checkAuth } = useActions()

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

	if (isLoading) return <Loader />

	return (
		<Layout>
			<Header />
			<LayoutContent>
				<h1>Example</h1>
				<Outlet />
			</LayoutContent>
			<Footer />
			<Toast position='bottom-right' theme='dark' />
		</Layout>
	)
}

export default HomePage
