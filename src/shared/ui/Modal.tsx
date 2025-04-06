import { motion } from 'framer-motion'
import { X } from 'lucide-react'
import { FC } from 'react'
import { IModal } from '../types/ui.interface'
import { Button } from './Buttons'

export const Modal: FC<IModal> = ({
	titleSolutions,
	onClickSave,
	onClickCancel,
	onClickClose,
}) => {
	return (
		<motion.div
			initial={{ opacity: 0, scale: 0.8 }}
			animate={{
				opacity: 1,
				scale: 1,
				transition: { duration: 0.3, ease: 'easeOut' },
			}}
			className='fixed inset-0 flex items-center justify-center bg-black/50'
		>
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{
					opacity: 1,
					y: 0,
					transition: { duration: 0.3, ease: 'easeOut' },
				}}
				className='flex flex-col justify-between bg-white w-lg h-2/4 p-6 rounded-lg shadow-lg'
			>
				<div className='flex items-center justify-between'>
					<h1 className='text-xl font-semibold'>
						Are you sure what you want {titleSolutions}?
					</h1>
					<X size={25} cursor={'pointer'} onClick={onClickClose} />
				</div>
				<div className='flex gap-20 items-center'>
					<Button
						onClick={onClickCancel}
						bgColor={'bg-baseTextAndButton'}
						type={'button'}
						title={'Cancel'}
						color='white'
					/>
					<Button
						onClick={onClickSave}
						bgColor={'bg-bgActionButton'}
						type={'button'}
						title={'Save'}
						color='white'
					/>
				</div>
			</motion.div>
		</motion.div>
	)
}
