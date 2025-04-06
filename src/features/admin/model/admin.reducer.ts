import {
	ADMIN_CARTS_GET_FAILURE,
	ADMIN_CARTS_GET_SUCCESS,
	ADMIN_CARTS_REMOVE_FAILURE,
	ADMIN_CARTS_REMOVE_SUCCESS,
	ADMIN_CATEGORIES_ADD_FAILURE,
	ADMIN_CATEGORIES_ADD_SUCCESS,
	ADMIN_CATEGORIES_EDIT_FAILURE,
	ADMIN_CATEGORIES_EDIT_SUCCESS,
	ADMIN_CATEGORIES_GET_FAILURE,
	ADMIN_CATEGORIES_GET_SUCCESS,
	ADMIN_CATEGORIES_REMOVE_FAILURE,
	ADMIN_CATEGORIES_REMOVE_SUCCESS,
	ADMIN_ORDERS_EDIT_FAILURE,
	ADMIN_ORDERS_EDIT_SUCCESS,
	ADMIN_ORDERS_GET_FAILURE,
	ADMIN_ORDERS_GET_SUCCESS,
	ADMIN_ORDERS_REMOVE_FAILURE,
	ADMIN_ORDERS_REMOVE_SUCCESS,
	ADMIN_PRODUCTS_ADD_FAILURE,
	ADMIN_PRODUCTS_ADD_SUCCESS,
	ADMIN_PRODUCTS_EDIT_FAILURE,
	ADMIN_PRODUCTS_EDIT_SUCCESS,
	ADMIN_PRODUCTS_GET_FAILURE,
	ADMIN_PRODUCTS_GET_SUCCESS,
	ADMIN_PRODUCTS_REMOVE_FAILURE,
	ADMIN_PRODUCTS_REMOVE_SUCCESS,
	ADMIN_REQUEST,
	ADMIN_REQUEST_END,
	ADMIN_USERS_EDIT_FAILURE,
	ADMIN_USERS_EDIT_SUCCESS,
	ADMIN_USERS_GET_FAILURE,
	ADMIN_USERS_GET_SUCCESS,
	ADMIN_USERS_REMOVE_FAILURE,
	ADMIN_USERS_REMOVE_SUCCESS,
} from '../../../app/constants/actions/admin.constants'
import { IResponseUserAuthApi } from '../../auth/types/type.api'
import { IResponseOrdersApi } from '../../order/types/types.api'
import { AdminActionTypes } from '../types/types.model'
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
	action: AdminActionTypes
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
			console.log(payload)
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
			return { ...state }
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
	action: AdminActionTypes
): IAdminOrdersState => {
	switch (action.type) {
		// Shared
		case ADMIN_REQUEST:
			return { ...state, isAppLoading: true, error: null }
		case ADMIN_REQUEST_END:
			return { ...state, isAppLoading: false, error: null }
		// Success
		case ADMIN_ORDERS_GET_SUCCESS:
			return {
				...state,
				orders: action.payload,
				isAppLoading: false,
				error: null,
			}
		case ADMIN_ORDERS_EDIT_SUCCESS:
			return {
				...state,
				isAppLoading: false,
				error: null,
				orders: action.payload as IResponseOrdersApi,
			}
		case ADMIN_ORDERS_REMOVE_SUCCESS:
			return { ...state }
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
	isAppLoading: false,
	error: null,
}

export const adminProductsReducer = (
	state = adminProductsInitialState,
	action: AdminActionTypes
): IAdminProductsState => {
	switch (action.type) {
		// Success
		case ADMIN_PRODUCTS_GET_SUCCESS:
		case ADMIN_PRODUCTS_ADD_SUCCESS:
		case ADMIN_PRODUCTS_EDIT_SUCCESS:
			return {
				...state,
				products: action.payload,
				isAppLoading: false,
				error: null,
			}

		case ADMIN_PRODUCTS_REMOVE_SUCCESS:
			return { ...state }

		// Failure
		case ADMIN_PRODUCTS_GET_FAILURE:
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
	isAppLoading: false,
	error: null,
}

export const adminCategoriesReducer = (
	state = adminCategoriesInitialState,
	action: AdminActionTypes
): IAdminCategoriesState => {
	switch (action.type) {
		// Success
		case ADMIN_CATEGORIES_GET_SUCCESS:
		case ADMIN_CATEGORIES_ADD_SUCCESS:
		case ADMIN_CATEGORIES_EDIT_SUCCESS:
			return {
				...state,
				categories: action.payload,
				isAppLoading: false,
				error: null,
			}

		case ADMIN_CATEGORIES_REMOVE_SUCCESS:
			return { ...state }

		// Failure
		case ADMIN_CATEGORIES_GET_FAILURE:
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
	action: AdminActionTypes
): IAdminCartsState => {
	switch (action.type) {
		// Success
		case ADMIN_CARTS_GET_SUCCESS:
			return {
				...state,
				carts: action.payload,
				isAppLoading: false,
				error: null,
			}
		case ADMIN_CARTS_REMOVE_SUCCESS:
			return {
				...state,
				carts: action.payload,
				isAppLoading: false,
				error: null,
			}

		// Failure
		case ADMIN_CARTS_GET_FAILURE:
		case ADMIN_CARTS_REMOVE_FAILURE:
			return { ...state, isAppLoading: false, error: action.payload }
		default:
			return state
	}
}
