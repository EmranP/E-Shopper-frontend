import { FC } from 'react'
import { IDynamicForm } from '../types/ui.interface'

// !Add props onSubmit form for send data
export const DynamicForm: FC<IDynamicForm> = ({ children }) => {
	return (
		<div className='h-full flex flex-col justify-center'>
			<h1 className='text-center text-white mb-5 text-xl'>Admin Form</h1>
			<div className='dynamic__input'>{children}</div>
		</div>
	)
}
