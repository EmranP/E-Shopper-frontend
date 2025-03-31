import { FC } from 'react'
import { ILabel } from '../types/ui.interface'

export const Label: FC<ILabel> = ({ htmlFor, title }) => {
	return (
		<label htmlFor={htmlFor} className='block mb-2 text-white'>
			{title}
		</label>
	)
}
