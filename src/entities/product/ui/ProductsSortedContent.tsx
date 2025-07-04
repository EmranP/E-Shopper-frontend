import { FC } from 'react'
import { IProductsSortedContent } from '../types/types-ui.interface'
import { ProductCard } from './ProductCard'

export const ProductsSortedContent: FC<IProductsSortedContent> = ({
	sortedProducts,
}) => {
	return (
		<div className='products__row space-5 mb-10'>
			{sortedProducts?.map(productItem => (
				<ProductCard
					key={productItem.id}
					id={productItem.id}
					title={productItem.name}
					imageUrl={productItem.imageUrl}
					price={productItem.price}
					description={productItem.description}
					stock={productItem.stock}
				/>
			))}
		</div>
	)
}
