import {
	ADMIN_CARTS_GET_FAILURE,
	ADMIN_CARTS_GET_SUCCESS,
	ADMIN_CATEGORIES_ADD_FAILURE,
	ADMIN_CATEGORIES_ADD_SUCCESS,
	ADMIN_CATEGORIES_EDIT_FAILURE,
	ADMIN_CATEGORIES_EDIT_SUCCESS,
	ADMIN_CATEGORIES_GET_FAILURE,
	ADMIN_CATEGORIES_GET_SUCCESS,
	ADMIN_CATEGORIES_REMOVE_FAILURE,
	ADMIN_CATEGORIES_REMOVE_SUCCESS,
	ADMIN_CATEGORY_GET_BY_ID_FAILURE,
	ADMIN_CATEGORY_GET_BY_ID_SUCCESS,
	ADMIN_ORDERS_EDIT_FAILURE,
	ADMIN_ORDERS_EDIT_SUCCESS,
	ADMIN_ORDERS_GET_FAILURE,
	ADMIN_ORDERS_GET_SUCCESS,
	ADMIN_ORDERS_REMOVE_FAILURE,
	ADMIN_ORDERS_REMOVE_SUCCESS,
	ADMIN_PRODUCT_GET_BY_ID_FAILURE,
	ADMIN_PRODUCT_GET_BY_ID_SUCCESS,
	ADMIN_PRODUCTS_ADD_FAILURE,
	ADMIN_PRODUCTS_ADD_SUCCESS,
	ADMIN_PRODUCTS_EDIT_FAILURE,
	ADMIN_PRODUCTS_EDIT_SUCCESS,
	ADMIN_PRODUCTS_GET_FAILURE,
	ADMIN_PRODUCTS_GET_SUCCESS,
	ADMIN_PRODUCTS_REMOVE_FAILURE,
	ADMIN_PRODUCTS_REMOVE_SUCCESS,
	ADMIN_REQUEST,
	ADMIN_USERS_EDIT_FAILURE,
	ADMIN_USERS_EDIT_SUCCESS,
	ADMIN_USERS_GET_FAILURE,
	ADMIN_USERS_GET_SUCCESS,
	ADMIN_USERS_REMOVE_FAILURE,
	ADMIN_USERS_REMOVE_SUCCESS,
} from '../../../app/constants/actions/admin.constants'
import { IResponseCategoriesApi } from '../../../entities/сategory/types/type.api'
import { AppActions } from '../../../shared/types/store.types'
import { IResponseUserAuthApi } from '../../auth/types/type.api'
import { IResponseOrdersApi } from '../../order/types/types.api'
import {
	IAdminCartsState,
	IAdminCategoriesState,
	IAdminOrdersState,
	IAdminProductsState,
	IAdminUsersState,
} from '../types/types.state'

// Users
const adminUsersInitialState: IAdminUsersState = {
	users: null,
	isAppLoading: false,
	error: null,
}

export const adminUsersReducer = (
	state = adminUsersInitialState,
	action: AppActions
): IAdminUsersState => {
	switch (action.type) {
		// Shared
		case ADMIN_REQUEST:
			return { ...state, isAppLoading: true, error: null }
		// Success
		case ADMIN_USERS_GET_SUCCESS:
			return {
				...state,
				error: null,
				isAppLoading: false,
				users: action.payload,
			}
		case ADMIN_USERS_EDIT_SUCCESS: {
			const payload = action.payload as IResponseUserAuthApi

			return {
				...state,
				error: null,
				isAppLoading: false,
				users: state.users
					? state.users?.map(user =>
							user.id === payload.id ? { ...user, role: payload.role } : user
					  )
					: state.users,
			}
		}
		case ADMIN_USERS_REMOVE_SUCCESS:
			return {
				...state,
				isAppLoading: false,
				error: null,
				users: state.users?.filter(user => user.id !== action.payload) || null,
			}
		// Failure
		case ADMIN_USERS_GET_FAILURE:
		case ADMIN_USERS_EDIT_FAILURE:
		case ADMIN_USERS_REMOVE_FAILURE:
			return { ...state, isAppLoading: false, error: action.payload }
		default:
			return state
	}
}

// Orders
const adminOrdersInitialState: IAdminOrdersState = {
	orders: null,
	isAppLoading: false,
	error: null,
}

export const adminOrdersReducer = (
	state = adminOrdersInitialState,
	action: AppActions
): IAdminOrdersState => {
	switch (action.type) {
		// Shared
		case ADMIN_REQUEST:
			return { ...state, isAppLoading: true, error: null }
		// Success
		case ADMIN_ORDERS_GET_SUCCESS:
			return {
				...state,
				orders: action.payload,
				isAppLoading: false,
				error: null,
			}
		case ADMIN_ORDERS_EDIT_SUCCESS: {
			const payload = action.payload as IResponseOrdersApi

			return {
				...state,
				isAppLoading: false,
				error: null,
				orders: state.orders
					? state.orders?.map(order =>
							order.id === payload.id
								? { ...order, status: payload.status }
								: order
					  )
					: state.orders,
			}
		}
		case ADMIN_ORDERS_REMOVE_SUCCESS:
			return {
				...state,
				isAppLoading: false,
				error: null,
				orders:
					state.orders?.filter(order => order.id !== action.payload) || null,
			}
		// Failure
		case ADMIN_ORDERS_GET_FAILURE:
		case ADMIN_ORDERS_EDIT_FAILURE:
		case ADMIN_ORDERS_REMOVE_FAILURE:
			return { ...state, isAppLoading: false, error: action.payload }

		default:
			return state
	}
}

