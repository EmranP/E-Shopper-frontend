import { AxiosError } from 'axios'

export const errorMessageAsyncAction = (error: unknown): string => {
	const errorMessage: string =
		error instanceof AxiosError && error.response
			? error.response.data.message
			: 'Request failed'

	return errorMessage
}
