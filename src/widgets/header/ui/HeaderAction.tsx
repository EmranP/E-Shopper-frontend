import { LogOut } from 'lucide-react'
import { FC } from 'react'
import { Link } from 'react-router-dom'
import { useAppSelector } from '../../../shared/hooks/store.hooks'
import { useActions } from '../../../shared/hooks/useActions'
import { Button } from '../../../shared/ui/Buttons'

export const HeaderAction: FC = () => {
	const { isAuth, user } = useAppSelector(state => state.auth)
	const { logout } = useActions()
	return (
		<div className='flex flex-col gap-y-2'>
			{isAuth ? (
				<div className='flex items-center gap-4'>
					<h1 className='text-center font-semibold text-xl'>{user?.login}</h1>
					<LogOut cursor={'pointer'} onClick={logout} />
				</div>
			) : (
				<div className='flex gap-x-4'>
					<Link to={'/auth/login'}>
						<Button
							title='Sign in'
							bgColor='bg-baseTextAndButton'
							onClick={() => {}}
							type={'button'}
						/>
					</Link>
					<Link to={'/auth/registration'}>
						<Button
							title='Sign up'
							bgColor='bg-bgActionButton'
							type='button'
							onClick={() => {}}
						/>
					</Link>
				</div>
			)}
		</div>
	)
}
