import { FC } from 'react'
import { IInput } from '../../features/admin/types/ui.interface'
import { useInput } from '../hooks/useInput'

export const Input: FC<IInput> = ({ value, placeholder, type, ...props }) => {
	const dynamicInput = useInput(value)
	return (
		<input
			type={type}
			placeholder={placeholder}
			className='dynamic__input w-full bg-bgLayout p-2 rounded-lg outline-none'
			{...dynamicInput}
			{...props}
		/>
	)
}
