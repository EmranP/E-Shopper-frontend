import { Trash } from 'lucide-react'
import { FC } from 'react'
import { iconsSize } from '../../features/admin/ui/AdminForms'
import { ITrashUI } from '../types/ui.interface'

export const TrashUI: FC<ITrashUI> = ({
	showModalHandler,
	setIdToDelete,
	data,
}) => {
	return (
		<div className='absolute top-5 -right-7'>
			<Trash
				size={iconsSize}
				cursor={'pointer'}
				onClick={() => {
					showModalHandler()
					setIdToDelete(data.id ? data?.id : null)
				}}
			/>
		</div>
	)
}
