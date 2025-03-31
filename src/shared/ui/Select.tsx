import { ChevronDown } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import {
	CommonSelectTypes,
	ISelectProps,
} from '../../features/admin/types/ui.interface'

export const Select = <T extends CommonSelectTypes>({
	options,
	selected,
	setSelected,
}: ISelectProps<T>) => {
	const [isOpen, setIsOpen] = useState<boolean>(false)
	const selectRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const clickOutsideHandler = (event: MouseEvent) => {
			if (
				selectRef.current &&
				!selectRef.current.contains(event.target as Node)
			) {
				setIsOpen(false)
			}
		}

		document.addEventListener('mousedown', clickOutsideHandler)

		return () => document.removeEventListener('mousedown', clickOutsideHandler)
	}, [])

	return (
		<div className='relative ' ref={selectRef}>
			<button
				type='button'
				className='w-full flex items-center justify-between px-4 py-2 mb-4 text-baseTextAndButton bg-white rounded-lg shadow-md focus:outline-none'
				onClick={() => setIsOpen(prev => !prev)}
			>
				{selected.label}
				<ChevronDown rotate={isOpen ? '180deg' : '0'} />
			</button>

			<AnimatePresence>
				{isOpen && (
					<motion.ul
						initial={{ opacity: 0, scale: 0.9, y: -10 }}
						animate={{ opacity: 1, scale: 1, y: 0 }}
						exit={{ opacity: 0, scale: 0.9, y: -10 }}
						transition={{ duration: 0.2 }}
						className='absolute mt-2 w-full bg-white shadow-lg rounded-lg z-10 overflow-hidden'
					>
						{options.map(option => (
							<li
								key={option.value}
								className='px-4 py-2 cursor-pointer hover:bg-blue-100 transition'
								onClick={() => {
									setSelected(option)
									setIsOpen(false)
								}}
							>
								{option.label}
							</li>
						))}
					</motion.ul>
				)}
			</AnimatePresence>
		</div>
	)
}
