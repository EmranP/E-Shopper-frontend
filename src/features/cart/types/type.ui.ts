import { IResponseCartItemsApi } from './type.api'

export interface ICartControls {
	quantity: number
	isActiveMinSum: boolean
	isActiveMaxSum: boolean
	isAppLoading?: boolean
	stock?: number | null
	increaseStock: () => void
	decreaseStock: () => void
}

export interface ICartItemProps {
	product: IResponseCartItemsApi | null
	showModalHandler: () => void
	setIdToDelete: (id: number) => void
	setProductIdToDelete: (productId: number) => void
}

export interface ICartContentUIProps {
	hasItem: boolean | null
	cartItemsData: IResponseCartItemsApi[]
	totalCartItemPage: number
	page: number
	setCartItemIdToDelete: (ci: number) => void
	setProductIdToDelete: (p: number) => void
	prevPage: () => void
	nextPage: () => void
	openModalHandler: () => void
}

export interface ICartEmpty {
	error?: string | null | boolean
}
