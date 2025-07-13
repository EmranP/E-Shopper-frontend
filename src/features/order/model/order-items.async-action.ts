import { redirect } from 'react-router-dom'
import { Dispatch } from 'redux'
import {
	ORDER_ITEMS_BY_ID_FAILURE,
	ORDER_ITEMS_BY_ID_SUCCESS,
	ORDER_ITEMS_GET_ADMIN_FAILURE,
	ORDER_ITEMS_GET_ADMIN_SUCCESS,
	ORDER_ITEMS_GET_FAILURE,
	ORDER_ITEMS_GET_SUCCESS,
	ORDER_ITEMS_REQUEST,
} from '../../../app/constants/actions/order.constants'
import { ROLES } from '../../../app/constants/roles/roles'
import {
	errorMessageUserNotAuth,
	errorMessageUserNotHaveAccess,
} from '../../../app/constants/utils/errorMessage.constant'
import { AppActions, AppThunk } from '../../../shared/types/store.types'
import { errorMessageAsyncAction } from '../../../shared/utils/errorMessage.async-action'
import { orderItemsServiceApi } from './order.service'

// Order Get admin
export const getAllAdminOrderItems =
	(userId: number | null, userRole: number | null): AppThunk =>
	async (dispatch: Dispatch<AppActions>): Promise<void | never> => {
		if (!userId) {
			dispatch({
				type: ORDER_ITEMS_GET_ADMIN_FAILURE,
				payload: errorMessageUserNotAuth,
			})

			redirect('/auth/login')
			return
		}

		if (userRole !== ROLES.ADMIN) {
			dispatch({
				type: ORDER_ITEMS_GET_ADMIN_FAILURE,
				payload: errorMessageUserNotHaveAccess,
			})

			return
		}

		dispatch({ type: ORDER_ITEMS_REQUEST })
		try {
			const resultGetAllAdminOrder =
				await orderItemsServiceApi.getAllAdminOrderItems()

			dispatch({
				type: ORDER_ITEMS_GET_ADMIN_SUCCESS,
				payload: resultGetAllAdminOrder.data,
			})
		} catch (error) {
			const errorMessage = errorMessageAsyncAction(error)

			dispatch({ type: ORDER_ITEMS_GET_ADMIN_FAILURE, payload: errorMessage })
		}
	}

export const getAllCustomerOrderItems =
	(userId: number | null, orderId: number | null): AppThunk =>
	async (dispatch: Dispatch<AppActions>): Promise<void | never> => {
		if (!userId) {
			dispatch({
				type: ORDER_ITEMS_GET_FAILURE,
				payload: errorMessageUserNotAuth,
			})

			redirect('/auth/login')
			return
		}

		if (!orderId) {
			dispatch({
				type: ORDER_ITEMS_GET_FAILURE,
				payload: 'Order-items id not founded',
			})

			return
		}

		dispatch({ type: ORDER_ITEMS_REQUEST })
		try {
			const resultGetAllCustomerOrder =
				await orderItemsServiceApi.getAllCustomerOrderItems(orderId)

			dispatch({
				type: ORDER_ITEMS_GET_SUCCESS,
				payload: resultGetAllCustomerOrder.data,
			})
		} catch (error) {
			const errorMessage = errorMessageAsyncAction(error)

			dispatch({ type: ORDER_ITEMS_GET_FAILURE, payload: errorMessage })
		}
	}

export const getOrderById =
	(
		userId: number | null,
		orderId: number | null,
		orderItemsId: number | null
	): AppThunk =>
	async (dispatch: Dispatch<AppActions>): Promise<void | never> => {
		if (!userId) {
			dispatch({
				type: ORDER_ITEMS_BY_ID_FAILURE,
				payload: errorMessageUserNotAuth,
			})

			redirect('/auth/login')
			return
		}

		if (!orderId || !orderItemsId) {
			dispatch({
				type: ORDER_ITEMS_BY_ID_FAILURE,
				payload: 'Order id not founded',
			})

			return
		}

		dispatch({ type: ORDER_ITEMS_REQUEST })
		try {
			const resultGetOrderById = await orderItemsServiceApi.getOrderItemsById(
				orderId,
				orderItemsId
			)

			dispatch({
				type: ORDER_ITEMS_BY_ID_SUCCESS,
				payload: resultGetOrderById.data,
			})
		} catch (error) {
			const errorMessage = errorMessageAsyncAction(error)

			dispatch({ type: ORDER_ITEMS_BY_ID_FAILURE, payload: errorMessage })
		}
	}
