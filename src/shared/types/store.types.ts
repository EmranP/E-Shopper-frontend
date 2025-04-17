import { ThunkAction } from 'redux-thunk'
import { rootAppReducer, store } from '../../app/providers/store'
import { ProductsSearchActionTypes } from '../../entities/product/types/type.model'
import { AdminActionTypes } from '../../features/admin/types/types.model'
import { AuthActionTypes } from '../../features/auth/types/type.model'
import { CartActions } from '../../features/cart/types/type.action'

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
