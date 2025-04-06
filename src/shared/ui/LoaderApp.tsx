import { FC } from 'react'

export const LoaderApp: FC = () => {
	return (
		<div className='flex justify-center items-center h-full'>
			<div className='animate-spin rounded-full h-16 w-16 border-t-4 border-b-4  border-bgActionButton'></div>
		</div>
	)
}
