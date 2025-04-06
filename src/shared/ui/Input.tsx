import { FC } from 'react'
import { IInput } from '../../features/admin/types/ui.interface'

export const Input: FC<IInput> = ({
	value,
	onChange,
	placeholder,
	type,
	...props
}) => {
	return (
		<input
			type={type}
			placeholder={placeholder}
			value={value}
			onChange={onChange}
			className='dynamic__input w-full bg-bgLayout p-2 rounded-lg outline-none'
			{...props}
		/>
	)
}
