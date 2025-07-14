/* eslint-disable react-hooks/exhaustive-deps */

import { FC, useEffect, useMemo, useState } from 'react'
import { Pagination } from '../../../entities/product/ui/Pagination'
import { ProductPanelSorted } from '../../../entities/product/ui/ProductPanelSorted'
import { ProductsSortedContent } from '../../../entities/product/ui/ProductsSortedContent'
import { SearchMessage } from '../../../entities/product/ui/SearchMessage'
import { useActions } from '../../../shared/hooks/useActions'
import { usePagination } from '../../../shared/hooks/usePagination'
import { useAppSelector } from '../../../shared/hooks/useStoreApp.hooks'
import { ErrorMessage } from '../../../shared/ui/ErrorUi'
import { LoaderApp } from '../../../shared/ui/LoaderApp'

export const ProductsContent: FC = () => {
	const [sortedByPriceDesc, setSortedByPriceDesc] = useState(false)
	const { searchProduct, admin } = useAppSelector(state => state)
	const actions = useActions()
	const { search, page, limit, offset, searchParams, setSearchParams } =
		usePagination(1, 6)

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

	const getAllProducts = useMemo(() => actions.getAllProducts, [])
	const getProductSearch = useMemo(() => actions.getProductSearch, [])

	useEffect(() => {
		if (!search) {
			getAllProducts(limit, offset)
		} else {
			getProductSearch(search, limit, offset)
		}
	}, [getAllProducts, getProductSearch, search, page, offset, limit])

	const productList = search ? productsSearch : allProducts

	const contentAppLoading = search
		? isSearchProductAppLoading
		: isProductAppLoading && !isSearchProductAppLoading

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

	const errorMessage = productError || searchError
	if (errorMessage) return <ErrorMessage error={errorMessage} />

	if (contentAppLoading) return <LoaderApp />

	if (!productList || productList.length === 0) {
		return <ErrorMessage error='No products found' />
	}

	return (
		<div className='flex-auto'>
			<ProductPanelSorted
				productList={productList}
				sortedByPriceDesc={sortedByPriceDesc}
				setSortedByPriceDesc={setSortedByPriceDesc}
			/>

			<SearchMessage search={search} />

			<ProductsSortedContent sortedProducts={sortedProducts} />

			{totalPage > 1 && (
				<Pagination
					page={page}
					totalPage={totalPage}
					prevPageHandler={() => changeProduct(page - 1)}
					nextPageHandler={() => changeProduct(page + 1)}
				/>
			)}
		</div>
	)
}
