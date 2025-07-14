/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useCallback, useEffect, useMemo, useState } from 'react'
import { useActions } from '../../../shared/hooks/useActions'
import { usePagination } from '../../../shared/hooks/usePagination'
import { useAppSelector } from '../../../shared/hooks/useStoreApp.hooks'
import { useToggle } from '../../../shared/hooks/useToggle'
import { LoaderApp } from '../../../shared/ui/LoaderApp'
import { Modal } from '../../../shared/ui/Modal'
import { changePaginationProduct } from '../../../shared/utils/changePaginationProduct'
import { CartContentUI } from './CartContentUI'

export const CartContent: FC = () => {
	const { cart } = useAppSelector(state => state.carts)
	const {
		cartItemsCommon: cartItemsData,
		total,
		isAppLoading,
	} = useAppSelector(state => state.cartItemsCommon)

	const { toggle, toggleHandler } = useToggle()
	const { page, limit, offset, setSearchParams, searchParams } = usePagination(
		1,
		3
	)
	const actions = useActions()

	const [toDelete, setToDelete] = useState<{
		ci: number | null
		p: number | null
	} | null>(null)

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

	const confirmDeleteHandler = useCallback(() => {
		if (toDelete) {
			removeCartItems(toDelete.ci, toDelete.p)
			if (cartItemsData && cartItemsData.length <= 1) navPagination(-1)
			setToDelete(null)
		}
		toggleHandler()
	}, [toDelete, toggleHandler, removeCartItems, cartItemsData, navPagination])

	const hasItem = cartItemsData && cartItemsData.length > 0

	if (isAppLoading) return <LoaderApp />

	return (
		<div className='flex-auto mb-5'>
			<CartContentUI
				hasItem={hasItem}
				cartItemsData={cartItemsData}
				totalCartItemPage={totalCartItemPage}
				page={page}
				setCartItemIdToDelete={ci =>
					setToDelete(t => ({ ci, p: t?.p ?? null }))
				}
				setProductIdToDelete={p => setToDelete(t => ({ ci: t?.ci ?? null, p }))}
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
