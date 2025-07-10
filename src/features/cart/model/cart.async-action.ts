import { redirect } from 'react-router-dom'
import { Dispatch } from 'redux'
import {
	CART_GET_FAILURE,
	CART_GET_SUCCESS,
	CART_ITEMS_ADD_FAILURE,
	CART_ITEMS_ADD_SUCCESS,
	CART_ITEMS_EDIT_FAILURE,
	CART_ITEMS_EDIT_SUCCESS,
	CART_ITEMS_GET_ALL_FAILURE,
	CART_ITEMS_GET_ALL_SUCCESS,
	CART_ITEMS_GET_FAILURE,
	CART_ITEMS_GET_SUCCESS,
	CART_ITEMS_PAGINATION_REQUEST,
	CART_ITEMS_REMOVE_FAILURE,
	CART_ITEMS_REMOVE_SUCCESS,
	CART_ITEMS_REQUEST,
	CART_REQUEST,
} from '../../../app/constants/actions/cart.constants'
import { AppActions, AppThunk } from '../../../shared/types/store.types'
import { errorMessageAsyncAction } from '../../../shared/utils/errorMessage.async-action'
import { cartItemsServiceApi, cartsServiceApi } from '../model/cart.service'
import { ICartItemsCommonActionsType } from '../types/type.action'

// Carts
export const getUserCarts =
	(userId: number | string | null): AppThunk =>
	async (dispatch: Dispatch<AppActions>): Promise<void> => {
		if (!userId) {
			dispatch({ type: CART_GET_FAILURE, payload: 'User not Authorization!!!' })

			redirect('/auth/login')
			return
		}

		dispatch({ type: CART_REQUEST })
		try {
			const resultGetUserCart = await cartsServiceApi.getUserCarts()

			dispatch({ type: CART_GET_SUCCESS, payload: resultGetUserCart.data })
		} catch (error) {
			const errorMessage = errorMessageAsyncAction(error)

			dispatch({ type: CART_GET_FAILURE, payload: errorMessage })
		}
	}

// Carts-items
export const getAllCartItems =
	(
		cartId: number | string | null,
		limit: number | 'all',
		offset: number
	): AppThunk =>
	async (dispatch: Dispatch<AppActions>): Promise<void> => {
		if (!cartId) {
			dispatch({
				type: CART_ITEMS_GET_ALL_FAILURE,
				payload: 'All cart-items not found',
			})

			return
		}
		dispatch({ type: CART_ITEMS_REQUEST })
		try {
			const resultGetAllCartItems = await cartItemsServiceApi.getCartItems(
				cartId,
				limit,
				offset
			)

			if (limit !== 'all') {
				dispatch({
					type: CART_ITEMS_GET_ALL_FAILURE,
					payload: 'Limit should be set',
				})

				return
			}

			dispatch({
				type: CART_ITEMS_GET_ALL_SUCCESS,
				payload: resultGetAllCartItems.data.cartItems,
			})
		} catch (error) {
			const errorMessage = errorMessageAsyncAction(error)

			dispatch({ type: CART_ITEMS_GET_ALL_FAILURE, payload: errorMessage })
		}
	}

export const getCartItems =
	(
		cartId: number | string | null,
		limit: number | 'all',
		offset: number
	): AppThunk =>
	async (dispatch: Dispatch<ICartItemsCommonActionsType>): Promise<void> => {
		if (!cartId) {
			dispatch({
				type: CART_ITEMS_GET_FAILURE,
				payload: 'Cart-items not found',
			})

			return
		}

		dispatch({ type: CART_ITEMS_PAGINATION_REQUEST })
		try {
			const resultGetCartItems = await cartItemsServiceApi.getCartItems(
				cartId,
				limit,
				offset
			)

			if (limit === 'all') {
				dispatch({
					type: CART_ITEMS_GET_FAILURE,
					payload: 'Limit is not be all for this req',
				})

				return
			}

			dispatch({
				type: CART_ITEMS_GET_SUCCESS,
				payload: resultGetCartItems.data,
			})
		} catch (error) {
			const errorMessage = errorMessageAsyncAction(error)

			dispatch({ type: CART_ITEMS_GET_FAILURE, payload: errorMessage })
		}
	}

export const addCartItems =
	(
		cartId: number | null,
		productId: number | null,
		price: number | null,
		cartItemQuantity: number | null
	): AppThunk =>
	async (dispatch: Dispatch<AppActions>): Promise<void> => {
		if (!cartId || !productId || !cartItemQuantity) {
			dispatch({
				type: CART_ITEMS_ADD_FAILURE,
				payload: 'Error: Cart-items is not added',
			})

			return
		}

		dispatch({ type: CART_ITEMS_REQUEST })
		try {
			const resultAddCartItems = await cartItemsServiceApi.createCartItems(
				cartId,
				productId,
				price,
				cartItemQuantity
			)

			dispatch({
				type: CART_ITEMS_ADD_SUCCESS,
				payload: resultAddCartItems.data,
			})
		} catch (error) {
			const errorMessage = errorMessageAsyncAction(error)

			dispatch({ type: CART_ITEMS_ADD_FAILURE, payload: errorMessage })
		}
	}

export const editCartItems =
	(cartItemsId: number | null, cartItemQuantity: number | null): AppThunk =>
	async (dispatch: Dispatch<AppActions>): Promise<void> => {
		if (!cartItemsId || !cartItemQuantity) {
			dispatch({
				type: CART_ITEMS_EDIT_FAILURE,
				payload: 'Error: Cart-items not set data for edit',
			})

			return
		}

		dispatch({ type: CART_ITEMS_REQUEST })
		try {
			const resultEditCartItems = await cartItemsServiceApi.editCartItems(
				cartItemsId,
				cartItemQuantity
			)

			dispatch({
				type: CART_ITEMS_EDIT_SUCCESS,
				payload: resultEditCartItems.data,
			})
		} catch (error) {
			const errorMessage = errorMessageAsyncAction(error)

			dispatch({ type: CART_ITEMS_EDIT_FAILURE, payload: errorMessage })
		}
	}

export const removeCartItems =
	(
		cartItemsId: number | string | null,
		productId: number | string | null
	): AppThunk =>
	async (dispatch: Dispatch<AppActions>): Promise<void> => {
		if (!cartItemsId || !productId) {
			dispatch({
				type: CART_ITEMS_REMOVE_FAILURE,
				payload: 'Cart items not found for remove',
			})

			return
		}

		dispatch({ type: CART_ITEMS_REQUEST })
		try {
			await cartItemsServiceApi.deleteCartItems(productId)

			dispatch({
				type: CART_ITEMS_REMOVE_SUCCESS,
				payload: Number(cartItemsId),
			})
		} catch (error) {
			const errorMessage = errorMessageAsyncAction(error)

			dispatch({ type: CART_ITEMS_REMOVE_FAILURE, payload: errorMessage })
		}
	}
