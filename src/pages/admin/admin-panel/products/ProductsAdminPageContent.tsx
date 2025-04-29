/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useEffect, useState } from 'react'
import {
	AdminPanelContentBody,
	AdminPanelContentBodyItems,
} from '../../../../features/admin/ui/AdminPanelContentBody'
import {
	AdminPanelContentHeaderTable,
	AdminPanelContentTable,
} from '../../../../features/admin/ui/AdminPanelContentHeader'
import { adminPanelContentHeaderProductsItemsElement } from '../../../../features/admin/util/content-header-items-el.util'
import { useActions } from '../../../../shared/hooks/useActions'
import { useAppSelector } from '../../../../shared/hooks/useStoreApp.hooks'
import { useToggle } from '../../../../shared/hooks/useToggle'
import { ErrorAdminContentPage } from '../../../../shared/ui/ErrorUi'
import { LoaderApp } from '../../../../shared/ui/LoaderApp'
import { Modal } from '../../../../shared/ui/Modal'
import { TrashUI } from '../../../../shared/ui/TrashUI'

export const ProductsAdminPageContent: FC = () => {
	const { products, isAppLoading, error } = useAppSelector(
		state => state.admin.products
	)
	const { getAllProducts, getAllCategories, removeProduct } = useActions()
	const { toggle, toggleHandler } = useToggle()
	const [productIdToDelete, setProductIdToDelete] = useState<number | null>(
		null
	)

	useEffect(() => {
		getAllProducts()
		getAllCategories()
	}, [])

	if (isAppLoading) return <LoaderApp />

	if (!products || !products.length) {
		return <ErrorAdminContentPage error={error} />
	}

	const removeProductHandler = (productId: number) => {
		if (!productId) return
		removeProduct(productId)
	}

	const confirmDeleteHandler = () => {
		if (productIdToDelete !== null) {
			removeProductHandler(productIdToDelete)
			setProductIdToDelete(null)
		}

		toggleHandler()
	}

	const showModalHandler = () => toggleHandler()
	return (
		<>
			<div className='space-y-5'>
				<AdminPanelContentTable title='Products' style='pr-10'>
					<thead>
						<tr className='bg-bgCards'>
							{adminPanelContentHeaderProductsItemsElement.map(item => (
								<AdminPanelContentHeaderTable
									key={item.id}
									title={item.title}
									style={item.styleName}
								/>
							))}
						</tr>
					</thead>
					<tbody>
						{products?.map(product => (
							<AdminPanelContentBody key={product.id}>
								<AdminPanelContentBodyItems data={product.id as number} />
								<AdminPanelContentBodyItems data={product.name} />
								<AdminPanelContentBodyItems
									data={
										product.imageUrl ? (
											<img
												src={product.imageUrl}
												alt={product.name ? product.name : 'image-title'}
												className='w-[80px] h-[80px] rounded-xl mx-auto'
											/>
										) : (
											<div className='p-4 text-center text-2xl bg-gray-600 bg-specialColor'>
												No Image
											</div>
										)
									}
								/>
								<AdminPanelContentBodyItems data={`${product.price}  $`} />
								<AdminPanelContentBodyItems data={product.stock} />
								<AdminPanelContentBodyItems
									data={product.categoryId && product?.categoryId}
								/>
								<AdminPanelContentBodyItems
									data={new Date(
										product.createdAt as Date
									).toLocaleDateString()}
								/>
								<AdminPanelContentBodyItems
									data={new Date(
										product.updatedAt as Date
									).toLocaleDateString()}
								/>
								<TrashUI
									showModalHandler={showModalHandler}
									setIdToDelete={setProductIdToDelete}
									data={product as { id: number }}
								/>
							</AdminPanelContentBody>
						))}
					</tbody>
				</AdminPanelContentTable>
			</div>
			{toggle && (
				<Modal
					titleSolutions='delete this is product'
					onClickSave={confirmDeleteHandler}
					onClickClose={showModalHandler}
					onClickCancel={showModalHandler}
				/>
			)}
		</>
	)
}
