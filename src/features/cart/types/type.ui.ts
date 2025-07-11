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

export interface CartItemProps {
	product: IResponseCartItemsApi | null
	showModalHandler: () => void
	setIdToDelete: (id: number) => void
	setProductIdToDelete: (productId: number) => void
}
