import { IResponseProductsApi } from '../../../entities/product/types/type.api'
import { IResponseCartItemsApi, ProductWithQtyType } from '../types/type.api'

// Todo: Add join req from backend
export const cartItemsFindQuantityHandler = (
	products: IResponseProductsApi[],
	cartItemsData: IResponseCartItemsApi[]
) =>
	products
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
		.filter((item): item is ProductWithQtyType => Boolean(item))
