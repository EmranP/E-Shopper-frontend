import { AxiosResponse } from 'axios'
import { IResponseSharedApi } from '../../../shared/types/api.types'

export interface IResponseCartsApi extends IResponseSharedApi {
	userId: number
}

export interface IResponseCartItemsApi extends IResponseSharedApi {
	cartId: number
	productId: number
	quantity: number | undefined
	price: string | undefined | null
	imageUrl: string | undefined
	stock: number | null
	name: string | undefined
	productCreatedAt: Date | string
	productUpdatedAt: Date | string
}

export interface ICartItemsApi {
	cartItems: IResponseCartItemsApi[]
	total: number
}

export type ReturnTypeCartServiceApi = Promise<
	AxiosResponse<IResponseCartsApi> | never
>

export type ReturnTypeCartItemsServiceApi = Promise<
	AxiosResponse<IResponseCartItemsApi> | never
>
