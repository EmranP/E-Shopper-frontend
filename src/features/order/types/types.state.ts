import { IAppState } from '../../../shared/types/initState.types'
import { IResponseOrderItemsApi, IResponseOrdersApi } from './types.api'

export interface IOrderState extends IAppState {
	orders: IResponseOrdersApi[] | null
	orderItem: IResponseOrdersApi | null
}

export interface IOrderItemsState extends IAppState {
	orderItems: IResponseOrderItemsApi[] | null
	orderItemEl: IResponseOrderItemsApi | null
}
