import { Minus, Plus } from 'lucide-react'
import { FC, useState } from 'react'
import { ICartControls } from '../types/type.ui'

//! Here will be just ui, functional must be top level
export const CartControls: FC<ICartControls> = ({ stock }) => {
	const [quantity, setQuantity] = useState<number>(0)
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
		if (quantity <= 0) {
			setIsActiveMinSum(true)
			return
		}

		setQuantity(quantity - 1)
		setIsActiveMaxSum(false)
	}
	return (
		<div>
			<button className='' onClick={increaseStock}>
				<Plus opacity={isActiveMaxSum ? 0.5 : 1} />
			</button>
			<div>
				<span>{quantity}</span>
			</div>
			<button className='' onClick={decreaseStock}>
				<Minus opacity={isActiveMinSum ? 0.5 : 1} />
			</button>
		</div>
	)
}
