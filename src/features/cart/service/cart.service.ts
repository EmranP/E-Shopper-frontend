import { AxiosResponse } from 'axios'
import {
	CART_API_URL,
	CART_API_URL_ADD,
} from '../../../app/constants/api/cart.api-constants'
import $api from '../../../shared/config/axiosInstance'
import { IResponseCartsApi } from '../types/type.api'

class CartsServiceApi {
	async getUserCarts(
		userId: number | null
	): Promise<AxiosResponse<IResponseCartsApi>> {
		const response = await $api.get<IResponseCartsApi>(
			`${CART_API_URL}/${userId}`
		)

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

export const cartsServiceApi = new CartsServiceApi()
