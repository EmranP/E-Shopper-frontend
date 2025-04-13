/* eslint-disable react-hooks/exhaustive-deps */
import { motion } from 'motion/react'
import { FC, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useAppSelector } from '../../shared/hooks/store.hooks'
import { useActions } from '../../shared/hooks/useActions'
import { Button } from '../../shared/ui/Buttons'
import { LoaderApp } from '../../shared/ui/LoaderApp'
import {
	containerVariants,
	itemVariants,
} from '../../shared/utils/animate.utils'

export const CurrentProduct: FC = () => {
	const { productId } = useParams()
	const { productItem, isAppLoading } = useAppSelector(
		state => state.admin.products
	)
	const { getProductById } = useActions()

	useEffect(() => {
		getProductById(Number(productId))
	}, [productId])

	if (isAppLoading) return <LoaderApp />

	if (!productItem) return

	return (
		<motion.div
			variants={containerVariants}
			initial='hidden'
			animate='visible'
			className='flex-auto'
		>
			<motion.h1
				variants={itemVariants}
				className='text-4xl font-semibold mb-10'
			>
				Product ID: #{productId}
			</motion.h1>
			{productItem?.id === Number(productId) ? (
				<div className='flex gap-20 flex-wrap'>
					<motion.div
						variants={itemVariants}
						className='w-[250px] my-auto object-cover'
					>
						<motion.img
							src={productItem?.imageUrl}
							alt={productItem?.name}
							className='rounded-xl'
							initial={{ opacity: 0, scale: 0.9 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ duration: 0.6 }}
						/>
					</motion.div>
					<motion.div
						variants={containerVariants}
						className='py-5 space-y-5 flex-auto'
					>
						<motion.h1 variants={itemVariants} className='text-4xl'>
							Title Product: {productItem?.name}
						</motion.h1>
						<motion.h2 variants={itemVariants} className='text-xl'>
							{productItem.price ? (
								<>
									<span className='pr-2 text-specialColor'>
										{productItem.price}
									</span>
									$
								</>
							) : (
								0
							)}
						</motion.h2>
						<motion.p
							variants={itemVariants}
							className='max-w-[1000px] text-lg'
						>
							About Product:{productItem.description}
						</motion.p>
						<motion.div variants={itemVariants}>
							<Button
								title='Add carts'
								color='white'
								bgColor='bg-bgActionButton'
								onClick={() => {}}
								type='button'
								style={{
									marginBottom: 20,
									zIndex: 10,
									position: 'relative',
									width: 200,
								}}
							/>
						</motion.div>
					</motion.div>
				</div>
			) : (
				<motion.h1
					variants={itemVariants}
					className='text-center text-2xl mb-15'
				>
					Product ID: not found
				</motion.h1>
			)}
		</motion.div>
	)
}
