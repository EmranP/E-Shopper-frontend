import { FC, PropsWithChildren, useEffect } from 'react'
import { toast } from 'react-toastify'
import {
	errorAuthMessage,
	successAuthMessage,
} from '../../app/constants/utils/showToast.constant'
import { useAppSelector } from '../../shared/hooks/store.hooks'
import { Toast } from '../../shared/ui/Toast'

export const LayoutAuth: FC<PropsWithChildren> = ({ children }) => {
	const { isAuth, error } = useAppSelector(state => state.auth)

	useEffect(() => {
		if (isAuth) {
			toast.success(successAuthMessage)
		} else if (error) {
			toast.error(errorAuthMessage)
		}
	}, [error, isAuth])

	return (
		<section className='h-screen flex items-center h-full'>
			<Toast position='top-right' theme='dark' />
			{children}
		</section>
	)
}
