import {
	PRODUCT_GET_SEARCH_FAILURE,
	PRODUCT_GET_SEARCH_SUCCESS,
} from '../../../app/constants/actions/admin.constants'
import { IAppState } from '../../../shared/types/initState.types'
import {
	IMappingResponseProductsApi,
	IMappingResponseProductsSearchApi,
} from './type.api'

export interface IProductsSearchState extends IAppState {
	productsSearch: IMappingResponseProductsApi[] | null
	page: number | null
	limit: number | null
	hasMore: boolean
	offset: number | null
	total: number
}

type ProductGetSearchSuccess = {
	type: typeof PRODUCT_GET_SEARCH_SUCCESS
	payload: IMappingResponseProductsSearchApi
}

type ProductGetSearchFailure = {
	type: typeof PRODUCT_GET_SEARCH_FAILURE
	payload: string | null
}

export type ProductsSearchActionTypes =
	| ProductGetSearchSuccess
	| ProductGetSearchFailure
