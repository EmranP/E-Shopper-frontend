import { ChangeEvent, Dispatch, SetStateAction } from 'react'
import { SetURLSearchParams } from 'react-router-dom'
import { ICartControls } from '../../features/cart/types/type.ui'

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

export type IHookCartControl = Omit<ICartControls, 'stock'>

export interface IHookPagination {
	search: string
	page: number
	offset: number
	limit: number
	setSearchParams: SetURLSearchParams
	searchParams: URLSearchParams
}
