import { ADMIN_REQUEST } from '../../../app/constants/actions/admin.constants'
import {
	CART_ADD_FAILURE,
	CART_ADD_SUCCESS,
	CART_GET_FAILURE,
	CART_GET_SUCCESS,
} from '../../../app/constants/actions/cart.constatns'
import { IResponseCartsApi } from './type.api'

interface ICartActionRequest {
	type: typeof ADMIN_REQUEST
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

export type CartActions =
	| ICartActionRequest
	| ICartActionSuccessUserGet
	| ICartActionSuccessUserAdd
	| ICartActionFailure
