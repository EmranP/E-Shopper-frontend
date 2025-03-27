import { FC } from 'react'
import { IFooterTime } from '../types/types.interface'

export const FooterTime: FC<IFooterTime> = ({ formattedDate }) => {
	return (
		<div className='footer'>
			<h1>Current Date:</h1>
			<span>{formattedDate}</span>
		</div>
	)
}
