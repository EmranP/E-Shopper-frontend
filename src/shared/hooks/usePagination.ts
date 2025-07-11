import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { IHookPagination } from '../types/hook.types'

export const usePagination = (defaultPage = 1, limit = 3): IHookPagination => {
	const [searchParams, setSearchParams] = useSearchParams()
	const search = searchParams.get('search') || ''
	const page = Number(searchParams.get('page') || defaultPage)
	const offset = (page - 1) * limit

	useEffect(() => {
		if (!searchParams.get('page')) {
			setSearchParams({ page: String(defaultPage) })
		}
	}, [searchParams, setSearchParams, defaultPage])

	return { page, search, offset, limit, setSearchParams, searchParams }
}
