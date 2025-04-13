import { useState } from 'react'

import { IHookCartControl } from '../types/hook.types'

export const useCartControl = (
	quantityValue: number,
	stock: number
): IHookCartControl => {
	const [quantity, setQuantity] = useState(quantityValue || 1)
	const [isActiveMinSum, setIsActiveMinSum] = useState<boolean>(false)
	const [isActiveMaxSum, setIsActiveMaxSum] = useState<boolean>(false)

	const increaseStock = () => {
		if (stock && quantity > stock) {
			setIsActiveMaxSum(true)
			return
		}

		setQuantity(quantity + 1)
		setIsActiveMinSum(false)
	}

	const decreaseStock = () => {
		if (quantity <= 1) {
			setIsActiveMinSum(true)
			return
		}

		setQuantity(quantity - 1)
		setIsActiveMaxSum(false)
	}

	return {
		quantity,
		isActiveMinSum,
		isActiveMaxSum,
		increaseStock,
		decreaseStock,
	}
}
