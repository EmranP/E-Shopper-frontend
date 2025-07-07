import { Minus, Plus } from 'lucide-react'
import { FC } from 'react'
import { MinLoaderApp } from '../../../shared/ui/LoaderApp'
import { ICartControls } from '../types/type.ui'

export const CartControls: FC<ICartControls> = ({
	quantity,
	isActiveMinSum,
	isActiveMaxSum,
	increaseStock,
	decreaseStock,
	isAppLoading,
}) => {
	return (
		<div className='flex justify-center items-center gap-4'>
			<button className='bg-white p-2 rounded-full' onClick={decreaseStock}>
				<Minus opacity={isActiveMinSum ? 0.5 : 1} color='#6968ff' />
			</button>
			<div>{isAppLoading ? <MinLoaderApp /> : <span>{quantity}</span>}</div>
			<button className='bg-white p-2 rounded-full' onClick={increaseStock}>
				<Plus opacity={isActiveMaxSum ? 0.5 : 1} color='#6968ff' />
			</button>
		</div>
	)
}
