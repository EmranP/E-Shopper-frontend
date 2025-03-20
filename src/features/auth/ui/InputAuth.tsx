import { Path } from 'react-hook-form'
import {
	ILoginFormInputs,
	InputAuthProps,
	IRegistrationFormInputs,
} from '../types/types-ui.interface'

export const InputAuth = <
	T extends ILoginFormInputs | IRegistrationFormInputs
>({
	name,
	placeholder,
	type,
	register,
	errors,
	label,
}: InputAuthProps<T>) => {
	return (
		<div className='space-y-2'>
			{label && <label className='block text-sm font-medium'>{label}</label>}
			<input
				{...register(name as Path<T>)}
				type={type}
				placeholder={placeholder}
				className={`block outline-0 border-2 border-bgActionButton px-3 py-1 rounded-2xl ${
					errors && 'border-red-500'
				}`}
			/>
			{errors && (
				<p className='max-w-61 text-red-500 text-sm'>{errors.message}</p>
			)}
		</div>
	)
}
