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
	quantity: number | undefined
	price: string | undefined | null
	imageUrl: string | undefined
	stock: number | null
	name: string | undefined
	productCreatedAt: Date | string
	productUpdatedAt: Date | string
}

export interface ICartItemsApi {
	cartItems: IResponseCartItemsApi[]
	total: number
}
