import { composeWithDevTools } from '@redux-devtools/extension'
import {
	applyMiddleware,
	combineReducers,
	legacy_createStore as createStore,
	Reducer,
} from 'redux'
import { thunk, ThunkMiddleware } from 'redux-thunk'
import { authReducer } from '../../features/auth/model/auth.reducer'
import { AppActions, IRootState } from '../../shared/types/store.types'

export const rootAppReducer: Reducer<IRootState, AppActions> = combineReducers({
	auth: authReducer,
})

const thunkMiddleware: ThunkMiddleware<IRootState, AppActions> = thunk

const configMiddlewareThunk = composeWithDevTools(
	applyMiddleware(thunkMiddleware)
)

export const store = createStore<IRootState, AppActions, object, object>(
	rootAppReducer,
	configMiddlewareThunk
)
