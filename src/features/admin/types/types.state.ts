import { IMappingResponseProductsApi } from '../../../entities/product/types/type.api'
import { IResponseCategoriesApi } from '../../../entities/сategory/types/type.api'
import { IAppState } from '../../../shared/types/initState.types'
import { IResponseUserAuthApi } from '../../auth/types/type.api'
import { IResponseCartsApi } from '../../cart/types/type.api'
import { IResponseOrdersApi } from '../../order/types/types.api'

export interface IAdminUsersState extends IAppState {
	users: IResponseUserAuthApi[] | null
}

export interface IAdminOrdersState extends IAppState {
	orders: IResponseOrdersApi[] | null
}

export interface IAdminProductsState extends IAppState {
	products: IMappingResponseProductsApi[] | null
	productItem: IMappingResponseProductsApi | null
}

export interface IAdminCategoriesState extends IAppState {
	categories: IResponseCategoriesApi[] | null
	categoryItem: IResponseCategoriesApi | null
}

export interface IAdminCartsState extends IAppState {
	carts: IResponseCartsApi[] | null
}

export type IAdminState =
	| IAdminUsersState
	| IAdminOrdersState
	| IAdminProductsState
	| IAdminCategoriesState
	| IAdminCartsState
