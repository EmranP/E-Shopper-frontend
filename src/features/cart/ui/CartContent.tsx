/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useEffect, useState } from 'react'
import { useActions } from '../../../shared/hooks/useActions'
import { useAppSelector } from '../../../shared/hooks/useStoreApp.hooks'
import { useToggle } from '../../../shared/hooks/useToggle'
import { Modal } from '../../../shared/ui/Modal'
import { cartItemsFindQuantityHandler } from '../model/cart.handler'
import { CartItem } from './CardItem'
import { CartEmpty } from './CartEmpty'

// Todo: Add pagination carts 4 element limit
export const CartContent: FC = () => {
	const { cartItems, carts, admin } = useAppSelector(state => state)
	const { getCartItems, getAllProducts, removeCartItems } = useActions()
	const { toggle, toggleHandler } = useToggle()
	const [cartItemIdToDelete, setCartItemIdToDelete] = useState<number | null>(
		null
	)
	const [productIdToDelete, setProductIdToDelete] = useState<number | null>(
		null
	)

	const { cart } = carts
	const { cartItems: cartItemsData } = cartItems
	const { products } = admin.products

	useEffect(() => {
		if (!cart?.id) return

		getCartItems(cart.id)
		getAllProducts()
	}, [cart])

	if (!products || !cartItemsData) return <CartEmpty />

	const cartItemsWithQuantity = cartItemsFindQuantityHandler(
		products,
		cartItemsData
	)

	const removeProductHandler = (cartItemsId: number, productId: number) => {
		if (!cartItemsId || !productId) return
		removeCartItems(cartItemsId, productId)
	}

	const confirmDeleteHandler = () => {
		if (cartItemIdToDelete !== null && productIdToDelete !== null) {
			removeProductHandler(cartItemIdToDelete, productIdToDelete)
			setCartItemIdToDelete(null)
		}

		toggleHandler()
	}

	const openModalHandler = () => toggleHandler()
	const closeModalHandler = () => toggleHandler()

	return (
		<>
			<div className='flex-auto'>
				{!cartItemsWithQuantity.length ? (
					<CartEmpty />
				) : (
					<>
						{cartItemsWithQuantity.map(productCart => (
							<CartItem
								key={productCart?.id}
								product={productCart}
								showModalHandler={openModalHandler}
								setIdToDelete={setCartItemIdToDelete}
								setProductIdToDelete={setProductIdToDelete}
							/>
						))}
					</>
				)}
			</div>
			{toggle && (
				<Modal
					titleSolutions='delete this cart items'
					onClickSave={confirmDeleteHandler}
					onClickClose={closeModalHandler}
					onClickCancel={closeModalHandler}
				/>
			)}
		</>
	)
}
