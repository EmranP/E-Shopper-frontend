import { IResponseProductsApi } from '../../../entities/product/types/type.api'

// ! set this is types global level
interface IResponseSharedApi {
	id: number
	createdAt: string | Date
	updatedAt: string | Date
}

export interface IResponseCartsApi extends IResponseSharedApi {
	userId: number
}

export interface IResponseCartItemsApi extends IResponseSharedApi {
	cartId: number
	productId: number
	quantity: number
	price: string
}

export interface ProductWithQtyType extends IResponseProductsApi {
	cartItemId: number
	quantity: number
}
