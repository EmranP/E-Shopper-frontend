import { FC } from 'react'
import { HeaderBody } from './HeaderBody'
import { HeaderTop } from './HeaderTop'

export const Header: FC = () => {
	return (
		<header className='bg-bgHeader pt-8'>
			<HeaderTop />
			<HeaderBody />
		</header>
	)
}
