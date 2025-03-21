import {
	AUTH_LOGIN_FAILURE,
	AUTH_LOGIN_REQUEST,
	AUTH_LOGIN_SUCCESS,
	AUTH_LOGOUT,
	AUTH_LOGOUT_FAILURE,
	AUTH_LOGOUT_REQUEST,
	AUTH_REFRESH_TOKEN_FAILURE,
	AUTH_REFRESH_TOKEN_REQUEST,
	AUTH_REFRESH_TOKEN_SUCCESS,
	AUTH_REG_FAILURE,
	AUTH_REG_REQUEST,
	AUTH_REG_SUCCESS,
} from '../../../app/constants/actions/auth.constants'
import { IResponseAuthApi } from './type.api'

// Login
interface ILoginRequestAction {
	type: typeof AUTH_LOGIN_REQUEST
}

interface ILoginSuccessAction {
	type: typeof AUTH_LOGIN_SUCCESS
	payload: IResponseAuthApi
}

interface ILoginFailureAction {
	type: typeof AUTH_LOGIN_FAILURE
	payload: string
}

// Logout
interface ILogoutRequestAction {
	type: typeof AUTH_LOGOUT_REQUEST
}

interface ILogoutAction {
	type: typeof AUTH_LOGOUT
}

interface ILogoutFailureAction {
	type: typeof AUTH_LOGOUT_FAILURE
	payload: string
}

// Registration
interface IRegRequestAction {
	type: typeof AUTH_REG_REQUEST
}

interface IRegSuccessAction {
	type: typeof AUTH_REG_SUCCESS
	payload: IResponseAuthApi
}

interface IRegFailureAction {
	type: typeof AUTH_REG_FAILURE
	payload: string
}

// Tokens
interface IRefreshTokenRequestAction {
	type: typeof AUTH_REFRESH_TOKEN_REQUEST
}

interface IRefreshTokenSuccessAction {
	type: typeof AUTH_REFRESH_TOKEN_SUCCESS
	payload: IResponseAuthApi
}

interface IRefreshTokenFailureAction {
	type: typeof AUTH_REFRESH_TOKEN_FAILURE
	payload: string
}

export type AuthActionTypes =
	| ILoginRequestAction
	| ILoginSuccessAction
	| ILoginFailureAction
	| ILogoutRequestAction
	| ILogoutAction
	| ILogoutFailureAction
	| IRegRequestAction
	| IRegSuccessAction
	| IRegFailureAction
	| IRefreshTokenRequestAction
	| IRefreshTokenSuccessAction
	| IRefreshTokenFailureAction
