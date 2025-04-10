import { ButtonHTMLAttributes, ReactNode } from 'react'
import { ToastPosition } from 'react-toastify'
import { ROLES } from '../../app/constants/roles/roles'

export interface ITitle {
	title: string
}

export interface IAuthButton extends ITitle {
	bgColor: string
	type: string
}

export interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
	color: string
	children?: ReactNode
	bgColor: string
	title: string
}

export interface IBackMove {
	color: string
}

export interface IModal {
	titleSolutions: string
	onClickSave: () => void
	onClickClose: () => void
	onClickCancel: () => void
}

export interface IProtectedRoute {
	requiredRole: ROLES
}

export interface IToastProps {
	position: ToastPosition | undefined
	theme: string | 'dark'
}

export interface ILabel {
	htmlFor: string
	title: string
}

export interface IDynamicForm {
	children: ReactNode
}
