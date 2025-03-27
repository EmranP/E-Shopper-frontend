import { FC } from 'react'
import { formatDate } from '../../../shared/utils/formatDate.utils'
import { LayoutContainer } from '../../layout/Layout'
import { FooterContact } from './FooterContact'
import { FooterTime } from './FooterTime'

export const Footer: FC = () => {
	const date = new Date()
	const formattedDate = formatDate(date)
	const emailDev = 'nightsking12345@gmail.com'
	return (
		<footer className='bg-bgActionButton py-6'>
			<LayoutContainer>
				<div className='flex justify-between items-center text-white text-lg'>
					<FooterContact email={emailDev} />
					<FooterTime formattedDate={formattedDate} />
				</div>
			</LayoutContainer>
		</footer>
	)
}
