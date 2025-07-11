import { Dispatch, SetStateAction } from 'react'
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
	hasItem: boolean
	cartItemsData: IResponseCartItemsApi[]
	totalCartItemPage: number
	page: number
	setCartItemIdToDelete: Dispatch<SetStateAction<number | null>>
	setProductIdToDelete: Dispatch<SetStateAction<number | null>>
	prevPage: () => void
	nextPage: () => void
	openModalHandler: () => void
}
