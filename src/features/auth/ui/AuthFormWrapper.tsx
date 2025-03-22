import { motion } from 'motion/react'
import { FC } from 'react'
import { Title } from '../../../shared/ui/Title'
import { IAuthFormWrapper } from '../types/types-ui.interface'

export const AuthFormWrapper: FC<IAuthFormWrapper> = ({
	title,
	children,
	showError,
	error,
}) => {
	return (
		<motion.div
			initial={{ x: 100 }}
			animate={{ x: 0, transition: { duration: 1 } }}
			className={`bg-bgLayout flex-auto flex flex-col h-full justify-center space-y-5`}
		>
			{showError && (
				<motion.h1
					initial={{ opacity: 1 }}
					animate={{ opacity: 0 }}
					transition={{ duration: 1, delay: 4 }}
					className='text-red-500 text-center text-2xl'
				>
					{error}
				</motion.h1>
			)}

			<Title title={title} />
			{children}
		</motion.div>
	)
}
