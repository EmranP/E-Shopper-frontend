import { FC } from 'react'
import { ITitle } from '../types/ui.interface'

export const Title: FC<ITitle> = ({ title }) => {
	return (
		<div className='text-center text-2xl'>
			<h1>{title}</h1>
		</div>
	)
}
