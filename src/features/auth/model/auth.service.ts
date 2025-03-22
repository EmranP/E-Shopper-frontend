import { AxiosResponse } from 'axios'
import {
	AUTH_API_URL_LOGIN,
	AUTH_API_URL_LOGOUT,
	AUTH_API_URL_REGISTRATION,
} from '../../../app/constants/api/auth.api-constants'
import $api from '../../../shared/config/axiosInstance'
import {
	IRequestAuthLogin,
	IRequestAuthReg,
	IResponseAuthApi,
} from '../types/type.api'

class AuthServiceApi {
	async fetchLogin({
		email,
		password,
	}: IRequestAuthLogin): Promise<AxiosResponse<IResponseAuthApi>> {
		const response = await $api.post<IResponseAuthApi>(AUTH_API_URL_LOGIN, {
			email,
			password,
		})
		if (response.status === 404) {
			throw new Error('Ошибка: указанный email не найден')
		}
		return response
	}

	async fetchReg({
		login,
		email,
		password,
	}: IRequestAuthReg): Promise<AxiosResponse<IResponseAuthApi>> {
		const response = await $api.post<IResponseAuthApi>(
			AUTH_API_URL_REGISTRATION,
			{ login, email, password }
		)
		if (response.status === 400) {
			throw new Error('Ошибка регистрации: проверьте введённые данные')
		}
		console.info('Ответ регистрации:', response.data)
		return response
	}

	async fetchLogout(): Promise<void> {
		const response = await $api.post(AUTH_API_URL_LOGOUT)
		if (response.status === 404) {
			throw new Error('Ошибка: URL для выхода не найден')
		}
		console.info('Logout success completed:')
		return
	}
}

export const authServiceApi = new AuthServiceApi()
