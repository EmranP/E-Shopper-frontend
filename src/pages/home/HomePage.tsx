import { FC, useEffect } from 'react'
import { useAppSelector } from '../../shared/hooks/store.hooks'
import { useActions } from '../../shared/hooks/useActions'
import { Loader } from '../../shared/ui/Loader'
import { Header } from '../../widgets/header/ui/Header'
import { LayoutContent } from '../../widgets/layout/Content'
import { Layout, LayoutContainer } from '../../widgets/layout/Layout'

const HomePage: FC = () => {
	const { isLoading } = useAppSelector(state => state.auth)
	const { checkAuth } = useActions()

	useEffect(() => {
		const token = localStorage.getItem('token')
		if (token) {
			checkAuth()
		}
	}, [])

	if (isLoading) return <Loader />

	return (
		<Layout>
			<Header />
			<LayoutContent>
				<LayoutContainer>
					<h1>Example</h1>
				</LayoutContainer>
			</LayoutContent>
		</Layout>
	)
}

export default HomePage
