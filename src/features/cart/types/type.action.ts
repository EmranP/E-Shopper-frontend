import { ADMIN_REQUEST } from '../../../app/constants/actions/admin.constants'
import {
	CART_ADD_FAILURE,
	CART_ADD_SUCCESS,
	CART_GET_FAILURE,
	CART_GET_SUCCESS,
	CART_ITEMS_ADD_FAILURE,
	CART_ITEMS_ADD_SUCCESS,
	CART_ITEMS_EDIT_FAILURE,
	CART_ITEMS_EDIT_SUCCESS,
	CART_ITEMS_GET_FAILURE,
	CART_ITEMS_GET_SUCCESS,
	CART_ITEMS_REMOVE_FAILURE,
	CART_ITEMS_REMOVE_SUCCESS,
	CART_REQUEST,
} from '../../../app/constants/actions/cart.constatns'
import { IResponseCartItemsApi, IResponseCartsApi } from './type.api'

// Cart
interface ICartActionRequest {
	type: typeof CART_REQUEST
}

interface ICartActionSuccessUserGet {
	type: typeof CART_GET_SUCCESS
	payload: IResponseCartsApi
}

interface ICartActionSuccessUserAdd {
	type: typeof CART_ADD_SUCCESS
	payload: IResponseCartsApi
}

interface ICartActionFailure {
	type: typeof CART_GET_FAILURE | typeof CART_ADD_FAILURE
	payload: string | null
}

// Cart-items
interface ICartItemsActionRequest {
	type: typeof ADMIN_REQUEST
}

interface ICartItemsGetSuccess {
	type: typeof CART_ITEMS_GET_SUCCESS
	payload: IResponseCartItemsApi[]
}

interface ICartItemsAddSuccess {
	type: typeof CART_ITEMS_ADD_SUCCESS
	payload: IResponseCartItemsApi
}

interface ICartItemsEditSuccess {
	type: typeof CART_ITEMS_EDIT_SUCCESS
	payload: IResponseCartItemsApi
}

interface ICartItemsRemoveSuccess {
	type: typeof CART_ITEMS_REMOVE_SUCCESS
	payload: number
}

interface ICartItemsActionFailure {
	type:
		| typeof CART_ITEMS_GET_FAILURE
		| typeof CART_ITEMS_ADD_FAILURE
		| typeof CART_ITEMS_EDIT_FAILURE
		| typeof CART_ITEMS_REMOVE_FAILURE
	payload: string | null
}

export type CartActions =
	// Carts
	| ICartActionRequest
	| ICartActionSuccessUserGet
	| ICartActionSuccessUserAdd
	| ICartActionFailure
	// Cart items
	| ICartItemsActionRequest
	| ICartItemsGetSuccess
	| ICartItemsAddSuccess
	| ICartItemsEditSuccess
	| ICartItemsRemoveSuccess
	| ICartItemsActionFailure