// Products
const adminProductsInitialState: IAdminProductsState = {
	products: null,
	productItem: null,
	isAppLoading: false,
	error: null,
}

export const adminProductsReducer = (
	state = adminProductsInitialState,
	action: AppActions
): IAdminProductsState => {
	switch (action.type) {
		// Shared
		case ADMIN_REQUEST:
			return { ...state, isAppLoading: true, error: null }
		// Success
		case ADMIN_PRODUCTS_GET_SUCCESS:
			return {
				...state,
				products: action.payload,
				isAppLoading: false,
				error: null,
			}
		case ADMIN_PRODUCT_GET_BY_ID_SUCCESS:
			return {
				...state,
				productItem: action.payload,
				isAppLoading: false,
				error: null,
			}

		case ADMIN_PRODUCTS_ADD_SUCCESS:
			return {
				...state,
				isAppLoading: false,
				error: null,
				products: state.products
					? [...state.products, action.payload]
					: [action.payload],
			}
		case ADMIN_PRODUCTS_EDIT_SUCCESS: {
			return {
				...state,
				isAppLoading: false,
				error: null,
				products:
					state.products?.map(product =>
						product.id === action.payload.id
							? { ...product, ...action.payload }
							: product
					) || null,
			}
		}

		case ADMIN_PRODUCTS_REMOVE_SUCCESS:
			return {
				...state,
				isAppLoading: false,
				error: null,
				products:
					state.products?.filter(product => product.id !== action.payload) ||
					null,
			}

		// Failure
		case ADMIN_PRODUCTS_GET_FAILURE:
		case ADMIN_PRODUCT_GET_BY_ID_FAILURE:
		case ADMIN_PRODUCTS_ADD_FAILURE:
		case ADMIN_PRODUCTS_EDIT_FAILURE:
		case ADMIN_PRODUCTS_REMOVE_FAILURE:
			return { ...state, isAppLoading: false, error: action.payload }
		default:
			return state
	}
}

// Categories
const adminCategoriesInitialState: IAdminCategoriesState = {
	categories: null,
	categoryItem: null,
	isAppLoading: false,
	error: null,
}

export const adminCategoriesReducer = (
	state = adminCategoriesInitialState,
	action: AppActions
): IAdminCategoriesState => {
	switch (action.type) {
		// shared
		case ADMIN_REQUEST:
			return { ...state, isAppLoading: true, error: null }
		// Success
		case ADMIN_CATEGORIES_GET_SUCCESS:
			return {
				...state,
				categories: action.payload,
				isAppLoading: false,
				error: null,
			}
		case ADMIN_CATEGORY_GET_BY_ID_SUCCESS:
			return {
				...state,
				categoryItem: action.payload,
				isAppLoading: false,
				error: null,
			}
		case ADMIN_CATEGORIES_ADD_SUCCESS:
			return {
				...state,
				categories: state.categories
					? [...state.categories, action.payload]
					: [action.payload],
				isAppLoading: false,
				error: null,
			}
		case ADMIN_CATEGORIES_EDIT_SUCCESS: {
			const payload = action.payload as IResponseCategoriesApi

			return {
				...state,
				isAppLoading: false,
				error: null,
				categories:
					state.categories?.map(category =>
						category.id === payload.id ? { ...category, ...payload } : category
					) || null,
			}
		}
		case ADMIN_CATEGORIES_REMOVE_SUCCESS:
			return {
				...state,
				isAppLoading: false,
				error: null,
				categories:
					state.categories?.filter(
						category => category.id !== action.payload
					) || null,
			}

		// Failure
		case ADMIN_CATEGORIES_GET_FAILURE:
		case ADMIN_CATEGORY_GET_BY_ID_FAILURE:
		case ADMIN_CATEGORIES_ADD_FAILURE:
		case ADMIN_CATEGORIES_EDIT_FAILURE:
		case ADMIN_CATEGORIES_REMOVE_FAILURE:
			return { ...state, isAppLoading: false, error: action.payload }
		default:
			return state
	}
}

// Carts
const adminCartsInitialState: IAdminCartsState = {
	carts: null,
	isAppLoading: false,
	error: null,
}

export const adminCartsReducer = (
	state = adminCartsInitialState,
	action: AppActions
): IAdminCartsState => {
	switch (action.type) {
		// shared
		case ADMIN_REQUEST:
			return { ...state, isAppLoading: true, error: null }
		// Success
		case ADMIN_CARTS_GET_SUCCESS:
			return {
				...state,
				carts: action.payload,
				isAppLoading: false,
				error: null,
			}

		// Failure
		case ADMIN_CARTS_GET_FAILURE:
			return { ...state, isAppLoading: false, error: action.payload }
		default:
			return state
	}
}
