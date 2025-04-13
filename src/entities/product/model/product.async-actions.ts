import { Dispatch } from 'redux'
import {
	ADMIN_PRODUCT_GET_BY_ID_FAILURE,
	ADMIN_PRODUCT_GET_BY_ID_SUCCESS,
	ADMIN_PRODUCTS_ADD_FAILURE,
	ADMIN_PRODUCTS_ADD_SUCCESS,
	ADMIN_PRODUCTS_EDIT_FAILURE,
	ADMIN_PRODUCTS_EDIT_SUCCESS,
	ADMIN_PRODUCTS_GET_FAILURE,
	ADMIN_PRODUCTS_GET_SUCCESS,
	ADMIN_PRODUCTS_REMOVE_FAILURE,
	ADMIN_PRODUCTS_REMOVE_SUCCESS,
	ADMIN_REQUEST,
	PRODUCT_GET_SEARCH_FAILURE,
	PRODUCT_GET_SEARCH_SUCCESS,
	USER_NOT_WRITE_DATA,
} from '../../../app/constants/actions/admin.constants'
import { AppActions, AppThunk } from '../../../shared/types/store.types'
import { errorMessageAsyncAction } from '../../../shared/utils/errorMessage.async-action'
import { IResponseProductsApi } from '../types/type.api'
import { productsServiceApi } from './product.service'

// Products
export const getAllProducts =
	(): AppThunk =>
	async (dispatch: Dispatch<AppActions>): Promise<void> => {
		dispatch({ type: ADMIN_REQUEST })
		try {
			const resultGetAllProducts = await productsServiceApi.getAllProducts()

			dispatch({
				type: ADMIN_PRODUCTS_GET_SUCCESS,
				payload: resultGetAllProducts.data,
			})
			console.log(resultGetAllProducts.data)
		} catch (error) {
			const errorMessage = errorMessageAsyncAction(error)

			dispatch({ type: ADMIN_PRODUCTS_GET_FAILURE, payload: errorMessage })
		}
	}

export const getProductById =
	(productId: number | null): AppThunk =>
	async (dispatch: Dispatch<AppActions>): Promise<void> => {
		if (!productId) {
			dispatch({
				type: ADMIN_PRODUCTS_GET_FAILURE,
				payload: 'Product not found :(',
			})
			return
		}

		dispatch({ type: ADMIN_REQUEST })
		try {
			const resultProductById = await productsServiceApi.getProductById(
				productId
			)

			dispatch({
				type: ADMIN_PRODUCT_GET_BY_ID_SUCCESS,
				payload: resultProductById.data,
			})
		} catch (error) {
			const errorMessage = errorMessageAsyncAction(error)

			dispatch({ type: ADMIN_PRODUCT_GET_BY_ID_FAILURE, payload: errorMessage })
		}
	}

export const getProductSearch =
	(
		productSearch: string,
		limit: number | string | null,
		offset: number | string | null
	): AppThunk =>
	async (dispatch: Dispatch<AppActions>): Promise<void> => {
		if (!limit || offset === undefined) return

		dispatch({ type: ADMIN_REQUEST })
		try {
			const resultGetSearchProducts = await productsServiceApi.getProductSearch(
				productSearch,
				limit,
				offset
			)

			dispatch({
				type: PRODUCT_GET_SEARCH_SUCCESS,
				payload: {
					products: resultGetSearchProducts.data.products,
					total: resultGetSearchProducts.data.total,
				},
			})
		} catch (error) {
			const errorMessage = errorMessageAsyncAction(error)

			dispatch({
				type: PRODUCT_GET_SEARCH_FAILURE,
				payload: errorMessage,
			})
		}
	}

export const addProduct =
	(productData: IResponseProductsApi): AppThunk =>
	async (dispatch: Dispatch<AppActions>): Promise<void> => {
		if (!productData) {
			dispatch({
				type: ADMIN_PRODUCTS_ADD_FAILURE,
				payload: USER_NOT_WRITE_DATA,
			})
			return
		}

		dispatch({ type: ADMIN_REQUEST })

		try {
			const newProduct = await productsServiceApi.addProduct(productData)

			dispatch({ type: ADMIN_PRODUCTS_ADD_SUCCESS, payload: newProduct.data })

			const currentProductsData = await productsServiceApi.getAllProducts()

			dispatch({
				type: ADMIN_PRODUCTS_GET_SUCCESS,
				payload: currentProductsData.data,
			})
		} catch (error) {
			const errorMessage = errorMessageAsyncAction(error)

			dispatch({ type: ADMIN_PRODUCTS_ADD_FAILURE, payload: errorMessage })
		}
	}

export const editProduct =
	(productData: IResponseProductsApi): AppThunk =>
	async (dispatch: Dispatch<AppActions>): Promise<void> => {
		if (!productData.id) {
			dispatch({
				type: ADMIN_PRODUCTS_EDIT_FAILURE,
				payload: 'Product for edit not founded',
			})
			return
		}

		dispatch({ type: ADMIN_REQUEST })
		try {
			const updatedProduct = await productsServiceApi.editProduct(
				productData.id,
				productData
			)

			dispatch({
				type: ADMIN_PRODUCTS_EDIT_SUCCESS,
				payload: updatedProduct.data,
			})

			const currentProductsData = await productsServiceApi.getAllProducts()

			dispatch({
				type: ADMIN_PRODUCTS_GET_SUCCESS,
				payload: currentProductsData.data,
			})
		} catch (error) {
			const errorMessage = errorMessageAsyncAction(error)

			dispatch({ type: ADMIN_PRODUCTS_EDIT_FAILURE, payload: errorMessage })
		}
	}

export const removeProduct =
	(productId: number | null): AppThunk =>
	async (dispatch: Dispatch<AppActions>): Promise<void> => {
		if (!productId) {
			dispatch({
				type: ADMIN_PRODUCTS_REMOVE_FAILURE,
				payload: 'Product id not founded!',
			})
			return
		}

		dispatch({ type: ADMIN_REQUEST })

		try {
			await productsServiceApi.removeProduct(productId)

			dispatch({ type: ADMIN_PRODUCTS_REMOVE_SUCCESS, payload: productId })
		} catch (error) {
			const errorMessage = errorMessageAsyncAction(error)

			dispatch({ type: ADMIN_PRODUCTS_REMOVE_FAILURE, payload: errorMessage })
		}
	}
