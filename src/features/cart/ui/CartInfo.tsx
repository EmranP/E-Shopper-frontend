import { FC } from 'react'
import { Button } from '../../../shared/ui/Buttons'

//!! Make Order And big refactoring code
export const CartInfo: FC = () => {
	return (
		<div className='flex-auto'>
			<div className='flex flex-col justify-between bg-bgCategory p-4 h-full rounded'>
				<h1 className='text-center text-3xl mb-10'>Cart info</h1>
				<div className={'mb-10'}>
					<h2>Total price: 0</h2>
					<h3>Amount products: 0</h3>
				</div>
				<Button
					color={'white'}
					bgColor={'bg-bgActionButton'}
					title={'Place an order'}
				/>
			</div>
		</div>
	)
}
