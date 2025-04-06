import { ThunkAction } from 'redux-thunk'
import { store } from '../../app/providers/store'
import { RootStateAdminReducer } from '../../features/admin/model/admin.store'
import { AdminActionTypes } from '../../features/admin/types/types.model'
import {
	IAdminCartsState,
	IAdminCategoriesState,
	IAdminOrdersState,
	IAdminProductsState,
	IAdminUsersState,
} from '../../features/admin/types/types.state'
import { IAuthState } from '../../features/auth/model/auth.reducer'
import { AuthActionTypes } from '../../features/auth/types/type.model'

export type IAdminState =
	| IAdminUsersState
	| IAdminOrdersState
	| IAdminProductsState
	| IAdminCategoriesState
	| IAdminCartsState

export interface IRootState {
	auth: IAuthState
	admin: RootStateAdminReducer
}

export type RootState = ReturnType<typeof store.getState>
export type AppActions = AuthActionTypes | AdminActionTypes
export type AppDispatch = typeof store.dispatch

// Типизация для Thunk Action
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	undefined,
	AppActions
>
