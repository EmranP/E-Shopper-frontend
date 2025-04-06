import { FC } from 'react'
import { IAdminPanelHeader } from '../types/ui.interface'

export const AdminPanelContentTable: FC<IAdminPanelHeader> = ({
	title,
	children,
}) => {
	return (
		<div className='py-2 pr-10 h-full'>
			<h1 className='text-2xl font-semibold mb-5'>{title}</h1>
			<div className='rounded'>
				<table className='w-full'>{children}</table>
			</div>
		</div>
	)
}

export const AdminPanelContentHeaderTable: FC<IAdminPanelHeader> = ({
	title,
}) => {
	return (
		<th className='p-2 border border-bgActionButton text-lg font-medium'>
			{title}
		</th>
	)
}
