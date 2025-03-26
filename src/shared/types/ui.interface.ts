import { ROLES } from '../../app/constants/roles/roles'

export interface ITitle {
	title: string
}

export interface IAuthButton extends ITitle {
	bgColor: string
	type: string
}

export interface IButton extends IAuthButton {
	onClick: () => void
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
