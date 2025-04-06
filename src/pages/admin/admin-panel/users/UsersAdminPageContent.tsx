import { Trash } from 'lucide-react'
import { FC, useEffect, useState } from 'react'
import { iconsSize } from '../../../../features/admin/ui/AdminForms'
import {
	AdminPanelContentBody,
	AdminPanelContentBodyItems,
} from '../../../../features/admin/ui/AdminPanelContentBody'
import {
	AdminPanelContentHeaderTable,
	AdminPanelContentTable,
} from '../../../../features/admin/ui/AdminPanelContentHeader'
import { adminPanelContentHeaderItemsElement } from '../../../../features/admin/util/content-header-items-el.util'
import { IResponseUserAuthApi } from '../../../../features/auth/types/type.api'
import { useAppSelector } from '../../../../shared/hooks/store.hooks'
import { useActions } from '../../../../shared/hooks/useActions'
import { useToggle } from '../../../../shared/hooks/useToggle'
import { LoaderApp } from '../../../../shared/ui/LoaderApp'
import { Modal } from '../../../../shared/ui/Modal'
import { Title } from '../../../../shared/ui/Title'

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

	const usersData = users as IResponseUserAuthApi[]

	if (!usersData || !usersData.length)
		return (
			<div className='flex h-full justify-center items-center text-bgDangerButton'>
				<Title title={error as string} />
			</div>
		)

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
	const showModalHandler = () => {
		toggleHandler()
	}

	return (
		<>
			<div className='space-y-5'>
				<AdminPanelContentTable title='Users'>
					<thead>
						<tr className='bg-bgCards'>
							{adminPanelContentHeaderItemsElement.map(item => (
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
								<div className='absolute top-3 -right-7'>
									<Trash
										size={iconsSize}
										cursor={'pointer'}
										onClick={() => {
											showModalHandler()
											setUserIdToDelete(user.id)
										}}
									/>
								</div>
							</AdminPanelContentBody>
						))}
					</tbody>
				</AdminPanelContentTable>
			</div>
			{toggle && (
				<Modal
					titleSolutions={'delete this users'}
					onClickSave={confirmDeleteHandler}
					onClickClose={showModalHandler}
					onClickCancel={showModalHandler}
				/>
			)}
		</>
	)
}
