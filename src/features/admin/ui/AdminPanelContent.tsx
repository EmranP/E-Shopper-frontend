import { FC } from 'react'
import { Outlet } from 'react-router-dom'
import { AdminPanelNavigation } from './AdminPanelNavigation'

export const AdminPanelContent: FC = () => {
	return (
		<div className='flex-auto'>
			<AdminPanelNavigation />
			<Outlet />
		</div>
	)
}
