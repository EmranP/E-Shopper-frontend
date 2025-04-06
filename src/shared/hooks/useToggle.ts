import { useState } from 'react'
import { IHookToggle } from '../types/hook.types'

export const useToggle = (initialState: boolean = false): IHookToggle => {
	const [toggle, setToggle] = useState(initialState)

	const toggleHandler = () => setToggle(prev => !prev)

	return { toggle, toggleHandler, setToggle }
}
