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
import { AppActions } from '../../../shared/types/store.types'
import { ICartItemsState, ICartState } from '../types/type.state'

const cartInitialState: ICartState = {
	cart: null,
	isAppLoading: false,
	error: null,
}

export const cartReducer = (
	state = cartInitialState,
	action: AppActions
): ICartState => {
	switch (action.type) {
		case ADMIN_REQUEST:
			return { ...state, isAppLoading: true, error: null }
		case CART_GET_SUCCESS:
		case CART_ADD_SUCCESS:
			return {
				...state,
				isAppLoading: false,
				error: null,
				cart: action.payload,
			}

		case CART_GET_FAILURE:
		case CART_ADD_FAILURE:
			return { ...state, isAppLoading: false, error: action.payload }
		default:
			return state
	}
}

const cartItemsInitialState: ICartItemsState = {
	cartItems: null,
	isAppLoading: false,
	error: null,
}

export const cartItemsReducer = (
	state = cartItemsInitialState,
	action: AppActions
): ICartItemsState => {
	switch (action.type) {
		case CART_REQUEST:
			return { ...state, isAppLoading: true, error: null }
		case CART_ITEMS_GET_SUCCESS:
			return {
				...state,
				isAppLoading: false,
				error: null,
				cartItems: action.payload,
			}
		case CART_ITEMS_ADD_SUCCESS:
			return {
				...state,
				isAppLoading: false,
				error: null,
				cartItems: state.cartItems
					? [...state.cartItems, action.payload]
					: [action.payload],
			}
		case CART_ITEMS_EDIT_SUCCESS:
			return {
				...state,
				isAppLoading: false,
				error: null,
				cartItems:
					state.cartItems?.map(cartItem =>
						cartItem.id === action.payload.id
							? { ...cartItem, ...action.payload }
							: cartItem
					) || [],
			}

		case CART_ITEMS_REMOVE_SUCCESS:
			return {
				...state,
				isAppLoading: false,
				error: null,
				cartItems:
					state.cartItems?.filter(cartItem => cartItem.id !== action.payload) ||
					[],
			}

		// Failure
		case CART_ITEMS_GET_FAILURE:
		case CART_ITEMS_ADD_FAILURE:
		case CART_ITEMS_EDIT_FAILURE:
		case CART_ITEMS_REMOVE_FAILURE:
			return { ...state, isAppLoading: false, error: action.payload }
		default:
			return state
	}
}
