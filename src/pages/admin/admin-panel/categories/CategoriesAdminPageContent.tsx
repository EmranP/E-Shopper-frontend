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
import { adminPanelContentHeaderCategoryItemsElement } from '../../../../features/admin/util/content-header-items-el.util'
import { useActions } from '../../../../shared/hooks/useActions'
import { useAppSelector } from '../../../../shared/hooks/useStoreApp.hooks'
import { useToggle } from '../../../../shared/hooks/useToggle'
import { ErrorAdminContentPage } from '../../../../shared/ui/ErrorUi'
import { LoaderApp } from '../../../../shared/ui/LoaderApp'
import { Modal } from '../../../../shared/ui/Modal'
import { TrashUI } from '../../../../shared/ui/TrashUI'

export const CategoriesAdminPageContent: FC = () => {
	const { categories, isAppLoading, error } = useAppSelector(
		state => state.admin.categories
	)
	const { getAllCategories, removeCategory } = useActions()
	const { toggle, toggleHandler } = useToggle()
	const [categoryIdToDelete, setCategoryIdToDelete] = useState<number | null>(
		null
	)

	useEffect(() => {
		getAllCategories()
	}, [])

	if (isAppLoading) return <LoaderApp />

	if (!categories || !categories.length) {
		return <ErrorAdminContentPage error={error} />
	}

	const removeCategoryHandler = (categoryId: number) => {
		if (!categoryId) return
		removeCategory(categoryId)
	}

	const confirmDeleteHandler = () => {
		if (categoryIdToDelete !== null) {
			removeCategoryHandler(categoryIdToDelete)
			setCategoryIdToDelete(null)
		}

		toggleHandler()
	}
	console.log(categories)
	const showModalHandler = () => toggleHandler()
	return (
		<>
			<div className='space-y-5'>
				<AdminPanelContentTable title='Categories' style='pr-10'>
					<thead>
						<tr className='bg-bgCards'>
							{adminPanelContentHeaderCategoryItemsElement.map(item => (
								<AdminPanelContentHeaderTable
									key={item.id}
									title={item.title}
									style={item.styleName}
								/>
							))}
						</tr>
					</thead>
					<tbody>
						{categories.map(categoryItem => (
							<AdminPanelContentBody key={categoryItem.id}>
								<AdminPanelContentBodyItems data={categoryItem.id} />
								<AdminPanelContentBodyItems data={categoryItem.name} />
								<AdminPanelContentBodyItems
									data={new Date(categoryItem.created_at).toLocaleDateString()}
								/>
								<AdminPanelContentBodyItems
									data={new Date(categoryItem.updated_at).toLocaleDateString()}
								/>
								<TrashUI
									showModalHandler={showModalHandler}
									setIdToDelete={setCategoryIdToDelete}
									data={categoryItem}
								/>
							</AdminPanelContentBody>
						))}
					</tbody>
				</AdminPanelContentTable>
			</div>
			{toggle && (
				<Modal
					titleSolutions='delete this is category'
					onClickSave={confirmDeleteHandler}
					onClickClose={showModalHandler}
					onClickCancel={showModalHandler}
				/>
			)}
		</>
	)
}
