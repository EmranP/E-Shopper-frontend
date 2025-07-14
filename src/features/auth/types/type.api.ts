// type.api.ts
import { AxiosResponse } from 'axios'
import { ROLES } from '../../../app/constants/roles/roles'
import { IResponseSharedApi } from '../../../shared/types/api.types'

export interface IResponseUserAuthApi extends IResponseSharedApi {
	login: string
	email: string
	isActivated: boolean
	role: ROLES
}

export interface IResponseAuthApi {
	access: string
	refresh: string
	user: IResponseUserAuthApi
}

export interface IRequestAuthLogin {
	email: string
	password: string
}

export interface IRequestAuthReg extends IRequestAuthLogin {
	login: string
}

export type ReturnTypeAuthServiceApi = Promise<
	AxiosResponse<IResponseAuthApi> | never
>
