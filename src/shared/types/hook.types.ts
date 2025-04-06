import { ChangeEvent, Dispatch, SetStateAction } from 'react'

export interface IHookShowError {
	showError: boolean
}

export interface IHookToggle {
	toggle: boolean
	toggleHandler: () => void
	setToggle?: Dispatch<SetStateAction<boolean>>
}

export interface IHookInput {
	value: string | number
	onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export interface IHookMode {
	mode: 'edit' | 'create' | null
	changeMode: (newMode: 'edit' | 'create') => void
	toggleMode: () => void
	resetMode: () => void
}
