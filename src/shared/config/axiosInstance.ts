import axios, { AxiosError, AxiosRequestConfig } from 'axios'
import { AUTH_API_URL_REFRESH } from '../../app/constants/api/auth.api-constants'
import { IResponseAuthApi } from '../../features/auth/types/type.api'

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
	_isRetry?: boolean
}

export const BASE_API_URL = import.meta.env.VITE_BASE_API_URL

const $api = axios.create({
	withCredentials: true,
	baseURL: BASE_API_URL,
	headers: {
		'Content-Type': 'application/json',
	},
})

$api.interceptors.request.use(config => {
	const token = localStorage.getItem('token')
	if (token) {
		config.headers = config.headers || {}
		config.headers.Authorization = `Bearer ${token}`
	}
	return config
})

$api.interceptors.response.use(
	response => response,
	async (error: AxiosError) => {
		const originalRequest = error.config as CustomAxiosRequestConfig
		if (
			error.response?.status === 401 &&
			originalRequest &&
			!originalRequest._isRetry
		) {
			originalRequest._isRetry = true
			try {
				const response = await axios.get<IResponseAuthApi>(
					`${BASE_API_URL}${AUTH_API_URL_REFRESH}`,
					{
						withCredentials: true,
					}
				)
				const { access } = response.data
				localStorage.setItem('token', access)
				originalRequest.headers = {
					...originalRequest.headers,
					Authorization: `Bearer ${access}`,
				}

				return $api(originalRequest)
			} catch (err) {
				console.error('Ошибка при обновлении токена:', err)
				return Promise.reject(error)
			}
		}
		return Promise.reject(error)
	}
)

export default $api
