import { AxiosResponse } from 'axios'
import {
	PRODUCT_API_URL,
	PRODUCT_API_URL_ADD,
	PRODUCT_API_URL_EDIT,
	PRODUCT_API_URL_REMOVE,
	PRODUCT_API_URL_SEARCH,
} from '../../../app/constants/api/product.api-constants'
import $api from '../../../shared/config/axiosInstance'
import {
	IMappingResponseProductsApi,
	IMappingResponseProductsSearchApi,
	IResponseProductsApi,
} from '../types/type.api'

class ProductsServiceApi {
	async getAllProducts(): Promise<
		AxiosResponse<IMappingResponseProductsApi[]>
	> {
		const response = await $api.get<IMappingResponseProductsApi[]>(
			PRODUCT_API_URL
		)

		if (response.status === 404) {
			throw new Error('Products api not foound')
		}

		return response
	}

	async getProductById(
		productId: string | number
	): Promise<AxiosResponse<IMappingResponseProductsApi>> {
		const response = await $api.get<IMappingResponseProductsApi>(
			`${PRODUCT_API_URL}/${productId}`
		)

		if (response.status === 404) {
			throw new Error('Products api not foound')
		}

		return response
	}

	async getProductSearch(
		productSearch: string,
		limit: number | string | null = 10,
		offset: number | string | null = 0
	): Promise<AxiosResponse<IMappingResponseProductsSearchApi>> {
		const response = await $api.get<IMappingResponseProductsSearchApi>(
			`${PRODUCT_API_URL_SEARCH}${productSearch}&limit=${limit}&offset=${offset}`
		)

		if (response.status === 404) {
			throw new Error('Products api not found')
		}

		return response
	}

	async addProduct(
		productData: IResponseProductsApi
	): Promise<AxiosResponse<IMappingResponseProductsApi>> {
		const response = await $api.post<IMappingResponseProductsApi>(
			PRODUCT_API_URL_ADD,
			productData
		)

		if (response.status === 404) {
			throw new Error('Error not found api request product added')
		}

		return response
	}

	async editProduct(
		productId: number | string,
		productData: IResponseProductsApi
	): Promise<AxiosResponse<IMappingResponseProductsApi>> {
		const response = await $api.patch<IMappingResponseProductsApi>(
			`${PRODUCT_API_URL_EDIT}/${productId}`,
			productData
		)

		if (response.status === 404) {
			throw new Error('Error from product edited')
		}

		return response
	}

	async removeProduct(productId: number | string): Promise<void> {
		const response = await $api.delete<void>(
			`${PRODUCT_API_URL_REMOVE}/${productId}`
		)

		if (response.status === 404) {
			throw new Error('not found api')
		}

		return
	}
}

export const productsServiceApi = new ProductsServiceApi()
