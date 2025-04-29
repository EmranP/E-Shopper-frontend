/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useEffect, useState } from 'react'
import { useActions } from '../../../shared/hooks/useActions'
import { useAppSelector } from '../../../shared/hooks/useStoreApp.hooks'
import { useToggle } from '../../../shared/hooks/useToggle'
import { LoaderApp } from '../../../shared/ui/LoaderApp'
import { Modal } from '../../../shared/ui/Modal'
import { CartItem } from './CardItem'

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
	const { cartItems: cartItemsData, isAppLoading } = cartItems
	const { products } = admin.products

	useEffect(() => {
		if (!cart?.id) return

		getCartItems(cart.id)
		getAllProducts()
	}, [cart])

	if (isAppLoading) return <LoaderApp />

	if (!products || !cartItemsData)
		return (
			<h1 className='text-center text-2xl h-full py-50 text-specialColor font-semibold'>
				Cart is empty... 😢
			</h1>
		)

	const cartItemsWithQuantity = products
		.map(product => {
			const matchingCartItem = cartItemsData.find(
				item => item.productId === product.id
			)

			if (!matchingCartItem) return null

			return {
				...product,
				quantity: matchingCartItem.quantity,
				cartItemId: matchingCartItem.id,
			}
		})
		.filter(Boolean)

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
					<h1 className='text-center text-2xl h-full py-50 text-specialColor font-semibold'>
						Cart is empty... 😢
					</h1>
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
