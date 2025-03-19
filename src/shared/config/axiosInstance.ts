import axios from 'axios'

export const $api = axios.create({
	withCredentials: true,
	baseURL: import.meta.env.VITE_BASE_API_URL,
	headers: {
		'Content-Type': 'application/json',
	},
})
