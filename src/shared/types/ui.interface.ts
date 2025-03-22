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
