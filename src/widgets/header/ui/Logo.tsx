import { FC } from 'react'
import { Link } from 'react-router-dom'

export const Logo: FC = () => {
	return (
		<Link to={'/'}>
			<h1 className='text-3xl font-semibold'>E-Shopper</h1>
		</Link>
	)
}
