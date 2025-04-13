import { IAppState } from '../../../shared/types/initState.types'
import { cartItemsReducer, cartReducer } from '../model/carts.reducer'
import { IResponseCartItemsApi, IResponseCartsApi } from './type.api'

export interface ICartState extends IAppState {
	cart: IResponseCartsApi | null
}

export interface ICartItemsState extends IAppState {
	cartItems: IResponseCartItemsApi[] | null
}

export type RootStateCartReducer = ReturnType<typeof cartReducer>
export type RootStateCartItemsReducer = ReturnType<typeof cartItemsReducer>
