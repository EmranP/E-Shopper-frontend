import { useEffect, useState } from 'react'
import { IHookShowError } from '../types/hook.types'

export const useShowError = (
	initialState: string | null | boolean,
	delay: number
): IHookShowError => {
	const [showError, setShowError] = useState<boolean>(!!initialState)

	useEffect(() => {
		if (initialState) {
			setShowError(true)
			const timer = setTimeout(() => {
				setShowError(false)
			}, delay)

			return () => clearTimeout(timer)
		}
	}, [delay, initialState])

	return { showError }
}
