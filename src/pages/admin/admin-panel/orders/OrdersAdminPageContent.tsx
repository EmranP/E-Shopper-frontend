/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useEffect, useMemo, useState } from 'react'
import {
	AdminPanelContentBody,
	AdminPanelContentBodyItems,
} from '../../../../features/admin/ui/AdminPanelContentBody'
import {
	AdminPanelContentHeaderTable,
	AdminPanelContentTable,
} from '../../../../features/admin/ui/AdminPanelContentHeader'
import { adminPanelContentHeaderOrdersItemsElement } from '../../../../features/admin/util/content-header-items-el.util'
import { useActions } from '../../../../shared/hooks/useActions'
import { useAppSelector } from '../../../../shared/hooks/useStoreApp.hooks'
import { useToggle } from '../../../../shared/hooks/useToggle'
import { ErrorAdminContentPage } from '../../../../shared/ui/ErrorUi'
import { LoaderApp } from '../../../../shared/ui/LoaderApp'
import { Modal } from '../../../../shared/ui/Modal'
import { TrashUI } from '../../../../shared/ui/TrashUI'

export const OrdersAdminPageContent: FC = () => {
	const { orders, isAppLoading, error } = useAppSelector(state => state.order)
	const { user } = useAppSelector(state => state.auth)
	const actions = useActions()
	const { toggle, toggleHandler } = useToggle()
	const [ordersIdToDelete, setOrderIdDelete] = useState<number | null>(null)

	const getAllOrdersForAdmin = useMemo(() => actions.getAllAdminOrder, [])
	const removeOrders = useMemo(() => actions.removeOrder, [])

	useEffect(() => {
		if (!user?.id) return

		getAllOrdersForAdmin(user?.id, user?.role)
	}, [getAllOrdersForAdmin, user?.id, user?.role])

	if (isAppLoading) return <LoaderApp />

	if (!orders?.length || error) {
		return <ErrorAdminContentPage error={'No quantity of goods'} />
	}

	const removeOrderHandler = (userId: number | null, orderId: number | null) =>
		removeOrders(userId, orderId)

	const confirmDeleteHandler = () => {
		if (ordersIdToDelete !== null && user?.id) {
			removeOrderHandler(user.id, ordersIdToDelete)
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
						{orders.map(order => (
							<AdminPanelContentBody key={order.id}>
								<AdminPanelContentBodyItems data={order.id} />
								<AdminPanelContentBodyItems data={order.userId} />
								<AdminPanelContentBodyItems data={order.totalPrice} />
								<AdminPanelContentBodyItems data={order.status} />
								<AdminPanelContentBodyItems
									data={
										order.createdAt
											? new Date(order.createdAt).toLocaleDateString()
											: new Date().toLocaleTimeString()
									}
								/>
								<AdminPanelContentBodyItems
									data={
										order.updatedAt
											? new Date(order.updatedAt).toLocaleDateString()
											: new Date().toLocaleTimeString()
									}
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
