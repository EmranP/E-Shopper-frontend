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
import { IResponseAuthApi } from './type.api'

type AuthRequestAction = {
	type: typeof AUTH_REQUEST
}

type AuthSuccessAction = {
	type:
		| typeof AUTH_LOGIN_SUCCESS
		| typeof AUTH_REG_SUCCESS
		| typeof AUTH_REFRESH_TOKEN_SUCCESS
	payload: IResponseAuthApi
}

type AuthFailureAction = {
	type:
		| typeof AUTH_LOGIN_FAILURE
		| typeof AUTH_REG_FAILURE
		| typeof AUTH_REFRESH_TOKEN_FAILURE
		| typeof AUTH_LOGOUT_FAILURE
	payload: string | boolean
}

type LogoutAction = {
	type: typeof AUTH_LOGOUT
}

export type AuthActionTypes =
	| AuthRequestAction
	| AuthSuccessAction
	| AuthFailureAction
	| LogoutAction
