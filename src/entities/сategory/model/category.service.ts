import { AxiosResponse } from 'axios'
import {
	CATEGORIES_API_URL,
	CATEGORIES_API_URL_ADD,
	CATEGORIES_API_URL_EDIT,
	CATEGORIES_API_URL_REMOVE,
} from '../../../app/constants/api/categories.api-constants'
import $api from '../../../shared/config/axiosInstance'
import { IResponseCategoriesApi } from '../types/type.api'

class CategoryServiceApi {
	async getAllCategories(): Promise<AxiosResponse<IResponseCategoriesApi[]>> {
		const response = await $api.get<IResponseCategoriesApi[]>(
			CATEGORIES_API_URL
		)

		if (response.status === 404) {
			throw new Error('Category not founded')
		}

		return response
	}

	async getCategoryById(
		categoryId: number | string
	): Promise<AxiosResponse<IResponseCategoriesApi>> {
		const response = await $api.get(`${CATEGORIES_API_URL}/${categoryId}`)

		if (response.status === 404) throw new Error('Category id not founded')

		return response
	}

	async addCategory(
		categoryData: string
	): Promise<AxiosResponse<IResponseCategoriesApi>> {
		const response = await $api.post<IResponseCategoriesApi>(
			`${CATEGORIES_API_URL_ADD}`,
			{
				categoryName: categoryData,
			}
		)

		if (response.status === 404) {
			throw new Error('Category is not added')
		}

		return response
	}

	async editCategory(
		categoryId: string | number,
		categoryData: string
	): Promise<AxiosResponse<IResponseCategoriesApi>> {
		const response = await $api.patch<IResponseCategoriesApi>(
			`${CATEGORIES_API_URL_EDIT}/${categoryId}`,
			{ categoryName: categoryData }
		)

		if (response.status === 404) {
			throw new Error('Error category edit not found')
		}

		return response
	}

	async removeCategory(categoryId: string | number): Promise<void> {
		const response = await $api.delete<void>(
			`${CATEGORIES_API_URL_REMOVE}/${categoryId}`
		)

		if (response.status === 404) {
			throw new Error('Error category edit not found')
		}

		return
	}
}

export const categoryService = new CategoryServiceApi()
