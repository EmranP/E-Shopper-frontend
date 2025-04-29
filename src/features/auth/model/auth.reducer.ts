import {
	AUTH_LOGIN_FAILURE,
	AUTH_LOGIN_SUCCESS,
	AUTH_LOGOUT,
	AUTH_LOGOUT_FAILURE,
	AUTH_REFRESH_TOKEN_FAILURE,
	AUTH_REFRESH_TOKEN_SUCCESS,
	AUTH_REG_FAILURE,
	AUTH_REG_SUCCESS,
	AUTH_REQUEST,
} from '../../../app/constants/actions/auth.constants'
import { AppActions } from '../../../shared/types/store.types'
import { IResponseUserAuthApi } from '../types/type.api'

export interface IAuthState {
	user: IResponseUserAuthApi | null
	access: string | null
	refresh: string | null
	isAuth: boolean
	isLoading: boolean
	error: string | null | boolean
}

const initialState: IAuthState = {
	user: null,
	access: null,
	refresh: null,
	isAuth: false,
	isLoading: false,
	error: null,
}

export const authReducer = (
	state = initialState,
	action: AppActions
): IAuthState => {
	switch (action.type) {
		case AUTH_REQUEST:
			return { ...state, isLoading: true }

		case AUTH_LOGIN_SUCCESS:
		case AUTH_REG_SUCCESS:
		case AUTH_REFRESH_TOKEN_SUCCESS:
			return {
				...state,
				isLoading: false,
				isAuth: true,
				access: action.payload.access,
				refresh: action.payload.refresh,
				user: action.payload.user,
			}

		case AUTH_LOGIN_FAILURE:
		case AUTH_REG_FAILURE:
		case AUTH_REFRESH_TOKEN_FAILURE:
		case AUTH_LOGOUT_FAILURE:
			return {
				...state,
				isLoading: false,
				error: action.payload,
			}

		case AUTH_LOGOUT:
			return initialState

		default:
			return state
	}
}
