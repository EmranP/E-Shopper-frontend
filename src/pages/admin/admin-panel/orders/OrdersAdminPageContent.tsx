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
import { adminPanelContentHeaderOrdersItemsElement } from '../../../../features/admin/util/content-header-items-el.util'
import { IResponseOrdersApi } from '../../../../features/order/types/types.api'
import { useActions } from '../../../../shared/hooks/useActions'
import { useAppSelector } from '../../../../shared/hooks/useStoreApp.hooks'
import { useToggle } from '../../../../shared/hooks/useToggle'
import { ErrorAdminContentPage } from '../../../../shared/ui/ErrorUi'
import { LoaderApp } from '../../../../shared/ui/LoaderApp'
import { Modal } from '../../../../shared/ui/Modal'
import { TrashUI } from '../../../../shared/ui/TrashUI'

export const OrdersAdminPageContent: FC = () => {
	const { orders, isAppLoading, error } = useAppSelector(
		state => state.admin.orders
	)
	const { getAllOrdersForAdmin, removeOrdersForAdmin } = useActions()
	const { toggle, toggleHandler } = useToggle()
	const [ordersIdToDelete, setOrderIdDelete] = useState<number | null>(null)

	useEffect(() => {
		getAllOrdersForAdmin()
	}, [])

	if (isAppLoading) return <LoaderApp />

	const ordersData = orders as IResponseOrdersApi[] | null

	if (!ordersData?.length || error) {
		return <ErrorAdminContentPage error={'No quantity of goods'} />
	}

	const removeOrderHandler = (orderId: number) => removeOrdersForAdmin(orderId)

	const confirmDeleteHandler = () => {
		if (ordersIdToDelete !== null) {
			removeOrderHandler(ordersIdToDelete)
			setOrderIdDelete(null)
		}

		toggleHandler()
	}

	const showModalHandler = () => toggleHandler()
	return (
		<>
			<div className='space-y-5'>
				<AdminPanelContentTable title='Orders' style='pr-10'>
					<thead>
						<tr className='bg-bgCards'>
							{adminPanelContentHeaderOrdersItemsElement.map(item => (
								<AdminPanelContentHeaderTable
									key={item.id}
									title={item.title}
									style={item.styleName}
								/>
							))}
						</tr>
					</thead>
					<tbody>
						{ordersData.map(order => (
							<AdminPanelContentBody key={order.id}>
								<AdminPanelContentBodyItems data={order.id} />
								<AdminPanelContentBodyItems data={order.userId} />
								<AdminPanelContentBodyItems data={order.totalPrice} />
								<AdminPanelContentBodyItems data={order.status} />
								<AdminPanelContentBodyItems
									data={new Date(order.createdAt).toLocaleDateString()}
								/>
								<AdminPanelContentBodyItems
									data={new Date(order.updatedAt).toLocaleDateString()}
								/>
								<TrashUI
									showModalHandler={showModalHandler}
									setIdToDelete={setOrderIdDelete}
									data={order}
								/>
							</AdminPanelContentBody>
						))}
					</tbody>
				</AdminPanelContentTable>
			</div>
			{toggle && (
				<Modal
					titleSolutions='delete this is order'
					onClickSave={confirmDeleteHandler}
					onClickCancel={showModalHandler}
					onClickClose={showModalHandler}
				/>
			)}
		</>
	)
}
