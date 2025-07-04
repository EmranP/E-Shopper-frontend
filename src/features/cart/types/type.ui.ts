import { IResponseProductsApi } from '../../../entities/product/types/type.api'

export interface ICartControls {
	quantity: number
	stock: number | null | undefined
	isActiveMinSum: boolean
	isActiveMaxSum: boolean
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
