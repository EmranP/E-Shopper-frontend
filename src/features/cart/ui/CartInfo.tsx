import { FC, useEffect, useState } from 'react'
import { useAppSelector } from '../../../shared/hooks/useStoreApp.hooks'
import { Button } from '../../../shared/ui/Buttons'

// Todo: Need create order
export const CartInfo: FC = () => {
	const { cartItems } = useAppSelector(state => state.cartItems)
	const [totalPrice, setTotalPrice] = useState<undefined | number>(0)

	const totalCartItem = cartItems?.map(
		cartItem => Number(cartItem.price) * cartItem.quantity
	)

	useEffect(() => {
		const total = totalCartItem?.reduce((acc, item) => acc + item)

		setTotalPrice(total && Math.round(total))
	}, [totalCartItem])

	return (
		<div className='flex-auto'>
			<div className='flex flex-col justify-between bg-bgCategory p-4 h-full rounded'>
				<h1 className='text-center text-3xl mb-10'>Cart info</h1>
				<div className={'mb-10'}>
					<h3>Amount products: {cartItems?.length}</h3>
					<h2>Total price: {totalPrice ? totalPrice : 0}</h2>
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
