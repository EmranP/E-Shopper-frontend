export interface IResponseProductsApi {
	id?: number
	name: string
	description: string
	price: string | number
	stock: number
	category_id: number | null
	createdAt?: string | Date
	updatedAt?: string | Date
	image_url: string
	userId: number | null
	searchVector?: string
}

export interface IMappingResponseProductsApi
	extends Omit<IResponseProductsApi, 'category_id' | 'image_url'> {
	categoryId: number | null
	imageUrl: string
}

export interface IMappingResponseProductsSearchApi {
	products: IMappingResponseProductsApi[]
	total: number
}
