export interface IResponseProductsApi {
	id: number
	name: string
	description: string
	price: string
	stock: number
	categoryId: number
	createdAt: string | Date
	updatedAt: string | Date
	imageUrl: string
	userId: number
	searchVector: string
}
