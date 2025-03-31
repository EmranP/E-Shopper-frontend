import { ChangeEvent, useState } from 'react'
import { IHookInput } from '../types/hook.types'

export const useInput = (initialValue: string | number): IHookInput => {
	const [value, setValue] = useState(initialValue)

	const onChange = (e: ChangeEvent<HTMLInputElement>) =>
		setValue(e.target.value)

	return { value, onChange }
}
