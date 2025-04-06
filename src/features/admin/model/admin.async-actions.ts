import { Dispatch } from 'redux'
import {
	ADMIN_ORDERS_EDIT_FAILURE,
	ADMIN_ORDERS_EDIT_SUCCESS,
	ADMIN_ORDERS_GET_FAILURE,
	ADMIN_ORDERS_GET_SUCCESS,
	ADMIN_ORDERS_REMOVE_FAILURE,
	ADMIN_ORDERS_REMOVE_SUCCESS,
	ADMIN_REQUEST,
	ADMIN_REQUEST_END,
	ADMIN_USERS_EDIT_FAILURE,
	ADMIN_USERS_EDIT_SUCCESS,
	ADMIN_USERS_GET_FAILURE,
	ADMIN_USERS_GET_SUCCESS,
	ADMIN_USERS_REMOVE_FAILURE,
	ADMIN_USERS_REMOVE_SUCCESS,
} from '../../../app/constants/actions/admin.constants'
import { ROLES } from '../../../app/constants/roles/roles'
import { AppActions, AppThunk } from '../../../shared/types/store.types'
import { errorMessageAsyncAction } from '../../../shared/utils/errorMessage.async-action'
import { adminServiceOrdersApi, adminServiceUsersApi } from './admin.service'

// Users
export const getAllForAdminUsers =
	(): AppThunk =>
	async (dispatch: Dispatch<AppActions>): Promise<void> => {
		try {
			dispatch({ type: ADMIN_REQUEST })
			const resultGetAllUsers = await adminServiceUsersApi.getAdminUsers()

			dispatch({
				type: ADMIN_USERS_GET_SUCCESS,
				payload: resultGetAllUsers.data,
			})
		} catch (error) {
			const errorMessage = errorMessageAsyncAction(error)

			dispatch({ type: ADMIN_USERS_GET_FAILURE, payload: errorMessage })
		}
	}

export const editForAdminUsers =
	(userId: number | string, userRole: ROLES): AppThunk =>
	async (dispatch: Dispatch<AppActions>): Promise<void> => {
		if (!userId || !userRole) {
			dispatch({
				type: ADMIN_USERS_EDIT_FAILURE,
				payload: 'User is not writing data',
			})
			return
		}

		dispatch({ type: ADMIN_REQUEST })
		try {
			const resultEdit = await adminServiceUsersApi.editAdminUser(userId, {
				role: userRole,
			})

			dispatch({
				type: ADMIN_USERS_EDIT_SUCCESS,
				payload: resultEdit.data,
			})

			const resultGetAllUsers = await adminServiceUsersApi.getAdminUsers()

			dispatch({
				type: ADMIN_USERS_GET_SUCCESS,
				payload: resultGetAllUsers.data,
			})
		} catch (error) {
			const errorMessage = errorMessageAsyncAction(error)

			dispatch({ type: ADMIN_USERS_EDIT_FAILURE, payload: errorMessage })
		}
	}

export const removeForAdminUsers =
	(userId: number | string): AppThunk =>
	async (dispatch: Dispatch<AppActions>): Promise<void> => {
		dispatch({ type: ADMIN_REQUEST })
		try {
			await adminServiceUsersApi.deleteAdminUser(userId)

			dispatch({ type: ADMIN_USERS_REMOVE_SUCCESS })

			const resultNewUsersData = await adminServiceUsersApi.getAdminUsers()

			dispatch({
				type: ADMIN_USERS_GET_SUCCESS,
				payload: resultNewUsersData.data,
			})
		} catch (error) {
			const errorMessage = errorMessageAsyncAction(error)

			dispatch({ type: ADMIN_USERS_REMOVE_FAILURE, payload: errorMessage })
		}
	}

// Orders
export const getAllOrdersForAdmin =
	(): AppThunk =>
	async (dispatch: Dispatch<AppActions>): Promise<void> => {
		dispatch({ type: ADMIN_REQUEST })
		try {
			const resultGetAllOrders = await adminServiceOrdersApi.getAllOrders()

			dispatch({
				type: ADMIN_ORDERS_GET_SUCCESS,
				payload: resultGetAllOrders.data,
			})
		} catch (error) {
			const errorMessage = errorMessageAsyncAction(error)

			dispatch({ type: ADMIN_ORDERS_GET_FAILURE, payload: errorMessage })
		} finally {
			dispatch({ type: ADMIN_REQUEST_END })
		}
	}

export const editOrdersForAdmin =
	(orderId: number | string, orderStatus: string): AppThunk =>
	async (dispatch: Dispatch<AppActions>): Promise<void> => {
		dispatch({ type: ADMIN_REQUEST })

		try {
			if (!orderId || !orderStatus) {
				throw new Error('User not writing data for request :(')
			}

			const resultEditOrders = await adminServiceOrdersApi.editOrders(
				orderId,
				orderStatus
			)

			dispatch({
				type: ADMIN_ORDERS_EDIT_SUCCESS,
				payload: resultEditOrders.data,
			})
		} catch (error) {
			const errorMessage = errorMessageAsyncAction(error)

			dispatch({ type: ADMIN_ORDERS_EDIT_FAILURE, payload: errorMessage })
		} finally {
			dispatch({ type: ADMIN_REQUEST_END })
		}
	}

export const removeOrdersForAdmin =
	(orderId: number | string): AppThunk =>
	async (dispatch: Dispatch<AppActions>): Promise<void> => {
		dispatch({ type: ADMIN_REQUEST })
		try {
			if (!orderId) {
				throw new Error('User Id not writing!!!')
			}

			await adminServiceOrdersApi.deleteOrders(orderId)

			dispatch({ type: ADMIN_ORDERS_REMOVE_SUCCESS })
		} catch (error) {
			const errorMessage = errorMessageAsyncAction(error)

			dispatch({ type: ADMIN_ORDERS_REMOVE_FAILURE, payload: errorMessage })
		} finally {
			dispatch({ type: ADMIN_REQUEST_END })
		}
	}

// Products
