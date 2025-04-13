import { ThunkAction } from 'redux-thunk'
import { rootAppReducer, store } from '../../app/providers/store'
import { ProductsSearchActionTypes } from '../../entities/product/types/type.model'
import { AdminActionTypes } from '../../features/admin/types/types.model'
import {
	IAdminCartsState,
	IAdminCategoriesState,
	IAdminOrdersState,
	IAdminProductsState,
	IAdminUsersState,
} from '../../features/admin/types/types.state'
import { AuthActionTypes } from '../../features/auth/types/type.model'
import { CartActions } from '../../features/cart/types/type.action'

export type IAdminState =
	| IAdminUsersState
	| IAdminOrdersState
	| IAdminProductsState
	| IAdminCategoriesState
	| IAdminCartsState

// export interface IRootState {
// 	auth: IAuthState | undefined
// 	admin: RootStateAdminReducer | undefined
// 	carts: RootStateCartReducer | undefined
// }

export type RootState = ReturnType<typeof rootAppReducer>
export type AppActions =
	| AuthActionTypes
	| AdminActionTypes
	| CartActions
	| ProductsSearchActionTypes
export type AppDispatch = typeof store.dispatch

// Типизация для Thunk Action
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	AppActions
>
