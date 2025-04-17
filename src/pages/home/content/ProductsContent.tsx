/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Pagination } from '../../../entities/product/ui/Pagination'
import { ProductCard } from '../../../entities/product/ui/ProductCard'
import { useActions } from '../../../shared/hooks/useActions'
import { useAppSelector } from '../../../shared/hooks/useStoreApp.hooks'
import { Button } from '../../../shared/ui/Buttons'
import { ErrorMessage } from '../../../shared/ui/ErrorUi'
import { LoaderApp } from '../../../shared/ui/LoaderApp'

export const ProductsContent: FC = () => {
	const { searchProduct } = useAppSelector(state => state)
	const [sortedByPriceDesc, setSortedByPriceDesc] = useState(false)
	const [searchParams, setSearchParams] = useSearchParams()
	const { getProductSearch } = useActions()

	const { productsSearch, isAppLoading, error, total } = searchProduct

	const search = searchParams.get('search') || ''
	const page = Number(searchParams.get('page') || 1)
	const limit = 6
	const offset = (page - 1) * limit
	const totalPages = Math.ceil(total / limit)

	useEffect(() => {
		getProductSearch(search, limit, offset)
	}, [search, page])

	if (!productsSearch) return <ErrorMessage error={error} />

	const sortedProducts = [...productsSearch].sort((a, b) => {
		if (sortedByPriceDesc) {
			return (Number(b.price) - Number(a.price)) as number
		}
		return (a.id as number) - Number(b.id)
	})

	const prevPageHandler = () => {
		if (page > 1) {
			searchParams.set('page', String(page - 1))
			setSearchParams(searchParams)
		}
	}

	const nextPageHandler = () => {
		if (page < totalPages) {
			searchParams.set('page', String(page + 1))
			setSearchParams(searchParams)
		}
	}
	return (
		<>
			<div className='flex-auto'>
				<div className='flex justify-between gap-5 mb-15'>
					<h1 className='text-2xl flex-auto'>Products</h1>
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
				) : !productsSearch.length ? (
					<ErrorMessage error={'No quantity of goods'} />
				) : (
					<>
						{search && (
							<p className='mb-6 text-sm text-gray-500'>
								Search results for the query: <strong>{search}</strong>
							</p>
						)}
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
						<Pagination
							page={page}
							totalPage={totalPages}
							prevPageHandler={prevPageHandler}
							nextPageHandler={nextPageHandler}
						/>
					</>
				)}
			</div>
		</>
	)
}
