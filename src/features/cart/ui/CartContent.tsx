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
	}, [])

	const cartItemsWithQuantity = products
		?.map(product => {
			const matchingCartItem = cartItemsData?.find(
				item => item.productId === product.id
			)
			if (!matchingCartItem) return null
			return {
				...product,
				quantity: matchingCartItem.quantity,
			}
		})
		.filter(Boolean)

	console.log(cartItemsWithQuantity)
	const removeProductHandler = (cartItemsId: number, productId: number) => {
		if (!productId && !cartItemsId) return
		removeCartItems(cartItemsId, productId)
	}

	const confirmDeleteHandler = () => {
		if (productIdToDelete !== null && cart?.id !== null) {
			removeProductHandler(cart?.id as number, productIdToDelete)
			setProductIdToDelete(null)
		}

		toggleHandler()
	}

	const showModalHandler = () => toggleHandler()

	if (isAppLoading) return <LoaderApp />

	return (
		<>
			<div className='flex-auto'>
				{cartItemsWithQuantity?.length === 0 ? (
					<h1>Cart is empty... 😢</h1>
				) : (
					<>
						{cartItemsWithQuantity?.map(productCart => (
							<CartItem
								key={productCart?.id}
								product={productCart}
								showModalHandler={showModalHandler}
								setIdToDelete={setProductIdToDelete}
							/>
						))}
					</>
				)}
			</div>
			{toggle && (
				<Modal
					titleSolutions='delete this is cart-items product'
					onClickSave={confirmDeleteHandler}
					onClickClose={showModalHandler}
					onClickCancel={showModalHandler}
				/>
			)}
		</>
	)
}
