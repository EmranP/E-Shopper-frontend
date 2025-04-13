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
				<div>
					<h1>{product?.name}</h1>
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
					onClick={() => {
						showModalHandler()
						setIdToDelete(product?.id as number)
					}}
				/>
			</div>
		</div>
	)
}
