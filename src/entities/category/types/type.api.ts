import { IResponseSharedApi } from '../../../shared/types/api.types'

export interface IResponseCategoriesApi extends IResponseSharedApi {
	name: string
}

export interface IRequestCategoriesAddApi {
	categoryName: string
}
