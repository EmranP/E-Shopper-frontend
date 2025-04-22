export interface IResponseOrdersApi {
	id: number
	userId: number
	totalPrice: string
	status: string
	createdAt: string | Date
	updatedAt: string | Date
}

export interface IResponseOrderItemsApi {
	id: number
	orderId: number
	productId: number
	quantity: number
	price: string
	createdAt: Date | string
	updatedAt: Date | string
}
