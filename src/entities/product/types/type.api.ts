import { IResponseSharedApi } from '../../../shared/types/api.types'

export interface IResponseProductsApi extends IResponseSharedApi {
	name: string
	description: string
	price: string | number
	stock: number
	categoryId: number | null
	imageUrl: string
	userId: number | null | undefined
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
