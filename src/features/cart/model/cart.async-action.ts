import { redirect } from 'react-router-dom'
import { Dispatch } from 'redux'
import { ADMIN_REQUEST } from '../../../app/constants/actions/admin.constants'
import {
	CART_GET_FAILURE,
	CART_GET_SUCCESS,
} from '../../../app/constants/actions/cart.constatns'
import { AppActions, AppThunk } from '../../../shared/types/store.types'
import { errorMessageAsyncAction } from '../../../shared/utils/errorMessage.async-action'
import { cartsServiceApi } from '../service/cart.service'

export const getUserCarts =
	(userId: number | null): AppThunk =>
	async (dispatch: Dispatch<AppActions>): Promise<void> => {
		if (!userId) {
			dispatch({ type: CART_GET_FAILURE, payload: 'User not Authorization!!!' })

			redirect('/auth/login')
			return
		}

		dispatch({ type: ADMIN_REQUEST })

		try {
			const resultGetUserCart = await cartsServiceApi.getUserCarts(userId)

			dispatch({ type: CART_GET_SUCCESS, payload: resultGetUserCart.data })
		} catch (error) {
			const errorMessage = errorMessageAsyncAction(error)

			dispatch({ type: CART_GET_FAILURE, payload: errorMessage })
		}
	}
