import { FC } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { adminPathLink } from '../../../app/constants/providers/pathLink.constants'
import { AdminButtonNavigation } from './AdminButtonNavigation'

export const AdminPanelNavigation: FC = () => {
	const locationAdminContent = useLocation()
	const navigate = useNavigate()

	return (
		<div className='flex gap-10 items-center mb-15'>
			<AdminButtonNavigation
				locationAdminContent={locationAdminContent}
				navigate={navigate}
				title='users'
				to={adminPathLink}
			/>
			<AdminButtonNavigation
				locationAdminContent={locationAdminContent}
				navigate={navigate}
				title='orders'
				to={`${adminPathLink}/orders`}
			/>
			<AdminButtonNavigation
				locationAdminContent={locationAdminContent}
				navigate={navigate}
				title='products'
				to={`${adminPathLink}/products`}
			/>
			<AdminButtonNavigation
				locationAdminContent={locationAdminContent}
				navigate={navigate}
				title='categories'
				to={`${adminPathLink}/categories`}
			/>
			<AdminButtonNavigation
				locationAdminContent={locationAdminContent}
				navigate={navigate}
				title='carts'
				to={`${adminPathLink}/carts`}
			/>
		</div>
	)
}
