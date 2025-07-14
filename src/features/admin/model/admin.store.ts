import { combineReducers } from 'redux'
import {
	adminCartsReducer,
	adminCategoriesReducer,
	adminProductsReducer,
	adminUsersReducer,
} from './admin.reducer'

export const rootAdminReducer = combineReducers({
	user: adminUsersReducer,
	products: adminProductsReducer,
	categories: adminCategoriesReducer,
	carts: adminCartsReducer,
})

export type RootStateAdminReducer = ReturnType<typeof rootAdminReducer>
