import { LogOut } from 'lucide-react'
import { FC } from 'react'
import { Link } from 'react-router-dom'
import { useAppSelector } from '../../../shared/hooks/store.hooks'
import { useActions } from '../../../shared/hooks/useActions'
import { useToggle } from '../../../shared/hooks/useToggle'
import { Button } from '../../../shared/ui/Buttons'
import { Modal } from '../../../shared/ui/Modal'

export const HeaderAction: FC = () => {
	const { isAuth, user } = useAppSelector(state => state.auth)
	const { logout } = useActions()
	const toggleLogout = useToggle(false)
	const toggleShowModal = useToggle(false)

	const logoutHandler = () => {
		logout()
		toggleLogout.toggleHandler()
	}

	const isShowModalHandler = () => toggleShowModal.toggleHandler()

	return (
		<>
			<div className='flex flex-col items-center gap-y-2'>
				{isAuth ? (
					<>
						<div className='flex items-center gap-4'>
							<h1 className='text-center font-semibold text-xl'>
								{user?.login}
							</h1>
							<LogOut cursor={'pointer'} onClick={isShowModalHandler} />
						</div>
						{!user?.isActivated && (
							<div className='text-lg'>
								<h1>
									Please confirm your{' '}
									<span className='text-specialColor'>email :)</span>
								</h1>
							</div>
						)}
					</>
				) : (
					<div className='flex gap-x-4'>
						<Link to={'/auth/login'}>
							<Button
								title='Sign in'
								bgColor='bg-baseTextAndButton'
								onClick={() => {}}
								type={'button'}
								color='white'
							/>
						</Link>
						<Link to={'/auth/registration'}>
							<Button
								title='Sign up'
								bgColor='bg-bgActionButton'
								type='button'
								onClick={() => {}}
								color='white'
							/>
						</Link>
					</div>
				)}
			</div>
			{toggleShowModal.toggle && (
				<Modal
					titleSolutions='logout'
					onClickSave={() => logoutHandler()}
					onClickCancel={() => isShowModalHandler()}
					onClickClose={() => isShowModalHandler()}
				/>
			)}
		</>
	)
}
