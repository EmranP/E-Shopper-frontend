import {
	ChangeEvent,
	Dispatch,
	FC,
	InputHTMLAttributes,
	ReactNode,
	SetStateAction,
	TextareaHTMLAttributes,
} from 'react'
import { Location, NavigateFunction } from 'react-router-dom'
import { ROLES } from '../../../app/constants/roles/roles'
import { IButton, ILabel } from '../../../shared/types/ui.interface'

export interface IInput extends InputHTMLAttributes<HTMLInputElement> {
	value: string | number
	onChange: (e: ChangeEvent<HTMLInputElement>) => void
	placeholder: string
	type: string
}

// Admin Form
export interface ISelectOption {
	label: string
	value: string | number
}

export interface ISelectOptionUser extends ISelectOption {
	roleId: ROLES
}

export type CommonSelectTypes = ISelectOptionUser | ISelectOption

export interface ISelectProps<T> {
	options: T[] | null
	selected: T | null
	setSelected: Dispatch<SetStateAction<T | null>>
}

export interface ITextAreaProps
	extends TextareaHTMLAttributes<HTMLTextAreaElement> {
	label?: string
	value: string | number
	setValue: Dispatch<SetStateAction<string>>
	maxLength?: number
}

export interface IAdminButtonNavigation {
	locationAdminContent: Location
	navigate: NavigateFunction
	title: string
	to: string
}

export interface IAdminFormChoiceAction {
	mode: 'edit' | 'create' | null
	Button: FC<IButton>
	changeMode: (newMode: 'edit' | 'create') => void
}

export interface IAdminFormActions
	extends Omit<IAdminFormChoiceAction, 'changeMode'> {
	toggleModeHandler: () => void
	resetModes: () => void
	iconsSize: number
	titleAdd: string
	titleEdit: string
	onClick: () => void
	isAppLoading: boolean
}

export interface IAdminFormFieldIDElement
	extends Omit<IAdminFormChoiceAction, 'Button' | 'changeMode'> {
	Label: FC<ILabel>
	Input: FC<IInput>
	modeAction: 'edit' | 'create' | null
	titleLabel: string
	placeholder: string
	value: string | number
	onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export interface IAdminPanelHeader {
	title: string
	style?: string | undefined
	children?: ReactNode
}

export interface IAdminPanelBody {
	data: ReactNode | string | number | null
}
