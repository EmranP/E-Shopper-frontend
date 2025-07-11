import { FC, useCallback, useEffect, useState } from 'react'
import { useActions } from '../../../shared/hooks/useActions'
import { usePagination } from '../../../shared/hooks/usePagination'
import { useAppSelector } from '../../../shared/hooks/useStoreApp.hooks'
import { useToggle } from '../../../shared/hooks/useToggle'
import { Modal } from '../../../shared/ui/Modal'
import { changePaginationProduct } from '../../../shared/utils/changePaginationProduct'
import { CartContentUI } from './CartContentUI'
import { CartEmpty } from './CartEmpty'

export const CartContent: FC = () => {
	const [cartItemIdToDelete, setCartItemIdToDelete] = useState<number | null>(
		null
	)
	const [productIdToDelete, setProductIdToDelete] = useState<number | null>(
		null
	)
	const { cart } = useAppSelector(state => state.carts)
	const { cartItemsCommon: cartItemsData, total } = useAppSelector(
		state => state.cartItemsCommon
	)
	const { toggle, toggleHandler } = useToggle()
	const { getCartItems, removeCartItems } = useActions()
	const { page, limit, offset, setSearchParams, searchParams } = usePagination(
		1,
		3
	)

	const totalCartItemPage = Math.max(1, Math.ceil(total / limit))

	const prevPage = useCallback(() => {
		changePaginationProduct(
			page - 1,
			totalCartItemPage,
			searchParams,
			setSearchParams
		)
	}, [page, searchParams, setSearchParams, totalCartItemPage])

	const nextPage = useCallback(() => {
		changePaginationProduct(
			page + 1,
			totalCartItemPage,
			searchParams,
			setSearchParams
		)
	}, [page, searchParams, setSearchParams, totalCartItemPage])

	useEffect(() => {
		if (!searchParams.get('page')) {
			setSearchParams({ page: '1' })
		}
	}, [searchParams, setSearchParams])

	useEffect(() => {
		if (!cart?.id) return

		getCartItems(cart.id, limit, offset)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [cart, limit, offset])

	if (!cartItemsData) return <CartEmpty />

	const removeProductHandler = (cartItemsId: number, productId: number) => {
		if (!cartItemsId || !productId) return
		removeCartItems(cartItemsId, productId)
	}

	const confirmDeleteHandler = () => {
		if (cartItemIdToDelete !== null && productIdToDelete !== null) {
			removeProductHandler(cartItemIdToDelete, productIdToDelete)
			setCartItemIdToDelete(null)
		}

		if (cartItemsData.length <= 1) {
			prevPage()
		}

		toggleHandler()
	}

	const openModalHandler = () => toggleHandler()
	const closeModalHandler = () => toggleHandler()

	const hasItem = cartItemsData.length > 0

	return (
		<div className='flex-auto mb-5'>
			<CartContentUI
				hasItem={hasItem}
				cartItemsData={cartItemsData}
				totalCartItemPage={totalCartItemPage}
				page={page}
				setCartItemIdToDelete={setCartItemIdToDelete}
				setProductIdToDelete={setProductIdToDelete}
				prevPage={prevPage}
				nextPage={nextPage}
				openModalHandler={openModalHandler}
			/>

			{toggle && (
				<Modal
					titleSolutions='delete this cart items'
					onClickSave={confirmDeleteHandler}
					onClickClose={closeModalHandler}
					onClickCancel={closeModalHandler}
				/>
			)}
		</div>
	)
}
