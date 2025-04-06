import { FC } from 'react'
import { IAuthButton, IButton } from '../types/ui.interface'

export const AuthButton: FC<IAuthButton> = ({ title, bgColor }) => {
	return (
		<button className={`px-4 py-2 rounded-lg w-full text-white ${bgColor}`}>
			{title}
		</button>
	)
}

export const Button: FC<IButton> = ({
	title,
	color,
	bgColor,
	children,
	...props
}) => {
	const classStyleName: string = `px-4 py-2 rounded-lg w-full text-md text-${color} ${bgColor} disabled:opacity-60 ${
		children ? 'flex justify-center items-center gap-3' : ``
	}`

	return (
		<button className={classStyleName} {...props}>
			{title}
			{children}
		</button>
	)
}
