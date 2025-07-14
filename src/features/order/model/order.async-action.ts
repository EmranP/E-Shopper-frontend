import { redirect } from 'react-router-dom'
import { Dispatch } from 'redux'
import { CART_ITEMS_GET_ALL_SUCCESS } from '../../../app/constants/actions/cart.constants'
import {
	ORDER_ADD_FAILURE,
	ORDER_ADD_SUCCESS,
	ORDER_EDIT_FAILURE,
	ORDER_EDIT_SUCCESS,
	ORDER_GET_ADMIN_FAILURE,
	ORDER_GET_ADMIN_SUCCESS,
	ORDER_GET_BY_ID_FAILURE,
	ORDER_GET_BY_ID_SUCCESS,
	ORDER_GET_FAILURE,
	ORDER_GET_SUCCESS,
	ORDER_REMOVE_FAILURE,
	ORDER_REMOVE_SUCCESS,
	ORDER_REQUEST,
} from '../../../app/constants/actions/order.constants'
import { ROLES } from '../../../app/constants/roles/roles'
import {
	errorMessageUserNotAuth,
	errorMessageUserNotHaveAccess,
} from '../../../app/constants/utils/errorMessage.constant'
import { AppActions, AppThunk } from '../../../shared/types/store.types'
import { errorMessageAsyncAction } from '../../../shared/utils/errorMessage.async-action'
import { cartItemsServiceApi } from '../../cart/model/cart.service'
import { orderServiceApi } from './order.service'

// Order Get admin
export const getAllAdminOrder =
	(userId: number | null, userRole: number | null): AppThunk =>
	async (dispatch: Dispatch<AppActions>): Promise<void | never> => {
		if (!userId) {
			dispatch({
				type: ORDER_GET_ADMIN_FAILURE,
				payload: errorMessageUserNotAuth,
			})

			redirect('/auth/login')
			return
		}

		if (userRole !== ROLES.ADMIN) {
			dispatch({
				type: ORDER_GET_ADMIN_FAILURE,
				payload: errorMessageUserNotHaveAccess,
			})

			return
		}

		dispatch({ type: ORDER_REQUEST })
		try {
			const resultGetAllAdminOrder = await orderServiceApi.getAllAdminOrders()

			dispatch({
				type: ORDER_GET_ADMIN_SUCCESS,
				payload: resultGetAllAdminOrder.data,
			})
		} catch (error) {
			const errorMessage = errorMessageAsyncAction(error)

			dispatch({ type: ORDER_GET_ADMIN_FAILURE, payload: errorMessage })
		}
	}

export const getAllCustomerOrder =
	(userId: number | null): AppThunk =>
	async (dispatch: Dispatch<AppActions>): Promise<void | never> => {
		if (!userId) {
			dispatch({ type: ORDER_GET_FAILURE, payload: errorMessageUserNotAuth })

			redirect('/auth/login')
			return
		}

		dispatch({ type: ORDER_REQUEST })
		try {
			const resultGetAllCustomerOrder =
				await orderServiceApi.getAllCustomerOrders()

			dispatch({
				type: ORDER_GET_SUCCESS,
				payload: resultGetAllCustomerOrder.data,
			})
		} catch (error) {
			const errorMessage = errorMessageAsyncAction(error)

			dispatch({ type: ORDER_GET_FAILURE, payload: errorMessage })
		}
	}

export const getOrderById =
	(userId: number | null, orderId: number | null): AppThunk =>
	async (dispatch: Dispatch<AppActions>): Promise<void | never> => {
		if (!userId) {
			dispatch({
				type: ORDER_GET_BY_ID_FAILURE,
				payload: errorMessageUserNotAuth,
			})

			redirect('/auth/login')
			return
		}

		if (!orderId) {
			dispatch({
				type: ORDER_GET_BY_ID_FAILURE,
				payload: 'Order id not founded',
			})

			return
		}

		dispatch({ type: ORDER_REQUEST })
		try {
			const resultGetOrderById = await orderServiceApi.getOrderById(orderId)

			dispatch({
				type: ORDER_GET_BY_ID_SUCCESS,
				payload: resultGetOrderById.data,
			})
		} catch (error) {
			const errorMessage = errorMessageAsyncAction(error)

			dispatch({ type: ORDER_GET_BY_ID_FAILURE, payload: errorMessage })
		}
	}

// Post order
export const addOrder =
	(
		userId: number | null,
		cartId: number | null,
		totalPrice: number | null
	): AppThunk =>
	async (dispatch: Dispatch<AppActions>): Promise<void | never> => {
		if (!userId) {
			dispatch({
				type: ORDER_ADD_FAILURE,
				payload: errorMessageUserNotAuth,
			})

			redirect('/auth/login')
			return
		}

		if (!cartId || !totalPrice) {
			dispatch({
				type: ORDER_ADD_FAILURE,
				payload: 'User do not have cart or products do not have in carts :(',
			})

			return
		}

		dispatch({ type: ORDER_REQUEST })
		try {
			const resultAddOrder = await orderServiceApi.addOrder(cartId, totalPrice)

			dispatch({ type: ORDER_ADD_SUCCESS, payload: resultAddOrder.data })

			const actualDataCartItems = await cartItemsServiceApi.getCartItems(
				cartId,
				'all',
				0
			)

			dispatch({
				type: CART_ITEMS_GET_ALL_SUCCESS,
				payload: actualDataCartItems.data.cartItems,
			})
		} catch (error) {
			const errorMessage = errorMessageAsyncAction(error)

			dispatch({ type: ORDER_ADD_FAILURE, payload: errorMessage })
		}
	}

// Patch order
export const editOrder =
	(
		userId: number | null,
		orderId: number | null,
		orderStatus: string | null
	): AppThunk =>
	async (dispatch: Dispatch<AppActions>): Promise<void | never> => {
		if (!userId) {
			dispatch({
				type: ORDER_EDIT_FAILURE,
				payload: errorMessageUserNotAuth,
			})

			redirect('/auth/login')
			return
		}

		if (!orderId) {
			dispatch({ type: ORDER_EDIT_FAILURE, payload: 'Order id not founded' })

			return
		}

		if (!orderStatus) {
			dispatch({
				type: ORDER_EDIT_FAILURE,
				payload: 'No orderData edit',
			})

			return
		}

		dispatch({ type: ORDER_REQUEST })
		try {
			const resultEditOrder = await orderServiceApi.editOrderById(
				orderId,
				orderStatus
			)

			dispatch({ type: ORDER_EDIT_SUCCESS, payload: resultEditOrder.data })
		} catch (error) {
			const errorMessage = errorMessageAsyncAction(error)

			dispatch({ type: ORDER_EDIT_FAILURE, payload: errorMessage })
		}
	}

export const removeOrder =
	(userId: number | null, orderId: number | null) =>
	async (dispatch: Dispatch<AppActions>): Promise<void | never> => {
		if (!userId) {
			dispatch({
				type: ORDER_REMOVE_FAILURE,
				payload: errorMessageUserNotAuth,
			})

			redirect('/auth/login')
			return
		}

		if (!orderId) {
			dispatch({
				type: ORDER_REMOVE_FAILURE,
				payload: 'Order id not founded for deleting',
			})

			return
		}

		dispatch({ type: ORDER_REQUEST })

		try {
			await orderServiceApi.removeOrderById(orderId)

			dispatch({ type: ORDER_REMOVE_SUCCESS, payload: orderId })
		} catch (error) {
			const errorMessage = errorMessageAsyncAction(error)

			dispatch({ type: ORDER_REMOVE_FAILURE, payload: errorMessage })
		}
	}
