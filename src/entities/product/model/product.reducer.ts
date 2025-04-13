import {
	ADMIN_REQUEST,
	PRODUCT_GET_SEARCH_FAILURE,
	PRODUCT_GET_SEARCH_SUCCESS,
} from '../../../app/constants/actions/admin.constants'
import { AppActions } from '../../../shared/types/store.types'
import { IProductsSearchState } from '../types/type.model'

const productSearchInitialState: IProductsSearchState = {
	productsSearch: null,
	isAppLoading: false,
	error: null,
	page: null,
	hasMore: false,
	limit: null,
	offset: null,
	total: 0,
}

export const searchProductReducer = (
	state = productSearchInitialState,
	action: AppActions
): IProductsSearchState => {
	switch (action.type) {
		case ADMIN_REQUEST:
			return { ...state, isAppLoading: true, error: null }
		case PRODUCT_GET_SEARCH_SUCCESS:
			return {
				...state,
				isAppLoading: false,
				productsSearch: action.payload.products,
				total: action.payload.total,
				error: null,
			}
		case PRODUCT_GET_SEARCH_FAILURE:
			return { ...state, isAppLoading: false, error: action.payload }
		default:
			return state
	}
}
