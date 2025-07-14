import { FC, useCallback, useEffect, useMemo, useState } from 'react'
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
	const actions = useActions()
	const { page, limit, offset, setSearchParams, searchParams } = usePagination(
		1,
		3
	)

	const getCartItems = useMemo(() => actions.getCartItems, [])
	const removeCartItems = useMemo(() => actions.removeCartItems, [])

	useEffect(() => {
		if (!searchParams.get('page')) {
			setSearchParams({ page: '1' })
		}
	}, [searchParams, setSearchParams])

	useEffect(() => {
		if (!cart?.id) return

		getCartItems(cart.id, limit, offset)
	}, [cart, getCartItems, limit, offset, searchParams])

	const totalCartItemPage = Math.max(1, Math.ceil(total / limit))
	const navPagination = useCallback(
		(dir: -1 | 1) =>
			changePaginationProduct(
				page + dir,
				totalCartItemPage,
				searchParams,
				setSearchParams
			),
		[page, searchParams, setSearchParams, totalCartItemPage]
	)

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
			navPagination(-1)
		}

		toggleHandler()
	}

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
				prevPage={() => navPagination(-1)}
				nextPage={() => navPagination(1)}
				openModalHandler={() => toggleHandler()}
			/>

			{toggle && (
				<Modal
					titleSolutions='delete this cart items'
					onClickSave={confirmDeleteHandler}
					onClickClose={() => toggleHandler()}
					onClickCancel={() => toggleHandler()}
				/>
			)}
		</div>
	)
}
