import { AxiosResponse } from 'axios'

export interface IResponseSharedApi {
	id: number
	createdAt: string | Date
	updatedAt: string | Date
}

export interface IMessageApi {
	message: string | null
}

export type ReturnTypeSharedDeleteServiceApi = Promise<
	AxiosResponse<IMessageApi> | never | void
>
