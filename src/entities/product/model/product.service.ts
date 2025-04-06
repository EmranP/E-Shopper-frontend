import axios, { AxiosResponse } from 'axios'
import {
	PRODUCT_API_URL,
	PRODUCT_API_URL_ADD,
	PRODUCT_API_URL_EDIT,
	PRODUCT_API_URL_REMOVE,
	PRODUCT_API_URL_SEARCH,
} from '../../../app/constants/api/product.api-constants'
import { IResponseProductsApi } from '../types/type.api'

class ProductsServiceApi {
	async getAllProducts(): Promise<AxiosResponse<IResponseProductsApi[]>> {
		const response = await axios.get<AxiosResponse<IResponseProductsApi[]>>(
			PRODUCT_API_URL
		)

		if (response.status === 404) {
			throw new Error('Products api not foound')
		}

		return response.data
	}

	async getProductById(
		productId: string | number
	): Promise<AxiosResponse<IResponseProductsApi>> {
		const response = await axios.get<AxiosResponse<IResponseProductsApi>>(
			`${PRODUCT_API_URL}/${productId}`
		)

		if (response.status === 404) {
			throw new Error('Products api not foound')
		}

		return response.data
	}

	async getProductSearch(
		productSearch: string,
		limit: number | string,
		offset: number | string
	): Promise<AxiosResponse<IResponseProductsApi[]>> {
		const response = await axios.get<AxiosResponse<IResponseProductsApi[]>>(
			`${PRODUCT_API_URL_SEARCH}?${productSearch}&limit=${limit}&offset=${offset}`
		)

		if (response.status === 404) {
			throw new Error('Products api not foound')
		}

		return response.data
	}

	async addProduct(
		productData: IResponseProductsApi,
		userId: number
	): Promise<AxiosResponse<IResponseProductsApi>> {
		const response = await axios.post<AxiosResponse<IResponseProductsApi>>(
			PRODUCT_API_URL_ADD,
			{ ...productData, user_id: userId }
		)

		if (response.status === 404) {
			throw new Error('Error not found api request product added')
		}

		return response.data
	}

	async editProduct(
		productId: number | string,
		productData: IResponseProductsApi,
		userId: number
	): Promise<AxiosResponse<IResponseProductsApi>> {
		const response = await axios.patch<AxiosResponse<IResponseProductsApi>>(
			`${PRODUCT_API_URL_EDIT}/${productId}`,
			{
				...productData,
				user_id: userId,
			}
		)

		if (response.status === 404) {
			throw new Error('Error from product edited')
		}

		return response.data
	}

	async removeProduct(productId: number | string): Promise<void> {
		const response = await axios.delete<AxiosResponse<void>>(
			`${PRODUCT_API_URL_REMOVE}/${productId}`
		)

		if (response.status === 404) {
			throw new Error('not found api')
		}

		return
	}
}

export const productsServiceApi = new ProductsServiceApi()
