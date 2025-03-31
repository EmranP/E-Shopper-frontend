import {
	Dispatch,
	InputHTMLAttributes,
	SetStateAction,
	TextareaHTMLAttributes,
} from 'react'
import { Location, NavigateFunction } from 'react-router-dom'
import { ROLES } from '../../../app/constants/roles/roles'

export interface IInput extends InputHTMLAttributes<HTMLInputElement> {
	value: string | number
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
