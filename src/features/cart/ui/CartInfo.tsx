import { FC, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '../../../shared/hooks/useStoreApp.hooks'
import { Button } from '../../../shared/ui/Buttons'

// Todo: Need create order
export const CartInfo: FC = () => {
	const { cartItems } = useAppSelector(state => state.cartItems)
	const [totalPrice, setTotalPrice] = useState<undefined | number>(0)
	const navigate = useNavigate()

	const totalCartItem = cartItems?.map(
		cartItem => cartItem.quantity && Number(cartItem.price) * cartItem.quantity
	)

	useEffect(() => {
		if (!Array.isArray(totalCartItem)) {
			setTimeout(() => navigate('/'), 500)

			return
		}

		const total =
			totalCartItem?.reduce((acc, item) => {
				if (!acc || !item) return

				return acc + item
			}) || []

		if (typeof total !== 'number') {
			setTimeout(() => navigate('/'), 500)

			return
		}

		setTotalPrice(Math.round(total))
	}, [navigate, totalCartItem])

	return (
		<div className='flex-auto'>
			<div className='flex flex-col justify-between bg-bgCategory p-4 h-full rounded'>
				<h1 className='text-center text-3xl mb-10'>Cart info</h1>
				<div className={'mb-10'}>
					<h3>Amount products: {cartItems?.length || 0}</h3>
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
