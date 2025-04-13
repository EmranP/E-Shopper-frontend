import { IResponseCategoriesApi } from '../../entities/сategory/types/type.api'

export const mapCategoriesToOptions = (
	categories: IResponseCategoriesApi[] | null
) =>
	categories &&
	categories.map(category => ({
		label: category.name,
		value: category.id,
	}))
