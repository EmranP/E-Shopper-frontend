import {
	ORDER_ADD_FAILURE,
	ORDER_ADD_SUCCESS,
	ORDER_EDIT_FAILURE,
	ORDER_EDIT_SUCCESS,
	ORDER_GET_BY_ID_FAILURE,
	ORDER_GET_BY_ID_SUCCESS,
	ORDER_GET_FAILURE,
	ORDER_GET_SUCCESS,
	ORDER_ITEMS_ADD_FAILURE,
	ORDER_ITEMS_ADD_SUCCESS,
	ORDER_ITEMS_BY_ID_FAILURE,
	ORDER_ITEMS_BY_ID_SUCCESS,
	ORDER_ITEMS_EDIT_FAILURE,
	ORDER_ITEMS_EDIT_SUCCESS,
	ORDER_ITEMS_GET_FAILURE,
	ORDER_ITEMS_GET_SUCCESS,
	ORDER_ITEMS_REMOVE_FAILURE,
	ORDER_ITEMS_REMOVE_SUCCESS,
	ORDER_ITEMS_REQUEST,
	ORDER_REMOVE_FAILURE,
	ORDER_REMOVE_SUCCESS,
	ORDER_REQUEST,
} from '../../../app/constants/actions/order.constants'
import { IResponseOrderItemsApi, IResponseOrdersApi } from './types.api'

// Order
interface IOrderRequestActionType {
	type: typeof ORDER_REQUEST
}

interface IOrderActionSuccessGetType {
	type: typeof ORDER_GET_SUCCESS
	payload: IResponseOrdersApi[]
}

interface IOrderActionSuccessGetByIdType {
	type: typeof ORDER_GET_BY_ID_SUCCESS
	payload: IResponseOrdersApi
}

interface IOrderActionSuccessAddType {
	type: typeof ORDER_ADD_SUCCESS
	payload: IResponseOrdersApi
}

interface IOrderActionSuccessEditType {
	type: typeof ORDER_EDIT_SUCCESS
	payload: IResponseOrdersApi
}

interface IOrderActionSuccessRemoveType {
	type: typeof ORDER_REMOVE_SUCCESS
	payload: number
}

interface IOrderActionFailureTypes {
	type:
		| typeof ORDER_GET_FAILURE
		| typeof ORDER_GET_BY_ID_FAILURE
		| typeof ORDER_ADD_FAILURE
		| typeof ORDER_EDIT_FAILURE
		| typeof ORDER_REMOVE_FAILURE
	payload: string
}

type OrderActionType =
	| IOrderRequestActionType
	| IOrderActionSuccessGetType
	| IOrderActionSuccessGetByIdType
	| IOrderActionSuccessAddType
	| IOrderActionSuccessEditType
	| IOrderActionSuccessRemoveType
	| IOrderActionFailureTypes

// Order-items

interface IOrderItemsActionRequestType {
	type: typeof ORDER_ITEMS_REQUEST
}

interface IOrderItemsActionSuccessGetType {
	type: typeof ORDER_ITEMS_GET_SUCCESS
	payload: IResponseOrderItemsApi[]
}

interface IOrderItemsActionSuccessGetByIdType {
	type: typeof ORDER_ITEMS_BY_ID_SUCCESS
	payload: IResponseOrderItemsApi
}

interface IOrderItemsActionSuccessAddType {
	type: typeof ORDER_ITEMS_ADD_SUCCESS
	payload: IResponseOrderItemsApi
}

interface IOrderItemsActionSuccessEditType {
	type: typeof ORDER_ITEMS_EDIT_SUCCESS
	payload: IResponseOrderItemsApi
}

interface IOrderItemsActionSuccessRemoveType {
	type: typeof ORDER_ITEMS_REMOVE_SUCCESS
	payload: number
}

interface IOrderItemsActionFailureType {
	type:
		| typeof ORDER_ITEMS_GET_FAILURE
		| typeof ORDER_ITEMS_BY_ID_FAILURE
		| typeof ORDER_ITEMS_ADD_FAILURE
		| typeof ORDER_ITEMS_EDIT_FAILURE
		| typeof ORDER_ITEMS_REMOVE_FAILURE
	payload: string
}

type OrderItemsActionType =
	| IOrderItemsActionRequestType
	| IOrderItemsActionSuccessGetType
	| IOrderItemsActionSuccessGetByIdType
	| IOrderItemsActionSuccessAddType
	| IOrderItemsActionSuccessEditType
	| IOrderItemsActionSuccessRemoveType
	| IOrderItemsActionFailureType

export type OrderCommonActionType = OrderActionType | OrderItemsActionType
