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
import { IMappingResponseProductsApi } from '../../../entities/product/types/type.api'
import { IResponseCategoriesApi } from '../../../entities/сategory/types/type.api'
import { IResponseUserAuthApi } from '../../auth/types/type.api'
import { IResponseCartsApi } from '../../cart/types/type.api'
import { IResponseOrdersApi } from '../../order/types/types.api'

// Shared Admin actions
type AdminRequestAction = {
	type: typeof ADMIN_REQUEST
}

// Users ====================
// Success
type AdminUsersGetSuccessAction = {
	type: typeof ADMIN_USERS_GET_SUCCESS
	payload: IResponseUserAuthApi[]
}
type AdminUsersEditSuccessAction = {
	type: typeof ADMIN_USERS_EDIT_SUCCESS
	payload: IResponseUserAuthApi
}
type AdminUsersRemoveSuccessAction = {
	type: typeof ADMIN_USERS_REMOVE_SUCCESS
	payload: number
}
// Failure
type AdminUsersFailureAction = {
	type:
		| typeof ADMIN_USERS_EDIT_FAILURE
		| typeof ADMIN_USERS_GET_FAILURE
		| typeof ADMIN_USERS_REMOVE_FAILURE
	payload: string | boolean
}

type AdminUsersActionTypes =
	| AdminUsersGetSuccessAction
	| AdminUsersEditSuccessAction
	| AdminUsersRemoveSuccessAction
	| AdminUsersFailureAction

// Orders ================

// Success
type AdminOrdersGetSuccessAction = {
	type: typeof ADMIN_ORDERS_GET_SUCCESS
	payload: IResponseOrdersApi[]
}
type AdminOrdersEditSuccessAction = {
	type: typeof ADMIN_ORDERS_EDIT_SUCCESS
	payload: IResponseOrdersApi
}
type AdminOrdersRemoveSuccessAction = {
	type: typeof ADMIN_ORDERS_REMOVE_SUCCESS
	payload: number
}

// Failure
type AdminOrdersFailureAction = {
	type:
		| typeof ADMIN_ORDERS_EDIT_FAILURE
		| typeof ADMIN_ORDERS_GET_FAILURE
		| typeof ADMIN_ORDERS_REMOVE_FAILURE
	payload: string | boolean
}

type AdminOrdersActionTypes =
	| AdminOrdersGetSuccessAction
	| AdminOrdersEditSuccessAction
	| AdminOrdersRemoveSuccessAction
	| AdminOrdersFailureAction

// Products ====================

// Success
type AdminProductsGetSuccessAction = {
	type: typeof ADMIN_PRODUCTS_GET_SUCCESS
	payload: IMappingResponseProductsApi[]
}
type AdminProductGetByIdSuccessAction = {
	type: typeof ADMIN_PRODUCT_GET_BY_ID_SUCCESS
	payload: IMappingResponseProductsApi
}

type AdminProductAddSuccessAction = {
	type: typeof ADMIN_PRODUCTS_ADD_SUCCESS
	payload: IMappingResponseProductsApi
}
type AdminProductEditSuccessAction = {
	type: typeof ADMIN_PRODUCTS_EDIT_SUCCESS
	payload: IMappingResponseProductsApi
}
type AdminProductRemoveSuccessAction = {
	type: typeof ADMIN_PRODUCTS_REMOVE_SUCCESS
	payload: number
}

// Failure
type AdminProductsFailureAction = {
	type:
		| typeof ADMIN_PRODUCTS_GET_FAILURE
		| typeof ADMIN_PRODUCT_GET_BY_ID_FAILURE
		| typeof ADMIN_PRODUCTS_ADD_FAILURE
		| typeof ADMIN_PRODUCTS_EDIT_FAILURE
		| typeof ADMIN_PRODUCTS_REMOVE_FAILURE

	payload: string | boolean
}

type AdminProductsActionTypes =
	| AdminProductsGetSuccessAction
	| AdminProductGetByIdSuccessAction
	| AdminProductAddSuccessAction
	| AdminProductEditSuccessAction
	| AdminProductRemoveSuccessAction
	| AdminProductsFailureAction

// Categories ========================

// Success
type AdminCategoriesGetSuccessAction = {
	type: typeof ADMIN_CATEGORIES_GET_SUCCESS
	payload: IResponseCategoriesApi[]
}

type AdminCategoryGetByIdSuccessAction = {
	type: typeof ADMIN_CATEGORY_GET_BY_ID_SUCCESS
	payload: IResponseCategoriesApi
}

type AdminCategoriesAddSuccessAction = {
	type: typeof ADMIN_CATEGORIES_ADD_SUCCESS
	payload: IResponseCategoriesApi
}

type AdminCategoriesEditSuccessAction = {
	type: typeof ADMIN_CATEGORIES_EDIT_SUCCESS
	payload: IResponseCategoriesApi
}
type AdminCategoriesRemoveSuccessAction = {
	type: typeof ADMIN_CATEGORIES_REMOVE_SUCCESS
	payload: number
}

// Failure
type AdminCategoriesFailureAction = {
	type:
		| typeof ADMIN_CATEGORIES_GET_FAILURE
		| typeof ADMIN_CATEGORY_GET_BY_ID_FAILURE
		| typeof ADMIN_CATEGORIES_ADD_FAILURE
		| typeof ADMIN_CATEGORIES_EDIT_FAILURE
		| typeof ADMIN_CATEGORIES_REMOVE_FAILURE

	payload: string | boolean
}

type AdminCategoriesActionTypes =
	| AdminCategoriesGetSuccessAction
	| AdminCategoryGetByIdSuccessAction
	| AdminCategoriesAddSuccessAction
	| AdminCategoriesEditSuccessAction
	| AdminCategoriesRemoveSuccessAction
	| AdminCategoriesFailureAction

// Carts ============================

// Success
type AdminCartsGetSuccessAction = {
	type: typeof ADMIN_CARTS_GET_SUCCESS
	payload: IResponseCartsApi[]
}
type AdminCartsRemoveSuccessAction = {
	type: typeof ADMIN_CARTS_REMOVE_SUCCESS
	payload: number
}
// Failure
type AdminCartsFailureAction = {
	type: typeof ADMIN_CARTS_GET_FAILURE | typeof ADMIN_CARTS_REMOVE_FAILURE

	payload: string | boolean
}

type AdminCartsActionTypes =
	| AdminCartsGetSuccessAction
	| AdminCartsRemoveSuccessAction
	| AdminCartsFailureAction

// Root ActionTypes =========================
export type AdminActionTypes =
	| AdminRequestAction
	| AdminUsersActionTypes
	| AdminOrdersActionTypes
	| AdminProductsActionTypes
	| AdminCategoriesActionTypes
	| AdminCartsActionTypes
