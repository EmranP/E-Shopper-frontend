import { useEffect, useRef, useState } from 'react'
import { TypeHookSessionFlag } from '../types/hook.types'

export function useSessionFlag(
	key: string,
	trigger: string | boolean | null
): TypeHookSessionFlag {
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
