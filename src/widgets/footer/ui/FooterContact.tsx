import { FC } from 'react'
import { IFooterContact } from '../types/types.interface'

export const FooterContact: FC<IFooterContact> = ({ email }) => {
	return (
		<div className='footer'>
			<h1>You can contact us:</h1>
			<h2>
				Email: <span>{email}</span>
			</h2>
		</div>
	)
}
