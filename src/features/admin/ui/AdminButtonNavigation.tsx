import { FC } from 'react'
import { Button } from '../../../shared/ui/Buttons'
import { IAdminButtonNavigation } from '../types/ui.interface'

export const AdminButtonNavigation: FC<IAdminButtonNavigation> = ({
	locationAdminContent,
	navigate,
	title,
	to,
}) => {
	return (
		<Button
			onClick={() => navigate(to)}
			bgColor={
				locationAdminContent.pathname === to
					? 'bg-bgActionButton'
					: 'bg-bgCards'
			}
			color={
				locationAdminContent.pathname === to ? 'white' : 'baseTextAndButton'
			}
			type='button'
			title={title}
		/>
	)
}
