import { Dispatch } from 'redux'
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
import { AppActions, AppThunk } from '../../../shared/types/store.types'
import { authServiceApi } from './auth.service'

export const login =
	(email: string, password: string): AppThunk =>
	async (dispatch: Dispatch<AppActions>): Promise<void> => {
		dispatch({ type: AUTH_LOGIN_REQUEST })
		try {
			const resultLogin = await authServiceApi.fetchLogin({ email, password })

			if (!resultLogin) {
				throw new Error('Error login')
			}

			dispatch({ type: AUTH_LOGIN_SUCCESS, payload: resultLogin })
		} catch (error) {
			if (error instanceof Error) {
				dispatch({
					type: AUTH_LOGIN_FAILURE,
					payload: error.message || 'Login failed',
				})
			} else {
				console.log('Что-то пошло не так с login')
			}
		}
	}

export const registration =
	(login: string, email: string, password: string): AppThunk =>
	async (dispatch: Dispatch<AppActions>): Promise<void> => {
		dispatch({ type: AUTH_REG_REQUEST })
		try {
			const resultReg = await authServiceApi.fetchReg({
				login,
				email,
				password,
			})

			if (!resultReg) {
				throw new Error('Error reg')
			}

			dispatch({ type: AUTH_REG_SUCCESS, payload: resultReg })
		} catch (error) {
			if (error instanceof Error) {
				dispatch({
					type: AUTH_REG_FAILURE,
					payload: error.message || 'Reg failed',
				})
			} else {
				console.log('Что-то пошле не так с reg')
			}
		}
	}

export const logout =
	(): AppThunk =>
	async (dispatch: Dispatch<AppActions>): Promise<void> => {
		dispatch({ type: AUTH_LOGOUT_REQUEST })
		try {
			await authServiceApi.fetchLogout()

			dispatch({
				type: AUTH_LOGOUT,
			})
		} catch (error) {
			if (error instanceof Error) {
				dispatch({
					type: AUTH_LOGOUT_FAILURE,
					payload: error.message || 'Refresh token failed',
				})
			} else {
				console.log('Что-то пошле не так в refresh token')
			}
		}
	}

export const refreshToken =
	(): AppThunk =>
	async (dispatch: Dispatch<AppActions>): Promise<void> => {
		dispatch({ type: AUTH_REFRESH_TOKEN_REQUEST })
		try {
			const refreshData = await authServiceApi.fetchRefreshToken()
			if (!refreshData) {
				throw new Error('Ошибка обновления токена: пустой ответ от сервера')
			}
			dispatch({ type: AUTH_REFRESH_TOKEN_SUCCESS, payload: refreshData })
		} catch (error) {
			if (error instanceof Error) {
				dispatch({
					type: AUTH_REFRESH_TOKEN_FAILURE,
					payload: `Ошибка обновления токена: ${
						error.message || 'Неизвестная ошибка'
					}`,
				})
			} else {
				console.error('Неизвестная ошибка при обновлении токена')
			}
		}
	}

export const refreshAccessToken =
	(newAccess: string): AppThunk =>
	async (dispatch: Dispatch<AppActions>): Promise<void> => {
		dispatch({
			type: AUTH_REFRESH_TOKEN_SUCCESS,
			payload: { access: newAccess } as any,
		})
	}
