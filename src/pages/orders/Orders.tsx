import { Title } from '../../shared/ui/Title'
import { Header } from '../../widgets/header/ui/Header'
import { Layout, LayoutContainer } from '../../widgets/layout/Layout'

const OrdersPage = () => {
	return (
		<Layout>
			<Header />
			<LayoutContainer>
				<Title title='Order page' />
			</LayoutContainer>
		</Layout>
	)
}

export default OrdersPage
