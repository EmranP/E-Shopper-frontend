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
export interface ISelectOptionOrders {
	label: string
	value: string
}

export interface ISelectOptionUser extends ISelectOptionOrders {
	roleId: ROLES
}

export type CommonSelectTypes = ISelectOptionUser | ISelectOptionOrders

export interface ISelectProps<T> {
	options: T[]
	selected: T
	setSelected: Dispatch<SetStateAction<T>>
}

export interface ITextAreaProps
	extends TextareaHTMLAttributes<HTMLTextAreaElement> {
	label?: string
	value: string
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
}

export interface IAdminFormFieldIDElement
	extends Omit<IAdminFormChoiceAction, 'Button' | 'changeMode'> {
	Label: FC<ILabel>
	Input: FC<IInput>
	modeAction: 'edit' | 'create' | null
	titleLabel: string
	placeholder: string
	value: string
}

export interface IAdminPanelHeader {
	title: string
	style?: string | undefined
	children?: ReactNode
}

export interface IAdminPanelBody {
	data: string | number
}
