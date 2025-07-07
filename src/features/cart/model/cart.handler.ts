import { IResponseProductsApi } from '../../../entities/product/types/type.api'
import { IResponseCartItemsApi } from '../types/type.api'

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
		.filter(Boolean)
