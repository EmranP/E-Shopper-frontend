import {
	CART_ADD_FAILURE,
	CART_ADD_SUCCESS,
	CART_GET_FAILURE,
	CART_GET_SUCCESS,
	CART_ITEMS_ADD_FAILURE,
	CART_ITEMS_ADD_SUCCESS,
	CART_ITEMS_EDIT_FAILURE,
	CART_ITEMS_EDIT_SUCCESS,
	CART_ITEMS_GET_ALL_FAILURE,
	CART_ITEMS_GET_ALL_SUCCESS,
	CART_ITEMS_GET_FAILURE,
	CART_ITEMS_GET_SUCCESS,
	CART_ITEMS_PAGINATION_REQUEST,
	CART_ITEMS_REMOVE_FAILURE,
	CART_ITEMS_REMOVE_SUCCESS,
	CART_ITEMS_REQUEST,
	CART_REQUEST,
} from '../../../app/constants/actions/cart.constants'
import {
	ICartItemsApi,
	IResponseCartItemsApi,
	IResponseCartsApi,
} from './type.api'

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
interface ICartItemsAllActionRequest {
	type: typeof CART_ITEMS_REQUEST
}

interface ICartItemsPaginationActionRequest {
	type: typeof CART_ITEMS_PAGINATION_REQUEST
}

interface ICartItemsGetAllSuccess {
	type: typeof CART_ITEMS_GET_ALL_SUCCESS
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
		| typeof CART_ITEMS_GET_ALL_FAILURE
		| typeof CART_ITEMS_ADD_FAILURE
		| typeof CART_ITEMS_EDIT_FAILURE
		| typeof CART_ITEMS_REMOVE_FAILURE
	payload: string
}

export type CartActionsType =
	// Carts
	| ICartActionRequest
	| ICartActionSuccessUserGet
	| ICartActionSuccessUserAdd
	| ICartActionFailure
	// Cart items
	| ICartItemsAllActionRequest
	| ICartItemsGetAllSuccess
	| ICartItemsAddSuccess
	| ICartItemsEditSuccess
	| ICartItemsRemoveSuccess
	| ICartItemsActionFailure

interface ICartItemsGetSuccess {
	type: typeof CART_ITEMS_GET_SUCCESS
	payload: ICartItemsApi
}

interface ICartItemsActionFailureType {
	type: typeof CART_ITEMS_GET_FAILURE
	payload: string | null
}

interface ICartItemsRemovePaginationActionType {
	type: typeof CART_ITEMS_REMOVE_SUCCESS
	payload: number
}

export type ICartItemsCommonActionsType =
	| ICartItemsPaginationActionRequest
	| ICartItemsGetSuccess
	| ICartItemsRemovePaginationActionType
	| ICartItemsActionFailureType
