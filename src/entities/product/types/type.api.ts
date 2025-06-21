export interface IResponseProductsApi {
	id?: number
	name: string
	description: string
	price: string | number
	stock: number
	categoryId: number | null
	createdAt?: string | Date
	updatedAt?: string | Date
	imageUrl: string
	userId: number | null
	searchVector?: string
}

export interface IProductsApi {
	products: IResponseProductsApi[]
	total: number
}
