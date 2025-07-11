import { FC } from 'react'
import { Pagination } from '../../../entities/product/ui/Pagination'
import { ICartContentUIProps } from '../types/type.ui'
import { CartItem } from './CardItem'
import { CartEmpty } from './CartEmpty'

export const CartContentUI: FC<ICartContentUIProps> = ({
	hasItem,
	cartItemsData,
	openModalHandler,
	setCartItemIdToDelete,
	setProductIdToDelete,
	totalCartItemPage,
	page,
	prevPage,
	nextPage,
}) => {
	return (
		<>
			{!hasItem ? (
				<CartEmpty />
			) : (
				<>
					{cartItemsData.map(productCart => (
						<CartItem
							key={productCart?.id}
							product={productCart}
							showModalHandler={openModalHandler}
							setIdToDelete={setCartItemIdToDelete}
							setProductIdToDelete={setProductIdToDelete}
						/>
					))}

					{totalCartItemPage > 1 && (
						<Pagination
							page={page}
							totalPage={totalCartItemPage}
							prevPageHandler={prevPage}
							nextPageHandler={nextPage}
						/>
					)}
				</>
			)}
		</>
	)
}
