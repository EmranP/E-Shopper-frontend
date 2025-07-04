import { Dispatch, SetStateAction } from 'react'
import { IResponseProductsApi } from './type.api'

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

export interface IProductPanelSorted {
	productList: IResponseProductsApi[]
	sortedByPriceDesc: boolean
	setSortedByPriceDesc: Dispatch<SetStateAction<boolean>>
}

export interface IProductsSortedContent {
	sortedProducts: IResponseProductsApi[]
}
