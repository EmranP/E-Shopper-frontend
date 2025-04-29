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
import { adminPanelContentHeaderUsersItemsElement } from '../../../../features/admin/util/content-header-items-el.util'
import { IResponseUserAuthApi } from '../../../../features/auth/types/type.api'
import { useActions } from '../../../../shared/hooks/useActions'
import { useAppSelector } from '../../../../shared/hooks/useStoreApp.hooks'
import { useToggle } from '../../../../shared/hooks/useToggle'
import { ErrorAdminContentPage } from '../../../../shared/ui/ErrorUi'
import { LoaderApp } from '../../../../shared/ui/LoaderApp'
import { Modal } from '../../../../shared/ui/Modal'
import { TrashUI } from '../../../../shared/ui/TrashUI'

export const UsersAdminPageContent: FC = () => {
	const { users, isAppLoading, error } = useAppSelector(
		state => state.admin.user
	)
	const { getAllForAdminUsers, removeForAdminUsers } = useActions()
	const { toggle, toggleHandler } = useToggle()
	const [userIdToDelete, setUserIdToDelete] = useState<number | null>(null)

	useEffect(() => {
		getAllForAdminUsers()
	}, [])

	if (isAppLoading) return <LoaderApp />

	const usersData = users as IResponseUserAuthApi[] | null

	if (!usersData || !usersData.length)
		return <ErrorAdminContentPage error={error} />

	const removeUserHandler = (userId: number) => {
		if (!userId) return
		removeForAdminUsers(userId)
	}

	const confirmDeleteHandler = () => {
		if (userIdToDelete !== null) {
			removeUserHandler(userIdToDelete)
			setUserIdToDelete(null)
		}

		toggleHandler()
	}
	const showModalHandler = () => toggleHandler()
	return (
		<>
			<div className='space-y-5'>
				<AdminPanelContentTable title='Users' style='pr-10'>
					<thead>
						<tr className='bg-bgCards'>
							{adminPanelContentHeaderUsersItemsElement.map(item => (
								<AdminPanelContentHeaderTable
									key={item.id}
									title={item.title}
									style={item.styleName}
								/>
							))}
						</tr>
					</thead>
					<tbody>
						{usersData?.map(user => (
							<AdminPanelContentBody key={user.id}>
								<AdminPanelContentBodyItems data={user.id} />
								<AdminPanelContentBodyItems data={user.login} />
								<AdminPanelContentBodyItems data={user.email} />
								<AdminPanelContentBodyItems
									data={user.isActivated ? 'Activated' : 'No Activated'}
								/>
								<AdminPanelContentBodyItems data={user.role} />
								<AdminPanelContentBodyItems
									data={new Date(user.createdAt).toLocaleDateString()}
								/>
								<AdminPanelContentBodyItems
									data={new Date(user.updatedAt).toLocaleDateString()}
								/>
								<TrashUI
									showModalHandler={showModalHandler}
									setIdToDelete={setUserIdToDelete}
									data={user}
								/>
							</AdminPanelContentBody>
						))}
					</tbody>
				</AdminPanelContentTable>
			</div>
			{toggle && (
				<Modal
					titleSolutions={'delete this is users'}
					onClickSave={confirmDeleteHandler}
					onClickClose={showModalHandler}
					onClickCancel={showModalHandler}
				/>
			)}
		</>
	)
}
