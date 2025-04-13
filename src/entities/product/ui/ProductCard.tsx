/* eslint-disable react-hooks/exhaustive-deps */
import { motion } from 'motion/react'
import { FC } from 'react'
import { Link } from 'react-router-dom'
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
	onClick,
}) => {
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
				<Button
					title='Add carts'
					color='white'
					bgColor='bg-bgActionButton'
					onClick={onClick}
					type='button'
					style={{ marginBottom: 20, zIndex: 10, position: 'relative' }}
				/>
			</div>
		</motion.div>
	)
}
