import { Dispatch } from 'redux'
import {
	ADMIN_CARTS_GET_FAILURE,
	ADMIN_CARTS_GET_SUCCESS,
	ADMIN_CARTS_REQUEST,
	ADMIN_USERS_EDIT_FAILURE,
	ADMIN_USERS_EDIT_SUCCESS,
	ADMIN_USERS_GET_FAILURE,
	ADMIN_USERS_GET_SUCCESS,
	ADMIN_USERS_REMOVE_FAILURE,
	ADMIN_USERS_REMOVE_SUCCESS,
	ADMIN_USERS_REQUEST,
	USER_NOT_WRITE_DATA,
} from '../../../app/constants/actions/admin.constants'
import { ROLES } from '../../../app/constants/roles/roles'
import { AppActions, AppThunk } from '../../../shared/types/store.types'
import { errorMessageAsyncAction } from '../../../shared/utils/errorMessage.async-action'
import { adminServiceCartsApi, adminServiceUsersApi } from './admin.service'

// Users
export const getAllForAdminUsers =
	(): AppThunk =>
	async (dispatch: Dispatch<AppActions>): Promise<void> => {
		dispatch({ type: ADMIN_USERS_REQUEST })
		try {
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
		if (!userId || userRole === null || undefined) {
			dispatch({
				type: ADMIN_USERS_EDIT_FAILURE,
				payload: USER_NOT_WRITE_DATA,
			})
			return
		}

		dispatch({ type: ADMIN_USERS_REQUEST })
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
		dispatch({ type: ADMIN_USERS_REQUEST })
		try {
			await adminServiceUsersApi.deleteAdminUser(userId)

			dispatch({ type: ADMIN_USERS_REMOVE_SUCCESS, payload: userId as number })
		} catch (error) {
			const errorMessage = errorMessageAsyncAction(error)

			dispatch({ type: ADMIN_USERS_REMOVE_FAILURE, payload: errorMessage })
		}
	}

// Carts
export const getAllUserCartsForAdmin =
	(): AppThunk =>
	async (dispatch: Dispatch<AppActions>): Promise<void> => {
		dispatch({ type: ADMIN_CARTS_REQUEST })

		try {
			const resultGetUserCartsForAdmin =
				await adminServiceCartsApi.getAllCarts()

			dispatch({
				type: ADMIN_CARTS_GET_SUCCESS,
				payload: resultGetUserCartsForAdmin.data,
			})
		} catch (error) {
			const errorMessage = errorMessageAsyncAction(error)

			dispatch({ type: ADMIN_CARTS_GET_FAILURE, payload: errorMessage })
		}
	}
