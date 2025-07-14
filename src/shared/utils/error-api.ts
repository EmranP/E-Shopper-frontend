import { AxiosResponse } from 'axios'

export const errorNotFoundedApi = (
	response: AxiosResponse,
	message: string
): void => {
	if (response.status === 404) {
		throw new Error(message)
	}
}
