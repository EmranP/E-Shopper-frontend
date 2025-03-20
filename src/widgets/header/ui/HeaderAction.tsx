import { FC } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../../../shared/ui/Button'

export const HeaderAction: FC = () => {
	return (
		<div className='flex flex-col gap-y-2'>
			{/* <h1 className='text-center font-semibold text-xl'>Username</h1> */}
			<div className='flex gap-x-4'>
				<Link to={'/auth/login'}>
					<Button
						title='Sign in'
						bgColor='bg-baseTextAndButton'
						onClick={() => {}}
					/>
				</Link>
				<Link to={'/auth/registration'}>
					<Button
						title='Sign up'
						bgColor='bg-bgActionButton'
						onClick={() => {}}
					/>
				</Link>
			</div>
		</div>
	)
}
