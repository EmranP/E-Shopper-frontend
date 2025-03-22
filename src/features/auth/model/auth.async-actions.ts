import axios from 'axios'
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
import { AUTH_API_URL_REFRESH } from '../../../app/constants/api/auth.api-constants'
import { BASE_API_URL } from '../../../shared/config/axiosInstance'
import { AppActions, AppThunk } from '../../../shared/types/store.types'
import { IResponseAuthApi } from '../types/type.api'
import { authServiceApi } from './auth.service'

// !Todos:
/* 
1) Проверить на активацию аккаунта через почту
2) Сделать защиту страницы (доступ только admin)
3) Реализовать admin panel: GRUD operations for Products, Orders, users,  
*/

export const login =
	(email: string, password: string): AppThunk =>
	async (dispatch: Dispatch<AppActions>): Promise<void> => {
		dispatch({ type: AUTH_REQUEST })
		try {
			const resultLogin = await authServiceApi.fetchLogin({ email, password })

			localStorage.setItem('token', resultLogin.data.access)
			dispatch({ type: AUTH_LOGIN_SUCCESS, payload: resultLogin.data })
		} catch (error) {
			dispatch({
				type: AUTH_LOGIN_FAILURE,
				payload: error instanceof Error ? error.message : 'Login failed',
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
		} catch (error) {
			dispatch({
				type: AUTH_REG_FAILURE,
				payload: error instanceof Error ? error.message : 'Reg failed',
			})
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
			dispatch({
				type: AUTH_LOGOUT_FAILURE,
				payload: error instanceof Error ? error.message : 'Logout failed',
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
			console.log(response.data)
			localStorage.setItem('token', response.data.access)
			dispatch({
				type: AUTH_REFRESH_TOKEN_SUCCESS,
				payload: response.data,
			})
		} catch (error) {
			dispatch({
				type: AUTH_LOGOUT_FAILURE,
				payload: error instanceof Error ? error.message : 'Logout failed',
			})
		}
	}
