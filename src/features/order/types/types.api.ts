import { AxiosResponse } from 'axios'
import { IResponseSharedApi } from '../../../shared/types/api.types'

export interface IResponseOrdersApi extends IResponseSharedApi {
	userId: number
	totalPrice: string
	status: string
}

export interface IResponseOrderItemsApi extends IResponseSharedApi {
	orderId: number
	productId: number
	quantity: number
	price: string
}

export type ReturnTypeOrderServiceApi = Promise<
	AxiosResponse<IResponseOrdersApi> | never
>

export type ReturnTypeAllOrderServiceApi = Promise<
	AxiosResponse<IResponseOrdersApi[]> | never
>

export type ReturnTypeAllOrderItemsServiceApi = Promise<
	AxiosResponse<IResponseOrderItemsApi[]> | never
>

export type ReturnTypeOrderItemsServiceApi = Promise<
	AxiosResponse<IResponseOrderItemsApi> | never
>
