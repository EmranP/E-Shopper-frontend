import {
	AUTH_API_URL_LOGIN,
	AUTH_API_URL_LOGOUT,
	AUTH_API_URL_REFRESH,
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
	}: IRequestAuthLogin): Promise<IResponseAuthApi> {
		const response = await $api.post<IResponseAuthApi>(AUTH_API_URL_LOGIN, {
			email,
			password,
		})
		if (response.status === 404) {
			throw new Error('Ошибка: указанный email не найден')
		}
		return response.data
	}

	async fetchReg({
		login,
		email,
		password,
	}: IRequestAuthReg): Promise<IResponseAuthApi> {
		const response = await $api.post<IResponseAuthApi>(
			AUTH_API_URL_REGISTRATION,
			{ login, email, password }
		)
		if (response.status === 400) {
			throw new Error('Ошибка регистрации: проверьте введённые данные')
		}
		console.info('Ответ регистрации:', response.data)
		return response.data
	}

	async fetchLogout(): Promise<void> {
		const response = await $api.post(AUTH_API_URL_LOGOUT)
		console.info('Ответ выхода:', response.data)
		if (response.status === 404) {
			throw new Error('Ошибка: URL для выхода не найден')
		}
		return
	}

	async fetchRefreshToken(): Promise<IResponseAuthApi> {
		const response = await $api.get<IResponseAuthApi>(AUTH_API_URL_REFRESH)
		if (response.status === 404) {
			throw new Error('Ошибка: URL для обновления токена не найден')
		}
		console.info('Ответ обновления токена:', response.data)
		return response.data
	}
}

export const authServiceApi = new AuthServiceApi()
