import { ThunkAction } from 'redux-thunk'
import { store } from '../../app/providers/store'
import { IAuthState } from '../../features/auth/model/auth.reducer'
import { AuthActionTypes } from '../../features/auth/types/type.model'

export interface IRootState {
	auth: IAuthState
}

export type RootState = ReturnType<typeof store.getState>
export type AppActions = AuthActionTypes
export type AppDispatch = typeof store.dispatch

// Типизация для Thunk Action
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	undefined,
	AppActions
>
