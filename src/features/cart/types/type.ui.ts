import { IResponseProductsApi } from '../../../entities/product/types/type.api'

export interface ICartControls {
	quantity: number
	isActiveMinSum: boolean
	isActiveMaxSum: boolean
	isAppLoading?: boolean
	stock?: number | null
	increaseStock: () => void
	decreaseStock: () => void
}

interface ICartItemProduct extends IResponseProductsApi {
	quantity: number
	cartItemId: number
}

export interface CartItemProps {
	product: ICartItemProduct | null
	showModalHandler: () => void
	setIdToDelete: (id: number) => void
	setProductIdToDelete: (productId: number) => void
}
