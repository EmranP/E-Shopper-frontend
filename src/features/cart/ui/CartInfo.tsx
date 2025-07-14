/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useCallback, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useActions } from '../../../shared/hooks/useActions'
import { useAppSelector } from '../../../shared/hooks/useStoreApp.hooks'
import { useToggle } from '../../../shared/hooks/useToggle'
import { Button } from '../../../shared/ui/Buttons'
import { Modal } from '../../../shared/ui/Modal'

export const CartInfo: FC = () => {
	const { cartItems } = useAppSelector(state => state.cartItems)
	const { isAppLoading } = useAppSelector(state => state.order)
	const { user } = useAppSelector(state => state.auth)
	const { cart } = useAppSelector(state => state.carts)
	const actions = useActions()
	const { toggle, toggleHandler } = useToggle(false)
	const navigate = useNavigate()

	// Actions Creator
	const addOrder = useMemo(() => actions.addOrder, [])

	const totalPrice = useMemo(() => {
		if (!Array.isArray(cartItems) || !cartItems.length) return null

		return cartItems.reduce((sum, item) => {
			const quantity = item.quantity ?? 0
			const price = Number(item.price) || 0
			return sum + quantity * price
		}, 0)
	}, [cartItems])

	const disableOrder = totalPrice === null || totalPrice <= 0 || isAppLoading

	const confirmDeleteHandler = useCallback(() => {
		if (!user?.id || !cart?.id || totalPrice === null) return

		try {
			addOrder(user.id, cart.id, totalPrice)

			toggleHandler()
			// navigate('/orders', { replace: true })
		} catch (error) {
			console.error('Не удалось создать заказ:', error)
		}
	}, [addOrder, cart?.id, navigate, toggleHandler, totalPrice, user?.id])

	const openModalHandler = () => toggleHandler()
	const closeModalHandler = () => toggleHandler()

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
					disabled={disableOrder}
					bgColor={'bg-bgActionButton'}
					title={isAppLoading ? 'Placing order…' : 'Place an order'}
					onClick={openModalHandler}
				/>
			</div>
			{toggle && (
				<Modal
					titleSolutions='to place this order'
					onClickSave={confirmDeleteHandler}
					onClickClose={closeModalHandler}
					onClickCancel={closeModalHandler}
				/>
			)}
		</div>
	)
}
