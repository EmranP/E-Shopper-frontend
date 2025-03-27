import { FC } from 'react'
import { Bounce, ToastContainer } from 'react-toastify'
import { IToastProps } from '../types/ui.interface'

export const Toast: FC<IToastProps> = ({
	position = 'top-right',
	theme = 'dark',
}) => {
	return (
		<ToastContainer
			position={position}
			autoClose={5000}
			hideProgressBar={false}
			newestOnTop={false}
			closeOnClick={false}
			rtl={false}
			pauseOnFocusLoss
			draggable
			pauseOnHover
			theme={theme}
			transition={Bounce}
		/>
	)
}
