import { FC } from 'react'
import { AdminPanelContent } from '../../../features/admin/ui/AdminPanelContent'
import { AdminPanelForm } from '../../../features/admin/ui/AdminPanelForm'
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
					<AdminPanelForm />
					<AdminPanelContent />
				</LayoutAdminPanel>
			</LayoutContent>
			<Footer />
		</Layout>
	)
}

export default AdminPanelPage
