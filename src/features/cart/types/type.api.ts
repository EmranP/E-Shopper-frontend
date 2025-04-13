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
