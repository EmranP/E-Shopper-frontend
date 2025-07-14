/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo } from 'react'
import {
	AdminPanelContentBody,
	AdminPanelContentBodyItems,
} from '../../features/admin/ui/AdminPanelContentBody'
import {
	AdminPanelContentHeaderTable,
	AdminPanelContentTable,
} from '../../features/admin/ui/AdminPanelContentHeader'
import { adminPanelContentHeaderOrdersItemsElement } from '../../features/admin/util/content-header-items-el.util'
import { useActions } from '../../shared/hooks/useActions'
import { useAppSelector } from '../../shared/hooks/useStoreApp.hooks'
import { Loader } from '../../shared/ui/Loader'
import { Header } from '../../widgets/header/ui/Header'
import { LayoutContent } from '../../widgets/layout/Content'
import { Layout } from '../../widgets/layout/Layout'

const OrdersPage = () => {
	const { user, isAppLoading, isAuth } = useAppSelector(s => s.auth)
	const { orders } = useAppSelector(s => s.order)
	const actions = useActions()

	const getAllCustomerOrder = useMemo(() => actions.getAllCustomerOrder, [])
	const checkAuth = useMemo(() => actions.checkAuth, [])

	useEffect(() => {
		const token = localStorage.getItem('token')

		if (token) {
			checkAuth()
		}
	}, [checkAuth])

	useEffect(() => {
		if (!user?.id) return

		getAllCustomerOrder(user.id)
	}, [getAllCustomerOrder, user?.id])

	if (isAppLoading) return <Loader />

	return (
		<Layout>
			<Header />
			<LayoutContent>
				{!isAuth ? (
					<h1 className='text-center text-3xl font-semibold text-orange-500'>
						You need to log in
					</h1>
				) : (
					!orders ||
					(!orders.length ? (
						<div>
							<h1>Order data not founded</h1>
						</div>
					) : (
						<div className='space-y-5'>
							<AdminPanelContentTable title='Orders'>
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
										</AdminPanelContentBody>
									))}
								</tbody>
							</AdminPanelContentTable>
						</div>
					))
				)}
			</LayoutContent>
		</Layout>
	)
}

export default OrdersPage
