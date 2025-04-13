import { FC } from 'react'
import { LayoutContainer } from '../../layout/Layout'
import { HeaderAction } from './HeaderAction'
import { Logo } from './Logo'
import { Navigation } from './Navigation'

export const HeaderTop: FC = () => {
	return (
		<LayoutContainer>
			<div className='flex justify-between items-center mb-5'>
				<Logo />
				<Navigation />
				<HeaderAction />
			</div>
		</LayoutContainer>
	)
}
