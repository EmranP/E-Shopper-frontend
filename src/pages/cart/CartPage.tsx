/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useEffect } from 'react'
import { CartContent } from '../../features/cart/ui/CartContent'
import { CartInfo } from '../../features/cart/ui/CartInfo'
import { CartWrapper } from '../../features/cart/ui/CartWrapper'
import { useAppSelector } from '../../shared/hooks/store.hooks'
import { useActions } from '../../shared/hooks/useActions'
import { Loader } from '../../shared/ui/Loader'
import { Footer } from '../../widgets/footer/ui/Footer'
import { Header } from '../../widgets/header/ui/Header'
import { LayoutContent } from '../../widgets/layout/Content'
import { Layout } from '../../widgets/layout/Layout'

export const CartPage: FC = () => {
	const { auth } = useAppSelector(state => state)
	const { checkAuth, getUserCarts } = useActions()

	const { isLoading, user, isAuth } = auth

	useEffect(() => {
		const token = localStorage.getItem('token')
		if (token) {
			checkAuth()
		}
	}, [])

	useEffect(() => {
		if (!user?.id) return
		getUserCarts(user.id)
	}, [user?.id])

	if (isLoading) return <Loader />

	return (
		<Layout>
			<Header />
			<LayoutContent>
				{!isAuth ? (
					<h1 className='text-center text-3xl font-semibold text-orange-500'>
						You need in auth
					</h1>
				) : (
					<CartWrapper>
						<CartContent />
						<CartInfo />
					</CartWrapper>
				)}
			</LayoutContent>
			<Footer />
		</Layout>
	)
}
