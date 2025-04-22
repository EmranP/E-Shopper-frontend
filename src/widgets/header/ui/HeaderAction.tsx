/* eslint-disable react-hooks/exhaustive-deps */

import { LogOut, ShoppingCart } from 'lucide-react'
import { FC, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useActions } from '../../../shared/hooks/useActions'
import { useAppSelector } from '../../../shared/hooks/useStoreApp.hooks'
import { useToggle } from '../../../shared/hooks/useToggle'
import { Button } from '../../../shared/ui/Buttons'
import { Modal } from '../../../shared/ui/Modal'

export const HeaderAction: FC = () => {
	const { auth, carts, cartItems } = useAppSelector(state => state)
	const { isAuth, user } = auth
	const { cart, error } = carts
	const { cartItems: cartItemsData } = cartItems
	const { logout, getCartItems } = useActions()
	const toggleLogout = useToggle(false)
	const toggleShowModal = useToggle(false)

	useEffect(() => {
		if (!cart?.id) return

		getCartItems(cart.id)
	}, [cart])

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
							{user && user?.id === cart?.userId ? (
								<Link to={'/cart'}>
									<ShoppingCart size={20} />
									{cartItemsData?.length !== 0 && (
										<div>
											<h1>{cartItemsData?.length}</h1>
										</div>
									)}
								</Link>
							) : (
								<div>
									<p className='text-red-500 font-semibold text-xl'>{error}</p>
								</div>
							)}
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
