import { ChangeEvent } from 'react'

export interface IHookShowError {
	showError: boolean
}

export interface IHookToggle {
	toggle: boolean
	toggleHandler: () => void
}

export interface IHookInput {
	value: string | number
	onChange: (e: ChangeEvent<HTMLInputElement>) => void
}
