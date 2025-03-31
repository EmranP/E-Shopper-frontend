import { useLocation } from 'react-router-dom'
import { adminPathLink } from '../../../app/constants/providers/pathLink.constants'
import {
	AdminFormOrders,
	AdminFormProducts,
	AdminFormUsers,
} from './AdminForms'

export const AdminPanelForm = () => {
	const { pathname } = useLocation()

	return (
		<div className='bg-bgActionButton rounded-md p-5 w-70'>
			{pathname === adminPathLink && <AdminFormUsers />}
			{pathname === `${adminPathLink}/orders` && <AdminFormOrders />}
			{pathname === `${adminPathLink}/products` && <AdminFormProducts />}
		</div>
	)
}
