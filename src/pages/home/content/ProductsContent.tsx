/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Pagination } from '../../../entities/product/ui/Pagination'
import { ProductCard } from '../../../entities/product/ui/ProductCard'
import { useActions } from '../../../shared/hooks/useActions'
import { useAppSelector } from '../../../shared/hooks/useStoreApp.hooks'
import { Button } from '../../../shared/ui/Buttons'
import { ErrorMessage } from '../../../shared/ui/ErrorUi'
import { LoaderApp } from '../../../shared/ui/LoaderApp'

export const ProductsContent: FC = () => {
	const { searchProduct, admin } = useAppSelector(state => state)
	const [sortedByPriceDesc, setSortedByPriceDesc] = useState(false)
	const [searchParams, setSearchParams] = useSearchParams()
	const { getProductSearch, getAllProducts } = useActions()

	const search = searchParams.get('search') || ''
	const page = Number(searchParams.get('page') || 1)
	const limit = 6
	const offset = (page - 1) * limit

	const {
		productsSearch,
		isAppLoading: isSearchProductAppLoading,
		error: searchError,
		total: totalSearchProduct,
	} = searchProduct

	const {
		products: allProducts,
		isAppLoading: isProductAppLoading,
		total: totalProduct,
		error: productError,
	} = admin.products

	useEffect(() => {
		if (!search) {
			getAllProducts(limit, offset)
		} else {
			getProductSearch(search, limit, offset)
		}
	}, [search, page, offset])

	const productList = search ? productsSearch : allProducts

	const productAppLoading = search
		? isSearchProductAppLoading
		: isProductAppLoading

	const totalPage = Math.max(
		1,
		Math.ceil(search ? totalSearchProduct : totalProduct / limit)
	)

	const sortedProducts = useMemo(() => {
		if (!productList) return []

		return [...productList].sort((a, b) =>
			sortedByPriceDesc
				? Number(b.price) - Number(a.price)
				: Number(a.id) - Number(b.id)
		)
	}, [productList, sortedByPriceDesc])

	const changeProduct = (newPage: number): void => {
		const next = Math.min(Math.max(1, newPage), totalPage)
		searchParams.set('page', String(next))
		setSearchParams(searchParams)
	}

	// console.log(isSearchProductAppLoading)

	const errorMessage = productError || searchError
	if (errorMessage) return <ErrorMessage error={errorMessage} />

	if (productAppLoading) return <LoaderApp />

	if (!productList || productList.length === 0)
		return <ErrorMessage error='No products found' />

	console.log(productList)
	console.log(totalPage)
	return (
		<>
			<div className='flex-auto'>
				<div className='flex justify-between gap-5 mb-15'>
					<h1 className='text-2xl flex-auto'>Products</h1>
					{productList.length >= 2 && (
						<Button
							color={'white'}
							bgColor={'bg-bgActionButton'}
							title={sortedByPriceDesc ? 'Reset Sort' : 'Sort by Price ↓'}
							style={{ width: 150 }}
							onClick={() => setSortedByPriceDesc(prev => !prev)}
						/>
					)}
				</div>

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

				{totalPage > 1 && (
					<Pagination
						page={page}
						totalPage={totalPage}
						prevPageHandler={() => changeProduct(page - 1)}
						nextPageHandler={() => changeProduct(page + 1)}
					/>
				)}
			</div>
		</>
	)
}
