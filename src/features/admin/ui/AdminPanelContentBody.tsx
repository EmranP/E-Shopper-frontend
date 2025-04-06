import { FC, PropsWithChildren } from 'react'
import { IAdminPanelBody } from '../types/ui.interface'

export const AdminPanelContentBody: FC<PropsWithChildren> = ({ children }) => {
	return (
		<tr className='even:bg-bgCards hover:bg-bgActions relative'>{children}</tr>
	)
}

export const AdminPanelContentBodyItems: FC<IAdminPanelBody> = ({ data }) => {
	return (
		<td className='p-3 border border-bgActionButton text-center'>{data}</td>
	)
}
