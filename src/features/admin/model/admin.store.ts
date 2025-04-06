import { combineReducers } from 'redux'
import {
	adminCartsReducer,
	adminCategoriesReducer,
	adminOrdersReducer,
	adminProductsReducer,
	adminUsersReducer,
} from './admin.reducer'

export const rootAdminReducer = combineReducers({
	user: adminUsersReducer,
	orders: adminOrdersReducer,
	products: adminProductsReducer,
	categories: adminCategoriesReducer,
	carts: adminCartsReducer,
})

export type RootStateAdminReducer = ReturnType<typeof rootAdminReducer>
