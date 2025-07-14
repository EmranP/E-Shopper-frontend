import { FC } from 'react'
import { Link } from 'react-router-dom'
import { ICartEmpty } from '../types/type.ui'

export const CartEmpty: FC<ICartEmpty> = ({ error }) => {
	return (
		<div className='text-center flex-auto text-2xl h-full py-50  font-semibold'>
			<h1 className='mb-10'>Cart is empty... 😢</h1>
			<h2 className='mb-3'>
				Return to{' '}
				<span className='text-specialColor'>
					<Link to={'/'}>home page</Link>
				</span>
			</h2>
			{error && <h2 className='text-bgActionButton'>Refresh page place </h2>}
		</div>
	)
}
