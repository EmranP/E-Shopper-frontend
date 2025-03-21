import { ROLES } from '../../../app/constants/roles/roles'

export interface IResponseUserAuthApi {
	id: number
	login: string
	email: string
	isActivated: boolean
	role: ROLES
	createdAt: Date | string
	updatedAt: Date | string
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
