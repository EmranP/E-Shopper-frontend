/* eslint-disable react-hooks/exhaustive-deps */
import { motion } from 'motion/react'
import { FC, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { CartControls } from '../../../features/cart/ui/CartControls '
import { useActions } from '../../../shared/hooks/useActions'
import { useCartControl } from '../../../shared/hooks/useCartControls'
import { useAppSelector } from '../../../shared/hooks/useStoreApp.hooks'
import { Button } from '../../../shared/ui/Buttons'
import { cardVariants } from '../../../shared/utils/animate.utils'
import { truncateText } from '../../../shared/utils/truncateText.utils'
import { IProductCard } from '../types/types-ui.interface'

export const ProductCard: FC<IProductCard> = ({
	id,
	title,
	imageUrl,
	price,
	description,
	stock,
}) => {
	const {
		quantity,
		isActiveMinSum,
		isActiveMaxSum,
		increaseStock,
		decreaseStock,
	} = useCartControl(1, stock)
	const { addCartItems } = useActions()
	const { cart } = useAppSelector(state => state.carts)
	const [processBuy, setProcessBuy] = useState(false)

	const addCartItemsHandler = () => {
		if (!cart?.id || !id || !price) return
		setProcessBuy(true)

		addCartItems(cart.id, id, price as number, quantity)
		toast.success('Product has been success added')
		setProcessBuy(false)
	}

	const isOutOfStock = stock === 0

	return (
		<motion.div
			variants={cardVariants}
			initial='hidden'
			animate='visible'
			whileHover={{ scale: 1.03, transition: { duration: 0.3 } }}
			className='bg-bgCards rounded-2xl hover:shadow-2xl shadow-gray-600 duration-300'
		>
			<Link to={`products/${id}`}>
				{imageUrl ? (
					<motion.img
						src={imageUrl}
						alt={title || 'image-title'}
						className='w-full h-[230px] rounded-t-2xl object-cover'
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.2, duration: 0.6 }}
					/>
				) : (
					<div className='p-4 text-center text-2xl bg-gray-600 bg-specialColor'>
						No Image
					</div>
				)}
				<div className='px-4 py-2 space-y-3'>
					<h1 className='text-xl'>{title ? title : 'Product'}</h1>
					<h2 className='text-xl'>
						{price ? (
							<>
								<span className='pr-2 text-specialColor'>{price}</span>$
							</>
						) : (
							0
						)}
					</h2>
					<h2>
						{description ? truncateText(description, 30) : 'No description'}
					</h2>
				</div>
			</Link>
			<div className={'px-4 py-2'}>
				<div className='mb-4'>
					<CartControls
						stock={stock}
						quantity={quantity}
						isActiveMaxSum={isActiveMaxSum}
						isActiveMinSum={isActiveMinSum}
						increaseStock={increaseStock}
						decreaseStock={decreaseStock}
					/>
				</div>
				<Button
					title={processBuy ? 'Adding cart...' : 'Add cart'}
					onClick={addCartItemsHandler}
					disabled={isOutOfStock}
					color='white'
					bgColor='bg-bgActionButton'
					type='button'
					style={{ marginBottom: 20, zIndex: 10, position: 'relative' }}
				/>
			</div>
		</motion.div>
	)
}
