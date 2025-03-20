import { FC } from 'react'
import { LayoutContainer } from '../../layout/Layout'
import { HeaderAction } from './HeaderAction'
import { Logo } from './Logo'
import { Navigation } from './Navigation'

export const Header: FC = () => {
	return (
		<header className='bg-bgHeader py-8'>
			<LayoutContainer>
				<div className='flex justify-between items-center'>
					<Logo />
					<Navigation />
					<HeaderAction />
				</div>
			</LayoutContainer>
		</header>
	)
}
