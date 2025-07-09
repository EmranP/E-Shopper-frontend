import { FC, useCallback, useEffect, useState } from 'react'
import { Pagination } from '../../../entities/product/ui/Pagination'
import { useActions } from '../../../shared/hooks/useActions'
import { usePagination } from '../../../shared/hooks/usePagination'
import { useAppSelector } from '../../../shared/hooks/useStoreApp.hooks'
import { useToggle } from '../../../shared/hooks/useToggle'
import { Modal } from '../../../shared/ui/Modal'
import { changePaginationProduct } from '../../../shared/utils/changePaginationProduct'
import { cartItemsFindQuantityHandler } from '../model/cart.handler'
import { CartItem } from './CardItem'
import { CartEmpty } from './CartEmpty'

// Todo: Add pagination carts 4 element limit
export const CartContent: FC = () => {
	const [cartItemIdToDelete, setCartItemIdToDelete] = useState<number | null>(
		null
	)
	const [productIdToDelete, setProductIdToDelete] = useState<number | null>(
		null
	)
	const { cart } = useAppSelector(state => state.carts)
	const { cartItems } = useAppSelector(state => state.cartItems)
	const { products, total } = useAppSelector(state => state.admin.products)
	const { toggle, toggleHandler } = useToggle()
	const { getCartItems, getAllProducts, removeCartItems } = useActions()
	const { page, limit, offset, setSearchParams, searchParams } = usePagination(
		1,
		5
	)

	const totalCartItemPage = Math.max(1, Math.ceil(total / limit))

	useEffect(() => {
		if (!searchParams.get('page')) {
			setSearchParams({ page: '1' })
		}
	}, [searchParams, setSearchParams])

	useEffect(() => {
		if (!cart?.id) return

		getCartItems(cart.id, limit, offset)
		getAllProducts(limit, offset)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [cart, limit, offset])

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

	if (!products || !cartItems) return <CartEmpty />

	const cartItemsWithQuantity = cartItemsFindQuantityHandler(
		products,
		cartItems
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

	const hasItems = cartItemsWithQuantity.length > 0

	console.log('totalPage: ', totalCartItemPage)
	console.log('data-items: ', cartItems)
	console.log('product: ', products)
	return (
		<>
			<div className='flex-auto mb-5'>
				{!hasItems ? (
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

				{totalCartItemPage > 1 && (
					<Pagination
						page={page}
						totalPage={totalCartItemPage}
						prevPageHandler={prevPage}
						nextPageHandler={nextPage}
					/>
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
