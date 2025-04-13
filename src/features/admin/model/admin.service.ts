import { AxiosResponse } from 'axios'
import {
	CART_API_URL_ADMIN,
	CART_API_URL_REMOVE,
} from '../../../app/constants/api/cart.api-constants'
import {
	ORDER_API_URL_ADMIN,
	ORDER_API_URL_EDIT,
	ORDER_API_URL_REMOVE,
} from '../../../app/constants/api/order.api-constants'
import { USER_API_URL } from '../../../app/constants/api/user.api-constants'
import { ROLES } from '../../../app/constants/roles/roles'
import $api from '../../../shared/config/axiosInstance'
import { IResponseUserAuthApi } from '../../auth/types/type.api'
import { IResponseCartsApi } from '../../cart/types/type.api'
import { IResponseOrdersApi } from '../../order/types/types.api'

export interface IRequestAdminEditUsersState {
	role: ROLES
}
// !Todo: Completed all Api carts should be created when user going to sign-up

class AdminServiceUsersApi {
	async getAdminUsers(): Promise<AxiosResponse<IResponseUserAuthApi[]>> {
		const response = await $api.get<IResponseUserAuthApi[]>(USER_API_URL)

		if (response.status === 404) {
			throw new Error('Error not found users for admin')
		}
		console.info('Response users:', response.data)
		return response
	}

	async editAdminUser(
		userId: string | number,
		data: IRequestAdminEditUsersState
	): Promise<AxiosResponse<IResponseUserAuthApi>> {
		const response = await $api.patch<IResponseUserAuthApi>(
			`${USER_API_URL}/${userId}`,
			data
		)

		if (response.status === 404) {
			throw new Error('Error from service')
		}

		console.info('Response edit admin users:', response.data)
		return response
	}

	async deleteAdminUser(userId: number | string): Promise<void> {
		const response = await $api.delete<void>(`${USER_API_URL}/${userId}`)

		if (response.status === 404) {
			throw new Error('Error form remove user in dashboard')
		}

		return
	}
}
class AdminServiceOrdersApi {
	async getAllOrders(): Promise<AxiosResponse<IResponseOrdersApi[]>> {
		const response = await $api.get<IResponseOrdersApi[]>(ORDER_API_URL_ADMIN)

		if (response.status === 404) {
			throw new Error('Not found orders from admin panel')
		}

		console.info('Response from orders admin', response.data)
		return response
	}

	async editOrders(
		orderId: number | string,
		data: string
	): Promise<AxiosResponse<IResponseOrdersApi>> {
		const response = await $api.patch<IResponseOrdersApi>(
			`${ORDER_API_URL_EDIT}/${orderId}`,
			{ status: data }
		)

		if (response.status === 404) {
			throw new Error('Not found api for updated orders status')
		}

		console.info('Response updated orders:', response.data)
		return response
	}

	async deleteOrders(orderId: number | string): Promise<void> {
		const response = await $api.delete(`${ORDER_API_URL_REMOVE}/${orderId}`)

		if (response.status === 404) {
			throw new Error('not found api dek')
		}
	}
}

class AdminServiceCartsApi {
	async getAllCarts(): Promise<AxiosResponse<IResponseCartsApi[]>> {
		const response = await $api.get<IResponseOrdersApi[]>(CART_API_URL_ADMIN)

		if (response.status === 404) {
			throw new Error('Not found carts from admin panel')
		}

		console.info('Response from carts admin', response.data)
		return response
	}

	async removeCarts(cartId: number | string): Promise<void> {
		const response = await $api.delete<void>(`${CART_API_URL_REMOVE}/${cartId}`)

		if (response.status === 404) {
			throw new Error('Error carts edit not found')
		}

		return
	}
}

export const adminServiceUsersApi = new AdminServiceUsersApi()
export const adminServiceOrdersApi = new AdminServiceOrdersApi()
export const adminServiceCartsApi = new AdminServiceCartsApi()
