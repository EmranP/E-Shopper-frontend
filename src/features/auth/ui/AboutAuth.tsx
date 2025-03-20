import { Store } from 'lucide-react'
import { motion } from 'motion/react'

export const AboutAuth = () => {
	return (
		<motion.div
			initial={{ x: -100 }}
			animate={{ x: 0, transition: { duration: 1 } }}
			className='flex-auto flex flex-col justify-center h-full bg-bgActionButton '
		>
			<div className='flex items-center justify-center text-white space-x-5'>
				<h1 className='text-3xl'>E-Shopper</h1>
				<Store size={30} />
			</div>
		</motion.div>
	)
}
