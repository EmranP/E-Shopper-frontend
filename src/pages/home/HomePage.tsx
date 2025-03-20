import { FC } from 'react'
import { Header } from '../../widgets/header/ui/Header'
import { LayoutContent } from '../../widgets/layout/Content'
import { Layout, LayoutContainer } from '../../widgets/layout/Layout'

const HomePage: FC = () => {
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
