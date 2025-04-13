import { FC } from 'react'
import { IErrorMessage } from '../types/ui.interface'
import { Title } from './Title'

export const ErrorMessage: FC<IErrorMessage> = ({ error }) => {
	return (
		<h2 className='text-red-500 text-center text-lg font-semibold'>
			{error && error}
		</h2>
	)
}

export const ErrorAdminContentPage: FC<IErrorMessage> = ({ error }) => {
	return (
		<div className='flex h-full justify-center items-center text-bgDangerButton'>
			<Title title={error as string} />
		</div>
	)
}
