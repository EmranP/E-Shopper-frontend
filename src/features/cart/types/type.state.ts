import { IAppState } from '../../../shared/types/initState.types'
import { cartReducer } from '../model/carts.reducer'
import { IResponseCartsApi } from './type.api'

export interface ICartState extends IAppState {
	cart: IResponseCartsApi | null
}

export type RootStateCartReducer = ReturnType<typeof cartReducer>
