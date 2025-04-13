/* eslint-disable react-hooks/exhaustive-deps */
import { Search } from 'lucide-react'
import { FC, useEffect } from 'react'
import { useMatch, useNavigate, useSearchParams } from 'react-router-dom'
import { useDebounce } from '../../../shared/hooks/useDebounce'
import { useInput } from '../../../shared/hooks/useInput'
import { Input } from '../../../shared/ui/Input'
import { LayoutContainer } from '../../layout/Layout'

export const HeaderBody: FC = () => {
	const searchInput = useInput('')
	const debouncedSearchTerm = useDebounce(searchInput.value, 1200)
	const isActivePage = !!useMatch('')
	const navigate = useNavigate()
	const [searchParams] = useSearchParams()

	useEffect(() => {
		const searchValue = debouncedSearchTerm.toString().trim()
		const params = new URLSearchParams(searchParams)
		if (isActivePage) {
			if (searchValue) {
				params.set('search', searchValue)
				// params.set('page', '1')
			} else {
				params.delete('search')
				// params.set('page', '1')
			}

			navigate({ search: params.toString() })
		}
	}, [debouncedSearchTerm])
	return (
		<div className='w-full bg-bgCards py-5'>
			<LayoutContainer>
				<div className='relative mx-auto max-w-[300px]'>
					{isActivePage ? (
						<>
							<Input
								placeholder='search..'
								type={'text'}
								{...searchInput}
								className='w-full bg-bgLayout py-2 pl-8 rounded-lg outline-none'
							/>
							<Search className='absolute top-3 left-2' size={16} />
						</>
					) : (
						<h1>Search working just home page ))</h1>
					)}
				</div>
			</LayoutContainer>
		</div>
	)
}
