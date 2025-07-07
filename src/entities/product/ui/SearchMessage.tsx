import { FC } from 'react'

export const SearchMessage: FC<{ search: string }> = ({ search }) => {
	return (
		<>
			{search && (
				<p className='mb-6 text-sm text-gray-500'>
					Search results for the query: <strong>{search}</strong>
				</p>
			)}
		</>
	)
}
