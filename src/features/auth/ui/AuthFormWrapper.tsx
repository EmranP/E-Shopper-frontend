import { motion } from 'motion/react'
import { FC } from 'react'
import { Title } from '../../../shared/ui/Title'
import { IAuthFormWrapper } from '../types/types-ui.interface'

export const AuthFormWrapper: FC<IAuthFormWrapper> = ({ title, children }) => {
	return (
		<motion.div
			initial={{ x: 100 }}
			animate={{ x: 0, transition: { duration: 1 } }}
			className='bg-bgLayout flex-auto flex flex-col h-full justify-center space-y-5'
		>
			<Title title={title} />
			{children}
		</motion.div>
	)
}
