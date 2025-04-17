import { composeWithDevTools } from '@redux-devtools/extension'
import {
	applyMiddleware,
	combineReducers,
	legacy_createStore as createStore,
} from 'redux'
import { thunk, ThunkMiddleware } from 'redux-thunk'
import { searchProductReducer } from '../../entities/product/model/product.reducer'
import { rootAdminReducer } from '../../features/admin/model/admin.store'
import { authReducer } from '../../features/auth/model/auth.reducer'
import {
	cartItemsReducer,
	cartReducer,
} from '../../features/cart/model/carts.reducer'
import { AppActions, RootState } from '../../shared/types/store.types'

export const rootAppReducer = combineReducers({
	auth: authReducer,
	admin: rootAdminReducer,
	carts: cartReducer,
	cartItems: cartItemsReducer,
	searchProduct: searchProductReducer,
})

const thunkMiddleware: ThunkMiddleware<RootState, AppActions> = thunk

const enhancer = composeWithDevTools(applyMiddleware(thunkMiddleware))

export const store = createStore(rootAppReducer, undefined, enhancer)
