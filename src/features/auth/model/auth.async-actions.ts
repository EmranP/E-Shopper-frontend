import axios, { AxiosError } from 'axios'
import { Dispatch } from 'redux'
import {
	AUTH_LOGIN_FAILURE,
	AUTH_LOGIN_SUCCESS,
	AUTH_LOGOUT,
	AUTH_LOGOUT_FAILURE,
	AUTH_REFRESH_TOKEN_SUCCESS,
	AUTH_REG_FAILURE,
	AUTH_REG_SUCCESS,
	AUTH_REQUEST,
} from '../../../app/constants/actions/auth.constants'
import {
	CART_ADD_FAILURE,
	CART_ADD_SUCCESS,
} from '../../../app/constants/actions/cart.constatns'
import { AUTH_API_URL_REFRESH } from '../../../app/constants/api/auth.api-constants'
import { BASE_API_URL } from '../../../shared/config/axiosInstance'
import { AppActions, AppThunk } from '../../../shared/types/store.types'
import { errorMessageAsyncAction } from '../../../shared/utils/errorMessage.async-action'
import { cartsServiceApi } from '../../cart/service/cart.service'
import { IResponseAuthApi } from '../types/type.api'
import { authServiceApi } from './auth.service'

export const login =
	(email: string, password: string): AppThunk =>
	async (dispatch: Dispatch<AppActions>): Promise<void> => {
		dispatch({ type: AUTH_REQUEST })
		try {
			const resultLogin = await authServiceApi.fetchLogin({ email, password })

			localStorage.setItem('token', resultLogin.data.access)
			dispatch({ type: AUTH_LOGIN_SUCCESS, payload: resultLogin.data })
		} catch (error) {
			const errorMessage = errorMessageAsyncAction(error)

			dispatch({
				type: AUTH_LOGIN_FAILURE,
				payload: errorMessage,
			})
		}
	}

export const registration =
	(login: string, email: string, password: string): AppThunk =>
	async (dispatch: Dispatch<AppActions>): Promise<void> => {
		dispatch({ type: AUTH_REQUEST })
		try {
			const resultReg = await authServiceApi.fetchReg({
				login,
				email,
				password,
			})

			localStorage.setItem('token', resultReg.data.access)
			dispatch({ type: AUTH_REG_SUCCESS, payload: resultReg.data })

			if (!resultReg.data.user.id) return

			const resultAddCart = await cartsServiceApi.createdUserCarts()

			dispatch({ type: CART_ADD_SUCCESS, payload: resultAddCart.data })
		} catch (error) {
			const errorMessage = errorMessageAsyncAction(error)
			dispatch({
				type: AUTH_REG_FAILURE,
				payload: errorMessage,
			})

			dispatch({ type: CART_ADD_FAILURE, payload: errorMessage })
		}
	}

export const logout =
	(): AppThunk =>
	async (dispatch: Dispatch<AppActions>): Promise<void> => {
		dispatch({ type: AUTH_REQUEST })
		try {
			await authServiceApi.fetchLogout()

			localStorage.removeItem('token')
			dispatch({
				type: AUTH_LOGOUT,
			})
		} catch (error) {
			if (error instanceof AxiosError && error.response?.status === 401) {
				return
			}

			const errorMessage = errorMessageAsyncAction(error)

			dispatch({
				type: AUTH_LOGOUT_FAILURE,
				payload: errorMessage,
			})
		}
	}

export const checkAuth =
	(): AppThunk =>
	async (dispatch: Dispatch<AppActions>): Promise<void> => {
		dispatch({ type: AUTH_REQUEST })
		try {
			const response = await axios.get<IResponseAuthApi>(
				`${BASE_API_URL}${AUTH_API_URL_REFRESH}`,
				{
					withCredentials: true,
				}
			)

			if (response.status === 404) {
				throw new Error('Request refresh token is not founded')
			}
			localStorage.setItem('token', response.data.access)
			dispatch({
				type: AUTH_REFRESH_TOKEN_SUCCESS,
				payload: response.data,
			})
		} catch (error) {
			const errorMessage = errorMessageAsyncAction(error)
			dispatch({
				type: AUTH_LOGOUT_FAILURE,
				payload:
					error instanceof AxiosError &&
					error.response?.status !== 401 &&
					errorMessage,
			})
		}
	}
