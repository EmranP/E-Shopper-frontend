import { composeWithDevTools } from '@redux-devtools/extension'
import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunk, { ThunkMiddleware } from 'redux-thunk'
import { AppActions } from '../../shared/types/store.types'

export const rootReducer = combineReducers({})

export const store = createStore(
	rootReducer,
	composeWithDevTools(
		applyMiddleware(thunk as unknown as ThunkMiddleware<RootState, AppActions>)
	)
)

export type RootState = ReturnType<typeof rootReducer>
