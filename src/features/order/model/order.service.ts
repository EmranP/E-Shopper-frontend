import {
	ORDER_API_URL,
	ORDER_API_URL_ADD,
	ORDER_API_URL_ADMIN,
	ORDER_API_URL_EDIT,
	ORDER_API_URL_REMOVE,
} from '../../../app/constants/api/order.api-constants'
import $api from '../../../shared/config/axiosInstance'
import {
	IMessageApi,
	ReturnTypeSharedDeleteServiceApi,
} from '../../../shared/types/api.types'
import { errorNotFoundedApi } from '../../../shared/utils/error-api'
import {
	IResponseOrderItemsApi,
	IResponseOrdersApi,
	ReturnTypeAllOrderItemsServiceApi,
	ReturnTypeAllOrderServiceApi,
	ReturnTypeOrderItemsServiceApi,
	ReturnTypeOrderServiceApi,
} from '../types/types.api'

// !Orders
class OrderServiceApi {
	// Get
	async getAllAdminOrders(): ReturnTypeAllOrderServiceApi {
		const response = await $api.get<IResponseOrdersApi[]>(ORDER_API_URL_ADMIN)

		errorNotFoundedApi(response, 'Order for admin not founded')

		return response
	}

	async getAllCustomerOrders(): ReturnTypeAllOrderServiceApi {
		const response = await $api.get<IResponseOrdersApi[]>(ORDER_API_URL)

		errorNotFoundedApi(response, 'Order for customer not founded')

		return response
	}

	async getOrderById(orderId: number): ReturnTypeOrderServiceApi {
		const response = await $api.get<IResponseOrdersApi>(
			`${ORDER_API_URL}/${orderId}`
		)

		errorNotFoundedApi(response, 'Order by id not founded')

		return response
	}
	// Post
	async addOrder(
		cartId: number,
		totalPrice: number | string
	): ReturnTypeOrderServiceApi {
		const request = await $api.post<IResponseOrdersApi>(ORDER_API_URL_ADD, {
			id: cartId,
			total_price: totalPrice,
		})

		errorNotFoundedApi(request, 'Order for adding not found')

		return request
	}
	// Patch
	async editOrderById(
		orderId: number | string,
		orderStatus: string
	): ReturnTypeOrderServiceApi {
		const request = await $api.patch<IResponseOrdersApi>(
			`${ORDER_API_URL_EDIT}/${orderId}`,
			{
				status: orderStatus,
			}
		)

		errorNotFoundedApi(request, 'Order req for edit not found')

		return request
	}
	// Delete
	async removeOrderById(
		orderId: number | string
	): ReturnTypeSharedDeleteServiceApi {
		const request = await $api.delete<IMessageApi>(
			`${ORDER_API_URL_REMOVE}/${orderId}`
		)

		errorNotFoundedApi(request, 'Order req for remove not founded')

		console.log(request.data.message)
	}
}

export const orderServiceApi = new OrderServiceApi()

// !OrderItems
class OrderItemsServiceApi {
	// Get
	async getAllAdminOrderItems(): ReturnTypeAllOrderItemsServiceApi {
		const response = await $api.get<IResponseOrderItemsApi[]>(
			`${ORDER_API_URL}/items/admin`
		)

		errorNotFoundedApi(response, 'Order-items for admin not founded')

		return response
	}
	async getAllCustomerOrderItems(
		orderId: number | string
	): ReturnTypeAllOrderItemsServiceApi {
		const response = await $api.get<IResponseOrderItemsApi[]>(
			`${ORDER_API_URL}/${orderId}/items`
		)

		errorNotFoundedApi(response, 'Order-items for customer not founded')

		return response
	}
	async getOrderItemsById(
		orderId: number | string,
		orderItemsId: number | string
	): ReturnTypeOrderItemsServiceApi {
		const response = await $api.get<IResponseOrderItemsApi>(
			`${ORDER_API_URL}/${orderId}/items/${orderItemsId}`
		)

		errorNotFoundedApi(response, 'Order-items not founded by id')

		return response
	}
	// Patch
	async editOrderItems(
		orderItemsId: number | string,
		orderItemsData: Partial<IResponseOrderItemsApi>
	): ReturnTypeOrderItemsServiceApi {
		const request = await $api.patch<IResponseOrderItemsApi>(
			`${ORDER_API_URL}/items/${orderItemsId}`,
			{
				order_id: orderItemsData.orderId,
				product_id: orderItemsData.productId,
				quantity: orderItemsData.quantity,
				price: orderItemsData.quantity,
			}
		)

		errorNotFoundedApi(request, 'Order-items for editing not founded')

		return request
	}
	// Delete
	async removeOrderItems(
		orderItemId: number | string
	): ReturnTypeSharedDeleteServiceApi {
		const request = await $api.delete<IMessageApi>(
			`${ORDER_API_URL}/items/${orderItemId}`
		)

		errorNotFoundedApi(request, 'Order-items for remove not founded')

		console.log(request.data.message)
	}
}

export const orderItemsServiceApi = new OrderItemsServiceApi()
