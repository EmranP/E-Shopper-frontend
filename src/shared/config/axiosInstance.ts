import axios, { AxiosError, AxiosRequestConfig } from 'axios'
import { AUTH_API_URL_REFRESH } from '../../app/constants/api/auth.api-constants'
import { store } from '../../app/providers/store'
import { refreshAccessToken } from '../../features/auth/model/auth.async-actions'
import { IResponseAuthApi } from '../../features/auth/types/type.api'

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
	_retry?: boolean
}

const $api = axios.create({
	withCredentials: true,
	baseURL: import.meta.env.VITE_BASE_API_URL,
	headers: {
		'Content-Type': 'application/json',
	},
})

$api.interceptors.request.use(
	config => {
		const state = store.getState()
		const token = state.auth.access

		if (token) {
			config.headers.Authorization = `Bearer ${token}`
		}

		return config
	},
	(error: AxiosError) => Promise.reject(error)
)

$api.interceptors.response.use(
	config => config,
	async (error: AxiosError) => {
		const originalRequest = error.config as CustomAxiosRequestConfig
		if (
			error.response?.status === 401 &&
			originalRequest &&
			!originalRequest._retry
		) {
			originalRequest._retry = true
			try {
				const response = await axios.get<IResponseAuthApi>(
					AUTH_API_URL_REFRESH,
					{
						withCredentials: true,
					}
				)

				const { access } = response.data
				store.dispatch(refreshAccessToken(access))

				originalRequest.headers = {
					...originalRequest.headers,
					Authorization: `Bearer ${access}`,
				}

				return $api(originalRequest)
			} catch (err) {
				if (err instanceof Error) {
					console.error('Ошибка при обновлении токена', err)
				} else {
					console.error('Что-то пошло не так с refresh token')
				}

				return Promise.reject(error)
			}
		}
		return Promise.reject(error)
	}
)

export default $api
