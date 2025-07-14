import { useEffect, useRef, useState } from 'react'
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

export function useSessionStorageShowError(
	key: string,
	trigger: string | boolean | null
): [boolean, () => void] {
	const prev = useRef<string | boolean | null>(null)
	const [show, setShow] = useState(!sessionStorage.getItem(key))

	useEffect(() => {
		// при новой ошибке — сбрасываем флаг и готовимся к показу
		if (trigger && trigger !== prev.current) {
			sessionStorage.removeItem(key)
			setShow(true)
			prev.current = trigger
		}
	}, [key, trigger])

	const consume = () => {
		sessionStorage.setItem(key, '1')
		setShow(false)
	}

	return [show, consume]
}
