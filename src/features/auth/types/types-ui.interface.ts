import { ReactNode } from 'react'
import { FieldError, FieldValues, UseFormRegister } from 'react-hook-form'

export interface ILoginFormInputs {
	email: string
	password: string
}

export interface IRegistrationFormInputs {
	email: string
	login: string
	password: string
	repeatPassword: string
}

export type InputAuthProps<
	T extends ILoginFormInputs | IRegistrationFormInputs
> = IInputAuth<T>

export interface IInputAuth<T extends FieldValues> {
	name: keyof T
	placeholder: string
	type?: 'text' | 'email' | 'password'
	register: UseFormRegister<T>
	errors?: FieldError
	label?: string
}

export interface IAuthFormWrapper {
	title: string
	children: ReactNode
}
