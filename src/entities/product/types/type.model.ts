import {
	PRODUCT_GET_SEARCH_FAILURE,
	PRODUCT_GET_SEARCH_SUCCESS,
} from '../../../app/constants/actions/admin.constants'
import { IAppState } from '../../../shared/types/initState.types'
import { IProductsApi, IResponseProductsApi } from './type.api'

export interface IProductsSearchState extends IAppState {
	productsSearch: IResponseProductsApi[] | null
	page: number | null
	limit: number | null
	hasMore: boolean
	offset: number | null
	total: number
}

type ProductGetSearchSuccess = {
	type: typeof PRODUCT_GET_SEARCH_SUCCESS
	payload: IProductsApi
}

type ProductGetSearchFailure = {
	type: typeof PRODUCT_GET_SEARCH_FAILURE
	payload: string | null
}

export type ProductsSearchActionTypes =
	| ProductGetSearchSuccess
	| ProductGetSearchFailure
