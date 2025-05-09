import { Trash } from 'lucide-react'
import { FC } from 'react'
import { useCartControl } from '../../../shared/hooks/useCartControls'
import { iconsSize } from '../../admin/ui/AdminForms'
import { CartItemProps } from '../types/type.ui'
import { CartControls } from './CartControls '

export const CartItem: FC<CartItemProps> = ({
	product,
	showModalHandler,
	setIdToDelete,
	setProductIdToDelete,
}) => {
	const {
		quantity,
		increaseStock,
		decreaseStock,
		isActiveMaxSum,
		isActiveMinSum,
	} = useCartControl(product?.quantity as number, product?.stock as number)

	return (
		<div key={product?.id} className='flex gap-2'>
			<div className='flex flex-2/3 justify-between items-center gap-4 bg-bgCards p-3 rounded-2xl mb-5'>
				<div>
					{product?.imageUrl ? (
						<img
							src={product.imageUrl}
							alt={product.name || 'image-title'}
							className='w-[80px] h-[80px] rounded-xl mx-auto'
						/>
					) : (
						<div className='p-4 text-center text-2xl bg-gray-600 bg-specialColor'>
							No Image
						</div>
					)}
				</div>
				<div className='text-center'>
					<h1>{product?.name}</h1>
					<h2>
						<span className='text-specialColor pr-1'>{product?.price}</span>$
					</h2>
				</div>
				<CartControls
					quantity={quantity}
					stock={product?.stock}
					isActiveMinSum={isActiveMinSum}
					isActiveMaxSum={isActiveMaxSum}
					increaseStock={increaseStock}
					decreaseStock={decreaseStock}
				/>
			</div>
			<div className='mt-10'>
				<Trash
					size={iconsSize}
					cursor={'pointer'}
					color='red'
					onClick={() => {
						showModalHandler()
						setIdToDelete(Number(product?.cartItemId))
						setProductIdToDelete(Number(product?.id))
					}}
				/>
			</div>
		</div>
	)
}
