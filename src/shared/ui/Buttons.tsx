import { FC } from 'react'
import { IAuthButton, IButton } from '../types/ui.interface'

export const AuthButton: FC<IAuthButton> = ({ title, bgColor }) => {
	return (
		<button className={`px-4 py-2 rounded-lg w-full text-white ${bgColor}`}>
			{title}
		</button>
	)
}

export const Button: FC<IButton> = ({ title, bgColor, onClick }) => {
	return (
		<button
			className={`px-4 py-2 rounded-lg w-full text-white ${bgColor}`}
			onClick={onClick}
		>
			{title}
		</button>
	)
}
