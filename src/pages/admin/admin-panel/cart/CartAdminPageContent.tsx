/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useEffect } from 'react'
import {
	AdminPanelContentBody,
	AdminPanelContentBodyItems,
} from '../../../../features/admin/ui/AdminPanelContentBody'
import {
	AdminPanelContentHeaderTable,
	AdminPanelContentTable,
} from '../../../../features/admin/ui/AdminPanelContentHeader'
import { adminPanelContentHeaderCartsItemsElement } from '../../../../features/admin/util/content-header-items-el.util'
import { useActions } from '../../../../shared/hooks/useActions'
import { useAppSelector } from '../../../../shared/hooks/useStoreApp.hooks'
import { ErrorAdminContentPage } from '../../../../shared/ui/ErrorUi'
import { LoaderApp } from '../../../../shared/ui/LoaderApp'

export const CartAdminPageContent: FC = () => {
	const { carts, isAppLoading, error } = useAppSelector(
		state => state.admin.carts
	)
	const { getAllUserCartsForAdmin } = useActions()

	useEffect(() => {
		getAllUserCartsForAdmin()
	}, [])

	if (isAppLoading) return <LoaderApp />

	if (!carts || !carts.length) {
		return <ErrorAdminContentPage error={error} />
	}
	return (
		<>
			<div className='space-y-5'>
				<AdminPanelContentTable title='Carts'>
					<thead>
						<tr className='bg-bgCards'>
							{adminPanelContentHeaderCartsItemsElement.map(item => (
								<AdminPanelContentHeaderTable
									key={item.id}
									title={item.title}
									style={item.styleName}
								/>
							))}
						</tr>
					</thead>
					<tbody>
						{carts.map(cart => (
							<AdminPanelContentBody key={cart.id}>
								<AdminPanelContentBodyItems data={cart.id} />
								<AdminPanelContentBodyItems data={cart.userId} />
								<AdminPanelContentBodyItems
									data={new Date(cart.createdAt).toLocaleDateString()}
								/>
								<AdminPanelContentBodyItems
									data={new Date(cart.updatedAt).toLocaleDateString()}
								/>
							</AdminPanelContentBody>
						))}
					</tbody>
				</AdminPanelContentTable>
			</div>
		</>
	)
}
