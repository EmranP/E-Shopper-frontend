import { ThunkAction } from 'redux-thunk'
import { rootReducer, store } from '../../app/providers/store'

export type AppActions = { type: 'LOGIN_REQUEST' }

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch

// Типизация для Thunk Action
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	AppActions
>
