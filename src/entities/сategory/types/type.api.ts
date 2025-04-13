export interface IResponseCategoriesApi {
	id: number
	name: string
	created_at: string | Date
	updated_at: string | Date
}

export interface IRequestCategoriesAddApi {
	categoryName: string
}
