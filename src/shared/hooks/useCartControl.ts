/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { IHookCartControl } from '../types/hook.types'
import { useActions } from './useActions'

export const useCartControl = (
	quantityValue: number,
	stock: number,
	cartItemsId?: number
): IHookCartControl => {
	const location = useLocation()
	const [quantity, setQuantity] = useState(quantityValue || 1)
	const [isActiveMinSum, setIsActiveMinSum] = useState<boolean>(false)
	const [isActiveMaxSum, setIsActiveMaxSum] = useState<boolean>(false)
	const { editCartItems } = useActions()

	const isFirstRender = useRef(true)

	const increaseStock = useCallback(() => {
		setQuantity(prev => {
			if (stock != null && prev >= stock) {
				setIsActiveMaxSum(true)
				return prev
			}

			setIsActiveMinSum(false)
			return prev + 1
		})
	}, [stock])

	const decreaseStock = useCallback(() => {
		setQuantity(prev => {
			if (prev <= 1) {
				setIsActiveMinSum(true)
				return prev
			}

			setIsActiveMaxSum(false)
			return prev - 1
		})
	}, [])

	useEffect(() => {
		if (isFirstRender.current) {
			isFirstRender.current = false
			return
		}

		if (location.pathname === '/cart' && cartItemsId != null) {
			editCartItems(cartItemsId, quantity)
		}
	}, [cartItemsId, location.pathname, quantity])

	return {
		quantity,
		isActiveMinSum,
		isActiveMaxSum,
		increaseStock,
		decreaseStock,
	}
}
