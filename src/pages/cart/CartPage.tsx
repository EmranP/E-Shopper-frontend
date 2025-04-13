/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useEffect } from 'react'
import { useAppSelector } from '../../shared/hooks/store.hooks'
import { useActions } from '../../shared/hooks/useActions'
import { LoaderApp } from '../../shared/ui/LoaderApp'
import { Footer } from '../../widgets/footer/ui/Footer'
import { Header } from '../../widgets/header/ui/Header'
import { LayoutContent } from '../../widgets/layout/Content'
import { Layout } from '../../widgets/layout/Layout'

export const CartPage: FC = () => {
	const { isLoading, isAuth } = useAppSelector(state => state.auth)
	const { checkAuth } = useActions()

	useEffect(() => {
		const token = localStorage.getItem('token')
		if (token) {
			checkAuth()
		}
	}, [])

	if (isLoading) return <LoaderApp />

	return (
		<Layout>
			<Header />
			<LayoutContent>
				{!isAuth ? (
					<h1 className='text-center text-3xl font-semibold text-orange-500'>
						You need in auth
					</h1>
				) : (
					<h1>CartPage</h1>
				)}
			</LayoutContent>
			<Footer />
		</Layout>
	)
}
