import { Dispatch } from 'redux'
import {
	ADMIN_CATEGORIES_ADD_FAILURE,
	ADMIN_CATEGORIES_ADD_SUCCESS,
	ADMIN_CATEGORIES_EDIT_FAILURE,
	ADMIN_CATEGORIES_EDIT_SUCCESS,
	ADMIN_CATEGORIES_GET_FAILURE,
	ADMIN_CATEGORIES_GET_SUCCESS,
	ADMIN_CATEGORIES_REMOVE_FAILURE,
	ADMIN_CATEGORIES_REMOVE_SUCCESS,
	ADMIN_CATEGORY_GET_BY_ID_FAILURE,
	ADMIN_CATEGORY_GET_BY_ID_SUCCESS,
	ADMIN_REQUEST,
	USER_NOT_WRITE_DATA,
} from '../../../app/constants/actions/admin.constants'
import { AppActions, AppThunk } from '../../../shared/types/store.types'
import { errorMessageAsyncAction } from '../../../shared/utils/errorMessage.async-action'
import { categoryService } from './category.service'

export const getAllCategories =
	(): AppThunk =>
	async (dispatch: Dispatch<AppActions>): Promise<void> => {
		dispatch({ type: ADMIN_REQUEST })

		try {
			const resultGetAllCategories = await categoryService.getAllCategories()

			dispatch({
				type: ADMIN_CATEGORIES_GET_SUCCESS,
				payload: resultGetAllCategories.data,
			})
		} catch (error) {
			const errorMessage = errorMessageAsyncAction(error)

			dispatch({ type: ADMIN_CATEGORIES_GET_FAILURE, payload: errorMessage })
		}
	}

export const getCategoryById =
	(categoryId: number): AppThunk =>
	async (dispatch: Dispatch<AppActions>): Promise<void> => {
		if (categoryId === null || undefined) {
			dispatch({
				type: ADMIN_CATEGORY_GET_BY_ID_FAILURE,
				payload: 'Category Id not founded',
			})
			return
		}

		dispatch({ type: ADMIN_REQUEST })
		try {
			const resultGetByIdCategory = await categoryService.getCategoryById(
				categoryId
			)

			dispatch({
				type: ADMIN_CATEGORY_GET_BY_ID_SUCCESS,
				payload: resultGetByIdCategory.data,
			})
		} catch (error) {
			const errorMessage = errorMessageAsyncAction(error)

			dispatch({
				type: ADMIN_CATEGORY_GET_BY_ID_FAILURE,
				payload: errorMessage,
			})
		}
	}

export const addCategory =
	(categoryData: string): AppThunk =>
	async (dispatch: Dispatch<AppActions>): Promise<void> => {
		if (!categoryData) {
			dispatch({
				type: ADMIN_CATEGORIES_ADD_FAILURE,
				payload: USER_NOT_WRITE_DATA,
			})
			return
		}

		dispatch({ type: ADMIN_REQUEST })
		try {
			const resultAddCategory = await categoryService.addCategory(categoryData)

			dispatch({
				type: ADMIN_CATEGORIES_ADD_SUCCESS,
				payload: resultAddCategory.data,
			})
		} catch (error) {
			const errorMessage = errorMessageAsyncAction(error)

			dispatch({ type: ADMIN_CATEGORIES_ADD_FAILURE, payload: errorMessage })
		}
	}

export const editCategory =
	(categoryId: number, categoryData: string): AppThunk =>
	async (dispatch: Dispatch<AppActions>): Promise<void> => {
		if (categoryId === null || undefined) {
			dispatch({
				type: ADMIN_CATEGORIES_EDIT_FAILURE,
				payload: USER_NOT_WRITE_DATA,
			})
			return
		}

		dispatch({ type: ADMIN_REQUEST })
		try {
			const resultEditCategory = await categoryService.editCategory(
				categoryId,
				categoryData
			)

			dispatch({
				type: ADMIN_CATEGORIES_EDIT_SUCCESS,
				payload: resultEditCategory.data,
			})
		} catch (error) {
			const errorMessage = errorMessageAsyncAction(error)

			dispatch({ type: ADMIN_CATEGORIES_EDIT_FAILURE, payload: errorMessage })
		}
	}

export const removeCategory =
	(categoryId: number): AppThunk =>
	async (dispatch: Dispatch<AppActions>): Promise<void> => {
		if (categoryId === null || undefined) {
			dispatch({
				type: ADMIN_CATEGORIES_REMOVE_FAILURE,
				payload: USER_NOT_WRITE_DATA,
			})
			return
		}

		dispatch({ type: ADMIN_REQUEST })
		try {
			await categoryService.removeCategory(categoryId)

			dispatch({
				type: ADMIN_CATEGORIES_REMOVE_SUCCESS,
				payload: categoryId,
			})
		} catch (error) {
			const errorMessage = errorMessageAsyncAction(error)

			dispatch({ type: ADMIN_CATEGORIES_REMOVE_FAILURE, payload: errorMessage })
		}
	}
