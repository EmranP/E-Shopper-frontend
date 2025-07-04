import { useCallback, useEffect, useState } from 'react'

import { useLocation } from 'react-router-dom'
import { IHookCartControl } from '../types/hook.types'
import { useActions } from './useActions'

export const useCartControl = (
	quantityValue: number,
	stock: number,
	cartItemsId?: number,
	price?: number | string
): IHookCartControl => {
	const location = useLocation()
	const [quantity, setQuantity] = useState(quantityValue || 1)
	const [isActiveMinSum, setIsActiveMinSum] = useState<boolean>(false)
	const [isActiveMaxSum, setIsActiveMaxSum] = useState<boolean>(false)
	const [isClickStock, setIsClickStock] = useState<boolean>(false)
	const { editCartItems } = useActions()

	const increaseStock = useCallback(() => {
		if (stock && quantity >= stock) {
			setIsActiveMaxSum(true)

			return
		}

		setQuantity(quantity + 1)
		setIsActiveMinSum(false)
		setIsClickStock(prev => !prev)
	}, [quantity, stock])

	const decreaseStock = useCallback(() => {
		if (quantity <= 1) {
			setIsActiveMinSum(true)

			return
		}

		setQuantity(quantity - 1)
		setIsActiveMaxSum(false)
		setIsClickStock(prev => !prev)
	}, [quantity])

	useEffect(() => {
		if (location.pathname === '/cart' && cartItemsId && price) {
			console.log('increaseStock')
			editCartItems(cartItemsId, stock++, Number(price))
		}
	}, [isClickStock])

	useEffect(() => {
		if (location.pathname === '/cart' && cartItemsId && price) {
			console.log('decreaseStock')
			editCartItems(cartItemsId, stock--, Number(price))
		}
	}, [isClickStock])

	return {
		quantity,
		isActiveMinSum,
		isActiveMaxSum,
		increaseStock,
		decreaseStock,
	}
}
