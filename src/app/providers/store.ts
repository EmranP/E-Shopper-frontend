import { composeWithDevTools } from '@redux-devtools/extension'
import {
	applyMiddleware,
	combineReducers,
	legacy_createStore as createStore,
	Reducer,
} from 'redux'
import { thunk, ThunkMiddleware } from 'redux-thunk'
import { rootAdminReducer } from '../../features/admin/model/admin.store'
import { authReducer } from '../../features/auth/model/auth.reducer'
import { AppActions, IRootState } from '../../shared/types/store.types'

export const rootAppReducer: Reducer<IRootState, AppActions> = combineReducers({
	auth: authReducer,
	admin: rootAdminReducer,
})

const thunkMiddleware: ThunkMiddleware<IRootState, AppActions> = thunk

const configMiddlewareThunk = composeWithDevTools(
	applyMiddleware(thunkMiddleware)
)

export const store = createStore<IRootState, AppActions, object, object>(
	rootAppReducer,
	configMiddlewareThunk
)
