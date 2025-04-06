import axios, { AxiosResponse } from 'axios'
import { CATEGORIES_API_URL } from '../../../app/constants/api/categories.api-constants'
import { BASE_API_URL } from '../../../shared/config/axiosInstance'
import { IResponseCategoriesApi } from '../types/type.api'

class CategoryServiceApi {
	async getAllCategories(): Promise<AxiosResponse<IResponseCategoriesApi[]>> {
		const response = await axios.get<AxiosResponse<IResponseCategoriesApi[]>>(
			`${BASE_API_URL}${CATEGORIES_API_URL}/`
		)

		if (response.status === 404) {
			throw new Error('Category not found ')
		}

		return response.data
	}

	async getIdCategories(
		categoryId: number | string
	): Promise<AxiosResponse<IResponseCategoriesApi>> {
		const response = await axios.get<AxiosResponse<IResponseCategoriesApi>>(
			`${BASE_API_URL}${CATEGORIES_API_URL}/${categoryId}`
		)

		if (response.status === 404) {
			throw new Error('Category not found ')
		}

		return response.data
	}
}

export const categoryServiceApi = new CategoryServiceApi()
