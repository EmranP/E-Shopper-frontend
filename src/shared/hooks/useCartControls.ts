import { useCallback, useState } from 'react'

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

	const updatedQuantityServerHandler = useCallback(
		(newQty: number) => {
			if (location.pathname === '/cart' && cartItemsId != null) {
				editCartItems(cartItemsId, newQty)
			}
		},
		[cartItemsId, editCartItems, location.pathname]
	)

	const increaseStock = useCallback(() => {
		setQuantity(prev => {
			const next = prev + 1

			if (stock != null && next > stock) {
				setIsActiveMaxSum(true)
				return prev
			}

			setIsActiveMinSum(false)
			updatedQuantityServerHandler(next)
			return next
		})
	}, [stock, updatedQuantityServerHandler])

	const decreaseStock = useCallback(() => {
		setQuantity(prev => {
			const next = prev - 1

			if (next < 1) {
				setIsActiveMinSum(true)
				return prev
			}

			setIsActiveMinSum(false)
			updatedQuantityServerHandler(next)
			return next
		})
	}, [updatedQuantityServerHandler])

	return {
		quantity,
		isActiveMinSum,
		isActiveMaxSum,
		increaseStock,
		decreaseStock,
	}
}
