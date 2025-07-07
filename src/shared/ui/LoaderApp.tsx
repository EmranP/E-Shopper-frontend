import { FC } from 'react'

export const LoaderApp: FC = () => {
	return (
		<div className='flex justify-center items-center h-full m-auto'>
			<div className='animate-spin rounded-full h-16 w-16 border-t-4 border-b-4  border-bgActionButton'></div>
		</div>
	)
}

export const MinLoaderApp: FC = () => {
	return (
		<div className='flex justify-center items-center h-full m-auto'>
			<div className='animate-spin rounded-full h-6 w-6 border-t-2 border-b-2  border-bgActionButton'></div>
		</div>
	)
}
