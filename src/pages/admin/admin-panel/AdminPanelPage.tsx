import { FC } from 'react'
import { Footer } from '../../../widgets/footer/ui/Footer'
import { Header } from '../../../widgets/header/ui/Header'
import { LayoutContent } from '../../../widgets/layout/Content'
import { Layout } from '../../../widgets/layout/Layout'
import { LayoutAdminPanel } from '../../../widgets/layout/LayoutAdmin'

const AdminPanelPage: FC = () => {
	return (
		<Layout>
			<Header />
			<LayoutContent>
				<LayoutAdminPanel>
					<h1>Admin form</h1>
					<h2>Content</h2>
				</LayoutAdminPanel>
			</LayoutContent>
			<Footer />
		</Layout>
	)
}

export default AdminPanelPage
