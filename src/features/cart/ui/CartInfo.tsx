import { FC, useMemo } from 'react'
import { useAppSelector } from '../../../shared/hooks/useStoreApp.hooks'
import { Button } from '../../../shared/ui/Buttons'

// Todo: Need create order
export const CartInfo: FC = () => {
	const { cartItems } = useAppSelector(state => state.cartItems)

	const totalPrice = useMemo(() => {
		if (!Array.isArray(cartItems) || cartItems.length === 0) return null

		return cartItems.reduce((sum, item) => {
			const quantity = item.quantity ?? 0
			const price = Number(item.price) || 0
			return sum + quantity * price
		}, 0)
	}, [cartItems])

	const hasTotalPrice = (totalPrice && totalPrice > 0) || totalPrice === null

	return (
		<div className='flex-auto'>
			<div className='flex flex-col justify-between bg-bgCategory p-4 h-full rounded'>
				<h1 className='text-center text-3xl mb-10'>Cart info</h1>
				<div className={'mb-10'}>
					<h3>Amount products: {cartItems?.length || 0}</h3>
					<h2>Total price: {totalPrice || 0}$</h2>
				</div>
				<Button
					color={'white'}
					disabled={hasTotalPrice}
					bgColor={'bg-bgActionButton'}
					title={'Place an order'}
				/>
			</div>
		</div>
	)
}
