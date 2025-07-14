import { IResponseCategoriesApi } from '../../entities/category/types/type.api'

export const mapCategoriesToOptions = (
	categories: IResponseCategoriesApi[] | null
) =>
	categories?.map(category => ({
		label: category.name,
		value: category.id,
	}))
