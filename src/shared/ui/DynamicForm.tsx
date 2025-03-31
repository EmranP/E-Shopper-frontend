import { FC, PropsWithChildren } from 'react'

export const DynamicForm: FC<PropsWithChildren> = ({ children }) => {
	return (
		<>
			<h1 className='text-center text-white mb-5 text-xl'>Admin Form</h1>
			<div className='dynamic__input'>{children}</div>
		</>
	)
}
