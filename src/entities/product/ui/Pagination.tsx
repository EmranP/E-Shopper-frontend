import { FC } from 'react'
import { Button } from '../../../shared/ui/Buttons'
import { IPagination } from '../types/types-ui.interface'

export const Pagination: FC<IPagination> = ({
	page,
	totalPage,
	prevPageHandler,
	nextPageHandler,
}) => {
	return (
		<div className='w-full'>
			<div className='flex justify-center gap-3 max-w-[500px] mx-auto'>
				<Button
					title='Prev'
					disabled={page === 1}
					onClick={prevPageHandler}
					color={'white'}
					bgColor={'bg-bgActionButton'}
				/>
				<div className='flex items-center gap-3 bg-bgCards py-2 px-3 rounded-full'>
					<h2>Page</h2>
					<span
						className={
							page === 0 ? 'text-baseTextAndButton' : 'text-specialColor'
						}
					>
						{page}
					</span>
				</div>
				<Button
					title='Next'
					onClick={nextPageHandler}
					disabled={page >= totalPage}
					color={'white'}
					bgColor={'bg-bgActionButton'}
				/>
			</div>
		</div>
	)
}
