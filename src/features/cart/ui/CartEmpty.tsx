import { FC } from 'react'

export const CartEmpty: FC = () => {
	return (
		<h1 className='text-center flex-auto text-2xl h-full py-50 text-specialColor font-semibold'>
			Cart is empty... 😢
		</h1>
	)
}
