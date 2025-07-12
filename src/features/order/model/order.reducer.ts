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
import { AppActions } from '../../../shared/types/store.types'
import { IOrderItemsState, IOrderState } from '../types/types.state'

const orderInitState: IOrderState = {
	orders: null,
	orderItem: null,
	isAppLoading: false,
	error: null,
}

export const orderReducer = (
	state = orderInitState,
	action: AppActions
): IOrderState => {
	switch (action.type) {
		case ORDER_REQUEST:
			return { ...state, isAppLoading: true, error: null }
		case ORDER_GET_SUCCESS:
			return {
				...state,
				orders: action.payload,
				isAppLoading: false,
				error: null,
			}
		case ORDER_GET_BY_ID_SUCCESS:
			return {
				...state,
				isAppLoading: false,
				error: null,
				orderItem: action.payload,
			}
		case ORDER_ADD_SUCCESS:
			return {
				...state,
				isAppLoading: false,
				error: null,
				orders: state.orders
					? [...state.orders, action.payload]
					: [action.payload],
			}
		case ORDER_EDIT_SUCCESS:
			return {
				...state,
				isAppLoading: false,
				error: null,
				orders:
					state.orders?.map(orderEl =>
						orderEl.id === action.payload.id
							? { ...orderEl, ...action.payload }
							: action.payload
					) || [],
			}
		case ORDER_REMOVE_SUCCESS:
			return {
				...state,
				isAppLoading: false,
				error: null,
				orders:
					state.orders?.filter(
						orderFilter => orderFilter.id !== action.payload
					) || null,
			}

		// Failure
		case ORDER_GET_FAILURE:
		case ORDER_GET_BY_ID_FAILURE:
		case ORDER_ADD_FAILURE:
		case ORDER_EDIT_FAILURE:
		case ORDER_REMOVE_FAILURE:
			return { ...state, isAppLoading: false, error: action.payload }
		default:
			return state
	}
}

// Order-items
const orderItemsInitState: IOrderItemsState = {
	orderItems: null,
	orderItemEl: null,
	isAppLoading: false,
	error: null,
}

export const orderItemsReducer = (
	state = orderItemsInitState,
	action: AppActions
): IOrderItemsState => {
	switch (action.type) {
		case ORDER_ITEMS_REQUEST:
			return {
				...state,
				isAppLoading: true,
				error: null,
			}
		case ORDER_ITEMS_GET_SUCCESS:
			return {
				...state,
				isAppLoading: false,
				error: null,
				orderItems: action.payload,
			}
		case ORDER_ITEMS_BY_ID_SUCCESS:
			return {
				...state,
				isAppLoading: false,
				error: null,
				orderItemEl: action.payload,
			}
		case ORDER_ITEMS_ADD_SUCCESS:
			return {
				...state,
				isAppLoading: false,
				error: null,
				orderItems: state.orderItems
					? [...state.orderItems, action.payload]
					: [action.payload],
			}
		case ORDER_ITEMS_EDIT_SUCCESS:
			return {
				...state,
				isAppLoading: false,
				error: null,
				orderItems:
					state.orderItems?.map(orderEditEl =>
						orderEditEl.id === action.payload.id
							? { ...orderEditEl, ...action.payload }
							: action.payload
					) || [],
			}
		case ORDER_ITEMS_REMOVE_SUCCESS:
			return {
				...state,
				isAppLoading: false,
				error: null,
				orderItems:
					state.orderItems?.filter(
						orderItemFilter => orderItemFilter.id !== action.payload
					) || null,
			}
		// Failure
		case ORDER_ITEMS_GET_FAILURE:
		case ORDER_ITEMS_BY_ID_FAILURE:
		case ORDER_ITEMS_ADD_FAILURE:
		case ORDER_ITEMS_EDIT_FAILURE:
		case ORDER_ITEMS_REMOVE_FAILURE:
			return { ...state, isAppLoading: false, error: action.payload }

		default:
			return state
	}
}
