export interface IProductCard {
	id?: number | null | undefined
	imageUrl: string | null | undefined
	title: string | null | undefined
	price: number | string | null | undefined
	description: string | null | undefined
	stock: number
}

export interface IPagination {
	page: number
	totalPage: number
	prevPageHandler: () => void
	nextPageHandler: () => void
}
