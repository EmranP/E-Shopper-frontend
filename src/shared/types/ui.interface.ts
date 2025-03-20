export interface ITitle {
	title: string
}

export interface IButton extends ITitle {
	bgColor: string
	onClick: () => void
}

export interface IBackMove {
	color: string
}
