import { IAppState } from '../../../shared/types/initState.types'
import { IResponseCartItemsApi, IResponseCartsApi } from './type.api'

export interface ICartState extends IAppState {
	cart: IResponseCartsApi | null
}

export interface ICartItemsState extends IAppState {
	cartItems: IResponseCartItemsApi[] | null
}

export interface ICartItemsCommonState extends IAppState {
	cartItemsCommon: IResponseCartItemsApi[] | null
	total: number
}

export interface ICartModalHandler {
	openModalHandler: () => void
	closeModalHandler: () => void
}
