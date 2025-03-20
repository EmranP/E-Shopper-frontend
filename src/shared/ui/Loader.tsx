import { FC } from 'react'

export const Loader: FC = () => (
	<div className='flex justify-center items-center h-screen'>
		<div className='animate-spin rounded-full h-16 w-16 border-t-4 border-b-4  border-bgActionButton'></div>
	</div>
)
