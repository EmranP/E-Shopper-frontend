import { useState } from 'react'
import { IHookMode } from '../types/hook.types'

export const useMode = (): IHookMode => {
	const [mode, setMode] = useState<'edit' | 'create' | null>(null)

	const changeMode = (newMode: 'edit' | 'create') => {
		setMode(prevMode => (prevMode === newMode ? null : newMode))
	}

	const toggleMode = () => {
		if (mode === 'create') {
			changeMode('edit')
		} else if (mode === 'edit') {
			changeMode('create')
		}
	}

	const resetMode = () => setMode(null)

	return { changeMode, toggleMode, resetMode, mode }
}
