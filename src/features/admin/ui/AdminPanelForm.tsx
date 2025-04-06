import { useLocation } from 'react-router-dom'
import { adminPathLink } from '../../../app/constants/providers/pathLink.constants'
import {
	AdminFormCarts,
	AdminFormCategories,
	AdminFormOrders,
	AdminFormProducts,
	AdminFormUsers,
} from './AdminForms'

export const AdminPanelForm = () => {
	const { pathname } = useLocation()

	return (
		<div className='bg-bgActionButton rounded-md p-5 w-70 min-h-[300px]'>
			{pathname === adminPathLink && <AdminFormUsers />}
			{pathname === `${adminPathLink}/orders` && <AdminFormOrders />}
			{pathname === `${adminPathLink}/products` && <AdminFormProducts />}
			{pathname === `${adminPathLink}/categories` && <AdminFormCategories />}
			{pathname === `${adminPathLink}/carts` && <AdminFormCarts />}
		</div>
	)
}
