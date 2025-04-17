/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ProductCard } from '../../../entities/product/ui/ProductCard'
import { useActions } from '../../../shared/hooks/useActions'
import { useAppSelector } from '../../../shared/hooks/useStoreApp.hooks'
import { Button } from '../../../shared/ui/Buttons'
import { LoaderApp } from '../../../shared/ui/LoaderApp'

export const CategoryContent: FC = () => {
	const { categoryProductId } = useParams()
	const { categories, products } = useAppSelector(state => state.admin)
	const { getCategoryById, getAllProducts } = useActions()
	const [sortedByPriceDesc, setSortedByPriceDesc] = useState(false)

	const { categoryItem } = categories
	const { products: productsCategoriesData, isAppLoading } = products

	useEffect(() => {
		getCategoryById(Number(categoryProductId))
		getAllProducts()
	}, [categoryProductId])

	const filteredProductsCategories = productsCategoriesData?.filter(
		productCategory => productCategory.categoryId === Number(categoryProductId)
	)

	const sortedProducts = [...(filteredProductsCategories || [])].sort((a, b) =>
		sortedByPriceDesc
			? Number(a.price) - Number(b.price)
			: Number(b.id) - Number(a.id)
	)

	return (
		<div className='flex-auto'>
			<div className='flex justify-between gap-5 mb-15'>
				<h1 className='text-2xl flex-auto'>
					Category {categoryItem?.name} content
				</h1>
				<Button
					color={'white'}
					bgColor={'bg-bgActionButton'}
					title={sortedByPriceDesc ? 'Reset Sort' : 'Sort by Price ↓'}
					style={{ width: 150 }}
					onClick={() => setSortedByPriceDesc(prev => !prev)}
				/>
			</div>
			{isAppLoading ? (
				<LoaderApp />
			) : (
				<div className='products__row space-5'>
					{sortedProducts?.map(
						({ id, name, imageUrl, description, price, stock }) => (
							<ProductCard
								key={id}
								id={id}
								title={name}
								price={price}
								imageUrl={imageUrl}
								description={description}
								stock={stock}
							/>
						)
					)}
				</div>
			)}
		</div>
	)
}
