import { SetURLSearchParams } from 'react-router-dom'

export const changePaginationProduct = (
	newPage: number,
	totalPage: number,
	searchParams: URLSearchParams,
	setSearchParams: SetURLSearchParams
): void => {
	const next = Math.min(Math.max(1, newPage), totalPage)
	searchParams.set('page', String(next))
	setSearchParams(searchParams)
}
