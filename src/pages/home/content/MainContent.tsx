import { FC } from 'react'
import { Outlet } from 'react-router-dom'
import { CategoryLayout } from '../../../entities/category/ui/CategoryLayout'

export const MainContent: FC = () => {
	return (
		<div className='flex gap-15'>
			<CategoryLayout />
			<Outlet />
		</div>
	)
}
