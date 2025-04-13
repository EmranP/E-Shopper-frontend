import { ADMIN_REQUEST } from '../../../app/constants/actions/admin.constants'
import {
	CART_ADD_FAILURE,
	CART_ADD_SUCCESS,
	CART_GET_FAILURE,
	CART_GET_SUCCESS,
} from '../../../app/constants/actions/cart.constatns'
import { CartActions } from '../types/type.action'
import { ICartState } from '../types/type.state'

const cartInitialState: ICartState = {
	cart: null,
	isAppLoading: false,
	error: null,
}

export const cartReducer = (
	state = cartInitialState,
	action: CartActions
): ICartState => {
	switch (action.type) {
		case ADMIN_REQUEST:
			return { ...state, isAppLoading: true, error: null }
		case CART_GET_SUCCESS:
		case CART_ADD_SUCCESS:
			return {
				...state,
				cart: action.payload,
				isAppLoading: false,
				error: null,
			}

		case CART_GET_FAILURE:
		case CART_ADD_FAILURE:
			return { ...state, isAppLoading: false, error: action.payload }
		default:
			return state
	}
}
