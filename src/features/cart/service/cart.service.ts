import { AxiosResponse } from 'axios'
import {
	CART_API_URL,
	CART_API_URL_ADD,
	CART_ITEMS_API_URL,
	CART_ITEMS_API_URL_ADD,
	CART_ITEMS_API_URL_EDIT,
	CART_ITEMS_API_URL_REMOVE,
} from '../../../app/constants/api/cart.api-constants'
import $api from '../../../shared/config/axiosInstance'
import { IResponseCartItemsApi, IResponseCartsApi } from '../types/type.api'

// Carts
class CartsServiceApi {
	async getUserCarts(): Promise<AxiosResponse<IResponseCartsApi>> {
		const response = await $api.get<IResponseCartsApi>(`${CART_API_URL}`)

		if (response.status === 404) {
			throw new Error('User carts not founded')
		}

		return response
	}

	async createdUserCarts(): Promise<AxiosResponse<IResponseCartsApi>> {
		const response = await $api.post<IResponseCartsApi>(CART_API_URL_ADD)

		if (response.status === 404) {
			throw new Error('Error carts not added')
		}

		return response
	}
}
// Cart-items

// ?Error maybe is not correct url
class CartItemsServiceApi {
	async getCartItems(
		cartId: number | string | null
	): Promise<AxiosResponse<IResponseCartItemsApi[]>> {
		const response = await $api.get<IResponseCartItemsApi[]>(
			`${CART_ITEMS_API_URL}/${cartId}`
		)

		if (response.status === 404) {
			throw new Error('Cart-items not founded')
		}

		return response
	}

	async createCartItems(
		cartId: number | null,
		productId: number | null,
		price: number | null,
		cartItemQuantity: number | null
	): Promise<AxiosResponse<IResponseCartItemsApi>> {
		const request = await $api.post(CART_ITEMS_API_URL_ADD, {
			cart_id: cartId,
			product_id: productId,
			quantity: cartItemQuantity,
			price,
		})

		if (request.status === 401) {
			throw new Error('Error add new cart-items')
		}

		return request
	}

	async editCartItems(
		cartItemsId: number | null,
		cartItemQuantity: number | null,
		price: number
	): Promise<AxiosResponse<IResponseCartItemsApi>> {
		const request = await $api.patch<IResponseCartItemsApi>(
			`${CART_ITEMS_API_URL_EDIT}/${cartItemsId}`,
			{
				quantity: cartItemQuantity,
				price,
			}
		)

		if (request.status === 401) {
			throw new Error('Error not founded')
		}

		return request
	}

	async deleteCartItems(cartItemsId: number | string | null): Promise<void> {
		const request = await $api.delete<void>(
			`${CART_ITEMS_API_URL_REMOVE}/${cartItemsId}`
		)

		if (request.status === 404) {
			throw new Error('Error not founded cartItems')
		}

		return
	}
}

export const cartsServiceApi = new CartsServiceApi()
export const cartItemsServiceApi = new CartItemsServiceApi()
