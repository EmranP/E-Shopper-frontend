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

export interface IRequestProductApi
	extends Omit<IResponseProductsApi, 'categoryId' | 'imageUrl'> {
	category_id: number | null
	image_url: string
}

export interface IProductsApi {
	products: IResponseProductsApi[]
	total: number
}
